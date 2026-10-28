# Evaluation — `run-7162859aa54b`

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
| Round | `run-7162859aa54b` | measured |
| Started (as recorded) | `2026-10-23T03:29:37+00:00` | reported |
| Preset | `high` | reported |
| Mode | `agentic` | reported |
| Enforcement (requested) | `hard` | reported |
| Base commit | `2c8e58ed1ff1f55fdb4a075dcf236bb7dc431a88` | reported |
| Spec | `droost/droost-workflow/spec-r02-vehicles.md` | reported |
| Frozen-sections hash | `75859156cb1385c91aef8fbd7ed2c2c5` | hashed by droost, over the file run.json names |
| Spec frozen at | `2026-10-23T03:37:31+00:00` | droost's clock, at plan exit |
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
| `phpcs` | `code, test, complete` | 2 | satisfied |
| `phpstan` | `code, test, complete` | 2 | satisfied |
| `eslint` | `code, test, complete` | 2 | not applicable |
| `stylelint` | `code, complete` | 2 | not applicable |
| `prettier` | `code, test, complete` | 2 | not applicable |
| `phpunit` | `test, complete` | 1 | satisfied |
| `mutation` | `test, complete` | 1 | not applicable |
| `playwright` | `test, complete` | 1 | satisfied |
| `parity` | `test, complete` | 1 | satisfied |
| `coverage` | `test, complete` | 1 | not applicable |
| `house_rules` | `code, complete` | 2 | satisfied |
| `wiki_fresh` | `complete` | 1 | satisfied |
| `custom:component_lint` | `code, complete` | 2 | satisfied |

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
| `custom:component_lint` | `code` | satisfied | — | 0 | 4595 | yes | yes | — | — | unknown |
| `eslint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `house_rules` | `code` | satisfied | — | 0 | 1 | yes | yes | — | — | unknown |
| `phpcs` | `code` | satisfied | — | 0 | 2573 | yes | yes | — | — | unknown |
| `phpstan` | `code` | satisfied | — | 0 | 20804 | yes | yes | — | — | unknown |
| `prettier` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `stylelint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `coverage` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `eslint` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `mutation` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `parity` | `test` | satisfied | — | 0 | 18077 | yes | yes | — | — | unknown |
| `phpcs` | `test` | satisfied | — | 0 | 494 | yes | yes | — | — | unknown |
| `phpstan` | `test` | satisfied | — | 0 | 3281 | yes | yes | — | — | unknown |
| `phpunit` | `test` | satisfied | — | 0 | 1510 | yes | yes | — | — | unknown |
| `playwright` | `test` | satisfied | — | 0 | 216073 | yes | yes | — | — | unknown |
| `prettier` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `coverage` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `custom:component_lint` | `complete` | satisfied | — | 0 | 4656 | yes | yes | — | — | unknown |
| `eslint` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `house_rules` | `complete` | satisfied | — | 0 | 3 | yes | yes | — | — | unknown |
| `mutation` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `parity` | `complete` | satisfied | — | 0 | 18096 | yes | yes | — | — | unknown |
| `phpcs` | `complete` | satisfied | — | 0 | 484 | yes | yes | — | — | unknown |
| `phpstan` | `complete` | satisfied | — | 0 | 3608 | yes | yes | — | — | unknown |
| `phpunit` | `complete` | satisfied | — | 0 | 1288 | yes | yes | — | — | unknown |
| `playwright` | `complete` | satisfied | — | 0 | 214475 | yes | yes | — | — | unknown |
| `prettier` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `stylelint` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `wiki_fresh` | `complete` | satisfied | — | 0 | 2299 | yes | yes | — | — | unknown |

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

- `custom:component_lint` in `code` — 2 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 4633 ms: custom:component_lint passed — component_lint passed: 20 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).
- `house_rules` in `code` — 2 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 1 ms: house_rules passed — HR1 held (HR1 read 99 added file(s))
- `phpcs` in `code` — 2 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 3278 ms: phpcs passed — ticket scope: 11 file(s) this run changed, not the whole configured set
- `phpstan` in `code` — 2 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 21351 ms: phpstan passed — ticket scope: 11 file(s) this run changed, not the whole configured set

