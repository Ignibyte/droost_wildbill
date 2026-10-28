# Evaluation — `run-aff3544daf28`

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
| Round | `run-aff3544daf28` | measured |
| Started (as recorded) | `2026-10-23T05:56:53+00:00` | reported |
| Preset | `high` | reported |
| Mode | `agentic` | reported |
| Enforcement (requested) | `hard` | reported |
| Base commit | `756225c3c680fbc647f36e30887d9e9957f02f7b` | reported |
| Spec | `droost/droost-workflow/spec-r03-location.md` | reported |
| Frozen-sections hash | `d2a16d0653006d00d0d863ad73d11810` | hashed by droost, over the file run.json names |
| Spec frozen at | `2026-10-23T06:02:10+00:00` | droost's clock, at plan exit |
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
| `custom:component_lint` | `code` | satisfied | — | 0 | 4584 | yes | yes | — | — | unknown |
| `eslint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `house_rules` | `code` | satisfied | — | 0 | 1 | yes | yes | — | — | unknown |
| `phpcs` | `code` | satisfied | — | 0 | 3409 | yes | yes | — | — | unknown |
| `phpstan` | `code` | satisfied | — | 0 | 20088 | yes | yes | — | — | unknown |
| `prettier` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `stylelint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `coverage` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `eslint` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `mutation` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `parity` | `test` | satisfied | — | 0 | 24058 | yes | yes | — | — | unknown |
| `phpcs` | `test` | satisfied | — | 0 | 490 | yes | yes | — | — | unknown |
| `phpstan` | `test` | satisfied | — | 0 | 3244 | yes | yes | — | — | unknown |
| `phpunit` | `test` | satisfied | — | 0 | 4296 | yes | yes | — | — | unknown |
| `playwright` | `test` | satisfied | — | 0 | 274455 | yes | yes | — | — | unknown |
| `prettier` | `test` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `coverage` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `custom:component_lint` | `complete` | satisfied | — | 0 | 4745 | yes | yes | — | — | unknown |
| `eslint` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `house_rules` | `complete` | satisfied | — | 0 | 1 | yes | yes | — | — | unknown |
| `mutation` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `parity` | `complete` | satisfied | — | 0 | 24087 | yes | yes | — | — | unknown |
| `phpcs` | `complete` | satisfied | — | 0 | 503 | yes | yes | — | — | unknown |
| `phpstan` | `complete` | satisfied | — | 0 | 3578 | yes | yes | — | — | unknown |
| `phpunit` | `complete` | satisfied | — | 0 | 1358 | yes | yes | — | — | unknown |
| `playwright` | `complete` | satisfied | — | 0 | 259726 | yes | yes | — | — | unknown |
| `prettier` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `stylelint` | `complete` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `wiki_fresh` | `complete` | satisfied | — | 0 | 1019 | yes | yes | — | — | unknown |

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
  - attempt 1 — satisfied (—), exit 0, 4632 ms: custom:component_lint passed — component_lint passed: 24 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).
  - attempt 2 — satisfied (—), exit 0, 4450 ms: custom:component_lint passed — component_lint passed: 24 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).
- `house_rules` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 1 ms: house_rules passed — HR1 held (HR1 read 25 added file(s))
  - attempt 2 — satisfied (—), exit 0, 1 ms: house_rules passed — HR1 held (HR1 read 25 added file(s))
- `phpcs` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 3320 ms: phpcs passed — ticket scope: 9 file(s) this run changed, not the whole configured set
  - attempt 2 — satisfied (—), exit 0, 467 ms: phpcs passed — ticket scope: 9 file(s) this run changed, not the whole configured set
- `phpstan` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 12623 ms: phpstan passed — ticket scope: 9 file(s) this run changed, not the whole configured set
  - attempt 2 — satisfied (—), exit 0, 3433 ms: phpstan passed — ticket scope: 9 file(s) this run changed, not the whole configured set

