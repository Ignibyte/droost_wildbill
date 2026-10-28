# Wild Bill's Used Cars — content model

The source is a four-page static dealership site (Vite, plain TypeScript, one stylesheet), delivered as
`design/Wild-Bills-Cars.zip` and unpacked to `design/src/Wild-Bills-Cars`. Its live app is
`artifacts/wildbills`; everything else in the zip is a template's scaffolding (see Not built). Its data is
one file, `src/site/shared.ts`: 15 vehicles, the week's hours, the dealer's contact lines and the nav.
Every record is a sample (Q2, Q3), and launches as the first content behind a demo switch.

The site already has: Canvas 1.12 with `canvas_page` 1 "Home" as the front page; `droost_theme` as the
default theme; the `main` and `footer` menus; Media (image), Pathauto, Redirect, Views, Metatag. It has
no custom code yet, and no Webform (none is needed: Q4). The recipe's `event` type, its feed and the
`tags` vocabulary are not part of this source and are left as installed, linked from nowhere.

House rules: HR1 (new markup lives in an SDC component) shapes every component row; HR2 (a landing page
is a Canvas page, one component per section, written with `droost/bin/canvas tree:set`) shapes the home,
location and contact pages.

## Constructs

| Construct | What it is | Evidence | Rung | Confidence | Why |
|---|---|---|---|---|---|
| Wild Bill's theme | a custom theme, a sub-theme of droost_theme | frame, p:/#s1 | 1 | high | the source's forest green, cream and sage palette, its three faces (Bricolage Grotesque, Geist, Geist Mono, all drawn), radii, spacing, focus rings and reduced-motion rules as tokens; HR1 puts its markup in SDCs |
| Site identity | site configuration | frame | 1 | high | the site name "Wild Bill's Used Cars" (now "Drush Site-Install"), the green favicon and theme colour, and each page's title as the source writes it |
| Dealership details | a settings form in a custom module, kept in config | frame, p:/contact#s2, p:/location#s2 | 1 | high | name, phone, email, street and city in one place an editor changes (Q1); config, not a custom block, per the canvas-build skill's Canvas 1.12 trap; every page reads it |
| Dealership details: weekly hours | a setting, an opening and closing hour per day | d:src/site/shared.ts#HOURS, d:src/site/shared.ts#Hours, p:/location#r1, p:/#r8, p:/vehicles#r8, p:/contact#r4, p:/location#r4 | 1 | high | seven records of open and close hours; the footer's "Mon–Fri 8am–7pm" summary, the contact page's list and the location table are all worked out from it, so an editor changes hours once |
| Dealership details: time zone | a setting | p:/location#r1 | 1 | high | the open status is reckoned in it (Q8); America/Chicago to start, the site's default |
| Dealership details: demo notices | a setting, on or off | frame | 1 | high | Q2: the demo bar, the "sample" tags and labels and the footer's demonstration line all show while it is on; an editor turns it off once real data is in |
| Main menu | a menu | frame, p:/#r1, p:/vehicles#r4, p:/contact#r2, p:/location#r2, d:src/site/shared.ts#NAV | 1 | high | Home, Inventory, Contact, Visit; reuses the recipe's main menu, its Home link pointed at the front page |
| Footer menu | a menu | frame, p:/#r6, p:/vehicles#r6, p:/contact#r3, p:/location#r3 | 1 | high | Home, Inventory, Contact, Location & hours; reuses the recipe's footer menu without its Privacy policy and My privacy settings links (Q7) |
| Site header | a component | frame | 1 | high | the demo bar, the WB brand, the primary nav with the current page marked, "Browse cars", and the mobile menu with its Call button |
| Site footer | a component | frame | 1 | high | the brand and its line, Pages, Hours (sample) and Contact (sample) from the dealership details, the year and the two footnotes |
| Home page | a Canvas page | r:/, p:/ | 1 | high | reuses `canvas_page` 1 "Home", the front page; HR2: one component per section |
| Home: hero | a component | p:/#s1 | 1 | high | headline with its italic word, lede, two buttons, the lot photo (hero.jpg, looked at: trucks and cars on a lot at dusk) and its tag |
| Home: hero's vehicle count | a value worked out from the vehicles | p:/#s1 | 2 | high | the source hardcodes "15 sample vehicles"; counting the listed vehicles (available and sale pending) keeps it true when an editor adds one or marks one sold |
| Home: promise band | a component | p:/#r2 | 1 | high | four fixed title and line pairs: copy an editor changes in Canvas, not records |
| Section heading | a component | p:/#s2, p:/#s3, p:/#s4 | 1 | high | eyebrow, heading, optional lede and optional button, used by every home section |
| Home: how it works | a component | p:/#s4, p:/#r4 | 1 | high | four numbered steps; the numbers are their order, not a field |
| Home: questions to ask | a component | p:/#s5, p:/#r5 | 1 | high | the office photo (lot.jpg, looked at), heading, lede, four checklist lines and two buttons |
| Home: closing call to action | a component | p:/#s6 | 1 | high | the dark panel with two buttons; the location page reuses it ("Shortlist first.") |
| Redirect /index.html | a redirect to / | r:/ | 1 | high | the static source's address for the home page keeps answering |
| Vehicle | a content type | d:src/site/shared.ts#VEHICLES, d:src/site/shared.ts#Vehicle, p:/vehicles#r1, p:/#r3 | 2 | high | 15 records the inventory cards render; the home page's four are the same records, featured |
| Vehicle: title | a value worked out from year, make and model | d:src/site/shared.ts#VEHICLES | 2 | high | "2021 Ford F-150" is the source's `vehicleName()`; set on save, never typed |
| Vehicle: stock number | an integer field, unique | d:src/site/shared.ts#VEHICLES, p:/vehicles#r1 | 2 | high | the record's `id`: "STOCK #001", `?vehicle=1` and the inquiry carry it; an editor types it because a real lot numbers its own stock, and node ids would not match the source's links |
| Vehicle: make | a reference to Make | d:src/site/shared.ts#VEHICLES, p:/vehicles#r2 | 2 | high | seven makes the Make filter lists once each, after "All makes" |
| Vehicle: model | a text field | d:src/site/shared.ts#VEHICLES, p:/vehicles#r1 | 2 | high | "F-150", "Sierra 1500" |
| Vehicle: year | an integer field | d:src/site/shared.ts#VEHICLES, p:/vehicles#r1 | 2 | high | |
| Vehicle: price | an integer field, whole dollars | d:src/site/shared.ts#VEHICLES, p:/vehicles#r1 | 2 | high | always a number (Q9); shown as "$38,900" |
| Vehicle: body style | a reference to Body style | d:src/site/shared.ts#Vehicle, p:/vehicles#r5, p:/#r7 | 2 | high | the source's closed three became terms staff add to at the roadmap review (vans, minivans, coupes) |
| Vehicle: sale status | a list field: Available, Sale pending, Sold | d:src/site/shared.ts#VEHICLES | 2 | high | added at the roadmap review: cars sell. A sold car leaves the listing, the home page, the count and the filters' choices; a pending one stays, with a "Sale pending" chip (Q10); a link to a sold car opens as for any unlisted car (Q11); the 15 samples start Available |
| Body style | a vocabulary: name, plural name, tile line, tile photo, order | d:src/site/shared.ts#Vehicle, p:/vehicles#r5, p:/#r7 | 2 | high | added at the roadmap review; Truck, SUV and Car to start with the source's words ("Trucks", "Haul, tow, work") and photos (v6, v9, v11). The name is what `?type=` and the card's "2021 · TRUCK" carry, the plural what the filter button, its chip and the tile say; the filter and the home tiles show every body style with a car on the lot, in the order staff set (Q12) |
| Vehicle: mileage | an integer field | d:src/site/shared.ts#VEHICLES, p:/vehicles#r1 | 2 | high | shown as "42,000 mi" |
| Vehicle: color | a text field | d:src/site/shared.ts#VEHICLES, p:/vehicles#r1 | 2 | high | a maker's colour name, free text |
| Vehicle: condition | a list field: Excellent, Good, Fair | d:src/site/shared.ts#Vehicle | 2 | high | shown in the details pop-up |
| Vehicle: featured | a boolean field | d:src/site/shared.ts#VEHICLES, p:/#r3 | 2 | high | puts a vehicle on the home page and first in the default sort, with a Featured chip |
| Vehicle: photo | a media image reference | p:/vehicles#r1 | 2 | high | v1–v15.jpg, each looked at against its record: all 15 show the make, model and colour they claim (generated illustrations, as the handoff says) |
| Make | a vocabulary | d:src/site/shared.ts#VEHICLES, p:/vehicles#r2 | 2 | high | Chevrolet, Dodge, Ford, GMC, Jeep, RAM, Toyota: one spelling per make, so "Chevy" never splits the filter |
| The 15 sample vehicles | content, imported | d:src/site/shared.ts#VEHICLES | 2 | high | Q2: the first content, with their photos, all Available |
| Vehicle card | a component, the Vehicle's teaser display | p:/vehicles#r1, p:/#r3 | 2 | high | photo, a Sale pending, Featured or body-style chip (in that order of precedence), year and body style, make and model, miles and colour, price with its "Sample price" label, Details |
| Inventory | a View page at /vehicles | r:/vehicles, p:/vehicles#r1 | 2 | high | every listed vehicle (published, not sold) as a card, with the page heading above |
| Page heading | a component | p:/vehicles#s1, p:/contact#s1, p:/location#s1 | 2 | high | eyebrow, h1 and lede, shared by the three inner pages |
| Inventory filters | a component | p:/vehicles#s2, p:/vehicles#r2, p:/vehicles#r3, p:/vehicles#r5, p:/vehicles#r7 | 2 | high | search, body style (a button per body style with a car on the lot, Q12), make, maximum price, minimum year, maximum mileage, five sorts, the active-filter chips, the result count, the empty state with reset, the mobile toggle and `?type=`; it filters the View's cards in the browser as the source does; the sliders' ends follow the inventory, so a vehicle an editor adds is never filtered out by default |
| Vehicle details pop-up | a component | p:/vehicles#r1 | 2 | high | Q5: the stock number, price, a "Sale pending" chip when it is (Q10), the six-row spec table, the sample note, "Ask about this car" and Call; Escape and an outside click close it and focus returns; `?vehicle=<stock number>` opens it |
| A vehicle's own address | a redirect to /vehicles?vehicle=<stock number> | p:/vehicles#r1 | 2 | high | Q5: a vehicle has no page of its own; its node address opens the pop-up |
| Home: featured vehicles | a View block | p:/#s2, p:/#r3 | 2 | high | the featured vehicles that are not sold, as cards whose Details opens /vehicles?vehicle=<stock number> |
| Home: shop by body style | a View block of Body style tiles | p:/#s3, p:/#r7 | 2 | high | a tile per body style with a car on the lot (Q12), each with its line and photo, linking to /vehicles?type=…; three to a row as the source's |
| Redirect /vehicles.html | a redirect to /vehicles, its query string carried | r:/vehicles | 2 | high | `/vehicles.html?type=Truck` and `?vehicle=3` keep working |
| Location & hours page | a Canvas page at /location | r:/location, p:/location | 3 | high | HR2; its heading, map, address, advice and the closing call to action are copy |
| Hours table | a component | p:/location#r1, d:src/site/shared.ts#HOURS | 3 | high | Monday to Sunday from the weekly hours, today marked, and the open status ("Open now · closes 7:00pm") reckoned in the dealership's time zone (Q8), worked out in the browser so a cached page stays right |
| Map card | a component | p:/location#s1 | 3 | high | the illustrative map graphic and its caption, kept (Q6), with Google Maps and Apple Maps links built from the address |
| Info card | a component | p:/location#s2, p:/contact#s2 | 3 | high | a titled card with an optional "sample" tag; the address and advice here, the four contact cards on /contact |
| Redirect /location.html | a redirect to /location | r:/location | 3 | high | |
| Contact page | a Canvas page at /contact | r:/contact, p:/contact | 4 | high | HR2; the heading, the form and the four contact cards |
| Inquiry form | a component that drafts an email in the browser | p:/contact#f1, p:/contact#r1 | 4 | high | Q4: name, email, optional phone, topic (six fixed choices), message to 1,000 characters; the source's validation messages; `?vehicle=<stock number>` fills the vehicle, topic and message and `?topic=` the topic; the "Not sent yet" draft with Open in email app, Copy and Edit; nothing is posted to the site, so its words stay true |
| Redirect /contact.html | a redirect to /contact, its query string carried | r:/contact | 4 | high | `/contact.html?vehicle=3` keeps working |

## Routes

- / — the home page, a Canvas page (the front page)
- /vehicles — the inventory, a View page with its filters and the vehicle details pop-up
- /location — location and hours, a Canvas page
- /contact — the inquiry form and contact details, a Canvas page

## Not built

| Evidence | Why not |
|---|---|
| design/src/Wild-Bills-Cars/artifacts/api-server | the template's API server: a health check only, which the README says the dealership does not use |
| design/src/Wild-Bills-Cars/artifacts/mockup-sandbox | a separate design-preview service, not the site |
| design/src/Wild-Bills-Cars/lib | the template's shared libraries and an empty database schema, unused by the dealership |
| design/src/Wild-Bills-Cars/artifacts/wildbills/public/opengraph.jpg | scaffold material the handoff says is not an approved marketing asset |
