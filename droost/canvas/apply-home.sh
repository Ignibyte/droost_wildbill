#!/usr/bin/env bash
#
# Writes the Home page (canvas_page 1) from droost/canvas/home.tree.json.
#
# The tree names its photos by file ("media:hero.jpg"), not by media id, so it
# rebuilds the same page on any site: resolve-home.php makes (or finds) the two
# image media and writes a copy of the tree holding their ids, which is
# validated and written with droost/bin/canvas tree:set (HR2). Run from the
# project root, after config is imported and wildbills_site is installed.

set -euo pipefail
cd "$(dirname "$0")/../.."

resolved=droost/canvas/.home.resolved.json
trap 'rm -f "$resolved"' EXIT

if [ -d .ddev ] && command -v ddev >/dev/null 2>&1; then
  ddev drush php:script droost/canvas/resolve-home.php
else
  vendor/bin/drush php:script droost/canvas/resolve-home.php
fi

droost/bin/canvas tree:validate 1 --items="$resolved"
droost/bin/canvas tree:set 1 --items="$resolved"
