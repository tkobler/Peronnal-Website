---
name: merge-check
description: Walk the pre-PR checklist against the current branch's pending changes and report what's green, what's red, and what wasn't run. Invoke before opening or merging a PR, or when the user says "/merge-check".
---

# merge-check

Run the pre-PR checklist for this repo against the current state of pending changes. Report pass/fail per relevant item. Do NOT create the PR — this is a readiness check.

## What to do

1. **Read the checklist.** The source of truth is [.claude/docs/pre-pr-checklist.md](../../docs/pre-pr-checklist.md). Do not reproduce it from memory — always read the file so updates flow through automatically.

2. **Determine the scope of changes.**
   - `git status` for untracked + unstaged
   - `git diff main...HEAD` for the branch delta (or `git diff --cached` if on main)
   - Classify which categories of the checklist apply based on touched paths:
     - `src/data/translations/` → i18n section
     - `src/app/`, `src/components/layout/Navigation.tsx` → routing section
     - CSS, Tailwind classes in JSX, `globals.css` → layout/responsive section
     - `DotPattern.tsx`, `Schematic`, canvas → canvas section
     - `components/ui/`, ARIA, buttons, forms → accessibility section
     - `globals.css` tokens, visual components → design token section
     - `src/data/*.ts` (non-translation) → data section
     - `cv/` → CV pipeline section
     - `package.json`, `package-lock.json` → dependency section

3. **Run the always-on checks first:**
   ```bash
   npm run lint
   npm run test:unit
   ```
   And check `git status --ignored` for accidentally committed ignored files.

4. **Run the conditional checks** based on scope. Some commands are slow — if the user is in a hurry, ask which tiers to run. Otherwise run all that apply.

5. **Do NOT run these automatically** without asking:
   - `npm run test:visual:update` (regenerates baselines — destructive)
   - `npm run cv:build` (requires `typst`, writes to `public/`)
   - `npm run test:score` (very slow — runs everything)

6. **Report in this structure:**

   ```
   ## Merge check: <branch> vs main
   <N> files changed, applicable sections: [list]

   ### Passed
   - ✔ lint
   - ✔ unit tests
   - …

   ### Failed (blocking)
   - ✘ test:e2e:tier1 — <short error summary, link to details>

   ### Not run (requires decision)
   - test:visual (would need baselines update?)
   - cv:build (touches CV — run locally?)

   ### Checklist items needing human judgment
   - [ ] PR description explains the why
   - [ ] Breaking changes called out
   ```

7. **If something fails**, surface the actual error, not just "failed". Show the relevant lines from the output.

8. **End with a verdict sentence**: "Ready to merge", "Fix <N> blocker(s) first", or "Ready pending manual checks".

## What this skill does NOT do
- Does not create, push, or open a PR.
- Does not commit anything.
- Does not update visual baselines.
- Does not run the CV build (local typst dependency).
- Does not modify the checklist — only reads it.
