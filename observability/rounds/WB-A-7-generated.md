# Evaluation — `run-36776d8c9d4c`

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
| Round | `run-36776d8c9d4c` | measured |
| Started (as recorded) | `2026-10-23T06:40:44+00:00` | reported |
| Preset | `high` | reported |
| Mode | `agentic` | reported |
| Enforcement (requested) | `hard` | reported |
| Base commit | `a975882b736f64b319bac7cda877f7436c9c6143` | reported |
| Spec | `droost/droost-workflow/spec-r04-contact.md` | reported |
| Frozen-sections hash | `f3a103eb391bff09bc5bec347ce4e5f5` | hashed by droost, over the file run.json names |
| Spec frozen at | `2026-10-23T06:45:48+00:00` | droost's clock, at plan exit |
| Ticket / request | `R04` | declared |
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
| `phpunit` | `test, complete` | 1 | satisfied |
| `mutation` | `test, complete` | 1 | not applicable |
| `playwright` | `test, complete` | 1 | satisfied |
| `parity` | `test, complete` | 1 | satisfied |
| `coverage` | `test, complete` | 1 | not applicable |
| `house_rules` | `code, complete` | 3 | satisfied |
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
| `custom:component_lint` | `code` | satisfied | — | 0 | 4747 | yes | yes | — | — | unknown |
| `eslint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `house_rules` | `code` | satisfied | — | 0 | 1 | yes | yes | — | — | unknown |
| `phpcs` | `code` | satisfied | — | 0 | 3513 | yes | yes | — | — | unknown |
| `phpstan` | `code` | satisfied | — | 0 | 21753 | yes | yes | — | — | unknown |
| `prettier` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `stylelint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `coverage` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `eslint` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `mutation` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `parity` | `test` | satisfied | — | 0 | 35734 | yes | yes | — | — | unknown |
| `phpcs` | `test` | satisfied | — | 0 | 532 | yes | yes | — | — | unknown |
| `phpstan` | `test` | satisfied | — | 0 | 3637 | yes | yes | — | — | unknown |
| `phpunit` | `test` | satisfied | — | 0 | 4514 | yes | yes | — | — | unknown |
| `playwright` | `test` | satisfied | — | 0 | 380104 | yes | yes | — | — | unknown |
| `prettier` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `coverage` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `custom:component_lint` | `complete` | satisfied | — | 0 | 5138 | yes | yes | — | — | unknown |
| `eslint` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `house_rules` | `complete` | satisfied | — | 0 | 1 | yes | yes | — | — | unknown |
| `mutation` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `parity` | `complete` | satisfied | — | 0 | 32943 | yes | yes | — | — | unknown |
| `phpcs` | `complete` | satisfied | — | 0 | 531 | yes | yes | — | — | unknown |
| `phpstan` | `complete` | satisfied | — | 0 | 3729 | yes | yes | — | — | unknown |
| `phpunit` | `complete` | satisfied | — | 0 | 1318 | yes | yes | — | — | unknown |
| `playwright` | `complete` | satisfied | — | 0 | 351639 | yes | yes | — | — | unknown |
| `prettier` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `stylelint` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `wiki_fresh` | `complete` | satisfied | — | 0 | 2179 | yes | yes | — | — | unknown |

**29 gates adjudicated. 17 measured something.** That second number
is the INPUT to §6's V score, and it is not the score: a gate that
could not have failed scores zero whatever its status, and no column
here knows what a gate was pointed at.

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
  - attempt 1 — satisfied (—), exit 0, 4615 ms: custom:component_lint passed — component_lint passed: 26 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).
  - attempt 2 — satisfied (—), exit 0, 4636 ms: custom:component_lint passed — component_lint passed: 26 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).
- `house_rules` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 1 ms: house_rules passed — HR1 held (HR1 read 15 added file(s))
  - attempt 2 — satisfied (—), exit 0, 1 ms: house_rules passed — HR1 held (HR1 read 15 added file(s))
- `phpcs` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 591 ms: phpcs passed — ticket scope: 10 file(s) this run changed, not the whole configured set
  - attempt 2 — satisfied (—), exit 0, 451 ms: phpcs passed — ticket scope: 10 file(s) this run changed, not the whole configured set