### Invocations, as recorded

```
# custom:component_lint (code), attempt 1
run droost/gates/component-lint.php

# house_rules (code), attempt 1
house rules: HR1

# phpcs (code), attempt 1
<site>/vendor/bin/phpcs -q --report=json --standard=Drupal,DrupalPractice --extensions=php,module,install,inc,theme,profile,engine --ignore=*/node_modules/*,*/vendor/*,*/.claude/*,*/droost/droost-workflow/*,*/droost/baseline/*,*/.droost-workflow/* web/modules/custom/wildbills_site/src/EventSubscriber/VehicleRedirectSubscriber.php web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php web/modules/custom/wildbills_site/src/Inventory.php web/modules/custom/wildbills_site/src/InventoryFacets.php web/modules/custom/wildbills_site/src/Plugin/views/style/InventoryStyle.php web/modules/custom/wildbills_site/src/VehicleCount.php web/modules/custom/wildbills_site/src/VehicleTitle.php web/modules/custom/wildbills_site/tests/src/Unit/InventoryFacetsTest.php web/modules/custom/wildbills_site

… 5252 of 7252 characters cut from the middle (evidence --full shows them all) …

les/custom/wildbills_site/src/Inventory.php web/modules/custom/wildbills_site/src/InventoryFacets.php web/modules/custom/wildbills_site/src/Plugin/views/style/InventoryStyle.php web/modules/custom/wildbills_site/src/VehicleCount.php web/modules/custom/wildbills_site/src/VehicleTitle.php web/modules/custom/wildbills_site/tests/src/Unit/InventoryFacetsTest.php web/modules/custom/wildbills_site/tests/src/Unit/VehicleTitleTest.php web/modules/custom/wildbills_site/tests/src/Unit/WildbillsSiteHooksTest.php web/modules/custom/wildbills_site/wildbills_site.deploy.php

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
| `file` | 6 | `complete` | satisfied | — | 6 declared path(s), no undeclared changes |
| `test` | 5 | `test` | recorded (not blocking) | — | NOT VERIFIED — droost cannot see which tests a suite ran, only that one ran and how many. 5 planned, on record: InventoryFacetsTest, VehicleTitleTest, home.spec.ts, inventory.spec.ts, vehicle-admin.sp … (cut) |
| `type_coverage` | — not recorded — | `test` | satisfied | — | mixed work: phpcs, phpstan, phpunit all measured something |
| `work_type` | — not recorded — | `complete` | satisfied | — | declared "mixed" (mixed); the diff matches |
| `tests_in_diff` | — not recorded — | `test` | satisfied | — | 3 phpunit test file(s) changed alongside 7 file(s) under src/: web/modules/custom/wildbills_site/tests/src/Unit/InventoryFacetsTest.php, web/modules/custom/wildbills_site/tests/src/Unit/VehicleTitleTe … (cut) |

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
- `droost/canvas`
- `droost/wiki`
- `tests/e2e`
- `web/modules/custom/wildbills_site`
- `web/themes/custom/wildbills`

Tests declared:

- `InventoryFacetsTest`
- `VehicleTitleTest`
- `home.spec.ts`
- `inventory.spec.ts`
- `vehicle-admin.spec.ts`

### Checks that are neither gates nor declarations

Every attempt, not just the latest — there are few of them and each
one is a thing a phase could not end without.

| Kind | Item | Phase | Attempt | State | Fault | Summary |
|---|---|---|---|---|---|---|
| `check` | `plan_grounded` | `plan` | 1 | satisfied | — | plan looked: 5 knowledge call(s) this run (code:tree ×2, code:wiki ×3), and 18 Grounding citation(s) resolve; the code index is ready |
| `spec` | `criteria_table` | `complete` | 1 | satisfied | — | 26 criteria were declared this run and are counted by their declared proofs (26 verified by a test, 0 manual, 0 unverified); the spec's table does not count them. |

## 4a. The tool-call ledger — what droost was ACTUALLY asked

One row per tool result, successes and refusals alike. This is the
only place in the system that is not the subject's account of itself.

| Measure | Value | Reading |
|---|---|---|
| Total calls | 5 | every tool result, successes and refusals alike |
| Distinct tools | 2 | — |
| **Knowledge calls** (the codegraph, search, wiki, introspection and the brief: `KNOWLEDGE_TOOLS`) | 5 | the codebase was reached |
| Refusals (`outcome: fail`) | 0 | each one is a gate that was off, or an argument that was wrong |

### By phase

The JSONL ledger this replaced carried no phase, so its lines could
not be attributed to one from the record alone.

| Phase | Calls | Distinct tools | Knowledge |
|---|---|---|---|
| `plan` | 5 | 2 | 5 |

### Every tool called

| Tool | Calls | Class |
|---|---|---|
| `code:wiki` | 3 | knowledge |
| `code:tree` | 2 | knowledge |

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

component_lint passed: 20 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `custom:component_lint` — `code`, attempt 2, `stdout` — satisfied

```

