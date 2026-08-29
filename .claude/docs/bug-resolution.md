# Bug resolution process

Every `bug/<name>` branch follows the two phases below. **This applies to `bug/` only** — not `dev/` (see [feature-development.md](feature-development.md)), not `doc/`, not `audit/`, not `claude/`.

The goal: stop shipping "fixes" for symptoms nobody reproduced, stop forgetting to add regression tests, and leave a clear trail of what was broken, why, and how we know it's fixed.

---

## Phase 1 — Triage (before any branch)

Tim reports a bug. Claude does **not** immediately open a branch and start patching. Instead:

### 1.1 Ask reproduction questions first

A bug report like "the filter is broken" is not reproducible. Ask the questions that make it one. Aim for 3–6 targeted questions per round, not a wall of them.

The standard reproduction checklist:
- **What were you doing when it happened?** (exact steps, not a summary)
- **What did you expect to happen?**
- **What happened instead?**
- **On which device and browser?** (iPhone SE Safari? Desktop Chrome? iPad in portrait?)
- **Can you reproduce it reliably?** What's the minimal sequence to trigger it?
- **When did it start?** Was it working last week? After a specific change?
- **Anything in the browser console?** Any network failures, hydration warnings, CORS errors?
- **Is the data or URL that triggers it shareable?** (specific project id, specific locale, a deep link)

Don't skip to a hypothesis until these are answered. Bugs that get "fixed" without reproduction get fixed by randomly changing things until the symptom goes away — and regress two weeks later.

### 1.2 Capture visual evidence — mandatory for UI bugs

If the bug is visual (layout, spacing, color, missing element, broken interaction), use the visual reproduction procedure in [visual-reproduction.md](visual-reproduction.md) to capture a **BEFORE screenshot** at the same viewport the user reported.

Store it at `tests/visual/repro/<bug-short-name>/before.png` (the folder is gitignored by default; see the procedure doc for the convention on committing screenshots to the PR).

UI bug reports without a screenshot are incomplete. If Tim can't provide one, Claude captures one. If neither can reproduce the bug visually, downgrade it to "needs reproduction" and stop.

### 1.3 Consult the triage panel in parallel

Always spawn these agents in parallel via the Agent tool (one block, multiple calls):

- **`qa`** — owns reproduction quality, edge cases, test-gap analysis, and the "what test would have caught this" question
- **The relevant builder** for the code area:
  - `frontend-eng` — component / React / Tailwind / i18n / routing / canvas bugs
  - `typst-eng` — CV pipeline bugs
  - `devops` — CI/CD, GitHub Actions, deploy, build reproducibility bugs
  - `security-eng` — security bugs (token leakage, XSS, admin panel issues)
  - `backend-eng` — GitHub API / admin panel integration bugs

Conditional additions (in the same parallel block):
- **`ux-designer`** — when the bug is a flow / interaction / friction issue, not a crash or visual defect
- **`ui-designer`** — when the bug is visual (spacing, color, layout, hierarchy)
- **`tech-lead`** — only when the bug reveals an architectural problem (rare — most bugs are localized)

**Do NOT consult**:
- `pm` — bugs don't need a value gate, they're obligations not features
- The reserve roles (`eng-manager`, `scrum-master`, `data-scientist`) — not relevant to bug triage
- The career-writing agents — wrong domain

Pass each agent the same brief:
1. The reproduction steps Tim provided
2. Any screenshots or artifacts
3. A request for three things specifically: **(a)** their hypothesis for the root cause, **(b)** which test should exist to have caught this, **(c)** the smallest fix they'd recommend

### 1.4 Collate and surface conflicts

Present the panel's takes honestly. If `qa` says "this is a missing test in tier 2" and `frontend-eng` says "this is a CSS breakpoint bug at 390px", surface both:

> - **qa**: missing responsive test at iPhone SE for the locale toggle — tier 2 should catch this
> - **frontend-eng**: hypothesis is `.nav-locale-toggle` clips the FR button due to flex-wrap at the narrowest breakpoint; fix is a min-width adjustment
> - These are complementary, not conflicting. Fix the CSS AND add the missing tier-2 test.

When hypotheses actually contradict, say so and ask Tim to decide which path to investigate first.

### 1.5 Stop conditions

Do NOT proceed to Phase 2 if:
- **Reproduction isn't reliable** — go back to Tim for more details; don't fix what you can't trigger
- **The panel's root-cause hypotheses all contradict** — deeper investigation first, not a fix
- **The "fix" requires architectural change** — this is no longer a bug, it's a `dev/` branch with full Phase 1 discovery from [feature-development.md](feature-development.md)
- **The bug is actually a feature request in disguise** — escalate to `dev/`

Phase 1 ends when reproduction is reliable, root cause is agreed (at least hypothetically), and the fix approach is narrow enough that STRATEGY.md can be written in a few minutes.

---

## Phase 2 — Execution

### 2.1 Create the branch

```bash
git checkout main && git pull
git checkout -b bug/<short-name>
```

Keep the name narrow and specific. `bug/mobile-locale-toggle-clipped` is better than `bug/nav-fix`.

### 2.2 Write STRATEGY.md and TRACKING.md at the branch root (before any code)

Both files live at the **repository root** on the bug branch, not under `.claude/`. They ship with the branch, travel in the PR, and merge into main with the fix — part of the story of the bug.

