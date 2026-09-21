# Site-wide contact FAB — Strategy

## Goal
Make the floating "Get in touch" button — until now a home-page-only element — visible on every
content page of the site, so a visitor can act on interest the moment they feel it instead of
hunting through the collapsed nav menu.

## Visitor value
The visitor is a recruiter, professor or peer partway down `/projects`, `/experience` or `/about`.
Today those pages carry **no visible contact affordance at all**: the only contact link lives inside
the hamburger menu, and `Navigation.tsx` hides the nav pill entirely on downward scroll. So at the
exact moment intent peaks — scrolling a long page, having just read something convincing — there is
nothing on screen to click. They should leave *able to reach Tim in one click from wherever they are*.

## Scope

### In scope
- Mount `ContactFab` once, globally, in `ClientShell` rather than per page.
- Relocate the component from `src/components/home/` to `src/components/layout/`, since it is no
  longer a home-page element.
- Suppress it on routes where it is wrong: `/contact` (self-link, and its own pulsing green status
  dot would collide with the FAB's) and `/admin`.
- Fix the hover state on dark sections: the border is `rgba(10, 31, 46, 0.08)`, invisible against the
  `var(--dark-bg)` hover fill, so the pill currently dissolves into dark bands on hover. Pre-existing,
  but this change multiplies it from one page to four.
- Correct the two stale "home page only" comments (component header, `globals.css`).
- Capture before/after screenshots at device viewports per `visual-reproduction.md`.

### Out of scope
- `--fab-inset` re-alignment to `var(--container-padding)` (ui-designer's request) — it changes the
  home page's button, which Tim did not ask to touch.
- Dropping the `contact-fab-pulse` animation site-wide — same reason.
- Content-clearance changes to the `/about` "Beyond Engineering" glass panel and the `/projects`
  links row. These are real collisions flagged by ui-designer, but they will be **reported with
  screenshot evidence** for Tim to decide on, not fixed unilaterally on this branch.
- Any change to `/contact` itself.

### Non-goals
- **Adding the FAB to `/projects/[id]`.** Those routes are a redirect stub: `ProjectDetailClient.tsx`
  renders `null` and calls `router.replace("/projects")`. There is no page to put a button on.
- A `/flight` route. `flightLog.ts` exists but no page consumes it; `_hobby` is underscore-parked.
- Scroll-away, shrink-to-icon, dismiss state, or any per-page variant of the button.
- Redesigning the button. It ships visually identical apart from the hover border.

## Approach
`ClientShell` already renders `Navigation` outside `PageTransition`, with an explicit comment that
`position: fixed` elements must never be trapped inside a CSS-transformed parent. The FAB is exactly
such an element and currently violates that invariant: it is mounted inside `HomePage`, i.e. inside
`PageTransition`, whose `pageEnter` fallback animation applies `transform: translateY(16px)`. A
transformed ancestor becomes the containing block for fixed descendants, so on browsers without the
View Transitions API the FAB rides the page animation for ~300ms after navigation. Mounting it beside
`Navigation` fixes that and covers every route in one place.

Route suppression uses `usePathname()` against a small denylist — the same hook `Navigation` already
uses. Static export is unaffected: there is no `basePath` or `trailingSlash` in `next.config.ts`, so
`usePathname()` returns clean paths and each route is prerendered independently.

Files changed: `src/components/home/ContactFab.tsx` → `src/components/layout/ContactFab.tsx` (moved,
with a denylist and updated header comment), `src/components/layout/ClientShell.tsx` (mount),
`src/components/home/HomePage.tsx` (drop the local mount and import), `src/app/globals.css` (hover
border on dark, stale comment).

## Risks
- **Bottom-right collisions.** ui-designer identified two: the frosted panel in `/about`'s "Beyond
  Engineering" section, and the "Learn more / PDF / Source" links row on each `/projects` entry. Both
  need screenshot verification rather than speculation. Mitigation: capture at phone and laptop
  viewports, report to Tim.
- **View transitions.** `::view-transition-old/new(root)` snapshots the whole document, so the FAB
  cross-fades on navigation despite being conceptually persistent. A single `view-transition-name`
  on the now-unique element would fix it — deferred, not a regression from today's behaviour.
- **Visual regression baselines.** The FAB now appears in snapshots for three more routes; baselines
  will need regenerating.
- **Not inert when the nav menu is open.** `--z-fab: 900` sits under `--z-menu-backdrop: 1010` so it
  is visually dimmed, and keyboard Tab is trapped, but the VoiceOver rotor can still reach it. Real,
  pre-existing, and now on four pages. Logged, not fixed here.

## Tradeoffs
Rejected: importing `<ContactFab />` into each page component, mirroring what `HomePage` does today.
It is the smaller diff, but it violates the stated `ClientShell` invariant four times over, leaves
four import sites to keep in sync, and — as pm put it — means "three future pages someone forgets".
The global mount costs a three-line denylist and buys correctness everywhere.

Accepted cost: one more `usePathname()` consumer, and a component that now renders on routes nobody
explicitly enumerated (`/404`, `/error`). That is the intended behaviour of "every page".

## Test plan
- `npm run lint`
- `npm run test:unit`
- `npm run test:e2e:tier1` — routing and navigation are touched
- `npm run validate:i18n` — no new strings (the FAB reuses `nav.getInTouch`), run as a guard
- Manual: click the FAB on each of `/`, `/projects`, `/experience`, `/about`; confirm it is absent on
  `/contact` and `/admin`; confirm hover legibility over a dark section.
- `npm run visual:repro` at phone and laptop viewports for `/projects`, `/experience`, `/about`.
- Acceptance: the button appears and works on all four content pages, is absent on `/contact`, and no
  collision is left unreported.

## Panel input (from Phase 1)
- **pm**: build it — the gap is real (zero visible contact affordance on three pages); mount once
  globally, cut all per-page variants; suppress on `/contact`.
- **tech-lead**: approach B (global mount in `ClientShell`) over per-page imports; caught the
  `pageEnter` transform / fixed-positioning bug; confirmed static export and z-index are fine.
- **ui-designer**: white pill holds up on dark sections, but hover dissolves for lack of a visible
  border; flagged the `/about` glass-panel and `/projects` links-row corner collisions; wants
  `--fab-inset` on the content gutter and the pulse dropped.
- **ux-designer**: the FAB earns its place specifically because the nav hides on scroll; exclude
  `/contact` and `/projects/[id]`; flagged the inverted small-screen inset and the rotor-reachability
  issue when the menu is open.
- **Conflicts surfaced**:
  - *ui-designer vs. the ask*: two of their fixes (`--fab-inset`, pulse removal) change the home page,
    which was not in Tim's request. Resolved by Tim: take the hover-border fix, defer the rest, and
    report the collisions with screenshot evidence first.
  - *ux-designer vs. Tim's answer on `/projects/[id]`*: Tim asked to include detail pages; ux-designer
    said exclude them. Both are moot — verified that the route is a redirect stub rendering `null`.
    Reported to Tim before proceeding.
  - *ui-designer's `/flight` scope gap*: no such route exists. Claim rejected on verification.