### Invocations, as recorded

```
# custom:component_lint (code), attempt 1
run droost/gates/component-lint.php

# house_rules (code), attempt 1
house rules: HR1

# phpcs (code), attempt 1
<site>/vendor/bin/phpcs -q --report=json --standard=Drupal,DrupalPractice --extensions=php,module,install,inc,theme,profile,engine --ignore=*/node_modules/*,*/vendor/*,*/.claude/*,*/droost/droost-workflow/*,*/droost/baseline/*,*/.droost-workflow/* web/modules/custom/wildbills_site/src/Dealership.php web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php web/modules/custom/wildbills_site/src/HoursTable.php web/modules/custom/wildbills_site/src/LocationDetails.php web/modules/custom/wildbills_site/tests/src/Unit/DealershipTest.php web/modules/custom/wildbills_site/tests/src/Unit/HoursTableTest.php web/modules/custom/wildbills_site/tests/src/Unit/LocationDetailsTest.php web/modules/custom/wildbills_site/tests/src/Unit/WildbillsSiteHooksTest.php web/modules/custom/wildbills_site/wil

… 4392 of 6392 characters cut from the middle (evidence --full shows them all) …

les/custom/wildbills_site/src/Dealership.php web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php web/modules/custom/wildbills_site/src/HoursTable.php web/modules/custom/wildbills_site/src/LocationDetails.php web/modules/custom/wildbills_site/tests/src/Unit/DealershipTest.php web/modules/custom/wildbills_site/tests/src/Unit/HoursTableTest.php web/modules/custom/wildbills_site/tests/src/Unit/LocationDetailsTest.php web/modules/custom/wildbills_site/tests/src/Unit/WildbillsSiteHooksTest.php web/modules/custom/wildbills_site/wildbills_site.deploy.php

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
| `file` | 30 | `complete` | recorded (not blocking) | — | 30 declared path(s), no undeclared changes; 1 declared and not touched: config/sync/metatag.metatag_defaults.canvas_page.yml. But 5 changed path(s) are covered only by a later re-declaration, not by t … (cut) |
| `test` | 5 | `test` | recorded (not blocking) | — | NOT VERIFIED — droost cannot see which tests a suite ran, only that one ran and how many. 5 planned, on record: DealershipTest, HoursTableTest, LocationDetailsTest, WildbillsSiteHooksTest, location.sp … (cut) |
| `type_coverage` | — not recorded — | `test` | satisfied | — | mixed work: phpcs, phpstan, phpunit all measured something |
| `work_type` | — not recorded — | `complete` | satisfied | — | declared "mixed" (mixed); the diff matches |
| `tests_in_diff` | — not recorded — | `test` | satisfied | — | 4 phpunit test file(s) changed alongside 4 file(s) under src/: web/modules/custom/wildbills_site/tests/src/Unit/DealershipTest.php, web/modules/custom/wildbills_site/tests/src/Unit/HoursTableTest.php, … (cut) |

Three things read as green from a distance and none of them is.
A declared count with no audit is a promise nobody checked. An audit
with nothing declared is a check with nothing to hold the diff to.
And — the common case, so read the rows rather than the states — an
audit that RAN and could not check what it was given: `declared_tests`
is always `recorded`, because droost sees that a suite ran and how many
tests it held, never which ones. Only `declared_files` is audited
against the diff.

Files declared:

- `config/sync/canvas.component.sdc.wildbills.button.yml`
- `config/sync/canvas.component.sdc.wildbills.closing_cta.yml`
- `config/sync/canvas.component.sdc.wildbills.hours_table.yml`
- `config/sync/canvas.component.sdc.wildbills.info_card.yml`
- `config/sync/canvas.component.sdc.wildbills.location_grid.yml`
- `config/sync/canvas.component.sdc.wildbills.map_card.yml`
- `config/sync/canvas.folder.d3991438-135c-4a3a-aed8-3995830bdb9b.yml`
- `config/sync/canvas.folder.feb1e100-8545-43cd-ac83-0a538fa6fd41.yml`
- `config/sync/metatag.metatag_defaults.canvas_page.yml`
- `droost/canvas/apply-location.sh`
- `droost/canvas/location.tree.json`
- `droost/wiki/wildbills.md`
- `droost/wiki/wildbills_site.md`
- `tests/e2e/location.spec.ts`
- `web/modules/custom/wildbills_site/src/Dealership.php`
- `web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php`
- `web/modules/custom/wildbills_site/src/HoursTable.php`
- `web/modules/custom/wildbills_site/src/LocationDetails.php`
- `web/modules/custom/wildbills_site/tests/src/Unit/DealershipTest.php`
- `web/modules/custom/wildbills_site/tests/src/Unit/HoursTableTest.php`
- `web/modules/custom/wildbills_site/tests/src/Unit/LocationDetailsTest.php`
- `web/modules/custom/wildbills_site/tests/src/Unit/WildbillsSiteHooksTest.php`
- `web/modules/custom/wildbills_site/wildbills_site.deploy.php`
- `web/themes/custom/wildbills/components/button`
- `web/themes/custom/wildbills/components/closing_cta`
- `web/themes/custom/wildbills/components/hours_table`
- `web/themes/custom/wildbills/components/info_card`
- `web/themes/custom/wildbills/components/location_grid`
- `web/themes/custom/wildbills/components/map_card`
- `web/themes/custom/wildbills/css/base.css`

Tests declared:

- `DealershipTest`
- `HoursTableTest`
- `LocationDetailsTest`
- `WildbillsSiteHooksTest`
- `location.spec.ts`

### Checks that are neither gates nor declarations

Every attempt, not just the latest — there are few of them and each
one is a thing a phase could not end without.

| Kind | Item | Phase | Attempt | State | Fault | Summary |
|---|---|---|---|---|---|---|
| `check` | `plan_grounded` | `plan` | 1 | satisfied | — | plan looked: 6 knowledge call(s) this run (code:symbol ×2, code:tree ×2, code:wiki ×1, search:arch ×1), and 14 Grounding citation(s) resolve; the code index is ready |
| `spec` | `criteria_table` | `complete` | 1 | satisfied | — | 17 criteria were declared this run and are counted by their declared proofs (17 verified by a test, 0 manual, 0 unverified); the spec's table does not count them. |

## 4a. The tool-call ledger — what droost was ACTUALLY asked

One row per tool result, successes and refusals alike. This is the
only place in the system that is not the subject's account of itself.

| Measure | Value | Reading |
|---|---|---|
| Total calls | 6 | every tool result, successes and refusals alike |
| Distinct tools | 4 | — |
| **Knowledge calls** (the codegraph, search, wiki, introspection and the brief: `KNOWLEDGE_TOOLS`) | 6 | the codebase was reached |
| Refusals (`outcome: fail`) | 0 | each one is a gate that was off, or an argument that was wrong |

### By phase

The JSONL ledger this replaced carried no phase, so its lines could
not be attributed to one from the record alone.

| Phase | Calls | Distinct tools | Knowledge |
|---|---|---|---|
| `plan` | 6 | 4 | 6 |

### Every tool called

| Tool | Calls | Class |
|---|---|---|
| `code:symbol` | 2 | knowledge |
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

component_lint passed: 24 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `custom:component_lint` — `code`, attempt 2, `stdout` — satisfied

```

