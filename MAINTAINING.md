# Maintaining your site

You've finished [SETUP.md](./SETUP.md) and your site is live. This guide covers what comes after: the ongoing work of keeping content current — adding a project, tweaking copy, refreshing your CV, deploying a change. SETUP.md is a one-time checklist; this one you'll come back to.

---

## Adding a new project

### If you use Claude Code

Run the `/add-project` skill and point it at a folder or file with your project material (a README, code, images, notes — whatever you've got):

```
/add-project ~/Desktop/my-new-project/
```

Claude reads the material, drafts the full bilingual entry (title, tagline, description, technologies, images), asks you for anything it can't infer (your role, the duration, which domain it fits, key results), shows you the complete draft to review or edit, and — only once you confirm — writes it into the site's data files, copies the images, validates everything, and opens a PR for you to merge.

Full behavior is documented in [.claude/skills/add-project/SKILL.md](.claude/skills/add-project/SKILL.md). It's add-only for now — editing an existing project is still a manual edit (see below).

### Manual method (no Claude Code, or editing an existing project)

A project lives in three files that must be edited together:

1. **[src/data/projects.ts](src/data/projects.ts)** — add a new object to the `projects` array. Needs a unique `id` (kebab-case) and a unique `number` (next in sequence, zero-padded — e.g. `"05"`). `domain` must be one of the four `ProjectDomain` values already used in the file.
2. **[src/data/translations/en/projects.ts](src/data/translations/en/projects.ts)** — add a matching entry to `projectsContent` keyed by the same `id`.
3. **[src/data/translations/fr/projects.ts](src/data/translations/fr/projects.ts)** — add the French version of the same entry.

Skipping step 3 doesn't fail CI — `npm run validate:i18n` only checks that translation *keys* match between locales, not that every project id has a French entry. If you forget it, the project silently falls back to English on the French site. Always add both in the same change.

If you have images for the project, drop them in `public/images/projects/<id>/` and reference them from `heroImage` / `detail.images[]`. No images yet? Leave `heroImage` as `/images/placeholders/wide.svg` and add real ones later.

Then verify:
```bash
npm run lint
npm run test:unit        # catches a colliding id/number or a bad heroImage path
npm run validate:i18n
```

---

## Adding a new activity

### If you use Claude Code

Run the `/add-activity` skill and point it at a folder or file with the material (a job description, an internship report, a volunteering write-up, notes — whatever you've got):

```
/add-activity ~/Desktop/epfl-ta-notes/
```

Claude reads the material, drafts the full bilingual entry (organization, location, role, period, description bullets), asks you for anything it can't infer (category, role type, whether to split into multiple roles), shows you the complete draft to review or edit, and — only once you confirm — writes it into the site's experience data, validates everything, and opens a PR for you to merge.

Full behavior is documented in [.claude/skills/add-activity/SKILL.md](.claude/skills/add-activity/SKILL.md). It's add-only for now — editing an existing activity is still a manual edit (see below).

### Manual method (no Claude Code, or editing an existing activity)

An activity lives in three files that must be edited together:

1. **[src/data/experience.ts](src/data/experience.ts)** — add a new object to the `experiences` array. Needs a unique `id` (kebab-case). `category` must be one of `"engineering"`, `"music"`, or `"service"`; each role's `type` must be one of `"Full-time"`, `"Part-time"`, `"Freelance"`, `"Internship"`, `"Academic"`, or `"Volunteering"`.
2. **[src/data/translations/en/experience.ts](src/data/translations/en/experience.ts)** — add a matching entry to `experienceData` keyed by the same `id`.
3. **[src/data/translations/fr/experience.ts](src/data/translations/fr/experience.ts)** — add the French version of the same entry.

`ExperienceTimeline.tsx` falls back to the English text baked into `experience.ts` if a locale's entry is missing, so a forgotten French entry fails silently on the French site rather than breaking the build. Always add both in the same change.

If you have a logo for the organization, drop it in `public/images/experience/<id>/logo.<ext>` and reference it from `logo`. No logo yet? Leave it as `/images/placeholders/logo.svg` and add the real one later.

Then verify:
```bash
npm run lint
npm run test:unit
npm run validate:i18n
```

---

## Editing existing content

Everything user-facing lives in [src/data/translations/{en,fr}/](src/data/translations/) as plain TypeScript objects — no CMS, no database. Find the section you want (`hero.ts`, `about.ts`, `experience.ts`, `contact.ts`, `projects.ts`, etc.) and edit the string directly in both locales.

**Quick edits from a browser**: the `/admin` route (if you kept it — see [SETUP.md §7](./SETUP.md#7-admin-panel-optional)) is a localhost-only editor for retexting existing strings side-by-side in EN/FR, and commits straight to `main` via the GitHub API. It's handy for a typo or a sentence rewrite. It can't add new structured content like a project — for that, use the methods above. It only activates on `localhost`/`127.0.0.1`; it does nothing on your deployed site.

**Everything else**: edit the `.ts` files directly in your editor. Simple, versioned, no special tooling required.

---

## Images

Replace or add files under [public/images/](public/images/) (see [SETUP.md §2.3](./SETUP.md#23-images) for the full folder layout). The site serves images unoptimized (`images.unoptimized: true`), so compress before committing — [scripts/compress-images.js](scripts/compress-images.js) can do this for you.

---

## Keeping EN/FR in sync

Run this after touching either locale's translation files:
```bash
npm run validate:i18n
```
It catches a key present in one locale but missing in the other. It will **not** catch a whole project id missing from one locale's `projectsContent` (see the note above) — that's on you (or the `/add-project` skill, which always writes both).

---

## Updating your CV

The CV is a separate Typst pipeline in [cv/](cv/), not wired into the main build. After changing your experience, education, or skills:
```bash
npm run cv:build
```
This compiles [cv/variants/](cv/variants/) and drops fresh PDFs at `public/cv-en.pdf` and `public/cv-fr.pdf`. These are gitignored build artifacts — CI does not regenerate them, so rebuild locally before pushing if you want the updated PDFs live. See [SETUP.md §6](./SETUP.md#6-cv-pipeline-optional) for the full pipeline and [.claude/docs/](./.claude/docs/) for the `typst-eng` agent if you use Claude Code.

---

## Before you push

```bash
npm run lint
npm run test:unit
npm run validate:i18n    # if you touched any translation file
npm run dev              # spot-check the change in a browser
```

If you changed routing, navigation, or project cards, also run:
```bash
npm run test:e2e:tier1
```
See [.claude/docs/testing-strategy.md](.claude/docs/testing-strategy.md) for the full tier breakdown — tiers 2–4 are pre-merge gates, not something to run on every edit.

---

## Branch and PR workflow

**If you use Claude Code**, every change goes through a branch and a PR — this is enforced by a hook and described in full in [.claude/docs/workflow.md](.claude/docs/workflow.md). The short version: pick a prefix (`dev/` for features, `bug/` for fixes, `doc/` for docs, `claude/` for `.claude/` changes), branch off `main`, do the work, open a PR, and merge yourself once you're happy — Claude stops at the PR and never merges on its own.

**If you're editing by hand**, you don't need that ceremony, but the underlying discipline is worth keeping regardless: don't push straight to `main` on a whim, let CI run (`lint` → `test:unit` → `validate:i18n` → `build`) on a PR before merging, and keep unrelated changes in separate commits so a bad one is easy to revert.

---

## Deployment

Every push to `main` (including a merged PR) triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml): `lint` → `test:unit` → `validate:i18n` → `build` → publish to GitHub Pages. Any failing check blocks the deploy — nothing broken reaches production automatically. Watch the **Actions** tab on GitHub if a push doesn't show up on the live site within a few minutes.

---

## Quick reference

| I want to... | Do this |
|---|---|
| Add a new project | `/add-project <folder>` (Claude Code), or edit the 3 files under [Adding a new project](#adding-a-new-project) |
| Add a new activity | `/add-activity <folder>` (Claude Code), or edit the 3 files under [Adding a new activity](#adding-a-new-activity) |
| Fix a typo or reword a sentence | Edit the relevant `translations/{en,fr}/*.ts` file, or use `/admin` locally |
| Add/replace an image | Drop it in `public/images/...`, compress with `scripts/compress-images.js` |
| Update my CV | Edit [cv/variants/](cv/variants/), then `npm run cv:build` |
| Check EN/FR are still in sync | `npm run validate:i18n` |
| Ship a change | `npm run lint && npm run test:unit && npm run validate:i18n`, then push/PR to `main` |
