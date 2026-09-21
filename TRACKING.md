# Site-wide contact FAB — Tracking

## Current status
Branch created, strategy agreed, no code written yet.
Last updated: 2026-09-21

## Tasks
- [x] Phase 1 discovery — panel consulted (pm, tech-lead, ui-designer, ux-designer)
- [x] Verify panel claims against the codebase before acting on them
- [x] Create STRATEGY.md and TRACKING.md
- [ ] Capture BEFORE screenshots of `/projects`, `/experience`, `/about`
- [ ] Move `ContactFab` from `components/home/` to `components/layout/`
- [ ] Add the route denylist (`/contact`, `/admin`) via `usePathname()`
- [ ] Mount in `ClientShell` beside `Navigation`, outside `PageTransition`
- [ ] Remove the local mount and import from `HomePage`
- [ ] Fix the hover border so the pill stays legible over dark sections
- [ ] Correct the two stale "home page only" comments
- [ ] Capture AFTER screenshots at the same viewports
- [ ] Run lint, unit, tier1, validate:i18n
- [ ] Report the `/about` and `/projects` corner collisions to Tim with evidence
- [ ] `/merge-check`, then open the PR and stop for validation

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

## Blockers
None.

## Team consultations during execution
None yet.
