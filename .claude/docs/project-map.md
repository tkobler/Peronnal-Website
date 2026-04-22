# Project map

A mental model of how this repo fits together. Read this first when orienting on unfamiliar work.

## The two independent pipelines

This repo contains **two decoupled systems** that share a directory but almost never share code:

```
┌─────────────────────────────┐      ┌──────────────────────────────┐
│   Next.js portfolio site    │      │   Typst CV pipeline          │
│   src/, tests/, public/     │      │   cv/                        │
│   → static export to out/   │      │   → PDFs in cv/output/       │
│   → deployed to GH Pages    │      │   → copied to public/cv-*.pdf│
└─────────────────────────────┘      └──────────────────────────────┘
             ▲                                      │
             │            build artifact            │
             └──────────────────────────────────────┘
                    public/cv-{en,fr}.pdf
                    (gitignored, built locally)
```

The site **consumes** the PDFs via `<a href="/cv-en.pdf">` links. It does not know they come from Typst. The Typst pipeline knows nothing about Next.js. The only contract is the filename in [public/](../../public/).

## Site architecture

### Routing (App Router)
```
src/app/
├── layout.tsx          ← root: fonts, <script> that seeds window.__LOCALE__, ClientShell
├── page.tsx            ← /
├── projects/
│   ├── page.tsx        ← /projects  (full portfolio)
│   └── [id]/page.tsx   ← /projects/[id]  (currently disabled per recent commit)
├── experience/page.tsx ← /experience
├── flight/page.tsx     ← /flight  (cockpit-style flight log dashboard)
├── about/page.tsx      ← /about  (placeholder)
├── contact/page.tsx    ← /contact
└── admin/page.tsx      ← /admin  (GitHub API content editor, local use)
```

All routes are statically exported. No dynamic SSR. Project detail routes use `generateStaticParams` when enabled.

### Component layers

```
ClientShell (layout wrapper, client component)
├── DotPattern       ← canvas background, the "signature" visual
├── Navigation       ← hide-on-scroll pill, hamburger on mobile
├── PageTransition   ← View Transitions API wrapper
└── <page content>   ← home / projects / experience / flight / …
```

Everything inside a route renders inside `ClientShell`. `DotPattern` reads the current route + active "section" and drives its animation from `Schematic` specs defined in data.

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
├── en/{nav,hero,homeCards,projects,experience,footer,contact,about}.ts
├── fr/{same}.ts
└── index.ts   ← indexes both locales
```

Locale is seeded pre-hydration by an inline `<script>` in root `layout.tsx` reading `localStorage.locale` with fallback to `navigator.language`. After hydration, `LanguageContext` takes over. **Key parity is mandatory** — enforced by `scripts/validate-translations.ts` via `npm run validate:i18n`.

### The Schematic / DotPattern system

The canvas background is not decorative — it's data-driven. Each project in [src/data/projects.ts](../../src/data/projects.ts) carries a `Schematic` object:

```ts
schematic: {
  mode: 'paths' | 'pads' | 'regions' | 'bitmap',
  paths?:   […],  // PCB-style traces
  pads?:    […],  // highlighted dots
  regions?: […],  // area pulses
  bitmap?:  […],  // raster overlays
}
```

[DotPattern.tsx](../../src/components/layout/DotPattern.tsx) reads the active project and renders these onto a canvas sized to the viewport. When a new project is added, both the data AND the canvas interpreter may need updates depending on which `mode` it uses.

## CV pipeline architecture

```
cv/
├── data/              ← structured content (education, experience, skills)
├── template/          ← Typst template functions (layout, typography)
├── variants/
│   ├── generic-en.typ ← main EN CV source
│   └── generic-fr.typ ← main FR CV source
├── build.sh           ← compiles variants → output/, copies to public/
├── output/            ← built PDFs (gitignored)
├── archive/           ← historical variants + cover letters (gitignored)
└── .venv/             ← python venv for optional pdf2docx conversion (gitignored)
```

`npm run cv:build` is just a wrapper around `bash cv/build.sh`. The script:
1. Runs `typst compile` on each file in `variants/`
2. Writes PDFs to `cv/output/`
3. Copies `generic-en.pdf` → `public/cv-en.pdf` and `generic-fr.pdf` → `public/cv-fr.pdf`
4. (Optionally, if uncommented) converts PDFs to DOCX via Python

Because `public/cv-*.pdf` is gitignored, the site's CV download links only work if:
- (a) someone ran `npm run cv:build` locally before `npm run build`, OR
- (b) the PDFs are manually placed in `public/` before building.

**This is a known friction point.** If CI ever starts building CVs, it will need `typst` installed in the runner.

## Testing topology

```
tests/
├── unit/           ← Vitest + RTL, fast, run on every change
│   └── setup.ts    ← imports @testing-library/jest-dom
├── e2e/            ← Playwright, tiered via --grep
│   ├── navigation, language, project-cards     → tier 1 (fast)
│   ├── responsive-matrix                       → tier 2
│   ├── canvas-performance                      → tier 3
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
