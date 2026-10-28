#!/bin/bash
set -e
pnpm install --frozen-lockfile
# The dealership is static and has no application database schema.
# Do not run an automatic schema push for unrelated frontend merges.
pnpm --filter @workspace/wildbills run typecheck
