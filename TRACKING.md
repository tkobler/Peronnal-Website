# Tracking — downloadable project documents

- [x] Confirm scope with author (all projects with a PDF; skip ARTORG; compress)
- [x] Identify and verify the eight source PDFs
- [x] Compress into `public/documents/<project-id>/` (54 MB -> 17 MB)
- [x] Verify compression did not damage text (rendered page compare vs original)
- [x] Add `ProjectDocument` type + `documents` field
- [x] Render the documents block on the project detail page
- [x] Wire up the eight projects (EN + FR)
- [x] Add `documentsLabel` to both locales
- [x] lint / test:unit / validate:i18n / build (all green)

## Note on where the block renders
`/projects/[id]` is a stub that redirects to `/projects`, and nothing imports
`ProjectDetailPage.tsx` — the card content is rendered inline by `ProjectsPage.tsx`.
The documents block was therefore added to `ProjectsPage.tsx`, and mirrored into
`ProjectDetailPage.tsx` so the two stay in sync for whenever detail pages return.

## Test notes
- `project-cards.spec.ts`: 80/80 pass.
- tier1 also surfaces 5 pre-existing `language-toggle` failures on iphone-se/iphone-14
  and flaky `navigation.spec.ts` failures on ultrawide. Both reproduce on the
  unmodified tree, so they are not from this change.
