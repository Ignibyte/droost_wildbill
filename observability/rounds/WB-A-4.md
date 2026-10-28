# Evaluation — WB-A · run 4: R03 attempt 1, /location (observer's half)

The record droost wrote is `WB-A-4-generated.md`; artifacts under
`bin/artifacts/2026-10-23/WB-A-4-*`.

| | |
|---|---|
| Run | `run-0704696dc1d4`, a fresh session, the standard kickoff; 00:05 to 00:34 CDT, 29 minutes, held in test |
| Base | `e2b46b3` (operator before R03: droost/workflow `c5f0aae`, F-362; parity's routes through rung 3 with `/`, `/vehicles` and `/location` judged whole) |
| Host | Claude Code v2.1.309, Opus 5.5, effort high |
| Operator | the kickoff; one answer to the agent's parity question (below) |
| Outcome | **held in test** by the operator's answer, then reset and archived (`history/run-0704696dc1d4.json`); its code stays in the tree for attempt 2 (WB-A-5) |

## What happened

- **Plan** (00:06 to 00:09): `plan_grounded` on 8 knowledge calls (code:wiki
  ×4, code:symbol ×2, code:tree, search:arch) and 16 resolved citations.
- **Code** (00:09 to 00:26) passed twice, the second after the seeker. The
  seeker found 6: 1 HIGH (AC-20, the parity criterion, had no proof yet,
  correctly: parity runs at test), 3 MEDIUM (proofs older than a phpcs
  reformat; strings fixed in JS that the spec called Canvas copy; a
  duplicated `.wb-note`), 2 LOW. Fixed or answered, closed self-reviewed.
  `workflow:report` printed "critical 0, **high 1**, medium 3, low 2":
  F-362's fix, seen on a live run.
- **Before running test**, the agent ran parity itself and stopped: it
  would fail `/location` judged whole, "today, and on every Wednesday,
  Friday, Saturday and Sunday". Its diagnosis: the reference was read on a
  Thursday, capture's two clock-shifted re-reads landed on Monday and
  Tuesday, so only those day names and "Thursday · today" were live; on a
  Friday the site's "Friday · today" missed the reference's plain "Friday".
  It said the reference was frozen with the run and a waiver was the
  operator's, offered hold / waive / run anyway, and recommended holding
  until a Monday, Tuesday or Thursday, noting that "the gap in capture's
  live sampling still needs fixing in droost before R04".
- **The observer repeated it before believing it.** The reference's
  `/location` live list was exactly `Open now · closes 7:00pm`, `Monday`,
  `Tuesday`, `Thursday · today`; the gate's own judgement against it on
  Friday failed `/location` with one text missing, `span "Friday"` (58 of
  59). The diagnosis was right, and the defect was droost's (**F-363**).
- **The operator answered "Hold".** The agent held the run in test against
  droost's stop hook, which asked it to advance or abandon, and said why.

## The three questions

1. **Measured.** Parity measured `/location` whole and would have failed it,
   on the reference's defect, not the page's. The agent read the gate before
   running it, which is how the gate was seen to be wrong.
2. **Recorded honestly.** Nothing false was recorded: the run never ran test,
   so no verdict was written either way. AC-20 stayed unverified, and the
   report said so.
3. **Forced.** The frozen reference held: the agent could neither re-capture
   it nor waive the gate, and asked. What no check forced was the diagnosis,
   which the agent did on its own.

## Findings

- **F-363** (FIXED, `cea7cce`): capture's live sampling covered three
  weekdays, so a page that marks today failed four days a week. A page the
  first two shifts find live is now read on each of the next six days too.
  Re-captured: `/location`'s live texts are the open status and all seven day
  names; the other six views are unchanged. Judged on Friday, the old
  reference fails `/location` on "Friday" alone and the new one passes.
