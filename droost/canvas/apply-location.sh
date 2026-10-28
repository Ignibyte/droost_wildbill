#!/usr/bin/env bash
#
# Writes the Location & Hours page from droost/canvas/location.tree.json.
#
# The page itself (title, description, the /location address) is made by the
# wildbills_site_deploy_r03_location_page() deploy hook; this finds its id by
# that address and writes its components with droost/bin/canvas tree:set
# (HR2). Run from the project root, after `drush deploy`.

set -euo pipefail
cd "$(dirname "$0")/../.."

tree=droost/canvas/location.tree.json
eval_php='$path = \Drupal::service("path_alias.manager")->getPathByAlias("/location"); echo preg_match("#^/page/(\d+)$#", $path, $m) ? $m[1] : "";'

if [ -d .ddev ] && command -v ddev >/dev/null 2>&1; then
  id=$(ddev drush php:eval "$eval_php")
else
  id=$(vendor/bin/drush php:eval "$eval_php")
fi

if [ -z "$id" ]; then
  echo "No Canvas page at /location: run drush deploy first." >&2
  exit 1
fi

droost/bin/canvas tree:validate "$id" --items="$tree"
droost/bin/canvas tree:set "$id" --items="$tree"
