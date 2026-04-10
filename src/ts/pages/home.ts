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

    <!-- Stat Band -->
    <section class="stat-band">
      <div class="container">
        <div class="stat-row">
          <div class="stat">
            <div class="stat-num">1,400</div>
            <div class="stat-label" data-i18n="stats.years">${t('stats.years')}</div>
          </div>
          <div class="stat">
            <div class="stat-num">12</div>
            <div class="stat-label" data-i18n="stats.reports">${t('stats.reports')}</div>
          </div>
          <div class="stat">
            <div class="stat-num">277</div>
            <div class="stat-label" data-i18n="stats.stations">${t('stats.stations')}</div>
          </div>
          <div class="stat">
            <div class="stat-num">12</div>
            <div class="stat-label" data-i18n="stats.personas">${t('stats.personas')}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 01 / OFFER -->
    <section class="section editorial-section">
      <div class="container">
        <div class="editorial-header">
          <span class="section-marker">01 / <span data-i18n="section.label.offer">${t('section.label.offer')}</span></span>
          <h2 data-i18n="offer.title">${t('offer.title')}</h2>
          <p class="editorial-sub" data-i18n="offer.subtitle">${t('offer.subtitle')}</p>
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

    <!-- 02 / AUDIENCE -->
    <section class="section editorial-section">
      <div class="container">
        <div class="editorial-header">
          <span class="section-marker">02 / <span data-i18n="section.label.audience">${t('section.label.audience')}</span></span>
          <h2 data-i18n="audience.title">${t('audience.title')}</h2>
        </div>
        <div class="audience-mosaic">
          ${renderAudienceMosaic()}
        </div>
      </div>
    </section>

    <!-- 03 / LAB -->
    <section class="section editorial-section" style="border-top: 1px solid var(--border);">
      <div class="container">
        <div class="editorial-header">
          <span class="section-marker">03 / <span data-i18n="section.label.lab">${t('section.label.lab')}</span></span>
          <h2>Frontier Commons Innovation Lab</h2>
        </div>
        <div class="lab-content">
          <p class="footer-mission" data-i18n="footer.mission">${t('footer.mission')}</p>
          <a href="https://frontiercommons.org" class="btn btn-ghost" target="_blank" rel="noopener" data-i18n="footer.fc">${t('footer.fc')}</a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-links">
          <a href="#/research" data-i18n="nav.research">${t('nav.research')}</a>
          <a href="#/tools" data-i18n="nav.tools">${t('nav.tools')}</a>
          <a href="#/about" data-i18n="nav.about">${t('nav.about')}</a>
          <a href="https://github.com/Joshli316/xuanyan" target="_blank" rel="noopener" data-i18n="footer.github">${t('footer.github')}</a>
        </div>
        <p class="footer-tagline" data-i18n="footer.tagline">${t('footer.tagline')}</p>
      </div>
    </footer>
  `;
}

function renderAudienceMosaic(): string {
  // Featured: Chinese Christians (the audience no competitor serves directly)
  // Mosaic layout: 1 featured + 6 standard, broken across 3 columns
  const featured = { key: 'chinese', icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' };
  const standard = [
    { key: 'missionaries', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
    { key: 'scholars', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' },
    { key: 'seekers', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>' },
    { key: 'volunteers', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
    { key: 'churches', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
    { key: 'funders', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
  ];

  const featuredCard = `
    <a href="#/tools/returnee" class="audience-card audience-featured">
      <div class="featured-marker">FEATURED</div>
      <div class="icon" style="color: var(--accent-gold);">${featured.icon}</div>
      <h4 data-i18n="audience.${featured.key}">${t(`audience.${featured.key}`)}</h4>
      <p data-i18n="audience.${featured.key}.desc">${t(`audience.${featured.key}.desc`)}</p>
      <span class="featured-cta">→ ${t('returnee.title')}</span>
    </a>
  `;

  const standardCards = standard.map(a => `
    <div class="audience-card audience-standard">
      <div class="icon" style="color: var(--accent-gold);">${a.icon}</div>
      <h4 data-i18n="audience.${a.key}">${t(`audience.${a.key}`)}</h4>
      <p data-i18n="audience.${a.key}.desc">${t(`audience.${a.key}.desc`)}</p>
    </div>
  `).join('');

  return featuredCard + standardCards;
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
    <div class="pulse-dot" style="top: 28%; left: 72%; animation-delay: 0s;"></div>
    <div class="pulse-dot" style="top: 38%; left: 82%; animation-delay: 0.7s;"></div>
    <div class="pulse-dot" style="top: 55%; left: 88%; animation-delay: 1.4s;"></div>
    <div class="pulse-dot" style="top: 65%; left: 72%; animation-delay: 2.1s;"></div>
    <div class="pulse-dot" style="top: 50%; left: 60%; animation-delay: 0.3s;"></div>
  `;
}
