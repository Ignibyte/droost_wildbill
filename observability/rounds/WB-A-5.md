# Evaluation — WB-A · run 5: R03 attempt 2, /location (observer's half)

The record droost wrote is `WB-A-5-generated.md`; artifacts under
`bin/artifacts/2026-10-23/WB-A-5-*`.

| | |
|---|---|
| Run | `run-545c1eef904a`, a fresh session, the standard kickoff; 00:44 to 00:51 CDT, 7 minutes, held in code |
| Base | `756225c` (operator before R03 attempt 2: droost/workflow `cea7cce`, F-363; the reference re-captured) **with attempt 1's R03 code still in the tree, uncommitted: the observer's error** |
| Host | Claude Code v2.1.309, Opus 5.5, effort high |
| Operator | the kickoff; one answer ("Stop here") |
| Outcome | **held in code**, then reset and archived; the tree and the database put back to R02's state before attempt 3 (WB-A-6) |

## What happened

- The observer reset attempt 1's run but left its code in the working tree,
  meaning attempt 2 to reuse it. droost records what the tree already held
  changed when a run begins and leaves it out of the run's work, so this
  run's diff was empty.
- **Plan** passed; the agent kept attempt 1's code and re-verified 21
  criteria against it (phpunit 48, Playwright 21).
- **Code was held, correctly.** phpcs, phpstan and HR1 each read
  "**labelled: it ran and examined nothing** … the run changed no file it
  reads (ticket scope)", and `type_coverage` BLOCKED the phase: "mixed work
  rests on phpcs, phpstan … ran without examining anything. A gate that
  passes over an empty path set has not checked the thing this ticket is
  about." No green was written for code that no gate read.
- The agent found the cause in droost's source (`RunState`, the tree as the
  run began), refused to "artificially touch files just to get them
  counted", and asked the operator: stash and reset so the code is the run's
  own diff (recommended), widen phpcs and phpstan to the whole tree ("weaker:
  HR1 and the seeker still see an empty diff"), or stop. The operator
  stopped it. It wrote a memory about the case (copied to the artifacts,
  `subject-memory/`, and emptied).

## Putting the subject back (operator, 00:51 to 00:56)

The code went into the artifacts (`r03-attempt1-code.diff`,
`r03-attempt1-untracked.tar.gz`) and a stash; the run was reset. The
database still held attempt 1's work: `/contact` answered **500** (a
render callback, `LocationDetails::preRender`, whose class had left with the
code), and the config had drifted. The observer deleted the `/location`
Canvas page (2) and its redirect, purged the page from Trash (Drupal CMS
soft-deletes, and Canvas refused to delete components a trashed page still
used), imported config from the tree, and rebuilt caches. After: no config
differences; `/` and `/vehicles` 200, `/location` and `/contact` 404; 15
vehicles published and available; parity on the rung 3 lever fails on
`/location` alone, as before attempt 1.

## The three questions

1. **Measured.** Nothing, and droost said so: each PHP gate labelled itself
   as having examined nothing.
2. **Recorded honestly.** Yes. "passed — labelled: it ran and examined
   nothing" beside each, never a plain pass.
3. **Forced.** Yes: `type_coverage` held the phase, so the run could not
   advance on gates that read no file. This is the attempt where that wall
   was seen working on a real run.

## Findings

None for droost. For the routine: **a re-run of a rung starts from a clean
tree and the database as the previous rung left it.** Resetting the run is
not enough; the code, the config and the content of the abandoned attempt
all have to go.
