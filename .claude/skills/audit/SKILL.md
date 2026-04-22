---
name: audit
description: Audit the current pending changes (staged + unstaged) against this repo's frontend guidelines and coding rules. Reports findings grouped by severity. Invoke when the user asks for a code review, an audit, or "/audit".
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git branch:*), Bash(git show:*)
---

# audit

Run a structured audit of pending changes in this repo against its documented rules.

## What to do

1. **Gather the diff.**
   - Run `git status` to see all changes, `git diff` for unstaged, `git diff --cached` for staged, and `git diff main...HEAD` if on a branch.
   - List the files touched. If the diff is very large (>500 lines), group findings by file rather than line-by-line.

2. **Load the rules.** Read (in this order):
   - [.claude/docs/frontend-guidelines.md](../../docs/frontend-guidelines.md)
   - [.claude/docs/coding-rules.md](../../docs/coding-rules.md)
   - [.claude/CLAUDE.md](../../CLAUDE.md) — focus on the "Things that will trip you up" and "Ground rules" sections
   - [.claude/docs/project-map.md](../../docs/project-map.md) — only if the change touches architecture or data flow

3. **Audit for these categories** (skip categories that don't apply):

   **Correctness**
   - TypeScript strictness violations, `any`, `@ts-ignore` without reason
   - Missing null/undefined handling at actual boundaries (not internal code)
   - Broken imports, unused imports, wrong path alias usage
   - Logic bugs visible from the diff

   **Project-specific invariants**
   - Static-export violations (server code, runtime fetching, middleware)
   - i18n: hardcoded user-facing strings, EN/FR key parity
   - CV pipeline: accidental tracking of `public/cv-*.pdf`, `cv/output/`, `cv/archive/`
   - Build artifacts committed: `out/`, `.next/`, `tests/visual/baselines/`, `test-results/`
   - Canvas/Schematic: data change without renderer update (or vice versa)
   - New dependencies added without justification

   **Frontend hygiene**
   - Accessibility: missing `alt`, missing focus states, non-semantic HTML for interactive elements
   - Tailwind misuse: arbitrary values where tokens exist, `z-[9999]` hacks, inline color literals
   - Client/server component confusion: `"use client"` where not needed, or missing where it is
   - `next/image` optimization assumptions (images.unoptimized is true)

   **Code style**
   - Dead code, commented-out blocks, console logs
   - Comments explaining **what** instead of **why**
   - Over-abstraction for a small change
   - Default exports in non-Next.js-required files

   **Testing**
   - Bug fix without a regression test
   - New feature/route without at least a smoke test
   - Visual baseline changes without clear intent

4. **Report findings** in this structure:

   ```
   ## Audit: <N> files changed

   ### Blocking (must fix before merge)
   - [path:line] rule → what's wrong → suggested fix

   ### Should fix
   - …

   ### Nits / optional
   - …

   ### Looks good
   - One-line summary of what's clean, so the author knows you looked at it.
   ```

5. **If nothing is wrong**, say so in one sentence. Don't invent findings to fill the template.

6. **Do not auto-fix.** The skill only reports. The user decides what to act on.

## Scope

- Only audit **pending changes** (vs. main or unstaged), never the whole repo.
- Don't audit generated files (`out/`, `.next/`, `public/cv-*.pdf`, `tests/visual/baselines/`, `package-lock.json`).
- If the user specifies a scope ("audit just the flight page changes"), honor it.
