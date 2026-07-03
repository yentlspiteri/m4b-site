# Millennials4Boards — Website concept (v0.9.6)

Static HTML/CSS mockup of a proposed new millennials4boards.com. Eight page mockups plus a client-facing concept cover. Brand-strict on the new identity system. Being handed off for production build — see [`HANDOFF.md`](HANDOFF.md).

## Live preview

- **GitHub Pages**: <https://yentlspiteri.github.io/m4b-site/>
- **Current live site**: <https://millennials4boards.com/>

`index.html` is the concept cover (the story for the client). The homepage mockup is at `m4b-home-mockup.html`.

## Pages

| File                            | Stage    | Purpose                                                                                                 |
| ------------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `index.html`                    | —        | Client cover — audit, principles, design system, links to every page. Sticky TOC, collapsible sections. |
| `m4b-home-mockup.html`          | Discover | Home — full-bleed hero, stats row with counters, three audience paths, testimonials, press marquee      |
| `m4b-about-mockup.html`         | Discover | About — problem section, model cards, 2022 → 2026 timeline                                              |
| `m4b-team-mockup.html`          | Discover | Team — Management Board, Founders, Advisory Council                                                     |
| `m4b-journal-mockup.html`       | Discover | Journal — featured event, news grid, member story, press marquee                                        |
| `m4b-memberships-mockup.html`   | Decide   | Memberships — Individual vs Corporate pricing, member outcomes, FAQ                                     |
| `m4b-partnerships-mockup.html`  | Decide   | Partnerships — typographic logo wall, three tiers, case stories                                         |
| `m4b-contact-mockup.html`       | Convert  | Contact — enquiry form, book-a-call card, locations                                                     |
| `m4b-become-member-mockup.html` | Convert  | Three-step application wizard (mock form posts to a Formspree placeholder — no payment integration yet; provider TBD for production) |

## Design system

- **Type**: Poppins — Light (300) + SemiBold (600) only; these are the only two weights loaded from Google Fonts.
- **Colour**: Mint Leaf `#05CEAA` as the single accent · Brick `#BA2D0B` reserved for "problem" moments (About problem section, one partnerships case story, concept-cover callouts) · Onyx `#131313` · Paper `#F4F4F9`
- **Nav**: Floating centered pill with logo at centre, six links split 3/3, "Join the network" CTA floating alongside. *Hidden on `index.html` (concept cover has its own sticky TOC).*
- **Photography**: Pure B&W (`filter: grayscale(1) contrast(1.04)`, with per-context brightness tweaks), no overlays or blend modes
- **Icons**: SVG, Paper-on-Mint circles (`assets/icons/`)
- **Motion**: Scroll-reveal via IntersectionObserver, word-by-word hero reveal, counter roll-up on stats, continuous-scroll marquees (press + ticker), nav shrink on scroll, reading-progress bar. All respect `prefers-reduced-motion`.
- **Shared assets**: `assets/brand.css` (tokens + shared components), `assets/motion.js` (all behaviours above)

## Local preview

```
# from the repo root
python3 -m http.server 8000
# open http://localhost:8000/            → concept cover
# open http://localhost:8000/m4b-home-mockup.html  → homepage mockup
```

Any static file server works (e.g. `npx serve .`, VSCode Live Server). No build step.

## Project structure

```
m4b-site/
├── index.html                         # concept cover (entry point)
├── m4b-*-mockup.html                  # eight page mockups
├── HANDOFF.md                         # engineering handoff — animations, breakpoints, fonts, assets
├── assets/
│   ├── brand.css                      # brand tokens, nav, typography, shared components
│   ├── motion.js                      # reveals, counters, marquees, nav shrink, progress bar
│   ├── photos/                        # B&W photography (01–15.png, image6.png) + portraits
│   ├── icons/                         # SVG icons (growth-steps, collaboration, bridge-building)
│   └── logo/                          # logo SVGs
└── README.md
```

## Editing workflow

1. Make changes to any `.html` file (or shared `assets/brand.css`, `assets/motion.js`).
2. Preview locally with `python3 -m http.server 8000`.
3. Commit on a branch, push, open a PR. `main` auto-deploys to GitHub Pages.

```
git checkout -b fix/<short-description>
# edit files …
git add -A
git commit -m "Short message in imperative mood"
git push -u origin fix/<short-description>
# open a PR on GitHub
```

Direct commits to `main` are fine for typo/copy fixes; use a branch for anything structural.

## Deploy

GitHub Pages is configured to serve `main` from the root. Any push to `main` redeploys within a minute.

Alternative: **Netlify Drop** — zip the repo and drop on <https://app.netlify.com/drop>.

## Conventions

- **Brand-strict**: two Poppins weights, one accent colour, one greyscale photo treatment. Resist new weights, tints, or overlays — they break the system fast.
- **No build step**: every page is a single static HTML file plus the two shared assets. View-source should stay readable.
- **Mockup data**: counters, prices, partner logos, testimonials are illustrative. Before going live, replace names/quotes/numbers with approved copy.
- **Portraits**: in use — `miro-portrait.png`, `miro-people-1.png`, `stephan-hillert.jpg`, `rosanna-cubelli.png`, `olivia-kinghorst.jpg`, `mirela-dimofte.jpg`, `ian-thompson.png`, `marin-curkovic.png`, `gabriele-castegnaro.jpg`. Remaining slots use `avatar-placeholder.png`.

## Status

Concept **v0.9.6** · Brand-strict · Jul 2026 · Handoff-ready.

Changes since v0.9.5 (handoff prep):

- README corrected to match the code (checkout wizard has **no Stripe integration** — mock Formspree post only; Brick appears in three places, not one; full portrait list).
- Font weights normalised to the two brand weights: all 400→300 and 500/700/800/900→600; Google Fonts load trimmed to `300;600` (700–900 previously rendered as browser fake-bold).
- Icons converted PNG → SVG.
- Junk removed: `shot-migration.mjs` (leftover screenshot script), 19 unused images in `assets/photos/` and `assets/logo/`.
- `HANDOFF.md` added — animation/feature spec, breakpoints, hero ratios, fonts + licensing, asset placement map.

Copy and several stats are illustrative and await sign-off. Photography is unoptimised (~69 MB of PNGs) — final optimised assets to be delivered separately (see HANDOFF.md §5).
