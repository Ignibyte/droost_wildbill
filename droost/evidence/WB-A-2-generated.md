# Evaluation — `run-324f3f22bdc8`

Rendered from the evidence store. Every value below is a row droost
wrote about what it measured; the sections a human must fill say so in
place, and say why.

> **The one rule the rest hangs from.** `phases` in `run.json` is the
> subject's own summary of itself: droost writes that file, but what it
> writes there is a rollup of the run's own account, and a reader who
> wants to know whether a gate ran should not be asking a summary.
> Nothing here reads `phases`. Every VERDICT below is a row droost
> wrote from a process droost started.
> 
> The stated REASON for that rule used to be that the agent could write
> `run.json`. It cannot: the guard refuses it through both doors, the
> editing tools and the shell, as it refuses the guard itself,
> `.claude/settings.json`, the bypass grant, the baseline and this
> store. The rule survives its reason — a summary is still a summary —
> but an evaluation that argues from a wall which has moved is telling
> its reader something false about how the wall is built.
>
> **The exception, stated because it was not.** §1's preset, mode,
> enforcement, base commit and spec path are copied THROUGH `run.json`
> on their way into the store, so an agent editing that file before a
> phase changes what §1 prints. A reviewer edited `medium`/`soft` to
> `max`/`hard`, ran one phase, and §1 said `max` and `hard` while the
> frozen medium gate set was what actually ran. Those rows are marked
> `reported` below, and the two digests are marked with what they
> actually cover: droost computes them, over the file `run.json` names,
> and only across the spec's frozen sections. The gate set in §3 and
> §4 is the check on all of it.

> **What the integrity check does and does not establish.** Every
> verdict carries a digest over the previous verdict's digest and its
> own columns, and the ids are contiguous because nothing deletes from
> that table. So an altered verdict, an invented one, or a deletion in
> the middle of the record breaks the chain and is named below. So does
> a deletion from the END that leaves the run's recorded head alone, or
> blanks it: the head is written beside every verdict, so a record
> shorter than its head, and a record with verdicts but no head, are
> each visible. And the concession that an empty digest means "written
> before the chain existed" is bounded twice over — by a watermark that
> cannot exceed the rows that exist, and by a mark the file only carries
> if it really does hold rows that old — both of which are written in
> this same file, so a forger who reads the source can set them. When
> a store DOES claim that concession, the banner below says how much
> of this run it covers; absent that banner, every verdict here
> carries a digest.
> 
> It does NOT establish that the record is untampered, and cannot. Every
> input to the check — the algorithm, the digests, the head, the
> watermark — lives in a file the agent being measured can write, so
> anyone willing to read `EvidenceStore::chain()` can recompute the
> whole chain around whatever they changed. Two SQL statements are
> enough without reading anything: DELETE the verdicts from some point
> on, then repoint the head at whatever row is now last. The record that
> survives is SHORTER, not inconsistent, and nothing here can tell a
> run that recorded three verdicts from one that recorded the first of
> them and stopped. Read §4's count against what the phases claim to
> have run: that comparison is outside the chain, and it is the thing a
> truncation cannot fix.
> 
> What the chain catches is accident, corruption and casual editing, and
> it makes a deliberate forgery cost specific knowledge and several
> coordinated writes rather than one UPDATE. It does not catch a
> determined local forger, and no scheme kept entirely inside that file
> could.
> 
> If this record has to hold against that, it has to leave the machine:
> commit the rendered evaluation, where a diff shows what changed, or
> write it somewhere the agent has no credentials for. That is an
> operator's decision and droost cannot make it from in here.

## 1. Round identity

| Field | Value | Source |
|---|---|---|
| Round | `run-324f3f22bdc8` | measured |
| Started (as recorded) | `2026-10-23T01:27:10+00:00` | reported |
| Preset | `high` | reported |
| Mode | `agentic` | reported |
| Enforcement (requested) | `hard` | reported |
| Base commit | `1a26053b38124d9cbcc7e77b7e8169a85390f58f` | reported |
| Spec | `droost/droost-workflow/spec-r01-frame-home.md` | reported |
| Frozen-sections hash | `eb10c9c5ef955e5249f575e17ceedf28` | hashed by droost, over the file run.json names |
| Spec frozen at | `2026-10-23T01:39:38+00:00` | droost's clock, at plan exit |
| Ticket / request | — not recorded — | — |
| Subject (model, effort, host, version) | — not recorded — | — |
| Driver (tmux / interactive / CI) | — not recorded — | — |
| Elapsed | — not recorded — | — |
| Operator interventions | — not recorded — | — |

What §1 cannot say, and why:

- **`reported` means the value reached the store THROUGH `run.json`.**
  droost recorded it faithfully; it did not verify it. An agent that
  edits that file before a phase changes these rows, and the gate set
  that actually ran — §3 and §4 — is the check on them.
- **The frozen-sections hash is not a hash of the spec.** It covers
  grounding, criteria and routes as the plan ended them, and nothing
  else, so two specs differing elsewhere share a digest. The freeze does NOT
  rest on it — it compares the recorded TEXT row by row, because "every
  row that was there is still there" is not a question a hash can
  answer. Read the digest as a tripwire, never as a seal.
- **Subject, driver and elapsed** are facts about the harness that ran
  the round, not about the run. Nothing writes them to the store, so
  they are captured by hand from the template's §2.
- **Enforcement in §1 is the REQUESTED value**, and `{requested,
  effective, reason}` is still computed at read time and never
  persisted — `effective` is inferred from the declared host, which is
  a claim about a claim. What the hook was OBSERVED doing is now §7a,
  written by the guard about itself. Read the two together: §1 for what
  was asked, §7a for what was there.
- **Operator interventions** leave a trace in the record only where an
  operator unblocked a check; see the `unblocked by the operator` rows
  in §4. Everything else an operator did during the round is invisible
  from here.

## 2. Environment — captured BEFORE the subject starts

**Not generated, and it cannot be.** Three of this section's rows are
unrecoverable after the fact — gate arming, enforcement effectiveness,
and whether a patch truly landed — which is exactly why the template
asks for them before the subject starts. A store written DURING the
run is the wrong side of that line.

Fill it from `.claude/templates/evaluation.md` §2 (init installs the
template there — `pack/templates/` is where it ships FROM, not where a
project reads it), with the four traps it lists.

---

## 3. The lever table

The template's `Probe`, `Expected`, `Fired?` and `Verdict` columns are
the evaluator's work — a probe is a command someone ran before the
round, and a verdict is a judgement about whether what fired matched
what was asked for. Neither is a row. What the record holds is the
value, and whether anything was adjudicated under it.

| Lever | In the record | Note |
|---|---|---|
| `mode` | `agentic` | frozen into the run at begin |
| `preset` | `high` | the effort every other lever's meaning is relative to |
| `enforcement` | `hard` | the requested value only — see §1 |
| `require_run` | — not recorded — | the guard re-reads raw YAML on every write, and writes nothing back |
| `max_gate_retries` | — not recorded — | attempts per gate are countable in §4; the configured ceiling is not stored |
| `seekers` | **on** | whether anything read the diff with intent. `off` and `on` are different facts from a clean verdict and must not be read as one — §4d says which |
| `baseline` | none | the adoption baseline this run was held to, frozen at begin. `none` means no debt was subsidised; §4's Baseline column says which verdicts leaned on it |
| `work_item` | see §1 | the ticket the run bound: `--work-item`, or the `work_item.provider` source |

