# Home "Work Experience" card → ARTORG — Tracking

## Current status
Edit complete, verified locally, ready for PR.
Last updated: 2026-09-02

## Tasks
- [x] Create STRATEGY.md and TRACKING.md
- [x] Update `src/data/homeCards.ts` image for `job-experience`
- [x] Update EN descriptor in `src/data/translations/en/homeCards.ts`
- [x] Update FR descriptor in `src/data/translations/fr/homeCards.ts`
- [x] Run `validate:i18n`, `lint`, `test:unit` — all pass
- [x] Manual check in dev server (home page renders ARTORG hero image on the Work Experience card)
- [ ] Open PR against `add_first_projects`

## Decisions log

### 2026-09-02 — Reuse the ARTORG project hero image
The `cochlear-implant-insertion-mechanism` project's `hero.jpeg` is the ARTORG work referenced by the user. Reused directly rather than adding a new asset, per the user's instruction to "use the same hero image."

### 2026-09-02 — Base branch is `add_first_projects`, not `main`
`main` doesn't yet contain the real experience/project data (it's only on the still-open `add_first_projects` PR branch). Branched from `add_first_projects` and will target the PR there to avoid duplicating unrelated diff.

## Blockers
None.

## Team consultations during execution
None — pure content edit, no architectural or scope questions surfaced.
