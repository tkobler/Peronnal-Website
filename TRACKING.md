# Mobile locale toggle — Tracking

## Current status
Fix complete and verified. New regression test passes, CSS fix is live, BEFORE/AFTER screenshots captured. Ready for commit + PR.
Last updated: 2026-04-15

## Tasks
- [x] Phase 1 triage — reproduction questions answered
- [x] Phase 1 — BEFORE screenshot captured (Pixel 7, 412×839)
- [x] Phase 1 — panel consultation (qa + frontend-eng + ui-designer in parallel)
- [x] Phase 1 — conflicts surfaced and decision made (proceed)
- [x] Create `bug/mobile-locale-toggle` branch
- [x] Write STRATEGY.md
- [x] Write TRACKING.md
- [x] Write failing regression test in `tests/e2e/language-toggle.spec.ts`
- [x] Run new test on main — confirmed failing for the right reason (`Expected >= 0.5, Received 0.25`)
- [x] Apply CSS fix in `src/app/globals.css` (3 opacity values — also bumped `:hover` 0.6 → 0.8 for hierarchy coherence since inactive is now 0.55)
- [x] Run new test after fix — passes
- [x] Run tier 1 — isolated the 5 failures to pre-existing tier-1 flakiness on main (unrelated to this fix, see "Related issues observed" below)
- [ ] Run CI gate locally: `lint` + `test:unit` + `validate:i18n`
- [x] Capture AFTER screenshot at Pixel 7 (`tests/visual/repro/mobile-locale-toggle/after.png`)
- [ ] Commit `git add -f` the before/after screenshots for PR evidence
- [ ] Open PR with symptom / root cause / fix / verification sections
- [ ] Stop for Clément's approval (do NOT auto-merge)

## Decisions log

### 2026-04-15 — Sided with frontend-eng + ui-designer over qa's procedural gate
qa wanted additional reproduction detail before proceeding. The user's deterministic report ("every page, every time") combined with two independent builders reading the BEFORE screenshot and arriving at the same hypothesis (0.25 opacity is the bug) satisfied the reproduction quality bar. qa's concrete test proposal was adopted regardless — it's the right regression gate.

### 2026-04-15 — Opacity bump, not visual affordance change
Considered adding a border, pill background, or underline around the locale toggle as an alternative affordance. Rejected on ui-designer's recommendation: it would break the site's restrained, technical, schematic-inspired design language. The opacity change (0.25 → 0.55 inactive, 0.2 → 0.4 separator) is the minimum change that resolves the bug without introducing a new visual vocabulary.

### 2026-04-15 — Chose 0.55 for inactive, not 0.5 or 0.6
ui-designer's stated minimum is 0.5; ft-eng proposed 0.55. The 0.05 difference matters: 0.5 is the edge of perceptibility, 0.55 gives a margin without lifting the inactive state into "competing with active" territory. 0.6 would be too bright — the active/inactive hierarchy would flatten. Left dark theme inactive at 0.55 for consistency; ui-designer's suggestion of 0.6 for dark theme is a nit that can be revisited if the test exposes a legibility gap there.

### 2026-04-15 — Left font-size at 0.65rem, did NOT bump to 0.7rem
ui-designer noted as an optional secondary improvement. Out of scope for this bug fix — it's a design tweak, not a root-cause fix. Note for a future `dev/` or separate `bug/`.

## Blockers
None.

## Related issues observed (for separate branches — NOT fixed here)

While running tier 1 as part of verification, 5 tests failed. I stashed my changes to run the same tests against the baseline `main` — at least 2 of them still failed on main, confirming they are pre-existing tier-1 instability, not caused by this fix.

Pre-existing failures on main (confirmed):
1. `navigation.spec.ts:90` — "Hamburger Menu › menu closes when clicking close button"
2. `project-cards.spec.ts:31` — "Home Page Project Sections › project sections alternate dark/light themes"

Likely flaky (failed once, passed on re-run):
3. `navigation.spec.ts:30` — "Navigation Pill › pill hides on scroll down and reappears on scroll up"
4. `navigation.spec.ts:103` — "Hamburger Menu › menu closes when clicking backdrop"
5. `navigation.spec.ts:121` — "Hamburger Menu › menu locks body scroll when open"

Both categories deserve separate branches:
- A `bug/` branch for the 2 reproducible failures once the root cause is understood
- Possibly an `audit/` branch to characterize the flake rate on the flaky 3 before deciding how to stabilize them

Deliberately NOT touching any of these on this branch — one concern per branch.

## Team consultations during execution
None. The fix was narrow enough that the Phase 1 panel input was sufficient.
