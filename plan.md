# Implementation Plan: XuanYan 宣研

## Overview
XuanYan is a bilingual, AI-powered China missions research platform built by Frontier Commons Innovation Lab. It connects 1,400 years of missions history to today's international student ministry through interactive tools — not just static articles. No competitor in the field offers bilingual content, AI-powered search, or interactive data visualization. This is missions innovation through technology.

## Design Spec

### Color Palette
```
--bg-primary: #0B1222        /* Deep navy — main background */
--bg-secondary: #111B2E      /* Slightly lighter — cards, panels */
--bg-tertiary: #1A2540       /* Hover states, active panels */
--bg-surface: #0E1628        /* Elevated surfaces */

--text-primary: #E8E0D4      /* Warm off-white — body text */
--text-secondary: #9B9180    /* Muted warm — secondary text */
--text-tertiary: #6B6358     /* Faint — labels, captions */

--accent-gold: #D4A44C       /* Primary accent — links, highlights */
--accent-gold-hover: #E8B85E /* Hover state */
--accent-gold-muted: #D4A44C33 /* 20% opacity — backgrounds */

--ink-wash: #1E2A3F          /* Subtle ink-wash texture overlay */
--border: #1E2A3F            /* Borders — barely visible */
--border-accent: #D4A44C44   /* Gold border at 27% opacity */

--success: #4ADE80
--warning: #FBBF24
--error: #F87171
```

### Typography
```
--font-display: 'Noto Serif SC', 'Georgia', serif    /* Headings, Chinese text */
--font-body: 'Inter', system-ui, sans-serif           /* Body text */
--font-mono: 'JetBrains Mono', monospace              /* Data, stats, code */

--text-4xl: 2.5rem / 1.15    /* Page titles */
--text-3xl: 2rem / 1.2       /* Section headings */
--text-2xl: 1.5rem / 1.3     /* Subsection headings */
--text-xl: 1.25rem / 1.4     /* Card titles */
--text-lg: 1.125rem / 1.6    /* Lead paragraphs */
--text-base: 1rem / 1.7      /* Body text — 16px */
--text-sm: 0.875rem / 1.5    /* Captions, labels */
--text-xs: 0.75rem / 1.4     /* Badges, metadata */
```

### Spacing Scale
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
Tight within groups (8-16px), generous between sections (64-96px)
```

### Shape Language
- Containers: sharp corners (0px radius) — editorial, serious
- Interactive elements (buttons, toggles): 6px radius — approachable
- Cards: 2px radius — barely softened
- Ink-wash texture: CSS background blend on hero sections only

### Transitions
```
--transition: 200ms ease
/* One duration, one easing, everywhere */
```

### Responsive Breakpoints
```
375px   — Mobile (single column, stacked nav)
768px   — Tablet (two-column where appropriate)
1024px  — Desktop (full layout, sidebar nav)
1440px  — Wide (max-width container, centered)
```

### Component Patterns
- **Language toggle**: Pill switch in top-right nav — "EN | 中文" — gold underline on active
- **Report pages**: Left sidebar TOC (sticky), main reading column (max 720px), right margin for pull quotes
- **Data displays**: Monospace font, gold accent numbers, subtle grid lines
- **Buttons**: Ghost style default (border + text), solid gold for primary CTAs
- **Navigation**: Top bar with logo left, section links center, language toggle + search right
- **Cards**: Dark surface with 1px border, gold accent on hover (left border glow)
- **Timeline**: Vertical line (gold) with event nodes, scrollable, decade markers

---

## Phase 1: Foundation + Killer Features
*Goal: Ship a site that already beats every competitor*

### Build 1A: Project Scaffold + Homepage (1 session)

**Step 1.** Set up project structure — `src/`, `dist/`, Tailwind config, TypeScript config, build script (esbuild or Vite)

**Step 2.** Create `src/css/main.css` with all CSS custom properties from Design Spec above, Tailwind directives, font imports (Noto Serif SC, Inter, JetBrains Mono from Google Fonts), ink-wash background texture (CSS radial gradient, not an image)

**Step 3.** Create `src/ts/i18n.ts` — bilingual string system. Object with keys like `hero.title`, values `{ en: "...", cn: "..." }`. Export `t(key)` function that returns current language string. Language state in localStorage.

**Step 4.** Create `src/ts/main.ts` — simple hash-based router (`#/research`, `#/tools`, `#/about`), language toggle handler, mobile nav toggle

