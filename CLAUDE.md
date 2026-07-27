# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

This repository contains the single-page personal portfolio for **G. Mert Özdoğan**, deployed at **gokmeroz.com**.

The site is designed to present Mert as a software engineer with full-stack, backend, AI/ML, and product-building experience.

### Core stack

* React 19
* TypeScript
* Vite
* `rolldown-vite`, pinned through `overrides`
* Tailwind CSS v4
* AWS S3 and CloudFront
* GitHub Actions

The visual direction is a custom **professional 8-bit/pixel interface**.

The website must feel distinctive and playful without sacrificing:

* recruiter credibility
* readability
* responsive behavior
* accessibility
* technical polish
* content clarity

Do not turn the website into a generic SaaS dashboard, conventional corporate portfolio, or visual clone of an existing product.

---

## Commands

* `npm run dev` — starts the development server; `nodemon` restarts Vite when files under `src/` change
* `npm run build` — runs `tsc -b`, then builds the production bundle with Vite into `dist/`
* `npm run lint` — runs ESLint over the repository
* `npm run preview` — serves the production build locally
* `npm run deploy` — builds, syncs the output to S3, and invalidates CloudFront

There is currently no automated test suite.

Before considering a task complete, run:

```bash
npm run build
npm run lint
```

Do not claim that an implementation is complete when either command fails.

Do not run `npm run deploy` unless explicitly requested.

---

## Deployment

Two deployment paths target the same S3 bucket and CloudFront distribution.

### CI deployment

Pushing to `main` triggers:

```text
.github/workflows/deploy.yml
```

The workflow builds and deploys the site using repository secrets:

* `S3_BUCKET`
* `CLOUDFRONT_DISTRIBUTION_ID`
* AWS credentials

This is the preferred deployment path.

### Manual deployment

```bash
npm run deploy
```

The manual deployment script contains:

* S3 bucket: `s3://gokmeroz.com`
* CloudFront distribution ID: `E2C5C0OZ7LMCFU`

Both deployment paths configure:

* `index.html` with `no-cache`
* versioned assets with `immutable` and a one-year cache duration

CloudFront must therefore be invalidated for updated `index.html` references to become visible reliably.

---

## Application Architecture

The live application entry path is:

```text
src/main.tsx
  → src/App.tsx
  → page sections and shared components
```

The following files are legacy and unused:

```text
src/App.jsx
src/App.css
```

Do not modify or rely on these files unless explicitly removing legacy code.

### Sections

The components under `src/sections/` represent the main page sections.

Current sections include:

* `Hero`
* `About`
* `Skills`
* `Certificates`
* `Works`
* `Services`
* `Contact`
* `Articles`
* `RecentActivity`, when enabled in `App.tsx`

The page is rendered as one continuous scrolling document.

Most content is currently hardcoded inside each section. There is no CMS or centralized content layer.

Do not introduce a CMS, state-management library, backend, or data abstraction unless the task specifically requires one.

### Shared components

Components under `src/components/` include:

* `Nav`
* `Footer`
* `ScrollTop`
* `SpotlightOverlay`
* `SpiderGuide` (module under `src/components/SpiderGuide/`, see the Spidey-Guide section below)
* `WorkCard`

`WorkCard` is legacy or unused and has been superseded by the project-card implementation inside `Works.tsx`.

Before creating a new component, check whether an existing shared component or reusable CSS class already covers the required behavior.

---

## Section IDs and Active Navigation

`App.tsx` uses an `IntersectionObserver` to determine the active navigation item.

The observer currently tracks these IDs:

```text
about
projects
contact
articles
```

These values must remain synchronized with the `LINKS` array in:

```text
src/components/Nav.tsx
```

When adding a new navigation-linked section:

1. Give the section element a stable `id`.
2. Add the same ID to the observed IDs in `App.tsx`.
3. Add the corresponding entry to `LINKS` in `Nav.tsx`.
4. Confirm that active-state behavior works while scrolling in both directions.
5. Confirm that anchor navigation does not hide the section heading behind the fixed navigation.

