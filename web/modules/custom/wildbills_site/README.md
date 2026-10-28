# Wild Bill's site (`wildbills_site`)

The dealership's details, kept in one place, and the two blocks that put them
on every page. Since R02, also the vehicles on the lot: their titles, the
inventory page's style, the redirects and the home hero's count.

## What it holds

- **`wildbills_site.dealership`** (config): name, phone, email, street, city,
  the week's hours (`hours.<day>.open` / `.close` as `HH:MM`, both empty when
  closed), the time zone (America/Chicago to start) and `demo_notices`.
  It ships the source's sample details, with the notices on.
- **The form** at `/admin/config/system/dealership` (Configuration → System →
  Dealership details). The `administer dealership details` permission guards
  it, and `content_editor` holds that permission.
- **`Dealership`** (service `wildbills_site.dealership`) is the one reader of
  that config:
  - `phoneHref()` builds a `tel:` link from the shown number (ten digits get
    `+1`).
  - `hoursSummary()` gives the footer's lines.
  - `cacheability()` returns the config's cache tag.
- **`HoursSummary`** walks Monday to Sunday and groups consecutive days with the
  same hours:
  - A run of days reads "Mon–Fri 8am–7pm".
  - A single day keeps its full name ("Saturday 9am–6pm").
  - A closed day reads "Sunday closed".
- **Blocks:**
  - `wildbills_site_header` renders the `wildbills:site_header` component from
    the details and the `main` menu, marking the current page.
  - `wildbills_site_footer` renders `wildbills:site_footer` from the details and
    the `footer` menu.
  - Both have block settings for the brand lines. The header's settings also
    hold its button, and the footer's the line under the brand.
- **The demo switch reaches Canvas components.** `DemoNotices` runs before
  every `wildbills:*` component renders. It gives the component a
  `demo_notices` variable and the config's cache tag, so the home hero's
  "15 sample vehicles" drops "sample" when an editor turns the notices off.
- **The copyright year:**
  - The footer carries the `wildbills_site:copyright_year` tag.
  - `hook_cron()` invalidates that tag on the first cron run of a new year,
    because the page cache ignores max-age.
- **`hook_install()`** writes content only:
  - Main menu: Home, Inventory, Contact, Visit.
  - Footer menu: Home, Inventory, Contact, Location & hours.
  - It deletes the recipe's "Privacy policy" and "My privacy settings" links.
  - It adds a 301 from `/index.html` to `/`.
  - It is safe to run again.

## The vehicles (R02)

- **Listed** means published and not Sold. A Sale pending car is listed (Q10).
  The `Inventory` service (`wildbills_site.inventory`) counts listed cars and
  gives a car's facts. The `vehicles` and `body_styles` Views filter the same
  way.
- **Title:** `nodePresave()` writes "<year> <make> <model>" (`VehicleTitle`) on
  every save. The form has no title field. It also tells Pathauto to skip
  vehicles, because a vehicle has no page of its own.
- **Stock number:** unique among vehicles. `UniqueField` is added in
  `entity_bundle_field_info_alter`. A deleted car sits in Trash, and its number
  stays taken until it is purged.
- **A vehicle's address** (`/node/<nid>`) answers 301 to
  `/vehicles?vehicle=<stock number>` (Q5, `VehicleRedirectSubscriber`). It runs
  after routing and access, so an unpublished car is refused, never redirected.
- **`/vehicles`:** the `wildbills_inventory` Views style renders the
  `wildbills:inventory` component around the cards. Its options hold the
  heading, eyebrow and lede.
  - **Body-style buttons:** the body styles with a car on the lot, in staff
    order (term weight, then name), labelled with their plural names.
  - **Makes:** the makes of the listed cars, each once.
  - **Sliders:** they run the source's ranges ($25k–$60k, 2019–2022, 10k–80k).
    A listed car outside a range widens it, rounded to the slider's step.
  - `InventoryFacets` works this out and is unit-tested. The filtering itself
    happens in the browser.
- **The hero's count:** `VehicleCount` gives `wildbills:home_hero` a
  `vehicle_count`, with the `node_list` and `taxonomy_term_list` tags. The
  hero reads "<n> sample vehicles".
- **Sample content:** `wildbills_site_deploy_r02_vehicles()` in
  `wildbills_site.deploy.php` runs with `drush deploy` / `drush deploy:hook`,
  after config import. From `content/vehicles.yml` and `content/images/` it
  writes:
  - the 7 makes;
  - Truck, SUV and Car, with their plurals, lines and tile photos;
  - the 15 photos as image media;
  - the 15 vehicles, published and Available;
  - the 301 from `/vehicles.html`, which carries its query.

  It is safe to run again.

## Using it

- **Change a detail:** edit it in the form. The header, the footer and every
  page that shows it follow on the next view.
- **Launch with real data:** untick "Show the demo notices". The demo bar, every
  "(sample)" and "sample" label, and the footer's demonstration lines all go.
- **Add a car:** Content → Add content → Vehicle. Enter the stock number, make,
  model, year, price, mileage, colour and condition, and choose the body style
  and photo. Save as Published. Vehicles are on the Basic editorial workflow:
  to take a car off every page, change it to Unpublished.
- **Sell a car:** set its Sale status to Sale pending (it stays listed, marked)
  or Sold (it leaves the inventory, the home page and the count).
- **Feature a car:** tick Featured. It appears on the home page and first in
  the inventory.
- **Add a body style:** Structure → Taxonomy → Body style. Give it a name (what
  `?type=` and the card carry), a plural name, a tile line and a tile photo.
  Drag the body styles into order on that page. A body style shows on the
  filter and the home page once a car of it is listed.

## Tests

- **Unit tests** (`tests/src/Unit`): `HoursSummaryTest`, `DealershipTest`,
  `WildbillsSiteHooksTest`, `VehicleTitleTest` and `InventoryFacetsTest`. Run
  them with `vendor/bin/phpunit` from the project root.
- **Browser tests:** `tests/e2e/frame.spec.ts`, `tests/e2e/dealership.spec.ts`,
  `tests/e2e/inventory.spec.ts` and `tests/e2e/vehicle-admin.spec.ts`. The last
  one runs as a throwaway content editor and puts the samples back afterwards.