component_lint passed: 20 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `phpcs` — `code`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/EventSubscriber\/VehicleRedirectSubscriber.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Inventory.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/InventoryFacets.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/views\/style\/InventoryStyle.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/VehicleCount.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/VehicleTitle.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/InventoryFacetsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/VehicleTitleTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpcs` — `code`, attempt 2, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/EventSubscriber\/VehicleRedirectSubscriber.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Inventory.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/InventoryFacets.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/views\/style\/InventoryStyle.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/VehicleCount.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/VehicleTitle.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/InventoryFacetsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/VehicleTitleTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpstan` — `code`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"file_errors":0},"files":{},"errors":[]}
```

#### `phpstan` — `code`, attempt 2, `stdout` — satisfied

```
{"totals":{"errors":0,"file_errors":0},"files":{},"errors":[]}
```

#### `parity` — `test`, attempt 1, `stdout` — satisfied

```
{"parity":{"status":"pass","scope":"frame","source":"http://localhost:5399","summary":"4 view(s) (2 route(s) at 1280 and 390px) as the reference against http://localhost:5399 (captured 2026-10-22T21:52:25.363Z) (D1–D7, frame scope; page scope for /, /vehicles at 1280px); not judged, not built yet (the routes lever): /contact, /location; judged at https://wildbills-a.ddev.site (from .ddev/config.yaml); set aside by decision: \"Status uses your device's clock.\" on /location (Q8); added by decision: \"Status uses the dealership's local time.\" after \"Closed\" on /location (Q8)","base":"https://wildbills-a.ddev.site","base_from":".ddev/config.yaml","routes":[{"route":"/","view":"/","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/","view":"/@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles@390","width":390,"scope":"frame","verdict":"PASS","failing":[]}],"skipped":[],"not_judged":["/contact","/location"],"set_aside":[{"route":"/location","text":"Status uses your device's clock.","decided":"Q8","why":"the open status is worked out in the dealership's time zone, not the visitor's clock"}],"added":[{"route":"/location","text":"Status uses the dealership's local time.","after":"Closed","decided":"Q8","why":"the note under the hours says which clock the open status uses"}]}}

```

#### `phpcs` — `test`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/EventSubscriber\/VehicleRedirectSubscriber.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Inventory.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/InventoryFacets.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/views\/style\/InventoryStyle.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/VehicleCount.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/VehicleTitle.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/InventoryFacetsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/VehicleTitleTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

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

Time: 00:00.046, Memory: 18.00 MB

OK (35 tests, 63 assertions)

```

#### `playwright` — `test`, attempt 1, `stdout` — satisfied

