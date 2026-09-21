# Site-wide contact FAB — Tracking

## Current status
Implemented and verified. Lint, typecheck, unit tests and i18n parity are green; tier1 e2e is red
both here and on `main` (pre-existing flake, see below). Two bottom-right collisions were captured
and are awaiting Tim's call. Ready for PR.
Last updated: 2026-09-21

## Tasks
- [x] Phase 1 discovery — panel consulted (pm, tech-lead, ui-designer, ux-designer)
- [x] Verify panel claims against the codebase before acting on them
- [x] Create STRATEGY.md and TRACKING.md
- [x] Capture BEFORE screenshots of `/projects`, `/experience`, `/about`
- [x] Move `ContactFab` from `components/home/` to `components/layout/`
- [x] Add the route denylist (`/contact`, `/admin`) via `usePathname()`
- [x] Mount in `ClientShell` beside `Navigation`, outside `PageTransition`
- [x] Remove the local mount and import from `HomePage`
- [x] Fix the hover border so the pill stays legible over dark sections
- [x] Correct the two stale "home page only" comments
- [x] Capture AFTER screenshots, including targeted shots at the collision points
- [x] Run lint, typecheck, unit, validate:i18n, tier1
- [x] Report the `/about` and `/projects` corner collisions to Tim with evidence
- [ ] `/merge-check`, then open the PR and stop for validation
- [ ] **Tim's decision needed**: the `/projects` links-row collision at phone width (see below)

## Decisions log

### 2026-09-21 — Global mount over per-page imports
Two approaches were on the table: import `<ContactFab />` into each page component (mirroring what
`HomePage` does today), or mount it once in `ClientShell` with a route denylist. Chose the global
mount. `ClientShell` carries an explicit comment that `position: fixed` elements must stay outside
`PageTransition`, and the per-page approach would violate that on every page while leaving four
import sites to drift apart. tech-lead and pm independently reached the same conclusion.

### 2026-09-21 — `/projects/[id]` dropped from scope as moot
Tim asked for the button on project detail pages. Verification showed
`src/app/projects/[id]/ProjectDetailClient.tsx` renders `null` and immediately calls
`router.replace("/projects")` — the route is a redirect stub with no content. There is nothing to
mount a button on. Reported to Tim; project content is covered by the `/projects` listing.

### 2026-09-21 — Polish scope trimmed to the hover-border fix
ui-designer asked for four changes beyond the mount. Two of them (`--fab-inset` re-alignment,
removing the pulse animation) would alter the home page's button, which Tim did not ask to change.
Tim chose to take only the hover-border fix now and to see screenshot evidence of the `/about` and
`/projects` corner collisions before deciding on spacing.

### 2026-09-21 — Two panel claims rejected on verification
ui-designer flagged a missing `/flight` route: no such route exists (`flightLog.ts` has no consuming
page, `_hobby` is underscore-parked). ux-designer's advice to exclude `/projects/[id]` was correct in
spirit but moot for the reason logged above. Recorded so the reasoning survives the branch.

## Verification

| Gate | Result |
|---|---|
| `npm run lint` | clean |
| `npx tsc --noEmit` | clean |
| `npm run test:unit` | 17 passed |
| `npm run validate:i18n` | 254 keys in parity |
| `npm run test:e2e:tier1` | 244 passed, 12 failed — **pre-existing**, see below |
| Route rendering | `contact-fab` present on `/`, `/projects`, `/experience`, `/about`; absent on `/contact`, `/admin` |

### On the tier1 failures
All 12 are in `tests/e2e/navigation.spec.ts` (nav-pill-hides-on-scroll and hamburger-menu cases).
Running the same spec on `main` with no changes produced **14** failures in the same test families,
so the suite is already red and flaky before this branch touches it. This change makes it no worse.
Worth its own `bug/` branch; not fixed here.

## Screenshot evidence
In `tests/visual/repro/site-wide-contact-fab/` (committed with `git add -f`; the directory is
gitignored). Captured at the scroll positions where collisions were predicted, not just full-page —
a full-page screenshot renders a `position: fixed` element once at the top and is useless for this.

- `after-projects-iphone-se.png` — **collision, and it is new.** The pill covers the `SOURCE` link
  and crowds `Semester project report` in each project's links row.
- `after-projects-desktop.png` — same row at desktop width: tight but clear, no overlap.
- `after-about-beyond-iphone-se.png` — **predicted collision did not reproduce.** ui-designer
  expected the pill to park on the frosted panel's bottom-right corner and its activity chips; the
  panel's `py-16` already clears it, and at desktop width the panel is `max-w-2xl` on the left so
  they never meet.
- `after-experience-footer-iphone-se.png` — the pill covers the footer's `GITHUB` and `CONTACT`
  links at the very bottom of the page.
- `baseline-home-footer-iphone-se.png` — the same footer overlap **already happens on the home page
  on `main`**. Pre-existing behaviour of the button, not introduced here; this change spreads it from
  one page to four.
- `after-hover-on-dark-desktop.png` — the hover border fix working: the pill keeps a defined edge
  against a dark section instead of dissolving into it.

## Blockers
None blocking the PR. One open decision for Tim:

**The `/projects` links-row collision at phone width.** It is a genuine new defect — the FAB hides a
link a visitor might want. It was deliberately left unfixed because Tim scoped this branch to the
mount plus the hover-border fix, and asked to see evidence before any spacing change. Options when
he decides: add bottom padding to the links row on small screens, or re-align `--fab-inset` as
ui-designer suggested (which also moves the home page's button).

The footer overlap is the same shape of problem but pre-existing, so it belongs on its own branch
alongside the flaky navigation tests.

## Team consultations during execution
None. The Phase 1 panel's predictions were checked against screenshots rather than re-litigated:
two of ui-designer's three predicted collisions did not reproduce, one did.
