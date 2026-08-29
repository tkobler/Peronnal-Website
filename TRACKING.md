# Blank template branch — Tracking

## Current status

Complete and verified. Ready for commit.
Last updated: 2026-08-29

## Tasks

- [x] Create `template` branch from `main`
- [x] Write STRATEGY.md
- [x] Placeholder image SVGs (`wide`, `square`, `logo`) + delete all of Clément's real images
- [x] `layout.tsx` metadata, structured data, OG/Twitter → generic placeholders
- [x] Footer, Navigation, HeroSection, AboutClient → placeholder name + image
- [x] Contact page → placeholder email/LinkedIn/GitHub (Email/LinkedIn/GitHub only, matching the simplification already made for Tim)
- [x] `projects.ts` + `project_details.ts` → 4 example projects (one per domain)
- [x] `homeCards.ts` → 4 cards (2 example projects, /experience, /hobby)
- [x] `experience.ts` → 2 example entries
- [x] `courses.ts` → trimmed curriculum, real EPFL course/professor refs, fictional grades
- [x] Delete `/flight` route + `src/components/flight/*` + `flightLog.ts` (data + both translation files)
- [x] Add `/hobby` route (page/layout/client) — deliberately minimal
- [x] `translations/index.ts` — `nav.flight` → `nav.hobby`, `flight`/`flightLog` types → `hobby` type
- [x] EN + FR translation content for hero, about, contact, homeCards, experience, projects, hobby, nav
- [x] `public/CNAME`, `sitemap.xml`, `robots.txt` → `example.com`; delete `BingSiteAuth.xml`
- [x] `cv/data/personal.typ` → placeholder fields
- [x] `README.md`, `SETUP.md` → fix now-stale "Clément" references and the "replace X" instructions that no longer match the already-genericized state
- [x] `.claude/` agent/doc files → "Your Name" placeholder, fixed a few sentences that asserted specific facts about Clément as if they were generic truths
- [x] `.claude/settings.json` → removed leaked ProtonMail address + absolute machine path from Bash permissions
- [x] Fix `Translations["contact"]` type — remove now-unused `whatsappValue`
- [x] Found and fixed: orphaned `src/data/flightLog.ts` (missed on first pass, still referenced by a unit test) + `tests/unit/flight-stats.test.ts`
- [x] Found and fixed: `tests/utils/devices.ts` `ROUTES` array still had `/flight`
- [x] Found and fixed: `tests/e2e/navigation.spec.ts` stale comment
- [x] `npm run lint` — clean
- [x] `npm run build` — succeeds
- [x] `npm run validate:i18n` — 138/138 match
- [x] `npm run test:unit` — 17/17 pass
- [x] `npm run test:e2e:tier1` — 232/248 passed on first run; diagnosed all 16 failures against a clean `main` baseline (see decisions log) — none are regressions from this branch's changes
- [x] Full-repo grep sweep re-confirmed clean after final fixes
- [ ] Commit
- [ ] Push branch (no PR — this branch isn't merging to `main`)

## Decisions log

### 2026-08-29 — Branched from `main`, not `dev/personalize-tim-kobler`
`dev/personalize-tim-kobler` already has useful precedent (bracket-placeholder style, cleaned settings.json) but also has Tim's real contact info baked into metadata/contact/footer, which would need scrubbing right back out. Branching from `main` means one transformation (Clément → generic) instead of two (Clément → Tim → generic).

### 2026-08-29 — Real EPFL course/professor references kept, fictional projects
Per Tim's explicit instruction to keep "professional writing style, the EPFL references, and some example projects." EPFL course codes and the professors who teach them are public institutional facts, not Clément's personal data — pairing them with fictional example projects is a legitimate template pattern (a friend who's also at EPFL could genuinely reuse the pairing for real work).

### 2026-08-29 — `/flight` deleted, not emptied
Considered keeping the route with placeholder data. Rejected: the page is 5 custom components (cockpit dashboard, radar map, live clock) built specifically for flight-log content — keeping the shell would mean a friend either fights that bespoke layout to repurpose it or deletes it anyway. A minimal, generic `/hobby` page demonstrates the same "portfolio can hold non-project content" idea with far less to strip out.

### 2026-08-29 — tier1 e2e failures traced to pre-existing repo flakiness, not this branch
First tier1 run (after fixing an unrelated Playwright-browsers-not-installed environment issue) showed 232 passed / 16 failed. Rather than assume any were caused by this branch's changes, stashed all changes and ran the identical suite against clean `main`: **22 failed** there — a superset covering every category seen on `template` (mobile `language-toggle.spec.ts` FR/EN switching and persistence on `iphone-se`/`iphone-14`; `navigation.spec.ts` hamburger-menu close/backdrop tests; `project-cards.spec.ts` dark/light theme alternation). This matches the flakiness this repo's own `TRACKING.md` (from the unrelated `bug/mobile-locale-toggle` branch) already documented for `navigation.spec.ts:90/103/121`.

Three `template`-only test/project combinations weren't in the `main` baseline list: `navigation.spec.ts:129` (menu → correct page) on chromium-desktop/webkit-desktop/ultrawide, and `navigation.spec.ts:156` (route transition) on ultrawide. Restored the stash and re-ran just those with `--retries=2`: 4/9 passed outright, 3/9 were flaky (failed then passed on retry), 2/9 failed all three attempts — both on chromium-desktop, both with the same `toHaveCSS` assertion-timing error signature as the confirmed-pre-existing hamburger-menu failures. Conclusion: same underlying CSS-transition-timing race as the rest of `navigation.spec.ts`, not a regression — the specific browser/project it lands on is simply non-deterministic between runs (already true on unmodified `main`, where `:90` and `:103` swapped which browser failed between the two runs performed here).

## Blockers

None. `src/app/favicon.ico` (binary, Clément's mark) intentionally left untouched — flagged in STRATEGY.md, not fixable with text-editing tools here.

## Team consultations during execution

None — Tim gave direct, specific scope in conversation (placeholder-vs-real-content split, image strategy, EPFL/example-project retention, hobby-page concept) covering what a `pm`/`tech-lead` consult would normally surface for a `dev/` feature. Treated as equivalent to Phase 1 discovery.