**Step 5.** Build `src/index.html` — the homepage with:
- Top nav: Logo (宣研 XuanYan) left, links (Research | Tools | About) center, language toggle + search icon right
- Hero section: Split layout. Left: headline "Where missions history meets AI innovation" / "当宣教历史遇见人工智能" + subhead explaining what this is + two CTAs ("Explore Research" / "Use Tools"). Right: subtle animated element (glowing dot on a minimal China outline, pulsing at mission station locations)
- "What We Offer" section: Two cards side by side — Research Observatory (icon + 3 bullet features) and Ministry Tools (icon + 3 bullet features)
- Audience row: 7 audience cards in a horizontal scroll — Missionaries, Scholars, Chinese Christians, Non-Christians, Volunteers, Churches, Funders — each with one-line value prop
- "Built by Frontier Commons Innovation Lab" footer section — mission statement, link to FC
- Footer: FC branding, links, "Powered by AI. Grounded in 1,400 years of history."

**Step 6.** Verify: responsive at 375/768/1024/1440, bilingual toggle works, dark mode renders correctly, no console errors

### Build 1B: Research Reports (1 session)

**Step 7.** Convert 12 research reports from `~/Desktop/Projects/Research/2026-04-09-china-missions-scholarship/` into structured JSON in `src/data/reports/`. Each file: `{ id, title: {en, cn}, summary: {en, cn}, content: {en, cn}, sources: [], tags: [] }`. For Phase 1, CN content can be AI-translated with a review pass later.

**Step 8.** Build report listing page (`#/research`) — grid of 12 report cards. Each card: number badge, title, one-line summary, tags. Gold left-border hover effect. Filter by tag (History, Gaps, AI, Ministry, Contemporary).

**Step 9.** Build report reading page (`#/research/:id`) — left sticky TOC (auto-generated from headings), main reading column (max 720px, Noto Serif SC for CN, Inter for EN), source citations at bottom. Bilingual toggle switches content in place without page reload.

**Step 10.** Add full-text search across all reports — `src/ts/search.ts`. Simple client-side search indexing report titles, summaries, and content. Search modal opens with Cmd+K or search icon. Results show matching report + highlighted excerpt.

**Step 11.** Verify: all 12 reports render correctly in both languages, TOC navigation works, search returns relevant results, mobile reading experience is clean

### Build 1C: Interactive Timeline (1 session)

**Step 12.** Create `src/data/timeline.json` — 50-80 key events from 635 AD to 2026. Each event: `{ year, title: {en, cn}, description: {en, cn}, category: "nestorian|catholic|protestant|indigenous|persecution|contemporary", location?, figure? }`. Source data from Report 01.

**Step 13.** Build timeline component (`#/research/timeline`) — vertical scrollable timeline. Gold vertical line. Event nodes as circles on the line, color-coded by category. Click a node to expand details panel. Decade markers on the left. Category filter pills at top.

**Step 14.** Add era navigation — quick-jump buttons: "Tang Dynasty", "Jesuits", "Protestant Era", "Republican", "Communist", "Contemporary". Clicking scrolls to that era.

**Step 15.** Add "auto-play" mode — button that slowly scrolls the timeline, simulating the passage of time. Events fade in as you reach them.

**Step 16.** Verify: timeline renders all events, filters work, bilingual, mobile-scrollable, auto-play smooth

### Build 1D: Ask the Archive (1 session)

**Step 17.** Create `src/data/archive-index.json` — pre-processed search index of all 12 reports chunked into ~200-word segments with metadata (report title, section heading, tags). This is the retrieval corpus.

**Step 18.** Build "Ask the Archive" page (`#/tools/ask`) — chat-style interface. Input field at bottom ("Ask anything about China missions history..."). Messages appear above. Each AI response includes inline source citations (clickable links to the relevant report section).

**Step 19.** Implement RAG logic in `src/ts/ask-archive.ts` — on user query: (1) search the archive index for top 5 most relevant chunks using TF-IDF or embedding similarity, (2) construct a prompt with the retrieved chunks as context, (3) call Claude API (or proxy endpoint on CF Workers) to generate a grounded answer, (4) display response with citations.