### Gates

| Gate | Adjudicated in | Attempts | Latest state |
|---|---|---|---|
| `phpcs` | `code, test, complete` | 3 | satisfied |
| `phpstan` | `code, test, complete` | 3 | satisfied |
| `eslint` | `code, test, complete` | 3 | not applicable |
| `stylelint` | `code, complete` | 3 | not applicable |
| `prettier` | `code, test, complete` | 3 | not applicable |
| `phpunit` | `test, complete` | 2 | satisfied |
| `mutation` | `test, complete` | 2 | not applicable |
| `playwright` | `test, complete` | 2 | satisfied |
| `parity` | `test, complete` | 2 | satisfied |
| `coverage` | `test, complete` | 2 | not applicable |
| `house_rules` | `code, complete` | 3 | recorded (not blocking) |
| `wiki_fresh` | `complete` | 1 | satisfied |
| `custom:component_lint` | `code, complete` | 3 | satisfied |

A gate with `— not recorded —` in the second column was never
adjudicated in this run at all — which is NOT the same as off. A gate
turned off by the preset or by the lever file still produces a row,
stated as `not applicable`. No row means the phase that owns the gate
never ran, or the recorder failed while it did.

---

## 4. Gate verdicts

A green is not a measurement. For the GATES in this table —
`satisfied` and `recorded` rest on something droost collected;
`not applicable` and `unblocked by the operator` are honest and are
NOT measurements; `asked for, could not run here` means the gate was
wanted and this surface could not perform it; and a measured state
with `duration_ms: 0` means the tool never spawned. (Elsewhere in this
document `recorded` is also used for a DECLARATION droost kept but
could not check — that is not a measurement, and the row says so.)

**Still true?** re-measures the fingerprint of what each gate examined,
as the tree stands now:

- `yes` — the subject is byte-identical to what the verdict was about.
- `**EXPIRED**` — the subject has changed since. Not a green now.
- `**EXPIRED** (subject gone)` — the gate HAD a subject and it no
  longer exists. The most complete form of expiry there is.
- `unknown` — the gate has no `paths` lever, so there is nothing to
  fingerprint and there never was. NOT the same as unchanged.

**Baseline** is the other way a green can mean less than it looks.
An adoption baseline records the debt a tree already carried, and a
consulting gate subtracts those findings from its verdict — a
deliberate, audited exception to "green means measured", which this
column is the audit of:

- `—` — no baseline was consulted. NOT the same as zero inherited.
- `0 inherited` — a baseline was consulted and subsidised nothing.
- `**N inherited**, M new` — the verdict rests on M findings and set
  N aside. A `satisfied` beside a non-zero N is a pass over debt.

**Config the run changed** is the third. A config file is the
project's, and a run may change one and declare it, but a verdict
reached under rules the run set is not the verdict a reader assumes:

- `—` — the run changed none of the files this gate's tool read.
- a file — the run wrote, edited or deleted it, and the tool reads
  it. Read that file's diff before the verdict beside it.

| Gate | Phase | State | Fault | Exit | `duration_ms` | Invocation recorded | Measured anything? | Baseline | Config the run changed | Still true? |
|---|---|---|---|---|---|---|---|---|---|---|
| `custom:component_lint` | `code` | satisfied | — | 0 | 4677 | yes | yes | — | — | unknown |
| `eslint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `house_rules` | `code` | recorded (not blocking) | — | 1 | 1 | yes | yes | — | — | unknown |
| `phpcs` | `code` | satisfied | — | 0 | 473 | yes | yes | — | — | unknown |
| `phpstan` | `code` | satisfied | — | 0 | 3671 | yes | yes | — | — | unknown |
| `prettier` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `stylelint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `coverage` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `eslint` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `mutation` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `parity` | `test` | satisfied | — | 0 | 6891 | yes | yes | — | — | unknown |
| `phpcs` | `test` | satisfied | — | 0 | 428 | yes | yes | — | — | unknown |
| `phpstan` | `test` | satisfied | — | 0 | 3448 | yes | yes | — | — | unknown |
| `phpunit` | `test` | satisfied | — | 0 | 1367 | yes | yes | — | **`phpunit.xml.dist`** | unknown |
| `playwright` | `test` | satisfied | — | 0 | 62051 | yes | yes | — | — | unknown |
| `prettier` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `coverage` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `custom:component_lint` | `complete` | satisfied | — | 0 | 4401 | yes | yes | — | — | unknown |
| `eslint` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `house_rules` | `complete` | recorded (not blocking) | — | 1 | 2 | yes | yes | — | — | unknown |
| `mutation` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `parity` | `complete` | satisfied | — | 0 | 7371 | yes | yes | — | — | unknown |
| `phpcs` | `complete` | satisfied | — | 0 | 526 | yes | yes | — | — | unknown |
| `phpstan` | `complete` | satisfied | — | 0 | 3844 | yes | yes | — | — | unknown |
| `phpunit` | `complete` | satisfied | — | 0 | 1369 | yes | yes | — | **`phpunit.xml.dist`** | unknown |
| `playwright` | `complete` | satisfied | — | 0 | 58516 | yes | yes | — | — | unknown |
| `prettier` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `stylelint` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `wiki_fresh` | `complete` | satisfied | — | 0 | 941 | yes | yes | — | — | unknown |

**29 gates adjudicated. 17 measured something.** That second number
is the INPUT to §6's V score, and it is not the score: a gate that
could not have failed scores zero whatever its status, and no column
here knows what a gate was pointed at.

**2 of those verdicts were reached under config this run changed.**
The column names each file. Its diff is the rule the run set, and
nothing in this record says whether that rule is the one the
project would have held the work to.

**No verdict here could be checked for expiry.** No gate recorded
a subject: each was off, could not run here, or discovers its own
paths from a config file this record cannot read (a `phpstan.neon`,
a ruleset with `<file>` entries). A gate that ran against paths
droost chose records them, and a `paths` lever records itself.
Treat every green above as unverified against the tree as it now
stands.

### Earlier attempts

The store is append-only: a retried gate gets a new row rather than
overwriting the one it failed on. This is the feedback loop, with
what it corrected. Gates that never ran in any attempt — off, or no
site to ask — are not retries and are not listed here.

- `custom:component_lint` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 4692 ms: custom:component_lint passed — component_lint passed: 12 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).
  - attempt 2 — satisfied (—), exit 0, 4750 ms: custom:component_lint passed — component_lint passed: 12 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).
- `house_rules` in `code` — 3 attempts, ending recorded (not blocking):
  - attempt 1 — recorded (not blocking) (—), exit 1, 1 ms: report — house_rules — 2 break(s) of the house rules (HR1): web/themes/custom/wildbills/templates/html.html.twig (HR1); web/themes/custom/wildbills/templates/page.html.twig (HR1)
  - attempt 2 — recorded (not blocking) (—), exit 1, 2 ms: report — house_rules — 2 break(s) of the house rules (HR1): web/themes/custom/wildbills/templates/html.html.twig (HR1); web/themes/custom/wildbills/templates/page.html.twig (HR1)
- `phpcs` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 3365 ms: phpcs passed — ticket scope: 12 file(s) this run changed, not the whole configured set
  - attempt 2 — satisfied (—), exit 0, 455 ms: phpcs passed — ticket scope: 12 file(s) this run changed, not the whole configured set
