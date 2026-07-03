# M4B — Engineering handoff

Companion to the teo-tech "Static Handoff Guidelines". Those guidelines assume a Figma/PSD handoff; this project hands off **working HTML/CSS/JS mockups** instead, so most requirements are answered by the code itself. This document covers everything the guidelines ask to be specified in writing. The mockups are the single source of truth for layout, spacing, type and colour — inspect them in the browser rather than measuring screenshots.

## 1. Format / breakpoints

No Figma frames — responsive behaviour is live in the code. Current breakpoints:

- ≤1100px — grids collapse (hero grids to single column, stats stack)
- ≤900px — nav condenses, cards stack
- ≤600px — small-screen refinements (concept cover)

Pages were designed desktop-first at 1440px. Tablet (768) and mobile (375) render acceptably but were not polished per-viewport — treat mobile refinement as production work, using the existing breakpoints as the starting point.

## 2. Naming / components

- Class names are semantic throughout (`hero`, `nav-floating`, `model-card`, `step`, `marquee`…).
- Repeating elements are shared classes in `assets/brand.css` (buttons, pill nav, cards, section headers) with hover states defined in CSS. Interactive states: default + hover exist; focus/active/disabled states are **not** designed — engineer's discretion, keep them within the token system.
- Design tokens live in `:root` of `assets/brand.css`: `--mint #05CEAA`, `--brick #BA2D0B`, `--onyx #131313`, `--paper #F4F4F9`, `--line`, `--muted`.

## 3. Hero ratios

- **Home** (`m4b-home-mockup.html`): full-screen hero, `min-height:100vh`, full-bleed B&W photo with `brightness(.78)`. Title + CTA are centre-safe.
- **All other pages**: heroes are intentionally **not** full-screen (per guidelines: "if the Hero is not full-screen, let me know"). Secondary heroes use a split grid with a `4/5` portrait figure (falls to `16/10` under 1100px).

## 4. Animations & interactive features

All motion lives in `assets/motion.js` (vanilla JS, no dependencies) and is loaded by every page. **Every behaviour respects `prefers-reduced-motion`** (elements render in their final state, marquees stop).

On load:
- `.word-reveal` — hero headings reveal word-by-word, 55ms stagger.
- `#reading-progress` — for the progress bar injected at top of `<body>`, tracks scroll.

On scroll:
- `.reveal` — fade + rise when entering viewport (IntersectionObserver, threshold 0.15, fires once).
- `.counter` — stat numbers roll up from 0 to `data-target`, easeOutCubic, ~1.2s, fires at 50% visibility.
- `.nav-floating` — gets `.scrolled` (shrinks) after 120px.

Continuous:
- `.marquee` — press-logo / ticker strips scroll horizontally forever (home, journal, concept cover).
- `.pill-cta .dot` — breathing pulse, pure CSS.

Hover: card lifts/zooms (`transform` transitions), icon circles scale+rotate on About model cards, photo zoom on location/explore cards.

Interactive elements:
- **Contact** — enquiry form + "book a call" card. Form is a mock; wire to real backend in production.
- **Become a member** — three-step application wizard (step indicator: done/active/pending states, radio-group selectors). Posts to a **Formspree placeholder**; no payment integration exists. Production checkout provider TBD — confirm with Yentl before building.
- No modals, sliders or filters anywhere.

Desired feeling: **smooth and fluid, understated** — motion is subtle (small distances, generous easing), never bouncy. Reference: the mockups themselves, live at <https://yentlspiteri.github.io/m4b-site/>.

## 5. Assets

- **Photography**: `assets/photos/` — currently **unoptimised PNGs (~69 MB total)**. These are placeholders in the guideline sense: final, optimised images (WebP/AVIF, responsive sizes) will be delivered separately via Google Drive with a placement map. B&W treatment is applied in CSS (`grayscale(1) contrast(1.04)` + per-context brightness) — ship colour originals; do not bake the filter into files. Exception: homepage explore-card photos are shown in colour (no grayscale) by design.
- **Icons**: `assets/icons/` — SVG (Paper `#F4F4F9` shapes, sit inside 60px mint circles).
- **Logos**: `assets/logo/` — SVG.
- **Portraits in use**: miro-portrait, miro-people-1, stephan-hillert, rosanna-cubelli, olivia-kinghorst, mirela-dimofte, ian-thompson, marin-curkovic, gabriele-castegnaro. Remaining slots: `avatar-placeholder.png`. All portrait usage is per-page — grep `photos/` in each HTML file for the placement map.
- **Copy**: illustrative throughout (counters, prices, partner names, testimonials). Final copy awaits client sign-off — do not treat mockup numbers as approved.

## 6. Fonts & licensing

- **Poppins** — weights **300 and 600 only** (loaded via Google Fonts, `family=Poppins:wght@300;600`). Licence: SIL Open Font License 1.1 — free for commercial web use, self-hosting permitted. Source: <https://fonts.google.com/specimen/Poppins>.
- Do not introduce additional weights; emphasis is done by switching 300↔600 and the mint/brick accents.

## Checklist status (vs. teo-tech pre-handoff checklist)

| Item | Status |
| --- | --- |
| One named frame per screen | ✅ one HTML file per page |
| Hero ratio 1.8 / labelled | ✅ home = 100vh full-screen; others documented above as non-full-screen |
| Auto-layout / resize behaviour | ✅ CSS flex/grid, live responsive code |
| Semantic naming, junk removed | ✅ cleaned (junk script + 19 unused images removed) |
| Components with states | ⚠️ default + hover in CSS; focus/disabled to be added in production |
| Consistent colour/type/spacing system | ✅ tokens in brand.css |
| All breakpoints covered | ⚠️ 1100/900/600 implemented; 768/375 polish is production work |
| Final assets via Drive, icons SVG | ⚠️ icons ✅ SVG; final optimised photos to follow via Google Drive |
| Fonts + licensing specified | ✅ §6 |
| Animation one-pager | ✅ §4 |