```

Running 39 tests using 1 worker

  ✓   1 [chromium] › tests/e2e/dealership.spec.ts:56:5 › AC-18: anonymous visitors are refused the form; a content editor reaches it (4.9s)
  ✓   2 [chromium] › tests/e2e/dealership.spec.ts:63:5 › AC-9: the time zone is chosen from the list, America/Chicago to start (8.6s)
  ✓   3 [chromium] › tests/e2e/dealership.spec.ts:74:5 › AC-8 and AC-10: new contact lines and hours reach the header and footer (5.4s)
  ✓   4 [chromium] › tests/e2e/dealership.spec.ts:105:5 › the form refuses a day that closes before it opens (4.3s)
  ✓   5 [chromium] › tests/e2e/dealership.spec.ts:114:5 › AC-11: turning the demo notices off removes every demo notice and sample label (5.5s)
  ✓   6 [chromium] › tests/e2e/frame.spec.ts:20:7 › header at 1280 › AC-1: demo bar, brand, links with the current page marked, Browse cars (679ms)
  ✓   7 [chromium] › tests/e2e/frame.spec.ts:51:7 › header at 390 › AC-2: the links fold into a menu button that opens them and the call button (567

… 3354 of 5354 characters cut from the middle (evidence --full shows them all) …

 › AC-22: /vehicles.html redirects to /vehicles with its query (31ms)
  ✓  34 [chromium] › tests/e2e/vehicle-admin.spec.ts:116:5 › AC-19: an editor adds a vehicle; its title is written; featured puts it on the home page (12.1s)
  ✓  35 [chromium] › tests/e2e/vehicle-admin.spec.ts:143:5 › AC-20: a second vehicle with the same stock number is refused (10.3s)
  ✓  36 [chromium] › tests/e2e/vehicle-admin.spec.ts:151:5 › AC-19: unpublishing a vehicle takes it off every page (10.8s)
  ✓  37 [chromium] › tests/e2e/vehicle-admin.spec.ts:170:5 › AC-16: a sold car leaves the inventory, the home page, the count and the choices it alone supplied (26.0s)
  ✓  38 [chromium] › tests/e2e/vehicle-admin.spec.ts:195:5 › AC-17: a sale-pending car stays listed with a Sale pending chip and can still be asked about (9.9s)
  ✓  39 [chromium] › tests/e2e/vehicle-admin.spec.ts:233:5 › AC-18: staff add a body style; it joins the filter and the home page once a car of it is on the lot (14.8s)

  39 passed (3.6m)

```

#### `custom:component_lint` — `complete`, attempt 1, `stdout` — satisfied

```

component_lint passed: 20 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `parity` — `complete`, attempt 1, `stdout` — satisfied

```
{"parity":{"status":"pass","scope":"frame","source":"http://localhost:5399","summary":"4 view(s) (2 route(s) at 1280 and 390px) as the reference against http://localhost:5399 (captured 2026-10-22T21:52:25.363Z) (D1–D7, frame scope; page scope for /, /vehicles at 1280px); not judged, not built yet (the routes lever): /contact, /location; judged at https://wildbills-a.ddev.site (from .ddev/config.yaml); set aside by decision: \"Status uses your device's clock.\" on /location (Q8); added by decision: \"Status uses the dealership's local time.\" after \"Closed\" on /location (Q8)","base":"https://wildbills-a.ddev.site","base_from":".ddev/config.yaml","routes":[{"route":"/","view":"/","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/","view":"/@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles@390","width":390,"scope":"frame","verdict":"PASS","failing":[]}],"skipped":[],"not_judged":["/contact","/location"],"set_aside":[{"route":"/location","text":"Status uses your device's clock.","decided":"Q8","why":"the open status is worked out in the dealership's time zone, not the visitor's clock"}],"added":[{"route":"/location","text":"Status uses the dealership's local time.","after":"Closed","decided":"Q8","why":"the note under the hours says which clock the open status uses"}]}}

```

#### `phpcs` — `complete`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/EventSubscriber\/VehicleRedirectSubscriber.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Inventory.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/InventoryFacets.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Plugin\/views\/style\/InventoryStyle.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/VehicleCount.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/VehicleTitle.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/InventoryFacetsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/VehicleTitleTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

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

Time: 00:00.050, Memory: 18.00 MB

OK (35 tests, 63 assertions)

```

#### `playwright` — `complete`, attempt 1, `stdout` — satisfied

