# Source audit

http://localhost:4321/ and the files in `/var/www/html/design/src/Wild-Bills-Cars/artifacts/wildbills`, read 2026-10-22T21:55:03.688Z.

## Routes

| Id | Status | Declared | Note |
|---|---|---|---|
| `r:/` | 200 |  |  |
| `r:/contact` | 200 |  |  |
| `r:/location` | 200 |  |  |
| `r:/vehicles` | 200 |  |  |

## Frame

Header: WB Wild Bill's Used Cars → / · Home → / · Inventory → /vehicles.html · Contact → /contact.html · Visit → /location.html · Browse cars → /vehicles.html

Footer: WB Wild Bill's Used Cars → / · Home → / · Inventory → /vehicles.html · Contact → /contact.html · Location & hours → /location.html · (555) 123-4567 → tel:+15551234567 · wildbill@wildbillscars.com → mailto:wildbill@wildbillscars.com

## Typefaces

- Geist, on 213 text(s): drawn
- Geist Mono, on 115 text(s): drawn
- Bricolage Grotesque, on 88 text(s): drawn

## `p:/` — Wild Bill's Used Cars — Straightforward used cars, trucks and SUVs

Sections: `p:/#s1` Good used cars. sold. Plainly · `p:/#s2` Featured this week · `p:/#s3` What do you need it to do? · `p:/#s4` Four steps. No runaround. · `p:/#s5` Bring your questions. We'd rather you ask. · `p:/#s6` Found one you like?

- `p:/#r1` links, 4 in nav
  - 1. link: "Home", "Inventory", "Contact", "Visit" → /, /vehicles.html, /contact.html, /location.html
- `p:/#r2` items, 4 in main
  - 1. text: "Price on every car", "Look before you visit", "Ask about any car", "Visit on your schedule"
  - 2. text: "Listed up front, no \"call for price\"", "Filter by type, price, year and miles", "Inquiries come prefilled with the vehicle", "Hours and directions on one page"
- `p:/#r3` cards, 4 in main, also p:/vehicles#r1
  - renders `d:src/site/shared.ts#VEHICLES` (4 of its records)
  - 1. image = model: "2021 Ford F-150, Magnetic Gray", "2020 Chevrolet Tahoe, Shadow Gray", "2022 RAM 1500, Diamond Black", "2021 Jeep Wrangler, Firecracker Red"
  - 2. text (the same in every item): "Featured"
  - 3. text = year: "2021 · TRUCK", "2020 · SUV", "2022 · TRUCK", "2021 · SUV"
  - 4. heading = model: "Ford F-150", "Chevrolet Tahoe", "RAM 1500", "Jeep Wrangler"
  - 5. list = miles: "42,000 mi | Magnetic Gray", "55,000 mi | Shadow Gray", "18,500 mi | Diamond Black", "31,000 mi | Firecracker Red"
  - 6. text [price] = price: "$38,900", "$42,500", "$47,200", "$44,800"
  - 7. text (the same in every item): "Sample price"
  - 8. link (the same in every item): "Details" → /vehicles.html
- `p:/#r4` cards, 4 in main
  - 1. text [number]: "01", "02", "03", "04"
  - 2. heading: "Browse", "Ask", "Drive it", "Decide"
  - 3. text: "Filter the lot by body style, make, budget, year and mileage", "Open any car and send a question. The form fills in the vehi", "Stop by during open hours and take it for a test drive.", "Take your time. Ask about paperwork, history and trade-ins i"
- `p:/#r5` chips, 4 in main
  - 1. text: "Vehicle history report and title status", "Service records and recent maintenance", "Whether a pre-purchase inspection by your mechanic is welcom", "Trade-in value and payment options, in writing"
- `p:/#r6` links, 4 in footer
  - 1. link: "Home", "Inventory", "Contact", "Location & hours" → /, /vehicles.html, /contact.html, /location.html
- `p:/#r7` links, 3 in main
  - 1. link: "Haul, tow, work Trucks", "Room for everyone SUVs", "Just for driving Cars" → /vehicles.html
- `p:/#r8` chips, 3 in footer
  - 1. text [date]: "Mon–Fri 8am–7pm", "Saturday 9am–6pm", "Sunday closed"

## `p:/contact` — Contact — Wild Bill's Used Cars

Sections: `p:/contact#s1` Ask us anything. · `p:/contact#s2` Phone sample

- `p:/contact#r1` chips, 6 in main, also p:/vehicles#r2, p:/vehicles#r3
  - 1. text: "General question", "Specific vehicle", "Test drive", "Trade-in"
- `p:/contact#r2` links, 4 in nav
  - 1. link: "Home", "Inventory", "Contact", "Visit" → /, /vehicles.html, /contact.html, /location.html
- `p:/contact#r3` links, 4 in footer
  - 1. link: "Home", "Inventory", "Contact", "Location & hours" → /, /vehicles.html, /contact.html, /location.html
