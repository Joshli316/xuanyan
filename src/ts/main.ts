import { setLang, getLang, t } from './i18n';

type Route = {
  path: string;
  render: () => void;
};

const routes: Route[] = [];
let currentCleanup: (() => void) | null = null;

export function registerRoute(path: string, render: () => void): void {
  routes.push({ path, render });
}

function getHash(): string {
  return window.location.hash.slice(1) || '/';
}

function matchRoute(hash: string): Route | undefined {
  // Try exact match first
  const exact = routes.find(r => r.path === hash);
  if (exact) return exact;

  // Try pattern match (e.g., /research/:id)
  for (const route of routes) {
    const routeParts = route.path.split('/');
    const hashParts = hash.split('/');
    if (routeParts.length !== hashParts.length) continue;

    let match = true;
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) continue;
      if (routeParts[i] !== hashParts[i]) { match = false; break; }
    }
    if (match) return route;
  }
  return undefined;
}

export function getRouteParam(paramName: string): string | null {
  const hash = getHash();
  for (const route of routes) {
    const routeParts = route.path.split('/');
    const hashParts = hash.split('/');
    if (routeParts.length !== hashParts.length) continue;

    let match = true;
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) continue;
      if (routeParts[i] !== hashParts[i]) { match = false; break; }
    }
    if (match) {
      const idx = routeParts.findIndex(p => p === ':' + paramName);
      if (idx >= 0) return hashParts[idx];
    }
  }
  return null;
}

export function navigate(path: string): void {
  window.location.hash = path;
}

function handleRoute(): void {
  const hash = getHash();
  const route = matchRoute(hash);

  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  if (route) {
    route.render();
  } else {
    // Default to home
    const home = routes.find(r => r.path === '/');
    if (home) home.render();
  }

  // Scroll to top on navigation
  window.scrollTo(0, 0);

  // Update active nav link
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (hash.startsWith(href.replace('#', ''))) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

export function setCleanup(fn: () => void): void {
  currentCleanup = fn;
}

function initNav(): void {
  // Language toggle
  const langBtns = document.querySelectorAll('.lang-toggle button');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang') as 'en' | 'cn';
      setLang(lang);
      updateLangButtons();
    });
  });

  // Mobile menu
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }

  // Search shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const modal = document.getElementById('search-modal');
      if (modal) {
        modal.classList.toggle('open');
        const input = modal.querySelector('.search-input') as HTMLInputElement;
        if (input) input.focus();
      }
    }
    if (e.key === 'Escape') {
      const modal = document.getElementById('search-modal');
      if (modal) modal.classList.remove('open');
    }
  });

  // Search modal backdrop click
  const searchModal = document.getElementById('search-modal');
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('open');
      }
    });
  }

  updateLangButtons();
}

function updateLangButtons(): void {
  const lang = getLang();
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Listen for lang changes to re-render current route
window.addEventListener('langchange', () => {
  updateLangButtons();
  handleRoute();
});

export function initApp(): void {
  initNav();
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