- `phpstan` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 21210 ms: phpstan passed — ticket scope: 12 file(s) this run changed, not the whole configured set
  - attempt 2 — satisfied (—), exit 0, 5281 ms: phpstan passed — ticket scope: 12 file(s) this run changed, not the whole configured set
- `parity` in `test` — 2 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 6875 ms: parity passed — 2 view(s) (1 route(s) at 1280 and 390px) as the reference against http://localhost:5399 (captured 2026-10-22T21:52:25.363Z) (D1–D7, frame scope); not judged, not built yet (the routes  … (cut)
- `phpcs` in `test` — 2 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 492 ms: phpcs passed — ticket scope: 14 file(s) this run changed, not the whole configured set
- `phpstan` in `test` — 2 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 3287 ms: phpstan passed — ticket scope: 14 file(s) this run changed, not the whole configured set
- `phpunit` in `test` — 2 attempts, ending satisfied:
  - attempt 1 — BLOCKED (environment), exit — not recorded —, — not recorded — ms: could not run: <site>/vendor/bin/phpunit --no-progress --do-not-fail-on-empty-test-suite (no phpunit.xml or phpunit.xml.dist at the project root)
- `playwright` in `test` — 2 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 57850 ms: playwright passed — 16 passed

### Invocations, as recorded

```
# custom:component_lint (code), attempt 1
run droost/gates/component-lint.php

# house_rules (code), attempt 1
house rules: HR1

# phpcs (code), attempt 1
<site>/vendor/bin/phpcs -q --report=json --standard=Drupal,DrupalPractice --extensions=php,module,install,inc,theme,profile,engine --ignore=*/node_modules/*,*/vendor/*,*/.claude/*,*/droost/droost-workflow/*,*/droost/baseline/*,*/.droost-workflow/* web/modules/custom/wildbills_site/src/Dealership.php web/modules/custom/wildbills_site/src/DemoNotices.php web/modules/custom/wildbills_site/src/Form/DealershipSettingsForm.php web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php web/modules/custom/wildbills_site/src/HoursSummary.php web/modules/custom/wildbills_site/src/Plugin/Block/SiteFooterBlock.php web/modules/custom/wildbills_site/src/Plugin/Block/SiteFrameBlockBase.php web/modules/custom/wildbills_site/src/Plugin/Block/SiteHeaderBlock.php web/modules/custom/wildbills_site/test

… 8017 of 10017 characters cut from the middle (evidence --full shows them all) …

wildbills_site/src/HoursSummary.php web/modules/custom/wildbills_site/src/Plugin/Block/SiteFooterBlock.php web/modules/custom/wildbills_site/src/Plugin/Block/SiteFrameBlockBase.php web/modules/custom/wildbills_site/src/Plugin/Block/SiteHeaderBlock.php web/modules/custom/wildbills_site/tests/src/Unit/DealershipTest.php web/modules/custom/wildbills_site/tests/src/Unit/HoursSummaryTest.php web/modules/custom/wildbills_site/tests/src/Unit/WildbillsSiteHooksTest.php web/modules/custom/wildbills_site/wildbills_site.install web/themes/custom/wildbills/wildbills.theme

# phpunit (complete), attempt 1
<site>/vendor/bin/phpunit --no-progress --do-not-fail-on-empty-test-suite

# playwright (complete), attempt 1
<site>/node_modules/.bin/playwright test

# wiki_fresh (complete), attempt 1
<site>/tools/droost/vendor/droost/workflow/bin/droost code:wiki status --json

```

### Declarations — what the plan promised

| Kind | Declared | Audited in | State | Fault | Summary |
|---|---|---|---|---|---|
| `file` | 8 | `complete` | recorded (not blocking) | — | 8 declared path(s), no undeclared changes. But 2 changed path(s) are covered only by a later re-declaration, not by the first declaration (2026-10-23T01:39:26+00:00): droost/wiki/wildbills.md, droost/ … (cut) |
| `test` | 6 | `test` | recorded (not blocking) | — | NOT VERIFIED — droost cannot see which tests a suite ran, only that one ran and how many. 6 planned, on record: DealershipTest, HoursSummaryTest, WildbillsSiteHooksTest, dealership.spec.ts, frame.spec … (cut) |
| `type_coverage` | — not recorded — | `test` | satisfied | — | mixed work: phpcs, phpstan, phpunit all measured something |
| `work_type` | — not recorded — | `complete` | satisfied | — | declared "mixed" (mixed); the diff matches |
| `tests_in_diff` | — not recorded — | `test` | satisfied | — | 3 phpunit test file(s) changed alongside 8 file(s) under src/: web/modules/custom/wildbills_site/tests/src/Unit/DealershipTest.php, web/modules/custom/wildbills_site/tests/src/Unit/HoursSummaryTest.ph … (cut) |

Three things read as green from a distance and none of them is.
A declared count with no audit is a promise nobody checked. An audit
with nothing declared is a check with nothing to hold the diff to.
And — the common case, so read the rows rather than the states — an
audit that RAN and could not check what it was given: `declared_tests`
is always `recorded`, because droost sees that a suite ran and how many
tests it held, never which ones. Only `declared_files` is audited
against the diff.

Files declared:

- `.gitignore`
- `config/sync`
- `droost/canvas`
- `droost/wiki`
- `phpunit.xml.dist`
- `tests/e2e`
- `web/modules/custom/wildbills_site`
- `web/themes/custom/wildbills`

Tests declared:

- `DealershipTest`
- `HoursSummaryTest`
- `WildbillsSiteHooksTest`
- `dealership.spec.ts`
- `frame.spec.ts`
- `home.spec.ts`

### Checks that are neither gates nor declarations

Every attempt, not just the latest — there are few of them and each
one is a thing a phase could not end without.

| Kind | Item | Phase | Attempt | State | Fault | Summary |
|---|---|---|---|---|---|---|
| `check` | `plan_grounded` | `plan` | 1 | satisfied | — | plan looked: 14 knowledge call(s) this run (brief ×2, code:symbol ×3, code:tree ×2, code:wiki ×6, search:arch ×1), and 14 Grounding citation(s) resolve; the code index is ready |
| `spec` | `criteria_table` | `complete` | 1 | satisfied | — | 18 criteria were declared this run and are counted by their declared proofs (18 verified by a test, 0 manual, 0 unverified); the spec's table does not count them. |

## 4a. The tool-call ledger — what droost was ACTUALLY asked

One row per tool result, successes and refusals alike. This is the
only place in the system that is not the subject's account of itself.

| Measure | Value | Reading |
|---|---|---|
| Total calls | 15 | every tool result, successes and refusals alike |
| Distinct tools | 5 | — |
| **Knowledge calls** (the codegraph, search, wiki, introspection and the brief: `KNOWLEDGE_TOOLS`) | 15 | the codebase was reached |
| Refusals (`outcome: fail`) | 0 | each one is a gate that was off, or an argument that was wrong |

### By phase

The JSONL ledger this replaced carried no phase, so its lines could
not be attributed to one from the record alone.

| Phase | Calls | Distinct tools | Knowledge |
|---|---|---|---|
| `code` | 1 | 1 | 1 |
| `plan` | 14 | 5 | 14 |

### Every tool called

