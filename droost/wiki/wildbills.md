---
type: "Drupal Theme"
title: "wildbills"
droost:
  spec: 1
  modules: [wildbills]
  sources:
    - path: web/themes/custom/wildbills/wildbills.info.yml
      hash: "xxh3:ef539bca167172d5"
    - path: web/themes/custom/wildbills/wildbills.libraries.yml
      hash: "xxh3:be4d4acd9b8d3215"
    - path: web/themes/custom/wildbills/wildbills.theme
      hash: "xxh3:0505424650b377b1"
    - path: web/themes/custom/wildbills/css/tokens.css
      hash: "xxh3:abde5f2e76fb893c"
    - path: web/themes/custom/wildbills/css/base.css
      hash: "xxh3:f04f6b0e8852375b"
    - path: web/themes/custom/wildbills/js/reveal.js
      hash: "xxh3:6a399dfd35693cdf"
    - path: web/themes/custom/wildbills/templates/page.html.twig
      hash: "xxh3:f467182d69a0481e"
    - path: web/themes/custom/wildbills/templates/html.html.twig
      hash: "xxh3:e09f7d40ca83ecfa"
    - path: web/themes/custom/wildbills/components/site_header/site_header.component.yml
      hash: "xxh3:5be6ce0586417e6b"
    - path: web/themes/custom/wildbills/components/site_header/site_header.js
      hash: "xxh3:d3b8ec6043743d23"
    - path: web/themes/custom/wildbills/components/site_footer/site_footer.component.yml
      hash: "xxh3:d97d745f4e8967e6"
    - path: web/themes/custom/wildbills/components/home_hero/home_hero.component.yml
      hash: "xxh3:a02eac4bd87fb96e"
    - path: droost/canvas/home.tree.json
      hash: "xxh3:3469c20af2a48d51"
    - path: droost/canvas/apply-home.sh
      hash: "xxh3:1ae7f036cb72c399"
    - path: droost/canvas/resolve-home.php
      hash: "xxh3:fc705de360630eb3"
    - path: web/themes/custom/wildbills/components/page_head/page_head.component.yml
      hash: "xxh3:d8a25eb363f83fc3"
    - path: web/themes/custom/wildbills/components/vehicle_card/vehicle_card.component.yml
      hash: "xxh3:1b09e9ba440104cb"
    - path: web/themes/custom/wildbills/components/vehicle_card/vehicle_card.twig
      hash: "xxh3:62c447c96a35dd02"
    - path: web/themes/custom/wildbills/components/card_grid/card_grid.component.yml
      hash: "xxh3:8d67f3b5a1710961"
    - path: web/themes/custom/wildbills/components/body_style_tile/body_style_tile.component.yml
      hash: "xxh3:c0d4c7b99b5618f3"
    - path: web/themes/custom/wildbills/components/filter_choice/filter_choice.component.yml
      hash: "xxh3:b5e00e64756bdd8c"
    - path: web/themes/custom/wildbills/components/inventory/inventory.component.yml
      hash: "xxh3:1c96a921f758f663"
    - path: web/themes/custom/wildbills/components/inventory/inventory.twig
      hash: "xxh3:e16a5fba39ea235d"
    - path: web/themes/custom/wildbills/components/inventory/inventory.js
      hash: "xxh3:20605a7c42954f68"
    - path: web/themes/custom/wildbills/components/featured_vehicles/featured_vehicles.component.yml
      hash: "xxh3:95bde2d2b7943e95"
    - path: web/themes/custom/wildbills/components/body_style_tiles/body_style_tiles.component.yml
      hash: "xxh3:12341ec8041f9117"
    - path: web/themes/custom/wildbills/components/home_hero/home_hero.twig
      hash: "xxh3:0eb0328d3e8ddec6"
    - path: web/themes/custom/wildbills/components/location_grid/location_grid.component.yml
      hash: "xxh3:8136a1b706442b45"
    - path: web/themes/custom/wildbills/components/map_card/map_card.component.yml
      hash: "xxh3:5c7ae4f8c2e1e056"
    - path: web/themes/custom/wildbills/components/info_card/info_card.component.yml
      hash: "xxh3:111086890afdb27c"
    - path: web/themes/custom/wildbills/components/hours_table/hours_table.component.yml
      hash: "xxh3:6482e4ef76ce84c9"
    - path: web/themes/custom/wildbills/components/hours_table/hours_table.js
      hash: "xxh3:345cd79d2fdc1a60"
    - path: web/themes/custom/wildbills/components/closing_cta/closing_cta.twig
      hash: "xxh3:12a03d1457f8c2fc"
    - path: web/themes/custom/wildbills/components/button/button.component.yml
      hash: "xxh3:6e7bf69024e35308"
    - path: droost/canvas/location.tree.json
      hash: "xxh3:75f791e61d98b5d2"
    - path: droost/canvas/apply-location.sh
      hash: "xxh3:70c9a5c898ffb72a"
    - path: web/themes/custom/wildbills/components/info_card/info_card.twig
      hash: "xxh3:d3a8aaff3bff6bc1"
    - path: web/themes/custom/wildbills/components/contact_grid/contact_grid.component.yml
      hash: "xxh3:f8a10c9835f33216"
    - path: web/themes/custom/wildbills/components/inquiry_form/inquiry_form.component.yml
      hash: "xxh3:948adcab1346e249"
    - path: web/themes/custom/wildbills/components/inquiry_form/inquiry_form.twig
      hash: "xxh3:236d6e436f26c30b"
    - path: web/themes/custom/wildbills/components/inquiry_form/inquiry_form.js
      hash: "xxh3:6a1d79dd40bf62a6"
    - path: droost/canvas/contact.tree.json
      hash: "xxh3:9d99bb4f961d975a"
    - path: droost/canvas/apply-contact.sh
      hash: "xxh3:4b5ae813663e87b1"
