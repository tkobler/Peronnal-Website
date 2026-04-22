# External references

Pointers to things outside this repo. Fill in as you learn them — empty entries are prompts, not facts.

## Hosting & deployment
- **GitHub repo**: `ccka/Personnal-Website`
- **Deploy target**: GitHub Pages via `.github/workflows/` on push to `main`
- **Custom domain**: see [public/CNAME](../../public/CNAME)
- **Live URL**: _(fill in)_

## Search & SEO
- **Sitemap**: [public/sitemap.xml](../../public/sitemap.xml)
- **Robots**: [public/robots.txt](../../public/robots.txt)
- **Bing verification**: [public/BingSiteAuth.xml](../../public/BingSiteAuth.xml)
- **Google Search Console**: _(fill in if used)_

## Environment variables
Defined in [.env.local.example](../../.env.local.example):
- `NEXT_PUBLIC_GITHUB_*` — required only for the `/admin` panel (GitHub API content editing). Not needed for normal dev/build.

## Third-party tooling assumed installed locally
- `typst` CLI — required by [cv/build.sh](../../cv/build.sh). Not in CI.
- Python venv at [cv/.venv/](../../cv/.venv/) — optional, for pdf2docx conversion.

## Related repos / directories
- `Projet-EPFL-Reports/` — sibling directory, gitignored here, contains academic reports. Not part of the site.
- `cv/archive/` — historical CV variants and cover letters. Gitignored. Local-only.
