# Wild Bill's Used Cars

Static, four-page used-car dealership demo. Read `handoff.md` before making changes and `README.md` for setup.

## Active application

- `artifacts/wildbills` is the live site at `/`.
- It uses multi-page HTML, TypeScript and shared CSS, bundled with Vite. It does not use React.
- Entry pages: `index.html`, `vehicles.html`, `contact.html`, `location.html`.
- Shared data/navigation: `src/site/shared.ts`; styles: `src/site/site.css`.
- Inventory and dealership details are samples; images are generated illustrations.
- Contact prepares an email draft. There is no server-side delivery or persistence.

## Commands

- Managed workflow: `artifacts/wildbills: web`.
- Typecheck: `pnpm --filter @workspace/wildbills run typecheck`.
- Local build: `PORT=3000 BASE_PATH=/ pnpm --filter @workspace/wildbills run build`.
- Install: `pnpm install --frozen-lockfile`.
- Use Node 24 and pnpm 10.26.1. Replit workflows supply PORT and BASE_PATH.

## Workspace boundaries

The API service, shared libraries and mockup sandbox remain as separate scaffolding. The dealership does not depend on them. Do not mistake the sandbox for the live site. Old dealership prototype pages and the unused dealership React/UI starter have been removed.

Preserve the registered artifact configurations and managed workflows. No database, authentication, payment integration or secrets are required to run the dealership.

## Repository hygiene

Never commit secrets, dependency folders, build output or temporary screenshots. Git history is retained; removed prototypes may still exist in past commits. `scripts/post-merge.sh` installs dependencies and checks the dealership; it must not push a database schema for this static site.