---

# wildbills

The site's look: the approved forest-green and cream design
(`design/src/Wild-Bills-Cars/artifacts/wildbills/src/site/site.css`), as a
sub-theme of droost_theme and the default theme. The handoff forbids the
rejected western look: no western fonts, wood, emoji or "pardner" copy. Built
in R01.

## Why it drops droost_theme's CSS

- **The override:** `libraries-override` sets `droost_theme/global`, `jit` and
  `tokens` to false. Its daisyUI/Tailwind preflight had zeroed paragraph
  margins and link underlines that the source relies on, and its component
  classes (`.btn`, `.hero`, `.steps`) collide with the source's.
- **Unstyled components:** droost_theme's 21 SDCs are unstyled here, so their
  Canvas components are disabled.
- **`.hidden`:** droost_theme swaps core's `.hidden` for Tailwind's. With
  Tailwind gone, `base.css` restores the rule.

## Styling

- **Tokens:** `css/tokens.css` holds the palette as HSL channels (`--wb-paper`,
  `--wb-ink`, `--wb-signal`, `--wb-sage`…), the three faces, radius, wrap
  width and easing.
- **Base:** `css/base.css` holds the page-wide rules.
- **Components:** each component carries its own CSS, prefixed `wb-`.
- **Faces:** they load from Google Fonts, as the source does.
- **Head:** the favicon is the source's `favicon.svg` (theme setting), and
  `theme-color` is `#173e32` (`wildbills_preprocess_html()`).

## The page shell (operator-granted HR1 exception)

HR1 says new markup lives in an SDC component, but two templates were
unavoidable:

- **`page.html.twig`:** droost_theme's page template hardcodes a navbar and
  footer. The theme's `templates/page.html.twig` has no markup of its own; it
  embeds `wildbills:page` and fills its three slots with the regions.
- **`html.html.twig`:** `templates/html.html.twig` is core's, with only the
  skip link changed, to "Skip to content" and `#main`.
- **The record:** the operator granted both for R01, and the spec records it.
  The house_rules gate reports both files, and nothing else.
- **Sticky header:** `.wb-region` and the block wrappers are
  `display: contents`, so the header's sticky position spans the page.

## Components

- **Frame components (disabled in Canvas):** `page`, `site_header` (with
  `site_header.js`, the mobile menu), `site_footer`, `brand` and `nav_link`.
  The theme's template and the `wildbills_site` blocks render them, so the
  dealership form stays their one source.
- **For editors:** `button`, `section_heading`, and the home sections
  `home_hero`, `promise_band`, `how_it_works`, `questions_split` and
  `closing_cta`.
  - Every string is a prop.
  - Repeated items are numbered props (four promises, four steps, four
    checklist lines), which Canvas edits as plain fields.
  - The two photos are Canvas image props, which take a media reference.

### The mobile menu

- **Below 860px:** the links fold into the menu button.
- **Escape:** closes the menu and returns focus to the button.
- **Widening past 860px:** closes it.
- **Parity:** the parity gate holds the header and footer to the source at
  1280 and 390 wide.
  - The drawer's links must be invisible while it is closed.
  - The brand's text must have no whitespace between its elements.

### Reveal on scroll