```

Running 39 tests using 1 worker

  ✓   1 [chromium] › tests/e2e/dealership.spec.ts:56:5 › AC-18: anonymous visitors are refused the form; a content editor reaches it (4.8s)
  ✓   2 [chromium] › tests/e2e/dealership.spec.ts:63:5 › AC-9: the time zone is chosen from the list, America/Chicago to start (8.6s)
  ✓   3 [chromium] › tests/e2e/dealership.spec.ts:74:5 › AC-8 and AC-10: new contact lines and hours reach the header and footer (5.2s)
  ✓   4 [chromium] › tests/e2e/dealership.spec.ts:105:5 › the form refuses a day that closes before it opens (4.4s)
  ✓   5 [chromium] › tests/e2e/dealership.spec.ts:114:5 › AC-11: turning the demo notices off removes every demo notice and sample label (5.8s)
  ✓   6 [chromium] › tests/e2e/frame.spec.ts:20:7 › header at 1280 › AC-1: demo bar, brand, links with the current page marked, Browse cars (648ms)
  ✓   7 [chromium] › tests/e2e/frame.spec.ts:51:7 › header at 390 › AC-2: the links fold into a menu button that opens them and the call button (543

… 3353 of 5353 characters cut from the middle (evidence --full shows them all) …

5 › AC-22: /vehicles.html redirects to /vehicles with its query (23ms)
  ✓  34 [chromium] › tests/e2e/vehicle-admin.spec.ts:116:5 › AC-19: an editor adds a vehicle; its title is written; featured puts it on the home page (12.0s)
  ✓  35 [chromium] › tests/e2e/vehicle-admin.spec.ts:143:5 › AC-20: a second vehicle with the same stock number is refused (9.6s)
  ✓  36 [chromium] › tests/e2e/vehicle-admin.spec.ts:151:5 › AC-19: unpublishing a vehicle takes it off every page (11.2s)
  ✓  37 [chromium] › tests/e2e/vehicle-admin.spec.ts:170:5 › AC-16: a sold car leaves the inventory, the home page, the count and the choices it alone supplied (26.0s)
  ✓  38 [chromium] › tests/e2e/vehicle-admin.spec.ts:195:5 › AC-17: a sale-pending car stays listed with a Sale pending chip and can still be asked about (9.8s)
  ✓  39 [chromium] › tests/e2e/vehicle-admin.spec.ts:233:5 › AC-18: staff add a body style; it joins the filter and the home page once a car of it is on the lot (14.7s)

  39 passed (3.6m)

```

#### `wiki_fresh` — `complete`, attempt 1, `stdout` — satisfied

