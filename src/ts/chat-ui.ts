// Shared chat infrastructure used by Ask the Archive and Historical Personas

export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function formatResponse(text: string, linkifyReports = false): string {
  let html = escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');

  if (linkifyReports) {
    html = html
      .replace(/\[Report (\d+) — ([^\]]+)\]/g, '<a class="citation" href="#/research/$1">[Report $1 — $2]</a>')
      .replace(/\[Report (\d+)\s*-\s*([^\]]+)\]/g, '<a class="citation" href="#/research/$1">[Report $1 — $2]</a>');
  }

  return html;
}

export function scoreExcerpts(
  excerpts: { text: string; source: string; year: number }[],
  query: string,
  topK: number
): { text: string; source: string; year: number; score: number }[] {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  return excerpts
    .map(e => {
      const t = e.text.toLowerCase();
      const score = queryWords.reduce((s, w) => s + (t.includes(w) ? 1 : 0), 0);
      return { ...e, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function renderChatShell(opts: {
  title: string;
  subtitle: string;
  backHref?: string;
  backLabel?: string;
  headerExtra?: string;
  placeholder: string;
  sendLabel: string;
  starterChips: string[];
}): string {
  return `
    <div class="chat-container container">
      <div class="chat-header">
        ${opts.backHref ? `<p><a href="${opts.backHref}" style="font-size: 0.8125rem; color: var(--text-tertiary);">← ${opts.backLabel || 'Back'}</a></p>` : ''}
        ${opts.headerExtra || `<h2>${opts.title}</h2><p style="color: var(--text-secondary); font-size: 0.875rem;">${opts.subtitle}</p>`}
      </div>
      <div class="chat-messages" id="chat-messages">
        <div class="starter-chips" id="starter-chips">
          ${opts.starterChips.map(q => `<button class="starter-chip">${q}</button>`).join('')}
        </div>
      </div>
      <div class="chat-input-area">
        <textarea class="chat-input" id="chat-input" rows="1" placeholder="${opts.placeholder}"></textarea>
        <button class="chat-send" id="chat-send">${opts.sendLabel}</button>
      </div>
    </div>
  `;
}

export function wireChat(onSend: (text: string) => Promise<void>): void {
  const input = document.getElementById('chat-input') as HTMLTextAreaElement;
  const sendBtn = document.getElementById('chat-send') as HTMLButtonElement;

  if (!input || !sendBtn) return;

  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    onSend(text);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  // Wire starter chips
  document.querySelectorAll('.starter-chip').forEach(chip => {
    chip.addEventListener('click', () => onSend(chip.textContent!.trim()));
  });
}

export function addUserMessage(text: string): void {
  const messagesDiv = document.getElementById('chat-messages')!;
  document.getElementById('starter-chips')?.remove();
  messagesDiv.innerHTML += `<div class="chat-message user">${escapeHtml(text)}</div>`;
}

export function showLoading(label: string): void {
  const messagesDiv = document.getElementById('chat-messages')!;
  messagesDiv.innerHTML += `<div class="chat-message assistant" id="loading-msg"><span class="spinner"></span> ${label}</div>`;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

export function hideLoading(): void {
  document.getElementById('loading-msg')?.remove();
}

export function addAssistantMessage(html: string): void {
  const messagesDiv = document.getElementById('chat-messages')!;
  messagesDiv.innerHTML += `<div class="chat-message assistant">${html}</div>`;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
