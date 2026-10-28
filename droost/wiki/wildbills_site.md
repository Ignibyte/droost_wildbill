---
type: "Drupal Module"
title: "wildbills_site"
droost:
  spec: 1
  modules: [wildbills_site]
  sources:
    - path: web/modules/custom/wildbills_site/wildbills_site.info.yml
      hash: "xxh3:b803fd40821f2535"
    - path: web/modules/custom/wildbills_site/wildbills_site.install
      hash: "xxh3:7969cb7da3bc319e"
    - path: web/modules/custom/wildbills_site/config/install/wildbills_site.dealership.yml
      hash: "xxh3:192bb967f05844e6"
    - path: web/modules/custom/wildbills_site/config/schema/wildbills_site.schema.yml
      hash: "xxh3:90c4b4236940daff"
    - path: web/modules/custom/wildbills_site/src/Dealership.php
      hash: "xxh3:c0659f835d64fe44"
    - path: web/modules/custom/wildbills_site/src/HoursSummary.php
      hash: "xxh3:970328ebfd38d91d"
    - path: web/modules/custom/wildbills_site/src/DemoNotices.php
      hash: "xxh3:fcab6e8a275b96bb"
    - path: web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php
      hash: "xxh3:beb9c81fc23902a8"
    - path: web/modules/custom/wildbills_site/src/Form/DealershipSettingsForm.php
      hash: "xxh3:953697ffb3706f58"
    - path: web/modules/custom/wildbills_site/src/Plugin/Block/SiteFrameBlockBase.php
      hash: "xxh3:4d743bb13b89b7d1"
    - path: web/modules/custom/wildbills_site/src/Plugin/Block/SiteHeaderBlock.php
      hash: "xxh3:6e79e7e6b10ce7bb"
    - path: web/modules/custom/wildbills_site/src/Plugin/Block/SiteFooterBlock.php
      hash: "xxh3:b698b98245698e71"
    - path: web/modules/custom/wildbills_site/wildbills_site.services.yml
      hash: "xxh3:5c1c728a89673747"
    - path: web/modules/custom/wildbills_site/wildbills_site.deploy.php
      hash: "xxh3:b7e403c26cc233a1"
    - path: web/modules/custom/wildbills_site/content/vehicles.yml
      hash: "xxh3:7f94716d00cf7b94"
    - path: web/modules/custom/wildbills_site/src/Inventory.php
      hash: "xxh3:8538cac5432bfa76"
    - path: web/modules/custom/wildbills_site/src/InventoryFacets.php
      hash: "xxh3:bca835f766a21725"
    - path: web/modules/custom/wildbills_site/src/VehicleTitle.php
      hash: "xxh3:8752f2b61f7dc1f2"
    - path: web/modules/custom/wildbills_site/src/VehicleCount.php
      hash: "xxh3:a067a598d69761cf"
    - path: web/modules/custom/wildbills_site/src/EventSubscriber/VehicleRedirectSubscriber.php
      hash: "xxh3:a79de242a4e4160d"
    - path: web/modules/custom/wildbills_site/src/Plugin/views/style/InventoryStyle.php
      hash: "xxh3:02312413c49eb954"
    - path: config/sync/views.view.vehicles.yml
      hash: "xxh3:756eb1d60b86f330"
    - path: config/sync/views.view.body_styles.yml
      hash: "xxh3:3bcf4301182047aa"
    - path: config/sync/node.type.vehicle.yml
      hash: "xxh3:52804820cb5e1514"
    - path: web/modules/custom/wildbills_site/src/LocationDetails.php
      hash: "xxh3:9c2093bc97b643f5"
    - path: web/modules/custom/wildbills_site/src/HoursTable.php
      hash: "xxh3:2222e29a591433b5"
    - path: web/modules/custom/wildbills_site/src/InquiryDetails.php
      hash: "xxh3:841c8fb3de604704"
---

# wildbills_site

The dealership's details in one place, and the site header and footer that
show them. Built in R01 (`droost/intake/tickets/R01.md`). Later rungs read the
same details: R03's hours table and open status, R04's contact cards and
inquiry form.

## The details

`wildbills_site.dealership` holds:

