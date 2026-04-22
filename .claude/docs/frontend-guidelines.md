# Frontend guidelines

Rules specific to this repo's React / Next.js / Tailwind v4 setup. These are conventions, not style preferences — follow them unless you have a reason to deviate (and say so).

## React & Next.js

- **App Router only.** Never add files under `pages/`. If you see `pages/`, something's wrong.
- **Server vs client components.** Default to server components. Add `"use client"` only when you need: state, effects, browser APIs, context, or event handlers. Most leaf components in [src/components/](../../src/components/) are client components because of animations and context — that's fine, but don't make a new one client "just in case."
- **No data fetching at runtime.** This is a static export. All data comes from imports in [src/data/](../../src/data/). Don't add `fetch`, `useSWR`, `react-query`, etc.
- **No `next/image` optimization.** `images.unoptimized: true` is set. Use plain `<img>` or `<Image unoptimized>`. Do not assume the image optimizer runs.
- **Routing**: use `next/link` for internal navigation. For programmatic nav with view transitions, use the [useViewTransitionRouter](../../src/hooks/useViewTransitionRouter.ts) hook.

## Components

- **Organize by feature, not by type.** New UI for the flight page goes in [src/components/flight/](../../src/components/flight/), not in a generic `ui/` bucket. `ui/` is reserved for true primitives.
- **No component libraries.** No shadcn, no Radix, no Headless UI, no Mantine. If you need a primitive (dialog, popover, tabs), build it in `components/ui/` or ask first.
- **Props: explicit types, no `any`.** Define a `Props` type at the top of the file. If a prop is optional, mark it optional — don't default to `undefined` through destructuring alone.
- **One component per file**, filename matches the component name in PascalCase.
- **Client-only hooks** (`useState`, `useEffect`, `useLanguage`) stay in client components. If you find yourself wanting them server-side, split the component.

## Styling (Tailwind v4)

- **Use Tailwind utilities first.** Custom CSS goes in [src/app/globals.css](../../src/app/globals.css) only for: design tokens (CSS vars), global keyframes, reset/baseline.
- **Design tokens live as CSS variables** in `globals.css`. Read them via `var(--token-name)` or via Tailwind's `theme()` where applicable. Do not redefine colors inline.
- **Dark/light**: the site uses CSS-variable-based theming, not Tailwind's `dark:` prefix by default. Check `globals.css` before assuming.
- **Responsive**: mobile-first. The Playwright responsive matrix covers iPhone SE, iPhone 14, iPad (both orientations), Desktop Chrome/Firefox/Safari, and ultrawide 2560×1080. Anything you build must look correct across all of those — run `npm run test:e2e:tier2` to verify.
- **z-index**: use the z-index scale defined in `globals.css`. Don't invent new `z-[9999]` values.
- **Arbitrary values (`w-[173px]`)**: allowed for one-offs, but if you use the same value twice, promote it to a token.

## Animations & canvas

- The `DotPattern` canvas is the hero visual. It reads project `Schematic` data. When you add/edit a project, check that its schematic actually renders — run `npm run test:e2e:tier3` (canvas-performance) as a smoke test.
- Respect `prefers-reduced-motion`. If you add a new animation, gate it (`@media (prefers-reduced-motion: reduce)` or the equivalent in JS).
- **View Transitions API**: used via [PageTransition](../../src/components/layout/PageTransition.tsx) and [useViewTransitionRouter](../../src/hooks/useViewTransitionRouter.ts). Don't reimplement — use the existing hook.

## Internationalization

- **Never hardcode user-facing strings.** Every visible string must come from `useLanguage()` and live in [src/data/translations/{en,fr}/](../../src/data/translations/).
- **Add keys to BOTH locales in the same change.** Missing keys in one language will fail `npm run validate:i18n`.
- **Group keys by section** (nav, hero, projects…). Match the file naming already in place.
- **Don't use `{t('foo.bar.baz')}` with string paths.** This project reads nested objects via `useLanguage()` — check existing components for the pattern.

**Example** — correct way to surface a string:
```tsx
// ❌ hardcoded
<button>Get in touch</button>

// ✅ from translations
const { nav } = useLanguage();
<button>{nav.getInTouch}</button>
```
With matching entries added to both `src/data/translations/en/nav.ts` and `src/data/translations/fr/nav.ts`.

## Accessibility

**Example** — semantic elements and focus states:
```tsx
// ❌ div pretending to be a button
<div onClick={handleClick} className="cursor-pointer">Submit</div>

// ✅ real button with visible focus
<button
  onClick={handleClick}
  className="focus-visible:ring-2 focus-visible:ring-accent"
>
  Submit
</button>
```

- **Semantic HTML first.** `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<article>`, `<section>` as appropriate.
- **Every image needs `alt`.** If it's decorative, `alt=""`. Never omit.
- **Interactive elements need visible focus states.** Tailwind `focus-visible:` utilities are the way.
- **Color contrast**: the design system in `globals.css` is audited; if you introduce new color pairings, verify contrast.
- **Run `npm run test:e2e:tier4`** (accessibility) before merging a11y-adjacent changes.

## Performance

- This site is tiny. Don't optimize preemptively.
- But: don't import huge libraries for small utilities. Before adding a dep, check if a 10-line function in [src/lib/](../../src/lib/) would do.
- Canvas work happens in `requestAnimationFrame` loops — if you touch `DotPattern`, watch for `tier3` performance regressions.

## Note on test tiers

Tiers 2, 3, and 4 (responsive matrix, canvas performance, accessibility) are **pre-merge gates**, not per-edit feedback loops. Running tier2 on every save is ~768 tests — a waste of cycles. Run them once before opening a PR. Use tier1 or unit tests during active development. See [testing-strategy.md](testing-strategy.md).

## What NOT to do
- Add a CSS-in-JS library (emotion, styled-components) — Tailwind v4 is enough.
- Add a state library (Redux, Zustand, Jotai) — Context is enough.
- Add MDX — content is TS data, deliberately.
- Add dynamic routes that aren't pre-rendered at build.
- Add middleware or edge functions — static export doesn't support them.
- Commit `public/cv-*.pdf`, `out/`, `.next/`, or `tests/visual/baselines/`.