`js/reveal.js` adds `.wb-js` to `<html>` and reveals `.wb-reveal` as it enters
view. Without JavaScript nothing is hidden. Under `prefers-reduced-motion`
everything shows at once, with no transition.

## The Home page

- **The page:** `/` is `canvas_page` 1, with one root component per source
  section (HR2).
- **The tree file:** `droost/canvas/home.tree.json` is its tree. It names the
  photos `media:hero.jpg` and `media:lot.jpg`, not by media id, so it
  rebuilds on any site.
- **Rebuilding:** run `droost/canvas/apply-home.sh` after config import.
  1. `resolve-home.php`, run through `drush php:script`, makes or finds the
     "Lot at golden hour" and "Dealership office" image media.
  2. It writes a resolved copy of the tree.
  3. `droost/bin/canvas` runs `tree:validate` and then `tree:set 1` on that
     copy.
- **R02's sections:** `featured_vehicles` and `body_style_tiles` sit between
  the promise band and How it works, seven roots in all. Each is a section
  heading above a slot holding a Views block
  (`block.views_block.vehicles-block_featured`,
  `block.views_block.body_styles-block_tiles`; both enabled in Canvas).
- **The hero's count is live:** `home_hero` has no count prop. It reads
  `vehicle_count`, which `wildbills_site` hands it, and says "1 sample
  vehicle" for one.

## The inventory components (R02)

- **Who renders them:** Views and the `wildbills_inventory` style, so they are
  disabled in Canvas.
  - `vehicle_card`: one chip (Sale pending, then Featured, then body style),
    and the facts as `data-*` attributes.
  - `card_grid`: `kind: cars` or `kind: tiles`, three to a row. UI Patterns
    reserves a prop named `variant` for component variants, so the prop is
    `kind`.
  - `body_style_tile`: builds `/vehicles?type=<name>` with `url_encode`.
  - `filter_choice`: a button or an `<option>`.
  - `inventory`: the layout.
- **`page_head`** is enabled for the inner pages R03 and R04 build; /location opens with it.
- **`inventory.js`** (a behavior) does what the source's `vehicles.ts` does,
  over the cards already on the page:
  - search over year, make, model, colour and body style;
  - body style, make and the three sliders;
  - the five sorts (stable, from the default order);
  - chips, Clear all, Reset and the empty state;
  - `?type=` (unknown means All);
  - the 390 Filters toggle.
- **The pop-up:** it opens from Details (a link to `/vehicles?vehicle=N`,
  intercepted) or from `?vehicle=`. It is filled with `textContent`, keeps the
  parameter in the address while open, and on close drops it and returns
  focus. A car that is not listed (sold, unpublished) opens no pop-up.
- **The grid's CSS:** the inventory includes `card_grid`, so the grid's CSS is
  attached on /vehicles as well.

## The Location page (R03)

- **The page:** `/location` is a Canvas page, `canvas_page` 4 on this site. The `wildbills_site`
  deploy hook makes it.
- **The tree file:** `droost/canvas/location.tree.json` holds its tree, with fixed uuids. It has two
  roots (HR2): `page_head`, then `location_grid`.
  - **`main` slot:** `map_card`, `info_card` (Address, `detail: address`), and `info_card` (Before
    you head over, with its link to `/contact?topic=Test%20drive`).
  - **`aside` slot:** `hours_table`, and `closing_cta` with `layout: panel` ("Shortlist first.").
- **Rebuilding:** run `droost/canvas/apply-location.sh` after `drush deploy`. It finds the page by its
  alias, then runs `tree:validate` and `tree:set`.

### The location components (enabled in Canvas)

- **`location_grid`:** the source's `loc-grid`, with no props.
  - Two slots, `main` (1.3fr) and `aside` (1fr), with the rise delays.
  - One column below 900px.
- **`map_card`:** the source's SVG map art, the pin label, the caption (Q6), the map's accessible
  name, and two button labels.
  - **The links:** the URLs come from `wildbills_site` (`LocationDetails`). A button shows only when
    its URL exists, and both open in a new tab.
  - **Spacing:** the first info card after it gets `margin-top: 2.5rem` (`.wb-map + .wb-info`).
- **`info_card`:** a heading under a rule, an optional sentence, and a `.wb-link`.
  - `detail: address` prints the dealership's street and city in the display face. They come from
    `LocationDetails`, never a prop.
  - It adds the "sample" tag while the demo notices are on.
  - R04 added `address_text`, `phone`, `email` and `hours` (see the Contact page below).
