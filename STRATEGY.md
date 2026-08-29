# Personalize site for Tim Kobler — Strategy

## Context

This repo was Clément Chalut's real personal portfolio, shared as a starting template. Tim is rebranding it as his own site. This is not a `pm`/`tech-lead` architectural decision — it's a mechanical personalization pass per [SETUP.md](SETUP.md) §2.4, so no panel consultation was run; scope was clarified directly with Tim via two questions instead.

## Scope decisions (confirmed with Tim)

1. **Contact info**: replace with Tim's real details (not placeholders) — email, phone, LinkedIn, GitHub. Telegram contact method removed entirely (Tim doesn't use it).
2. **Bio/narrative content**: Clément's biographical text (Stérilux job, EPFL Microengineering, pilot license, trumpet performance) is his real story, not Tim's. Replaced with bracketed placeholders (`[Add your bio here...]`) rather than copying his life story under Tim's name.
3. **Job title**: "Robotics Master's Student" (EPFL) — Tim's actual current status, used in metadata/structured data/status badges.
4. **Domain**: `timkobler.ch` (not `.com` — Tim corrected this from an earlier partial/incomplete edit already in the working tree).
5. **Flight page** (`/flight`, `flightLog.ts`, pilot label): explicitly deferred. Tim plans to ask for a mountaineering-page conversion in a separate task. Left untouched this pass, including the `PILOT: CLÉMENT` label.
6. **Project data** (`projects.ts`, `experience.ts`, `courses.ts`): Clément's real project/academic content, out of scope for this pass — no name references there, and Tim asked to focus on "main pages" for now.

## What changed

- Every literal "Clément Chalut" / "Clément" / "Chalut" name reference across metadata, contact UI, footer, nav, translations, CV data (`cv/data/personal.typ`), README, and `.claude/` agent/doc files.
- Real contact info wired in: `kobler.tim@gmail.com`, `+41 76 310 54 95`, `linkedin.com/in/kobler-tim`, `github.com/tkobler`.
- Domain/SEO surfaces: `public/CNAME`, `public/sitemap.xml`, `public/robots.txt` → `timkobler.ch`. Deleted `public/BingSiteAuth.xml` (tied to Clément's Bing Webmaster account).
- Structured data (`layout.tsx`): dropped the `Stérilux` organization affiliation (no longer applicable), kept `EPFL`, updated `jobTitle`.
- Bio-bearing translation strings (`hero.ts`, `about.ts`, `contact.ts` — EN+FR, key parity preserved) replaced with bracketed placeholders for Tim to fill in later, rather than inventing or copying biographical claims.
- `.claude/settings.json`: scrubbed Clément's real ProtonMail address and machine-specific absolute paths that had leaked into the Bash permission allowlist; repointed to Tim's actual project path.

## Not done (explicitly out of scope this pass)

- `/flight` page and `flightLog.ts` — deferred to a future mountaineering-page task.
- `projects.ts`, `project_details.ts`, `experience.ts`, `courses.ts` — Clément's real project/academic content, no name references, separate SETUP.md §2.1 work.
- CV PDF rebuild (`npm run cv:build`) — `cv/data/personal.typ` source was updated, but `public/cv-*.pdf` are gitignored build artifacts and must be regenerated locally (requires the `typst` CLI). Until rebuilt, the CV download links still serve Clément's old PDF content.
- Bing Webmaster verification — deleted the old file; Tim would need to re-verify under his own account if he wants Bing indexing.

## Verification run

- `npm run lint` — clean
- `npm run validate:i18n` — 292/292 keys match EN/FR
- `npm run test:unit` — 19/19 pass
- `npm run build` — static export succeeds
- Manual: `npm run dev`, curl-checked `/`, `/contact`, `/about` render "Tim Kobler" / new email with zero remaining "Clément"/"Chalut" strings
