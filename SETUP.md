# Setup — using this repo as a template

You've cloned this repo to build your own portfolio. This guide is the **specific list of things to change** before you start modifying stuff or deploying. It assumes you already know Next.js, React, TypeScript, and Tailwind — it's not a framework tutorial.

Work through the sections in order. Every section has a clear "done when" criterion. The whole initial setup should take **30–90 minutes** depending on how much content you already have ready.

---

## 0. Prerequisites

- **Node 20 or newer** — CI pins to 20, don't use 16 or 18
- **npm** — this repo uses `package-lock.json`. Do not switch to pnpm/yarn without converting the lockfile
- **git**
- **Optional — `typst` CLI**: only required if you want to use the built-in [CV pipeline](#6-cv-pipeline-optional) to compile PDFs from Typst sources. Install with `brew install typst` on macOS, or see [typst.app](https://typst.app) for other platforms.

Check:
```bash
node --version   # should print v20.x or higher
npm --version
```

---

## 1. Fork and clone

1. Fork this repo to your own GitHub account, OR clone it and push to a new repo of yours:
   ```bash
   git clone https://github.com/ccka/Personnal-Website.git my-portfolio
   cd my-portfolio
   rm -rf .git
   git init && git add . && git commit -m "initial import"
   git remote add origin https://github.com/<you>/<your-repo>.git
   git push -u origin main
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Run the dev server to verify the base site works before you change anything:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 — you should see Clément's portfolio. Stop the server with Ctrl-C.

**Done when**: the unmodified site runs locally at localhost:3000.

---

## 2. Strip or replace personal content

This is the bulk of the work. Everything in [src/data/](src/data/) is hardcoded TypeScript — no CMS, no database. Edit the files directly.

### 2.1 Project data

Edit **[src/data/projects.ts](src/data/projects.ts)** — this is the source of truth for the portfolio. Each project has:
- `id` (stable, used in URLs and translation keys)
- `title`, `domain`, `number`, images
- A `schematic` field describing the canvas animation for that project (see [.claude/docs/glossary.md](.claude/docs/glossary.md) under "Schematic")

You can:
- Replace projects one-for-one with your own
- Reduce the count (smaller portfolio is fine)
- Remove the `schematic` field entirely if you don't want canvas animations — see [src/components/layout/DotPattern.tsx](src/components/layout/DotPattern.tsx) for what breaks if you do

Also edit:
- **[src/data/project_details.ts](src/data/project_details.ts)** — extended descriptions per project
- **[src/data/homeCards.ts](src/data/homeCards.ts)** — the 5 cards on the home page
- **[src/data/experience.ts](src/data/experience.ts)** — work experience timeline
- **[src/data/courses.ts](src/data/courses.ts)** — EPFL coursework grid. **Delete or replace** if you're not a student, or not at EPFL.
- **[src/data/flightLog.ts](src/data/flightLog.ts)** — flight log data. **Delete this file AND the [/flight route](src/app/flight/)** if you're not a pilot. See section 2.5.

### 2.2 Translations

[src/data/translations/](src/data/translations/) holds all user-facing strings in EN and FR, organized by section.

**If you want bilingual (EN + FR)**: edit both `en/*.ts` and `fr/*.ts` files to replace every string. They must stay in key parity — run `npm run validate:i18n` to check.

**If you want single-language**: this is a bigger change. The [LanguageContext](src/context/LanguageContext.tsx), the inline locale bootstrap script in [src/app/layout.tsx](src/app/layout.tsx), and the locale toggle button in [src/components/layout/Navigation.tsx](src/components/layout/Navigation.tsx) all assume two locales. Options:
- **Easier**: keep the two-locale infrastructure but make `fr/` identical to `en/`, and hide the locale toggle button. Quick and dirty but wastes files.
- **Cleaner**: rip out the locale toggle, remove `fr/`, simplify `LanguageContext` to a single locale, delete the bootstrap script. ~1–2 hours of focused work.

Pick whichever you prefer. If in doubt, start with "Easier" and clean up later.

### 2.3 Images

Replace images in [public/images/](public/images/):
- **[profile/](public/images/profile/)** — your profile picture (referenced by [HeroSection.tsx](src/components/home/HeroSection.tsx))
- **[projects/](public/images/projects/)** — project hero images (referenced by project `id` in `projects.ts`)
- **[home/](public/images/home/)** — home card visuals
- **[domains/](public/images/domains/)** — domain category images (used in the "by domain" view)
- **[logos/](public/images/logos/)** — company logos for experience entries
- **[flight/](public/images/flight/)** — flight log imagery. **Delete** if you removed the flight page.

Also replace **[src/app/favicon.ico](src/app/favicon.ico)** (Next.js 13+ keeps the favicon under `src/app/`, not `public/`) and any `apple-icon.*` / `icon.*` files in the same directory. The site is a static export with `images.unoptimized: true`, so all images are served as-is — compress before committing. There's a [scripts/compress-images.js](scripts/compress-images.js) helper if you want automated compression.

### 2.4 Bio, hero, and metadata

- **[src/app/layout.tsx](src/app/layout.tsx)** — root metadata: `title`, `description`, OG tags, Twitter card, structured data. Replace "Clément Chalut" everywhere. Also review the inline `<script>` that seeds `window.__LOCALE__` — keep it if you're keeping i18n, remove if you went single-locale.
- **[src/data/translations/en/hero.ts](src/data/translations/en/hero.ts)** and `fr/hero.ts` — hero greeting, tagline, CTA
- **[src/data/translations/en/about.ts](src/data/translations/en/about.ts)** — about page copy
- **[src/data/translations/en/contact.ts](src/data/translations/en/contact.ts)** — contact info, email, links. Also check [src/app/contact/](src/app/contact/) for hardcoded links.

### 2.5 Remove pages you don't need

Each top-level route lives in [src/app/\<route>/](src/app/):
- `flight/` — pilot dashboard. If you're not a pilot, delete the folder, delete `src/components/flight/`, delete `src/data/flightLog.ts`, remove references from `homeCards.ts` and navigation.
- `admin/` — content editor panel. Safe to keep idle (it only activates on localhost + env token), or delete the folder and `src/context/AdminContext.tsx` + `src/lib/admin/` if you don't want it.
- `about/` — currently a placeholder. Either build it out or leave as-is.

After deleting a page, run `npm run dev` and click through every nav link to catch broken references.

**Done when**: the site runs locally with your content, your images, and the routes you want. No "Clément Chalut" or "EPFL" leftovers (`grep -ri "clément\|EPFL" src/ public/`).

---

## 3. Branding (colors, fonts, design tokens)

The design system lives as CSS variables in **[src/app/globals.css](src/app/globals.css)**. This is where you change colors, fonts, spacing, and typography — **not** in Tailwind config and **not** inline in components.

Key token groups to review:
- Font families (`--font-display`, `--font-body`, `--font-mono`)
- Color palette (light and dark theme variants)
- Spacing scale (`--space-xs` through `--space-xl`)
- Z-index scale (`--z-hero-content`, `--z-menu-panel`, etc.)
- Container max-width and padding

If you change tokens significantly, the visual regression tests will fail until you update baselines:
```bash
npm run test:visual:update
```

Don't invent new arbitrary Tailwind values (`w-[173px]`, `text-[17px]`) — if you need a value twice, promote it to a token.

**Done when**: the colors, fonts, and overall look match your preference, and `npm run dev` shows the site without layout glitches.

---

## 4. SEO and hosting configuration

### 4.1 Custom domain

- **[public/CNAME](public/CNAME)** — replace with your custom domain, OR delete if you'll use the default `<user>.github.io/<repo>` URL.
- **[public/sitemap.xml](public/sitemap.xml)** — update every `<loc>` URL to your domain.
- **[public/robots.txt](public/robots.txt)** — update `Sitemap:` to your domain.
- **[public/BingSiteAuth.xml](public/BingSiteAuth.xml)** — delete this file unless you're going to register the site with Bing Webmaster Tools yourself (it's tied to Clément's Bing account).

### 4.2 GitHub Pages configuration

In your repo on GitHub:
1. **Settings → Pages**
2. Source: **GitHub Actions**
3. The [deploy.yml](.github/workflows/deploy.yml) workflow will run on every push to `main`:
   ```
   npm ci → npm run lint → npm run test:unit → npm run validate:i18n → npm run build → upload to Pages
   ```
   Any failure blocks the deploy.
4. If using a custom domain, set it under **Settings → Pages → Custom domain** and verify the DNS record.

**Done when**: pushing to `main` triggers the workflow, it passes, and your domain (or GitHub default URL) serves the site.

---

## 5. Development workflow

Once setup is done, the routine is:

```bash
npm run dev              # localhost:3000 with hot reload
npm run lint             # ESLint clean
npm run test:unit        # Vitest, ~1s
npm run validate:i18n    # EN/FR key parity (skip if single-locale)
npm run build            # production static export to out/
```

E2E tests are tiered (run the tier matching your change):

```bash
npm run test:e2e:tier1   # navigation + language + project cards (fast)
npm run test:e2e:tier2   # responsive matrix across 8 device profiles (slow)
npm run test:e2e:tier3   # canvas performance (for DotPattern changes)
npm run test:e2e:tier4   # accessibility (axe-core)
```

See [.claude/docs/testing-strategy.md](.claude/docs/testing-strategy.md) for the full tier mapping and when to run what.

**Tiers 2/3/4 are pre-merge gates, not per-edit loops.** Running tier2 on every save is 768 tests.

---

## 6. CV pipeline (optional)

The repo ships with a Typst-based CV pipeline in [cv/](cv/) that compiles PDFs and drops them into [public/](public/). If you don't want it, skip this section entirely and delete `cv/` plus the `npm run cv:build` script from [package.json](package.json).

If you want to use it:

1. **Install typst**: `brew install typst` (macOS) or see [typst.app](https://typst.app).
2. **Replace content** in [cv/data/](cv/data/): education, experience, skills — all structured Typst modules. Preserve the module structure; replace the values.
3. **Review template** in [cv/template/](cv/template/): the layout functions. Tweak typography and margins here, not inline in variants.
4. **Edit variants** in [cv/variants/](cv/variants/): `generic-en.typ` and `generic-fr.typ` are the main CVs. These are the files that get compiled.
5. **Build**:
   ```bash
   npm run cv:build
   ```
   This runs [cv/build.sh](cv/build.sh), compiles all variants, and copies the PDFs to `public/cv-en.pdf` and `public/cv-fr.pdf`.
6. **Important**: `public/cv-*.pdf` and `cv/output/` are **gitignored**. CI does NOT run `npm run cv:build` — you must either:
   - (a) rebuild PDFs locally before each push, OR
   - (b) remove them from `.gitignore` and commit them as tracked artifacts.

Option (b) is simpler if you update your CV rarely.

---

## 7. Admin panel (optional)

The `/admin` route is a localhost-only content editor that uses the GitHub API to commit changes directly. It's only useful if you want to edit site content from a browser instead of an editor.

If you want it:

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
2. Generate a GitHub personal access token at https://github.com/settings/tokens with `repo` scope.
3. Fill in `.env.local`:
   ```
   NEXT_PUBLIC_GITHUB_TOKEN=ghp_yourtoken
   NEXT_PUBLIC_GITHUB_OWNER=your-username
   NEXT_PUBLIC_GITHUB_REPO=your-repo-name
   ```
4. **Security warning**: `NEXT_PUBLIC_*` environment variables are **bundled into the client JavaScript** by Next.js. If you commit a real PAT anywhere, or deploy with it set, that token is effectively public. The admin panel is designed to run on **localhost only** — the component checks `window.location.hostname === "localhost"` before activating. **Never set `NEXT_PUBLIC_GITHUB_TOKEN` in your deployed environment.** If you don't understand this, delete the admin panel instead.

If you don't want it:
```bash
rm -rf src/app/admin src/context/AdminContext.tsx src/lib/admin
rm .env.local.example
```
Then remove the `/admin` reference from any navigation.

---

## 8. Decide what to do with `.claude/`

This repo ships with a `.claude/` folder containing:
- `CLAUDE.md` — project context for [Claude Code](https://claude.com/claude-code)
- `docs/` — frontend guidelines, coding rules, testing strategy, workflow, etc.
- `agents/` — 20 subagent definitions
- `skills/` — three Claude Code skills (`/audit`, `/merge-check`, `/cv-pipeline`)
- `hooks/block-main-commit.sh` — a safety hook that blocks Claude from committing to main
- `settings.json` — Claude Code permissions and hook registration

**If you use Claude Code**: keep the folder. The docs are specific to this stack and will give Claude useful context about your project. Review [.claude/CLAUDE.md](.claude/CLAUDE.md) and update the author name, project description, and any "Clément"-specific references. The branch-based workflow and the 20-subagent team are defaults you can modify or strip as you prefer.

**If you don't use Claude Code**: delete the folder entirely.
```bash
rm -rf .claude
```
Nothing else in the repo depends on it — no runtime code, no build step, no test. It's purely Claude-side configuration.

---

## 9. What NOT to touch (unless you understand it)

These are load-bearing mechanisms that will break the site if changed carelessly:

- **The `<script>` block in [src/app/layout.tsx](src/app/layout.tsx)** that sets `window.__LOCALE__` before hydration. Removing it causes a flash of wrong language on first load.
- **The `output: "export"` and `images.unoptimized: true` in [next.config.ts](next.config.ts)**. This is a static export — changing these enables features (SSR, image optimization) that GitHub Pages can't serve.
- **The Schematic type and DotPattern renderer**. If you keep the canvas background, the `schematic` field on projects and the renderer in [src/components/layout/DotPattern.tsx](src/components/layout/DotPattern.tsx) are tightly coupled. Update both together or neither.
- **The CI test gate in [deploy.yml](.github/workflows/deploy.yml)**. Removing `npm run lint`, `npm run test:unit`, or `npm run validate:i18n` from the `test` job means you can ship broken code to production.
- **`public/` gitignores for CV PDFs**. If you remove them from `.gitignore` without a plan, you'll commit build artifacts that will drift from source.

---

## Reference documentation

After setup, these are the docs worth knowing about:

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — implementation deep-dive: component internals, CSS catalog, DotPattern canvas system, how-to guides
- **[.claude/docs/project-map.md](.claude/docs/project-map.md)** — architecture overview specifically written for AI assistants, but useful for humans too
- **[.claude/docs/testing-strategy.md](.claude/docs/testing-strategy.md)** — tier system, CI coverage, known gaps
- **[.claude/docs/commands.md](.claude/docs/commands.md)** — canonical npm scripts
- **[.claude/docs/glossary.md](.claude/docs/glossary.md)** — non-obvious terms (Schematic, tier 1–4, etc.)

---

## Troubleshooting

- **`npm run build` fails with an image error**: `images.unoptimized: true` is set, but if you have a stray `next/image` call without `unoptimized`, it can fail. Use `<img>` or pass the prop.
- **Hydration mismatch warning** about locale: the inline script in `layout.tsx` runs before React hydrates. If you changed the script without updating `LanguageContext` initial state, you'll see a mismatch. Keep them in sync.
- **`npm run test:e2e:tier1` says "server not running"**: Playwright starts its own dev server. If another dev server is on port 3000, kill it first.
- **CI fails on `validate:i18n`**: you added a key to `en/` but not `fr/` (or vice versa). Run `npm run validate:i18n` locally to see which key.
- **CI fails on `lint` after your first commit**: you introduced a `react-hooks/set-state-in-effect` or similar. Read the error carefully — the React 19 hooks rules are stricter than React 18.
- **The `/admin` panel does nothing**: by design, it only activates on `localhost` or `127.0.0.1`. Don't expect it to work on your deployed site.

---

## Ready to build

Once you've finished sections 0–5, you have a working, deployable, personalized template. Sections 6–8 are optional and can be addressed whenever.

The [.claude/docs/workflow.md](.claude/docs/workflow.md) file describes a branch-based development flow (`dev/`, `bug/`, `audit/`, `doc/`, `claude/`) that's opinionated but worth reading before you start real feature work — even if you don't use Claude Code, the conventions are sensible.

Good luck.
