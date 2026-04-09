# Build Prompts — Copy-Paste One Per Session

---

## Phase 1A: Project Scaffold + Homepage

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read the plan at plan.md (Phase 1, Build 1A, Steps 1-6) and the project context at CLAUDE.md. Read the design doc at docs/design-doc.md.

Implement Steps 1-6 in order. Don't ask questions — make reasonable decisions and keep moving.

Key rules:
- Follow the Design Spec in plan.md exactly — dark navy (#0B1222), gold accent (#D4A44C), Noto Serif SC + Inter + JetBrains Mono
- Use /frontend-design for all UI work. Apply the Anti-AI checklist rigorously.
- Mobile-first responsive: 375px → 768px → 1024px → 1440px
- Bilingual toggle must work — all visible text through i18n.ts
- The homepage hero should NOT look like a generic AI landing page — no centered h1+subtitle+gradient button
- Run /verify when all steps are complete.
- Open localhost preview before deploying so I can confirm visually.
```

---

## Phase 1B: Research Reports

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 1, Build 1B, Steps 7-11) and CLAUDE.md.

Source content: ~/Desktop/Projects/Research/2026-04-09-china-missions-scholarship/ (12 markdown reports)

Implement Steps 7-11. Convert the 12 research reports into structured JSON, build the report listing page and individual report reading pages, and add full-text search.

Key rules:
- For Chinese translations, use AI translation of the English content. Mark with a note: "AI-translated — review pending"
- Report reading experience is critical — max 720px reading column, sticky TOC, clean typography
- Search must be fast (client-side indexing) and return relevant results with highlighted excerpts
- Follow Design Spec exactly
- Run /verify when done.
- Open localhost preview so I can confirm.
```

---

## Phase 1C: Interactive Timeline

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 1, Build 1C, Steps 12-16) and CLAUDE.md.

Source data: Report 01 (01-historical-overview.md) in ~/Desktop/Projects/Research/2026-04-09-china-missions-scholarship/

Implement Steps 12-16. Create the timeline data (50-80 events from 635 AD to 2026), build the interactive vertical timeline with category filtering, era navigation, and auto-play mode.

Key rules:
- Timeline is vertical scrollable with gold line, event nodes color-coded by category
- Must work beautifully on mobile (touch scroll)
- Auto-play should be smooth and cinematic
- Follow Design Spec exactly
- Run /verify when done.
```

---

## Phase 1D: Ask the Archive (RAG Search)

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 1, Build 1D, Steps 17-22) and CLAUDE.md.

Implement Steps 17-22. Build the "Ask the Archive" RAG search tool — chunk the 12 reports into a search index, build the chat interface, implement retrieval + Claude API call for grounded answers with citations.

Key rules:
- Use a Cloudflare Worker as API proxy to avoid exposing Claude API key in client code
- Every response MUST include source citations that link to the relevant report section
- User can ask in English or Chinese — response matches query language
- Chat interface should feel conversational, not like a search box
- Include 4-5 starter question chips
- Handle errors gracefully (API timeout, no relevant results)
- Follow Design Spec exactly
- Run /verify when done.
```

---

## Phase 1E: Deploy + Polish

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 1, Build 1E, Steps 23-27) and CLAUDE.md.

Implement Steps 23-27. Create GitHub repo, deploy to Cloudflare Pages, add meta tags and social sharing, performance optimization, and final verification.

Key rules:
- Create GitHub repo named "xuanyan"
- Deploy to Cloudflare Pages
- Open Graph meta tags with compelling title/description/image for social sharing
- Favicon: 宣 character in gold on navy background
- Lighthouse score > 90
- Test every page at 375/768/1024/1440px in both languages
- Run /verify as final check.
- Open the production URL so I can confirm.
```

---

## Phase 2A: Animated Spread Map

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 2, Build 2A, Steps 1-8) and CLAUDE.md.

Implement all steps. Download CHCD open dataset, parse into map data, build the animated spread map with Leaflet.js, timeline slider, play/pause, click-to-inspect, layer toggles, and era labels.

Key rules:
- CHCD data is CC BY 4.0 on GitHub — download and parse the CSV
- Use CartoDB Dark Matter tiles to match the site's dark theme
- Animation should be smooth and cinematic — this is the "wow" feature
- Mobile-friendly: touch slider, responsive map
- Follow Design Spec exactly
- Run /verify when done.
```

---

## Phase 2B: Network Graph

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 2, Build 2B, Steps 1-7) and CLAUDE.md.