`App.tsx` also updates the CSS variables `--mx` and `--my` from pointer movement for the page-background glow.

Preserve this behavior unless the task explicitly changes the visual effect.

---

# Design Direction

## Pixel Professional System

The site follows a custom design direction called **Pixel Professional**.

It combines:

* pixel-art interface details
* arcade-inspired typography
* hard-edged panels and shadows
* clear modern layout principles
* recruiter-facing content hierarchy
* accessible interactions
* responsive component behavior

The pixel identity is a visual layer, not permission to ignore standard interface engineering.

Every design change must satisfy both requirements:

1. It must belong to the website’s existing pixel-art identity.
2. It must improve or preserve usability, readability, and professionalism.

---

## Design Principles

### Preserve personality

* Keep the 8-bit and masked-hero identity.
* Preserve intentional pixel borders, stepped corners, hard shadows, and retro interface details.
* Avoid replacing the site with standard rounded shadcn-style cards.
* Avoid generic glassmorphism, excessive gradients, oversized blur effects, and template-like SaaS layouts.
* Do not imitate copyrighted characters or recognizable third-party visual identities.

### Prioritize content

* Projects, experience, skills, and contact actions must remain easier to notice than decorative elements.
* Visual effects must not compete with section headings or body text.
* Recruiters should be able to understand the user’s role, capabilities, and projects quickly.
* Decorative UI must not hide, truncate, or delay access to important content.

### Maintain readability

* Pixel display fonts should be used selectively.
* Long paragraphs must use a readable body font.
* Do not render paragraph-length content entirely in uppercase.
* Avoid excessively narrow text columns.
* Avoid extremely long full-width lines on large screens.
* Text must remain readable at browser zoom levels above 100%.

### Build consistent systems

* Reuse existing design tokens and shared classes.
* Prefer reusable primitives over section-specific visual inventions.
* Similar components must have consistent spacing, border treatment, typography, and interaction states.
* Do not fix one breakpoint while introducing regressions at another.

---

# Styling Architecture

Tailwind CSS v4 is configured CSS-first in:

```text
src/index.css
```

Configuration is defined through the `@theme` block rather than a traditional Tailwind configuration file.

Do not create a `tailwind.config.js` or `tailwind.config.ts` unless there is a verified technical requirement that Tailwind v4 CSS-first configuration cannot handle.

---

## Fonts

Three pixel fonts are self-hosted under:

```text
src/assets/fonts/pixel/
```

They are registered using `@font-face` and exposed through `@theme`.

### `font-display`

Font:

```text
Press Start 2P
```

Use for:

* major page headings
* occasional section titles
* short display text

Do not use for:

* paragraphs
* long labels
* dense card content
* mobile text that becomes unreadably small

The font has wide glyphs and can overflow easily. Test headings with long words and narrow viewports.

### `font-sans`

Font:

```text
VT323
```

This is currently the sitewide body default.

Use carefully for:

* body copy
* descriptions
* supporting text

When readability suffers, prefer introducing or using a more readable body-font token rather than compensating with excessive font size.

### `font-pixel-ui`

Font:

```text
Silkscreen Bold
```

Use for:

* navigation
* compact labels
* buttons
* tags
* chips
* interface controls

This font has limited glyph coverage and does not reliably support Turkish characters.

Do not use it for dynamic or Turkish-language content unless the text has been verified visually.

---

## Existing Color Tokens

The theme currently includes tokens such as:

```css
--color-accent
--color-accent-2
--color-accent-3
--color-surface
--color-surface-2
--color-border
```

Current visual roles include:

* `accent` — coral
* `accent-2` — cyan
* `accent-3` — gold
* `surface` and `surface-2` — dark interface surfaces
* `border` — shared border color

Use semantic tokens instead of raw color literals inside React components.

Do not add new hexadecimal, RGB, or HSL values directly to section JSX unless there is a strong documented reason.

When additional colors are required, define them centrally in `src/index.css`.

Prefer names based on purpose rather than appearance.

Good:

```css
--color-text-muted
--color-surface-elevated
--color-border-strong
--color-danger
```

Avoid:

