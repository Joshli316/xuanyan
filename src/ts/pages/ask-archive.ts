import { t, getLang } from '../i18n';
import { reports as allReports } from '../data-loader';

interface ArchiveChunk {
  reportId: string;
  reportTitle: { en: string; cn: string };
  section: string;
  text: string;
  tags: string[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: { reportId: string; section: string; title: string }[];
}

let archiveIndex: ArchiveChunk[] = [];
const chatHistory: ChatMessage[] = [];

const STARTER_QUESTIONS = {
  en: [
    'What caused the Boxer Rebellion?',
    'Who were the first Chinese Christian women leaders?',
    'How did missionaries impact Chinese education?',
    'What is the 80% faith attrition problem?',
  ],
  cn: [
    '义和团运动的起因是什么？',
    '最早的中国基督徒女性领袖是谁？',
    '传教士如何影响了中国教育？',
    '为什么80%的留学生回国后失去信仰？',
  ],
};

function loadArchiveIndex(): void {
  if (archiveIndex.length > 0) return;
  // Build from reports
  for (const report of allReports) {
    const chunks = chunkContent(report);
    archiveIndex.push(...chunks);
  }
}

function chunkContent(report: { id: string; title: { en: string; cn: string }; content: { en: string; cn: string }; tags: string[] }): ArchiveChunk[] {
  const chunks: ArchiveChunk[] = [];
  const content = report.content.en;
  const sections = content.split(/^## /gm).filter(Boolean);

  for (const section of sections) {
    const lines = section.split('\n');
    const sectionTitle = lines[0]?.trim() || '';
    const text = lines.slice(1).join('\n').trim();

    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const chunk = words.slice(i, i + 200).join(' ');
      if (chunk.trim()) {
        chunks.push({
          reportId: report.id,
          reportTitle: report.title,
          section: sectionTitle,
          text: chunk,
          tags: report.tags,
        });
      }
    }
  }
  return chunks;
}

function searchArchive(query: string, topK: number = 5): ArchiveChunk[] {
  const q = query.toLowerCase();
  const terms = q.split(/\s+/).filter(t => t.length > 2);

  const scored = archiveIndex.map(chunk => {
    let score = 0;
    const text = chunk.text.toLowerCase();
    const title = chunk.section.toLowerCase();

    for (const term of terms) {
      // Count occurrences
      const textMatches = (text.match(new RegExp(term, 'g')) || []).length;
      const titleMatches = (title.match(new RegExp(term, 'g')) || []).length;
      score += textMatches + titleMatches * 3; // Title matches weigh more
    }

    // Bonus for exact phrase match
    if (text.includes(q)) score += 10;

    return { chunk, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => s.chunk);
}

async function queryArchive(question: string): Promise<ChatMessage> {
  loadArchiveIndex();
  const lang = getLang();

  const relevantChunks = searchArchive(question);

  if (relevantChunks.length === 0) {
    return {
      role: 'assistant',
      content: lang === 'en'
        ? 'I couldn\'t find relevant information in the archive for this question. Try rephrasing or asking about a specific topic in China missions history.'
        : '我在档案中没有找到与此问题相关的信息。请尝试重新措辞或询问中国宣教历史中的具体话题。',
    };
  }

  const context = relevantChunks.map((c, i) =>
    `[Source ${i + 1}: Report ${c.reportId} - ${c.section}]\n${c.text}`
  ).join('\n\n');

  const systemPrompt = `You are a scholarly research assistant for XuanYan (宣研), a China missions research platform. Answer questions based ONLY on the provided source material. Always cite your sources using [Report XX - Section Name] format. If the sources don't contain enough information to fully answer, say so honestly. Respond in ${lang === 'cn' ? 'Chinese (简体中文)' : 'English'}.`;

  const userPrompt = `Context from research archive:\n\n${context}\n\nQuestion: ${question}`;

  try {
    const response = await callClaudeAPI(systemPrompt, userPrompt);
    const citations = relevantChunks.map(c => ({
      reportId: c.reportId,
      section: c.section,
      title: c.reportTitle[lang],
    }));

    return { role: 'assistant', content: response, citations };
  } catch (error) {
    // Fallback: generate answer from chunks directly
    const fallback = generateFallbackAnswer(question, relevantChunks, lang);
    return {
      role: 'assistant',
      content: fallback,
      citations: relevantChunks.map(c => ({
        reportId: c.reportId,
        section: c.section,
        title: c.reportTitle[lang],
      })),
    };
  }
}

async function callClaudeAPI(system: string, user: string): Promise<string> {
  // Call CF Workers proxy
  const response = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system, user }),
  });

  if (!response.ok) throw new Error('API call failed');
  const data = await response.json();
  return data.response || data.content?.[0]?.text || '';
}

