import { t, getLang } from '../i18n';
import { getRouteParam, navigate } from '../main';
import { reports as allReports, type Report } from '../data-loader';

function loadReports(): Report[] {
  return allReports;
}

const FILTERS = ['All', 'History', 'Gaps', 'AI', 'Ministry', 'Contemporary', 'Scholarship', 'Diaspora', 'Culture'];

export function renderResearchList(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  app.innerHTML = `
    <div class="tool-page container">
      <div class="tool-header">
        <h1 data-i18n="research.title">${t('research.title')}</h1>
        <p data-i18n="research.subtitle">${t('research.subtitle')}</p>
      </div>

      <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
        <a href="#/research/timeline" class="btn btn-ghost" style="font-size: 0.8125rem; padding: 8px 16px;">${t('timeline.title')}</a>
        <a href="#/research/map" class="btn btn-ghost" style="font-size: 0.8125rem; padding: 8px 16px;">Spread Map</a>
        <a href="#/research/network" class="btn btn-ghost" style="font-size: 0.8125rem; padding: 8px 16px;">Network Graph</a>
        <a href="#/research/gaps" class="btn btn-ghost" style="font-size: 0.8125rem; padding: 8px 16px;">${t('gaps.title')}</a>
        <a href="#/research/comparator" class="btn btn-ghost" style="font-size: 0.8125rem; padding: 8px 16px;">${t('comparator.title')}</a>
      </div>

      <div class="filter-tabs" id="filter-tabs">
        ${FILTERS.map(f => `
          <button class="filter-tab${f === 'All' ? ' active' : ''}" data-filter="${f}">
            ${f === 'All' ? t('research.filter.all') : f}
          </button>
        `).join('')}
      </div>
      <div class="report-grid" id="report-grid">
        <p style="color: var(--text-tertiary);" data-i18n="common.loading">${t('common.loading')}</p>
      </div>
    </div>
  `;

  const reports = loadReports();
  renderGrid(reports, 'All');

  document.getElementById('filter-tabs')!.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.filter-tab') as HTMLElement;
    if (!btn) return;
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter || 'All';
    const filtered = filter === 'All' ? reports : reports.filter(r => r.tags.includes(filter));
    renderGrid(filtered, filter);
  });
}

function renderGrid(reports: Report[], _filter: string): void {
  const lang = getLang();
  const grid = document.getElementById('report-grid');
  if (!grid) return;

  grid.innerHTML = reports.map(r => `
    <div class="report-card" data-id="${r.id}" onclick="location.hash='/research/${r.id}'">
      <span class="badge">${r.id}</span>
      <h3>${r.title[lang]}</h3>
      <p class="summary">${r.summary[lang]}</p>
      <div class="tags">
        ${r.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

export function renderResearchDetail(): void {
  const id = getRouteParam('id');
  if (!id) { navigate('/research'); return; }

  // Check if this is a sub-route like 'timeline', 'map', etc.
  if (['timeline', 'map', 'network', 'gaps', 'comparator'].includes(id)) {
    return; // These are handled by their own routes
  }

  const app = document.getElementById('app')!;
  const lang = getLang();

  const reports = loadReports();
  const report = reports.find(r => r.id === id);
  if (!report) { navigate('/research'); return; }

  {

    const content = report.content[lang];
    const headings = extractHeadings(content);

    app.innerHTML = `
      <div class="container">
        <div class="report-layout">
          <aside class="report-toc">
            <p><a href="#/research" style="font-size: 0.8125rem; color: var(--text-tertiary);">${t('toc.back')}</a></p>
            <h4>${t('toc.title')}</h4>
            ${headings.map((h, i) => `
              <a href="javascript:void(0)" data-section="${i}" class="${h.level === 2 ? '' : 'style="padding-left: 24px;"'}">${h.text}</a>
            `).join('')}
          </aside>
          <main class="report-content" id="report-body">
            <h1>${report.title[lang]}</h1>
            <p class="summary" style="font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 32px;">${report.summary[lang]}</p>
            ${renderMarkdown(content)}
            ${report.sources.length > 0 ? `
              <div class="report-sources">
                <h3>${t('toc.sources')}</h3>
                <ul>${report.sources.map(s => `<li>${s}</li>`).join('')}</ul>
              </div>
            ` : ''}
          </main>
          <div></div>
        </div>
      </div>
    `;

    // TOC click handlers
    document.querySelectorAll('.report-toc a[data-section]').forEach(a => {
      a.addEventListener('click', () => {
        const idx = parseInt(a.getAttribute('data-section') || '0');
        const sections = document.querySelectorAll('#report-body h2, #report-body h3');
        if (sections[idx]) {
          sections[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

function extractHeadings(markdown: string): { text: string; level: number }[] {
  const headings: { text: string; level: number }[] = [];
  const lines = markdown.split('\n');
  for (const line of lines) {
    const m2 = line.match(/^## (.+)/);
    const m3 = line.match(/^### (.+)/);
    if (m2) headings.push({ text: m2[1].replace(/\*\*/g, ''), level: 2 });
    else if (m3) headings.push({ text: m3[1].replace(/\*\*/g, ''), level: 3 });
  }
  return headings;
}

function renderMarkdown(md: string): string {
  let html = md
    // Tables
    .replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)*)/g, (_match, header: string, body: string) => {
      const headers = header.split('|').filter((s: string) => s.trim()).map((s: string) => `<th>${s.trim()}</th>`).join('');
      const rows = body.trim().split('\n').map((row: string) => {
        const cells = row.split('|').filter((s: string) => s.trim()).map((s: string) => `<td>${s.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
    })
    // Headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr style="border: none; border-top: 1px solid var(--border); margin: 32px 0;">')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Bullet lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> in <ul>
    .replace(/((?:<li>.+<\/li>\n?)+)/g, '<ul>$1</ul>')
    // Paragraphs (lines that aren't already HTML)
    .replace(/^(?!<[hultdo/]|$)(.+)$/gm, '<p>$1</p>')
    // Clean up double line breaks
    .replace(/\n\n+/g, '\n');

  return html;
}
