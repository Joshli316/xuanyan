# XuanYan 宣研 — Design Document

## Problem Statement
The China missions research field has 20+ websites that are all siloed: articles OR databases OR advocacy — none integrated. All are English-first despite being China-focused. Zero use AI. Zero build tools (vs. content). Zero serve Chinese Christians directly. Frontier Commons Innovation Lab can be the first to connect historical research to practical ministry through bilingual, AI-powered tools.

## Target Users

| User | Need | Primary Path |
|------|------|-------------|
| Missionaries | Cultural intelligence, field reports, historical lessons | /research → reports, map |
| Scholars | Bilingual bibliography, primary source search, gap tracker | /research → ask archive, gaps |
| Chinese Christians | Heritage exploration, returnee tools, bilingual theology | /tools → returnee, conversations |
| Non-Christians | Cultural/historical education without preaching | /research → timeline, cultural impact |
| Volunteers | Training modules, cultural guides | /tools → training |
| Churches | Partnership playbooks, returnee connections | /tools → returnee |
| Funders/Partners | FC's innovation capability on display | /about, all tools |

## User Journey

**Scholar in Beijing:**
Finds the site via Google (bilingual SEO). Toggles to Chinese. Searches "太平天国与基督教" in Ask the Archive. Gets a sourced answer pulling from Reports 01 and 07. Clicks through to the full report. Discovers the Research Gap Tracker. Claims a gap she's working on.

**Volunteer in Iowa:**
Gets a link from their campus minister. Goes to /tools/training. Completes Module 1 on their phone during lunch. The next week, a Chinese student is about to graduate. The volunteer sends them to the Returnee Preparation Tool. The student gets a personalized Return Kit with church contacts in Chengdu.

**Chinese student returning to Shanghai:**
A friend at church shares the Returnee Tool link on WeChat. She fills out the questionnaire in Chinese. Downloads her 90-day plan as a PDF before she loses VPN access. Three months later, she's attending a house church contact provided by the tool.

## What This Product IS
- A research platform with interactive tools
- Bilingual by default (EN/CN toggle everywhere)
- AI-powered (search, conversations, translation)
- Connected to FC's real ministry network (returnee contacts, volunteer training)
- An Innovation Lab showcase — proof that AI can serve missions

## What This Product IS NOT
- A donation funnel (no payment, no paywall)
- A blog or news site (ChinaSource already does that)
- A social network or forum
- A replacement for ChinaSource, CHCD, or BDCC — it's complementary
- A marketing site for Frontier Commons (it's a tool, not a brochure)

## Key Design Rationale

**Dark mode default:** Signals technical sophistication and innovation. Differentiates from every competitor (all use white/light themes). Better for long reading sessions. Aligns with "Observatory" metaphor.

**Chinese ink-wash (水墨) accents:** Cultural grounding without kitsch. Subtle — background textures, not decorative borders. Shows respect for Chinese aesthetic tradition while being modern.

**Gold accent on navy:** Warm, not corporate. Scholarly, not startup. The gold evokes historical documents and institutional gravitas. Navy is calmer than black.

**Serif for Chinese headings (Noto Serif SC):** Chinese text reads better in serif at display sizes. It also signals "this content is worth reading carefully" — editorial, not UI.

**Three fonts max:** Noto Serif SC (display/CN), Inter (body), JetBrains Mono (data). No more. Consistency over variety.

**Sharp containers, soft interactions:** Cards and panels have sharp corners (editorial). Buttons and toggles have slight radius (approachable). This creates visual contrast between "content to read" and "things to interact with."
