# Project map

A mental model of how this repo fits together. Read this first when orienting on unfamiliar work.

## The two independent pipelines

This repo contains **two decoupled systems** that share a directory but almost never share code:

```
┌─────────────────────────────┐      ┌──────────────────────────────┐
│   Next.js portfolio site    │      │   Typst CV pipeline (parked) │
│   src/, tests/, public/     │      │   cv/                        │
│   → static export to out/   │      │   → PDFs in cv/output/       │
│   → deployed to GH Pages    │      │   (publish step commented    │
└─────────────────────────────┘      │    out in cv/build.sh)       │
             ▲                       └──────────────────────────────┘
             │  reads directly
             │
      public/cv/cv-{en,fr}.pdf
      (tracked by git — hand-dropped or copied from cv/output/)
```

The site **consumes** two PDFs via `<a href="/cv/cv-en.pdf">` links in [ContactClient.tsx](../../src/app/contact/ContactClient.tsx), served from [public/cv/](../../public/cv/) and tracked by git — GitHub Pages builds from the repo, so an untracked PDF would 404 on the live site. It does not know or care whether those PDFs came from Typst. The Typst pipeline is parked: its publish-to-`public/` step is commented out in [cv/build.sh](../../cv/build.sh). See [public/cv/README.md](../../public/cv/README.md).

## Site architecture

### Routing (App Router)
```
src/app/
├── layout.tsx          ← root: fonts, <script> that seeds window.__LOCALE__, ClientShell
├── page.tsx            ← /
├── projects/
│   ├── page.tsx        ← /projects  (full portfolio)
│   └── [id]/page.tsx   ← /projects/[id]  (currently disabled: ProjectDetailClient.tsx redirects to /projects)
├── experience/page.tsx ← /experience
├── hobby/page.tsx      ← /hobby  (deliberately minimal — demonstrates a non-project page; see SETUP.md)
├── about/page.tsx      ← /about
├── contact/page.tsx    ← /contact
└── admin/page.tsx      ← /admin  (GitHub API content editor, local use)
```

All routes are statically exported. No dynamic SSR. Project detail routes use `generateStaticParams` when enabled.

### Component layers

```
ClientShell (layout wrapper, client component)
├── GlobalTopoBackground  ← fixed static topo-contour image, the "signature" visual
├── Navigation            ← hide-on-scroll pill, hamburger on mobile
├── PageTransition        ← View Transitions API wrapper
│   └── <page content>    ← home / projects / experience / hobby / about / contact / …
└── ContactFab            ← floating "Get in touch" button, hidden on /contact and /admin
```

Everything inside a route renders inside `ClientShell`. Unlike the old canvas it replaced, `GlobalTopoBackground` is a single image computed once at module load — it doesn't read the route or re-render on navigation. See [ARCHITECTURE.md §7](../../ARCHITECTURE.md#7-globaltopobackground-system).

### Data flow (one direction, build-time only)

```
src/data/*.ts            →  imported by components  →  rendered at build time
src/data/translations/   →  LanguageContext         →  useLanguage() in components
```

There is **no fetching**, **no API**, **no CMS**. To change content, edit a `.ts` file. This is intentional — the site is a static artifact.

### i18n

```
LanguageContext (src/context/LanguageContext.tsx)
     ▲
     │ useLanguage()
     │
src/data/translations/
├── en/{nav,hero,homeCards,projects,projectDetails,experience,hobby,footer,contact,about,placeholder}.ts
├── fr/{same}.ts
└── index.ts   ← Translations interface, indexes both locales
```

Locale is seeded pre-hydration by an inline `<script>` in root `layout.tsx` reading `localStorage.locale` with fallback to `navigator.language`. After hydration, `LanguageContext` takes over. **Key parity is mandatory** — enforced by `scripts/validate-translations.ts` via `npm run validate:i18n`.

### The GlobalTopoBackground system

