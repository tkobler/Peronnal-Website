# Blank template branch — Tracking

## Current status

Complete and verified. Ready for commit. See addendum below for a pre-deployment fix pass done separately on 2026-08-31.
Last updated: 2026-08-31

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

---

# Addendum — Pre-deployment fix pass (2026-08-31)

A user-supplied `DIAGNOSTIC-DEPLOIEMENT.md` claimed the branch was blocked by 3 tier3 failures, an unrun CV pipeline, and an untracked debug file. Every claim was independently re-verified before acting rather than trusted at face value.

## Current status
Fix verified. Full tier2 run: 0 `isMobile`/Firefox errors (the bug this pass targeted), 64 skipped as expected, 701 passed. 3 unrelated "hamburger menu works" timeouts remain (chromium-desktop, ultrawide×2) — these are instances of the pre-existing parallel-execution flakiness already documented above in the 2026-08-29 decisions log, not a recurrence of the Firefox bug. Real exit code is still 1 because of those 3, not because of anything this fix touched.

## Tasks
- [x] Capture reproduction (deterministic, `browser.newContext: options.isMobile is not supported in Firefox`)
- [x] Panel consultation (qa + devops, converged, no conflicts)
- [x] Identify root cause (`tests/e2e/responsive-matrix.spec.ts` unconditional `isMobile` in `test.use()`)
- [x] Implement fix (`test.skip` guard per device describe block)
- [x] Verify: `--project=firefox-desktop` alone passes cleanly (64 skipped, 32 passed, 0 failed)
- [x] Verify: full `npm run test:e2e:tier2` — 0 isMobile/Firefox failures (target bug fully resolved); 3 failures remain, all pre-existing deferred flakiness, not this bug
- [x] CV pipeline: `cv/data/personal.typ` pointed at a nonexistent `../photo.jpg`; `show-photo: false` set in both `cv/variants/generic-{en,fr}.typ` per user decision (revert to placeholder), `npm run cv:build` now succeeds
- [x] Removed `.tmp-debug-bg12.mjs` (untracked scratch Playwright script, unrelated to the app)

## Decisions log

### 2026-08-31 — Diagnostic re-verification before trusting it
A user-supplied `DIAGNOSTIC-DEPLOIEMENT.md` claimed 3 tier3 failures blocking merge. Re-ran tier3 twice (full suite + isolated cross-browser) and could not reproduce any failure — 16/16 pass. Treated as a one-off flake from whatever conditions produced the original diagnostic, not a live bug. Not chased further.

### 2026-08-31 — Root cause: Firefox + isMobile, not a canvas/nav bug
Diagnostic attributed interception failures to page-transition/nav z-index issues. Actual cause (confirmed via direct reproduction, not the diagnostic's description) is unrelated: Playwright's Firefox engine rejects the `isMobile` context option outright. This inflated tier2's failure count and flipped its exit code, independent of any app code.

### 2026-08-31 — Applied fix directly on Tim_kobler, not a nested bug/ branch
Bug is confirmed byte-identical on `main` (`git diff main -- tests/e2e/responsive-matrix.spec.ts playwright.config.ts` is empty). Since `Tim_kobler` is the branch being prepared for its own PR into `main`, fixing it in place — after still running full Phase 1 triage — was judged more useful than opening and re-merging a separate `bug/` branch for no added safety.

### 2026-08-31 — CV photo: reverted to no-photo layout rather than blocking on an asset
User chose to set `show-photo: false` in both CV variants rather than supply a real `cv/photo.jpg` right now. `academic-layout` in `cv/template/layout.typ` already defaults to `show-photo: false`, so this brings `industry-layout`'s generic variants in line with that convention until a real photo is supplied.

### 2026-08-31 — Deferred: pre-existing tier1/tier2 flakiness under parallel execution
Hamburger-menu / language-toggle / route-transition tests fail intermittently (different exact tests each run) when Playwright runs its default parallel workers. This is the same flakiness already traced and documented in the 2026-08-29 decisions log above (confirmed present on `main` itself, 22/248 failing there too). User explicitly chose to defer this to a separate `bug/` ticket rather than block this deployment on it.

## Blockers
None currently open.

## Team consultations during execution
- **2026-08-31 — qa**: confirmed root cause; recommended `test.skip()` over silent option-omission; flagged the exit-code-masking risk of piping test output through `tail`.
- **2026-08-31 — devops**: confirmed root cause independently; same fix recommendation; flagged the same exit-code-masking risk as a general practice issue, not just this one run.

## Related issues observed (for separate branches)
- Pre-existing tier1/tier2 parallel-execution flakiness in hamburger-menu / language-toggle / route-transition tests (present on `main`, not a regression) — deferred per user decision above.
- No CI job currently runs tier2 non-silently; any local/CI invocation of Playwright test scripts should use `set -o pipefail` (or avoid piping through `tail`/similar) so a real nonzero exit code is never masked, per both qa's and devops's triage.