- **`hours_table`:** the hours panel. Its props are the heading, the "Checking hours…" placeholder and
  the note (Q8: "Status uses the dealership's local time.").
  - **From `LocationDetails`:** the rows and the time zone. The "sample" tag follows the demo notices.
  - **`hours_table.js`** (a behavior) works out two things in the browser:
    - **today's row:** `.is-today`, `aria-current="date"` and " · today";
    - **the status:** open now, or when the lot next opens. It follows the source's `openStatus()`,
      in minutes, so half hours work.
  - **The clock:** both use the dealership's time zone (`Intl.DateTimeFormat` with `timeZone`), not
    the visitor's.
  - **Why the browser:** the page cache keeps the page for good, so the status and today's row are
    never decided on the server.
  - **Translated wording:** the sentences it fills in come from `data-*` attributes, translated in
    Twig with `@time` and `@day` placeholders.

### Changes to shared components

- **`closing_cta`** has `layout`: `band` (the default, the home page's full-width section) or `panel`.
  - `panel` is a compact one-column card with no section wrapper, 2rem padding, a 22px radius and a
    1.7rem heading.
  - It gets `margin-top: 1.2rem` after a sibling.
- **`button`** has `new_tab`, which adds `target="_blank" rel="noopener"`. The map card uses it.
- **Home is unchanged:** its tree keeps the Canvas versions it was written with, and renders as
  before.
- **`base.css`** now carries `.wb-link` (the source's `.link`) and `.wb-tag-sample` (`.tag-sample`),
  for R03 and R04.

## The Contact page (R04)

- **The page:** `/contact` is a Canvas page, `canvas_page` 5 on this site. The `wildbills_site`
  deploy hook makes it.
- **The tree file:** `droost/canvas/contact.tree.json` holds its tree, with fixed uuids. Two roots
  (HR2): `page_head`, then `contact_grid`.
  - **`main` slot:** `inquiry_form`.
  - **`aside` slot:** four `info_card`s: Phone (`detail: phone`, with "Placeholder number from the
    original site."), Email (`email`), Visit (`address_text`, "Hours & directions" → `/location`) and
    Hours (`hours`).
- **Rebuilding:** run `droost/canvas/apply-contact.sh` after `drush deploy`. It finds the page by its
  alias, then runs `tree:validate` and `tree:set`.

### The contact components (enabled in Canvas)

- **`contact_grid`:** the source's `contact-grid`, with no props: `main` (1.5fr) and `aside` (1fr, a
  1rem stack), one column below 900px. Its own component, not a `location_grid` variant: the ratio,
  gap and stacking all differ.
- **`inquiry_form`:** the form card and the hand-off.
  - **Props:** the page's fixed copy, 15 of them (the notice, the five labels, "optional", the
    placeholder, the button, the hand-off's warning, heading and three buttons).
  - **`|t` strings in the template:** what the script fills in or that carries a placeholder: the
    error messages, the count, the subjects and the mail's lines, the copy statuses, "ASKING ABOUT",
    "Remove", the hand-off sentence with the address, "sample address" and the filled-in message.
  - **From `wildbills_site` (`InquiryDetails`):** `email`, `vehicle` and `topic`. The car's card, the
    chosen topic and the message are rendered by the server, so the page never ships the inventory.
  - **No `name` attributes:** with JavaScript off, a submit reloads `/contact` with an empty query, so
    the visitor's words never reach a URL or a log.
  - **`inquiry_form.js`** (a behavior), as the source's `contact.ts`:
    - the count, the three checks (`aria-invalid`, focus to the first, re-checked as the visitor types);
    - the draft: "Inquiry: <car>" or "Website inquiry: <topic>", the body's lines, the `mailto:` and the
      preview;
    - Edit, Copy (the clipboard, else the preview selected) and Remove (the card, the Specific vehicle
      topic and the `vehicle` parameter go; the message keeps its words);
    - sentences are filled in one pass (`/@[a-z]+/`), so a value is never filled twice.
  - It depends on `core/components.wildbills--button` for its `wb-btn` buttons.
- **`info_card`:** `detail` also takes `address_text` (the address in body type), `phone`, `email` and
  `hours`. The link's `.8rem` gap now follows only the card's sentence (`.wb-info-text +
  .wb-info-link`), so the contact Visit card's link sits under the address as the source draws it;
  /location is unchanged.

### Shared form styles

`.wb-field`, `.wb-input` and `.wb-select` moved from `inventory.css` to `base.css`, unchanged, with
`.wb-textarea` and the `[aria-invalid="true"]` border beside them. The inventory and the inquiry form
both use them.

