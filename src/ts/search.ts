import { getLang } from './i18n';
import { reports, type Report } from './data-loader';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  type: 'report' | 'tool' | 'page';
  href: string;
}

let searchIndex: Report[] = [];

function loadIndex(): void {
  if (searchIndex.length > 0) return;
  searchIndex = reports;
}

function search(query: string): SearchResult[] {
  const lang = getLang();
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  // Search reports
  for (const report of searchIndex) {
    const title = report.title[lang].toLowerCase();
    const summary = report.summary[lang].toLowerCase();
    const content = report.content[lang].toLowerCase();

    if (title.includes(q) || summary.includes(q) || content.includes(q)) {
      // Find excerpt around the match
      let excerpt = report.summary[lang];
      const contentLower = content;
      const idx = contentLower.indexOf(q);
      if (idx >= 0) {
        const start = Math.max(0, idx - 60);
        const end = Math.min(content.length, idx + q.length + 60);
        excerpt = (start > 0 ? '...' : '') + report.content[lang].slice(start, end) + (end < content.length ? '...' : '');
      }

      results.push({
        id: report.id,
        title: report.title[lang],
        excerpt,
        type: 'report',
        href: `#/research/${report.id}`,
      });
    }
  }

  // Static pages/tools
  const staticPages: { title: string; href: string; keywords: string[] }[] = [
    { title: 'Timeline', href: '#/research/timeline', keywords: ['timeline', 'history', 'chronology', '时间线', '历史'] },
    { title: 'Ask the Archive', href: '#/tools/ask', keywords: ['ask', 'archive', 'ai', 'search', 'question', '问', '档案'] },
    { title: 'Returnee Tool', href: '#/tools/returnee', keywords: ['returnee', 'return', 'china', 'kit', '回国', '准备'] },
    { title: 'Training', href: '#/tools/training', keywords: ['training', 'volunteer', 'module', '培训', '志愿者'] },
    { title: 'Conversations', href: '#/tools/conversations', keywords: ['conversation', 'persona', 'historical', 'chat', '对话', '历史人物'] },
    { title: 'Retention Calculator', href: '#/tools/retention', keywords: ['retention', 'calculator', 'faith', '保留', '计算'] },
    { title: 'Gap Tracker', href: '#/research/gaps', keywords: ['gap', 'research', 'tracker', '缺口', '研究'] },
    { title: 'Comparator', href: '#/research/comparator', keywords: ['comparator', 'bilingual', 'compare', '比较', '双语'] },
    { title: 'Map', href: '#/research/map', keywords: ['map', 'spread', 'geography', '地图', '传播'] },
    { title: 'Network', href: '#/research/network', keywords: ['network', 'graph', 'connections', '网络', '关系'] },
  ];

  for (const page of staticPages) {
    if (page.title.toLowerCase().includes(q) || page.keywords.some(k => k.includes(q))) {
      results.push({
        id: page.href,
        title: page.title,
        excerpt: page.keywords.join(', '),
        type: 'tool',
        href: page.href,
      });
    }
  }

  return results.slice(0, 10);
}

function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}

export function initSearch(): void {
  const input = document.querySelector('.search-input') as HTMLInputElement;
  const resultsContainer = document.getElementById('search-results');
  const searchTrigger = document.getElementById('search-trigger');
  const modal = document.getElementById('search-modal');

  if (!input || !resultsContainer || !modal) return;

  searchTrigger?.addEventListener('click', () => {
    modal.classList.add('open');
    input.focus();
    loadIndex();
  });

  let debounceTimer: ReturnType<typeof setTimeout>;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => performSearch(), 150);
  });

  function performSearch(): void {
    if (!resultsContainer) return;
    const query = input.value.trim();
    if (query.length < 2) {
      resultsContainer.innerHTML = '';
      return;
    }
    const results = search(query);
    if (results.length === 0) {
      resultsContainer.innerHTML = `<div class="search-hint">No results found</div>`;
      return;
    }
    resultsContainer.innerHTML = results.map(r => `
      <div class="search-result" data-href="${r.href}">
        <h4>${highlightMatch(r.title, query)}</h4>
        <p>${highlightMatch(r.excerpt.replace(/[#*_]/g, '').slice(0, 120), query)}</p>
      </div>
    `).join('');
  }

  resultsContainer.addEventListener('click', (e) => {
    const result = (e.target as HTMLElement).closest('.search-result') as HTMLElement;
    if (result) {
      const href = result.dataset.href;
      if (href) {
        location.hash = href.replace('#', '');
        modal.classList.remove('open');
        input.value = '';
        resultsContainer.innerHTML = '';
      }
    }
  });
}
