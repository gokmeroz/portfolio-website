# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio for G. Mert Özdoğan (gokmeroz.com). React 19 + TypeScript, built with Vite (the `rolldown-vite` variant, pinned via `overrides`), styled with Tailwind CSS v4.

## Commands

- `npm run dev` — dev server (`nodemon` restarts Vite on changes under `src/`)
- `npm run build` — type-check (`tsc -b`) then `vite build` to `dist/`
- `npm run lint` — ESLint over the repo
- `npm run preview` — serve the production build locally
- `npm run deploy` — build, then sync to S3 (`s3://gokmeroz.com`) and invalidate CloudFront. **Requires local AWS credentials.** Prefer the GitHub Actions path below over running this by hand.

There is no test suite.

## Deployment

Two paths hit the same S3 + CloudFront target:
- **CI (default):** pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and deploys using repo secrets (`S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, AWS creds).
- **Manual:** `npm run deploy` — note the S3 bucket and CloudFront distribution ID (`E2C5C0OZ7LMCFU`) are hardcoded in the `deploy` script in `package.json`.

Both give `index.html` a `no-cache` header and all other assets `immutable`/1-year cache, so CloudFront must be invalidated for `index.html` changes to appear.

## Architecture

`main.tsx` → `App.tsx` renders a single scrolling page. **`src/App.jsx` and `src/App.css` are legacy and unused** — the live entry is `App.tsx` / `index.css`.

- **`src/sections/`** — one component per page section (`Hero`, `About`, `Skills`, `Certificates`, `Works`, `Services`, `Contact`, `Articles`), rendered in order by `App.tsx`. Content is hardcoded in each section; there is no CMS or data layer.
- **`src/components/`** — shared UI: `Nav`, `Footer`, `ScrollTop`, `WorkCard`, `SpotlightOverlay` (mouse-follow cursor glow).

### Section-ID / active-nav convention

`App.tsx` runs an `IntersectionObserver` that tracks scroll position and highlights the current link in `Nav`. It only observes four IDs: **`about`, `projects`, `contact`, `articles`** — these must match the `LINKS` array in `Nav.tsx`. When adding a nav-linked section, wire up both the observed `ids` list in `App.tsx` and `LINKS` in `Nav.tsx`, and give the section element a matching `id`. `App.tsx` also sets `--mx`/`--my` CSS vars from pointer movement for the background glow.

### Styling — "NYC Night HUD" theme

Tailwind v4 is configured **CSS-first in `src/index.css`** via an `@theme` block (color tokens like `--color-accent`, `--color-surface`, `--shadow-hud`) plus reusable component classes: `.card`, `.hud-panel`, `.btn-accent`, `.nav-surface`, `.container-mx`, `.scanline`, `.grid-bg`, `.glow-text`. Reuse these classes rather than re-deriving the HUD look inline.

Note there are **two overlapping color systems**: the `@theme` tokens in `index.css` (dark HUD palette, used by most components) and a separate `brand.primary`/`brand.secondary` green in `tailwind.config.js` (still referenced in `Nav.tsx` as `brand-secondary`). Prefer the `index.css` HUD tokens for new work.