The fixed background is generated, not a static asset — [src/lib/contours.ts](../../src/lib/contours.ts) traces a seeded, deterministic topographic contour field (marching squares over a sum of Gaussian "peaks") into an SVG data URI, computed once at module load by [GlobalTopoBackground.tsx](../../src/components/layout/GlobalTopoBackground.tsx). It never re-renders, never reads the route, and isn't tied to individual projects — this replaced an earlier per-project animated canvas (`DotPattern`/`Schematic`) that was deleted outright, not repurposed. A sibling generator, [src/lib/trailPath.ts](../../src/lib/trailPath.ts), produces the meandering trail line used as the Experience page's timeline axis. Full internals: [ARCHITECTURE.md §7](../../ARCHITECTURE.md#7-globaltopobackground-system).

## CV pipeline architecture

```
cv/
├── data/              ← structured content (education, experience, skills)
├── template/          ← Typst template functions (layout, typography)
├── variants/
│   ├── generic-en.typ ← main EN CV source
│   └── generic-fr.typ ← main FR CV source
├── build.sh           ← compiles variants → output/ (publish step parked)
├── output/            ← built PDFs (gitignored)
├── archive/           ← historical variants + cover letters (gitignored)
└── .venv/             ← python venv for optional pdf2docx conversion (gitignored)
```

`npm run cv:build` is just a wrapper around `bash cv/build.sh`. The script:
1. Runs `typst compile` on each file in `variants/`
2. Writes PDFs to `cv/output/`
3. ~~Copies `generic-en.pdf` → `public/cv-en.pdf` and `generic-fr.pdf` → `public/cv-fr.pdf`~~ — parked; copy over `public/cv/cv-{en,fr}.pdf` by hand and commit, or uncomment the block in `cv/build.sh`
4. (Optionally, if uncommented) converts PDFs to DOCX via Python

The site's CV download no longer depends on any of this. It links directly at PDFs committed under [public/cv/](../../public/cv/) — so downloads work in CI without `typst` in the runner. Using Typst again just means copying `cv/output/*.pdf` over `public/cv/cv-{en,fr}.pdf` and committing.

## Testing topology

```
tests/
├── unit/           ← Vitest + RTL, fast, run on every change
│   └── setup.ts    ← imports @testing-library/jest-dom
├── e2e/            ← Playwright, tiered via --grep
│   ├── navigation, language, project-cards     → tier 1 (fast)
│   ├── responsive-matrix                       → tier 2
│   ├── canvas-performance                      → tier 3 (known gap — tests a <canvas>
│   │                                              element that no longer exists since
│   │                                              GlobalTopoBackground; see ARCHITECTURE.md §8)
│   └── accessibility                           → tier 4
├── visual/         ← Playwright (separate config)
│   └── baselines/  ← gitignored; regenerate with test:visual:update
├── results/        ← gitignored output
└── run-scorecard.ts ← aggregates all results into a score
```

The tier system is there so you can run the cheap tests on every change and reserve the expensive ones (canvas, responsive matrix, a11y) for pre-merge.

## Deployment topology

```
push to main  →  GitHub Actions
                 ├── npm ci
                 ├── npm run build         (writes out/)
                 └── upload out/ to Pages
                                            ↓
                                    https://<pages-url>
```

CI does **not** run:
- `cv:build` (no typst binary)
- visual regression (baselines are local)
- e2e tiers 3–4 (not wired)

So the pre-merge checklist (see [pre-pr-checklist.md](pre-pr-checklist.md)) is where those live.

## Key invariants to preserve
1. **Static-exportable**: nothing in `src/` may assume a server runtime.
2. **Bilingual parity**: EN and FR translation trees mirror each other exactly.
3. **No new deps without discussion**: the lean stack is a feature.
4. **Build artifacts stay out of git**: CV PDFs, `out/`, `.next/`, baselines.
5. **Path alias `@/*` everywhere**: never relative imports beyond one level.
