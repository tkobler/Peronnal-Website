# Home page card pass — Tracking

## Current status
Both home-page card changes complete and verified. Merged into `add_first_projects` (PR #6 squashed, PR #7 rebased onto it).
Last updated: 2026-09-02

## Tasks
- [x] Create STRATEGY.md and TRACKING.md
- [x] `job-experience` card: ARTORG hero image + rewritten descriptor (`src/data/homeCards.ts`)
- [x] Remove `engineering-project` card, move `hobby` to slot 3, add `get-in-touch` card to slot 4
- [x] Update EN translations (`src/data/translations/en/homeCards.ts`)
- [x] Update FR translations (`src/data/translations/fr/homeCards.ts`)
- [x] Run `validate:i18n`, `lint`, `test:unit` — all pass
- [x] Manual check in dev server — card order confirmed (boat → work experience → Beyond Engineering → Get in Touch → footer)
- [x] `npm run test:e2e:tier1` — 242 passed, 14 failed, all pre-existing (see Decisions log)
- [x] Merge both PRs into `add_first_projects`

## Decisions log

### 2026-09-02 — Reuse the ARTORG project hero image
The `cochlear-implant-insertion-mechanism` project's `hero.jpeg` is the ARTORG work being referenced. Reused directly rather than adding a new asset, per the user's instruction to use the same hero image.

### 2026-09-02 — Drop the Autonomous Terrain Rover card instead of relocating it
It was a template placeholder with no real project behind it (`/projects#terrain-rover` doesn't exist in `projects.ts`) and a generic placeholder image. The instruction was to put "Beyond Engineering" in its place, with no mention of preserving it elsewhere, so it was removed rather than moved.

### 2026-09-02 — Get in Touch card links to the existing `/contact` page
The site already has a full `/contact` page (`src/app/contact/`) with email/LinkedIn/GitHub channels — reused directly rather than building new contact UI. The hamburger menu already had a "Get in Touch" button pointing there, so the naming is consistent with existing site language.

### 2026-09-02 — tier1 failures confirmed pre-existing, not caused by these changes
`npm run test:e2e:tier1` reported 242 passed / 14 failed: 10 `language-toggle.spec.ts` failures on iphone-se + iphone-14, and a cluster of `navigation.spec.ts` hamburger-menu failures on ultrawide (pointer-event interception by `#main-content`). Re-ran the same two spec files against the unmodified baseline via `git stash` — 13 of the same failures reproduce there, including the identical "Get in Touch button navigates to contact page" test. The hamburger-menu cluster varies run to run (14 vs 13), the same flakiness signature already documented on this branch for a previous tier2 run. Nothing in these diffs touches navigation, the language toggle, or routing components. **Worth its own `bug/` branch.**

### 2026-09-02 — Two branches merged into `add_first_projects`, not `main`
`main` doesn't yet contain the real experience/project data — it lives only on the still-open `add_first_projects` branch. Both card branches were based there and merged back there; `add_first_projects` remains open for review against `main` as PR #5.

## Blockers
None.

## Known follow-ups
- The pre-existing tier1 failures above (mobile language-toggle, ultrawide hamburger menu) need a dedicated `bug/` branch.
- `hobby` and `get-in-touch` cards still use `/images/placeholders/wide.svg` — they need real images.

## Team consultations during execution
None — pure content/data edits, no architectural or scope questions surfaced.