```
{
    "bundle_path": "droost/wiki",
    "checked": "2026-10-23T04:57:40Z",
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
| `F1` | 1 | HIGH | `config/sync/user.role.content_editor.yml:54` | AC-18: the role gains create/edit terms but not `access taxonomy overview` (live check: content_editor gets access 0 to `entity.taxonomy_vocabulary.overview_form` for body_style and to the vocabulary list). So the "drag-to-order overview" the content model names as the way staff set order, and any list of existing terms, is refused to editors. The plan's "it already has … taxonomy overview access it needs; checked at code" is false, and so is Realized's "create, edit and delete … terms in both vocabularies" (no delete-terms permission is granted). AC-18's proof creates the Van term and changes its weight through drush PHP, never as staff, so the staff path in the criterion is unproven | open |
| `F2` | 1 | HIGH | `web/modules/custom/wildbills_site/src/InventoryFacets.php:1` | AC-25: proof recorded 03:53:13; InventoryFacets.php was edited at 03:53:48 and InventoryStyle.php at 03:54:02, so the proof predates the code it covers. I re-ran the unit suite (35 tests pass), so this likely only needs re-recording, but the recorded proof as it stands is stale | open |
| `F3` | 1 | HIGH | `web/modules/custom/wildbills_site/wildbills_site.deploy.php:33` | AC-1–AC-12, AC-21, AC-22, AC-24 (proofs 03:56) and AC-9 (04:23:21): recorded before deploy.php changed (04:09; it builds the 15 samples), before the vehicle type, workflow and form-display export (04:23:27), and before tests/e2e/inventory.spec.ts, the named proof test, was itself edited (04:29). Doubt stated: `config:status` shows the export equals the DB the tests ran against, and the deploy-hook change does not touch existing content, so behaviour is probably unchanged. Still, no proof covers the current test file and seed code | open |
| `F4` | 1 | MEDIUM | `config/sync/canvas.component.block.views_block.vehicles-block_featured.yml:3` | Spec drift: the plan says "Both views-block Canvas components are enabled", but both (this file and canvas.component.block.views_block.body_styles-block_tiles.yml:3) are `status: false`, also on the live site. The existing tree still renders them, but an editor cannot place or re-add the featured list or the tiles from the Canvas library. Realized does not record this departure | open |
| `F5` | 1 | LOW | `config/sync/user.role.content_editor.yml:67` | Drift: `delete own vehicle content`, `edit own vehicle content` (:77) and `view vehicle revisions` (:96) are granted beyond the spec's create / edit any / delete any. The first two duplicate the "any" grants. None is recorded | open |
| `F6` | 1 | LOW | `web/themes/custom/wildbills/components/inventory/inventory.js:168` | New inline suppression `eslint-disable-next-line no-use-before-define`. It is harmless (`reset` is a hoisted function declaration, and eslint is off by preset), but it is a suppression the levers did not ask for | open |
| `F7` | 1 | LOW | `config/sync/views.view.body_styles.yml:146` | The tile link `/vehicles?type=[term:name]` puts a staff-written term name into the query unencoded. A body style named with `&amp;`, `#` or `+` gets a tile whose `?type=` does not match its filter button, so the tile opens /vehicles with All chosen | open |
| `F1` | 2 (self-reviewed) | HIGH | `config/sync/user.role.content_editor.yml:54` | Content editors could not reach the body-style overview to set the order, nor delete terms; AC-18's staff path was proven only through drush. | resolved |
| `F2` | 2 (self-reviewed) | HIGH | `web/modules/custom/wildbills_site/src/InventoryFacets.php:1` | AC-25's proof predated the last edit to the code it covers. | resolved |
| `F3` | 2 (self-reviewed) | HIGH | `web/modules/custom/wildbills_site/wildbills_site.deploy.php:33` | The inventory criteria's proofs predated the deploy-hook change, the config export and the proof test's own edit. | resolved |
| `F4` | 2 (self-reviewed) | MEDIUM | `config/sync/canvas.component.block.views_block.vehicles-block_featured.yml:3` | The two views-block Canvas components were disabled, contrary to the plan. | resolved |
| `F5` | 2 (self-reviewed) | LOW | `config/sync/user.role.content_editor.yml:67` | `edit own` / `delete own vehicle content` duplicated the "any" grants; `view vehicle revisions` was unrecorded. | resolved |
| `F6` | 2 (self-reviewed) | LOW | `web/themes/custom/wildbills/components/inventory/inventory.js:168` | An eslint suppression nobody asked for. | resolved |
| `F7` | 2 (self-reviewed) | LOW | `config/sync/views.view.body_styles.yml:146` | The tile link put the term name in the query unencoded. | resolved |

**Rounds:**

- round 1: 7 findings
- round 2: 7 findings — SELF-REVIEWED: the author's own status update, not an inspection; it releases no hold

**7 distinct findings across 2 rounds; 0 still open** by the
latest round that mentioned each. An open finding at the end of a
run is not a failure of the run — it is the part a reader has to
judge, which is why it is here rather than summarised away.

**7 still open as the last seeker left them.** The difference is the
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
| `/vehicles` | `plan` | the inventory |
| `/` | `plan` | the home page, with its featured cards and tiles |
| `/vehicles.html@301` | `plan` | redirects to /vehicles with its query |

### Criteria declared, and what proves each