| Key | What it holds |
|---|---|
| `name` | "Wild Bill's Used Cars", used in the copyright and the brand link's name |
| `phone` | the number as shown |
| `email` | the email address |
| `street`, `city` | the two address lines |
| `timezone` | America/Chicago; the clock the hours are kept in (Q8; R03 reckons "Open now" in it) |
| `demo_notices` | the demo switch (Q2) |
| `hours` | seven days, `sunday` to `saturday`, each `{open, close}` as `HH:MM`, both empty when closed |

- **Shipped values:** the defaults are the source's samples (`shared.ts`
  `DEALER` and `HOURS`), with the notices on.
- **The form:** `DealershipSettingsForm` at `/admin/config/system/dealership`
  edits every key in one place (Q1).
  - Each day has a Closed box and open and close times.
  - It checks the email, the `HH:MM` format, and that each day closes after it
    opens.
  - It needs the `administer dealership details` permission, which
    `content_editor` holds.

## Reading them

**Read the details through `Drupal\wildbills_site\Dealership`, never the
config directly.** It gives:

- `phoneHref()`: the digits as a `tel:` link, with `+1` for ten digits.
- `hoursSummary()`: `HoursSummary::lines()`.
- `mapsQuery()`, `googleMapsUrl()` and `appleMapsUrl()`: "street, city", searched in each service.
  It is encoded with `rawurlencode`, as the source's `encodeURIComponent` does. With no address
  they return `''`.
- `cacheability()`: the config's cache tag.