```css
--color-light-gray-2
--color-random-blue
--color-card-green
```

---

## Existing Reusable Classes

Existing shared classes include:

```text
.pixel-panel
.pixel-chip
.pixel-btn
.btn-accent
.nav-surface
.container-mx
```

### `.pixel-panel`

The primary card and panel primitive.

It uses:

* notched corners
* `clip-path`
* a hard offset shadow
* pixel-style borders

Use it for visually prominent grouped content rather than recreating the panel treatment inline.

### `.pixel-chip`

Use for:

* skill labels
* technology tags
* short metadata
* compact statuses

### `.pixel-btn`

Use as the base button treatment.

### `.btn-accent`

Use for primary accent actions where appropriate.

### `.nav-surface`

Use for the shared navigation surface.

### `.container-mx`

Use for consistent horizontal page margins and content containment.

Before creating an inline equivalent, inspect these classes and determine whether they can be reused or extended.

---

# Design Tokens

New visual values must come from a controlled token system.

## Spacing

Prefer values from this conceptual spacing scale:

```text
4px
8px
12px
16px
24px
32px
48px
64px
96px
128px
```

Use Tailwind utilities that map closely to this scale.

Avoid arbitrary values such as:

```text
mt-[37px]
gap-[19px]
px-[27px]
```

Arbitrary values are acceptable only when required by:

* pixel-art geometry
* icon alignment
* canvas positioning
* a documented browser workaround
* an exact visual asset dimension

Do not use arbitrary spacing merely to visually patch an inconsistent layout.

## Layout widths

Use shared layout constraints.

Recommended roles:

```text
Page container: approximately 1200–1280px maximum
Reading column: approximately 680–760px maximum
Compact content column: approximately 520–640px maximum
```

Do not stretch paragraphs across ultrawide screens.

## Section spacing

Keep section rhythm consistent.

Approximate targets:

```text
Mobile vertical section spacing: 64px
Tablet vertical section spacing: 80px
Desktop vertical section spacing: 96–128px
```

Do not independently invent top and bottom spacing for every section.

## Borders and shadows

Pixel surfaces should generally use:

* sharp or minimally rounded corners
* deliberate stepped or notched geometry
* hard-edged shadows
* visible borders

Avoid mixing pixel panels with unrelated large `rounded-3xl` cards unless the contrast is intentional and documented.

## Motion

Animations must:

* communicate state or hierarchy
* remain subtle enough for a professional portfolio
* avoid blocking interaction
* avoid causing layout shifts
* respect `prefers-reduced-motion`

Do not add continuous decorative animation without checking CPU cost and visual distraction.

---

# Responsive Design

Every meaningful visual change must be evaluated at these widths:

```text
320px
375px
768px
1024px
1280px
1440px
1920px
```

The exact browser viewport can vary, but these widths represent the minimum review set.

## Responsive rules

* Design mobile behavior deliberately rather than shrinking the desktop layout.
* Avoid fixed content heights.
* Avoid fixed widths on text-heavy components.
* Prefer `min-height` over `height` when content can grow.
* Allow cards to expand vertically for long content.
* Use grid layouts only when they collapse cleanly.
* Do not rely on absolute positioning for primary document flow.
* Fixed-position widgets must not block navigation, text, buttons, or browser controls.
* Test long project titles, long technology names, and multiline navigation labels.
* Confirm that horizontal scrolling is not introduced.
* Confirm that decorative pseudo-elements remain within the viewport.
* Confirm that headings do not overflow because of pixel-font glyph width.

Use `clamp()` selectively for responsive typography and spacing when it improves continuity between breakpoints.

Do not add breakpoint-specific fixes without first identifying the underlying layout constraint.

---

# Component System

Prefer a small internal component system over repeated Tailwind class strings.

Potential reusable primitives include:

```text
Container
Section
SectionHeader
PixelPanel
Button
IconButton
Tag
StatusBadge
ProjectCard
ExperienceCard
NavigationItem
SpiderGuideShell
```

Do not create these components merely because they appear on this list. Create them when repeated patterns in the current code justify the abstraction.

## Component requirements

Reusable components should have:

