# Personnal-Website — Claude context

Personal portfolio site for Clément Chalut (EPFL Microengineering). Next.js 16 static export, bilingual EN/FR, deployed to GitHub Pages. Also hosts a standalone Typst CV pipeline in [cv/](../cv/) that produces [public/cv-en.pdf](../public/cv-en.pdf) and [public/cv-fr.pdf](../public/cv-fr.pdf) as build artifacts.

## Stack snapshot
- **Framework**: Next.js 16.1 (App Router, `output: "export"`, `images.unoptimized: true`)
- **React**: 19.2 · **TypeScript**: 5.9 strict · **Tailwind CSS**: v4 (PostCSS plugin)
- **Package manager**: npm (lockfile is [package-lock.json](../package-lock.json)) — do NOT introduce pnpm/yarn
- **Testing**: Vitest (unit) + Playwright (e2e, tiered by file — see [docs/testing-strategy.md](docs/testing-strategy.md)) + Playwright visual regression
- **Deploy**: GitHub Pages via [.github/workflows/deploy.yml](../.github/workflows/deploy.yml). CI runs `lint → test:unit → validate:i18n → build → deploy` — tests block deploys.
- **CV pipeline**: Typst compiled via [cv/build.sh](../cv/build.sh) (requires `typst` CLI). Not in CI — runs locally. Owned by the [typst-eng](agents/typst-eng.md) agent.

## Where things live (full map in [docs/project-map.md](docs/project-map.md))
- Pages: [src/app/](../src/app/) (App Router)
- Components: [src/components/](../src/components/) grouped by feature (`layout`, `home`, `projects`, `experience`, `flight`, `ui`, `admin`)
- Data (hardcoded TS, no CMS): [src/data/](../src/data/) — `projects.ts`, `homeCards.ts`, `experience.ts`, `flightLog.ts`, `courses.ts`
- i18n strings: [src/data/translations/{en,fr}/](../src/data/translations/) — validated via `npm run validate:i18n`
- Canvas animation engine: [src/components/layout/DotPattern.tsx](../src/components/layout/DotPattern.tsx), driven by `Schematic` specs on project data
- Tests: [tests/unit/](../tests/unit/), [tests/e2e/](../tests/e2e/), [tests/visual/](../tests/visual/)
- Path alias: `@/*` → `src/*` — always use it for internal imports

## Canonical commands
See [docs/commands.md](docs/commands.md) for the full list. Most-used:
```bash
npm run dev              # local dev server
npm run lint             # ESLint flat config
npm run test:unit        # Vitest
npm run test:e2e:tier1   # fast e2e: navigation + language + project-cards
npm run validate:i18n    # EN/FR key parity check
npm run cv:build         # regenerate CV PDFs (requires typst)
```

## For template users
If the conversation is about someone using this repo as a template for their own portfolio (not Clément developing his own site), the source of truth is **[SETUP.md](../SETUP.md)** at repo root. Read it before giving advice about customization, deployment, or which files to edit first.

## Things that will trip you up
1. **CV PDFs are build artifacts, not in git.** `public/cv-{en,fr}.pdf` and `cv/output/` are gitignored. CI does not build them. They must be rebuilt locally via `npm run cv:build`. Do not "fix" this by removing from gitignore — see [docs/project-map.md](docs/project-map.md).
2. **`/docs/` is gitignored.** Any `docs/STYLE_GUIDE.md` at the repo root exists only on the author's machine. Don't link to it from tracked files. (The `.claude/docs/` folder is different and IS tracked.)
3. **Static export means no server code.** No API routes, no runtime fetching, no middleware, no `next/image` optimization. All data is imported statically from [src/data/](../src/data/).
4. **Schematic-driven canvas.** Visual changes to project cards often require editing BOTH the data entry in [projects.ts](../src/data/projects.ts) AND the canvas renderer in [DotPattern.tsx](../src/components/layout/DotPattern.tsx). Don't change one without checking the other.
5. **Locale is set by an inline `<script>` in [layout.tsx](../src/app/layout.tsx)** before hydration, writing to `window.__LOCALE__`. Don't move this or you'll get a flash of wrong language.
6. **i18n keys must stay in parity.** Every key in `translations/en/` must exist in `translations/fr/`. Run `npm run validate:i18n` after editing either.
7. **Two Playwright configs.** E2E uses [playwright.config.ts](../playwright.config.ts); visual regression uses [playwright.visual.config.ts](../playwright.visual.config.ts). They are independent.
8. **No component library.** No shadcn, no Radix, no Headless UI. All primitives are hand-built in [src/components/ui/](../src/components/ui/). Don't add one without discussing.
9. **Tiers 2/3/4 are pre-merge gates, not per-edit loops.** Running tier2 during active development burns ~768 tests per run. See [docs/testing-strategy.md](docs/testing-strategy.md) for the right cadence.

