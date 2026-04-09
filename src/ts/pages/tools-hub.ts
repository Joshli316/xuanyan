import { t } from '../i18n';

interface Tool {
  title: string;
  desc: string;
  href: string;
  icon: string;
}

function getTools(): Tool[] {
  return [
    {
      title: t('ask.title'),
      desc: t('ask.subtitle'),
      href: '#/tools/ask',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    },
    {
      title: t('personas.title'),
      desc: t('personas.subtitle'),
      href: '#/tools/conversations',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    },
    {
      title: t('returnee.title'),
      desc: t('returnee.subtitle'),
      href: '#/tools/returnee',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    },
    {
      title: t('training.title'),
      desc: t('training.subtitle'),
      href: '#/tools/training',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    },
    {
      title: t('retention.title'),
      desc: t('retention.subtitle'),
      href: '#/tools/retention',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    },
    {
      title: t('comparator.title'),
      desc: t('comparator.subtitle'),
      href: '#/research/comparator',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="8" height="18" rx="1"/><rect x="14" y="3" width="8" height="18" rx="1"/></svg>',
    },
  ];
}

export function renderToolsHub(): void {
  const app = document.getElementById('app')!;
  const tools = getTools();

  app.innerHTML = `
    <div class="tool-page container">
      <div class="tool-header">
        <h1 data-i18n="tools.title">${t('tools.title')}</h1>
        <p data-i18n="tools.subtitle">${t('tools.subtitle')}</p>
      </div>
      <div class="offer-grid">
        ${tools.map(tool => `
          <a href="${tool.href}" class="card" style="text-decoration: none; display: block;">
            <div style="color: var(--accent-gold); margin-bottom: 16px;">${tool.icon}</div>
            <h3 style="font-size: 1.125rem; margin-bottom: 8px;">${tool.title}</h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">${tool.desc}</p>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}