* explicit TypeScript props
* clear variant names
* predictable defaults
* responsive behavior
* accessible markup
* visible focus states
* hover, active, and disabled states where applicable
* support for multiline content
* support for long strings
* no unnecessary internal state
* no duplicated visual token definitions

Prefer:

```tsx
<Button variant="primary" size="md">
  View project
</Button>
```

Over repeatedly assembling unrelated class strings in every section.

Avoid overly generic components with dozens of optional props.

---

# shadcn/ui and Radix

The website does not need a wholesale third-party component-library migration.

Radix Primitives or shadcn/ui components may be introduced selectively for behavior that is difficult to implement correctly, such as:

* dialogs
* popovers
* dropdown menus
* tooltips
* tabs
* accessible focus management

Rules:

* Do not install large component sets without a concrete use case.
* Do not apply default shadcn visual styling unchanged.
* Adapt imported primitives to the Pixel Professional design system.
* Preserve existing semantic tokens and visual identity.
* Do not add a dependency when a small accessible native implementation is sufficient.
* Explain newly introduced packages in the task summary.

Use external libraries for behavior, not for replacing the website’s identity.

---

# Section Migration Status

The following sections currently use more complete pixel-system styling:

* `Nav`
* `Hero`
* `Skills`
* `Works`
* `SpiderGuide`

The following sections still use older structural styling or plain rounded Tailwind surfaces:

* `About`
* `Certificates`
* `Services`
* `Contact`
* `Articles`
* `Footer`

When modernizing these sections:

* preserve their content
* migrate them toward shared tokens and components
* avoid redesigning all sections simultaneously
* keep visual hierarchy appropriate to each section
* prevent every section from becoming an identical grid of `.pixel-panel` cards

Consistency does not require every section to have the same composition.

---

## Known Services Styling Issue

`src/sections/Services.tsx` references several classes that are not defined in `src/index.css`, including:

```text
bg-night2
text-accent2
bg-card
shadow-glow
hr-accent
```

These references predate the current pixel theme and may render without their intended styling.

When fixing `Services.tsx`:

* replace obsolete classes with current semantic tokens or shared components
* do not recreate missing legacy classes without first checking whether they belong in the current system
* preserve the section’s content and meaning
* validate contrast and responsive behavior after migration

---

# Spidey-Guide

Spidey-Guide (formerly PixelGuide) is a fixed-position interactive portfolio
guide rendered near the top-left corner. It is an **Interactive Portfolio
Guide / Personal Knowledge Engine** — never describe it as an AI assistant in
UI copy or answers.

```text
src/components/SpiderGuide/     UI: SpiderGuide.tsx (orchestrator), SpiderGuideAvatar
                                 (badge/canvas/callout/ULTRA MODE), SpiderGuidePanel,
                                 SpiderGuideInput, SpiderGuideSuggestions,
                                 SpiderGuideResults, SpiderGuideFollowUps
src/data/spiderGuide/           Knowledge base: intents/*.ts by category, synonyms.ts,
                                 categories.ts, shortcuts.ts (persona starter questions)
src/lib/spiderGuide/            Engine: types.ts, normalizeQuery.ts, matchIntent.ts
                                 (deterministic weighted scorer), suggestQuestions.ts
                                 (autocomplete), guideContext.ts (session state),
                                 executeGuideActions.ts (navigate/highlight/open-project/...)
```

Spidey-Guide is entirely non-AI-powered: no external API, no LLM, no network
calls. Every answer is a pre-written `GuideIntent` in `data/spiderGuide/intents/`,
matched deterministically by `lib/spiderGuide/matchIntent.ts` against typed
patterns/keywords with confidence tiers (`matched` / `ambiguous` / `unsupported`).

It includes:

* a canvas-drawn original masked-hero avatar, a decorative SVG web, and a
  spider-strand-draw-in “Click me!” callout (`SpiderGuideAvatar`)
* a swing-in entrance (once per tab session) and a secret 5-click ULTRA MODE
  easter egg, both housed in `SpiderGuideAvatar`