| Tool | Calls | Class |
|---|---|---|
| `code:wiki` | 6 | knowledge |
| `code:tree` | 3 | knowledge |
| `code:symbol` | 3 | knowledge |
| `brief` | 2 | knowledge |
| `search:arch` | 1 | knowledge |

What this section still cannot answer, and the template's §4a asks
for: **scaffold-vs-handwritten** (how many added files came from a
blueprint and how many were typed). It needs the diff, which is not in
the store.

## 4b. Grounding — the three tiers, and whether each was reached

`plan_grounded` resolves the spec's `## Grounding` table at plan and
records its verdict among the checks (§4): each citation, and whether
it resolved in this project. §4a says whether any knowledge command
was called at all. The two halves fail independently, and a pass on
one tells you nothing about the other.

## 4c. Transcripts — what the tool actually said

What droost parsed is in §4 and §8a. This is what the tool wrote,
which is the only thing that helps when the parse was wrong or the
tool died before producing anything structured.

#### `custom:component_lint` — `code`, attempt 1, `stdout` — satisfied

```

component_lint passed: 12 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `custom:component_lint` — `code`, attempt 2, `stdout` — satisfied

```

component_lint passed: 12 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `custom:component_lint` — `code`, attempt 3, `stdout` — satisfied

```

component_lint passed: 12 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `phpcs` — `code`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/DemoNotices.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Form\/DealershipSettingsForm.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Bl

… 94 of 2094 characters cut from the middle (evidence --full shows them all) …

\/contrib\/droost\/wildbills-a\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Block\/SiteFrameBlockBase.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Block\/SiteHeaderBlock.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.install":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/themes\/custom\/wildbills\/wildbills.theme":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpcs` — `code`, attempt 2, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/DemoNotices.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Form\/DealershipSettingsForm.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Bl

… 94 of 2094 characters cut from the middle (evidence --full shows them all) …