- `phpstan` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — BLOCKED (agent), exit 1, 4853 ms: phpstan (level 6) failed (exit 1): 2 errors, at web/modules/custom/wildbills_site/src/InquiryDetails.php:86, web/modules/custom/wildbills_site/tests/src/Unit/InquiryDetailsTest.php:128 — ticket scope: … (cut)
  - attempt 2 — satisfied (—), exit 0, 3895 ms: phpstan passed — ticket scope: 10 file(s) this run changed, not the whole configured set

### Invocations, as recorded

```
# custom:component_lint (code), attempt 1
run droost/gates/component-lint.php

# house_rules (code), attempt 1
house rules: HR1

# phpcs (code), attempt 1
<site>/vendor/bin/phpcs -q --report=json --standard=Drupal,DrupalPractice --extensions=php,module,install,inc,theme,profile,engine --ignore=*/node_modules/*,*/vendor/*,*/.claude/*,*/droost/droost-workflow/*,*/droost/baseline/*,*/.droost-workflow/* web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php web/modules/custom/wildbills_site/src/HoursSummary.php web/modules/custom/wildbills_site/src/InquiryDetails.php web/modules/custom/wildbills_site/src/Inventory.php web/modules/custom/wildbills_site/src/LocationDetails.php web/modules/custom/wildbills_site/tests/src/Unit/HoursSummaryTest.php web/modules/custom/wildbills_site/tests/src/Unit/InquiryDetailsTest.php web/modules/custom/wildbills_site/tests/src/Unit/LocationDetailsTest.php web/modules/custom/wildbills_site/tests/src/Unit/

… 4812 of 6812 characters cut from the middle (evidence --full shows them all) …

dules/custom/wildbills_site/src/HoursSummary.php web/modules/custom/wildbills_site/src/InquiryDetails.php web/modules/custom/wildbills_site/src/Inventory.php web/modules/custom/wildbills_site/src/LocationDetails.php web/modules/custom/wildbills_site/tests/src/Unit/HoursSummaryTest.php web/modules/custom/wildbills_site/tests/src/Unit/InquiryDetailsTest.php web/modules/custom/wildbills_site/tests/src/Unit/LocationDetailsTest.php web/modules/custom/wildbills_site/tests/src/Unit/WildbillsSiteHooksTest.php web/modules/custom/wildbills_site/wildbills_site.deploy.php

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
| `file` | 8 | `complete` | satisfied | — | 8 declared path(s), no undeclared changes |
| `test` | 5 | `test` | recorded (not blocking) | — | NOT VERIFIED — droost cannot see which tests a suite ran, only that one ran and how many. 5 planned, on record: HoursSummaryTest, InquiryDetailsTest, LocationDetailsTest, WildbillsSiteHooksTest, conta … (cut) |
| `type_coverage` | — not recorded — | `test` | satisfied | — | mixed work: phpcs, phpstan, phpunit all measured something |
| `work_type` | — not recorded — | `complete` | satisfied | — | declared "mixed" (mixed); the diff matches |
| `tests_in_diff` | — not recorded — | `test` | satisfied | — | 4 phpunit test file(s) changed alongside 5 file(s) under src/: web/modules/custom/wildbills_site/tests/src/Unit/HoursSummaryTest.php, web/modules/custom/wildbills_site/tests/src/Unit/InquiryDetailsTes … (cut) |

Three things read as green from a distance and none of them is.
A declared count with no audit is a promise nobody checked. An audit
with nothing declared is a check with nothing to hold the diff to.
And — the common case, so read the rows rather than the states — an
audit that RAN and could not check what it was given: `declared_tests`
is always `recorded`, because droost sees that a suite ran and how many
tests it held, never which ones. Only `declared_files` is audited
against the diff.

Files declared:

- `config/sync`
- `droost/canvas/apply-contact.sh`
- `droost/canvas/contact.tree.json`
- `droost/wiki/wildbills.md`
- `droost/wiki/wildbills_site.md`
- `tests/e2e/contact.spec.ts`
- `web/modules/custom/wildbills_site`
- `web/themes/custom/wildbills`

Tests declared:

- `HoursSummaryTest`
- `InquiryDetailsTest`
- `LocationDetailsTest`
- `WildbillsSiteHooksTest`
- `contact.spec.ts`

Ticket declared: `R04`

### Checks that are neither gates nor declarations

Every attempt, not just the latest — there are few of them and each
one is a thing a phase could not end without.

| Kind | Item | Phase | Attempt | State | Fault | Summary |
|---|---|---|---|---|---|---|
| `check` | `plan_grounded` | `plan` | 1 | satisfied | — | plan looked: 6 knowledge call(s) this run (code:symbol ×2, code:tree ×2, code:wiki ×1, search:arch ×1), and 16 Grounding citation(s) resolve; the code index is ready |
| `spec` | `criteria_table` | `complete` | 1 | satisfied | — | 23 criteria were declared this run and are counted by their declared proofs (23 verified by a test, 0 manual, 0 unverified); the spec's table does not count them. |

## 4a. The tool-call ledger — what droost was ACTUALLY asked

One row per tool result, successes and refusals alike. This is the
only place in the system that is not the subject's account of itself.

| Measure | Value | Reading |
|---|---|---|
| Total calls | 8 | every tool result, successes and refusals alike |
| Distinct tools | 4 | — |
| **Knowledge calls** (the codegraph, search, wiki, introspection and the brief: `KNOWLEDGE_TOOLS`) | 8 | the codebase was reached |
| Refusals (`outcome: fail`) | 0 | each one is a gate that was off, or an argument that was wrong |

### By phase

The JSONL ledger this replaced carried no phase, so its lines could
not be attributed to one from the record alone.

| Phase | Calls | Distinct tools | Knowledge |
|---|---|---|---|
| `code` | 2 | 1 | 2 |
| `plan` | 6 | 4 | 6 |

### Every tool called

| Tool | Calls | Class |
|---|---|---|
| `code:symbol` | 4 | knowledge |
| `code:tree` | 2 | knowledge |
| `code:wiki` | 1 | knowledge |
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

component_lint passed: 26 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `custom:component_lint` — `code`, attempt 2, `stdout` — satisfied

```