* an expandable panel with autocomplete, contextual follow-ups, persona
  starter chips, and a visible Reset control (`SpiderGuidePanel` and children)
* actions that scroll/highlight real sections of the page (`guide-highlight`
  CSS class + `id` attributes on project cards, experience cards, skill groups)

## Spidey-Guide rules

* Keep the knowledge base (`data/spiderGuide/intents/`) grounded only in real
  portfolio content — never invent facts, metrics, or completed status for
  ongoing work (e.g. ReproBot must stay described as ongoing).
* Do not claim capabilities or experience not represented elsewhere on the site.
* Keep fallback/unsupported responses helpful — never a dead-end "I don't understand".
* Preserve the avatar as an original design; do not turn it into a direct
  copy of Spider-Man or another copyrighted character.
* Ensure the widget remains fully keyboard-usable, including the autocomplete
  combobox (`aria-expanded`, `aria-activedescendant`, arrow/Enter/Escape).
* Ensure the open and close controls have accessible labels and focus is visible.
* Ensure the panel does not overflow the viewport and does not block important content.
* The panel must stay `position: fixed` (not `absolute`) — Tailwind's
  `.absolute`/`.fixed` utilities live in `@layer utilities`, which loses to
  `.pixel-panel`'s unlayered `position: relative` unless overridden with the
  `!` important-modifier (`!fixed`), so don't drop that modifier.
* `executeGuideActions`'s `scrollToSection` blurs the active element and uses
  `behavior: "auto"` (not `"smooth"`) before scrolling — a focused input
  inside this fixed panel blocks programmatic smooth-scroll in Chrome
  entirely; keep both workarounds.
* An intent should request at most one scroll/highlight action; combining
  e.g. `navigate` + `open-project` in the same intent double-fires
  `scrollIntoView` in one tick and can leave the page scroll stuck.
* Respect reduced-motion preferences throughout.
* Preserve the first-open dismissal behavior (`seen` state) unless explicitly changing it.

When editing Spidey-Guide positioning, evaluate the entire page layout rather than treating the widget as an isolated component.

---

# Accessibility

Accessibility is part of implementation quality, not an optional cleanup step.

Required standards:

* Use semantic HTML elements.
* Use actual `<button>` elements for actions.
* Use actual `<a>` elements for navigation.
* Every interactive element must be keyboard reachable.
* Focus indicators must remain visible.
* Images and meaningful graphics require appropriate alternative text.
* Decorative graphics should be hidden from assistive technology when appropriate.
* Form controls require labels.
* Text and controls must maintain sufficient contrast.
* Do not communicate state using color alone.
* Respect `prefers-reduced-motion`.
* Avoid unexpected focus changes.
* Avoid hover-only access to important information.
* Do not remove outlines unless replacing them with an equally visible focus treatment.

Canvas elements must have an accessible fallback or descriptive label when they communicate meaningful content.

---

# Content Integrity

Do not rewrite factual portfolio content during visual refactors unless explicitly requested.

This includes:

* company names
* project names
* role titles
* employment periods
* technology stacks
* project metrics
* contact details
* external URLs

Do not invent metrics, users, revenue, model performance, employers, or responsibilities.

When content appears inconsistent, flag it rather than silently guessing.

Avoid replacing specific project descriptions with generic AI-generated marketing language.

The website should sound like an engineer and product builder, not an advertising template.

---

# Code Quality

## TypeScript

* Prefer explicit types for component props and structured content.
* Avoid `any`.
* Avoid unnecessary type assertions.
* Keep union types narrow and meaningful.
* Keep data structures close to their consumers unless reuse justifies extraction.
* Preserve strict type-checking compatibility.

## React

* Prefer functional components.
* Avoid unnecessary state.
* Avoid effects for values that can be derived during rendering.
* Clean up event listeners, observers, and timers.
* Avoid recreating expensive objects during every render when it materially affects performance.
* Do not introduce global state for local UI concerns.
* Keep components focused on one clear responsibility.

## CSS and Tailwind