`HoursSummary` is pure and unit-tested. Monday to Sunday, consecutive days with
the same hours group (`lines()` takes the time format as an optional second
argument; R04's Hours card passes `HoursTable::formatTime` for "8:00am"):

- A run of days reads "Mon–Fri 8am–7pm".
- A single day reads "Saturday 9am–6pm".
- A closed day reads "Sunday closed".
- Times off the hour print as "8:30am".

## The header and footer

- **Blocks:** `SiteHeaderBlock` and `SiteFooterBlock`, on `SiteFrameBlockBase`,
  render the theme's `wildbills:site_header` and `wildbills:site_footer`
  components.
- **Links:** menu links arrive in the components' slots as `wildbills:nav_link`
  components. Canvas has no field shape for an array of objects, and every
  custom component must meet Canvas's requirements (the component_lint gate).
- **Current page:** the header marks the link whose URL is the current path
  (`<front>` on the front page). It varies by `url.path`.
- **Brand lines:** "WB", "Wild Bill's" and "Used Cars", with the header's
  button and the footer's line, are block settings with their own schema.

## The demo switch

- **Blocks:** the header and footer read `demo_notices` themselves.
- **Canvas components:** for a component placed in Canvas (the home hero's
  "15 sample vehicles"), `DemoNotices::preRender()` runs ahead of the
  component element's own pre-render.
  - `WildbillsSiteHooks::elementInfoAlter()` puts it there.
  - It sets a `demo_notices` variable on every `wildbills:*` component and adds
    the config's cache tag, so a cached page follows the switch.
  - The variable is not a declared prop, so Canvas never offers it to editors.

## The copyright year

- **The tag:** the footer prints the year and carries the
  `wildbills_site:copyright_year` cache tag.
- **Why cron:** the page cache keeps pages permanently and ignores max-age.
  So `WildbillsSiteHooks::cron()` invalidates the tag on the first cron run of
  a new year.
- **State:** the state key `wildbills_site.copyright_year` holds the year last
  printed.

## Content it writes

`hook_install()` writes content only, and is safe to run again:

- **Menus:** the main and footer menus as the design names them.
- **Removed (Q7):** the recipe's Privacy policy and My privacy settings links.
- **Redirect:** a 301 from `index.html` to `/`.

The home page's photos and tree are not here. `droost/canvas/apply-home.sh`
writes them after config is in place (see the `wildbills` page).

## The vehicles (R02)

Built in R02 (`droost/intake/tickets/R02.md`; spec
`droost/droost-workflow/spec-r02-vehicles.md`, whose Realized section says why
each choice was made).

### The model (config/sync)

- **Vehicle** (`vehicle`): stock number (unique), make (→ Make), model, year,
  price (whole dollars), body style (→ Body style), mileage, colour, condition
  (excellent / good / fair), featured, sale status (available / pending /
  sold), photo (image media). The title is written, never typed.
- **Make** (`make`): one spelling per make, so the filter lists each once.
- **Body style** (`body_style`): name (what `?type=` and "2021 · TRUCK" carry),
  plural name, tile line and tile photo. The term weight is the order staff
  set on the vocabulary's overview page.
- **On the editorial workflow.** Core gives the Published box only to
  `administer nodes`, so content editors publish and unpublish cars through
  `basic_editorial`, like pages. The site's ECA model `auto_enable_moderation`
  puts every new type there anyway.
- **No alias, no menu, no sitemap.** `nodePresave()` tells Pathauto to skip
  vehicles (the recipe's `menu_path` pattern matches every node).
- **Editors** (`content_editor`) create, edit and delete vehicles and both
  vocabularies' terms, and reach the vocabulary overview.

### Listed

A car is **listed** while it is published and its sale status is not Sold.

- **Where the rule lives:** in two places that must agree. `Inventory` (the
  hero's count) and the Views' filters (`vehicles`, `body_styles`) each state
  it. Change one, change the other.
- **Sale pending** cars stay listed, with a "Sale pending" chip (Q10).
- **Sold** cars leave the cards, the featured cars, the count and the
  filter's choices (Q11).

### /vehicles

- **The View:** `views.view.vehicles` `page_inventory`, sorted featured first,
  then by stock number. Its rows are UI Patterns `ComponentRow` →
  `wildbills:vehicle_card`, with props bound to field properties and tokens.
- **The style:** `wildbills_inventory` (`InventoryStyle`) wraps the rows in
  `wildbills:inventory`:
  - the page heading, from the style's options;
  - the body-style buttons and make options as `wildbills:filter_choice`
    slots;
  - the slider ends;
  - the dealership's tel link for the pop-up's Call button.
  It adds the `node_list`, `taxonomy_term_list` and dealership cache tags.
- **`InventoryFacets`** (pure, unit-tested) works out:
  - the body styles present, by weight and then name;
  - the makes present, each once;
  - the ranges. These are the source's ($25,000–$60,000 step 500,
    2019–2022, 10,000–80,000 step 5,000), widened (rounded out to the step) to
    hold any listed car.
- **In the browser:** filtering, sorting, chips, `?type=`, `?vehicle=` and the
  pop-up are `inventory.js` in the theme (see the `wildbills` page).
- **A vehicle's node address** answers 301 to `/vehicles?vehicle=<stock>`
  (`VehicleRedirectSubscriber`, after routing and access). `/vehicles.html`
  redirects with its query (a redirect entity; `passthrough_querystring` is
  on).

### The home page's picks

- **`vehicles` `block_featured`:** the listed featured cars, in
  `wildbills:card_grid`.
- **`body_styles` `block_tiles`:** body-style terms joined to their listed
  vehicles, grouped by term. That gives a tile per body style with a car on
  the lot, in staff order.
- **The hero's count:** `VehicleCount::preRender`, beside `DemoNotices`, gives
  `wildbills:home_hero` its `vehicle_count`.

### Sample content

`wildbills_site_deploy_r02_vehicles()` (`wildbills_site.deploy.php`) runs with
`drush deploy:hook`, after config import. It reads `content/vehicles.yml` (the
source's `VEHICLES`) and `content/images/v1–v15.jpg`.

- **What it writes:**
  - the makes;
  - the three body styles (tiles v6, v9, v11);
  - the 15 photos as image media named "<year> <make> <model>, <colour>";
  - the 15 vehicles, published and Available;
  - the `/vehicles.html` redirect.
- **Running it again:** it matches by name and stock number, so a second run
  creates nothing.
- **Trash:** a deleted car stays in Trash, and its stock number stays taken
  until it is purged.

## The location page (R03)

Built in R03 (`droost/intake/tickets/R03.md`). The spec,
`droost/droost-workflow/spec-r03-location.md`, has a Realized section that says why.

- **`HoursTable`** (pure, unit-tested) lays the week out Monday to Sunday, as the source's
  `fmtHour()` prints it: "8:00am – 7:00pm", or "Closed". It differs from the footer's "8am–7pm".
  - Each row carries `weekday` (Sunday 0, as JavaScript counts), the `HH:MM` times and their printed
    forms.
  - The browser works out today and the status from these, and never formats a time itself.
  - A day with a missing or malformed time is closed (`HoursSummary::isTime`).
- **`LocationDetails::preRender`**, beside `DemoNotices` and `VehicleCount` in `elementInfoAlter()`,
  hands the location components the dealership's values:
  - `wildbills:map_card` gets `google_url` and `apple_url`.
  - `wildbills:info_card` with `detail: address` gets `street` and `city`.
  - `wildbills:hours_table` gets `rows` (with translated day names) and `timezone`.

  Each also gets the details' cache tag. It returns at once for any other component.
  - **Why not props:** the address and hours are never Canvas props, so editors cannot type over
    them.
  - **What wins:** the dealership's value wins over a prop of the same name.
- **`wildbills_site_deploy_r03_location_page()`** makes the Canvas page "Location & Hours": its
  description, the `/location` alias (Pathauto skipped), and its own `metatags` with the title
  `[canvas_page:title] — [site:name]`.
  - **The title tag:** Canvas gives each new page a `|` title of its own, which overrides
    `metatag.metatag_defaults.canvas_page`. So the page's own value is set here, as R04's Contact
    page also does.
  - **The redirect:** the hook also makes the `location.html` → `/location` redirect, which carries
    the query.
  - **Running it again:** it skips a page already at `/location` and an existing redirect.
  - **The page's tree:** the hook does not write it. `droost/canvas/apply-location.sh` does (see the
    `wildbills` page).
  - **The name:** it is not `…_r03_location`, because R03's abandoned first attempt already used
    that name in this database's deploy-hook registry.
- **Menu links (a known coupling):** R01's "Visit" (main) and "Location & hours" (footer) links point
  at `/location`.
  - Deleting the Location page deletes both, through menu_link_content's entity predelete.
  - Re-running `wildbills_site_install()` puts them back, since it is safe to run again.

## The contact page (R04)

Built in R04 (`droost/intake/tickets/R04.md`). The spec,
`droost/droost-workflow/spec-r04-contact.md`, has a Realized section that says why.

- **The contact cards:** `LocationDetails` hands `wildbills:info_card` the values for every `detail`:
  - `address` and `address_text` get `street` and `city`;
  - `phone` gets `phone` and `phone_href`;
  - `email` gets `email`;
  - `hours` gets `hours`, the lines of `HoursSummary::lines()` with `HoursTable::formatTime`
    ("Mon–Fri 8:00am–7:00pm", "Saturday 9:00am–6:00pm", "Sunday closed").
- **`Inventory::listedByStock(int)`** finds the listed car with a stock number, on the same
  `listedQuery()` as the count. A sold or unpublished car is not found (Q11); a pending one is (Q10).
- **`InquiryDetails::preRender`** (fourth in `elementInfoAlter()`, after `LocationDetails`) hands
  `wildbills:inquiry_form` what the link asks for. It returns at once for any other component.
  - `email`: the dealership's.
  - `vehicle`: when `?vehicle=` is all digits (`stock()`) and names a listed car, its padded stock
    ("001"), name, price, miles, colour, photo (`4_3_300x225_focal_point_webp`) and listing path
    (`/vehicles?vehicle=<stock>`); otherwise NULL.
  - `topic`: Specific vehicle with a car; otherwise `?topic=` when it is one of `TOPICS`; otherwise
    General question. `props()` holds this rule and is unit-tested.
  - **Cacheability:** the dealership's tag, `node_list` and `taxonomy_term_list`, and the
    `url.query_args:vehicle` and `url.query_args:topic` contexts. The page cache keys on the whole URL,
    so each link is its own cached page, and a sale clears a cached card.
  - **`TOPICS` are values**, not wording: /location links `?topic=Test%20drive`, the inventory's empty
    state `?topic=Vehicle%20search`, and the draft's subject carries the value. Renaming one breaks
    those links. The template translates what the visitor reads.
- **Nothing is sent or stored (Q4).** No route, form API, Webform or mailer is involved: the browser
  drafts a `mailto:`.
- **`wildbills_site_deploy_r04_contact_page()`** makes the Canvas page "Contact": its description,
  the `/contact` alias (Pathauto skipped), its own `metatags` (`[canvas_page:title] — [site:name]`),
  and the `contact.html` → `/contact` redirect, which carries the query. It skips what exists. The
  page's tree is `droost/canvas/apply-contact.sh`'s (see the `wildbills` page).
- **Menu links:** R01's main and footer "Contact" links point at `/contact`. Deleting the Contact page
  deletes them, as with Location; re-running `wildbills_site_install()` puts them back.