component_lint passed: 26 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `custom:component_lint` — `code`, attempt 3, `stdout` — satisfied

```

component_lint passed: 26 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `phpcs` — `code`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/InquiryDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Inventory.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/InquiryDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpcs` — `code`, attempt 2, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/InquiryDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Inventory.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/InquiryDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpcs` — `code`, attempt 3, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/InquiryDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Inventory.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/InquiryDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpstan` — `code`, attempt 1, `stderr` — BLOCKED

```
Instructions for interpreting errors
---------

Each error has an associated identifier, like `argument.type`
or `return.missing`.

Each error identifier has documentation at URL https://phpstan.org/error-identifiers/<identifier>
This page contains code example, explanation why is this an error
and instruction how to fix it.
Before fixing the error, fetch the documentation page for its identifier.

The error usually indicates a real bug or incorrect type in the code. Fix the underlying cause, do not just make the error go away.
Do not add `@phpstan-ignore` comments, `@phpstan-ignore-next-line` comments, or baseline entries to suppress the error.
Do not use assert() or inline @var PHPDoc tag to override PHPStan's inferred type.
Do not add type casts just to silence errors.
Do not widen parameter or return types just to make the error go away.

```

#### `phpstan` — `code`, attempt 1, `stdout` — BLOCKED

```
{"totals":{"errors":0,"file_errors":2},"files":{"<site>/web/modules/custom/wildbills_site/src/InquiryDetails.php":{"errors":1,"messages":[{"message":"Strict comparison using !== between int and null will always evaluate to true.","line":86,"ignorable":true,"tip":"Because the type is coming from a PHPDoc, you can turn off this check by setting treatPhpDocTypesAsCertain: false in your %configurationFile%.","identifier":"notIdentical.alwaysTrue"}]},"<site>/web/modules/custom/wildbills_site/tests/src/Unit/InquiryDetailsTest.php":{"errors":1,"messages":[{"message":"Call to method PHPUnit\\Framework\\Assert::assertSame() with array{'General question', 'Specific vehicle', 'Test drive', 'Trade-in', 'Payment options', 'Vehicle search'} and array{'General question', 'Specific vehicle', 'Test drive', 'Trade-in', 'Payment options', 'Vehicle search'} will always evaluate to true.","line":128,"ignorable":true,"identifier":"method.alreadyNarrowedType"}]}},"errors":[]}
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
{"parity":{"status":"pass","scope":"frame","source":"http://localhost:5399","summary":"8 view(s) (4 route(s) at 1280 and 390px) as the reference against http://localhost:5399 (captured 2026-10-23T05:42:52.668Z) (D1–D7, frame scope; page scope for /, /vehicles, /location, /contact at 1280px; live texts not judged (they follow the clock): 8 on /location); judged at https://wildbills-a.ddev.site (from .ddev/config.yaml); set aside by decision: \"Status uses your device's clock.\" on /location (Q8); added by decision: \"Status uses the dealership's local time.\" after \"Closed\" on /location (Q8)","base":"https://wildbills-a.ddev.site","base_from":".ddev/config.yaml","routes":[{"route":"/","view":"/","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/","view":"/@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/location","view":"/location","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/location","view":"/location@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/contact","view":"/contact","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/contact","view":"/contact@390","width":390,"scope":"frame","verdict":"PASS","failing":[]}],"skipped":[],"not_judged":[],"set_aside":[{"route":"/location","text":"Status uses your device's clock.","decided":"Q8","why":"the open status is worked out in the dealership's time zone, not the visitor's clock"}],"added":[{"route":"/location","text":"Status uses the dealership's local time.","after":"Closed","decided":"Q8","why":"the note under the hours says which clock the open status uses"}]}}

```