Implement all steps. Extract relationship data from CHCD, build the interactive network graph with D3.js or Sigma.js, add search, degree-of-separation toggle, click-to-inspect, and filters.

Key rules:
- Performance is critical — may need to limit initial view to top 500 most-connected nodes
- Mobile fallback: simplified list view instead of force-directed graph
- Gold for missionaries, teal for Chinese Christians, muted for institutions
- Follow Design Spec exactly
- Run /verify when done.
```

---

## Phase 2C: Returnee Preparation Tool

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 2, Build 2C, Steps 1-8) and CLAUDE.md.

Implement all steps. Build the multi-step returnee questionnaire, personalized Return Kit generator, PDF download, and "Connect Me" form.

Key rules:
- This is the most directly useful tool for FC's core mission — treat it with care
- All content must be culturally sensitive and accurate
- PDF must be downloadable and work offline (critical for students returning to China)
- "Connect Me" submits via webhook/email to FC staff — no public database of church contacts
- Fully bilingual — a Chinese student should be able to complete the entire flow in Chinese
- Follow Design Spec exactly
- Run /verify when done.
```

---

## Phase 2D: Volunteer Training Modules

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 2, Build 2D, Steps 1-7) and CLAUDE.md.

Source content: Research reports 06 (diaspora), 11 (current state), and FC's existing ISM Primer research.

Implement all steps. Build the training hub with 6 interactive modules, knowledge checks, reflection prompts, and progress tracking.

Key rules:
- Content must be research-based, not anecdotal — cite findings from the reports
- Quiz interactions should be simple and encouraging, not punitive
- Progress persists in localStorage
- Each module should take 15-20 minutes to complete
- Fully bilingual
- Follow Design Spec exactly
- Run /verify when done.
```

---

## Phase 3A: Historical Conversations (AI Personas)

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 3, Build 3A, Steps 1-7) and CLAUDE.md.

Implement all steps. Curate source corpora for 12 historical personas, build the portrait grid hub, and implement the AI conversation interface with RAG + persona prompting + citation grounding.

The 12 personas: Matteo Ricci, Robert Morrison, Hudson Taylor, Lottie Moon, Eric Liddell, Gladys Aylward, Xu Guangqi, Wang Mingdao, Watchman Nee, John Sung, Shi Meiyu, Wang Yi.

Key rules:
- Each persona needs 20-50 source excerpts compiled into their corpus JSON
- System prompt must constrain AI to ONLY answer from source material — no hallucination
- Every response must include a citation [Source: title, year]
- User can write in English or Chinese — AI responds in same language
- Use CF Worker proxy for API calls
- Chat interface should feel like talking to a person, not querying a database
- Follow Design Spec exactly
- Run /verify when done.
```

---

## Phase 3B: Faith Retention Calculator

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 3, Build 3B, Steps 1-5) and CLAUDE.md.

Implement all steps. Build the retention calculator with scored inputs, weighted model, gauge visualization, risk factors, recommendations, and "What If" mode.

Key rules:
- Model weights based on ChinaSource research on retention factors
- Recommendations must be specific and actionable ("Use the Returnee Tool" not "prepare better")
- "What If" mode is the killer feature — let users see how changes affect prediction
- Fully bilingual
- Follow Design Spec exactly
- Run /verify when done.
```

---

## Phase 3C: Research Gap Tracker

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 3, Build 3C, Steps 1-5) and CLAUDE.md.

Source data: Report 03 (03-research-gaps.md)

Implement all steps. Create structured gaps data from Report 03, build the filterable tracker page, detail views, and "I'm working on this" submission form.

Key rules:
- ~30 gaps extracted from Report 03
- Filters by category, status, and AI feasibility
- "I'm working on this" submits via webhook/form — not a live database
- Fully bilingual
- Follow Design Spec exactly
- Run /verify when done.
```

---

## Phase 3D: Bilingual Comparator

```
This is a BUILD session. Working directory: ~/Desktop/Projects/XuanYan/

Read plan.md (Phase 3, Build 3D, Steps 1-5) and CLAUDE.md.

Implement all steps. Curate 8-10 historical event source pairs, build the split-screen comparator, add AI translation toggle, and editorial synthesis notes.

Key rules:
- Start with 5 events: Boxer Rebellion, May Fourth Movement, 1949 Expulsion, Cultural Revolution, Three-Self Formation
- Each event needs a real English-language source AND a real Chinese-language source
- AI translation via Claude API (CF Worker proxy)
- Editorial notes are human-quality — explain WHY perspectives differ
- Split-screen on desktop, stacked on mobile
- Follow Design Spec exactly
- Run /verify when done.
```