- `p:/contact#r4` chips, 3 in footer
  - 1. text [date]: "Mon–Fri 8am–7pm", "Saturday 9am–6pm", "Sunday closed"
- `p:/contact#f1` form (Prepare email): Your name [text, required]; Email [email, required]; Phone optional [tel]; Topic [select: General question/Specific vehicle/Test drive/Trade-in/Payment options/Vehicle search]; Message 0 / 1000 [textarea, required]

## `p:/location` — Location & Hours — Wild Bill's Used Cars

Sections: `p:/location#s1` Come see it in person. · `p:/location#s2` Address sample

- `p:/location#r1` items, 7 in aside
  - renders `d:src/site/shared.ts#HOURS` (6 of its records)
  - 1. text [date] = day: "Monday", "Tuesday", "Wednesday", "Thursday · today"
  - 2. text = open: "8:00am – 7:00pm", "9:00am – 6:00pm", "Closed"
- `p:/location#r2` links, 4 in nav
  - 1. link: "Home", "Inventory", "Contact", "Visit" → /, /vehicles.html, /contact.html, /location.html
- `p:/location#r3` links, 4 in footer
  - 1. link: "Home", "Inventory", "Contact", "Location & hours" → /, /vehicles.html, /contact.html, /location.html
- `p:/location#r4` chips, 3 in footer
  - 1. text [date]: "Mon–Fri 8am–7pm", "Saturday 9am–6pm", "Sunday closed"

## `p:/vehicles` — Inventory — Wild Bill's Used Cars

Sections: `p:/vehicles#s1` The lot. · `p:/vehicles#s2` Filters

- `p:/vehicles#r1` cards, 15 in main, also p:/#r3
  - renders `d:src/site/shared.ts#VEHICLES` (15 of its records)
  - 1. image = model: "2021 Ford F-150, Magnetic Gray", "2020 Chevrolet Tahoe, Shadow Gray", "2022 RAM 1500, Diamond Black", "2021 Jeep Wrangler, Firecracker Red"
  - 2. text = type: "Featured", "Truck", "SUV", "Car"
  - 3. text = year: "2021 · TRUCK", "2020 · SUV", "2022 · TRUCK", "2021 · SUV"
  - 4. heading = model: "Ford F-150", "Chevrolet Tahoe", "RAM 1500", "Jeep Wrangler"
  - 5. list = miles: "42,000 mi | Magnetic Gray", "55,000 mi | Shadow Gray", "18,500 mi | Diamond Black", "31,000 mi | Firecracker Red"
  - 6. text [price] = price: "$38,900", "$42,500", "$47,200", "$44,800"
  - 7. text (the same in every item): "Sample price"
  - 8. button (the same in every item): "Details"
- `p:/vehicles#r2` chips, 8 in aside, also p:/contact#r1, p:/vehicles#r3
  - 1. text: "All makes", "Chevrolet", "Dodge", "Ford"
- `p:/vehicles#r3` chips, 5 in main, also p:/contact#r1, p:/vehicles#r2
  - 1. text: "Featured first", "Price: low to high", "Price: high to low", "Newest first"
- `p:/vehicles#r4` links, 4 in nav
  - 1. link: "Home", "Inventory", "Contact", "Visit" → /, /vehicles.html, /contact.html, /location.html
- `p:/vehicles#r5` buttons, 4 in aside
  - 1. button: "All", "Trucks", "SUVs", "Cars"
- `p:/vehicles#r6` links, 4 in footer
  - 1. link: "Home", "Inventory", "Contact", "Location & hours" → /, /vehicles.html, /contact.html, /location.html
- `p:/vehicles#r7` fields, 3 in aside
  - 1. text: "Max price", "Year or newer", "Max mileage"
  - 2. text: "$60,000", "2019+", "80,000 mi"
  - 3. field: "Max price $60,000", "Year or newer 2019+", "Max mileage 80,000 mi"
  - 4. text: "$25k", "2019", "10k"
  - 5. text: "$60k", "2022", "80k"
- `p:/vehicles#r8` chips, 3 in footer
  - 1. text [date]: "Mon–Fri 8am–7pm", "Saturday 9am–6pm", "Sunday closed"

## Data the files declare

- `d:src/site/shared.ts#Hours` interface: day: string, open: number | null, close: number | null
- `d:src/site/shared.ts#Vehicle` interface: id: number, make: string, model: string, year: number, price: number, type: VehicleType, miles: number, color: string, cond: "Excellent" | "Good" | "Fair", featured: boolean
- `d:src/site/shared.ts#HOURS` records, 7 of Hours: day: string, open: number | null, close: number | null
- `d:src/site/shared.ts#VEHICLES` records, 15 of Vehicle: id: number, make: string, model: string, year: number, price: number, type: VehicleType, miles: number, color: string, cond: "Excellent" | "Good" | "Fair", featured: boolean
- `d:src/site/shared.ts#NAV` records, 4: href, label, key