#### `phpcs` — `test`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/InquiryDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Inventory.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/InquiryDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpstan` — `test`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"file_errors":0},"files":{},"errors":[]}
```

#### `phpunit` — `test`, attempt 1, `stdout` — satisfied

```
PHPUnit 11.5.57 by Sebastian Bergmann and contributors.

Runtime:       PHP 8.4.26
Configuration: <site>/phpunit.xml.dist

Time: 00:00.882, Memory: 20.00 MB

OK (72 tests, 138 assertions)

```

#### `playwright` — `test`, attempt 1, `stdout` — satisfied

```

Running 71 tests using 1 worker

  ✓   1 [chromium] › tests/e2e/contact.spec.ts:86:5 › AC-1, AC-2: the heading, the notice, the fields and the topics (927ms)
  ✓   2 [chromium] › tests/e2e/contact.spec.ts:113:5 › AC-3: the count follows the message, to 1000 characters (508ms)
  ✓   3 [chromium] › tests/e2e/contact.spec.ts:122:5 › AC-4, AC-5: missing fields are named, focus goes to the first, nothing is sent (1.5s)
  ✓   4 [chromium] › tests/e2e/contact.spec.ts:153:5 › AC-6, AC-7, AC-9: a valid form drafts the email; Edit brings the form back as it was (2.4s)
  ✓   5 [chromium] › tests/e2e/contact.spec.ts:195:5 › AC-8: Copy message copies the draft, or selects it when the clipboard refuses (2.9s)
  ✓   6 [chromium] › tests/e2e/contact.spec.ts:222:5 › AC-10, AC-11: ?vehicle=1 asks about the F-150, and the draft names it (1.5s)
  ✓   7 [chromium] › tests/e2e/contact.spec.ts:248:5 › AC-12: Remove drops the car, its topic and the parameter (1.6s)
  ✓   8 [chromium] › tests/e2e/contact.spec

… 7560 of 9560 characters cut from the middle (evidence --full shows them all) …

