# Home "Work Experience" card → ARTORG — Strategy

## Goal
Feature the ARTORG cochlear-implant work as the content behind the home page's existing "Work Experience" card, replacing its generic placeholder image and descriptor.

## Visitor value
A recruiter or professor skimming the home page currently sees a placeholder image and a generic descriptor ("From internships to hands-on production and research roles") on the Work Experience card. Swapping in the ARTORG project image and a specific one-line descriptor gives them a concrete, credible hook before they click through to the full Experience page.

## Scope
### In scope
- `src/data/homeCards.ts`: replace the `job-experience` card's placeholder image with the existing hero image already used by the ARTORG-related project (`cochlear-implant-insertion-mechanism`).
- `src/data/translations/en/homeCards.ts` and `fr/homeCards.ts`: update the `job-experience` descriptor to describe the ARTORG cochlear-implant insertion tool, in both languages.

### Out of scope
- Adding a new experience entry (ARTORG already exists in `src/data/experience.ts`).
- Adding a new image asset — reusing the existing project hero image per the user's instruction.
- Changing the card title ("Work Experience" / "Expérience professionnelle" stays as-is per the user's instruction).
- Changing the card's link target (`/experience`) or layout.

### Non-goals
- Restructuring the home page card ordering or the `HomeCard` schema.

## Approach
Pure data edit, no component or schema changes. `HomeCard.image` for `job-experience` moves from `/images/placeholders/wide.svg` to `/images/projects/cochlear-implant-insertion-mechanism/hero.jpeg` (the hero image already shipped for that project, per user instruction to "use the same hero image"). Descriptor copy is rewritten in EN and FR to reference the cochlear implant insertion tool, echoing the existing wording in `experience.ts`'s ARTORG entry for consistency.

## Risks
Low. No component logic changes, no new dependencies. Only risk is i18n key drift, mitigated by editing EN/FR together and running `validate:i18n`.

## Tradeoffs
None significant — this is a straight content substitution using an asset that already exists in the repo.

## Test plan
- `npm run validate:i18n`
- `npm run lint`
- `npm run test:unit`
- Manual check in `npm run dev` on the home page (EN + FR) to confirm the card renders correctly.

## Panel input (from Phase 1)
Phase 1 pm/tech-lead panel skipped: this is a pure content edit (image path + one descriptor string, reusing existing assets and existing experience data) with no scope or architecture decision, analogous to the documented skill-driven content exception in `docs/workflow.md`.
