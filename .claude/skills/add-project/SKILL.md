---
name: add-project
description: Draft a new bilingual project entry from a local folder or file (README, images, code, notes), confirm it with the user, then write it to the site's project data and open a PR. Invoke when the user wants to add a portfolio project, or says "/add-project".
allowed-tools: Read, Grep, Glob, Write, Edit, Bash(git status:*), Bash(git checkout:*), Bash(git pull:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(cp:*), Bash(mkdir:*), Bash(sips:*), Bash(npm run:*), Bash(gh pr create:*)
---

# add-project

Turn a local folder of project material (README, code, images, notes) into a
complete, bilingual project entry on the site — drafted by Claude, confirmed
by the user, then written to disk and opened as a PR.

This is the one skill in this repo that writes files and commits. Every other
skill (`/audit`, `/merge-check`, `/cv-pipeline`) is read-only by design; this
one is a deliberate, narrow exception — see "What this skill does NOT do"
below for the guardrails that keep it that way.

## What to do

1. **Resolve the input.**
   - Accept a folder or a single file path from the user (e.g.
     `/add-project ~/Desktop/mesh-relay-notes/`).
   - If the path doesn't exist, stop and ask for a valid one — don't guess a
     nearby path.

2. **Analyze the input and draft every field**, for both `Project`
   (`src/data/projects.ts`) and `ProjectContentTranslation`
   (`src/data/translations/{en,fr}/projects.ts`):
   - **Single file**: treat its content as the sole source.
   - **Folder**: look in this priority order —
     - `README*`, `NOTES*`, `*.md`, `*.txt` — primary source for tagline,
       `descriptor`, and `detail.description.{what,how,why}`.
     - Source/config files (`package.json`, `requirements.txt`,
       `platformio.ini`, source file extensions, imports) — mine for
       `detail.technologies[]`. Read a representative sample, not every
       file — enough to name real technologies confidently, not guess.
     - Image files (`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg`) —
       candidates for `heroImage` and `detail.images[]`. Use filenames for
       ordering/captioning hints.
   - Write description copy in the voice of the four existing examples in
     `src/data/projects.ts` (why → what → how, one to two sentences each,
     concrete and specific, no marketing fluff).
   - `id`: slugify the title (kebab-case). Read `getAllProjects()`'s output
     (or the array in `src/data/projects.ts` directly) and check for a
     collision — if one exists, propose a disambiguated id instead of
     silently overwriting.
   - `number`: compute as the highest existing `number` + 1, zero-padded to
     match the existing two-digit style (`"05"`). Never ask the user for
     this — `tests/unit/projects-data.test.ts` enforces both `id` and
     `number` uniqueness, and a user-chosen number risks a collision.
   - `descriptor`: compose as `"<Domain> · <Academic|Personal|Professional>"`
     once `domain` is confirmed in step 3, matching the existing pattern.

3. **Ask the user only what the folder can't tell you.** Batch these into as
   few `AskUserQuestion` calls as possible, not one round-trip per field:
   - `detail.role` — the job title/role on this project.
   - `detail.duration` — a period string like `"Spring 2025"`.
   - `domain` — must be one of the four `ProjectDomain` literals
     (`"Embedded Systems & Electronics"`, `"Robotics & Autonomous Control"`,
     `"Biomedical & Precision Instrumentation"`, `"Mechanism Design & Fabrication"`).
     Offer your best inferred guess as one option alongside the other three.
   - `detail.keyResults[]` — quantified outcomes. Never invent numbers or
     metrics; offer to skip since this field is optional.
   - `detail.scope` and optional `course` — course project vs. team vs.
     personal; if a course code is given, validate it exists in
     `src/data/courses.ts`.
   - `featured` — whether it should appear in the featured set. Default to
     asking; never silently set `true`.
   - Whether to also add a card to `src/data/homeCards.ts` or link
     `Course.projectId` in `src/data/courses.ts` — only touch either file if
     the user opts in here.
   - Optional fields (`detail.methodology`, `detail.challenges[]`,
     `detail.publication`) — ask once whether to include them; skip silently
     if declined.

4. **Draft the French translation yourself.** Translate the confirmed EN
   content into the FR voice/register already used in
   `src/data/translations/fr/projects.ts` (formal French, same structure).
   Do not ask the user to hand-write the French entry — this skill exists
   specifically to guarantee both locale files stay in sync, since
   `ProjectDetailPage.tsx` silently falls back to English if the FR entry is
   missing, and `npm run validate:i18n` only diffs key sets — it does not
   notice a whole project id missing from one locale.

5. **Show the full draft and stop.** Print every field, EN and FR grouped
   together per field, plus the resolved `id`/`number`/`heroImage`, e.g.:

   ```
   ## Draft: <id> (number 05)

   domain: Embedded Systems & Electronics   featured: false   course: (none)
   heroImage: /images/projects/<id>/hero.jpg   (or: placeholder — no images found)

   EN
     title: ...
     tagline: ...
     descriptor: ...
     role: ...        duration: ...       scope: ...
     technologies: [...]
     keyResults: [...]  (or: none)
     description.why: ...
     description.what: ...
     description.how: ...

   FR
     title: ...
     ... (mirrored)

   images:
     - hero.jpg — alt: "..."
     - 01-setup.jpg — alt: "..." caption: "..." section: "how"
   ```

   End with: "Confirm as-is, or tell me what to change (any field, either
   language)." **Do not write anything to disk until the user explicitly
   confirms.** After an edit round, re-show only the changed fields, not the
   whole draft again.

