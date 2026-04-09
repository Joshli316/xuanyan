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
  index.html          — Homepage
  css/
    main.css          — Tailwind + custom CSS vars
  ts/
    main.ts           — App init, router, language toggle
    i18n.ts           — Bilingual string management
    timeline.ts       — Animated timeline component
    search.ts         — Full-text search across reports
  pages/
    research/         — 12 research report pages
    tools/            — Interactive tool pages
    about/            — FC Innovation Lab story
  data/
    reports/          — Report content as JSON (EN + CN)
    timeline.json     — Timeline events data
  assets/
    fonts/            — Noto Serif SC + Inter
    img/              — Ink-wash textures, portraits
dist/                 — Built output
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