5 › AC-17: the home page keeps its closing band and its title (1.4s)
  ✓  66 [chromium] › tests/e2e/vehicle-admin.spec.ts:116:5 › AC-19: an editor adds a vehicle; its title is written; featured puts it on the home page (14.5s)
  ✓  67 [chromium] › tests/e2e/vehicle-admin.spec.ts:143:5 › AC-20: a second vehicle with the same stock number is refused (10.0s)
  ✓  68 [chromium] › tests/e2e/vehicle-admin.spec.ts:151:5 › AC-19: unpublishing a vehicle takes it off every page (12.8s)
  ✓  69 [chromium] › tests/e2e/vehicle-admin.spec.ts:170:5 › AC-16: a sold car leaves the inventory, the home page, the count and the choices it alone supplied (26.2s)
  ✓  70 [chromium] › tests/e2e/vehicle-admin.spec.ts:195:5 › AC-17: a sale-pending car stays listed with a Sale pending chip and can still be asked about (10.4s)
  ✓  71 [chromium] › tests/e2e/vehicle-admin.spec.ts:233:5 › AC-18: staff add a body style; it joins the filter and the home page once a car of it is on the lot (17.2s)

  71 passed (6.3m)

```

#### `custom:component_lint` — `complete`, attempt 1, `stdout` — satisfied

```

component_lint passed: 26 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `parity` — `complete`, attempt 1, `stdout` — satisfied

```
{"parity":{"status":"pass","scope":"frame","source":"http://localhost:5399","summary":"8 view(s) (4 route(s) at 1280 and 390px) as the reference against http://localhost:5399 (captured 2026-10-23T05:42:52.668Z) (D1–D7, frame scope; page scope for /, /vehicles, /location, /contact at 1280px; live texts not judged (they follow the clock): 8 on /location); judged at https://wildbills-a.ddev.site (from .ddev/config.yaml); set aside by decision: \"Status uses your device's clock.\" on /location (Q8); added by decision: \"Status uses the dealership's local time.\" after \"Closed\" on /location (Q8)","base":"https://wildbills-a.ddev.site","base_from":".ddev/config.yaml","routes":[{"route":"/","view":"/","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/","view":"/@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/location","view":"/location","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/location","view":"/location@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/contact","view":"/contact","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/contact","view":"/contact@390","width":390,"scope":"frame","verdict":"PASS","failing":[]}],"skipped":[],"not_judged":[],"set_aside":[{"route":"/location","text":"Status uses your device's clock.","decided":"Q8","why":"the open status is worked out in the dealership's time zone, not the visitor's clock"}],"added":[{"route":"/location","text":"Status uses the dealership's local time.","after":"Closed","decided":"Q8","why":"the note under the hours says which clock the open status uses"}]}}

```

#### `phpcs` — `complete`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursSummary.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/InquiryDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Inventory.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursSummaryTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/InquiryDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

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

Time: 00:00.071, Memory: 20.00 MB

OK (72 tests, 138 assertions)

```

#### `playwright` — `complete`, attempt 1, `stdout` — satisfied

```

Running 71 tests using 1 worker

  ✓   1 [chromium] › tests/e2e/contact.spec.ts:86:5 › AC-1, AC-2: the heading, the notice, the fields and the topics (877ms)
  ✓   2 [chromium] › tests/e2e/contact.spec.ts:113:5 › AC-3: the count follows the message, to 1000 characters (525ms)
  ✓   3 [chromium] › tests/e2e/contact.spec.ts:122:5 › AC-4, AC-5: missing fields are named, focus goes to the first, nothing is sent (1.5s)
  ✓   4 [chromium] › tests/e2e/contact.spec.ts:153:5 › AC-6, AC-7, AC-9: a valid form drafts the email; Edit brings the form back as it was (2.4s)
  ✓   5 [chromium] › tests/e2e/contact.spec.ts:195:5 › AC-8: Copy message copies the draft, or selects it when the clipboard refuses (3.0s)
  ✓   6 [chromium] › tests/e2e/contact.spec.ts:222:5 › AC-10, AC-11: ?vehicle=1 asks about the F-150, and the draft names it (1.5s)
  ✓   7 [chromium] › tests/e2e/contact.spec.ts:248:5 › AC-12: Remove drops the car, its topic and the parameter (1.5s)
  ✓   8 [chromium] › tests/e2e/contact.spec

… 7571 of 9571 characters cut from the middle (evidence --full shows them all) …

