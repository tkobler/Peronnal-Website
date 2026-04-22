# Commands

Canonical commands for this repo. For the full testing-strategy explanation (including what CI runs and which tier to pick), see [testing-strategy.md](testing-strategy.md).

## Dev loop
```bash
npm run dev              # Next.js dev server (Turbopack), http://localhost:3000
npm run build            # Static export to out/
npm start                # Serve the built out/ (after build)
npm run lint             # ESLint flat config (eslint.config.mjs)
```

## Testing
```bash
npm run test:unit              # Vitest, all unit tests
npm run test:unit:watch        # Vitest in watch mode

npm run test:e2e               # Playwright e2e, full suite (writes JSON to tests/results/)
npm run test:e2e:ui            # Playwright UI mode (debugging)

# Tiers (by explicit file, not grep — see testing-strategy.md for why)
npm run test:e2e:tier1         # navigation + language-toggle + project-cards (fast smoke)
npm run test:e2e:tier2         # responsive-matrix across 8 device profiles (slow, ~768 tests)
npm run test:e2e:tier3         # canvas-performance (perf-sensitive)
npm run test:e2e:tier4         # accessibility (axe-core, ARIA, contrast)

npm run test:visual            # Visual regression (separate Playwright config)
npm run test:visual:update     # Regenerate visual baselines (use deliberately)

npm run test                   # unit + full e2e
npm run test:score             # unit + e2e + visual + scorecard aggregation (slow)
```

## i18n
```bash
npm run validate:i18n          # Checks EN/FR translation key parity
```

## CV pipeline
```bash
npm run cv:build               # Compiles cv/variants/*.typ, copies PDFs to public/
                               # Requires `typst` CLI installed locally
bash cv/build.sh               # Same thing, directly
```

## Git housekeeping
```bash
git ls-files public/cv-en.pdf  # Confirm a gitignored artifact isn't tracked
git check-ignore -v <path>     # See which .gitignore rule matches a path
git rm -r --cached <path>      # Untrack a file without deleting it from disk
```

## Which tier to run when
| Change | Run at minimum | Before merge |
|---|---|---|
| Text / translations | `test:unit` + `validate:i18n` | CI re-runs both |
| Data / projects | `test:unit` + `validate:i18n` | `test:e2e:tier1` |
| Routing / navigation | `test:e2e:tier1` | tier1 |
| Layout / responsive | `test:e2e:tier1` | `test:e2e:tier2` (slow) |
| Canvas / Schematic | `test:e2e:tier3` | tier1 + tier3 |
| Accessibility | `test:e2e:tier4` | tier4 |
| Design tokens | `test:visual` | `test:visual` |
| Any before PR | see [pre-pr-checklist.md](pre-pr-checklist.md) | |

**Rule**: tiers 2/3/4 are pre-merge gates, not per-edit loops. Don't burn cycles on them during active development.

## What CI runs
Since the `test` job was added, CI runs on every push to main:
```
npm ci → npm run lint → npm run test:unit → npm run validate:i18n → npm run build → deploy
```
Anything that breaks any of those blocks the deploy. E2e, visual, and CV build are still local-only.
