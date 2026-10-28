# WB-A: building the subject

Wild Bill's Used Cars again, from nothing, at `high` (owner, 2026-10-22).
The build is `docs/SUBJECT-KCH-A.md` with UNI-A's differences
(`docs/SUBJECT-UNI-A.md`) and those below; each was run on 2026-10-22
before it was written here.

**Where:** `<site>`, ddev `wildbills-a`.
Never the owner's site at `<the original site>`: only
`design/Wild-Bills-Cars.zip` is copied out (sha256 `3b19974a…`, Part 11's,
which the client confirmed current).

## §1 and §2

As UNI-A: `drupal/core-dev:^11` with `-W`; droost_cms `off-drupal`
`af20101` (a gitlink in the subject); droost/workflow `off-drupal` from
`tools/droost/`. Merge the layer's `droost.yml` with `component_lint` inside
the project's `gates:` block and the `rules:` block appended. Playwright's
config is UNI-A's with the URL changed (one worker).

Before baseline 0 the code gates read: phpstan fails on droost's own
`droost/gates/lib/canvas/cli.php` (no `paths` yet: baseline 1 sets them) and
house_rules cannot read a diff (no commit yet: baseline 0 is it). Neither
is a defect.

## §3, baseline 1

```bash
cp droost_observability/bin/artifacts/wb-a/Wild-Bills-Cars.zip design/
bash droost_observability/bin/set-dial.sh high .
# then in droost/droost.yml: lead: autonomous (under "# lead: human-led");
# parity { on: true, required: true, scope: frame }. set-dial writes the
# analyser paths (web/modules/custom,web/themes/custom); the site has no scripts/.
```

`high` resolves: enforcement hard, flow strict, max_loops 5, the seeker
holding on CRITICAL; eslint, stylelint, prettier, mutation and coverage off
by the preset ("none of the slow tiers"), on from `xhigh`.

**The reference** is the delivered build as it is, no decided copy: its
faces (Geist, Bricolage Grotesque, Geist Mono) all draw.

```bash
OBS=droost_observability
unzip -q $OBS/bin/artifacts/wb-a/Wild-Bills-Cars.zip -d $OBS/bin/artifacts/wb-a/source
( cd $OBS/bin/artifacts/wb-a/source/Wild-Bills-Cars/artifacts/wildbills/dist/public && \
  python3 -I -m http.server 5399 --bind 127.0.0.1 & )
tools/droost/vendor/bin/droost-parity capture --source http://localhost:5399 \
  --routes /index.html,/vehicles.html,/contact.html,/location.html --width 1280,390
pkill -f "http.server 5399"
```

A multi-page static site: no single-page fallback. The `.html` routes are
captured at their clean paths (`/vehicles`). The location page's clock-
driven lines are read as live and kept out.

## The rounds

`DOGFOOD_SITE=<site> DOGFOOD_TMUX=wb-run
bin/dogfood.sh launch`, then as UNI-A's between-rung routine (the memory
note `uni-a-series`): freshness on the `off-drupal` checkouts, the parity
`routes` lever from `intake routes <rung>`, each finished page judged whole
after a control that must fail.