function generateFallbackAnswer(question: string, chunks: ArchiveChunk[], lang: string): string {
  const prefix = lang === 'en'
    ? 'Based on our research archive, here is what I found:\n\n'
    : '根据我们的研究档案，以下是我找到的内容：\n\n';

  const body = chunks.map((c, i) =>
    `**[Report ${c.reportId} — ${c.section}]**\n${c.text.slice(0, 300)}${c.text.length > 300 ? '...' : ''}`
  ).join('\n\n');

  const suffix = lang === 'en'
    ? '\n\n*Note: AI-generated synthesis is unavailable. Showing relevant archive excerpts. Click citations to read the full reports.*'
    : '\n\n*注意：AI生成的综合分析暂时不可用。显示相关档案摘录。点击引用阅读完整报告。*';

  return prefix + body + suffix;
}

export function renderAskArchive(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  app.innerHTML = `
    <div class="chat-container container">
      <div class="chat-header">
        <h2 data-i18n="ask.title">${t('ask.title')}</h2>
        <p style="color: var(--text-secondary); font-size: 0.875rem;" data-i18n="ask.subtitle">${t('ask.subtitle')}</p>
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="starter-chips" id="starter-chips">
          ${(STARTER_QUESTIONS[lang as 'en' | 'cn'] || STARTER_QUESTIONS.en).map(q => `
            <button class="starter-chip">${q}</button>
          `).join('')}
        </div>
      </div>
      <div class="chat-input-area">
        <textarea class="chat-input" id="chat-input" rows="1" data-i18n-placeholder="ask.placeholder" placeholder="${t('ask.placeholder')}"></textarea>
        <button class="chat-send" id="chat-send" data-i18n="ask.send">${t('ask.send')}</button>
      </div>
    </div>
  `;

  const input = document.getElementById('chat-input') as HTMLTextAreaElement;
  const sendBtn = document.getElementById('chat-send') as HTMLButtonElement;
  const messagesDiv = document.getElementById('chat-messages')!;

  async function sendMessage(text: string): Promise<void> {
    // Remove starter chips
    const chips = document.getElementById('starter-chips');
    if (chips) chips.remove();

    // Add user message
    chatHistory.push({ role: 'user', content: text });
    messagesDiv.innerHTML += `<div class="chat-message user">${escapeHtml(text)}</div>`;

    // Show loading
    messagesDiv.innerHTML += `<div class="chat-message assistant" id="loading-msg"><span class="spinner"></span> ${t('ask.thinking')}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    sendBtn.disabled = true;

    // Query
    const response = await queryArchive(text);
    chatHistory.push(response);

    // Remove loading, add response
    document.getElementById('loading-msg')?.remove();
    const citationsHtml = response.citations?.map(c =>
      `<a class="citation" href="#/research/${c.reportId}">[Report ${c.reportId}]</a>`
    ).join(' ') || '';

    messagesDiv.innerHTML += `
      <div class="chat-message assistant">
        ${formatResponse(response.content)}
        ${citationsHtml ? `<div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid var(--border);">${citationsHtml}</div>` : ''}
      </div>
    `;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    sendBtn.disabled = false;
    input.focus();
  }

  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendMessage(text);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });

  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  // Starter chips
  document.querySelectorAll('.starter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      sendMessage(chip.textContent!.trim());
    });
  });

  // Load index in background
  loadArchiveIndex();
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function formatResponse(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[Report (\d+) — ([^\]]+)\]/g, '<a class="citation" href="#/research/$1">[Report $1 — $2]</a>')
    .replace(/\[Report (\d+)\s*-\s*([^\]]+)\]/g, '<a class="citation" href="#/research/$1">[Report $1 — $2]</a>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}
