# XuanYan 宣研 — China Missions Research Platform

A bilingual (EN/CN), AI-powered research platform connecting 1,400 years of China missions history to today's international student ministry. Built by Frontier Commons Innovation Lab.

## Tech Stack
- TypeScript/HTML single-page app
- Tailwind CSS (dark mode default)
- Cloudflare Pages deployment
- No framework — vanilla TypeScript with module bundling

## Structure
```
src/
  index.html          — Shell HTML (nav, search modal, app container)
  css/main.css        — Tailwind + CSS custom properties (design tokens)
  ts/
    app.ts            — Route registration, entry point
    main.ts           — Hash router, language toggle, nav
    i18n.ts           — Bilingual string system (t() function)
    search.ts         — Full-text search with debounce
    data-loader.ts    — Static report imports + lazy loaders for heavy data
    chat-ui.ts        — Shared chat infrastructure (used by Ask Archive + Personas)
    pages/            — One file per route (home, research, timeline, map, etc.)
  data/
    reports/*.json    — 12 research reports (bilingual JSON)
    personas/*.json   — 12 persona excerpt corpora (20-25 each)
    timeline.json     — 71 timeline events
    map-data.json     — 277 geocoded mission stations
    archive-index.json — Pre-built search index (141 chunks)
functions/
  api/ask.ts          — CF Workers proxy for Claude API
public/               — Static files (sw.js, manifest, robots.txt, 404, og-image)
tests/smoke.spec.ts   — 8 Playwright E2E tests
dist/                 — Built output (wrangler pages deploy dist/)
```

## Entry Point
index.html

## Deployment
`wrangler pages deploy dist/`

## Conventions
- All user-facing strings go through i18n.ts — no hardcoded EN or CN text
- CSS custom properties for all colors (dark mode is default, light mode via toggle)
- Bilingual toggle persists to localStorage
- Report content stored as structured JSON with `en` and `cn` fields
- Mobile-first responsive: 375px → 768px → 1024px → 1440px
- Monospace (JetBrains Mono) for data/stats, Serif (Noto Serif SC) for headings, Sans (Inter) for body
- Gold accent (#D4A44C) on dark navy (#0B1222) — never pure black or pure white
- 水墨 ink-wash texture as subtle background accent, not decoration