component_lint passed: 24 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `custom:component_lint` — `code`, attempt 3, `stdout` — satisfied

```

component_lint passed: 24 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `phpcs` — `code`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursTable.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursTableTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpcs` — `code`, attempt 2, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursTable.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursTableTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

```

#### `phpcs` — `code`, attempt 3, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursTable.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursTableTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

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
{"parity":{"status":"pass","scope":"frame","source":"http://localhost:5399","summary":"6 view(s) (3 route(s) at 1280 and 390px) as the reference against http://localhost:5399 (captured 2026-10-23T05:42:52.668Z) (D1–D7, frame scope; page scope for /, /vehicles, /location at 1280px; live texts not judged (they follow the clock): 8 on /location); not judged, not built yet (the routes lever): /contact; judged at https://wildbills-a.ddev.site (from .ddev/config.yaml); set aside by decision: \"Status uses your device's clock.\" on /location (Q8); added by decision: \"Status uses the dealership's local time.\" after \"Closed\" on /location (Q8)","base":"https://wildbills-a.ddev.site","base_from":".ddev/config.yaml","routes":[{"route":"/","view":"/","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/","view":"/@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/location","view":"/location","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/location","view":"/location@390","width":390,"scope":"frame","verdict":"PASS","failing":[]}],"skipped":[],"not_judged":["/contact"],"set_aside":[{"route":"/location","text":"Status uses your device's clock.","decided":"Q8","why":"the open status is worked out in the dealership's time zone, not the visitor's clock"}],"added":[{"route":"/location","text":"Status uses the dealership's local time.","after":"Closed","decided":"Q8","why":"the note under the hours says which clock the open status uses"}]}}

```

