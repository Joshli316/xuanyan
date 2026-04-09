import { t } from '../i18n';

export function renderAbout(): void {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <div class="about-content container">
      <h1 data-i18n="about.title">${t('about.title')}</h1>
      <p data-i18n="about.p1">${t('about.p1')}</p>
      <p data-i18n="about.p2">${t('about.p2')}</p>
      <p data-i18n="about.p3">${t('about.p3')}</p>

      <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border);">
        <h2 style="font-size: 1.5rem; margin-bottom: 16px;">${t('nav.research')}</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          <a href="#/research" class="btn btn-ghost">${t('hero.cta.research')}</a>
          <a href="#/research/timeline" class="btn btn-ghost">${t('timeline.title')}</a>
          <a href="#/tools/ask" class="btn btn-ghost">${t('ask.title')}</a>
        </div>
      </div>

      <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border);">
        <h2 style="font-size: 1.5rem; margin-bottom: 16px;">${t('nav.tools')}</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          <a href="#/tools/returnee" class="btn btn-ghost">${t('returnee.title')}</a>
          <a href="#/tools/training" class="btn btn-ghost">${t('training.title')}</a>
          <a href="#/tools/conversations" class="btn btn-ghost">${t('personas.title')}</a>
          <a href="#/tools/retention" class="btn btn-ghost">${t('retention.title')}</a>
        </div>
      </div>
    </div>

    <footer class="footer" style="margin-top: 64px;">
      <div class="container">
        <p class="footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</p>
      </div>
    </footer>
  `;
}
