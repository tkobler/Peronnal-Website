# Architecture — implementation details

Deep-dive reference for humans who want specifics beyond the architecture overview. Before reading this, you probably want one of these first:

- **Orient me** → [.claude/docs/project-map.md](./.claude/docs/project-map.md) — directory layout, routing, data flow, the two-pipeline model (site + Typst CV)
- **Which command do I run?** → [.claude/docs/commands.md](./.claude/docs/commands.md)
- **How do tests work?** → [.claude/docs/testing-strategy.md](./.claude/docs/testing-strategy.md)
- **Define a term** → [.claude/docs/glossary.md](./.claude/docs/glossary.md)
- **I'm using this as a template** → [SETUP.md](./SETUP.md)

This file covers the **implementation mechanics** — component internals, CSS catalog, canvas system, and actionable recipes — that don't belong in the overview docs.

---

## Table of contents

1. [Component tree](#1-component-tree)
2. [Font loading](#2-font-loading)
3. [Page transition system](#3-page-transition-system)
4. [i18n internals](#4-i18n-internals)
5. [Component behavior reference](#5-component-behavior-reference)
6. [CSS custom-property catalog](#6-css-custom-property-catalog)
7. [GlobalTopoBackground system](#7-globaltopobackground-system)
8. [UX scorecard](#8-ux-scorecard)
9. [How-to guides](#9-how-to-guides)

---

## 1. Component tree

```
<html suppressHydrationWarning>
  <head>
    <script>  <!-- inline locale detection (writes window.__LOCALE__) -->
    <script type="application/ld+json">  <!-- JSON-LD Person schema -->
  </head>
  <body className="[5 font variables] antialiased" suppressHydrationWarning>
    <AdminProvider>
      <LanguageProvider>
        <a#skip-link>               <!-- accessibility skip link -->
        <GlobalTopoBackground />    <!-- OUTSIDE PageTransition (position:fixed image) -->
        <Navigation />              <!-- OUTSIDE PageTransition (fixed navbar) -->
        <PageTransition>            <!-- wraps only page content -->
          {children}                <!-- route page component -->
          <Footer />
        </PageTransition>
        <ContactFab />              <!-- OUTSIDE PageTransition (position:fixed button) -->
      </LanguageProvider>
    </AdminProvider>
  </body>
</html>
```

**Why GlobalTopoBackground, Navigation, and ContactFab are outside PageTransition:** all three use `position: fixed`. CSS `transform` applied by `PageTransition` creates a new containing block, which would break fixed positioning on its descendants. Keeping them as siblings of `PageTransition` preserves viewport-anchored positioning during route changes.

There is no route-change side effect to speak of any more: `GlobalTopoBackground` is a single static image computed once at module load (see [section 7](#7-globaltopobackground-system)), so unlike the animated canvas it replaced, it has nothing to re-detect or rebuild when the route changes.

---

## 2. Font loading

Five Google Fonts self-hosted via `next/font/google` (no external network request at runtime):

| Font | CSS Variable | Purpose |
|---|---|---|
| Inter | `--font-body` | Body text |
| Space Grotesk | `--font-display` | Headings |
| JetBrains Mono | `--font-mono` | Code/monospace |
| Space Mono | `--font-tag` | Tags/labels |
| Crimson Text | `--font-serif` | Serif accents |

All five variables are set on `<body>` by the root layout so they're available project-wide via Tailwind's `theme()` or plain `var()`.

---

## 3. Page transition system

### Primary: View Transitions API

`useViewTransitionRouter()` at [src/hooks/useViewTransitionRouter.ts](./src/hooks/useViewTransitionRouter.ts) wraps `router.push()`:

1. Calls `document.startViewTransition(async callback)`
2. Inside callback: `router.push(href)` triggers the Next.js route change
3. A `MutationObserver` on `#main-content` detects when React commits the new DOM
4. Promise resolves → View Transitions API captures the new state and cross-fades

**CSS** (in [globals.css](./src/app/globals.css)):
- `::view-transition-old(root)`: 0.2s ease-out fade-out
- `::view-transition-new(root)`: 0.25s ease-in fade-in (simultaneous cross-dissolve)
- `prefers-reduced-motion`: instant swap (0s duration)

### Fallback (non-VT browsers)

[PageTransition.tsx](./src/components/layout/PageTransition.tsx) uses `useLayoutEffect` to apply a CSS `pageEnter` animation (0.3s fade-in with 16px upward translate). Only activates when `document.startViewTransition` is unavailable.

### Scroll restoration

Forward navigations (`router.push`) scroll to top. Back/forward navigations (`popstate`) preserve the browser's native scroll position.

---

## 4. i18n internals

The overview of how i18n is organized lives in [project-map.md](./.claude/docs/project-map.md). This section is the implementation mechanics.

### Locale detection flow

1. An **inline `<script>`** in [layout.tsx](./src/app/layout.tsx) runs **before React hydrates**. It reads `localStorage` → `navigator.language` → defaults to `"en"`, and writes the result to `window.__LOCALE__`.
2. **`LanguageContext`** ([src/context/LanguageContext.tsx](./src/context/LanguageContext.tsx)) reads `window.__LOCALE__` synchronously in its `useState` initializer. No effect, no flash.
3. **`getTranslations(locale)`** returns the full translation object for that locale. This is called in the provider and passed down via context.

### Translation file layout

```
src/data/translations/
  index.ts          # Locale type, Translations interface, getTranslations()
  en.ts / fr.ts     # Assembler files importing every section
  en/ fr/           # Per-section files (11 each): nav.ts, hero.ts, projects.ts, ...
```

Each section file is typed as `Translations["sectionName"]` for compile-time safety across locales.

### Hydration strategy

Server always renders `"en"`. Client may render `"fr"`. `suppressHydrationWarning` on `<html>` and `<body>` prevents React from crashing on the mismatch. In static export this is a single-frame switch — the inline `<script>` has already run by the time React hydrates, so `LanguageContext`'s initial state is already correct.

Don't remove `suppressHydrationWarning` or move the inline `<script>` — the whole pattern depends on script-before-hydrate ordering.

---

## 5. Component behavior reference

Non-obvious behaviors worth knowing about when editing each component.

### Layout

| Component | Key behavior |
|---|---|
| **ClientShell** | Wraps app in AdminProvider + LanguageProvider. Renders GlobalTopoBackground, Navigation, and ContactFab as fixed-position siblings of PageTransition. |
| **Navigation** | Fixed pill navbar with hamburger→X morph, full-screen modal menu with a spring animation, scroll hide/show, section-theme detection with hysteresis. |
| **PageTransition** | Thin wrapper for View Transitions API fallback. Tracks `popstate` for scroll restoration. |
| **GlobalTopoBackground** | Single fixed, static topographic contour image behind everything. See [section 7](#7-globaltopobackground-system). |
| **ContactFab** | Floating "Get in touch" button, fixed bottom-right. Hides itself on `/contact` and `/admin`. Shape/icon/status-dot configured via constants at the top of the file. |
| **Footer** | Static footer with social links, copyright, tech tag. |

### Home

| Component | Key behavior |
|---|---|
| **HomePage** | Orchestrates HeroSection + ProjectSection cards. Alternates dark/light themes for Navigation theme detection. |
| **HeroSection** | Typewriter-animated greeting (~110ms/char, types once and stops). Resets when locale changes via the "adjusting state during render" pattern. |
| **ProjectSection** | Framed background image (inset 5%/7%, rounded corners) with dark/light gradient overlay — inset rather than full-bleed so GlobalTopoBackground shows through the margin. Card pushed to bottom on desktop. |
| **ProjectCard** | Glass-morphism card (backdrop-blur-24px). Transitioned on transform + box-shadow. Focus-visible rings. |

### Projects

| Component | Key behavior |
|---|---|
| **ProjectsPage** | Single filtered list, not a domain drill-down — inline domain filter pills (`DOMAIN_KEYS`) above a scrollable list of featured projects. Deep-links via `#<project-id>` (see `useHashScroll`). |
| **ProjectDetailPage** | Project detail with hero image (priority loading), zoom-in entrance, back button with state preservation. **Note:** `/projects/[id]` routes are currently disabled by the client-side redirect in [ProjectDetailClient.tsx](./src/app/projects/[id]/ProjectDetailClient.tsx). The page component still exists for when it's re-enabled. |

### Experience

| Component | Key behavior |
|---|---|
| **ExperienceTimeline** | Alternating left/right on desktop. Scroll-reveal with staggered delays via `useScrollReveal` (IntersectionObserver, one-shot). Color-coded category nodes. Central axis is a meandering SVG trail from `lib/trailPath.ts`, not a straight line. Deep-links via `#<experience-id>` (see `useHashScroll`). |

---

## 6. CSS custom-property catalog

All defined in [globals.css](./src/app/globals.css) on `:root`. **Use these instead of inventing new Tailwind arbitrary values.**

### Colors

- **Dark sections**: `--dark-bg: #0C2735`, `--dark-text: #FFFFFF`
- **Light sections**: `--light-bg: #EDF1F5`, `--light-text: #0A1F2E`
- **Category badges** (experience page): engineering (blue), service (green), education (black), volunteering (burgundy) — `music`/`management`/`entrepreneurship`/`academic` tokens still exist in globals.css but aren't used by the current `ExperienceCategory` type

### Timing and easing

| Variable | Value | Use |
|---|---|---|
| `--duration-micro` | 150ms | Hover feedback |
| `--duration-short` | 300ms | Menu open/close |
| `--duration-standard` | 400ms | Section transitions |
| `--duration-long` | 500ms | Page transitions |
| `--duration-elaborate` | 700ms | Hero stagger |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default |
| `--ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` | Bouncy entrances |
| `--ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Menu close |

### Z-index scale

Do not invent `z-[9999]` values. Use a token:

| Layer | Variable | Value |
|---|---|---|
| Glass surface | `--z-glass` | 1 |
| Content | `--z-content` | 10 (unused — kept for future use) |
| Hero content | `--z-hero-content` | 20 |
| Contact FAB | `--z-fab` | 900 |
| Navigation | `--z-nav` | 1000 |
| Locale toggle | `--z-locale` | 1005 |
| Menu backdrop | `--z-menu-backdrop` | 1010 |
| Menu panel | `--z-menu-panel` | 1020 |
| Skip link | `--z-skip-link` | 9999 |

**`--z-locale` sits above `--z-nav` on purpose.** The nav pill is centred with a 260px min-width, so on phone-width viewports its right edge reaches under the locale toggle. At a lower value the pill won every hit test there and taps on the FR button landed on the nav instead — French was unreachable below ~430px width. This was a real mobile bug, not a design choice to second-guess.

### Glass-morphism classes

- `.glass-dark`: `rgba(0,0,0,0.35)` + `backdrop-filter: blur(24px) saturate(120%)`
- `.glass-light`: `rgba(255,255,255,0.4)` + `backdrop-filter: blur(24px) saturate(120%)`
- **Fallback**: opaque backgrounds when `backdrop-filter` is unsupported (Safari < 14, older Firefox)

### Section theming

- `.section-dark`: 3-stop gradient, navy tones, each stop at 85% opacity
- `.section-light`: 3-stop gradient, pale tones, each stop at 85% opacity
- Both are intentionally translucent (not fully opaque) so the fixed `GlobalTopoBackground` contour pattern shows through as sections scroll over it — see [section 7](#7-globaltopobackground-system)
- The `data-section-theme` HTML attribute on each section drives `Navigation`'s theme-detection logic

### Hero animation stagger

5 stages: `.hero-fade-1` through `.hero-fade-5`, each applying `fadeInUp` with `--ease-spring`, at stagger delays ~0.3s / 0.6s / 0.9s / 1.2s / 1.5s.

### Accessibility baselines (defined in globals.css)

- `*:focus-visible`: 2px solid blue-500 outline, 4px offset
- `@media (prefers-reduced-motion: reduce)`: kills all animations and transitions globally
- `-webkit-tap-highlight-color: transparent` on all elements
- `touch-action: manipulation` on interactive elements
- `button, [role="button"]`: global `cursor: pointer`
- Mobile nav pill uses a solid background (no `backdrop-filter`) for GPU performance

---

## 7. GlobalTopoBackground system

The site used to run an interactive, per-project animated canvas (`DotPattern.tsx`, ~870 lines — Schematic data on each project drove a dot-grid reveal animation keyed to cursor position and scroll). It's gone. In its place is a single static image, computed once and never touched again:

**File:** [src/components/layout/GlobalTopoBackground.tsx](./src/components/layout/GlobalTopoBackground.tsx) (37 lines).

### How it's built

1. **[src/lib/contours.ts](./src/lib/contours.ts)**'s `generateTopoContours(seed, width, height, options)` builds a smooth 2D height field — a sum of a handful of broad Gaussian "peaks" plus a little low-frequency turbulence — samples it on a grid (default 64×46), then traces iso-lines through it via marching squares. Because every line is a level set of one continuous field, lines can nest around a peak or merge at a saddle but never cross, exactly like a real elevation map. Every `indexEvery`-th level (default every 4th) is flagged `major` for a thicker/more opaque stroke, echoing the index-contour convention on real topo maps. Deterministic and seeded via `mulberry32()` — same seed always produces the same field, so there's no server/client hydration mismatch.
2. `contoursToDataUri(lines, stroke)` serializes the traced lines into a `data:image/svg+xml` URI — a plain string, not a live DOM SVG, so it can be handed straight to a CSS `background-image`/`<img src>` with zero runtime cost.
3. **`GlobalTopoBackground.tsx`** computes this once at module load (`PATTERN_SEED = 43`, a 100×100 viewBox, navy stroke `#0A1F2E`) and renders it as a single `<img>`, `position: fixed`, `object-cover`, 0.78 opacity, behind everything else in `ClientShell`.

### Why it never changes or re-renders

The old canvas listened for scroll position, cursor position, route changes, and per-section theme to decide what to draw each frame. `GlobalTopoBackground` does none of that — it's one `<img>` with a data URI computed at import time. `.section-dark`/`.section-light` (see [section 6](#6-css-custom-property-catalog)) are translucent, not opaque, so the same fixed image shows through differently as different colored sections scroll over it — the illusion of variation comes from what's on top, not from the background itself changing.

An earlier version tried to flip the line color between light/dark stroke depending on which section was in view, which meant swapping between two pre-rendered images at runtime. That swap reproducibly failed to paint on any page whose first section starts dark (About, and the dark project sections on Projects), leaving the background blank there. Removing the swap removes the bug — this is deliberately a plain static image, identical on every route, with no per-render state. Don't reintroduce section-aware color swapping without solving that underlying paint-ordering issue first.

### Related: the meandering trail on /experience

**[src/lib/trailPath.ts](./src/lib/trailPath.ts)**'s `generateTrailPath(seed, width, height, segments)` is a sibling generator — same `mulberry32` seeding, same smoothing helper — but produces a single gently meandering vertical path (a sum of a few low-frequency sine terms with random phase/frequency) instead of a contour field. `ExperienceTimeline.tsx` uses it as the timeline's central axis: a dashed SVG path standing in for a straight line, so the timeline reads as a hiking trail traced down a topo map rather than a ruler-straight line — the same "topographic" visual language as the background, applied to a second, unrelated component.

### Related: ContactFab

**[src/components/layout/ContactFab.tsx](./src/components/layout/ContactFab.tsx)** is unrelated to the topo system but shares its fixed-positioning slot in `ClientShell` (see [section 1](#1-component-tree)) — a floating "Get in touch" button, bottom-right, on every route except `/contact` and `/admin` (`HIDDEN_ON`). Shape (`pill`/`circle`/`squircle`), icon, and whether it shows the green "available" status dot are all constants at the top of the file — read the block comment there before touching the styling in globals.css. Uses the real `nav.getInTouch` translation and a real `href="/contact"` with a client-side `onClick` override, the same pattern `Navigation.tsx` uses, so middle-click/open-in-new-tab still work.

---

## 8. UX scorecard

The `npm run test:score` command runs every test suite and aggregates results via [tests/run-scorecard.ts](./tests/run-scorecard.ts) into a 0–100 score per category, plus a weighted overall:

| Category | Weight |
|---|---|
| Interaction flows (tier 1) | 25% |
| Responsive matrix (tier 2) | 20% |
| Canvas performance (tier 3) | 15% |
| Accessibility (tier 4) | 25% |
| Visual regression (separate suite) | 15% |

**Minimum overall threshold**: 50. Below that, the scorecard flags the run as failing.

**Tier 3 is currently a known gap.** `tests/e2e/canvas-performance.spec.ts` still tests for a `<canvas>` element — a leftover from the deleted `DotPattern` system (see [section 7](#7-globaltopobackground-system)). `GlobalTopoBackground` renders an `<img>`, not a canvas, so every test in this file now hits its own `count === 0` skip branch rather than testing anything real. It hasn't been rewritten for the new background system yet — inherited as-is, not something this sync fixed. See [.claude/docs/testing-strategy.md](./.claude/docs/testing-strategy.md).

Note: the scorecard is a **reporting tool**, not a CI gate. CI currently runs `lint + test:unit + validate:i18n` before deploying. E2E, visual, and the scorecard are local-only. See [.claude/docs/testing-strategy.md](./.claude/docs/testing-strategy.md) for the full split between CI-enforced and local-only checks.

---

## 9. How-to guides

### Add a new project

1. Add an entry to [src/data/projects.ts](./src/data/projects.ts) with a unique `id` (becomes the URL slug and the `/projects#<id>` deep-link anchor)
2. Add translations in [src/data/translations/en/projects.ts](./src/data/translations/en/projects.ts) AND [fr/projects.ts](./src/data/translations/fr/projects.ts) (key = project `id`)
3. Place the hero image in `public/images/projects/`
4. Optionally add to [src/data/homeCards.ts](./src/data/homeCards.ts) for a home-page feature
5. Optionally link to a course in [src/data/courses.ts](./src/data/courses.ts) via `projectId`
6. Optionally set `detail.link` (external project URL), `detail.sourceLink` (e.g. a GitHub repo), and/or `detail.documents` (PDFs dropped in `public/documents/<id>/`) — all three render on the project card when present, and each is independently optional
7. Run `npm run validate:i18n` and `npm run test:unit` before committing

### Add a new experience entry

1. Add an `ExperienceNode` to [src/data/experience.ts](./src/data/experience.ts) with a unique `id` (also becomes the `/experience#<id>` deep-link anchor) and a `category` — one of `"engineering" | "service" | "education" | "volunteering"`, which drives the timeline node color (see [section 6](#6-css-custom-property-catalog))
2. Add translations in [en/experience.ts](./src/data/translations/en/experience.ts) AND [fr/experience.ts](./src/data/translations/fr/experience.ts) (key = experience `id`)
3. Place the company logo in `public/images/logos/`

### Add a new translation key

1. Add it to the `Translations` interface in [src/data/translations/index.ts](./src/data/translations/index.ts)
2. Add the value in both `en/*.ts` and `fr/*.ts` section files
3. TypeScript compile-time enforcement will flag any missing locale
4. Run `npm run validate:i18n` to double-check

### Add a new language (e.g., DE)

Significant change — not a quick task.

1. Extend `Locale` type in [src/data/translations/index.ts](./src/data/translations/index.ts): `"en" | "fr" | "de"`
2. Create `src/data/translations/de/` with all 11 section files
3. Create `src/data/translations/de.ts` assembler
4. Update the barrel export in `index.ts`
5. Update the inline `<script>` locale-detection logic in [layout.tsx](./src/app/layout.tsx) and `detectLocale()` in [LanguageContext.tsx](./src/context/LanguageContext.tsx)
6. Add a UI toggle option in [Navigation.tsx](./src/components/layout/Navigation.tsx)
7. Update `npm run validate:i18n` (the script in [scripts/validate-translations.ts](./scripts/validate-translations.ts)) to check three-way parity

### Run tests

See [.claude/docs/commands.md](./.claude/docs/commands.md) for the full reference. Quick version:

```bash
npm run test:unit          # Vitest, fast
npm run test:e2e:tier1     # Core interaction smoke
npm run test:e2e           # Full E2E across 8 device profiles (slow)
npm run test:visual:update # Regenerate visual baselines (after intentional design changes)
npm run test:score         # Full suite + UX scorecard
```

---

## What this file intentionally does NOT cover

- **Tech stack, directory layout, routing, data flow** → [.claude/docs/project-map.md](./.claude/docs/project-map.md)
- **npm scripts reference** → [.claude/docs/commands.md](./.claude/docs/commands.md)
- **Test tier mapping, what CI runs** → [.claude/docs/testing-strategy.md](./.claude/docs/testing-strategy.md)
- **Branch-based workflow, PR rules** → [.claude/docs/workflow.md](./.claude/docs/workflow.md)
- **Domain terms and jargon** → [.claude/docs/glossary.md](./.claude/docs/glossary.md)
- **Template-user onboarding** → [SETUP.md](./SETUP.md)

If you're tempted to add one of those here, add it to the corresponding file instead — single source of truth is the whole point of this consolidation.