**Step 20.** Add bilingual support — user can ask in English or Chinese, response comes in the same language. The system prompt instructs the model to respond in the query language and always cite sources.

**Step 21.** Add example questions as starter chips: "What caused the Boxer Rebellion?", "Who were the first Chinese Christian women leaders?", "How did missionaries impact Chinese education?", "为什么80%的留学生回国后失去信仰?"

**Step 22.** Verify: questions return sourced answers, citations link to correct report sections, bilingual works, mobile layout is usable, error states handled (API timeout, no results)

### Build 1E: Deployment + Polish (1 session)

**Step 23.** Create GitHub repo `xuanyan` under Z's account. Push all code.

**Step 24.** Deploy to Cloudflare Pages. Configure custom domain if available (xuanyan.frontiercommons.org or xuanyan.pages.dev).

**Step 25.** Add meta tags — Open Graph (title, description, image for social sharing), favicon (宣 character in gold on navy), lang attribute that switches with toggle.

**Step 26.** Performance pass — verify Lighthouse score > 90. Lazy-load report content. Preload fonts. Minimize JS bundle.

**Step 27.** Final verification at all 4 breakpoints. Test bilingual toggle on every page. Test search. Test Ask the Archive. Screenshot and confirm.

---

## Phase 2: Data Visualization + Ministry Tools
*Goal: Add the features that make the site a platform, not just a publication*

### Build 2A: Animated Spread Map (1 session)

**Step 1.** Download CHCD open dataset from GitHub (CSV, CC BY 4.0). Parse into `src/data/map-data.json` — extract: institution name, type (church/school/hospital), denomination, latitude, longitude, founding year, closing year.

**Step 2.** Build map page (`#/research/map`) using Leaflet.js with dark tile layer (CartoDB Dark Matter). Plot CHCD data as circle markers, color-coded by denomination.

**Step 3.** Add timeline slider (range input) — 635 AD to 2026. As user drags, filter visible markers by founding year ≤ slider value. Markers fade in with CSS transition.

**Step 4.** Add play/pause button — auto-advances slider, animating 1,400 years in 60 seconds. Speed control (1x, 2x, 4x).

**Step 5.** Add click-to-inspect — click a marker to see details popup (name, type, denomination, founded by, dates).

**Step 6.** Add layer toggles — show/hide churches, schools, hospitals. Denomination filter checkboxes.

**Step 7.** Add era labels that appear on the map as the slider passes key dates (e.g., "1807: First Protestant missionary" fades in at that year).

**Step 8.** Verify: all CHCD data plots correctly, slider animates smoothly, filters work, mobile-usable (touch-friendly slider), bilingual labels.

### Build 2B: Network Graph (1 session)

**Step 1.** Extract person-to-person and person-to-institution relationships from CHCD data. Create `src/data/network.json` — nodes (people, institutions) and edges (relationships).

**Step 2.** Build network page (`#/research/network`) using D3.js force-directed graph or Sigma.js. Nodes sized by connection count. Color-coded: missionaries (gold), Chinese Christians (teal), institutions (muted).

**Step 3.** Add search — type a name, graph centers on that node and highlights their connections.

**Step 4.** Add degree-of-separation toggle — show direct connections only, or 2nd-degree connections.

**Step 5.** Add click-to-inspect — click a node to see bio card (name, dates, role, key connections, link to BDCC if available).

**Step 6.** Add filters — by era, denomination, role (missionary/convert/educator/doctor).

**Step 7.** Verify: graph renders without performance issues (may need to limit to top 500 most-connected nodes for initial view), search works, mobile shows a simplified list view instead of graph.

### Build 2C: Returnee Preparation Tool (1 session)

**Step 1.** Build tool page (`#/tools/returnee`) — multi-step questionnaire with progress indicator.

