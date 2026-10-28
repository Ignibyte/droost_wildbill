# Evaluation — WB-A · run 7: R04, /contact (observer's half)

The record droost wrote is `WB-A-7-generated.md`; artifacts under
`bin/artifacts/2026-10-23/WB-A-7-*`.

| | |
|---|---|
| Run | `run-36776d8c9d4c`, a fresh session, the standard kickoff; 01:40 to 02:30 CDT, 50 minutes |
| Base | `a975882` (operator before R04: parity's routes through rung 4, every page judged whole; the control failed on `/contact` alone); committed after as `e568dde`, tag `wildbills-a-r04-done` |
| Host | Claude Code v2.1.309, Opus 5.5, effort high |
| Operator | the kickoff only |

## What happened

- **Plan** (01:41 to 01:46): `plan_grounded` on 6 knowledge calls and 16
  resolved citations.
- **Code** (01:46 to 02:15) passed on its third attempt (round the seeker):
  phpcs, phpstan, HR1, `component_lint`.
- **The seeker** (independent) found 3 LOW: two places where the spec
  described the code wrongly, an unused value. All fixed; closed
  self-reviewed. It also noted, outside the rung, that `Inventory::
  listedQuery()` treats a car with no sale status as unlisted; the agent
  named it and left it.
- **Test** (02:15 to 02:23) passed on its first attempt: phpunit 72,
  Playwright, and parity with **all four pages judged whole** at 1280 and
  the frame at 390, nothing left not judged, `/location`'s 8 clock texts
  named.
- **Complete:** criteria 23 of 23 (21 by a test; AC-20 by reading the page's
  component tree; AC-23 by the parity gate).
- The agent's choices it named: the car is looked up on the server, so the
  page never ships the inventory; the form fields carry no `name`, so with
  JavaScript off a visitor's message never reaches a URL or a log; the six
  topic names are fixed values because other pages link to them; the tests
  marked three cars sold, unpublished or pending and put them back.
- **Live (observer):** `/contact` "Contact — Wild Bill's Used Cars", "Ask us
  anything.", "This site has no message server…", "0 / 1000", "Prepare
  email" (never "Send", as the client required); `/contact.html?vehicle=1`
  301 to `/contact?vehicle=1`.

## The series' last check (observer, 02:35)

On the committed site: **Playwright 71 of 71** (all seven spec files), **phpunit
72**, and **parity 8 of 8 at page scope at both widths** (the gate judges
whole at 1280 only), `/location`'s 8 clock texts not judged. The tree was
clean after the suite.

## The three questions

1. **Measured.** Every page judged whole against a control on which
   `/contact` failed; the PHP gates read the run's files.
2. **Recorded honestly.** Yes.
3. **Forced.** The seeker's three LOW were fixed; nothing held, and nothing
   needed to.

## Findings

None.
