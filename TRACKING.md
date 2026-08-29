# Personalize site for Tim Kobler — Tracking

## Current status

Complete and verified. Ready for commit + PR.
Last updated: 2026-08-29

## Tasks

- [x] Clarify scope with Tim (contact info: real details; bio: placeholder, not copied)
- [x] Collect Tim's real contact/branding details
- [x] Create `dev/personalize-tim-kobler` branch
- [x] Write STRATEGY.md
- [x] Domain/SEO: `CNAME`, `sitemap.xml`, `robots.txt` → `timkobler.ch`; delete `BingSiteAuth.xml`
- [x] `layout.tsx`: site metadata, OG/Twitter, structured data (name, jobTitle, affiliation, sameAs)
- [x] Contact page: email, phone, LinkedIn, GitHub; removed Telegram; updated WhatsApp link; CV download filenames
- [x] Footer, Navigation, HeroSection, AboutClient: name + link swaps
- [x] Page metadata: `about/page.tsx`, `about/layout.tsx`, `contact/page.tsx`, `contact/layout.tsx`
- [x] Translations (EN+FR, key parity): `hero.ts`, `about.ts`, `contact.ts` — bio content → bracketed placeholders
- [x] `cv/data/personal.typ`: name, email, phone, LinkedIn, GitHub, website; unknown fields (city, nationality, license) → placeholders
- [x] `README.md`, `.claude/CLAUDE.md`: name references
- [x] `.claude/agents/*.md`, `.claude/docs/*.md`: "Clément" → "Tim" across 17 files
- [x] `.claude/settings.json`: scrubbed leaked ProtonMail address + machine paths, repointed to Tim's project path
- [x] Full-repo sweep confirms zero remaining "Clément"/"Chalut" outside the deliberately-deferred flight page and historical `TRACKING.md` entry
- [x] `npm run lint` — clean
- [x] `npm run validate:i18n` — 292/292 keys match
- [x] `npm run test:unit` — 19/19 pass
- [x] `npm run build` — succeeds
- [x] Manual spot-check via `npm run dev` + curl on `/`, `/contact`, `/about`
- [ ] Commit
- [ ] Push branch + open PR
- [ ] Stop for Tim's approval (do NOT auto-merge)

## Decisions log

### 2026-08-29 — Placeholder bio, not copied biography
Tim confirmed none of Clément's real background (Stérilux, EPFL Microengineering, pilot license, trumpet) applies to him. Rather than doing a literal string swap that would misattribute a real third party's biography and real contact info to Tim, bio-bearing content was replaced with bracketed placeholders and contact info was replaced with Tim's real details, gathered directly from him.

### 2026-08-29 — Domain corrected to `.ch`
An incomplete prior edit (uncommitted, found already in the working tree at session start) had set the domain to `timkobler.com`. Tim corrected this to `timkobler.ch`.

### 2026-08-29 — Flight page and project data deferred
Tim indicated the `/flight` page will become a mountaineering page in a follow-up task, and asked this pass to focus on "main pages." Left `flightLog.ts`, `projects.ts`, `experience.ts`, `courses.ts` untouched — no name references in the latter three anyway.

### 2026-08-29 — Left `TRACKING.md`'s historical entry alone
The pre-existing `TRACKING.md` (committed on `main`, describing an unrelated completed mobile-locale-toggle bug fix) contains one "Stop for Clément's approval" line. This documents what actually happened on that prior branch; rewriting it would falsify history, so it was left as-is. This file replaces it going forward for the current branch.

## Blockers

None. CV PDF rebuild requires the `typst` CLI locally (not run here) — flagged in STRATEGY.md as follow-up for Tim.

## Team consultations during execution

None — mechanical personalization with scope clarified directly by Tim, not an architectural or product decision.