**Step 2.** Step 1: City selector — "Where are you returning to?" Dropdown of major Chinese cities (Beijing, Shanghai, Guangzhou, Shenzhen, Chengdu, Wuhan, Hangzhou, Nanjing, Xi'an, Other).

**Step 3.** Step 2: Faith profile — "How long have you been a Christian?" (slider), "Have you been baptized?" (Y/N), "Have you completed a discipleship program?" (Y/N).

**Step 4.** Step 3: Concerns — "What are you most worried about?" Multi-select: finding a church, family pressure, workplace identity, loneliness, government restrictions, losing faith.

**Step 5.** Generate personalized "Return Kit" page — based on inputs:
- 90-day spiritual survival plan (daily Scripture, weekly reflection, monthly check-in)
- City-specific guidance (e.g., "In Chengdu, house churches have been under increased pressure since 2018. Connect with trusted contacts before arriving.")
- Family conversation scripts matched to their concerns
- Resource links (bilingual devotionals, recommended apps that work in China)

**Step 6.** Add "Download PDF" button — generates a clean printable version of the Return Kit (using browser print CSS). Also "Save Offline" as PWA-cached page.

**Step 7.** Add "Connect Me" section — a form to request warm introduction to a church contact in their destination city (submits to FC staff via email/webhook, not stored publicly).

**Step 8.** Verify: full flow works in both languages, PDF generates cleanly, mobile-friendly, all city content is accurate and culturally sensitive.

### Build 2D: Volunteer Training Modules (1 session)

**Step 1.** Build training hub page (`#/tools/training`) — 6 module cards with progress indicators (stored in localStorage).

**Step 2.** Build module template — each module has: intro text, 3-5 content sections (expandable), a 3-question knowledge check (multiple choice), and a reflection prompt (text area, saved locally).

**Step 3.** Create content for Module 1: "Who Are Chinese International Students?" — demographics, motivations, cultural context. Source from Report 06 and FC's existing data.

**Step 4.** Create content for Module 2: "The First 90 Days" — the critical welcome window, what research says about first impressions and relational trust.

**Step 5.** Create content for Modules 3-6: Cultural Intelligence, Faith Conversations, Discipleship That Sticks, Preparing for Goodbye. Source from research reports + FC's ISM Primer.

**Step 6.** Add completion tracking — modules show checkmarks when quiz is passed (≥2/3 correct). Overall progress bar on hub page.

**Step 7.** Verify: all 6 modules render in both languages, quizzes work, progress persists across sessions, mobile-friendly.

---

## Phase 3: AI Innovation Features
*Goal: The features that prove FC Innovation Lab's thesis — AI can do what traditional missions can't*

### Build 3A: Historical Conversations — AI Personas (1-2 sessions)

**Step 1.** Curate source corpora for 12 personas. For each: compile 20-50 key excerpts from their writings, correspondence, biographies into `src/data/personas/{name}.json`. Each excerpt: `{ text, source_title, source_year, source_page }`.

**Step 2.** Build personas hub page (`#/tools/conversations`) — portrait grid of 12 figures. Each card: portrait image, name (EN + CN), dates, one-line role, era badge.

**Step 3.** Build conversation page (`#/tools/conversations/:id`) — chat interface. System prompt per persona: "You are [name]. You lived [dates]. You are known for [role]. Answer questions in character, drawing ONLY from the provided source excerpts. Always cite your source. If you don't have information to answer, say so honestly. Respond in the language the user writes in."

**Step 4.** Implement conversation logic — on user message: (1) retrieve top 3 relevant excerpts from persona corpus, (2) build prompt with persona system prompt + excerpts + user question, (3) call Claude API, (4) display response with inline citations.

**Step 5.** Add starter questions per persona — 3-4 suggested questions that showcase interesting responses.

**Step 6.** Add language detection — auto-detect if user writes in English or Chinese, respond accordingly.

**Step 7.** Verify: all 12 personas respond in character, citations are accurate, no hallucination beyond source material, bilingual works, mobile chat interface is usable.

### Build 3B: Faith Retention Calculator (1 session)

**Step 1.** Build calculator page (`#/tools/retention`) — form with scored inputs:
- Discipleship depth (0-10 scale based on sub-questions)
- Pre-return preparation (0-10)
- Relational factors (0-10)
- Duration of faith (weighted)
- China-side connections (0-10)

**Step 2.** Implement scoring model — weighted sum based on ChinaSource research. Output: retention probability percentage + risk level (high/medium/low) + specific recommendations.

**Step 3.** Build results display — gauge visualization (gold arc), risk factors highlighted in red/yellow/green, actionable recommendations ("Connect this student to the Returnee Preparation Tool before departure").

**Step 4.** Add "What If" mode — user can toggle individual factors to see how changes affect the prediction. E.g., "If we add pre-return preparation, retention jumps from 25% to 55%."

**Step 5.** Verify: calculations are correct, recommendations are specific and actionable, bilingual, mobile-friendly.

### Build 3C: Research Gap Tracker (1 session)

**Step 1.** Create `src/data/gaps.json` from Report 03 — structured list of ~30 research gaps. Each: `{ id, category, title: {en, cn}, description: {en, cn}, status: "not_started|in_progress|published", ai_feasibility: "yes|partial|no", claimed_by? }`.

**Step 2.** Build tracker page (`#/research/gaps`) — filterable table/card grid. Filter by category (Periods, Regions, Perspectives, Denominations, Topics), status, and AI feasibility.

**Step 3.** Add detail view — click a gap to see full description, why it matters, AI feasibility explanation, and who's working on it (if claimed).

**Step 4.** Add "I'm working on this" button — opens a simple form (name, institution, email, brief description). Submits via webhook to FC staff for review.

**Step 5.** Verify: all gaps from Report 03 are represented, filters work, bilingual, mobile-friendly.

### Build 3D: Bilingual Comparator (1 session)

**Step 1.** Curate 8-10 historical events with paired sources. Each event: `{ id, event_name: {en, cn}, year, en_source: { text, attribution, context }, cn_source: { text, attribution, context }, editorial_note: {en, cn} }`. Start with: Boxer Rebellion, May Fourth Movement, 1949 Expulsion, Cultural Revolution, Three-Self Formation.

**Step 2.** Build comparator page (`#/research/comparator`) — event selector dropdown at top. Split-screen layout: left panel (Source A), right panel (Source B). Below: editorial synthesis note.

**Step 3.** Add AI translation toggle — button on each panel: "Translate to English" / "翻译为中文". Calls Claude API to translate the source text, displayed below the original.

**Step 4.** Add "Why These Differ" expandable section — explains the different institutional perspectives (missionary society vs. county gazetteer vs. government record).

**Step 5.** Verify: all event pairs render correctly, translation produces quality output, split-screen works on mobile (stacks vertically), bilingual interface.

---

## Files to Create/Modify

### Phase 1
- `src/index.html` — Homepage
- `src/css/main.css` — All styles
- `src/ts/main.ts` — Router, language toggle
- `src/ts/i18n.ts` — Bilingual strings
- `src/ts/search.ts` — Full-text search
- `src/ts/ask-archive.ts` — RAG search logic
- `src/ts/timeline.ts` — Timeline component
- `src/data/reports/*.json` — 12 reports as structured data
- `src/data/timeline.json` — Timeline events
- `src/data/archive-index.json` — Search index
- `tailwind.config.js` — Design tokens
- `tsconfig.json` — TypeScript config
- `package.json` — Dependencies
- `wrangler.toml` — Cloudflare Pages config

### Phase 2
- `src/ts/map.ts` — Leaflet map + animation
- `src/ts/network.ts` — D3/Sigma network graph
- `src/ts/returnee.ts` — Returnee tool logic
- `src/ts/training.ts` — Training module logic
- `src/data/map-data.json` — CHCD geocoded data
- `src/data/network.json` — Relationship graph data
- `src/data/returnee/*.json` — City guides, scripts
- `src/data/training/*.json` — 6 module contents

### Phase 3
- `src/ts/personas.ts` — AI conversation logic
- `src/ts/retention.ts` — Calculator logic
- `src/ts/gaps.ts` — Gap tracker logic
- `src/ts/comparator.ts` — Bilingual comparator
- `src/data/personas/*.json` — 12 persona corpora
- `src/data/gaps.json` — Research gaps
- `src/data/comparator/*.json` — Source pairs

## Open Questions
- Claude API key management — use CF Workers as proxy to avoid exposing key in client
- CHCD data size — may need to pre-filter to most significant institutions for initial map load
- Persona source material — some figures have rich archives (Taylor, Ricci), others may need supplementing from biographies
- Custom domain — xuanyan.frontiercommons.org requires FC DNS access
- CN translation of 12 reports — AI-translate first, then human review pass
