# Wild Bill's Used Cars — Agent Handoff

## 1. Current status and user direction

The user approved the rebuilt site and forest-green/cream color scheme: **“this looks good.”** They then requested repository setup, removal of old code, and this handoff.

Preserve the approved layout, typography, imagery and palette. The original cowboy novelty design was explicitly rejected. Do not restore western fonts, wood textures, emoji decorations, orange/blue branding, or “pardner” copy.

This is a **working static demo, not a production dealership system**. No deployment was performed during this cleanup.

## 2. Authoritative application

`artifacts/wildbills/` is the live site. Its artifact ID is `artifacts/wildbills`, preview prefix `/`, managed workflow `artifacts/wildbills: web`.

Despite the original workspace template, this application is **not React**. Vite bundles four HTML entry points with ordinary TypeScript DOM code and one shared CSS file. No runtime framework, UI-component package, API client or database is required by the dealership.

| Route | Entry / script | Responsibility |
| --- | --- | --- |
| `/` | `index.html` / `src/site/home.ts` | Landing page, featured listings, category navigation |
| `/vehicles.html` | `vehicles.html` / `src/site/vehicles.ts` | Search, filters, sort, cards, vehicle-detail dialog |
| `/contact.html` | `contact.html` / `src/site/contact.ts` | Validation, vehicle-prefilled inquiry, email-draft preview, copy/edit |
| `/location.html` | `location.html` / `src/site/location.ts` | Sample hours/status and map-service links |

Shared source:

- `src/site/shared.ts`: dealership details, 15 sample vehicles, hours, types, icons, navigation/footer, URL helpers, card rendering and reveal behavior.
- `src/site/site.css`: all visual styles, palette variables, responsive rules and reduced-motion behavior.
- `public/images/hero.jpg`, `lot.jpg`, `v1.jpg`–`v15.jpg`: generated illustrative photographs.
- `public/favicon.svg`: green favicon.
- `vite.config.ts`: four production entry points, PORT/BASE_PATH validation, `dist/public` output.
- `tsconfig.json`: standalone dealership typecheck, no API-client project reference.

Use `url()` / `img()` helpers for generated paths. Preserve base-path support rather than hardcoding a development hostname.

## 3. Existing behavior to preserve

- Inventory: search, body style, make, maximum price, minimum year, maximum mileage and five sort choices.
- Filter chips, result count, empty/reset state and mobile filter toggle.
- Inventory query strings: `?type=Truck` and `?vehicle=ID`.
- Accessible vehicle dialog with Escape/outside close and focus restoration.
- Vehicle inquiry links to `/contact.html?vehicle=ID`; optional `topic` query parameter is also supported.
- Contact validation; successful validation displays a draft, **not a “sent” confirmation**.
- “Open in email app”, copy message and edit message actions.
- Responsive mobile navigation, reduced-motion styles and keyboard focus indicators.

## 4. Cleanup completed

- Removed the rejected four-page dealership prototype from `artifacts/mockup-sandbox/public/wildbills/`.
- Removed the unused dealership React entry points, placeholder page, old stylesheet, UI component library, hooks, utility and component-generator configuration.
- Removed unused dependencies from the dealership package; its remaining direct dev dependencies are Vite and Node types. TypeScript is provided by the workspace root.
- Updated the pnpm lockfile.
- Kept the separate sandbox's own React dependencies/components: these belong to its registered preview service, not to the rejected dealership implementation.
- Kept API/shared-library scaffolding: it is not used by the dealership and was not deleted or migrated.
- Added `.github/workflows/site-checks.yml`, `README.md`, this handoff and accurate `replit.md`.
- Added ignore rules for environment files and generated verification output.
- Changed `scripts/post-merge.sh` to install dependencies and typecheck the dealership rather than attempting an unrelated database schema push.

Removal means the current source tree. Git history/checkpoints are intentionally preserved. Do not rewrite history to erase the old design.

## 5. Run and verify

Use Node 24 and pnpm 10.26.1. From repository root:

