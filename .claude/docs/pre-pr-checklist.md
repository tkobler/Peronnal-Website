# Pre-PR checklist

The single source of truth for what must be green before merging. The `/merge-check` skill reads this file and walks the automated section; the human-judgment section is for the reviewer (you) to confirm manually.

## Automated — runnable, verifiable by command

These can be run by the `/merge-check` skill and produce a pass/fail. Claude should run the ones that apply based on what the branch touches.

### Always
- [ ] `npm run lint` — ESLint clean
- [ ] `npm run test:unit` — all Vitest unit tests pass
- [ ] `git status --ignored` does NOT show any tracked file that matches a gitignore pattern
- [ ] No `console.log`, `debugger`, or commented-out code blocks in the diff

### If translations / user-facing text changed
- [ ] `npm run validate:i18n` — EN/FR key parity passes

### If routing, navigation, or internal links changed
- [ ] `npm run test:e2e:tier1`

### If layout, CSS, or responsive behavior changed
- [ ] `npm run test:e2e:tier1` (smoke)
- [ ] `npm run test:e2e:tier2` (responsive matrix) — slow, ~768 tests

### If `DotPattern`, `Schematic`, or canvas code changed
- [ ] `npm run test:e2e:tier3`

### If accessibility-adjacent code changed (buttons, focus, ARIA)
- [ ] `npm run test:e2e:tier4`

### If design tokens, colors, or visual baselines changed
- [ ] `npm run test:visual`
- [ ] Any baseline updates are intentional (not drift)

### If the CV pipeline changed
- [ ] `npm run cv:build` succeeds locally (requires `typst`)
- [ ] Output PDFs are readable (manual spot-check)

### If dependencies changed (package.json / package-lock.json)
- [ ] Lockfile is in sync
- [ ] `npm run lint && npm run test:unit` still pass
- [ ] `npm audit` for high/critical vulns

## Human judgment — can't be run, only reviewed

These require a person to read and decide. `/merge-check` will list them but cannot verify.

- [ ] **PR description explains the WHY**, not just the what
- [ ] Commit messages follow the existing lowercase-imperative style from `git log`
- [ ] Breaking changes to data shapes, routes, or env vars are called out explicitly
- [ ] Both EN and FR translations were updated in the same change (if any text changed)
- [ ] No existing project/card/experience IDs were renumbered
- [ ] If CV links are affected, PDFs have been rebuilt and are ready for the next build
- [ ] Any new dependency is justified in the description (lean-stack exception)
- [ ] No secrets, tokens, or `.env*` content leaked into the diff
- [ ] Canvas/data coupling: if `Schematic` data changed, the `DotPattern` renderer was checked
- [ ] If this branch claims to fix a bug, there is a regression test for it

## Verdict

After walking the list, `/merge-check` reports one of three states:
- **Ready to merge** — automated all-green, human-judgment items flagged for the reviewer
- **Fix N blocker(s) first** — at least one automated check failed
- **Ready pending manual checks** — automated clean, human items still need the reviewer
