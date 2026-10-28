# Wild Bill's theme (`wildbills`)

The approved forest-green and cream design (the source's `site.css`), as a
sub-theme of Droost Theme. Every piece of markup is a single directory
component.

## How it is put together

- **CSS:**
  - `css/tokens.css` holds the palette (`--wb-*`, HSL channels used as
    `hsl(var(--wb-ink))`), the three faces, radius, wrap width and easing.
    Change a value there and every component follows.
  - `css/base.css` holds the body, the focus ring, the skip link, the shared type
    (`.wb-eyebrow`, `.wb-display`, `.wb-h2`, `.wb-lede`), sections and the motion
    rules.
  - Each component carries its own CSS. Class names are prefixed `wb-`.
- **Faces:** Bricolage Grotesque, Geist and Geist Mono, from Google Fonts, as
  the source loads them.
- **No daisyUI or Tailwind.** `libraries-override` drops droost_theme's
  `global`, `jit` and `tokens` libraries, so the design's rules meet the
  browser's defaults as they did in the source. droost_theme's own 21 Canvas
  components are disabled for the same reason: unstyled here, they are not
  offered to editors.
- **Templates (an operator-granted exception to HR1):**
  - `templates/page.html.twig` only hands the three regions to the
    `wildbills:page` component.
  - `templates/html.html.twig` is core's, with the skip link reading "Skip to
    content" and pointing at `#main`.
- **Reveal on scroll:** `js/reveal.js` reveals `.wb-reveal` elements as they
  enter view. Nothing is hidden without JavaScript, and nothing moves for a
  visitor who prefers reduced motion.

## Components

| Component | Placed by | What it is |
|---|---|---|
| `page` | `page.html.twig` | the shell: header, `<main id="main">`, footer |
| `site_header` | the Site header block | demo bar, brand, main menu, Browse cars, the mobile menu (`site_header.js`: toggle, Escape returns focus, closes past 860px) |
| `site_footer` | the Site footer block | brand, Pages, Hours, Contact, copyright |
| `brand`, `nav_link` | the header and footer | the WB lock-up; one menu link (bar, mobile or footer) |
| `button`, `section_heading` | Canvas, and the components below | a pill button; a section's eyebrow, heading and lede |
| `home_hero`, `promise_band`, `how_it_works`, `questions_split`, `closing_cta` | Canvas (the Home page) | the home page's copy sections; every string is a prop. The hero's count is not a prop: `wildbills_site` hands it the number of listed cars |
| `featured_vehicles`, `body_style_tiles` | Canvas (the Home page) | a section heading above a slot holding the `vehicles` featured block or the `body_styles` tiles block |
| `page_head` | the inventory style (and, later, the inner pages) | eyebrow, h1, lede |
| `inventory` | the `wildbills_inventory` Views style | the /vehicles layout: filters, toolbar, chips, cards, empty state and the details `<dialog>`. `inventory.js` filters and sorts the cards from their data attributes, handles `?type=` and `?vehicle=`, and fills the pop-up with `textContent` |
| `vehicle_card` | the vehicles Views (UI Patterns row) | the source's `carCard()`: one chip (Sale pending, then Featured, then body style); Details links to `/vehicles?vehicle=<stock>` |
| `card_grid` | UI Patterns Views style, and `inventory` | the cards' grid (`kind: cars`), or tiles three to a row (`kind: tiles`). The prop is not named `variant`, because UI Patterns reserves that name |
| `body_style_tile`, `filter_choice` | the body_styles View; the inventory style | a home tile linking to `/vehicles?type=<name>` (encoded); a body-style button or a make option |

The five frame components (`page`, `site_header`, `site_footer`, `brand`,
`nav_link`) are disabled as Canvas components. They render from the template
and the blocks, so the dealership form stays their one source. For the same
reason, the five inventory components that code and Views render
(`inventory`, `vehicle_card`, `card_grid`, `body_style_tile`, `filter_choice`)
are disabled too.

## The Home page

`/` is `canvas_page` 1, one component per section (seven). The featured
cars and the tiles are Views blocks in the slots of `featured_vehicles` and
`body_style_tiles`. Its tree is committed as
`droost/canvas/home.tree.json`, which names its photos by file
(`media:hero.jpg`). To rebuild it on any site, after config import, run this
from the project root:

```bash
droost/canvas/apply-home.sh
```

It creates (or finds) the two photos as image media, puts their ids into a
copy of the tree, and writes that copy with `droost/bin/canvas tree:set`.
The photos ship in `components/home_hero/` and `components/questions_split/`.

## Tests

`tests/e2e/frame.spec.ts`, `tests/e2e/home.spec.ts` and
`tests/e2e/inventory.spec.ts`. The parity gate holds the header and footer to
the source on `/` and `/vehicles`, at 1280 and 390 wide.
