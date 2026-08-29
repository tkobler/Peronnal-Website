# Glossary

Terms used in this repo that don't mean what you'd expect from context alone.

| Term | Meaning |
|---|---|
| **Schematic** | A declarative spec (`mode`, `paths`, `pads`, `regions`, `bitmap`) on project data that tells [DotPattern](../../src/components/layout/DotPattern.tsx) how to animate the canvas background for that project. Named after PCB schematics (the visual metaphor). See [src/data/projects.ts](../../src/data/projects.ts). |
| **DotPattern** | The canvas background component. Renders a dot grid and overlays Schematic-driven animations (paths, pulses, signal bursts). The "signature" visual of the site. |
| **ClientShell** | Root client-side wrapper in [src/components/layout/ClientShell.tsx](../../src/components/layout/ClientShell.tsx). Every page renders inside it. Provides Navigation, DotPattern, PageTransition. |
| **Variant** (CV) | A specific Typst source file in [cv/variants/](../../cv/variants/) that compiles to one PDF. `generic-en.typ` and `generic-fr.typ` are the active ones; historical ones live in `cv/archive/`. |
| **Tier 1–4** | Playwright e2e test groupings. Tier 1 = nav/lang/routing (fastest), Tier 2 = responsive matrix, Tier 3 = canvas performance, Tier 4 = accessibility. Run via `test:e2e:tier{N}` scripts. |
| **Signal burst** | Specific canvas animation (radial pulse) used on the contact page. See [commits mentioning it](../../.) — coordinates are finicky, check existing use before reusing. |
| **Schematic mode** | The `mode` field on a Schematic. One of `paths`, `pads`, `regions`, `bitmap`. Determines which interpreter in DotPattern renders it. |
| **Flight log** | The `/flight` page + data in [flightLog.ts](../../src/data/flightLog.ts). Tim is a pilot; this is a cockpit-style dashboard of flights and airports, not a metaphor. |
| **Admin panel** | `/admin` route with GitHub API integration for editing content live. Local-only, gated on `NEXT_PUBLIC_GITHUB_*` env vars. Not a public feature. |
| **Schematic vs canvas** | "Schematic" is the data. "Canvas" is the HTML `<canvas>` DotPattern draws on. Don't confuse them — editing the canvas code vs editing a Schematic are different jobs. |
| **Projet-EPFL-Reports** | A separate, gitignored directory checked in as a sibling (historically). Academic reports, not part of the site. |
| **`out/`** | The Next.js static export output. Published to GitHub Pages. Gitignored. |
| **`window.__LOCALE__`** | Global set by an inline `<script>` in [layout.tsx](../../src/app/layout.tsx) before React hydrates. Used to avoid a flash of wrong language. Don't remove or rename. |
