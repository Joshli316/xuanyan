import { t } from '../i18n';

export function renderHome(): void {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div>
            <h1 data-i18n="hero.title">${t('hero.title')}</h1>
            <p class="hero-sub" data-i18n="hero.subtitle">${t('hero.subtitle')}</p>
            <div class="hero-ctas">
              <a href="#/research" class="btn btn-primary" data-i18n="hero.cta.research">${t('hero.cta.research')}</a>
              <a href="#/tools" class="btn btn-ghost" data-i18n="hero.cta.tools">${t('hero.cta.tools')}</a>
            </div>
          </div>
          <div class="hero-visual">
            ${renderChinaOutline()}
          </div>
        </div>
      </div>
    </section>

    <!-- What We Offer -->
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2 data-i18n="offer.title">${t('offer.title')}</h2>
          <p data-i18n="offer.subtitle">${t('offer.subtitle')}</p>
        </div>
        <div class="offer-grid">
          <div class="offer-card">
            <h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              <span data-i18n="offer.observatory">${t('offer.observatory')}</span>
            </h3>
            <ul>
              <li data-i18n="offer.observatory.1">${t('offer.observatory.1')}</li>
              <li data-i18n="offer.observatory.2">${t('offer.observatory.2')}</li>
              <li data-i18n="offer.observatory.3">${t('offer.observatory.3')}</li>
            </ul>
          </div>
          <div class="offer-card">
            <h3>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              <span data-i18n="offer.tools">${t('offer.tools')}</span>
            </h3>
            <ul>
              <li data-i18n="offer.tools.1">${t('offer.tools.1')}</li>
              <li data-i18n="offer.tools.2">${t('offer.tools.2')}</li>
              <li data-i18n="offer.tools.3">${t('offer.tools.3')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Audience -->
    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2 data-i18n="audience.title">${t('audience.title')}</h2>
        </div>
        <div class="audience-scroll">
          ${renderAudienceCards()}
        </div>
      </div>
    </section>

    <!-- Built by FC -->
    <section class="section" style="border-top: 1px solid var(--border);">
      <div class="container" style="max-width: 720px; text-align: center;">
        <h2 style="margin-bottom: 16px;">Frontier Commons Innovation Lab</h2>
        <p class="footer-mission" data-i18n="footer.mission">${t('footer.mission')}</p>
        <a href="https://frontiercommons.org" class="btn btn-ghost" target="_blank" rel="noopener" data-i18n="footer.fc">${t('footer.fc')}</a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-links">
          <a href="#/research" data-i18n="nav.research">${t('nav.research')}</a>
          <a href="#/tools" data-i18n="nav.tools">${t('nav.tools')}</a>
          <a href="#/about" data-i18n="nav.about">${t('nav.about')}</a>
          <a href="https://github.com/zhihuang-ai/xuanyan" target="_blank" rel="noopener" data-i18n="footer.github">${t('footer.github')}</a>
        </div>
        <p class="footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</p>
      </div>
    </footer>
  `;
}

function renderAudienceCards(): string {
  const audiences = [
    { key: 'missionaries', icon: '🌏' },
    { key: 'scholars', icon: '📚' },
    { key: 'chinese', icon: '✝️' },
    { key: 'seekers', icon: '🔍' },
    { key: 'volunteers', icon: '🤝' },
    { key: 'churches', icon: '⛪' },
    { key: 'funders', icon: '💡' },
  ];

  return audiences.map(a => `
    <div class="audience-card">
      <div class="icon">${a.icon}</div>
      <h4 data-i18n="audience.${a.key}">${t(`audience.${a.key}`)}</h4>
      <p data-i18n="audience.${a.key}.desc">${t(`audience.${a.key}.desc`)}</p>
    </div>
  `).join('');
}

function renderChinaOutline(): string {
  // Simplified China outline with pulsing mission station dots
  return `
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M180 30 L220 25 L260 35 L290 30 L320 45 L340 40 L360 55 L370 80 L365 110 L355 130 L360 155 L350 175 L330 190 L310 200 L290 220 L270 235 L250 250 L230 260 L210 255 L190 260 L170 250 L150 240 L130 225 L110 210 L95 195 L80 175 L70 155 L65 130 L70 110 L80 90 L95 75 L110 60 L130 45 L155 35 Z"
        stroke="#D4A44C" stroke-width="1" opacity="0.3" fill="none"/>
      <!-- Taiwan -->
      <path d="M330 200 L335 210 L332 225 L325 215 Z" stroke="#D4A44C" stroke-width="0.5" opacity="0.2" fill="none"/>
      <!-- Hainan -->
      <path d="M220 255 L230 260 L225 270 L215 265 Z" stroke="#D4A44C" stroke-width="0.5" opacity="0.2" fill="none"/>
    </svg>
    <!-- Mission station pulsing dots -->
    <div class="pulse-dot" style="top: 28%; left: 72%; animation-delay: 0s;"></div>    <!-- Xi'an -->
    <div class="pulse-dot" style="top: 38%; left: 82%; animation-delay: 0.7s;"></div>  <!-- Beijing -->
    <div class="pulse-dot" style="top: 55%; left: 88%; animation-delay: 1.4s;"></div>  <!-- Shanghai -->
    <div class="pulse-dot" style="top: 65%; left: 72%; animation-delay: 2.1s;"></div>  <!-- Guangzhou -->
    <div class="pulse-dot" style="top: 50%; left: 60%; animation-delay: 0.3s;"></div>  <!-- Chengdu -->
  `;
}
