# Personnal-Website

Engineering portfolio template, built with **Next.js 16**, **Tailwind CSS v4**, and **TypeScript**. Bilingual (EN/FR) with automatic locale detection. Deployed as a static site to GitHub Pages with a custom domain.

> **Using this repo as a template?** Start with **[SETUP.md](./SETUP.md)** — the step-by-step guide for customizing content, branding, SEO, and deployment before you start modifying code.

## Quick start

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Documentation

This repo has documentation at three layers — pick the one that matches what you need:

### Humans using this as a template
- **[SETUP.md](./SETUP.md)** — step-by-step customization guide
- **[MAINTAINING.md](./MAINTAINING.md)** — ongoing upkeep after setup: adding projects, editing content, images, CV, deployment

### Humans who want implementation details
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — component internals, CSS catalog, DotPattern canvas, how-to guides
- **[.claude/docs/project-map.md](./.claude/docs/project-map.md)** — architecture overview, directory layout, routing, data flow
- **[.claude/docs/glossary.md](./.claude/docs/glossary.md)** — non-obvious terms (Schematic, tier 1–4, signal burst…)

### Contributors working in the repo
- **[.claude/docs/workflow.md](./.claude/docs/workflow.md)** — branch-based workflow (`dev/`, `bug/`, `audit/`, `doc/`, `claude/`)
- **[.claude/docs/feature-development.md](./.claude/docs/feature-development.md)** — discovery + execution phases for `dev/` branches
- **[.claude/docs/testing-strategy.md](./.claude/docs/testing-strategy.md)** — test tiers, CI coverage, known gaps
- **[.claude/docs/frontend-guidelines.md](./.claude/docs/frontend-guidelines.md)** and **[coding-rules.md](./.claude/docs/coding-rules.md)** — conventions for this codebase
- **[.claude/docs/commands.md](./.claude/docs/commands.md)** — canonical npm scripts reference

### Using Claude Code?
The `.claude/` folder contains project context and 20 subagents. See [.claude/CLAUDE.md](./.claude/CLAUDE.md).

## Common commands

```bash
npm run dev              # Local dev server
npm run build            # Static export to out/
npm run lint             # ESLint
npm run test:unit        # Vitest
npm run test:e2e:tier1   # Fast e2e smoke (navigation + language + project cards)
npm run validate:i18n    # EN/FR key parity
npm run cv:build         # Typst CV pipeline (requires typst CLI)
```

Full command reference: [.claude/docs/commands.md](./.claude/docs/commands.md).

## Deployment

Static export (`output: "export"`) to `out/`, published to GitHub Pages via [.github/workflows/deploy.yml](./.github/workflows/deploy.yml) on every push to `main`. CI gates the deploy on `lint + test:unit + validate:i18n` — any failure blocks the build.