5 › AC-17: the home page keeps its closing band and its title (660ms)
  ✓  66 [chromium] › tests/e2e/vehicle-admin.spec.ts:116:5 › AC-19: an editor adds a vehicle; its title is written; featured puts it on the home page (11.7s)
  ✓  67 [chromium] › tests/e2e/vehicle-admin.spec.ts:143:5 › AC-20: a second vehicle with the same stock number is refused (9.6s)
  ✓  68 [chromium] › tests/e2e/vehicle-admin.spec.ts:151:5 › AC-19: unpublishing a vehicle takes it off every page (10.9s)
  ✓  69 [chromium] › tests/e2e/vehicle-admin.spec.ts:170:5 › AC-16: a sold car leaves the inventory, the home page, the count and the choices it alone supplied (26.3s)
  ✓  70 [chromium] › tests/e2e/vehicle-admin.spec.ts:195:5 › AC-17: a sale-pending car stays listed with a Sale pending chip and can still be asked about (10.1s)
  ✓  71 [chromium] › tests/e2e/vehicle-admin.spec.ts:233:5 › AC-18: staff add a body style; it joins the filter and the home page once a car of it is on the lot (14.7s)

  71 passed (5.9m)

```

#### `wiki_fresh` — `complete`, attempt 1, `stdout` — satisfied

```
{
    "bundle_path": "droost/wiki",
    "checked": "2026-10-23T07:30:19Z",
    "summary": {
        "pages": 2,
        "fresh": 2,
        "stale": 0,
        "orphaned": 0,
        "invalid": 0,
        "unmanaged": 0,
        "uncovered_modules": 1
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
    "uncovered": [
        "redirect"
    ],
    "installed_from": "the configuration export of 2026-10-23T03:50:25+00:00 (<site>/config/sync/core.extension.yml)",
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
| `F1` | 1 | LOW | `droost/droost-workflow/spec-r04-contact.md:120` | Drift from the spec. The spec says `InquiryDetails` supplies `message` and that `InquiryDetailsTest` covers "the filled-in message", but the sentence moved to `inquiry_form.twig` and no unit test covers it. `## Realized` records the move and the e2e test 'AC-10, AC-11' asserts the exact message, so AC-10 is still proven; only the Tests list is out of date. | open |
| `F2` | 1 | LOW | `droost/droost-workflow/spec-r04-contact.md:82` | The approach says that after Remove "the draft no longer names the car", but the filled-in message still names it ("Hi, I'm interested in the 2021 Ford F-150 …"). `contact.spec.ts:254` asserts it stays, as the source does. AC-12 (no Vehicle or Listing line, a "Website inquiry:" subject) is met. This only misleads about how far Remove goes, and the visitor can see the message on screen. | open |
| `F3` | 1 | LOW | `web/modules/custom/wildbills_site/src/InquiryDetails.php:168` | Dead new code. `vehicle()` returns a `stock` key that nothing reads. The template and script use only `stock_label` and `listing`; the docblock in `inquiry_form.twig` still lists `stock`. | open |
| `F1` | 2 (self-reviewed) | LOW | `droost/droost-workflow/spec-r04-contact.md:120` | The spec said `InquiryDetails` supplies `message` and that its unit test covers it. Fixed in the spec: the props list and the custom-code list no longer name `message`; the Tests list says the filled-in message is built in Twig and proven end to end (AC-10). | resolved |
| `F2` | 2 (self-reviewed) | LOW | `droost/droost-workflow/spec-r04-contact.md:82` | The approach overstated Remove. It now says that Remove drops the subject's car and the Vehicle and Listing lines, and that the message keeps its words, as the source's does. | resolved |
| `F3` | 2 (self-reviewed) | LOW | `web/modules/custom/wildbills_site/src/InquiryDetails.php:168` | The unused `stock` key is gone from `vehicle()`, from its unit test and from the `inquiry_form.twig` docblock. phpstan level 6 is clean, unit 72/72, contact.spec.ts 16/16 and parity 8/8, all re-run after the change, and every criterion is re-recorded. | resolved |

**Rounds:**

- round 1: 3 findings
- round 2: 3 findings — SELF-REVIEWED: the author's own status update, not an inspection; it releases no hold

**3 distinct findings across 2 rounds; 0 still open** by the
latest round that mentioned each. An open finding at the end of a
run is not a failure of the run — it is the part a reader has to
judge, which is why it is here rather than summarised away.

**3 still open as the last seeker left them.** The difference is the
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
| `/contact` | `code` | the Contact page with the inquiry form |
| `/contact.html@301` | `code` | to /contact, carrying the query |

### Criteria declared, and what proves each

| Ref | Statement | Proven by | Wordings |
|---|---|---|---|
| `AC-1` | When a visitor opens /contact, the site shall show the eyebrow "Contact", the heading "Ask us anything." and the lede "About a specific car, a test drive, your trade-in or how payment works. Write it  … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-1; unit 72/72 OK | 1 |
| `AC-2` | When a visitor opens /contact, the form shall show the notice "This site has no message server. Submitting prepares an email in your own mail app. Nothing is sent until you press send there.", the fie … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-2; unit 72/72 OK | 1 |
| `AC-3` | When a visitor types in Message, the count shall read "<characters> / 1000", and Message shall take no more than 1000 characters | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-3; unit 72/72 OK | 1 |
| `AC-4` | When a visitor submits with the name, email or message empty, the form shall show "Please add your name.", "Please add your email." and "Please write a short message." beside those fields, mark them ` … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-4; unit 72/72 OK | 1 |
| `AC-5` | When a visitor corrects a marked field, its message shall clear as they type | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-5; unit 72/72 OK | 1 |
| `AC-6` | When a visitor submits a valid form, the form shall be replaced by "Not sent yet. Your message is ready but has not left this page.", "Your email is ready to send.", the sentence naming the dealership … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-6; unit 72/72 OK | 1 |
| `AC-7` | When the hand-off shows, "Open in email app" shall be a `mailto:` link to the dealership's email whose subject and body are that subject and body, URI-encoded | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-7; unit 72/72 OK | 1 |
| `AC-8` | When a visitor presses "Copy message", the preview's text shall be copied and the status shall read "Copied. Paste it into a new email to send."; when the clipboard refuses, the preview's text shall b … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-8; unit 72/72 OK | 1 |
| `AC-9` | When a visitor presses "Edit message", the form shall come back with every field as it was, and focus shall move to Message | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-9; unit 72/72 OK | 1 |
| `AC-10` | When a visitor opens /contact?vehicle=1, the form shall show the "ASKING ABOUT" card with the car's photo, "2021 Ford F-150", "$38,900 · 42,000 mi · Magnetic Gray" and a Remove button; Topic shall be  … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-10; unit 72/72 OK | 1 |
| `AC-11` | When a visitor submits the form at /contact?vehicle=1, the subject shall be "Inquiry: 2021 Ford F-150" and the body shall carry "Vehicle: 2021 Ford F-150 · Stock #001 · $38,900" and "Listing: <site>/v … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-11; unit 72/72 OK | 1 |
| `AC-12` | When a visitor presses Remove, the card shall go, Topic shall return to General question if it was Specific vehicle, the address shall lose its `vehicle` parameter, and a draft prepared after it shall … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-12; unit 72/72 OK | 1 |
| `AC-13` | When a visitor opens /contact?topic=Test%20drive, Topic shall be Test drive; when the topic is not one of the six, Topic shall be General question | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-13; unit 72/72 OK | 1 |
| `AC-14` | When /contact?vehicle= names a sold car, an unpublished car or no car, the form shall open without the card, with General question and an empty message (Q11); when it names a sale-pending car, the car … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-14; unit 72/72 OK | 1 |
| `AC-15` | When /contact and /contact?vehicle=1 are each served from the page cache, each shall show its own form (no card, and the card), and when that car is then marked sold, /contact?vehicle=1 shall open wit … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-15; unit 72/72 OK | 1 |
| `AC-16` | When a visitor opens /contact, the side column shall show Phone (the dealership's number as a `tel:` link, then "Placeholder number from the original site."), Email (a `mailto:` link), Visit (street a … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-16; unit 72/72 OK | 1 |
| `AC-17` | When the demo notices are switched off, the four cards' "sample" tags and the hand-off's "sample address" shall not render | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-17; unit 72/72 OK | 1 |
| `AC-18` | When a visitor opens /contact, the title shall be "Contact — Wild Bill's Used Cars" and the meta description "Ask Wild Bill's Used Cars about a vehicle, a test drive, trade-ins or payment options. Pre … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-18; unit 72/72 OK | 1 |
| `AC-19` | When a visitor requests /contact.html, /contact.html?vehicle=3 or /contact.html?topic=Trade-in, the site shall answer 301 to /contact with the same query | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-19; unit 72/72 OK | 1 |
| `AC-20` | When an editor reads /contact's tree, it shall hold `page_head` and `contact_grid` as its roots, `inquiry_form` in the grid's `main` slot and the four info cards in `aside` | re-read after the seeker's LOW fixes: canvas tree:get 5 → page_head and contact_grid roots, inquiry_form in main, four info_cards (phone, email, address_text, hours) in aside | 1 |
| `AC-21` | When a visitor presses "Ask about this car" in a car's pop-up on /vehicles, or "Ask about a test drive" on /location, /contact shall open with that car, or with Test drive, chosen | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-21; unit 72/72 OK | 1 |
| `AC-22` | When /location and /vehicles render after this change, the location page's cards shall keep their spacing and the inventory's fields their look, and the footer's hours shall still read "Mon–Fri 8am–7p … (cut) | re-run after the seeker's LOW fixes (unused 'stock' key dropped): tests/e2e/contact.spec.ts 16/16 passes, including the test named for AC-22; unit 72/72 OK | 1 |
| `AC-23` | When /contact is rendered at 1280 and at 390 wide, the parity gate shall judge it, with the frame, against the source's reference, and every page below it shall still pass | re-run after the seeker's LOW fixes: droost-parity pass 8/8 views (/, /vehicles, /contact, /location at 1280 and 390, page scope) | 1 |

**23 declared, 0 with nothing proving them.** A proof is RECORDED,
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
| `operator-commands` | allow | — | 108 |
| `dispatched` | allow | — | 10 |
| `pre-tool-use` | allow | — | 6 |
| `launched` | allow | — | 1 |
| `nudge` | note | `traverse:noted` | 1 |
| `stop` | allow | — | 1 |
| `stop` | refuse | `stop-hold` | 1 |

**128 invocation(s), 1 refusal(s), 0 nudge(s).** The hook was
demonstrably live, so `hard` in §1 describes something that was actually
there.

**23 of these, 0 refusal(s) among them, were made inside a subagent**, not by
the run agent: `workflow-seeker` (23 call(s), 0 refused). A refusal there is the guard working on a
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


#### `phpstan` — `code`, attempt 1 — BLOCKED (agent), 2 findings — **superseded** by attempt 3 (satisfied)

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | `web/modules/custom/wildbills_site/src/InquiryDetails.php` | 86 | `notIdentical.alwaysTrue` | Strict comparison using !== between int and null will always evaluate to true. | {"detail":"error"} |
| 1 | `web/modules/custom/wildbills_site/tests/src/Unit/InquiryDetailsTest.php` | 128 | `method.alreadyNarrowedType` | Call to method PHPUnit\Framework\Assert::assertSame() with array{'General question', 'Specific vehicle', 'Test drive', 'Trade-in', 'Payment options', 'Vehicle search'} and array{'General question', 'S … (cut) | {"detail":"error"} |

#### `phpunit` — `complete`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"tests":72,"assertions":138}} |

#### `playwright` — `complete`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"passed":71,"failed":0,"flaky":0,"skipped":0,"interrupted":0,"did not run":0}} |

#### `wiki_fresh` — `complete`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | `wiki.uncovered` | no wiki page covers redirect | {"extension":"redirect"} |

#### `phpunit` — `test`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"tests":72,"assertions":138}} |

#### `playwright` — `test`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"passed":71,"failed":0,"flaky":0,"skipped":0,"interrupted":0,"did not run":0}} |

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
