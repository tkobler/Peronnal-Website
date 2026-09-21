# Glossary

Terms used in this repo that don't mean what you'd expect from context alone.

| Term | Meaning |
|---|---|
| **GlobalTopoBackground** | The fixed background component — a single static topographic contour image, generated once at module load, behind every page. The "signature" visual of the site. Replaced the older `DotPattern` canvas system; see [src/components/layout/GlobalTopoBackground.tsx](../../src/components/layout/GlobalTopoBackground.tsx) and [ARCHITECTURE.md §7](../../ARCHITECTURE.md#7-globaltopobackground-system). |
| **contours.ts / trailPath.ts** | The two seeded, deterministic generators behind the site's "topographic" visual language: [contours.ts](../../src/lib/contours.ts) traces a contour field via marching squares for `GlobalTopoBackground`; [trailPath.ts](../../src/lib/trailPath.ts) generates the meandering line used as the Experience timeline's central axis. Both use the same `mulberry32` seeded RNG so output is stable across server/client renders. |
| **ContactFab** | The floating "Get in touch" button, fixed bottom-right on every page except `/contact` and `/admin`. See [src/components/layout/ContactFab.tsx](../../src/components/layout/ContactFab.tsx) — shape/icon/status-dot are constants at the top of the file. |
| **ClientShell** | Root client-side wrapper in [src/components/layout/ClientShell.tsx](../../src/components/layout/ClientShell.tsx). Every page renders inside it. Provides Navigation, GlobalTopoBackground, PageTransition, ContactFab. |
| **Variant** (CV) | A specific Typst source file in [cv/variants/](../../cv/variants/) that compiles to one PDF. `generic-en.typ` and `generic-fr.typ` are the active ones; historical ones live in `cv/archive/`. The compiled output no longer auto-publishes to the site — see [public/cv/README.md](../../public/cv/README.md). |
| **Tier 1–4** | Playwright e2e test groupings. Tier 1 = nav/lang/routing (fastest), Tier 2 = responsive matrix, Tier 3 = canvas performance (currently a known gap — tests for a `<canvas>` element that no longer exists), Tier 4 = accessibility. Run via `test:e2e:tier{N}` scripts. |
| **Admin panel** | `/admin` route with GitHub API integration for editing content live. Local-only, gated on `NEXT_PUBLIC_GITHUB_*` env vars. Not a public feature. |
| **Projet-EPFL-Reports** | A separate, gitignored directory checked in as a sibling (historically). Academic reports, not part of the site. |
| **`out/`** | The Next.js static export output. Published to GitHub Pages. Gitignored. |
| **`window.__LOCALE__`** | Global set by an inline `<script>` in [layout.tsx](../../src/app/layout.tsx) before React hydrates. `LanguageContext` always initializes to `"en"` on first render and switches post-mount via `useEffect` once it reads this — see [ARCHITECTURE.md §4](../../ARCHITECTURE.md#4-i18n-internals). |
