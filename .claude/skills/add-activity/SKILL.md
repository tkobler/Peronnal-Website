---
name: add-activity
description: Draft a new bilingual activity/experience entry from a local folder or file (job description, internship report, volunteering write-up, notes), confirm it with the user, then write it to the site's experience data and open a PR. Invoke when the user wants to add work experience, an internship, teaching, volunteering, music, or another activity to the Experience/Activities page, or says "/add-activity".
allowed-tools: Read, Grep, Glob, Write, Edit, Bash(git status:*), Bash(git checkout:*), Bash(git pull:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(cp:*), Bash(mkdir:*), Bash(sips:*), Bash(npm run:*), Bash(gh pr create:*)
---

# add-activity

Turn a local folder or file of activity material (a job description, an
internship report, a volunteering write-up, a certificate, notes) into a
complete, bilingual entry on the Experience page — drafted by Claude,
confirmed by the user, then written to disk and opened as a PR.

This is the sibling of `/add-project`, adapted for the timeline on
`/experience` (labeled "Activities" / "Activités" in the nav) instead of the
projects grid. Like `/add-project`, this is a deliberate, narrow exception to
the read-only-skill default — see "What this skill does NOT do" below.

## Data shape — read this before drafting

An activity is split across three files that must all agree on the same
`id`:

- **`src/data/experience.ts`** — the structural `ExperienceNode`: `id`,
  `company`, `location`, `category`, optional `logo`, and `roles[]` (each a
  `title`, `period`, `type`, `description[]`). The text fields here
  (`company`, `location`, `title`, `period`, `description`) double as the
  English fallback `ExperienceTimeline.tsx` renders if a translation entry is
  missing — but they are not a substitute for step 6's translation writes.
- **`src/data/translations/en/experience.ts`** — `experienceData["<id>"]`,
  the actual English copy shown on the EN site: `company`, `location`,
  `roles[{ title, period, description }]`.
- **`src/data/translations/fr/experience.ts`** — the French mirror of the
  same shape, same key.

`category` (`"engineering" | "music" | "service"`) and each role's `type`
(`"Full-time" | "Part-time" | "Freelance" | "Internship" | "Academic" |
"Volunteering"`) are structural enums — they live only in `experience.ts`,
never in the translation files, and only drive the timeline's node color
(`category`) and internal metadata (`type`); neither is rendered as text.
Unlike projects, there is no `number` field and no `homeCards.ts` link to
manage — the home page links to `/experience` as a whole, not to individual
entries.

## What to do

1. **Resolve the input.**
   - Accept a folder or a single file path from the user (e.g.
     `/add-activity ~/Desktop/epfl-ta-notes/`).
   - If the path doesn't exist, stop and ask for a valid one — don't guess a
     nearby path.

2. **Analyze the input and draft every field**, for both `ExperienceNode`
   and `ExperienceEntryTranslation`:
   - **Single file**: treat its content as the sole source.
   - **Folder**: look in this priority order —
     - `README*`, `NOTES*`, `*.md`, `*.txt`, offer letters, reports,
       certificates — primary source for `company`, `location`, role
       `title`, `period`, and `description[]`.
     - Image files (`.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`) — candidates
       for `logo` (an org/team logo, not a gallery — the timeline only shows
       one small logo per entry, unlike a project's image gallery).
   - Write `description[]` bullets in the voice of the two existing examples
     in `src/data/experience.ts` (concrete, one to two sentences each, what
     you did and why it mattered, no marketing fluff).
   - `id`: slugify the company/organization name (kebab-case). Read
     `src/data/experience.ts`'s `experiences` array and check for a
     collision — if one exists, propose a disambiguated id instead of
     silently overwriting.
   - Default to **one role** per entry unless the source material clearly
     describes distinct roles or a promotion at the same organization (e.g.
     "TA in 2024, then Head TA in 2025") — confirm the split with the user
     in step 3 rather than assuming it.

3. **Ask the user only what the material can't tell you.** Batch these into
   as few `AskUserQuestion` calls as possible:
   - `category` — must be one of `"engineering"`, `"music"`, `"service"`.
     Offer your best inferred guess as one option alongside the other two.
   - `type` per role — one of `"Full-time"`, `"Part-time"`, `"Freelance"`,
     `"Internship"`, `"Academic"`, `"Volunteering"`. Offer your best guess
     alongside the remaining options.
   - Whether the source describes more than one role at the same
     organization and should be split into multiple `roles[]` entries —
     only if step 2 flagged this as ambiguous.
   - `period` phrasing, if the material doesn't state it in the site's style
     (`"Summer 2025"`, `"2024 – 2025"`).
   - Whether to include a logo — if no image was found, default to the
     shared placeholder rather than asking; if one was found, confirm it's
     the right one.

4. **Draft the French translation yourself.** Translate the confirmed EN
   content into the FR voice/register already used in
   `src/data/translations/fr/experience.ts` (formal French, same structure).
   Do not ask the user to hand-write the French entry — the point of this
   skill is guaranteeing both locale files stay in sync, since
   `ExperienceTimeline.tsx` silently falls back to the English text baked
   into `experience.ts` if the FR entry is missing or incomplete.

5. **Show the full draft and stop.** Print every field, EN and FR grouped
   together per field, e.g.:

   ```
   ## Draft: <id>

   category: engineering   logo: /images/placeholders/logo.svg (placeholder — no logo found)

   EN
     company: ...           location: ...
     role 1 — title: ...    period: ...    type: Internship
       description:
         - ...
         - ...

   FR
     company: ...           location: ...
     role 1 — title: ...    period: ...
       description:
         - ...
         - ...
   ```

   End with: "Confirm as-is, or tell me what to change (any field, either
   language)." **Do not write anything to disk until the user explicitly
   confirms.** After an edit round, re-show only the changed fields, not the
   whole draft again.

6. **On confirmation**, create the branch and write files in this order:
   ```bash
   git checkout main && git pull
   git checkout -b dev/add-activity-<id>
   ```
   - If the input had a logo image: `mkdir -p public/images/experience/<id>`
     then `cp` it in as `logo.<ext>`. Reference it as
     `/images/experience/<id>/logo.<ext>`. If the source image is unusually
     large (>2MB) and `sips` is available (macOS only), offer — don't
     silently — to downscale with `sips -Z 200 <file>` before copying (a
     40×40 rendered logo doesn't need a multi-megabyte source).
   - If the input had **no** logo: leave `logo` as
     `"/images/placeholders/logo.svg"` (today's shared fallback, already
     used by both example entries). Never fabricate or fetch a logo.
   - `Edit src/data/experience.ts` — append the new `ExperienceNode` to the
     `experiences` array, matching the existing entries' field order and
     style.
   - `Edit src/data/translations/en/experience.ts` **and**
     `src/data/translations/fr/experience.ts` in the same turn — add
     `experienceData["<id>"]` to both. Never write one without the other.

7. **Validate — all must pass before proposing the commit:**
   ```bash
   npm run lint
   npm run test:unit
   npm run validate:i18n
   ```
   There's no dedicated Playwright tier for the Experience page (tier1 covers
   navigation, language, and project cards only), so spot-check
   `npm run dev` → `/experience` in both locales before proposing the
   commit.

8. **Commit, push, open a PR, and stop.**
   ```bash
   git add src/data/experience.ts \
           src/data/translations/en/experience.ts \
           src/data/translations/fr/experience.ts \
           public/images/experience/<id>/   # only if created
   git commit -m "add activity: <company> — <role title>"
   git push -u origin dev/add-activity-<id>
   gh pr create --title "Add activity: <company>" --body "..."
   ```
   The PR body should summarize the activity (organization, category, role(s),
   EN+FR), state the logo status (copied / using shared placeholder), and
   list which validation commands were run. **Stop after `gh pr create`
   returns the URL** — never merge; the PR is the pause point for the site
   owner.

## Why this uses the `dev/` prefix without a Phase-1 panel

`docs/workflow.md` normally requires a `pm`/`tech-lead` Phase-1 discovery
panel before any `dev/` branch, with an explicit exception for "an
already-reviewed content-authoring skill (e.g. `.claude/skills/add-project/`)".
This skill is the same kind of exception: it produces a scoped, reviewable
content change, and its own clarifying-questions step (3) plus mandatory
full-draft confirmation (5) serve as that gate.

## What this skill does NOT do

- Does not edit or delete existing activities — add-only. If the resolved
  `id` already exists, stop and ask instead of overwriting.
- Does not run the `pm`/`tech-lead` Phase-1 panel or write
  `STRATEGY.md`/`TRACKING.md` for the resulting `dev/` branch.
- Does not run a content-quality reviewer pass. One draft, shown once — the
  user edits by hand or asks for a rewrite directly.
- Does not touch `src/data/homeCards.ts` — the home page links to
  `/experience` as a page, not to individual entries, so there's nothing to
  opt into there.
- Does not merge the PR or push to `main`.
- Does not fabricate employers, dates, locations, or outcomes it cannot
  infer from the supplied input.

## Fallback

If the input path is missing, empty, or has no usable text (no description,
no notes — just, say, a folder of unlabeled photos), don't guess a company
name or role out of thin air. Ask the user directly for the organization
name, role title, and a one-paragraph summary before drafting the rest.
