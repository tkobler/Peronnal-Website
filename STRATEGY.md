# Blank template branch — Strategy

## Context

This repo started as Clément Chalut's real portfolio. Tim adapted it for himself on `dev/personalize-tim-kobler`. This is a separate, third thing: a genuinely generic template — no Clément, no Tim, just placeholder identity and example content — so a friend can clone this branch and add their own content directly instead of first stripping someone else's.

This branch does **not** fit the repo's five standard workflow prefixes (`dev/`, `bug/`, `audit/`, `doc/`, `claude/`) — it's not a feature shipping to Tim's live site, it's a parallel standalone reference other people clone from. Named `template`, no PR back to `main` is planned. Branched from `main` (Clément's original, unmodified) rather than `dev/personalize-tim-kobler`, to avoid a second round of scrubbing Tim's real contact info back out.

## Scope decisions

1. **Identity**: every name/contact field replaced with an obvious placeholder ("Your Name", `you@example.com`, `example.com`, `your-username`) rather than a fictional filled-in persona — a friend should never wonder "wait, is this a real person?"
2. **Example content stays real-feeling**: projects, experience, and course references keep Clément's professional writing style and register (metrics over adjectives, EPFL course codes, real EPFL professor names on real public EPFL courses) — but the four example projects, the two experience entries, and the trimmed curriculum are fictional/generic, not Clément's actual work. Reduced from 13 projects to 4 (one per domain) and 8 experience entries to 2, so a friend edits rather than deletes their way to a clean slate.
3. **EPFL references kept** per Tim's explicit request — this is meant to still read like a specific, credible engineering student's site, not a generic Lorem Ipsum shell.
4. **Bio/hero/about copy**: explicit bracketed placeholders (`[Add your bio here...]`-style prose) rather than invented biography, since this is content a friend must personally write — no defensible "example" version exists for someone's actual life story.
5. **Images**: no real photos ship. Three hand-authored SVG placeholders (`public/images/placeholders/{wide,square,logo}.svg`) — flat gradient + simple line icon, "REPLACE THIS IMAGE" / "YOUR PHOTO" / "LOGO" labels — cover every image slot (project heroes, home cards, domain tiles, experience logos, profile photo). All of Clément's real images deleted from `public/images/`.
6. **`/flight` → `/hobby`**: the elaborate cockpit-dashboard flight log (5 components, live clock, flight table, radar map) is Clément's real hobby data and a lot of bespoke UI. Replaced with a deliberately minimal page (`src/app/hobby/`) — heading, one paragraph, three placeholder highlight cards — whose only job is to demonstrate that a portfolio can hold a non-project page. `flightLog.ts` and the `/flight` route/components are deleted outright, not just emptied.
7. **`.claude/` docs**: agent personas and workflow docs still say "Your Name" throughout rather than a fictional name, and a few sentences that made specific factual claims about Clément (age, degree, a claim used as a recruiter-agent calibration anchor) were rewritten as generic guidance instead of carried over as false facts about a placeholder person.
8. **`.claude/settings.json`**: the permission allowlist had Clément's real ProtonMail address and absolute machine path baked into several Bash patterns (same issue found and fixed on `dev/personalize-tim-kobler`). Removed rather than repointed — a template shouldn't ship anyone's local filesystem path.

## What's still a known gap

- **`src/app/favicon.ico`**: binary file, left untouched — no text-editing tool can meaningfully replace an `.ico`, and SETUP.md already tells template users to replace it themselves. Flagged, not fixed.
- **CV PDFs**: `cv/data/personal.typ` source updated to placeholders, but `public/cv-*.pdf` are gitignored build artifacts requiring the local `typst` CLI to regenerate — not run here.
- **`src/data/courses.ts` curriculum**: trimmed from Clément's full multi-year transcript to a compact 2-year, ~7-course example. Real EPFL course codes/professors kept (public info), fictional grades.

## Verification run

- `npm run lint` — clean
- `npm run build` — static export succeeds, all 4 example project detail pages generate, `/hobby` present, `/flight` gone
- `npm run validate:i18n` — 138/138 keys match EN/FR (down from 292 — expected, given far less content)
- `npm run test:unit` — 17/17 pass (removed `flight-stats.test.ts`, which tested a file that no longer exists)
- `npm run test:e2e:tier1` — run since this touched routing/navigation (`/flight` → `/hobby`), per CLAUDE.md's testing rule
- Full-repo grep for "Clément"/"Chalut" (case-insensitive): zero hits in `src/`, `public/`, `cv/`, `.claude/`