6. **On confirmation**, create the branch and write files in this order:
   ```bash
   git checkout main && git pull
   git checkout -b dev/add-project-<id>
   ```
   - If the input had images: `mkdir -p public/images/projects/<id>` then
     `cp` each into it — hero image as `hero.<ext>`, gallery images as
     `<NN>-<slug>.<ext>` (zero-padded order prefix, slug from filename or
     caption). Reference them as `/images/projects/<id>/...` (satisfies the
     `heroImage` path check in `tests/unit/projects-data.test.ts`). If a
     source image is unusually large (>2MB) and `sips` is available (macOS
     only), offer — don't silently — to downscale with `sips -Z 1600 <file>`
     before copying.
   - If the input had **no** images: leave `heroImage` as
     `"/images/placeholders/wide.svg"` (today's shared fallback) and omit
     `detail.images[]`. Never fabricate or fetch images. Flag this clearly
     in both the draft (step 5) and the PR description.
   - `Edit src/data/projects.ts` — append the new `Project` object to the
     array, matching the existing entries' field order and style.
   - `Edit src/data/translations/en/projects.ts` **and**
     `src/data/translations/fr/projects.ts` in the same turn — add
     `projectsContent["<id>"]` to both. Never write one without the other.
   - Only if opted into in step 3: `Edit src/data/homeCards.ts` and/or
     `src/data/courses.ts`.

7. **Validate — all must pass before proposing the commit:**
   ```bash
   npm run lint
   npm run test:unit        # covers tests/unit/projects-data.test.ts
   npm run validate:i18n
   ```
   `npm run test:e2e:tier1` (exercises `project-cards.spec.ts`) is
   recommended but not blocking — run it if time allows, note in the PR if
   skipped.

8. **Commit, push, open a PR, and stop.**
   ```bash
   git add src/data/projects.ts \
           src/data/translations/en/projects.ts \
           src/data/translations/fr/projects.ts \
           public/images/projects/<id>/   # only if created
           # + homeCards.ts / courses.ts only if touched
   git commit -m "add project: <title>"
   git push -u origin dev/add-project-<id>
   gh pr create --title "Add project: <title>" --body "..."
   ```
   The PR body should summarize the project (name, domain, EN+FR), state the
   image status (copied N images / using shared placeholder), and list which
   validation commands were run. **Stop after `gh pr create` returns the
   URL** — never merge; the PR is the pause point for the site owner.

## Why this uses the `dev/` prefix without a Phase‑1 panel

`docs/workflow.md` normally requires a `pm`/`tech-lead` Phase‑1 discovery
panel before any `dev/` branch. This skill is the documented exception: it
produces a scoped, reviewable content change, and its own clarifying-questions
step (3) plus mandatory full-draft confirmation (5) serve as that gate. See
the short addendum in `docs/workflow.md`'s `dev/` section.

## What this skill does NOT do

- Does not edit or delete existing projects — add-only. If the resolved `id`
  already exists, stop and ask instead of overwriting.
- Does not run the `pm`/`tech-lead` Phase‑1 panel or write
  `STRATEGY.md`/`TRACKING.md` for the resulting `dev/` branch.
- Does not run a content-quality reviewer pass (no `cv-pipeline`-style agent
  chain). One draft, shown once — the user edits by hand or asks for a
  rewrite directly.
- Does not touch `src/data/homeCards.ts` or `src/data/courses.ts` unless the
  user explicitly opts in during step 3.
- Does not merge the PR or push to `main`.
- Does not fabricate images, key results, or metrics it cannot infer from the
  supplied input.

## Fallback

If the input path is missing, empty, or has no usable text (no README, no
code, no notes — just, say, a folder of unlabeled images), don't guess a
title or description out of thin air. Ask the user directly for the project
name and a one-paragraph summary before drafting the rest.
