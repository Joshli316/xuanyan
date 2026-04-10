import { t, getLang } from '../i18n';
import { reports as allReports } from '../data-loader';
import { formatResponse, renderChatShell, wireChat, addUserMessage, showLoading, hideLoading, addAssistantMessage } from '../chat-ui';

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
      // Count occurrences — escape regex special chars from user input
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const textMatches = (text.match(new RegExp(escaped, 'g')) || []).length;
      const titleMatches = (title.match(new RegExp(escaped, 'g')) || []).length;
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

function queryArchive(question: string): ChatMessage {
  loadArchiveIndex();
  const lang = getLang();
  const relevantChunks = searchArchive(question);

  if (relevantChunks.length === 0) {
    return {
      role: 'assistant',
      content: lang === 'en'
        ? 'No matching results in the archive. Try rephrasing — for example, ask about a specific person, era, or event in China missions history.'
        : '档案中没有匹配的结果。请尝试换个问法——例如，询问中国宣教历史中的具体人物、时代或事件。',
    };
  }

  // Build a structured answer from the top matching archive chunks
  const header = lang === 'en'
    ? `Found ${relevantChunks.length} relevant passage${relevantChunks.length > 1 ? 's' : ''} from the research archive:\n\n`
    : `从研究档案中找到 ${relevantChunks.length} 条相关段落：\n\n`;

  const body = relevantChunks.map(c =>
    `**[Report ${c.reportId} — ${c.section}]**\n${c.text.slice(0, 400)}${c.text.length > 400 ? '...' : ''}`
  ).join('\n\n');

  const footer = lang === 'en'
    ? '\n\n*Click any citation above to read the full report.*'
    : '\n\n*点击上方引用阅读完整报告。*';

  return {
    role: 'assistant',
    content: header + body + footer,
    citations: relevantChunks.map(c => ({
      reportId: c.reportId,
      section: c.section,
      title: c.reportTitle[lang],
    })),
  };
}

export function renderAskArchive(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  // Reset chat history on re-render (prevents stale accumulation)
  chatHistory.length = 0;

  app.innerHTML = renderChatShell({
    title: t('ask.title'),
    subtitle: t('ask.subtitle'),
    placeholder: t('ask.placeholder'),
    sendLabel: t('ask.send'),
    starterChips: STARTER_QUESTIONS[lang as 'en' | 'cn'] || STARTER_QUESTIONS.en,
  });

  const sendBtn = document.getElementById('chat-send') as HTMLButtonElement;

  wireChat(async (text) => {
    addUserMessage(text);
    chatHistory.push({ role: 'user', content: text });

    // Client-side search — instant, no API needed
    const response = queryArchive(text);
    chatHistory.push(response);

    const citationsHtml = response.citations?.map(c =>
      `<a class="citation" href="#/research/${c.reportId}">[Report ${c.reportId}]</a>`
    ).join(' ') || '';

    const responseHtml = formatResponse(response.content, true) +
      (citationsHtml ? `<div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid var(--border);">${citationsHtml}</div>` : '');
    addAssistantMessage(responseHtml);

    (document.getElementById('chat-input') as HTMLTextAreaElement)?.focus();
  });

  loadArchiveIndex();
}
