# Downloadable project documents

## Goal
Let a project carry one or more downloadable PDFs (reports, design reviews, pitch
decks) shown on its detail page, and make adding a new one a two-step job:
drop the file in `public/documents/<project-id>/`, add one entry to the data.

## Decisions
- **Files only.** `link` and `sourceLink` already cover external URLs, so this adds
  a separate `documents` list rather than unifying them. Smaller change, clearer meaning.
- **Translatable labels.** `documents` lives on `detail` in `projects.ts` (the
  fallback) and may be overridden per locale in `translations/{en,fr}/projects.ts`,
  matching how `images` and `keyResults` already work.
- **`download` attribute**, mirroring the CV buttons in `ContactClient.tsx`, since
  the point is handing the visitor a file.
- **PDFs are tracked by git**, like `public/cv/`. Static export means there is no
  other way to serve them.
- **Compressed on the way in.** Ghostscript `-dPDFSETTINGS=/ebook` took the eight
  source PDFs from 54 MB to 17 MB with text untouched; only embedded screenshots
  are downsampled to 150 dpi. Originals stay on the author's machine.

## Scope
Eight projects have a document. The ARTORG civil-service report is deliberately
excluded (plausibly lab-confidential, and 35 MB on its own). The Thymio project's
write-up is a Jupyter notebook, not a PDF, so it is not covered here.

Course briefs and assignment statements were not included — only work authored by
the team. Secondary files (DYNABAL drawing boards, the TIMIT logbook and summary)
are left out to keep one primary document per project.

## Out of scope
- Any document indicator on the projects index page.
- Build-time file-size display.
