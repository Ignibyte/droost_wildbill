# Evaluation — WB-A · run 6: R03 attempt 3, /location (observer's half)

The record droost wrote is `WB-A-6-generated.md`; artifacts under
`bin/artifacts/2026-10-23/WB-A-6-*`.

| | |
|---|---|
| Run | `run-aff3544daf28`, a fresh session, the standard kickoff; 00:56 to 01:38 CDT, 42 minutes |
| Base | `756225c` on a clean tree, the database put back to R02's state (WB-A-5); committed after as `0d0c17a`, tag `wildbills-a-r03-done` |
| Host | Claude Code v2.1.309, Opus 5.5, effort high |
| Operator | the kickoff only |

## What happened

- **Plan** (00:57 to 01:02): `plan_grounded` on 6 knowledge calls and 14
  resolved citations. The agent built the rung from nothing; attempt 1's
  stash was "not used or touched".
- **Code** (01:02 to 01:27) passed on its third attempt (the run went round
  the seeker): phpcs and phpstan on the 9 PHP files the run changed, HR1 over
  25 added files, `component_lint` 24.
- **A regression caught on the way.** To re-run its deploy hook the agent
  purged the first `/location` page it had made; Canvas's page delete also
  removes the menu links to the page's address, so "Visit" and "Location &
  hours" vanished from every page. Its own parity run caught it, it found
  the cause in Canvas's source (cited in the spec's grounding), and
  re-running the module's install routine restored them.
- **A trace the observer left.** The database still recorded attempt 1's
  deploy hook (`wildbills_site_deploy_r03_location`) as run, in the
  `deploy_hook` key-value store; WB-A-5's clean-up missed it. The agent found
  it and named its hook `…_r03_location_page`.
- **The seeker** found 1 HIGH (eight criteria's proofs older than three lint
  edits) and 2 LOW (AC-12's proof overstated "all copy as inputs"; a
  pre-render that resolved a service for every component on the site). All
  fixed, and **closed by an independent second inspection**, not a
  self-review: the first in this series.
- **Test** (01:27 to 01:32) passed on its first attempt: phpunit 50,
  Playwright 55 (the full suite), parity with `/`, `/vehicles` and
  `/location` whole at 1280 and the frame at 390, "live texts not judged
  (they follow the clock): 8 on /location" (F-363's fix), `/contact` not
  judged.
- **Complete:** criteria 17 of 17 by a test, `wiki_fresh` 2 of 2. The agent
  named an unrelated R01 bug the seeker saw (the footer brand link's
  apostrophe escaped twice in its accessible name) and left it.
- **Live (observer):** `/location` "Location & Hours — Wild Bill's Used
  Cars", "Come see it in person.", "Open in Google Maps", "Shortlist first.",
  "Status uses the dealership's local time." (Q8's text, as decided);
  `/location.html?x=1` 301 to `/location?x=1`; "Visit" and "Hours &
  directions" link `/location`.

## The three questions

1. **Measured.** Parity judged `/location` whole on a Friday against the
   re-captured reference, the clock's eight texts named and left out; the
   PHP gates read the run's own 9 files (compare WB-A-5, where they read
   none).
2. **Recorded honestly.** Yes, including the seeker's second round as an
   inspection, not the author's word.
3. **Forced.** The seeker forced re-proving eight criteria; parity (run by
   the agent before the gate) forced the menu links back.

## Findings

None for droost. For the routine, added to WB-A-5's: putting the database
back also means the deploy hooks an abandoned attempt recorded as run.
R04 follows the same rule and needs it less: it builds on a committed
R03.
