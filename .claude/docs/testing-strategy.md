# Testing strategy

The truthful, grounded version of how tests work in this repo. Use this before running any test command — the tier system is easy to misunderstand, and the old grep-based tier1 was broken until commit fc7e9eda on branch `claude/audit-fixes`.

## What exists

### Unit tests — Vitest, jsdom
Location: [tests/unit/](../../tests/unit/)
Specs:
- `flight-stats.test.ts` — flight log aggregation math
- `projects-data.test.ts` — integrity of project data in [src/data/projects.ts](../../src/data/projects.ts)
- `translations.test.ts` — EN/FR translation integrity
- `setup.ts` — jest-dom import, not a spec

Run: `npm run test:unit` (or `:watch` for TDD loops)

### E2E tests — Playwright
Location: [tests/e2e/](../../tests/e2e/)
Config: [playwright.config.ts](../../playwright.config.ts)

| Tier | Spec files | What it covers | Runtime |
|---|---|---|---|
| **tier1** | `navigation.spec.ts`, `language-toggle.spec.ts`, `project-cards.spec.ts` | Fast smoke: nav pill, hamburger, routing, i18n toggle, home project sections, portfolio page | fast (~240 tests × projects) |
| **tier2** | `responsive-matrix.spec.ts` | Every tier1-ish check repeated across 8 device profiles (iPhone SE, iPhone 14, iPad portrait/landscape, desktop, ultrawide…) | slow (~768 tests) |
| **tier3** | `canvas-performance.spec.ts` | DotPattern canvas render cost, frame cadence, page transition timing, scroll parallax | slow-ish (~48 tests but perf-sensitive) |
| **tier4** | `accessibility.spec.ts` | axe-core checks, keyboard navigation, ARIA attributes, color contrast | moderate (~152 tests) |

**Every spec file is assigned to exactly one tier. There is no overlap. There are no orphaned specs.**

### Visual regression — Playwright
Location: [tests/visual/regression.spec.ts](../../tests/visual/regression.spec.ts)
Config: [playwright.visual.config.ts](../../playwright.visual.config.ts) — separate from e2e config on purpose
Baselines: `tests/visual/baselines/` (gitignored; regenerate with `test:visual:update` when change is intentional)

## What CI runs

Since commit fc7e9eda, [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) has a blocking `test` job that runs **before** `build`:

```
test:  →  build:  →  deploy:
  lint     next build   upload to Pages
  test:unit
  validate:i18n
```

If `test` fails, `build` does not run and nothing deploys. This means **lint errors, unit test failures, and broken EN/FR translation parity will now fail your pushes to main.**

What CI does **NOT** run (and why):
- **Playwright e2e / visual / any tier** — requires a headless browser setup and browser binaries; runtime cost outweighs value on a personal site. Run locally before merging.
- **CV build (`typst` compile)** — requires the `typst` CLI installed in the runner. CV PDFs are still built locally.

## When to run what

| Change | Local minimum | Before merge |
|---|---|---|
| Text-only / translations | `test:unit` + `validate:i18n` | (CI will repeat) |
| New project / data shape | `test:unit` + `validate:i18n` | `test:e2e:tier1` |
| Routing / nav / links | `test:e2e:tier1` | tier1 |
| Layout / responsive CSS | `test:e2e:tier1` | `test:e2e:tier2` (slow) |
| Canvas / DotPattern / Schematic | `test:e2e:tier3` | tier1 + tier3 |
| A11y-adjacent | `test:e2e:tier4` | tier4 |
| Design tokens / globals.css | `test:visual` | `test:visual` |
| Big release | `test:score` (full suite + scorecard) | same |

**Rule of thumb**: tiers 2, 3, 4 are pre-merge gates, not per-edit loops. Running tier2 on every save is a waste — it's 768 tests.

## Known quirks

1. **Tier1 runs across every Playwright project (device)**. If [playwright.config.ts](../../playwright.config.ts) defines 8 device projects, `tier1`'s 3 spec files × 10 tests/file × 8 projects = 240 executions. That's correct behavior, not a bug — responsive coverage comes free. But if it feels slow, the config defines which projects run; you can set the `PLAYWRIGHT_PROJECT` env var (if wired) or use `--project=…` explicitly.
2. **The test:e2e script writes JSON results to `tests/results/e2e-results.json`**. That path is gitignored. The scorecard script ([tests/run-scorecard.ts](../../tests/run-scorecard.ts)) reads it.
3. **`test:score`** uses `;` before the scorecard (`&&` before) — the scorecard always runs, even when tests fail, so you always see a report.
4. **Tier1's old grep pattern** was `'Navigation|Language|Project Card|Route'`. It was broken in three ways (see commit fc7e9eda message). If you ever revert to grep-based selection, use describe names that don't collide across files.

## What's missing (acknowledged gaps)

- **No CI-side Playwright run.** Local-only e2e is a real gap. If a bug ships that slips past local checks, CI won't catch it. Trade-off: wiring Playwright into GitHub Actions adds ~3 minutes + browser cache management + flakiness risk on a personal site. Revisit if the site grows.
- **No CI-side visual regression.** Same reasoning.
- **No CI-side CV build.** Requires `typst` in the runner. PDFs must be built locally and placed in `public/cv-{en,fr}.pdf` before the build job uploads `out/`.
- **The `test:score` script is only useful if you manually consult it.** No automation reads the scorecard.

## What NOT to do

- Do not add test files without assigning them to a tier — every new spec needs a home.
- Do not use `--grep` for tier selection. Use file paths. Grep is case-insensitive in Playwright and substring-collides across describes.
- Do not commit `tests/visual/baselines/` — it's gitignored and local to each machine.
- Do not regenerate visual baselines with `test:visual:update` unless the design change is real and intended.
- Do not skip i18n validation. Translation parity bugs are silent and ship easily.