```sh
pnpm install --frozen-lockfile
pnpm --filter @workspace/wildbills run typecheck
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/wildbills run build
```

Outside Replit, start with:

```sh
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/wildbills run dev
```

Inside Replit, restart the **existing managed workflow**, rather than creating a replacement server. It supplies PORT/BASE_PATH. The site needs no secrets.

Generated output lives in `artifacts/wildbills/dist/public/` and is ignored. Serve all page entries; do not assume SPA routing. A `BASE_PATH=/sub/` build was verified during the redesign, but not repeated for this cleanup.

GitHub Actions performs frozen installation, dealership typecheck and root-path build. It has read-only repository permissions and no deployment step. Its remote execution remains unverified until a GitHub repository is connected.

### Verification record

- The active dealership typecheck and root-path production build passed after deleting unused files/dependencies.
- Frozen-lockfile installation and the full workspace typecheck passed after cleanup (dealership, API, sandbox, scripts and shared libraries).
- All four page routes returned HTTP 200; the post-cleanup homepage screenshot preserved the approved design with no application console errors.
- The old-design source scan found no western-theme, DaisyUI or CDN Tailwind references in the active dealership or remaining sandbox public files.
- `git diff --check` and shell syntax validation of the post-merge script passed.
- The redesign and color update were visually checked in desktop/mobile previews.
- No automated end-to-end browser test suite has been added or run. Do not represent compile/build success as proof of every interaction.

### Manual regression checklist for future functional edits

1. Open every route directly and navigate via desktop and mobile menus.
2. Apply combined filters, remove chips, sort results, reach no-results state, reset.
3. Open a vehicle, close using Escape/outside click, verify focus returns.
4. Follow the vehicle inquiry link and check prefilled vehicle/message.
5. Check invalid inputs, draft preview, edit and copy. Do not send a test inquiry to the sample address.
6. Confirm mobile layouts have no horizontal overflow and keyboard focus is visible.
7. Confirm all images load and the browser console has no application errors.

## 6. Known limitations / launch blockers

1. **Data is fictional/sample.** Verify real inventory, pricing, dealership address, phone, email and hours before launch.
2. **Photos are generated.** Replace them with actual vehicle/dealership photographs for a real business.
3. **No form delivery service or persistence.** The visitor must send the email themselves. No database, inbox, admin inventory editor, authentication or payments are implemented.
4. **Location is illustrative.** Map links use the sample address; do not treat them as valid directions.
5. **Hours/status use the visitor's local clock.** Before live use, calculate against the actual dealership time zone and verify opening/closing boundaries.
6. **JavaScript is required** for shared navigation/footer, inventory and form behavior. No-JavaScript behavior is limited.
7. **Google Fonts is external.** System fallback fonts are available if the service is blocked.
8. **SEO is incomplete for production.** Page titles/descriptions exist, but a verified production URL, canonical metadata, real social preview content and sitemap need a separate pass. The unused `public/opengraph.jpg` is scaffold material, not an approved marketing asset.

Keep demo/sample labels until these corresponding limitations are resolved. Do not invent reviews, inspection guarantees, financing approvals or stock counts.

## 7. Repository / GitHub status

Git is already initialized on `main`. There is a platform backup remote, but no GitHub `origin` has been configured. No remote repository was created or pushed during this cleanup.

The GitHub integration reports an active git-provider connection, but `gh api user` returned an authentication-required message in this shell. No tokens were read or requested. The remaining decision is the GitHub repository destination (new private repository or an existing URL). Use the managed Git connection flow; do not request credentials in chat or overwrite an existing remote.

Once a destination is confirmed: verify access, review the staged file list for secrets and generated files, create/connect the repository without force-pushing, push, then verify Actions on GitHub. Update this section with the actual repository URL and result.

## 8. Next-agent scope

Finish the GitHub connection once the user supplies the destination. Do not redesign the approved site while doing repository work. Real inventory and automated inquiry delivery are separate product decisions requiring user direction.
