# Millennials4Boards — Website concept (v0.9.5)

Static HTML/CSS mockup of a proposed new millennials4boards.com. Eight pages plus a client-facing concept cover. Brand-strict on the new identity system.

## Live preview

- **GitHub Pages**: <https://yentlspiteri.github.io/m4b-site/>
- **Current live site**: <https://millennials4boards.com/>

`index.html` is the concept cover (the story for the client). The homepage mockup is at `m4b-home-mockup.html`.

## Pages

| File | Stage | Purpose |
|---|---|---|
| `index.html` | — | Client cover — audit, principles, design system, links to every page. Sticky TOC, collapsible sections. |
| `m4b-home-mockup.html` | Discover | Home — full-bleed hero, asymmetric stats, three audience paths, testimonials, press marquee |
| `m4b-about-mockup.html` | Discover | About — problem section, shift grid, 2022 → 2026 timeline |
| `m4b-team-mockup.html` | Discover | Team — Management Board, Founders, Advisory Council |
| `m4b-journal-mockup.html` | Discover | Journal — featured event, news grid, member story, press marquee |
| `m4b-memberships-mockup.html` | Decide | Memberships — Individual vs Corporate pricing, member outcomes, FAQ |
| `m4b-partnerships-mockup.html` | Decide | Partnerships — typographic logo wall, three tiers, case stories |
| `m4b-contact-mockup.html` | Convert | Contact — audience-aware form, book-a-call, locations, addresses |
| `m4b-become-member-mockup.html` | Convert | Three-step checkout wizard with Stripe |

## Design system

- **Type**: Poppins — Light (300) + SemiBold (600) only. No intermediate weights.
- **Colour**: Mint Leaf `#05CEAA` as the single accent · Brick `#BA2D0B` used once on the About "problem" section · Onyx `#131313` · Paper `#F4F4F9`
- **Nav**: Floating centered pill with logo at centre, six links split 3/3, "Join the network" CTA floating alongside. *Hidden on `index.html` (concept cover has its own sticky TOC).*
- **Photography**: Pure B&W (`filter: grayscale(1) contrast(1.04)`), no overlays or blend modes
- **Motion**: Scroll-reveal via IntersectionObserver, counter roll-up on stats, continuous-scroll marquees (press + ticker), reading-progress bar. All respect `prefers-reduced-motion`.
- **Shared assets**: `assets/brand.css` (tokens + shared components), `assets/motion.js` (scroll reveal, counters, marquee control)

## Local preview

```bash
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
├── assets/
│   ├── brand.css                      # brand tokens, nav, typography, shared components
│   ├── motion.js                      # IntersectionObserver reveals, counters, marquee
│   ├── photos/                        # B&W photography (01.png … 15.png + portraits)
│   └── icons/                         # Mint-circle icons (growth-steps, collaboration, etc.)
└── README.md
```

## Editing workflow

1. Make changes to any `.html` file (or shared `assets/brand.css`, `assets/motion.js`).
2. Preview locally with `python3 -m http.server 8000`.
3. Commit on a branch, push, open a PR. `main` auto-deploys to GitHub Pages.

```bash
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
- **Portraits**: `miro-portrait.png`, `stephan-hillert.jpg`, `rosanna-cubelli.png`, `olivia-kinghorst.jpg` are in use; other avatar slots use `avatar-placeholder.png`.

## Status

Concept **v0.9.5** · Brand-strict · Apr 2026.

Changes since v0.9:
- Concept cover (`index.html`) — floating pill nav removed, replaced with sticky section TOC and collapsible audit / principles / nav / pages / design / close sections.
- Home — asymmetric stats row re-aligned to three even columns with unified type scale and proper unit spacing.
- Partnerships — logo wall rebuilt with typographic wordmarks (HeadsQuarters, WBN, FLN, Egon Zehnder, Spencer Stuart, Deloitte).
- Journal — "In the press" plain grid replaced with continuously-scrolling wordmark marquee, matching home.
- All five secondary pages now load `assets/motion.js` so hero-banner reveals fire.

Portraits remain placeholders. Copy is illustrative and awaits sign-off.