## Working rules
- [docs/workflow.md](docs/workflow.md) — **branch-based workflow for every task** (`dev/`, `bug/`, `audit/`, `doc/`, `claude/`). Enforced by a PreToolUse hook in [settings.json](settings.json) that blocks commits to main.
- [docs/feature-development.md](docs/feature-development.md) — **Phase 1 discovery + Phase 2 execution** process for `dev/` branches. Includes the panel-consultation rules, STRATEGY.md/TRACKING.md structure, and when to push back vs proceed.
- [docs/bug-resolution.md](docs/bug-resolution.md) — **Phase 1 triage + Phase 2 execution** process for `bug/` branches. Reproduction questions, triage panel (`qa` + relevant builder, conditional UX/UI/tech-lead, NOT pm), failing-test-first rule, STRATEGY.md/TRACKING.md at branch root.
- [docs/visual-reproduction.md](docs/visual-reproduction.md) — shared `npm run visual:repro` procedure for capturing before/after screenshots at device viewports. Mandatory for UI bugs, required for UI-affecting features.
- [docs/frontend-guidelines.md](docs/frontend-guidelines.md) — React / Tailwind v4 / i18n / accessibility rules with worked examples
- [docs/coding-rules.md](docs/coding-rules.md) — TS conventions, imports, data modeling, testing expectations
- [docs/testing-strategy.md](docs/testing-strategy.md) — what CI runs, which tier to pick, known gaps
- [docs/pre-pr-checklist.md](docs/pre-pr-checklist.md) — single source of truth for merge gates (Automated vs Human judgment)
- [docs/glossary.md](docs/glossary.md) — domain terms (Schematic, DotPattern, tier1–4, signal burst…)
- [docs/external-refs.md](docs/external-refs.md) — deployed URLs, repo, hosting
- [docs/team.md](docs/team.md) — index of 20 subagents and when to call each

## Skills (invoke with `/`)
- `/audit` — structured audit of pending changes against coding + frontend rules (read-only, cannot mutate files)
- `/merge-check` — walks [pre-pr-checklist.md](docs/pre-pr-checklist.md), reports blockers
- `/cv-pipeline` — runs a piece of career content through the full review chain: supportive → MIT prof → neutral → grumpy recruiter

## Team
20 subagents live in [agents/](agents/) across three groups: **Build the site** (8), **Design & product** (6), **Career & writing** (6). Each has a distinct voice and narrow scope. Full index and invocation rules in [docs/team.md](docs/team.md). The canonical CV review pipeline is `resume-consultant-supportive` → `mit-prof-<domain>` → `resume-consultant-neutral` → `grumpy-recruiter`, orchestrated by `/cv-pipeline`.

## Ground rules for Claude in this repo
- **Every task goes through a branch and a PR.** Never commit to `main` directly. A hook in [settings.json](settings.json) enforces this mechanically. Branch prefixes: `dev/`, `bug/`, `audit/`, `doc/`, `claude/`. See [docs/workflow.md](docs/workflow.md).
- **For `dev/` features: Phase 1 discovery before any branch.** Ask clarifying questions, push back directly on bad ideas, and spawn `pm` + `tech-lead` (plus conditional agents) in parallel via the Agent tool for independent opinions. Surface conflicts, don't average them. See [docs/feature-development.md](docs/feature-development.md). This does NOT apply to `bug/`, `doc/`, `audit/`, or `claude/`.
- **For `bug/` fixes: Phase 1 triage before any branch.** Ask reproduction questions, capture a BEFORE screenshot for UI bugs ([docs/visual-reproduction.md](docs/visual-reproduction.md)), spawn `qa` + the relevant builder in parallel (conditional `ux-designer` / `ui-designer` / `tech-lead`). Write the failing regression test FIRST in Phase 2. See [docs/bug-resolution.md](docs/bug-resolution.md).
- **Write `STRATEGY.md` and `TRACKING.md` at the branch root before coding** on any `dev/` or `bug/` branch. Update TRACKING continuously.
- **Stop at the PR step for user validation.** Do not auto-merge.
- Content changes (text, translations, project data) are the majority of work here. Default to minimal, surgical edits.
- Never commit built artifacts (CV PDFs, `out/`, `.next/`, Playwright baselines).
- When editing bilingual content, always touch both EN and FR in the same change.
- When touching routing/nav, run `npm run test:e2e:tier1`.
- When touching canvas/Schematic code, run `npm run test:e2e:tier3`.
- Don't introduce new dependencies without asking — the lean stack is deliberate.