| Ref | Statement | Proven by | Wordings |
|---|---|---|---|
| `AC-1` | When a visitor opens /vehicles, the site shall show "Sample inventory · not live stock", "The lot." and the source's lede, then the 15 vehicles as cards, featured first and then by stock number, with  … (cut) | tests/e2e/inventory.spec.ts › AC-1 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-2` | When /vehicles renders, each card shall show its photo, exactly one chip ("Sale pending" if pending, else "Featured" if featured, else its body style), "2021 · TRUCK", "Ford F-150", "42,000 mi", "Magn … (cut) | tests/e2e/inventory.spec.ts › AC-2 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-3` | When a visitor types in Search, picks a body style (All, then Trucks, SUVs, Cars in staff order), a make (All makes, then the seven makes), or moves the max price, minimum year or max mileage slider,  … (cut) | tests/e2e/inventory.spec.ts › AC-3 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-4` | When a visitor removes a chip, the site shall clear that filter; while two or more chips are shown a "Clear all" control shall reset every filter, as shall Reset. | tests/e2e/inventory.spec.ts › AC-4 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-5` | When a visitor picks each of the five sorts, the site shall order the cards as the source's sorters do (featured first; price low to high; price high to low; newest first then lower mileage; lowest mi … (cut) | tests/e2e/inventory.spec.ts › AC-5 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-6` | When no vehicle matches, the site shall show "Nothing matches that combination." with "Reset all filters" (which restores all 15) and "Ask us to look" linking to /contact?topic=Vehicle%20search. | tests/e2e/inventory.spec.ts › AC-6 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-7` | While the viewport is 390 wide, the filters shall be hidden behind a "Filters" button that shows them and reads "Hide filters". | tests/e2e/inventory.spec.ts › at 390 wide › AC-7 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-8` | When a visitor opens /vehicles?type=Truck, Trucks shall be chosen and only trucks listed; when the type is unknown, All shall be chosen. | tests/e2e/inventory.spec.ts › AC-8 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-9` | When the 15 samples are listed, the sliders shall run $25k–$60k, 2019–2022 and 10k–80k; when a listed vehicle lies outside those ends, the ends shall widen to include it and it shall be listed by defa … (cut) | tests/e2e/inventory.spec.ts › AC-9; tests/e2e/vehicle-admin.spec.ts › AC-19 (a $61,250 2023 car with 5,000 mi widens the ends and is listed by default); InventoryFacetsTest::testOutlierWidensTheRanges … (cut) | 1 |
| `AC-10` | When a visitor presses a card's Details, the site shall open a dialog showing "TRUCK · STOCK #001", "2021 Ford F-150", "$38,900" with "Sample listed price", Mileage, Year, Body style, Color, Make and  … (cut) | tests/e2e/inventory.spec.ts › AC-10 and AC-11 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-11` | When the dialog is closed by Escape, the close button or a click outside, the site shall drop `vehicle` from the address and return focus to the Details control that opened it. | tests/e2e/inventory.spec.ts › AC-10 and AC-11 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-12` | When a visitor opens /vehicles?vehicle=3, the RAM 1500's dialog shall be open. | tests/e2e/inventory.spec.ts › AC-12 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-13` | When a visitor requests a vehicle's node address, the site shall answer 301 to /vehicles?vehicle=<its stock number>. | tests/e2e/inventory.spec.ts › AC-13 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-14` | When a visitor opens /, the site shall show "Featured this week" with the four featured vehicles as cards whose Details link to /vehicles?vehicle=<stock number>, and "All vehicles" to /vehicles; then  … (cut) | tests/e2e/home.spec.ts › R02 AC-14 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-15` | When / renders, the hero's tag shall read "15 sample vehicles", counting the listed (Available and Sale pending) vehicles. | tests/e2e/home.spec.ts › R02 AC-15; tests/e2e/vehicle-admin.spec.ts › AC-19, AC-16 (the count follows: 16, 15, 12) (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-16` | When staff mark a vehicle Sold, it shall leave /vehicles, the home page's featured cards and count, and the body-style and make choices it alone supplied; /vehicles?vehicle=<its stock number> shall op … (cut) | tests/e2e/vehicle-admin.spec.ts › AC-16 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-17` | When staff mark a vehicle Sale pending, it shall stay listed with a "Sale pending" chip in place of its Featured or body-style chip, the dialog shall show the chip, and "Ask about this car" shall rema … (cut) | tests/e2e/vehicle-admin.spec.ts › AC-17 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-18` | When staff add a body style (Van, "Vans", a tile line and photo) and a vehicle of it is listed, its button shall join the filter in staff order and its tile the home page (a fourth tile starting a sec … (cut) | tests/e2e/vehicle-admin.spec.ts › AC-18 (a content editor adds Van through the term form and sets the order on the vocabulary overview) (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-19` | When an editor adds a vehicle by entering stock number, make, model, year, price, mileage, colour, condition, body style and photo, the site shall write its title "<year> <make> <model>"; marking it f … (cut) | tests/e2e/vehicle-admin.spec.ts › AC-19 (both: add through the form as a content editor; unpublish) (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-20` | When an editor saves a vehicle with a stock number another vehicle has, the site shall refuse it. | tests/e2e/vehicle-admin.spec.ts › AC-20; WildbillsSiteHooksTest::testStockNumberIsUnique (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-21` | When the Make filter lists makes, each make shall appear once, from the Make vocabulary. | tests/e2e/inventory.spec.ts › AC-21 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-22` | When a visitor requests /vehicles.html, /vehicles.html?type=Truck or /vehicles.html?vehicle=3, the site shall answer 301 to /vehicles with the same query. | tests/e2e/inventory.spec.ts › AC-22 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-23` | When the parity gate judges / and /vehicles at frame scope, the header (with Inventory marked current on /vehicles) and footer shall match the reference at 1280 and 390 wide, with no sideways scroll. | droost-parity judge --scope frame --routes /,/vehicles: pass at 1280 and 390, rerun after seeker fixes | 1 |
| `AC-24` | When /vehicles renders, its title shall be "Inventory — Wild Bill's Used Cars". | tests/e2e/inventory.spec.ts › AC-24 (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-25` | When the facets are worked out, `InventoryFacets` shall order body styles by weight then name, list each make once by name, and round widened ends out to the step. | InventoryFacetsTest (7 tests) in the unit suite, 35 passed (full suite rerun after seeker fixes: 39 passed) | 1 |
| `AC-26` | When an editor opens the Home page's tree, it shall hold seven root components in order: home_hero, promise_band, featured_vehicles, body_style_tiles, how_it_works, questions_split, closing_cta. | droost/bin/canvas tree:get 1: seven roots home_hero, promise_band, featured_vehicles, body_style_tiles, how_it_works, questions_split, closing_cta (views blocks in the two slots), rerun after seeker f … (cut) | 1 |

**26 declared, 0 with nothing proving them.** A proof is RECORDED,
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
| `operator-commands` | allow | — | 180 |
| `dispatched` | allow | — | 15 |
| `pre-tool-use` | allow | — | 15 |
| `nudge` | allow | `traverse` | 6 |
| `nudge` | note | `traverse:noted` | 2 |
| `launched` | allow | — | 1 |
| `operator-commands` | refuse | `operator-command:script-written-here` | 1 |
| `operator-commands` | refuse | `protected-path:variable-program` | 1 |
| `stop` | allow | — | 1 |
| `stop` | refuse | `stop-hold` | 1 |

**223 invocation(s), 3 refusal(s), 0 nudge(s).** The hook was
demonstrably live, so `hard` in §1 describes something that was actually
there.

**42 of these, 1 refusal(s) among them, were made inside a subagent**, not by
the run agent: `workflow-seeker` (42 call(s), 1 refused). A refusal there is the guard working on a
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


#### `phpunit` — `complete`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"tests":35,"assertions":63}} |

#### `playwright` — `complete`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"passed":39,"failed":0,"flaky":0,"skipped":0,"interrupted":0,"did not run":0}} |

#### `wiki_fresh` — `complete`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | `wiki.uncovered` | no wiki page covers redirect | {"extension":"redirect"} |

#### `phpunit` — `test`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"tests":35,"assertions":63}} |

#### `playwright` — `test`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"passed":39,"failed":0,"flaky":0,"skipped":0,"interrupted":0,"did not run":0}} |

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
