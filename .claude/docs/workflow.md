# Workflow

Every task in this repo follows one of five branch-based workflows. Pick the right prefix, then follow the steps in order. Never commit directly to `main`.

## Branch naming

| Task type | Branch prefix | Example |
|---|---|---|
| New feature | `dev/` | `dev/flight-map-zoom` |
| Bug fix | `bug/` | `bug/nav-hamburger-ios-safari` |
| Audit | `audit/` | `audit/2026-04-15` |
| Documentation | `doc/` | `doc/contributing-guide` |
| `.claude/` updates | `claude/` | `claude/add-security-skill` |

- Use kebab-case after the slash.
- Keep names short but specific — a future reader should guess what the branch is about from the name alone.
- One concern per branch.

## Feature workflow (`dev/<feature-name>`)

Feature development has a **discovery phase** before any branch is created. See [feature-development.md](feature-development.md) for the full process; the short version:

**Phase 1 — Discovery (no branch yet)**
1. Claude asks clarifying questions until scope is real. Pushes back directly on bad ideas; offers compromises.
2. Claude spawns `pm` + `tech-lead` in parallel (plus conditional agents like `ux-designer`, `qa`, `frontend-eng`, `ui-designer`, `typst-eng`) via the Agent tool. Opinions are independent — conflicts get surfaced, not averaged.
3. Your Name decides whether to proceed. Claude does NOT proceed to Phase 2 on a unanimous "don't build it" without explicit override.

**Phase 2 — Execution (branch + docs + code)**
1. **Create the branch** off the latest `main`:
   ```bash
   git checkout main && git pull
   git checkout -b dev/<feature-name>
   ```
2. **Before any code**, create `STRATEGY.md` and `TRACKING.md` at the repository root. Structures are specified in [feature-development.md](feature-development.md). STRATEGY is mostly static (scope drift triggers a re-consultation); TRACKING is updated continuously.
3. **Develop the feature.** Small, focused commits. Follow [coding-rules.md](coding-rules.md) and [frontend-guidelines.md](frontend-guidelines.md). Update `TRACKING.md` as tasks complete, decisions are made, and blockers surface.
4. **Re-consult panel agents** mid-execution for decisions with architectural or scope consequences. Log consultations in `TRACKING.md`.
5. **Pre-deploy local test.** Before asking for review:
   - `npm run lint`
   - `npm run test:unit`
   - `npm run dev` and manually exercise the feature in the browser on the golden path
   - Run the tier(s) from [commands.md](commands.md) that match what was touched
   - If text changed: `npm run validate:i18n`
6. **Run `/merge-check`** to confirm readiness against [pre-pr-checklist.md](pre-pr-checklist.md).
7. **Open a PR.** `STRATEGY.md` and `TRACKING.md` are part of the PR — reviewers read them alongside the diff. PR description explains the **why**, not just the what. List which test tiers were run.
8. **Wait for user validation.** Do not merge without explicit approval from Your Name. The PR is a pause point, not a formality.
9. **Merge into `main`** (preserve the history style the repo already uses — check `git log` before picking merge vs squash). STRATEGY/TRACKING files get merged along with the code.
10. **Delete the branch** locally and remotely after merge.

## Bug-fix workflow (`bug/<bug-name>`)

Bugs follow their own two-phase process documented in [bug-resolution.md](bug-resolution.md) — **Phase 1 triage** (reproduction questions, mandatory BEFORE screenshot for UI bugs, parallel panel consultation with `qa` + the relevant builder) then **Phase 2 execution** (STRATEGY.md + TRACKING.md at branch root, failing test first, fix, verify, AFTER screenshot).

Short version:
- Reproduce before hypothesizing. Screenshots via [visual-reproduction.md](visual-reproduction.md) for UI bugs — `npm run visual:repro`.
- Spawn `qa` + the relevant builder in parallel (conditional: `ux-designer`, `ui-designer`, `tech-lead`). Never consult `pm` or reserve roles for bugs.
- Create `bug/<name>` branch, write STRATEGY.md and TRACKING.md at branch root, then write the failing regression test FIRST.
- Fix minimally — no drive-by cleanup. If you see other bugs, note them for separate branches.
- Verify with the relevant test tier + an AFTER screenshot for UI bugs.
- PR description must include **symptom**, **root cause**, **fix**, and **verification** (tier run + before/after screenshots).

See [bug-resolution.md](bug-resolution.md) for the full process and the non-obvious rules (e.g. why the failing test comes first, when to downgrade to "needs reproduction", what stop conditions kick you back to Phase 1).

## Audit workflow (`audit/<date>`)

Audits are read-only reviews that produce findings, not code changes.
1. Create `audit/<YYYY-MM-DD>` (e.g. `audit/2026-04-15`).
2. Run the `/audit` skill against the current state of `main` (or a specified scope).
3. Write the findings to a timestamped file, e.g. `.claude/audits/2026-04-15.md`. Do not reproduce them only in chat — the branch should leave an artifact.
4. Commit the audit file. No other changes.
5. Open a PR so Your Name can review and decide which findings become follow-up `bug/` or `dev/` branches.
6. Audit branches never contain fixes. Fixes are separate branches that reference the audit.

## Documentation workflow (`doc/<description>`)

For changes to user-facing docs, README, or in-repo markdown that isn't in `.claude/`.
1. Create `doc/<description>`.
2. Edit only docs. No code changes. If a doc change requires a code change, that's two branches.
3. `npm run lint` still runs (catches broken links in some configs) — run it anyway.
4. Open PR, wait for validation, merge.

## Claude folder workflow (`claude/<description>`)

For changes to `.claude/` — adding skills, updating guidelines, tweaking CLAUDE.md.
1. Create `claude/<description>`.
2. Edit only `.claude/` files. No code or other doc changes in the same branch.
3. If you added or changed a skill, try invoking it once on a real-looking input to sanity-check the prompt.
4. Open PR. Describe what's new and why. Link to any conversation where the need surfaced.
5. Merge.

## Rules that apply to all workflows

- **Never push directly to `main`.** Every change goes through a branch and a PR, even tiny ones.
- **Never merge without user approval.** Opening the PR is where Claude stops and Your Name decides.
- **Never commit build artifacts** (`out/`, `public/cv-*.pdf`, `cv/output/`, `tests/visual/baselines/`, `.next/`). If you see one in `git status`, stop and investigate.
- **Never skip hooks** (`--no-verify`) unless Your Name explicitly asks.
- **If you're blocked mid-task**, commit WIP to the branch and explain the blocker. Don't improvise around it.
- **Keep branches short-lived.** If a branch is getting old, rebase on `main` to catch drift.

## When the user asks "start a feature/bug/audit…"

That request is the trigger for the full workflow. Claude should:
1. Confirm the branch name before creating it.
2. Create the branch.
3. Start working.
4. Stop at the PR step for user validation — do NOT auto-merge.
