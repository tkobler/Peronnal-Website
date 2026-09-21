# Sync template with main — Strategy

## Goal
Bring `template`'s code, features, and documentation up to date with `main` (64 commits ahead) — the animated-canvas background, floating contact button, project taxonomy, and data schema all drifted out of sync — while keeping `template`'s actual content (bio, projects, CV) generic and placeholder, never Tim's real personal data.

## Visitor value
The visitor here is a future template user cloning this repo to build their own portfolio. They need working, current code (not a stale architecture) and documentation that describes what's actually in the repo, not a deleted subsystem.

## Scope

### In scope
- Port the `GlobalTopoBackground`/`contours.ts`/`trailPath.ts` static background system, replacing the deleted `DotPattern`/`Schematic` canvas.
- Add `ContactFab.tsx` (site-wide floating contact button).
- Migrate data schema: project-domain taxonomy rename, `ProjectDocument`/`link`/`sourceLink` fields, `ExperienceCategory` enum change (add education/volunteering, drop music), `courses.ts` `professor` field removal.
- Drop the redundant 4th home card (project spotlight), matching main — 3 cards.
- Genericize hardcoded personal strings (name, email, socials, CV filenames, metadata) picked up incidentally while porting the files that contain them.
- Rewrite ~15 documentation files that still describe the deleted `DotPattern`/`Schematic`/`flight` systems.
- Bring over new template-appropriate docs/skills already written generically on `main`: `MAINTAINING.md`, `public/cv/README.md`, `add-project`/`add-activity` skills, `.vscode/settings.json`.
- Restructure `public/cv/` to match main's path convention.

### Out of scope
- `main`'s real personal content: real project descriptions, real bio, real CV, real photos, real employer names.
- `DIAGNOSTIC-DEPLOIEMENT.md` (Tim's personal debugging notes).
- The Typst CV pipeline (`cv/`) — untouched.
- Parking `/hobby` into an About "Beyond Engineering" section.

### Non-goals
- Making `template` byte-identical to `main`. Template deliberately diverges where main's choices are personal-narrative rather than structural (see `/hobby` below).
- Adding new features beyond what main already built.

## Approach
Never merge or cherry-pick from `main` — the branches have diverged in both directions and nearly every file mixes structural changes with Tim's real content, which a merge tool can't distinguish. Instead: `git checkout main -- <path>` for files confirmed to carry zero personal content (new standalone modules, generic docs, tests), and hand-edit everything else against a saved `git show main:<path>` reference, diffed rather than retyped. Schema/type changes land first so `tsc --noEmit` surfaces every consuming file that needs updating; documentation is rewritten last, once the code it describes is final. Full detail in the approved plan at `/Users/tk/.claude/plans/my-main-branch-is-foamy-lollipop.md`.

## Risks
- Translation EN/FR parity drifting during the multi-field rename — mitigated by editing both locales for the same field in the same step, then `npm run validate:i18n`.
- Accidentally porting a hardcoded personal string (name/email/photo) buried in an otherwise-generic file — mitigated by the explicit file list in the plan and a final grep pass for "Tim"/"Kobler"/"timkobler" before opening the PR.
- Doc rewrite is large (~15 files) and could drift from what the code actually does if written before the code is final — mitigated by doing docs last.
- Deleting `DotPattern.tsx`/`Schematic` and adding `ContactFab` were flagged by tech-lead as two unrelated changes — kept as separate verified checkpoints (5a/5b) rather than one bundled step.

## Tradeoffs
- Diverging from main on `/hobby` (keeping it live vs. parking it) means the template's About page and translations do NOT get main's GPA-card removal / Beyond Engineering restructuring. Rejected alternative: mirror main exactly — rejected because pm's review found the parked-page teaching value (a template's only example of adding a new top-level page) worth more than matching main 1:1.
- Doing docs in the same PR as the code (not a separate `doc/` branch) — rejected the cleaner separation in favor of never shipping template with new code and stale docs, even temporarily.

## Test plan
`npx tsc --noEmit` after every step; full `npm run build` after the canvas swap (5a/5b), after string genericization (step 6), and at the end. `npm run lint`, `npm run test:unit`, `npm run validate:i18n` before PR. `npm run test:e2e:tier1` (nav/project-cards changed). Manual click-through of every page. `/merge-check` before opening the PR.

## Panel input (from Phase 1)
- **pm**: agrees with dropping to 3 home cards, but for a different reason than "matches main" (the 4th card was redundant with the Projects page nav — that's the real justification, not mirroring main for its own sake). Disagreed with parking `/hobby` — sided with keeping it live as a template teaching pattern. Flagged that bundling all three new project fields (`documents`/`link`/`sourceLink`) onto one example project under-demonstrates the schema — spread them across separate examples instead.
- **tech-lead**: approved the "checkout for generic files, hand-edit-against-diff for mixed files, never merge" git strategy, with one refinement (diff the saved reference against template's copy rather than reading-and-retyping, to avoid silently dropped hunks). Flagged that deleting `DotPattern`/`Schematic` and adding `ContactFab` are unrelated changes that shouldn't share one verification checkpoint. Recommended `tsc --noEmit` after every step instead of a full build, reserving full builds for natural checkpoints. Recommended scripting the taxonomy rename rather than hand-typing it in N places.
- **Conflicts surfaced**: pm vs. the plan's original "mirror main" instinct on `/hobby` — resolved by asking the user directly, who chose to keep `/hobby` live (diverging from main).
