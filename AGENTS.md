# Repository guidance

- This repository owns the AI Data source published at `https://dinopeng.com/aidata/`.
- Keep the site deployable below the `/aidata/` path; prefer relative local asset URLs.
- Preserve source attribution when changing statistics, rankings, or reports.
- Run `node --test tests/site.test.mjs` after modifying HTML or local assets.
- Do not add a `CNAME` file here while `dinopeng.com` is served by the portal repository.