\/contrib\/droost\/wildbills-a\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Block\/SiteFrameBlockBase.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Block\/SiteHeaderBlock.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.install":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/themes\/custom\/wildbills\/wildbills.theme":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpcs` — `code`, attempt 3, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/DemoNotices.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Form\/DealershipSettingsForm.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Bl

… 278 of 2278 characters cut from the middle (evidence --full shows them all) …

contrib\/droost\/wildbills-a\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Block\/SiteHeaderBlock.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.install":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/themes\/custom\/wildbills\/wildbills.theme":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpstan` — `code`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"file_errors":0},"files":{},"errors":[]}
```

#### `phpstan` — `code`, attempt 2, `stdout` — satisfied

```
{"totals":{"errors":0,"file_errors":0},"files":{},"errors":[]}
```

#### `phpstan` — `code`, attempt 3, `stdout` — satisfied

```
{"totals":{"errors":0,"file_errors":0},"files":{},"errors":[]}
```

#### `parity` — `test`, attempt 1, `stdout` — satisfied

```
{"parity":{"status":"pass","scope":"frame","source":"http://localhost:5399","summary":"2 view(s) (1 route(s) at 1280 and 390px) as the reference against http://localhost:5399 (captured 2026-10-22T21:52:25.363Z) (D1–D7, frame scope); not judged, not built yet (the routes lever): /vehicles, /contact, /location; judged at https://wildbills-a.ddev.site (from .ddev/config.yaml); set aside by decision: \"Status uses your device's clock.\" on /location (Q8); added by decision: \"Status uses the dealership's local time.\" after \"Closed\" on /location (Q8)","base":"https://wildbills-a.ddev.site","base_from":".ddev/config.yaml","routes":[{"route":"/","view":"/","width":1280,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/","view":"/@390","width":390,"scope":"frame","verdict":"PASS","failing":[]}],"skipped":[],"not_judged":["/vehicles","/contact","/location"],"set_aside":[{"route":"/location","text":"Status uses your device's clock.","decided":"Q8","why":"the open status is worked out in the dealership's time zone, not the visitor's clock"}],"added":[{"route":"/location","text":"Status uses the dealership's local time.","after":"Closed","decided":"Q8","why":"the note under the hours says which clock the open status uses"}]}}

```

#### `parity` — `test`, attempt 2, `stdout` — satisfied

```
{"parity":{"status":"pass","scope":"frame","source":"http://localhost:5399","summary":"2 view(s) (1 route(s) at 1280 and 390px) as the reference against http://localhost:5399 (captured 2026-10-22T21:52:25.363Z) (D1–D7, frame scope); not judged, not built yet (the routes lever): /vehicles, /contact, /location; judged at https://wildbills-a.ddev.site (from .ddev/config.yaml); set aside by decision: \"Status uses your device's clock.\" on /location (Q8); added by decision: \"Status uses the dealership's local time.\" after \"Closed\" on /location (Q8)","base":"https://wildbills-a.ddev.site","base_from":".ddev/config.yaml","routes":[{"route":"/","view":"/","width":1280,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/","view":"/@390","width":390,"scope":"frame","verdict":"PASS","failing":[]}],"skipped":[],"not_judged":["/vehicles","/contact","/location"],"set_aside":[{"route":"/location","text":"Status uses your device's clock.","decided":"Q8","why":"the open status is worked out in the dealership's time zone, not the visitor's clock"}],"added":[{"route":"/location","text":"Status uses the dealership's local time.","after":"Closed","decided":"Q8","why":"the note under the hours says which clock the open status uses"}]}}

```

#### `phpcs` — `test`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/DemoNotices.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Form\/DealershipSettingsForm.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Bl

… 278 of 2278 characters cut from the middle (evidence --full shows them all) …

contrib\/droost\/wildbills-a\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Block\/SiteHeaderBlock.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.install":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/themes\/custom\/wildbills\/wildbills.theme":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpcs` — `test`, attempt 2, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/DemoNotices.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Form\/DealershipSettingsForm.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Bl

… 278 of 2278 characters cut from the middle (evidence --full shows them all) …

contrib\/droost\/wildbills-a\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Block\/SiteHeaderBlock.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.install":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/themes\/custom\/wildbills\/wildbills.theme":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpstan` — `test`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"file_errors":0},"files":{},"errors":[]}
```

#### `phpstan` — `test`, attempt 2, `stdout` — satisfied

```
{"totals":{"errors":0,"file_errors":0},"files":{},"errors":[]}
```

#### `phpunit` — `test`, attempt 2, `stdout` — satisfied

```
PHPUnit 11.5.57 by Sebastian Bergmann and contributors.

Runtime:       PHP 8.4.26
Configuration: <site>/phpunit.xml.dist

Time: 00:00.035, Memory: 16.00 MB

OK (22 tests, 37 assertions)

```

#### `playwright` — `test`, attempt 1, `stdout` — satisfied

```

Running 16 tests using 1 worker

  ✓   1 [chromium] › tests/e2e/dealership.spec.ts:56:5 › AC-18: anonymous visitors are refused the form; a content editor reaches it (4.7s)
  ✓   2 [chromium] › tests/e2e/dealership.spec.ts:63:5 › AC-9: the time zone is chosen from the list, America/Chicago to start (8.7s)
  ✓   3 [chromium] › tests/e2e/dealership.spec.ts:74:5 › AC-8 and AC-10: new contact lines and hours reach the header and footer (5.1s)
  ✓   4 [chromium] › tests/e2e/dealership.spec.ts:105:5 › the form refuses a day that closes before it opens (4.4s)
  ✓   5 [chromium] › tests/e2e/dealership.spec.ts:114:5 › AC-11: turning the demo notices off removes every demo notice and sample label (5.1s)
  ✓   6 [chromium] › tests/e2e/frame.spec.ts:20:7 › header at 1280 › AC-1: demo bar, brand, links with the current page marked, Browse cars (433ms)
  ✓   7 [chromium] › tests/e2e/frame.spec.ts:51:7 › header at 390 › AC-2: the links fold into a menu button that opens them and the call button (426

… 177 of 2177 characters cut from the middle (evidence --full shows them all) …

.spec.ts:92:7 › footer › AC-4: brand, Pages, Hours (sample), Contact (sample) and the two footnotes (286ms)
  ✓  10 [chromium] › tests/e2e/frame.spec.ts:121:7 › footer › AC-5: no privacy links and no consent dialog (1.0s)
  ✓  11 [chromium] › tests/e2e/frame.spec.ts:134:7 › keyboard › AC-6: Skip to content is the first stop, and focus is visible on every control (300ms)
  ✓  12 [chromium] › tests/e2e/home.spec.ts:11:5 › AC-13: the five copy sections, in the source order (285ms)
  ✓  13 [chromium] › tests/e2e/home.spec.ts:64:5 › AC-15: the title, description, theme colour and green favicon (598ms)
  ✓  14 [chromium] › tests/e2e/home.spec.ts:82:7 › reduced motion › AC-16: sections that reveal on scroll show at once, without motion (360ms)
  ✓  15 [chromium] › tests/e2e/home.spec.ts:99:5 › AC-16 (control): without the preference, sections below the fold wait to reveal (426ms)
  ✓  16 [chromium] › tests/e2e/home.spec.ts:107:5 › AC-17: /index.html redirects to / (17ms)

  16 passed (57.5s)

```

#### `playwright` — `test`, attempt 2, `stdout` — satisfied

```

Running 16 tests using 1 worker

  ✓   1 [chromium] › tests/e2e/dealership.spec.ts:56:5 › AC-18: anonymous visitors are refused the form; a content editor reaches it (5.1s)
  ✓   2 [chromium] › tests/e2e/dealership.spec.ts:63:5 › AC-9: the time zone is chosen from the list, America/Chicago to start (10.2s)
  ✓   3 [chromium] › tests/e2e/dealership.spec.ts:74:5 › AC-8 and AC-10: new contact lines and hours reach the header and footer (5.1s)
  ✓   4 [chromium] › tests/e2e/dealership.spec.ts:105:5 › the form refuses a day that closes before it opens (4.6s)
  ✓   5 [chromium] › tests/e2e/dealership.spec.ts:114:5 › AC-11: turning the demo notices off removes every demo notice and sample label (5.4s)
  ✓   6 [chromium] › tests/e2e/frame.spec.ts:20:7 › header at 1280 › AC-1: demo bar, brand, links with the current page marked, Browse cars (506ms)
  ✓   7 [chromium] › tests/e2e/frame.spec.ts:51:7 › header at 390 › AC-2: the links fold into a menu button that opens them and the call button (1.

… 176 of 2176 characters cut from the middle (evidence --full shows them all) …

e.spec.ts:92:7 › footer › AC-4: brand, Pages, Hours (sample), Contact (sample) and the two footnotes (374ms)
  ✓  10 [chromium] › tests/e2e/frame.spec.ts:121:7 › footer › AC-5: no privacy links and no consent dialog (1.0s)
  ✓  11 [chromium] › tests/e2e/frame.spec.ts:134:7 › keyboard › AC-6: Skip to content is the first stop, and focus is visible on every control (283ms)
  ✓  12 [chromium] › tests/e2e/home.spec.ts:11:5 › AC-13: the five copy sections, in the source order (401ms)
  ✓  13 [chromium] › tests/e2e/home.spec.ts:64:5 › AC-15: the title, description, theme colour and green favicon (539ms)
  ✓  14 [chromium] › tests/e2e/home.spec.ts:82:7 › reduced motion › AC-16: sections that reveal on scroll show at once, without motion (638ms)
  ✓  15 [chromium] › tests/e2e/home.spec.ts:99:5 › AC-16 (control): without the preference, sections below the fold wait to reveal (330ms)
  ✓  16 [chromium] › tests/e2e/home.spec.ts:107:5 › AC-17: /index.html redirects to / (21ms)

  16 passed (1.0m)

```

#### `custom:component_lint` — `complete`, attempt 1, `stdout` — satisfied

```

component_lint passed: 12 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `parity` — `complete`, attempt 1, `stdout` — satisfied

```
{"parity":{"status":"pass","scope":"frame","source":"http://localhost:5399","summary":"2 view(s) (1 route(s) at 1280 and 390px) as the reference against http://localhost:5399 (captured 2026-10-22T21:52:25.363Z) (D1–D7, frame scope); not judged, not built yet (the routes lever): /vehicles, /contact, /location; judged at https://wildbills-a.ddev.site (from .ddev/config.yaml); set aside by decision: \"Status uses your device's clock.\" on /location (Q8); added by decision: \"Status uses the dealership's local time.\" after \"Closed\" on /location (Q8)","base":"https://wildbills-a.ddev.site","base_from":".ddev/config.yaml","routes":[{"route":"/","view":"/","width":1280,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/","view":"/@390","width":390,"scope":"frame","verdict":"PASS","failing":[]}],"skipped":[],"not_judged":["/vehicles","/contact","/location"],"set_aside":[{"route":"/location","text":"Status uses your device's clock.","decided":"Q8","why":"the open status is worked out in the dealership's time zone, not the visitor's clock"}],"added":[{"route":"/location","text":"Status uses the dealership's local time.","after":"Closed","decided":"Q8","why":"the note under the hours says which clock the open status uses"}]}}

```

#### `phpcs` — `complete`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/DemoNotices.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Form\/DealershipSettingsForm.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Bl

… 278 of 2278 characters cut from the middle (evidence --full shows them all) …

contrib\/droost\/wildbills-a\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/Block\/SiteHeaderBlock.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.install":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/themes\/custom\/wildbills\/wildbills.theme":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpstan` — `complete`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"file_errors":0},"files":{},"errors":[]}
```

#### `phpunit` — `complete`, attempt 1, `stdout` — satisfied

```
PHPUnit 11.5.57 by Sebastian Bergmann and contributors.

Runtime:       PHP 8.4.26
Configuration: <site>/phpunit.xml.dist

Time: 00:00.038, Memory: 16.00 MB

OK (22 tests, 37 assertions)

```

#### `playwright` — `complete`, attempt 1, `stdout` — satisfied

```

Running 16 tests using 1 worker

  ✓   1 [chromium] › tests/e2e/dealership.spec.ts:56:5 › AC-18: anonymous visitors are refused the form; a content editor reaches it (4.8s)
  ✓   2 [chromium] › tests/e2e/dealership.spec.ts:63:5 › AC-9: the time zone is chosen from the list, America/Chicago to start (8.4s)
  ✓   3 [chromium] › tests/e2e/dealership.spec.ts:74:5 › AC-8 and AC-10: new contact lines and hours reach the header and footer (5.4s)
  ✓   4 [chromium] › tests/e2e/dealership.spec.ts:105:5 › the form refuses a day that closes before it opens (4.7s)
  ✓   5 [chromium] › tests/e2e/dealership.spec.ts:114:5 › AC-11: turning the demo notices off removes every demo notice and sample label (5.0s)
  ✓   6 [chromium] › tests/e2e/frame.spec.ts:20:7 › header at 1280 › AC-1: demo bar, brand, links with the current page marked, Browse cars (665ms)
  ✓   7 [chromium] › tests/e2e/frame.spec.ts:51:7 › header at 390 › AC-2: the links fold into a menu button that opens them and the call button (550

… 178 of 2178 characters cut from the middle (evidence --full shows them all) …

spec.ts:92:7 › footer › AC-4: brand, Pages, Hours (sample), Contact (sample) and the two footnotes (497ms)
  ✓  10 [chromium] › tests/e2e/frame.spec.ts:121:7 › footer › AC-5: no privacy links and no consent dialog (997ms)
  ✓  11 [chromium] › tests/e2e/frame.spec.ts:134:7 › keyboard › AC-6: Skip to content is the first stop, and focus is visible on every control (525ms)
  ✓  12 [chromium] › tests/e2e/home.spec.ts:11:5 › AC-13: the five copy sections, in the source order (539ms)
  ✓  13 [chromium] › tests/e2e/home.spec.ts:64:5 › AC-15: the title, description, theme colour and green favicon (502ms)
  ✓  14 [chromium] › tests/e2e/home.spec.ts:82:7 › reduced motion › AC-16: sections that reveal on scroll show at once, without motion (490ms)
  ✓  15 [chromium] › tests/e2e/home.spec.ts:99:5 › AC-16 (control): without the preference, sections below the fold wait to reveal (566ms)
  ✓  16 [chromium] › tests/e2e/home.spec.ts:107:5 › AC-17: /index.html redirects to / (18ms)

  16 passed (58.2s)

```

#### `wiki_fresh` — `complete`, attempt 1, `stdout` — satisfied

```
{
    "bundle_path": "droost/wiki",
    "checked": "2026-10-23T03:19:56Z",
    "summary": {
        "pages": 2,
        "fresh": 2,
        "stale": 0,
        "orphaned": 0,
        "invalid": 0,
        "unmanaged": 0,
        "uncovered_modules": 0
    },
    "pages": [
        {
            "file": "wildbills.md",
            "status": "fresh",
            "modules": [
                "wildbills"
            ],
            "stale_sources": [],
            "missing_sources": [],
            "error": null
        },
        {
            "file": "wildbills_site.md",
            "status": "fresh",
            "modules": [
                "wildbills_site"
            ],
            "stale_sources": [],
            "missing_sources": [],
            "error": null
        }
    ],
    "uncovered": [],
    "installed_from": "the configuration export of 2026-10-23T02:14:51+00:00 (<site>/config/sync/core.extension.yml)",
    "contrib_scope_measured": true,
    "ok": true
}

```

## 4d. The seeker's findings — what an adversarial read caught

Written from the ledger droost PARSED, never from the agent's summary
of it — the counts and the rows come from the same place, so they
cannot disagree.

| Ref | Round | Severity | Location | Finding | Status |
|---|---|---|---|---|---|
| `F1` | 1 | MEDIUM | `web/modules/custom/wildbills_site/config/schema/wildbills_site.schema.yml:1` | The module has no `block.settings.wildbills_site_header` or `block.settings.wildbills_site_footer` schema. Typed-config validation of the exported `block.block.wildbills_site_header`/`_footer` rejects 9 keys as "not a supported key" (brand_mark, brand_name, brand_tagline, cta_label, cta_url, about). `wildbills_site.dealership` also fails validation because it has no langcode, and its `name` is a translatable `label`. Strict-schema kernel and functional tests will fail, and config translation cannot see these strings. | open |
| `F2` | 1 | MEDIUM | `web/themes/custom/wildbills/wildbills.info.yml:22` | `libraries-override` turns off `droost_theme/global`, `jit` and `tokens` across the whole front end. But all 21 `sdc.droost_theme.*` Canvas components stay enabled (`status: true` in config/sync), and their only styling is daisyUI/Tailwind (e.g. hero.twig `hero-overlay bg-neutral/60`, `text-5xl`). So any droost_theme component an editor places, and any page drawn by droost_theme templates, now renders unstyled. Realized records the override but not this effect on what the site offers. | open |
| `F3` | 1 | MEDIUM | `web/modules/custom/wildbills_site/src/Plugin/Block/SiteFooterBlock.php:83` | The new-year max-age never reaches anonymous visitors. page_cache is enabled, the response carries `Expires: 1978`, and `PageCache::storeResponse()` then stores with `Cache::PERMANENT` and ignores the bubbled max-age (`/` answers `x-drupal-cache: HIT`). The cached home page keeps "© 2026" past 1 January until some cache tag is cleared. The spec's "max-age ends at the next new year" does not work on the main path. AC-4 holds today. | open |
| `F4` | 1 | MEDIUM | `droost/canvas/home.tree.json:17` | The tree hard-codes media `target_id` "1" and "2" (lines 17, 61). These match only when `_wildbills_site_write_media()` makes a site's first two media. AC-15's description was set by hand with drush and is in no committed file. The install docblock (wildbills_site.install:24-26) says the hook works during a config import, but at that point the `image` media type and `field_media_image` may not have been imported yet. I did not test that, so treat that part as doubtful. As a result, the diff cannot rebuild `/` on a fresh site. Realized names the id coupling but not the other two gaps. | open |
| `F5` | 1 | MEDIUM | `config/sync/canvas.component.sdc.wildbills.site_header.yml:1` | The five frame SDCs (page, site_header, site_footer, nav_link, brand) are exported as enabled Canvas components. page.component.yml says it "is not for placing on a Canvas page". A Site header or footer placed by an editor takes typed phone, hours and `demo_notices` props instead of the dealership form, so the site has two sources for the same details. That contradicts spec lines 120-121 ("The prop is not declared in any schema, so Canvas does not offer it to editors"). No criterion or spec line asks for them to be offered. | open |
| `F6` | 1 | LOW | `config/sync/canvas.folder.0021a3e4-32b4-40ed-b987-b7a2bc9a08d6.yml:1` | An empty Canvas folder named "Probe" (`items: {}`) was exported with this run and will show in editors' component library. It looks left over from a probe, and Realized silently counts it among the "four Canvas folders". | open |
| `F1` | 2 (self-reviewed) | MEDIUM | `web/modules/custom/wildbills_site/config/schema/wildbills_site.schema.yml:1` | No block settings schema for the two blocks; the dealership config has no langcode. | resolved |
| `F2` | 2 (self-reviewed) | MEDIUM | `web/themes/custom/wildbills/wildbills.info.yml:22` | droost_theme's 21 Canvas components were left enabled although the theme drops their CSS. | resolved |
| `F3` | 2 (self-reviewed) | MEDIUM | `web/modules/custom/wildbills_site/src/Plugin/Block/SiteFooterBlock.php:83` | The new-year max-age never reaches the page cache. | resolved |
| `F4` | 2 (self-reviewed) | MEDIUM | `droost/canvas/home.tree.json:17` | Hard-coded media ids, a hand-set description, and media made in hook_install. | resolved |
| `F5` | 2 (self-reviewed) | MEDIUM | `config/sync/canvas.component.sdc.wildbills.site_header.yml:1` | The five frame SDCs were offered to editors as Canvas components. | resolved |
| `F6` | 2 (self-reviewed) | LOW | `config/sync/canvas.folder.0021a3e4-32b4-40ed-b987-b7a2bc9a08d6.yml:1` | An empty "Probe" Canvas folder was exported. | resolved |

**Rounds:**

- round 1: 6 findings
- round 2: 6 findings — SELF-REVIEWED: the author's own status update, not an inspection; it releases no hold

**6 distinct findings across 2 rounds; 0 still open** by the
latest round that mentioned each. An open finding at the end of a
run is not a failure of the run — it is the part a reader has to
judge, which is why it is here rather than summarised away.

**6 still open as the last seeker left them.** The difference is the
author's own word in a self-reviewed round: the engine releases no hold
on it, and a reader should not either without reading the fix.

## 4e. The declared spec — structure written by a tool call

A declared row cannot be mis-shaped. Each line below is a tool call
that happened, and the engine's question about it is a count — not
whether a heading sat in the right place or whether a list was
fenced.

### Routes declared

| Path | Declared at | Why |
|---|---|---|
| `/` | `plan` | the home page |
| `/index.html@301` | `plan` | redirects to / |
| `/admin/config/system/dealership@403` | `plan` | the dealership details form, editors only |

### Criteria declared, and what proves each

| Ref | Statement | Proven by | Wordings |
|---|---|---|---|
| `AC-1` | When a visitor opens /, the site shall render a header holding: the demo bar ("Demo site. Inventory, phone, email, address and hours shown here are sample information, not a live dealership listing.") … (cut) | re-run after the seeker fixes: tests/e2e/frame.spec.ts 'AC-1' passes | 1 |
| `AC-2` | When a visitor at 390 wide presses the menu button, the site shall show the four links and "Call (555) 123-4567 (sample)" linking to tel:+15551234567, and while the menu is closed those links and "Bro … (cut) | re-run after the seeker fixes: tests/e2e/frame.spec.ts 'AC-2' passes at 390 | 1 |
| `AC-3` | When the mobile menu is open and the visitor presses Escape, the site shall close it and return focus to the menu button. | re-run after the seeker fixes: tests/e2e/frame.spec.ts 'AC-3' passes | 1 |
| `AC-4` | When a visitor opens /, the site shall render a footer holding: the brand and "An independent used-car lot. Look at the car, ask your questions, decide in your own time."; Pages (Home, Inventory, Cont … (cut) | re-run after the footer gained the year cache tag: tests/e2e/frame.spec.ts 'AC-4' passes | 1 |
| `AC-5` | When a visitor opens /, the site shall show no "Privacy policy" link, no "My privacy settings" link and no consent dialog. | re-run after the seeker fixes: tests/e2e/frame.spec.ts 'AC-5' passes | 1 |
| `AC-6` | When a keyboard user presses Tab on /, the first element focused shall be a "Skip to content" link to #main, and every focused control shall show a visible outline. | re-run after the seeker fixes: tests/e2e/frame.spec.ts 'AC-6' passes | 1 |
| `AC-7` | When the parity gate judges / at frame scope, the header and footer shall match the reference at 1280 and 390 wide, in Bricolage Grotesque, Geist and Geist Mono. | re-run after the seeker fixes: droost-parity judge --routes / --scope frame: pass, / PASS and /@390 PASS | 1 |
| `AC-8` | When an editor saves a new phone, email, street, city or day's hours in the dealership details form, the header's call link and the footer's contact and hours shall show the new values on the next pag … (cut) | re-run after the schema/langcode fix: tests/e2e/dealership.spec.ts 'AC-8 and AC-10' passes | 1 |
| `AC-9` | When the dealership details form is saved, the time zone shall be stored as chosen from the form's list, and the form shall default to America/Chicago. | re-run after the schema/langcode fix: tests/e2e/dealership.spec.ts 'AC-9' passes | 1 |
| `AC-10` | When the week's hours are summarised, the footer shall group consecutive days with identical hours (the source's week giving "Mon–Fri 8am–7pm", "Saturday 9am–6pm", "Sunday closed"), and a change to on … (cut) | re-run: HoursSummaryTest passes (22 unit tests in the module) and dealership.spec.ts shows the split footer | 1 |
| `AC-11` | When an editor turns the demo notices off and saves, the demo bar, every "(sample)" and "sample" label in the header, footer and home hero, and the footer's "· Demonstration website" and "Vehicle phot … (cut) | re-run after the schema/langcode fix: tests/e2e/dealership.spec.ts 'AC-11' passes | 1 |
| `AC-12` | When the module is installed, demo notices shall be on (wildbills_site.dealership:demo_notices is true). | re-run: drush config:get wildbills_site.dealership demo_notices → true; config/install now carries langcode en and validates with 0 violations | 1 |
| `AC-13` | When a visitor opens /, the main content shall render, in order: the hero ("Good used cars. Plainly sold." with "Plainly" in <em>, the lede, "Browse inventory" and "Ask a question", the lot photo with … (cut) | re-run after the tree was rewritten by droost/canvas/apply-home.sh: tests/e2e/home.spec.ts 'AC-13' passes | 1 |
| `AC-14` | When an editor opens the Home page's tree, it shall hold exactly five root components, sdc.wildbills.home_hero, promise_band, how_it_works, questions_split and closing_cta, in that order, with every v … (cut) | droost/canvas/apply-home.sh → tree:validate VALID and tree:set 5 items from droost/canvas/home.tree.json (photos named media:hero.jpg / media:lot.jpg, resolved by name); tree:get 1 shows the five sdc. … (cut) | 1 |
| `AC-15` | When a visitor opens /, the page shall be titled "Wild Bill's Used Cars — Straightforward used cars, trucks and SUVs", carry the source's meta description and theme-color #173e32, and link the source' … (cut) | re-run after the description moved into metatag.metatag_defaults.front: tests/e2e/home.spec.ts 'AC-15' passes | 1 |
| `AC-16` | While the visitor prefers reduced motion, the sections that reveal on scroll shall be fully visible with no transform and no transition. | re-run: tests/e2e/home.spec.ts 'AC-16' and its control pass | 1 |
| `AC-17` | When a visitor requests /index.html, the site shall answer 301 with Location /. | re-run after hook_install lost its media step: wildbills_site_install() re-run is idempotent (1 redirect); tests/e2e/home.spec.ts 'AC-17' passes (301 → /) | 1 |
| `AC-18` | When an anonymous visitor requests /admin/config/system/dealership, the site shall answer 403; a content editor shall reach the form. | re-run: tests/e2e/dealership.spec.ts 'AC-18' passes (anonymous 403, content editor reaches the form) | 1 |

**18 declared, 0 with nothing proving them.** A proof is RECORDED,
and counted by what it came to: one recorded as partly or failed, or
naming a gate whose latest verdict failed, proves nothing (F-357).
It is not otherwise judged: `manual — <reason>` is a legitimate answer and is
reported as manual, and whether a named test is a real test is the
suite's business. What this section can say is whether the promise
was made before the proof, which is the one thing a record cannot
survive getting wrong.

## 5. Build verdict

**Not generated, and it must not be.** This section checks the
spec's own EARS acceptance criteria as they behave on a running
site — **verified live, not from the run record**. Generating it
from the run record instead would be exactly the
circularity the template exists to prevent: the run record is the
subject's account of itself, and a verdict derived from it would
agree with the subject by construction, every time, including the
times the subject was wrong.

Fill one row per criterion, against a running site:

| # | Criterion (EARS) | How verified | Result |
|---|---|---|---|

Everything droost knows that bears on this is already above: §4 says
which gates measured anything, §4a says what the agent actually asked
for, §8a says what the gates found. None of it says the thing got
built.

## 6. Score — `S / V / B`

**Not generated.** Three numbers, never collapsed — a product can be
disciplined and useless at once — and not one of them is a query:

- **S** (setup) asks whether a stranger could install droost and build
  one thing with no operator rescue. Zero if this round arranged setup
  in advance. Nothing in the store knows what was arranged.
- **V** (verification) is not §4's count of gates that measured
  something. That count is its input. A gate that could not have
  failed scores zero whatever its status, and whether a gate could
  have failed is a judgement about what it was pointed at.
- **B** (build) rests on §5, which is not generated for the reason
  given there.

| Axis | Score | Basis |
|---|---|---|
| **S** setup | `/10` | Could a stranger install it and build one thing with no operator rescue? **Zero if this round arranged setup in advance.** |
| **V** verification | `/10` | Of the gates claiming green, how many measured something (§4)? A gate that could not have failed scores zero whatever its status. |
| **B** build | `/10` | Did the requested thing get built, correctly, against §5? |

Comparable only to a round at the same preset, install shape and §2.

---

## 7a. Enforcement — was the hook there, and did it fire

Rows the GUARD wrote about itself, ingested at phase close. This is the
one thing the record could not show before: `enforcement` in §1 is the
level somebody requested, and the status document's `effective` is
inferred from the host the session declared — a claim about a claim.
These are invocations.

| Mode | Verdict | Rule | Calls |
|---|---|---|---|
| `operator-commands` | allow | — | 194 |
| `pre-tool-use` | allow | — | 43 |
| `dispatched` | allow | — | 25 |
| `nudge` | allow | `traverse` | 24 |
| `nudge` | note | `traverse:noted` | 4 |
| `operator-commands` | refuse | `protected-path:in-script` | 4 |
| `launched` | allow | — | 2 |
| `stop` | allow | — | 2 |
| `stop` | refuse | `stop-hold` | 2 |
| `operator-commands` | refuse | `protected-path:shell` | 1 |
| `operator-commands` | refuse | `protected-path:variable-program` | 1 |

**302 invocation(s), 8 refusal(s), 0 nudge(s).** The hook was
demonstrably live, so `hard` in §1 describes something that was actually
there.

**83 of these, 1 refusal(s) among them, were made inside a subagent**, not by
the run agent: `workflow-researcher` (54 call(s), 1 refused), `workflow-seeker` (29 call(s), 0 refused). A refusal there is the guard working on a
subagent's command; it says nothing about the run agent's.

**Every row says what the guard decided.** Each refusal left
through the guard's one blocking exit and names the wall that refused
it; a `nudge` is a soft wall that let the call through, counted on
every hit and not only the first; `allow` means nothing objected. The
counts above are totals.

## 7. Observability — the entire chain

**Not generated.** The chain's links are observed while the round runs
— a guard refusal on a custom write, a tool refusal's text, an
artefact on disk — and a store written by droost can only report the
links droost itself is on. Link 8 in particular (`phases`) is
subject-written by design, and corroborating it is the evaluator's
job.

Fill §7.1, §7.2 and §7.3 from `.claude/templates/evaluation.md`. Two of
its blind spots are now lit and should be answered from above rather
than listed as dark: knowledge-layer usage is §4a, and tool refusals
are the refusal count in §4a. Enforcement effectiveness — the largest
of them, and dark in every round to date — is §7a: whether the hook
was there at all is now a row rather than an assumption, and each
refusal names the wall that made it. §7a says whether its counts are
totals or, for rows an older guard wrote, a floor.

---

## 8. Findings

Two different things share this heading in the template, and only one
of them is a row. They are split here so the more valuable one is not
quietly retired by the one that generates itself.

### 8a. Check findings — what the run's checks found in the code


#### `house_rules` — `code`, attempt 1 — recorded (not blocking) (—), 2 findings — **superseded** by attempt 3 (recorded (not blocking))

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | `web/themes/custom/wildbills/templates/html.html.twig` | 0 | `HR1` | HR1: markup outside a single-directory component (no *.component.yml beside it) | {"detail":"warning"} |
| 1 | `web/themes/custom/wildbills/templates/page.html.twig` | 0 | `HR1` | HR1: markup outside a single-directory component (no *.component.yml beside it) | {"detail":"warning"} |

#### `house_rules` — `code`, attempt 2 — recorded (not blocking) (—), 2 findings — **superseded** by attempt 3 (recorded (not blocking))

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | `web/themes/custom/wildbills/templates/html.html.twig` | 0 | `HR1` | HR1: markup outside a single-directory component (no *.component.yml beside it) | {"detail":"warning"} |
| 1 | `web/themes/custom/wildbills/templates/page.html.twig` | 0 | `HR1` | HR1: markup outside a single-directory component (no *.component.yml beside it) | {"detail":"warning"} |

#### `house_rules` — `code`, attempt 3 — recorded (not blocking) (—), 2 findings

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | `web/themes/custom/wildbills/templates/html.html.twig` | 0 | `HR1` | HR1: markup outside a single-directory component (no *.component.yml beside it) | {"detail":"warning"} |
| 1 | `web/themes/custom/wildbills/templates/page.html.twig` | 0 | `HR1` | HR1: markup outside a single-directory component (no *.component.yml beside it) | {"detail":"warning"} |

#### `house_rules` — `complete`, attempt 1 — recorded (not blocking) (—), 2 findings

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | `web/themes/custom/wildbills/templates/html.html.twig` | 0 | `HR1` | HR1: markup outside a single-directory component (no *.component.yml beside it) | {"detail":"warning"} |
| 1 | `web/themes/custom/wildbills/templates/page.html.twig` | 0 | `HR1` | HR1: markup outside a single-directory component (no *.component.yml beside it) | {"detail":"warning"} |

#### `phpunit` — `complete`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"tests":22,"assertions":37}} |

#### `playwright` — `complete`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"passed":16,"failed":0,"flaky":0,"skipped":0,"interrupted":0,"did not run":0}} |

#### `phpunit` — `test`, attempt 2 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"tests":22,"assertions":37}} |

#### `playwright` — `test`, attempt 1 — satisfied (—), 1 finding — **superseded** by attempt 2 (satisfied)

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"passed":16,"failed":0,"flaky":0,"skipped":0,"interrupted":0,"did not run":0}} |

#### `playwright` — `test`, attempt 2 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"passed":16,"failed":0,"flaky":0,"skipped":0,"interrupted":0,"did not run":0}} |

### 8b. Round findings — what this round found in droost

**Not generated.** These are defects the ROUND exposed in the product,
and there is no table anywhere that holds them: finding one is the
reading, not the record. Nothing above can be promoted into this
section — a gate finding is droost working.

| # | Finding | Evidence (`file:line` / command + output) | Severity | Fixed at source? |
|---|---|---|---|---|

> A finding names a file and line, or a command and its output, or a
> field in a recorded artefact. "The agent said it passed" is not
> evidence — it is the thing under test.
