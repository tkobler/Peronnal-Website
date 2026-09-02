# Projects filter pill overflow — Tracking

## Current status
Fix implemented and verified. Regression test passes; full tier2 suite passes (one pre-existing,
unrelated flake confirmed present on unmodified code too — see Decisions log). Ready for review.
Last updated: 2026-09-02

## Tasks
- [x] Capture reproduction (FR desktop + FR/EN mobile screenshots)
- [x] Before screenshots
- [x] Write failing regression test (`tests/e2e/responsive-matrix.spec.ts`)
- [x] Confirm test fails for the right reason (21 failures, all clipping — pill bottom exceeds hero bottom — on iPhone SE/14/iPad Landscape across every browser project)
- [x] Implement fix (`h-[40vh]` → `min-h-[40vh]`, drop `overflow-hidden`)
- [x] Verify: regression test passes (44/44, after switching the test from clicking the FR toggle to `localStorage` locale injection — clicking flaked on nav-pill pointer interception unrelated to the bug)
- [x] Verify: `npm run test:e2e:tier2` passes (742 passed, 6 failed — all "hamburger menu works" on unrelated pages/viewports, confirmed present on unmodified code via `git stash` comparison, not caused by this fix)
- [x] Capture after screenshots
- [ ] Update PR description

## Decisions log

### 2026-09-02 — Fix in place on `add_first_projects`, not a fresh `bug/` branch
The bug's visible severity depends on the longer real domain names this branch introduces
(uncommitted `DOMAIN_KEYS` rename + FR/EN translation updates). A `bug/` branch off `main` would
only have the old short placeholder names and wouldn't reproduce the symptom as reported. See
STRATEGY.md "Branch note" for full reasoning.

### 2026-09-02 — Drop `overflow-hidden` rather than keep it
qa and frontend-eng both checked whether `overflow-hidden` on the hero section guards anything
(a canvas/decorative layer) — it doesn't; `.section-light`/`.section-dark` are plain CSS
gradients. ui-designer suggested keeping it as "harmless," but since nothing depends on it,
dropping it alongside the `h-[40vh]` → `min-h-[40vh]` change is simpler and removes a mechanism
that could re-clip content in the future.

## Blockers
None. Open question for Your Name: this branch (`add_first_projects`) already carries other
uncommitted, unrelated-looking work (domain renaming, project image renames, `ProjectDetailPage.tsx`
"learn more" link, translation content) — see git status. This fix touches only
`src/components/projects/ProjectsPage.tsx` (one hero section's classes) and
`tests/e2e/responsive-matrix.spec.ts` (new test), but `ProjectsPage.tsx` itself already had other
pending edits in it before this fix started. Not committing anything yet — waiting on direction for
how to split/commit.

## Team consultations during execution
None beyond Phase 1 triage (qa, frontend-eng, ui-designer — see STRATEGY.md).