#### `phpcs` — `test`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursTable.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursTableTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

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

Time: 00:00.738, Memory: 20.00 MB

OK (50 tests, 100 assertions)

```

#### `playwright` — `test`, attempt 1, `stdout` — satisfied

```

Running 55 tests using 1 worker

  ✓   1 [chromium] › tests/e2e/dealership.spec.ts:56:5 › AC-18: anonymous visitors are refused the form; a content editor reaches it (5.9s)
  ✓   2 [chromium] › tests/e2e/dealership.spec.ts:63:5 › AC-9: the time zone is chosen from the list, America/Chicago to start (8.6s)
  ✓   3 [chromium] › tests/e2e/dealership.spec.ts:74:5 › AC-8 and AC-10: new contact lines and hours reach the header and footer (5.5s)
  ✓   4 [chromium] › tests/e2e/dealership.spec.ts:105:5 › the form refuses a day that closes before it opens (4.3s)
  ✓   5 [chromium] › tests/e2e/dealership.spec.ts:114:5 › AC-11: turning the demo notices off removes every demo notice and sample label (5.6s)
  ✓   6 [chromium] › tests/e2e/frame.spec.ts:20:7 › header at 1280 › AC-1: demo bar, brand, links with the current page marked, Browse cars (921ms)
  ✓   7 [chromium] › tests/e2e/frame.spec.ts:51:7 › header at 390 › AC-2: the links fold into a menu button that opens them and the call button (777

… 5533 of 7533 characters cut from the middle (evidence --full shows them all) …

:5 › AC-17: the home page keeps its closing band and its title (928ms)
  ✓  50 [chromium] › tests/e2e/vehicle-admin.spec.ts:116:5 › AC-19: an editor adds a vehicle; its title is written; featured puts it on the home page (13.2s)
  ✓  51 [chromium] › tests/e2e/vehicle-admin.spec.ts:143:5 › AC-20: a second vehicle with the same stock number is refused (9.8s)
  ✓  52 [chromium] › tests/e2e/vehicle-admin.spec.ts:151:5 › AC-19: unpublishing a vehicle takes it off every page (11.9s)
  ✓  53 [chromium] › tests/e2e/vehicle-admin.spec.ts:170:5 › AC-16: a sold car leaves the inventory, the home page, the count and the choices it alone supplied (25.9s)
  ✓  54 [chromium] › tests/e2e/vehicle-admin.spec.ts:195:5 › AC-17: a sale-pending car stays listed with a Sale pending chip and can still be asked about (9.7s)
  ✓  55 [chromium] › tests/e2e/vehicle-admin.spec.ts:233:5 › AC-18: staff add a body style; it joins the filter and the home page once a car of it is on the lot (15.3s)

  55 passed (4.6m)

```

#### `custom:component_lint` — `complete`, attempt 1, `stdout` — satisfied

```

component_lint passed: 24 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `parity` — `complete`, attempt 1, `stdout` — satisfied

```
{"parity":{"status":"pass","scope":"frame","source":"http://localhost:5399","summary":"6 view(s) (3 route(s) at 1280 and 390px) as the reference against http://localhost:5399 (captured 2026-10-23T05:42:52.668Z) (D1–D7, frame scope; page scope for /, /vehicles, /location at 1280px; live texts not judged (they follow the clock): 8 on /location); not judged, not built yet (the routes lever): /contact; judged at https://wildbills-a.ddev.site (from .ddev/config.yaml); set aside by decision: \"Status uses your device's clock.\" on /location (Q8); added by decision: \"Status uses the dealership's local time.\" after \"Closed\" on /location (Q8)","base":"https://wildbills-a.ddev.site","base_from":".ddev/config.yaml","routes":[{"route":"/","view":"/","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/","view":"/@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/vehicles","view":"/vehicles@390","width":390,"scope":"frame","verdict":"PASS","failing":[]},{"route":"/location","view":"/location","width":1280,"scope":"page","verdict":"PASS","failing":[]},{"route":"/location","view":"/location@390","width":390,"scope":"frame","verdict":"PASS","failing":[]}],"skipped":[],"not_judged":["/contact"],"set_aside":[{"route":"/location","text":"Status uses your device's clock.","decided":"Q8","why":"the open status is worked out in the dealership's time zone, not the visitor's clock"}],"added":[{"route":"/location","text":"Status uses the dealership's local time.","after":"Closed","decided":"Q8","why":"the note under the hours says which clock the open status uses"}]}}

```

#### `phpcs` — `complete`, attempt 1, `stdout` — satisfied

```
{"totals":{"errors":0,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursTable.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursTableTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

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

Time: 00:00.062, Memory: 20.00 MB

OK (50 tests, 100 assertions)

```

#### `playwright` — `complete`, attempt 1, `stdout` — satisfied

```

Running 55 tests using 1 worker

  ✓   1 [chromium] › tests/e2e/dealership.spec.ts:56:5 › AC-18: anonymous visitors are refused the form; a content editor reaches it (4.8s)
  ✓   2 [chromium] › tests/e2e/dealership.spec.ts:63:5 › AC-9: the time zone is chosen from the list, America/Chicago to start (8.5s)
  ✓   3 [chromium] › tests/e2e/dealership.spec.ts:74:5 › AC-8 and AC-10: new contact lines and hours reach the header and footer (5.6s)
  ✓   4 [chromium] › tests/e2e/dealership.spec.ts:105:5 › the form refuses a day that closes before it opens (4.4s)
  ✓   5 [chromium] › tests/e2e/dealership.spec.ts:114:5 › AC-11: turning the demo notices off removes every demo notice and sample label (5.4s)
  ✓   6 [chromium] › tests/e2e/frame.spec.ts:20:7 › header at 1280 › AC-1: demo bar, brand, links with the current page marked, Browse cars (666ms)
  ✓   7 [chromium] › tests/e2e/frame.spec.ts:51:7 › header at 390 › AC-2: the links fold into a menu button that opens them and the call button (539

… 5534 of 7534 characters cut from the middle (evidence --full shows them all) …

:5 › AC-17: the home page keeps its closing band and its title (669ms)
  ✓  50 [chromium] › tests/e2e/vehicle-admin.spec.ts:116:5 › AC-19: an editor adds a vehicle; its title is written; featured puts it on the home page (11.6s)
  ✓  51 [chromium] › tests/e2e/vehicle-admin.spec.ts:143:5 › AC-20: a second vehicle with the same stock number is refused (9.5s)
  ✓  52 [chromium] › tests/e2e/vehicle-admin.spec.ts:151:5 › AC-19: unpublishing a vehicle takes it off every page (11.2s)
  ✓  53 [chromium] › tests/e2e/vehicle-admin.spec.ts:170:5 › AC-16: a sold car leaves the inventory, the home page, the count and the choices it alone supplied (25.7s)
  ✓  54 [chromium] › tests/e2e/vehicle-admin.spec.ts:195:5 › AC-17: a sale-pending car stays listed with a Sale pending chip and can still be asked about (9.9s)
  ✓  55 [chromium] › tests/e2e/vehicle-admin.spec.ts:233:5 › AC-18: staff add a body style; it joins the filter and the home page once a car of it is on the lot (14.3s)

  55 passed (4.3m)

```

#### `wiki_fresh` — `complete`, attempt 1, `stdout` — satisfied

```
{
    "bundle_path": "droost/wiki",
    "checked": "2026-10-23T06:37:55Z",
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
| `F1` | 1 | HIGH | `web/modules/custom/wildbills_site/src/Dealership.php:79` | AC-3, AC-4, AC-6, AC-7, AC-8, AC-9, AC-15, AC-16: proofs are stale. All 17 proofs were recorded at 06:16:31–32Z. After that, `Dealership.php` was edited at 06:16:56Z (it builds the map URLs and the address), `HoursTableTest.php` at 06:16:57Z (cited as AC-6's proof), and `Hook/WildbillsSiteHooks.php` at 06:17:01Z by a `python3` shell command (it wires `LocationDetails`/`DemoNotices` into every component's pre-render). `workflow:criteria` lists all three as "changed after this proof". The live `/location` I fetched was served from page/dynamic cache (dated 06:16:03Z), so it cannot stand as a re-proof. Doubt: the diff against HEAD keeps these edits inside the new maps methods and the `array_unshift` reflow, and the 50 unit tests pass on the current code, so behaviour is probably unchanged. The record still shows no criterion checked after the last edit that could break it. | open |
| `F2` | 1 | LOW | `droost/droost-workflow/spec-r03-location.md:187` | AC-12's proof says "all copy as inputs". The status sentences ("Open now · closes @time", the "Closed · opens …" forms, "@day · today", "Closed"), the day names and the "sample" tag are `\|t` strings in `hours_table.twig`/`info_card.twig`, not Canvas inputs. The spec's own design declares this, and "except the address and hours" can fairly cover the status, so this misleads nobody acting on the record. Recorded for precision only. | open |
| `F3` | 1 | LOW | `web/modules/custom/wildbills_site/src/LocationDetails.php:40` | `preRender` (now added to every `component` element site-wide by `WildbillsSiteHooks.php:61`) resolves the `Dealership` service before checking the component id. Every non-wildbills, contrib and core SDC therefore pays the lookup on a cache miss. `DemoNotices` guards with a `wildbills:` prefix check first. | open |
| `F1` | 2 | HIGH | `web/modules/custom/wildbills_site/src/Dealership.php:79` | AC-3, AC-4, AC-6, AC-7, AC-8, AC-9, AC-15, AC-16: proofs were stale. Re-checked: all 17 proofs were recorded at 06:24:18–19Z. The newest file in the diff is `LocationDetails.php` at 06:22:29Z. `workflow:criteria --json` gives `changed_after: []` for every criterion. Unit 50/50 OK, re-run by this inspection. | resolved |
| `F2` | 2 | LOW | `droost/droost-workflow/spec-r03-location.md:187` | AC-12's proof overstated "all copy as inputs". It now says the status sentences, day names and "sample" tag are `\|t` template strings by design. That matches `hours_table.twig` and `info_card.twig`. | resolved |
| `F3` | 2 | LOW | `web/modules/custom/wildbills_site/src/LocationDetails.php:43` | `preRender` resolved the `Dealership` service before checking the component id. It now returns early unless `#component` is in `COMPONENTS` (map_card, info_card, hours_table), before `\Drupal::service()`. `LocationDetailsTest::testOtherComponents` covers the early return. | resolved |

**Rounds:**

- round 1: 3 findings
- round 2: 3 findings

**3 distinct findings across 2 rounds; 0 still open** by the
latest round that mentioned each. An open finding at the end of a
run is not a failure of the run — it is the part a reader has to
judge, which is why it is here rather than summarised away.

## 4e. The declared spec — structure written by a tool call

A declared row cannot be mis-shaped. Each line below is a tool call
that happened, and the engine's question about it is a count — not
whether a heading sat in the right place or whether a list was
fenced.

### Routes declared

| Path | Declared at | Why |
|---|---|---|
| `/location` | `plan` | the Location & hours page |
| `/location.html@301` | `plan` | redirects to /location |

### Criteria declared, and what proves each

| Ref | Statement | Proven by | Wordings |
|---|---|---|---|
| `AC-1` | When a visitor opens /location, the site shall show the eyebrow "Visit", the heading "Come see it in person." and the lede "Photos only tell you so much. Stop by during open hours, walk the lot and ta … (cut) | tests/e2e/location.spec.ts 'AC-1, AC-5, AC-10, AC-11' — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |
| `AC-2` | When a visitor opens /location, the map card shall show the illustrative map with its "Wild Bill's" pin and the caption "Illustrative graphic, not a real map. The address below is a sample placeholder … (cut) | tests/e2e/location.spec.ts 'AC-2, AC-3' (map card, pin, Q6 caption) — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |
| `AC-3` | When a visitor opens /location, "Open in Google Maps" shall link to `https://www.google.com/maps/search/?api=1&query=` and "Apple Maps" to `https://maps.apple.com/?q=`, each followed by the encoded "s … (cut) | tests/e2e/location.spec.ts 'AC-2, AC-3' (hrefs, target/rel) + DealershipTest::testMapsUrls, LocationDetailsTest::testMapCard (50 unit OK) — re-run after the last edit (LocationDetails guard) and drush … (cut) | 1 |
| `AC-4` | When a visitor opens /location, the "Address" card shall carry the "sample" tag and show the street and city from the dealership details, and when an editor changes the street, the page shall show the … (cut) | tests/e2e/location.spec.ts 'AC-4' (address from details; street change shows on a fresh load) + LocationDetailsTest::testInfoCard/testPreRender — re-run after the last edit (LocationDetails guard) and … (cut) | 1 |
| `AC-5` | When a visitor opens /location, "Before you head over" shall show its advice and an "Ask about a test drive" link to `/contact?topic=Test%20drive` | tests/e2e/location.spec.ts 'AC-1, AC-5, AC-10, AC-11' (advice, /contact?topic=Test%20drive) — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |
| `AC-6` | When a visitor opens /location, the "Hours" panel (with its "sample" tag) shall list Monday to Sunday in that order from the dealership's hours: "8:00am – 7:00pm" Monday to Friday, "9:00am – 6:00pm" S … (cut) | tests/e2e/location.spec.ts 'AC-6' + HoursTableTest (50 unit OK) — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |
| `AC-7` | When the page loads, the hours table shall mark the dealership's current day, in its time zone, with "· today" and `aria-current="date"`, and no other day | tests/e2e/location.spec.ts six 'AC-7, AC-8' clock cases in Asia/Tokyo, one aria-current=date row in Chicago's day — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame … (cut) | 1 |
| `AC-8` | When the dealership is open, the status shall read "Open now · closes <time>"; when it is closed and opens later today, "Closed · opens today at <time>"; when it next opens tomorrow, "Closed · opens t … (cut) | tests/e2e/location.spec.ts six 'AC-7, AC-8' clock cases + 'hours an editor sets' (half hour, America/New_York) — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 … (cut) | 1 |
| `AC-9` | When /location is served from the page cache at two different times, the status and today's mark shall each follow the time it is opened at, not the time the page was cached | tests/e2e/location.spec.ts 'AC-9' (second load X-Drupal-Cache HIT, follows the later clock) — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |
| `AC-10` | When a visitor opens /location, the note under the hours shall read "Status uses the dealership's local time." | tests/e2e/location.spec.ts 'AC-1, AC-5, AC-10, AC-11' (Q8 note) — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |
| `AC-11` | When a visitor opens /location, the "Shortlist first." panel shall sit under the hours with its sentence and a "Browse inventory" link to /vehicles | tests/e2e/location.spec.ts 'AC-1, AC-5, AC-10, AC-11' (panel under the hours) — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |
| `AC-12` | When an editor opens /location's tree, it shall hold `page_head` and `location_grid` as its roots, the map card and two info cards in the grid's `main` slot, and the hours table and the closing CTA (` … (cut) | droost/bin/canvas tree:get 4 after the last edit: roots page_head, location_grid; main: map_card, info_card, info_card; aside: hours_table, closing_cta (layout panel). Every editor copy string is an i … (cut) | 1 |
| `AC-13` | When a visitor opens /location, the title shall be "Location & Hours — Wild Bill's Used Cars" and the meta description "Opening hours, address and map links for visiting Wild Bill's Used Cars. Sample  … (cut) | tests/e2e/location.spec.ts 'AC-13' (title, description) — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |
| `AC-14` | When a visitor requests /location.html (with or without a query), the site shall answer 301 to /location, carrying the query | tests/e2e/location.spec.ts 'AC-14' (301 with query) — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |
| `AC-15` | When the demo notices are switched off, the "sample" tags on the Address card and the Hours heading shall not render | tests/e2e/location.spec.ts 'AC-15' (demo notices off, no sample tags) — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |
| `AC-16` | When /location is rendered at 1280 and at 390 wide, the parity gate shall judge it, with the frame, against the source's reference | droost-parity judge --scope frame --pages /,/vehicles,/location after the last edit and drush cr: pass, all 6 views | 1 |
| `AC-17` | When the home page renders after this change, its closing CTA shall render as before (the `band` layout) and its title shall be unchanged | tests/e2e/location.spec.ts 'AC-17' + home.spec.ts + frame.spec.ts — re-run after the last edit (LocationDetails guard) and drush cr: location+home+frame 29 passed | 1 |

**17 declared, 0 with nothing proving them.** A proof is RECORDED,
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
| `operator-commands` | allow | — | 145 |
| `pre-tool-use` | allow | — | 38 |
| `dispatched` | allow | — | 17 |
| `launched` | allow | — | 2 |
| `nudge` | note | `traverse:noted` | 2 |
| `stop` | allow | — | 2 |
| `stop` | refuse | `stop-hold` | 2 |

**208 invocation(s), 2 refusal(s), 0 nudge(s).** The hook was
demonstrably live, so `hard` in §1 describes something that was actually
there.

**52 of these, 0 refusal(s) among them, were made inside a subagent**, not by
the run agent: `workflow-seeker` (52 call(s), 0 refused). A refusal there is the guard working on a
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
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"tests":50,"assertions":100}} |

#### `playwright` — `complete`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"passed":55,"failed":0,"flaky":0,"skipped":0,"interrupted":0,"did not run":0}} |

#### `wiki_fresh` — `complete`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | `wiki.uncovered` | no wiki page covers redirect | {"extension":"redirect"} |

#### `phpunit` — `test`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"tests":50,"assertions":100}} |

#### `playwright` — `test`, attempt 1 — satisfied (—), 1 finding

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | — not recorded — | — not recorded — | — not recorded — | — not recorded — | {"key":"totals","detail":{"passed":55,"failed":0,"flaky":0,"skipped":0,"interrupted":0,"did not run":0}} |

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
