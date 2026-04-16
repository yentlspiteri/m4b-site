# Millennials4Boards — Website concept (v0.6)

Static HTML/CSS mockup of a proposed new millennials4boards.com. Eight pages, brand-strict on the new identity system.

## Live preview

- **Preview**: <https://charming-torte-ebd6f5.netlify.app/> (to be refreshed)
- **Current live site**: <https://millennials4boards.com/>

## Pages

| File | Stage | Purpose |
|---|---|---|
| `index.html` | — | Client cover — what's changing and why, with links to every page |
| `m4b-home-mockup.html` | Discover | Home — full-bleed hero, three audience paths, testimonials, press |
| `m4b-about-mockup.html` | Discover | About — problem section, shift grid, 2022→2026 timeline |
| `m4b-team-mockup.html` | Discover | Team — Management Board, Founders, Advisory Council |
| `m4b-journal-mockup.html` | Discover | Journal — essays, events, member wins |
| `m4b-memberships-mockup.html` | Decide | Memberships — Individual vs Corporate pricing |
| `m4b-partnerships-mockup.html` | Decide | Partnerships — logo wall, three tiers, case stories |
| `m4b-contact-mockup.html` | Convert | Contact — audience-aware form, book-a-call |
| `m4b-become-member-mockup.html` | Convert | Three-step checkout wizard with Stripe |

## Design system

- **Type**: Poppins — Light (300) + SemiBold (600) only
- **Colour**: Mint Leaf `#05CEAA` as the single accent; Brick `#BA2D0B` used once on the About "problem" section; Onyx `#131313`; Paper `#F4F4F9`
- **Nav**: Floating centered pill, logo at centre, six links split 3/3, "Join the network" CTA floating alongside
- **Photography**: Pure B&W (`filter: grayscale(1) contrast(1.04)`), no overlays or blend modes
- **Shared styles**: `assets/brand.css`

## Deploy

**Netlify Drop** (no CLI needed): zip the contents of this folder and drop on <https://app.netlify.com/drop>.

**Netlify CLI**:

```bash
npx netlify-cli deploy --prod --dir .
```

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

## Status

Concept v0.6 · Brand-strict · Apr 2026. Portraits are placeholders.
