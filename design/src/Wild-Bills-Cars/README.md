# Wild Bill's Used Cars

A responsive four-page dealership demo with sample inventory, filtering, vehicle details and email-draft inquiries. The approved design uses forest green, cream and sage.

**Start with [`handoff.md`](handoff.md)** for the next-agent briefing, limitations and verification checklist.

## Quick start

Requirements: Node.js 24 and pnpm 10.26.1.

```sh
pnpm install --frozen-lockfile
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/wildbills run dev
```

On Replit, use the existing `artifacts/wildbills: web` workflow instead; it supplies the port and base path.

## Checks and production build

```sh
pnpm --filter @workspace/wildbills run typecheck
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/wildbills run build
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/wildbills run serve
```

Build output: `artifacts/wildbills/dist/public/`. Deploy all four HTML files and their assets as a static multi-page site, not as an SPA requiring a catch-all rewrite. For a subdirectory deployment, use its prefix as `BASE_PATH` at build time.

GitHub Actions runs the dealership typecheck and build on pushes and pull requests. It does not deploy or exercise interactive browser flows.

## Source map

| Location | Purpose |
| --- | --- |
| `artifacts/wildbills/*.html` | Four page entry points |
| `artifacts/wildbills/src/site/` | Active TypeScript and shared styles |
| `artifacts/wildbills/public/` | Images, favicon and robots file |
| `artifacts/api-server/`, `lib/` | Retained workspace backend scaffolding; not used by the dealership |
| `artifacts/mockup-sandbox/` | Separate design preview service, not the production site |
| `scripts/post-merge.sh` | Dependency installation and dealership typecheck after merges |

## Before using for a real dealership

The inventory, pricing, address, phone, email and hours are sample data. Vehicle and dealership images are generated illustrations. The map is not a real map. The inquiry form does not send or store messages; it prepares a draft for the visitor's email application. Do not remove the demo notices until real data and delivery have been configured and verified.

## Git setup

This workspace already has Git history. The platform backup remote is not a GitHub repository. A GitHub destination has not yet been configured; choose the repository owner/name and visibility before connecting and pushing. Do not overwrite an existing repository or force-push.

Use pnpm only. Keep `.env` files, credentials, `node_modules`, `dist` and generated test output out of Git.
