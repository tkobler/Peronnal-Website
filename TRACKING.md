# Sync template with main — Tracking

## Current status
Branch created, STRATEGY.md written. Starting sequencing step 1 (schema migration).
Last updated: 2026-09-21

## Tasks
- [x] Create STRATEGY.md and TRACKING.md
- [ ] Step 1 — Schema: translations/index.ts, projects.ts, experience.ts, courses.ts, EN/FR translation files
- [ ] Step 2 — Update tests/unit/projects-data.test.ts and translations.test.ts for new schema
- [ ] Step 3 — Assets: public/cv/ restructure, placeholder documents PDF
- [ ] Step 4 — New standalone modules: contours.ts, trailPath.ts, GlobalTopoBackground.tsx, useHashScroll.ts
- [ ] Step 5a — Delete DotPattern.tsx + Schematic type, rewire ClientShell.tsx
- [ ] Step 5b — Add ContactFab.tsx, wire into ClientShell.tsx
- [ ] Step 6 — Genericize hardcoded strings: layout.tsx, Footer.tsx, Navigation.tsx, ContactClient.tsx, robots.txt, sitemap.xml
- [ ] Step 8 — Documentation rewrite (~15 files)
- [ ] Home cards: drop to 3 (HomePage.tsx, ProjectSection.tsx, homeCards.ts)
- [ ] Verification: lint, test:unit, validate:i18n, build, test:e2e:tier1
- [ ] Manual click-through of every page
- [ ] /merge-check before opening PR

## Decisions log

### 2026-09-21 — Overwrote template's original STRATEGY.md/TRACKING.md without reading them first
Mistake: wrote fresh STRATEGY.md/TRACKING.md for this sync work without reading the files already at those paths on `template`, which turned out to hold the branch's founding history (Clément Chalut's original portfolio → Tim's personalization → this generic template, plus the rationale for keeping EPFL references and replacing `/flight` with a minimal `/hobby`). Recovered the content via `git show`, since the prior commit still has it, and folded a summary into this branch's STRATEGY.md under "Prior branch history" rather than losing it. Lesson for next time: always Read a file before Write, even one this tool assumed was new — the tool's own instructions say so for exactly this reason.

### 2026-09-21 — Never merge/cherry-pick from main
Branches diverged in both directions with content mixed into structural diffs throughout. Decided to use `git checkout main -- <path>` only for confirmed-zero-personal-content files, and hand-edit (diffed, not retyped) everything else against a saved reference. See STRATEGY.md Approach.

### 2026-09-21 — Keep /hobby live, diverge from main
Main parked `/hobby` into an About "Beyond Engineering" section — a personal-narrative choice. pm review argued a template benefits more from a live example of "how to add a top-level page." User confirmed: keep `/hobby` live and generic. This means the About page and translations do NOT get main's GPA-removal/Beyond-Engineering restructuring.

### 2026-09-21 — Drop home cards from 4 to 3
Confirmed with user: mirror main's 3-card layout, dropping the redundant project-spotlight card (pm's reasoning: it duplicates the Projects page nav link, not just "because main did it").

### 2026-09-21 — Spread new project fields across separate examples
pm review: don't bundle `documents`/`link`/`sourceLink` onto one placeholder project — each needs its own example so a template user sees every field actually rendered.

## Blockers
None currently.

## Team consultations during execution
- **2026-09-21 — pm, tech-lead** (Phase 1 discovery, parallel): see STRATEGY.md "Panel input" for full summary. Conflict surfaced (pm vs. mirroring main on /hobby) was escalated to the user rather than resolved unilaterally.
