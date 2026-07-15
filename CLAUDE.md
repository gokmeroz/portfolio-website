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
- **`src/components/`** — shared UI: `Nav`, `Footer`, `ScrollTop`, `WorkCard` (legacy/unused, superseded by the inline `ProjectCard` in `Works.tsx`), `SpotlightOverlay` (mouse-follow cursor glow), `PixelGuide` (fixed-position corner assistant, see below).

### Section-ID / active-nav convention

`App.tsx` runs an `IntersectionObserver` that tracks scroll position and highlights the current link in `Nav`. It only observes four IDs: **`about`, `projects`, `contact`, `articles`** — these must match the `LINKS` array in `Nav.tsx`. When adding a nav-linked section, wire up both the observed `ids` list in `App.tsx` and `LINKS` in `Nav.tsx`, and give the section element a matching `id`. `App.tsx` also sets `--mx`/`--my` CSS vars from pointer movement for the background glow.

### Styling — pixel/8-bit arcade theme

Tailwind v4 is configured **CSS-first in `src/index.css`** via an `@theme` block. Three pixel fonts are self-hosted from `src/assets/fonts/pixel/` via `@font-face` (not a CDN) and exposed as Tailwind utilities through `@theme` font tokens: `font-display` (Press Start 2P — headlines only, very wide glyphs), `font-sans` (VT323 — the sitewide body default), `font-pixel-ui` (Silkscreen Bold — nav/labels/buttons/chips; ASCII-only, no Turkish glyph coverage).

Color tokens (`--color-accent` coral, `--color-accent-2` cyan, `--color-accent-3` gold, `--color-surface`/`--color-surface-2`, `--color-border`) plus reusable component classes: `.pixel-panel` (notched-corner card via `clip-path`, hard offset shadow — the base unit for skill/project cards), `.pixel-chip`, `.pixel-btn`, `.btn-accent`, `.nav-surface`, `.container-mx`. Reuse these rather than re-deriving the notched-panel look inline.

**Not every section got the full notched-panel treatment** — `Nav`, `Hero`, `Skills`, `Works`, and `PixelGuide` were explicitly redesigned with `.pixel-panel`/pixel fonts. `About`, `Certificates`, `Services`, `Contact`, `Articles`, and `Footer` were left structurally as-is (still plain Tailwind `rounded-*` shapes) and only inherit the new palette/fonts via the global `@theme` tokens and body font cascade. `Services.tsx` references several classes (`bg-night2`, `text-accent2`, `bg-card`, `shadow-glow`, `hr-accent`) that aren't defined anywhere in `index.css` — this predates the pixel theme and the section currently renders unstyled; not yet fixed.

### PixelGuide (`src/components/PixelGuide.tsx`)

A fixed top-left corner widget: a canvas-drawn pixel avatar (an original masked-hero design — deliberately not a copy of any existing IP character), a decorative SVG spider-web, and a "Click me!" callout that permanently dismisses after first open. Clicking opens a small chat panel with a **keyword-matched knowledge base** (not a live LLM) that answers from real site content — projects, skills, experience, contact, hobbies — with a fallback for anything else. When editing site content (projects, skills, contact info), keep `RULES` in this file in sync so the guide doesn't go stale.