**STRATEGY.md** is written once at the start of Phase 2 and only updated if the root cause turns out different during investigation (which triggers a mini Phase-1 re-consultation). Structure:

```markdown
# <Bug name> — Strategy

## Symptom
Exactly what the user saw, in their words. No paraphrasing.

## Reproduction
Minimal deterministic steps to trigger the bug.
- Device / viewport / browser
- URL or starting page
- Sequence of actions
- Expected vs actual outcome

## Root cause
The actual cause, not the symptom. "Filter looks weird" is a symptom. "`.project-filter-grid` uses `grid-cols-4` with no responsive override, so at widths under 640px the columns collapse to illegible" is a root cause.

## Fix approach
The smallest change that addresses the root cause. Explain why this is minimal and why it doesn't break adjacent behavior.

## Test plan
- [ ] Failing regression test written first — which tier, which file, what it asserts
- [ ] Test tier(s) to run after the fix
- [ ] Visual verification (before/after screenshots) for UI bugs

## Panel input (from Phase 1)
- **qa**: <one-line summary>
- **<builder>**: <one-line summary>
- **<conditional agents>**: <one-line each>
- **Conflicts surfaced**: <any disagreements and how they were resolved>

## Visual evidence (if UI bug)
- Before: `tests/visual/repro/<bug-name>/before.png`
- After: `tests/visual/repro/<bug-name>/after.png` (captured after the fix)
```

**TRACKING.md** is updated continuously during execution:

```markdown
# <Bug name> — Tracking

## Current status
One sentence on where this branch is right now.
Last updated: <YYYY-MM-DD>

## Tasks
- [x] Capture reproduction
- [x] Before screenshot
- [x] Write failing regression test
- [ ] Implement fix
- [ ] Verify: regression test passes
- [ ] Verify: relevant test tier passes
- [ ] Capture after screenshot
- [ ] Update PR description

## Decisions log
Chronological, most recent last.

### YYYY-MM-DD — <decision title>
What was decided, alternatives considered, why this choice.

## Blockers
Anything preventing progress.

## Team consultations during execution
Follow-up agent invocations beyond Phase 1.
- **YYYY-MM-DD — <agent>**: <why called, key take>
```

### 2.3 Write the failing regression test FIRST

This is the hard rule for bug branches. Before changing any production code:

1. Find the right test file based on the area:
   - Unit (Vitest): `tests/unit/*.test.ts` for data / logic / pure helpers
   - E2E tier 1: `tests/e2e/{navigation,language-toggle,project-cards}.spec.ts` for core user flows
   - E2E tier 2: `tests/e2e/responsive-matrix.spec.ts` for responsive / viewport bugs
   - E2E tier 3: `tests/e2e/canvas-performance.spec.ts` for canvas / animation bugs
   - E2E tier 4: `tests/e2e/accessibility.spec.ts` for a11y bugs
   - Visual: `tests/visual/regression.spec.ts` for visual / pixel-diff bugs
2. Write a test that **fails right now** because of the bug
3. Run it and confirm it fails **for the right reason** — not because of a typo, not because the test file can't compile, but because of the actual bug

Why: a bug without a regression test will come back. Every. Single. Time.

If a test genuinely cannot be written (rare — usually a visual-only bug that doesn't warrant a full visual baseline), document **explicitly** in TRACKING.md why, and get Tim's OK to proceed without one.

### 2.4 Fix the root cause

- **Minimal change.** Touch only what's necessary. Resist the urge to "clean up while I'm here".
- **No drive-by refactors.** If you spot other bugs along the way, note them in TRACKING.md under a "Related issues observed" section for separate branches.
- **Address the root cause, not the symptom.** A `display: none` that hides the broken UI is not a fix — it's a cover-up.

### 2.5 Verify

- Run the failing test — it must now pass
- Run the relevant test tier(s) from [commands.md](commands.md)
- **Capture the AFTER screenshot** using the same viewport and URL as the BEFORE (see [visual-reproduction.md](visual-reproduction.md)) — save to `tests/visual/repro/<bug-name>/after.png`
- Manual check in `npm run dev` if it's a UX-heavy bug
- Update TRACKING.md to reflect that verification is done

### 2.6 PR description

The PR body must include:

- **Symptom** — what Tim (or the reporter) saw
- **Root cause** — the actual cause, with file:line references
- **Fix** — what changed and why this is the minimal fix
- **Verification** — what was run (test names + tier), what passed, link to before/after screenshots

Without these four sections, the PR isn't ready.

---

## What NOT to do

- **Don't fix "while you're in there".** One concern per branch. Note related bugs for separate branches.
- **Don't skip the failing test.** "The fix is obvious" is how regressions happen two sprints later.
- **Don't assume the symptom is the bug.** Reproduce first, hypothesize second.
- **Don't propose a fix without the triage panel.** Solo hypotheses miss edge cases. That's what `qa` is for.
- **Don't let the STRATEGY silently drift.** If the root cause turns out different than you thought, that's a scope change — log it in TRACKING, update STRATEGY, and maybe re-consult the panel.
- **Don't merge without before/after screenshots for UI bugs.** They're the review evidence.
- **Don't commit `tests/visual/repro/` files by default.** They're gitignored. Use `git add -f <specific-file>` to opt a screenshot into the PR.
- **Don't start a `bug/` branch for something that's actually a feature.** If the "bug" is "the site doesn't have X", that's a `dev/` branch with Phase 1 discovery.