* Reuse design tokens.
* Reuse shared component classes.
* Avoid very long duplicated class lists.
* Avoid arbitrary values unless justified.
* Avoid `!important`.
* Avoid inline styles for static design values.
* Inline styles are acceptable for dynamic canvas values, pointer-derived CSS variables, or computed geometry.
* Do not mix multiple competing visual systems within one component.

## Dependencies

Before installing a package:

1. Confirm the behavior cannot be implemented cleanly with existing dependencies or browser APIs.
2. Check bundle-size and maintenance implications.
3. Use the smallest appropriate package.
4. Document why it was added.
5. Do not install a full UI framework for a single primitive.

---

# Performance

This is a static portfolio and should remain lightweight.

* Avoid unnecessary runtime dependencies.
* Lazy-load heavy optional assets when appropriate.
* Prevent oversized images from being shipped.
* Prefer CSS effects over large decorative image files.
* Avoid excessive canvas redraws.
* Throttle or optimize pointer-driven effects where needed.
* Avoid triggering React rerenders on every pointer movement when CSS variables can handle the effect.
* Prevent layout shifts from fonts, images, or asynchronously sized elements.
* Preserve Vite asset hashing and cache behavior.
* Do not sacrifice readability or accessibility for marginal animation effects.

---

# Working Method

## Before editing

For cross-cutting visual or architectural tasks:

1. Inspect the relevant files.
2. Identify the current pattern.
3. Identify reusable tokens and components.
4. Check whether the issue affects multiple sections.
5. Describe the intended implementation scope.
6. Avoid editing unrelated files.

Do not begin a repository-wide redesign before understanding the existing architecture.

## During editing

* Make focused changes.
* Preserve working behavior.
* Reuse existing conventions.
* Keep migrations incremental.
* Avoid combining design refactors, content rewrites, dependency upgrades, and unrelated cleanup in the same change.
* Do not rewrite entire files when a smaller patch is sufficient.
* Do not remove comments that still explain non-obvious behavior.
* Do not modify deployment configuration unless required by the task.

## After editing

Always inspect the final diff.

Then run:

```bash
npm run build
npm run lint
```

Verify:

* no TypeScript errors
* no lint errors
* no accidental content changes
* no unused imports
* no dead components introduced
* no obvious mobile overflow
* no broken navigation IDs
* no stale Spidey-Guide knowledge base entries caused by the change
* no undefined Tailwind classes introduced
* no unnecessary dependency changes

Summarize:

* files changed
* behavior changed
* design-system decisions made
* validation performed
* remaining known limitations

---

# Design Review Checklist

Use this checklist after frontend changes.

## Layout

* Does the page work at 320px?
* Is there horizontal overflow?
* Are sections aligned to the same container?
* Are headings and body text constrained appropriately?
* Do fixed elements avoid covering content?
* Does the layout remain coherent at 1920px?

## Typography

* Are display fonts used only for short text?
* Are long descriptions easy to read?
* Do headings wrap cleanly?
* Are text sizes and line heights consistent?
* Are Turkish characters rendered correctly where present?

## Components

* Are repeated patterns implemented consistently?
* Are button states complete?
* Are tags and badges visually aligned?
* Do cards support long content?
* Are visual variants intentional rather than arbitrary?

## Accessibility

* Can all controls be used with a keyboard?
* Are focus states visible?
* Are controls semantically correct?
* Is contrast sufficient?
* Does reduced-motion mode remain usable?

## Visual identity

* Does the result still look like gokmeroz.com?
* Does it preserve the pixel-art identity?
* Does it avoid looking like an off-the-shelf SaaS template?
* Is decoration supporting rather than overpowering the content?
* Does the page feel professional enough for recruiters and engineering managers?

---

# Important Restrictions

Do not:

* modify legacy `App.jsx` or `App.css` as though they were active
* invent portfolio facts
* silently rewrite project descriptions during style work
* introduce undefined Tailwind classes
* hardcode new colors throughout JSX
* create one-off spacing systems per section
* use absolute positioning for primary layout
* use fixed heights for dynamic text content
* make every section visually identical
* replace the pixel identity with default shadcn styling
* copy existing copyrighted character designs
* deploy without explicit instruction
* claim success without running the available validation commands
