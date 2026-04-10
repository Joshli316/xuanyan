import { t } from '../i18n';

export function renderHome(): void {
  const app = document.getElementById('app')!;

  // Lazy-load the China outline path (14KB) only on the home page
  import('../data/china-outline').then(({ CHINA_PATH }) => {
    const pathEl = document.getElementById('china-outline-path');
    if (pathEl) pathEl.setAttribute('d', CHINA_PATH);
  });

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
    <section class="section editorial-section section-offer">
      <div class="container">
        <div class="editorial-header">
          <span class="section-marker">01 / <span data-i18n="section.label.offer">${t('section.label.offer')}</span></span>
          <h2 data-i18n="offer.title">${t('offer.title')}</h2>
          <p class="editorial-sub" data-i18n="offer.subtitle">${t('offer.subtitle')}</p>
        </div>
        <div class="offer-asymmetric">
          <div class="offer-card offer-featured">
            <div class="offer-marker">PRIMARY</div>
            <div class="offer-stat">12<span class="offer-stat-label">REPORTS</span></div>
            <h3>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              <span data-i18n="offer.observatory">${t('offer.observatory')}</span>
            </h3>
            <ul>
              <li data-i18n="offer.observatory.1">${t('offer.observatory.1')}</li>
              <li data-i18n="offer.observatory.2">${t('offer.observatory.2')}</li>
              <li data-i18n="offer.observatory.3">${t('offer.observatory.3')}</li>
            </ul>
            <a href="#/research" class="offer-cta">→ Browse Research</a>
          </div>
          <div class="offer-card offer-companion">
            <h3>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              <span data-i18n="offer.tools">${t('offer.tools')}</span>
            </h3>
            <ul>
              <li data-i18n="offer.tools.1">${t('offer.tools.1')}</li>
              <li data-i18n="offer.tools.2">${t('offer.tools.2')}</li>
              <li data-i18n="offer.tools.3">${t('offer.tools.3')}</li>
            </ul>
            <a href="#/tools" class="offer-cta">→ Open Tools</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 02 / AUDIENCE -->
    <section class="section editorial-section section-audience">
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
    <section class="section editorial-section section-lab">
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
  // Layout: featured 2x2 + 5 standard cards = exactly 9 cells in a 3x3 grid (no orphans)
  // Dropped "Non-Christians" — passive audience, not a primary user the platform serves
  const featured = { key: 'chinese', icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' };
  const standard = [
    { key: 'missionaries', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
    { key: 'scholars', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' },
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
  // Real China outline (Wikimedia Commons, public domain) + 5 historical mission cities
  // City positions are in viewBox coordinates (1000x850)
  const cities = [
    { name: "Xi'an",     x: 540, y: 420, year: 635 },  // Nestorian arrival
    { name: 'Beijing',   x: 680, y: 340, year: 1294 }, // Franciscan mission
    { name: 'Shanghai',  x: 760, y: 460, year: 1843 }, // Treaty port
    { name: 'Chengdu',   x: 460, y: 480, year: 1877 }, // CIM inland
    { name: 'Guangzhou', x: 630, y: 610, year: 1807 }, // Morrison
  ];

  return `
    <svg viewBox="0 0 1000 850" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <!-- China outline path — populated via lazy import in renderHome -->
      <path id="china-outline-path" d="" stroke="#D4A44C" stroke-width="3" opacity="0.5" fill="none" stroke-linejoin="round"/>

      ${cities.map((c, i) => `
        <!-- ${c.name} marker -->
        <g class="city-marker" style="animation-delay: ${i * 0.4}s;">
          <!-- Crosshair lines -->
          <line x1="${c.x - 28}" y1="${c.y}" x2="${c.x - 12}" y2="${c.y}" stroke="#D4A44C" stroke-width="2" opacity="0.6"/>
          <line x1="${c.x + 12}" y1="${c.y}" x2="${c.x + 28}" y2="${c.y}" stroke="#D4A44C" stroke-width="2" opacity="0.6"/>
          <line x1="${c.x}" y1="${c.y - 28}" x2="${c.x}" y2="${c.y - 12}" stroke="#D4A44C" stroke-width="2" opacity="0.6"/>
          <line x1="${c.x}" y1="${c.y + 12}" x2="${c.x}" y2="${c.y + 28}" stroke="#D4A44C" stroke-width="2" opacity="0.6"/>
          <!-- Sharp square marker (matches the editorial 0-radius design language) -->
          <rect x="${c.x - 8}" y="${c.y - 8}" width="16" height="16" fill="#D4A44C"/>
          <!-- City label in mono -->
          <text x="${c.x + 36}" y="${c.y + 4}" font-family="JetBrains Mono, monospace" font-size="22" font-weight="500" fill="#E8E0D4" letter-spacing="1">${c.name}</text>
          <text x="${c.x + 36}" y="${c.y + 30}" font-family="JetBrains Mono, monospace" font-size="18" fill="#D4A44C" letter-spacing="2">${c.year}</text>
        </g>
      `).join('')}
    </svg>
  `;
}
