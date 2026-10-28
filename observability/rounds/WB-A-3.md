# Evaluation — WB-A · run 3: R02, Vehicles (observer's half)

The record droost wrote is `WB-A-3-generated.md`; artifacts under
`bin/artifacts/2026-10-22/WB-A-3-*`.

| | |
|---|---|
| Run | `run-7162859aa54b`, a fresh session, the standard kickoff; 22:29 to 23:58 CDT, 1 h 29 min |
| Base | `2c8e58e` (operator before R02: droost/workflow `6c685de` → `53a8f16`, F-360 and F-361; parity's routes through rung 2 with `/` and `/vehicles` judged whole); committed after as `4a5dc3d`, tag `wildbills-a-r02-done` |
| Host | Claude Code v2.1.309, Opus 5.5, effort high |
| Operator | the kickoff only |

## What changed in the measurement

`/` and `/vehicles` judged whole at 1280 (the frame at 390) from this run
on. The control, run with the gate's own arguments before the launch,
**failed**: `/` D2 (75 of 119 texts, the featured cars and tiles missing),
`/vehicles` D1 and D2 (404). So parity's pass below is a measurement of this
rung's pages, not a frame check that could not fail.

## What happened

- **Plan** (22:29 to 22:37): `plan_grounded` on 5 knowledge calls
  (code:tree ×2, code:wiki ×3) and 18 resolved citations.
- **Code** (22:37 to 23:48) passed twice, the second after the seeker:
  phpcs and phpstan on the 11 PHP files the run changed, `house_rules` HR1
  held over 99 added files, `component_lint` 20 of 20.
- **The seeker** ran independently (round 1, not self-reviewed) and found 7:
  **3 HIGH** (content editors could not reach the body-style overview to
  order or delete terms, so AC-18's staff path was untested as staff; two
  sets of criterion proofs recorded before the code they cover last
  changed), 1 MEDIUM (the two views-block Canvas components disabled
  against the plan), 3 LOW. All fixed; the agent re-ran and re-recorded all
  26 criteria, and the closing round is marked self-reviewed.
- **Test** (23:48 to 23:52) passed on its first attempt: phpunit 35,
  Playwright 39 (rung 1's suite included), parity with `/` and `/vehicles`
  whole at 1280 and the frame at 390, `/contact` and `/location` named not
  judged. The agent changed two of R01's tests (seven home sections where
  five were; AC-11's "no 'sample' anywhere" narrowed to the header, footer,
  hero and cards, since the source's own "sample inventory" line is now on
  the page) and said so in the report.
- **Complete:** criteria 26 of 26 by a test, `wiki_fresh` 2 of 2.
- **Live (observer):** `/vehicles` "The lot.", "15 vehicles", "of 15";
  `/` "Featured this week", "On the lot", "15 sample vehicles";
  `/vehicles.html?type=Truck` 301 to `/vehicles?type=Truck`.

## The three questions

1. **Measured.** Parity judged both of the rung's pages whole against a
   baseline on which they failed; the PHP gates measured the run's files;
   HR1 read every added file.
2. **Recorded honestly**: **no, in one place (F-362).** The ledger and the
   evaluation (§4d) carry all 7 findings with 3 HIGH, but
   `workflow:report`'s seeker line read "critical 0, medium 1, low 3": it
   had no HIGH column at all, so the run's most serious catch was missing
   from the summary a reviewer reads first, and an inspection of HIGHs
   alone would have read "no findings". Everything else (the closing round
   as self-reviewed, the frame-only at 390) was said.
3. **Forced.** The independent seeker forced three HIGH fixes the author's
   gates had passed, two of them proofs older than their code.

## Findings

- **F-362** (FIXED, `c5f0aae`): the run report's seeker line and trail
  omitted HIGH. Now counted and printed; `RunReportTest::
  testHighFindingsAreCounted` fails before.
