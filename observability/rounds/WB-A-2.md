# Evaluation — WB-A · run 2: R01, the frame and the home page's copy (observer's half)

The record droost wrote is `WB-A-2-generated.md`; artifacts under
`bin/artifacts/2026-10-22/WB-A-2-*`.

| | |
|---|---|
| Run | `run-324f3f22bdc8`, a fresh session, the standard kickoff; 20:27 to 22:20 CDT, about 1 h 13 min of work and 40 min stalled (below) |
| Base | `1a26053` (operator before R01: parity's routes through rung 1, `/`); committed after as `cc5ac5f`, tag `wildbills-a-r01-done` |
| Host | Claude Code v2.1.308, Opus 5.5, effort high |
| Operator | the kickoff; one answer to the agent's HR1 question (below); one resume after the machine slept |

## What happened

- **Plan** (20:27 to 20:39): `plan_grounded` on 14 knowledge calls (code:wiki
  ×6, code:symbol ×3, code:tree ×2, the brief ×2, search:arch ×1) and 14
  resolved citations.
- **The first `high`-only stop.** Matching the frame needs two template
  overrides in the new sub-theme (a page shell that only includes a
  `wildbills:page` SDC, and core's `html.html.twig` with the skip link
  reading "Skip to content"), and HR1 says new markup lives in an SDC. The
  agent stopped in plan and asked the operator for an exception, with three
  options and the cost of each (refusing both would likely fail parity's
  D6/D7). The operator granted both; the agent recorded the grant in the
  spec. At `low` (KCH-A run 3) the same page template was built and only
  reported.
- **Code** (20:39 to 21:18) passed: phpcs and phpstan on the 14 files the run
  changed, `component_lint` 12 of 12 SDCs, `house_rules` **reported** (not
  passed) HR1 on exactly the two granted templates, on every attempt. The
  seeker found 6 (5 MEDIUM, 1 LOW): no config schema for the two blocks, the
  footer's year never reaching anonymous visitors through page_cache, a home
  tree pinned to media ids 1 and 2, droost_theme's 21 components still
  offered in Canvas, the frame SDCs offered to editors, an empty Canvas
  folder. All fixed, closed self-reviewed.
- **Test** (21:18 to 21:21): attempt 1 **blocked**, phpunit "could not run"
  (no `phpunit.xml(.dist)` at the root), recorded as BLOCKED (environment),
  not as a pass. The agent wrote `phpunit.xml.dist`, declared it, and
  attempt 2 passed: phpunit 22 tests (the gate says "steered by config this
  run changed"), Playwright 16, parity frame on `/` at 1280 and 390 with
  the other three routes named not judged (the routes lever).
- **The stall.** In complete, writing READMEs, the agent's response was cut
  by "API Error: Your computer went to sleep" at 21:37. The observer found
  it at 22:16, started `caffeinate` for the night, and sent one recorded
  operator message ("The machine slept and cut off your last response …
  Continue the complete phase"). Nothing droost did; a host event.
- **Complete:** criteria 18 of 18 by a test, `wiki_fresh` 2 of 2 (the
  module's and the theme's pages, which `high` requires), the run archived.
  The agent's report named what is in the database rather than config (the
  menu links, the redirect, the two media, the Home page, rebuilt by its
  `droost/canvas/apply-home.sh`), and that the parity reference has
  "© 2026" baked in, so the footer fails parity from 1 January 2027.
- **Live (observer):** `/` 200 with the source's title, "Skip to content",
  "Good used cars", "© 2026", no "Privacy policy"; `/index.html` 301 to `/`;
  `/vehicles` 404 (R02's).

## The three questions

1. **Measured.** The PHP gates measured the run's 14 files; phpunit's first
   attempt measured nothing and said so; parity judged `/`'s frame and
   named the rest not judged. HR1 measured the two files it reported.
2. **Recorded honestly.** Yes: `house_rules` reads "recorded (not
   blocking)" with the two files, never `passed`; the blocked phpunit
   attempt is BLOCKED; phpunit's pass carries the config the run wrote; the
   seeker's closings are marked self-reviewed, not independent.
3. **Forced.** Partly. HR1 at `high` still reports and does not block (the
   project's rule has no `mode: block`; HR3's does), so the agent's
   question was its own choice, not a wall. The phpunit gate did force a
   suite into being: at `high` a run with PHP and no runnable suite cannot
   pass test.

## Findings

None for droost. One for the series: the parity reference holds the year
("© 2026"), and the agent named it; a reference read in one year fails the
next. Set the year aside in `decided.json` or re-capture in January.
