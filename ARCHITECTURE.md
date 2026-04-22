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
7. [DotPattern canvas system](#7-dotpattern-canvas-system)
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
    <ClientShell>
      <LanguageProvider>
        <a#skip-link>               <!-- accessibility skip link -->
        <DotPattern />              <!-- OUTSIDE PageTransition (position:fixed canvas) -->
        <Navigation />              <!-- OUTSIDE PageTransition (fixed navbar) -->
        <PageTransition>            <!-- wraps only page content -->
          {children}                <!-- route page component -->
          <Footer />
        </PageTransition>
      </LanguageProvider>
    </ClientShell>
  </body>
</html>
```

**Why DotPattern and Navigation are outside PageTransition:** both use `position: fixed`. CSS `transform` applied by `PageTransition` creates a new containing block, which would break fixed positioning on its descendants. Keeping them as siblings of `PageTransition` preserves viewport-anchored positioning during route changes.

**Route-change side effect:** on pathname change, `ClientShell` dispatches `CustomEvent("route-change")` after 100ms so `DotPattern` re-detects sections without a full canvas rebuild. The delay lets React commit the new route's DOM before DotPattern queries `[data-section-theme]` elements.

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
| **ClientShell** | Wraps app in LanguageProvider. Dispatches `route-change` event after 100ms. Passes an airplane schematic to DotPattern on the home route. |
| **Navigation** | Fixed pill navbar with hamburger→X morph, full-screen modal menu with a spring animation, scroll hide/show, section-theme detection with hysteresis (see section 7). |
| **PageTransition** | Thin wrapper for View Transitions API fallback. Tracks `popstate` for scroll restoration. |
| **DotPattern** | Two-layer canvas (dot grid + schematic reveal). See [section 7](#7-dotpattern-canvas-system). |
| **Footer** | Static footer with social links, copyright, tech tag. |

### Home

| Component | Key behavior |
|---|---|
| **HomePage** | Orchestrates HeroSection + ProjectSection cards. Alternates dark/light themes for Navigation theme detection. |
| **HeroSection** | Typewriter-animated greeting (~110ms/char, types once and stops). Resets when locale changes via the "adjusting state during render" pattern. |
| **ProjectSection** | Full-bleed background image with dark/light gradient overlay. Card pushed to bottom on desktop. |
| **ProjectCard** | Glass-morphism card (backdrop-blur-24px). Transitioned on transform + box-shadow. Focus-visible rings. |

### Projects

| Component | Key behavior |
|---|---|
| **FullPortfolioPage** | Domain/list view toggle with fade transition. Scroll-to-project on back navigation. URL state encodes the current view. |
| **ProjectDetailPage** | Project detail with hero image (priority loading), zoom-in entrance, back button with state preservation. **Note:** `/projects/[id]` routes are currently disabled by the client-side redirect in [ProjectDetailClient.tsx](./src/app/projects/[id]/ProjectDetailClient.tsx). The page component still exists for when it's re-enabled. |
| **DomainView** | 2×2 grid of domain category cards. Grayscale images that colorize on hover. |

### Flight (cockpit-themed page)

| Component | Key behavior |
|---|---|
| **AvionicsDashboard** | Interactive VOR instrument — compass rose chases mouse via angular lerp, CDI needle deflects, TO/FROM flag toggles. |
| **RadarMap** | Radar sweep via CSS `conic-gradient` rotation. Phosphor glow on airport pins via cubic intensity curve as the sweep passes. |
| **FlightMap** | Static map with airport pins. Hover/touch reveals a detail card with the flight description. |

### Experience

| Component | Key behavior |
|---|---|
| **ExperienceTimeline** | Alternating left/right on desktop. Scroll-reveal with staggered delays via `useScrollReveal` (IntersectionObserver, one-shot). Color-coded category nodes. |

---

## 6. CSS custom-property catalog

All defined in [globals.css](./src/app/globals.css) on `:root`. **Use these instead of inventing new Tailwind arbitrary values.**

### Colors

- **Dark sections**: `--dark-bg: #0C2735`, `--dark-text: #FFFFFF`
- **Light sections**: `--light-bg: #EDF1F5`, `--light-text: #0A1F2E`
- **Category badges** (experience page): engineering (blue), service (green), music (purple), management (amber), entrepreneurship (pink), academic (indigo)

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
| Dot background | `--z-dot-bg` | 5 |
| Content | `--z-content` | 10 |
| Hero content | `--z-hero-content` | 20 |
| Dot foreground | `--z-dot-fg` | 30 |
| Locale toggle | `--z-locale` | 40 |
| Navigation | `--z-nav` | 1000 |
| Menu backdrop | `--z-menu-backdrop` | 1010 |
| Menu panel | `--z-menu-panel` | 1020 |
| Skip link | `--z-skip-link` | 9999 |

### Glass-morphism classes

- `.glass-dark`: `rgba(0,0,0,0.35)` + `backdrop-filter: blur(24px) saturate(120%)`
- `.glass-light`: `rgba(255,255,255,0.4)` + `backdrop-filter: blur(24px) saturate(120%)`
- **Fallback**: opaque backgrounds when `backdrop-filter` is unsupported (Safari < 14, older Firefox)

### Section theming

- `.section-dark`: 3-stop gradient (#0A1F2E → #0D2B3A → #0E3340)
- `.section-light`: 3-stop gradient (#F5F7FA → #E8EEF3 → #DBE5ED)
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

## 7. DotPattern canvas system

**File:** [src/components/layout/DotPattern.tsx](./src/components/layout/DotPattern.tsx) (~870 lines — the largest single component in the repo).

### Two-layer architecture

| Canvas | z-index | Purpose |
|---|---|---|
| Shape canvas (background) | 5 (behind content) | Schematic reveal animations |
| Normal canvas (foreground) | 30 (above content) | Base dot grid + cursor glow |

### Grid

- `GRID_SPACING = 14px`, `DOT_RADIUS = 1px`
- ~10,500 dots at 1920×1080

### Section color blending

`getSectionBlend()` interpolates dot color between white (for dark sections) and dark blue (for light sections), with 120px transition zones at section boundaries. This is what gives the dots a smooth theme transition as you scroll, instead of a hard flip.

### Cursor glow

- 100px radius
- Quadratic falloff (`f²`) for a soft edge
- **Spatial culling**: bounding-box check skips `Math.hypot` for ~90% of dots per frame

### Schematic reveal state machine

```
idle → revealing (wave expansion @ 350px/s)
     → revealed
     → fading (collapse @ 800px/s)
     → idle
```

**Trigger**: cursor dwells 300ms within 25px of a schematic path. Scroll triggers a smooth fade (not an instant kill). Half-spacing infill dots are generated inside polygon/bitmap regions so the reveal looks dense.

### Parallax

`scrollY * 0.03` applied via `canvas.setTransform` each frame. No React state, no re-render.

### Route change

Listens for the `route-change` custom event → calls `updateSections()` + `scheduleRender()`. Lightweight — no canvas clear, no rebuild.

### Mobile

Hidden below 768px. No reveal logic, no cursor glow. The rAF loop auto-stops when there's nothing to render.

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

Note: the scorecard is a **reporting tool**, not a CI gate. CI currently runs `lint + test:unit + validate:i18n` before deploying. E2E, visual, and the scorecard are local-only. See [.claude/docs/testing-strategy.md](./.claude/docs/testing-strategy.md) for the full split between CI-enforced and local-only checks.

---

## 9. How-to guides

### Add a new project

1. Add an entry to [src/data/projects.ts](./src/data/projects.ts) with a unique `id` (becomes the URL slug)
2. Add translations in [src/data/translations/en/projects.ts](./src/data/translations/en/projects.ts) AND [fr/projects.ts](./src/data/translations/fr/projects.ts) (key = project `id`)
3. Place the hero image in `public/images/projects/`
4. Optionally add to [src/data/homeCards.ts](./src/data/homeCards.ts) for a home-page feature
5. Optionally link to a course in [src/data/courses.ts](./src/data/courses.ts) via `projectId`
6. Run `npm run validate:i18n` and `npm run test:unit` before committing

### Add a new experience entry

1. Add an `ExperienceNode` to [src/data/experience.ts](./src/data/experience.ts) with a unique `id`
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
