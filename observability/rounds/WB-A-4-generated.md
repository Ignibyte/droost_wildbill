# Evaluation — `run-0704696dc1d4`

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
| Round | `run-0704696dc1d4` | measured |
| Started (as recorded) | `2026-10-23T05:05:53+00:00` | reported |
| Preset | `high` | reported |
| Mode | `agentic` | reported |
| Enforcement (requested) | `hard` | reported |
| Base commit | `e2b46b3575262d215d6b94157b87568d1a811a26` | reported |
| Spec | `droost/droost-workflow/spec-r03-location.md` | reported |
| Frozen-sections hash | `e0fd2c0e77e981db5c17db9faa0dd779` | hashed by droost, over the file run.json names |
| Spec frozen at | `2026-10-23T05:09:40+00:00` | droost's clock, at plan exit |
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
| `phpcs` | `code` | 3 | satisfied |
| `phpstan` | `code` | 3 | satisfied |
| `eslint` | `code` | 3 | not applicable |
| `stylelint` | `code` | 3 | not applicable |
| `prettier` | `code` | 3 | not applicable |
| `phpunit` | — not recorded — | 0 | — not recorded — |
| `mutation` | — not recorded — | 0 | — not recorded — |
| `playwright` | — not recorded — | 0 | — not recorded — |
| `parity` | — not recorded — | 0 | — not recorded — |
| `coverage` | — not recorded — | 0 | — not recorded — |
| `house_rules` | `code` | 3 | satisfied |
| `wiki_fresh` | — not recorded — | 0 | — not recorded — |
| `custom:component_lint` | `code` | 3 | satisfied |

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
| `custom:component_lint` | `code` | satisfied | — | 0 | 4866 | yes | yes | — | — | unknown |
| `eslint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `house_rules` | `code` | satisfied | — | 0 | 1 | yes | yes | — | — | unknown |
| `phpcs` | `code` | satisfied | — | 0 | 3516 | yes | yes | — | — | yes |
| `phpstan` | `code` | satisfied | — | 0 | 20272 | yes | yes | — | — | yes |
| `prettier` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `stylelint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |

**7 gates adjudicated. 4 measured something.** That second number
is the INPUT to §6's V score, and it is not the score: a gate that
could not have failed scores zero whatever its status, and no column
here knows what a gate was pointed at.

**2 of 7 verdicts could be re-measured against the tree as it now
stands; 0 had expired.** An expired verdict was green about code that
has since moved, which is not a green now. The rest had no resolvable
subject to fingerprint, which is not the same as unchanged.

### Earlier attempts

The store is append-only: a retried gate gets a new row rather than
overwriting the one it failed on. This is the feedback loop, with
what it corrected. Gates that never ran in any attempt — off, or no
site to ask — are not retries and are not listed here.

- `custom:component_lint` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 4591 ms: custom:component_lint passed — component_lint passed: 25 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).
  - attempt 2 — satisfied (—), exit 0, 4212 ms: custom:component_lint passed — component_lint passed: 25 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).
- `house_rules` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 1 ms: house_rules passed — HR1 held (HR1 read 28 added file(s))
  - attempt 2 — satisfied (—), exit 0, 1 ms: house_rules passed — HR1 held (HR1 read 28 added file(s))
- `phpcs` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — BLOCKED (agent), exit 1, 3278 ms: phpcs failed (exit 1): 1 error, at web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php:57 — ticket scope: 9 file(s) this run changed, not the whole configured set
  - attempt 2 — satisfied (—), exit 0, 363 ms: phpcs passed — ticket scope: 9 file(s) this run changed, not the whole configured set
- `phpstan` in `code` — 3 attempts, ending satisfied:
  - attempt 1 — satisfied (—), exit 0, 18918 ms: phpstan passed — ticket scope: 9 file(s) this run changed, not the whole configured set
  - attempt 2 — satisfied (—), exit 0, 3498 ms: phpstan passed — ticket scope: 9 file(s) this run changed, not the whole configured set

### Invocations, as recorded

```
# custom:component_lint (code), attempt 1
run droost/gates/component-lint.php

# house_rules (code), attempt 1
house rules: HR1

# phpcs (code), attempt 1
<site>/vendor/bin/phpcs -q --report=json --standard=Drupal,DrupalPractice --extensions=php,module,install,inc,theme,profile,engine --ignore=*/node_modules/*,*/vendor/*,*/.claude/*,*/droost/droost-workflow/*,*/droost/baseline/*,*/.droost-workflow/* web/modules/custom/wildbills_site/src/Dealership.php web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php web/modules/custom/wildbills_site/src/HoursTable.php web/modules/custom/wildbills_site/src/LocationDetails.php web/modules/custom/wildbills_site/tests/src/Unit/DealershipTest.php web/modules/custom/wildbills_site/tests/src/Unit/HoursTableTest.php web/modules/custom/wildbills_site/tests/src/Unit/LocationDetailsTest.php web/modules/custom/wildbills_site/tests/src/Unit/WildbillsSiteHooksTest.php web/modules/custom/wildbills_site/wildbills_site.deploy.php

# phpstan (code), attempt 1
<site>/vendor/bin/phpstan analyse --no-progress --error-format=json --level=6 --memory-limit=1G web/modules/custom/wildbills_site/src/Dealership.php web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php web/modules/custom/wildbills_site/src/HoursTable.php web/modules/custom/wildbills_site/src/LocationDetails.php web/modules/custom/wildbills_site/tests/src/Unit/DealershipTest.php web/modules/custom/wildbills_site/tests/src/Unit/HoursTableTest.php web/modules/custom/wildbills_site/tests/src/Unit/LocationDetailsTest.php web/modules/custom/wildbills_site/tests/src/Unit/WildbillsSiteHooksTest.php web/modules/custom/wildbills_site/wildbills_site.deploy.php

```

### Declarations — what the plan promised

| Kind | Declared | Audited in | State | Fault | Summary |
|---|---|---|---|---|---|
| `file` | 6 | `code` | recorded (not blocking) | — | 6 declared path(s), no undeclared changes. But 9 changed path(s) are covered only by a later re-declaration, not by the first declaration (2026-10-23T05:09:40+00:00): config/sync/canvas.component.sdc. … (cut) |
| `test` | 5 | `code` | recorded (not blocking) | — | NOT VERIFIED — droost cannot see which tests a suite ran, only that one ran and how many. 5 planned, on record: DealershipTest, HoursTableTest, LocationDetailsTest, WildbillsSiteHooksTest, location.sp … (cut) |
| `type_coverage` | — not recorded — | `code` | satisfied | — | mixed work: phpcs, phpstan all measured something |
| `work_type` | — not recorded — | `code` | satisfied | — | declared "mixed" (mixed); the diff matches |

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
| `check` | `plan_grounded` | `plan` | 1 | satisfied | — | plan looked: 8 knowledge call(s) this run (code:symbol ×2, code:tree ×1, code:wiki ×4, search:arch ×1), and 16 Grounding citation(s) resolve; the code index is ready |

## 4a. The tool-call ledger — what droost was ACTUALLY asked

One row per tool result, successes and refusals alike. This is the
only place in the system that is not the subject's account of itself.

| Measure | Value | Reading |
|---|---|---|
| Total calls | 11 | every tool result, successes and refusals alike |
| Distinct tools | 5 | — |
| **Knowledge calls** (the codegraph, search, wiki, introspection and the brief: `KNOWLEDGE_TOOLS`) | 11 | the codebase was reached |
| Refusals (`outcome: fail`) | 0 | each one is a gate that was off, or an argument that was wrong |

### By phase

The JSONL ledger this replaced carried no phase, so its lines could
not be attributed to one from the record alone.

| Phase | Calls | Distinct tools | Knowledge |
|---|---|---|---|
| `code` | 3 | 2 | 3 |
| `plan` | 8 | 4 | 8 |

### Every tool called

| Tool | Calls | Class |
|---|---|---|
| `code:symbol` | 4 | knowledge |
| `code:wiki` | 4 | knowledge |
| `search:code` | 1 | knowledge |
| `code:tree` | 1 | knowledge |
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

component_lint passed: 25 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `custom:component_lint` — `code`, attempt 2, `stdout` — satisfied

```

component_lint passed: 25 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `custom:component_lint` — `code`, attempt 3, `stdout` — satisfied

```

component_lint passed: 25 custom SDC(s) meet Canvas's requirements (0 advisory(ies), which never fail it).

```

#### `phpcs` — `code`, attempt 1, `stdout` — BLOCKED

```
{"totals":{"errors":1,"warnings":0,"fixable":0},"files":{"<site>\/web\/modules\/custom\/wildbills_site\/src\/Dealership.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/Hook\/WildbillsSiteHooks.php":{"errors":1,"warnings":0,"messages":[{"message":"The array declaration extends to column 141 (the limit is 120). The array content should be split up over multiple lines","source":"Drupal.Arrays.Array.LongLineDeclaration","severity":5,"fixable":false,"type":"ERROR","line":57,"column":105}]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/HoursTable.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/src\/LocationDetails.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/DealershipTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/HoursTableTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/LocationDetailsTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/tests\/src\/Unit\/WildbillsSiteHooksTest.php":{"errors":0,"warnings":0,"messages":[]},"<site>\/web\/modules\/custom\/wildbills_site\/wildbills_site.deploy.php":{"errors":0,"warnings":0,"messages":[]}}}

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

## 4d. The seeker's findings — what an adversarial read caught

Written from the ledger droost PARSED, never from the agent's summary
of it — the counts and the rows come from the same place, so they
cannot disagree.

| Ref | Round | Severity | Location | Finding | Status |
|---|---|---|---|---|---|
| `F1` | 1 | HIGH | `droost/droost-workflow/spec-r03-location.md:154` | AC-20: there is no proof for this criterion. `workflow:criteria` lists it as `[not checked]`. The parity gate that would show it belongs to the test phase, so this may close when that phase runs. As of this inspection, though, nobody has shown the header (with Visit marked current), the footer, or no-sideways-scroll on /location at 1280 and 390. | open |
| `F2` | 1 | MEDIUM | `web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php:57` | AC-1 to AC-19 and AC-21: every recorded proof (05:18:50–51Z) is older than the last edit to the file that wires `LocationDetails::preRender` (05:19:37Z, the phpcs fix). `criteria` lists it under `changed after this proof`. I graded this down from a stale proof (HIGH) because AC-3 and AC-4 could only have passed with `LocationDetails` already wired, so the edit was the line-length reformat of `array_unshift`. It cannot change behaviour. I could not see the text before the edit, so that is inference. The test-phase phpunit and playwright gates should re-prove it. | open |
| `F3` | 1 | MEDIUM | `web/themes/custom/wildbills/components/hours_table/hours_table.js:31` | AC-15 and the spec's "Everything an editor reads on the page is copy they change in Canvas": several strings are fixed in code and are not Canvas props. These are the status lines ("Open now · closes …", "Closed · opens today/tomorrow/&lt;day&gt; at …", "Closed"), the "· today" mark, and the "sample" tag (hours_table.twig:7, info_card.twig:6). The AC-15 test only checks strings it chose, so it cannot catch this. The wiki at droost/wiki/wildbills.md:211 says "every string an editor reads is a prop", which goes further than the code. I am unsure of the severity: the spec's component table does put the status rules in the behavior, and home_hero already uses `'sample'\|t`. So I read this as the record overstating, not a criterion missed. | open |
| `F4` | 1 | MEDIUM | `web/themes/custom/wildbills/css/base.css:43` | Rebuilt what exists: the diff adds a global `.wb-note` (font-size .82rem, ink-3, margin 0), but inventory.css:63 already defines `.wb-note` with the same base declarations. The class now has two definitions in two files, and the inventory one quietly depends on loading after base. The spec also said the CSS would sit "each in its own component's file". | open |
| `F5` | 1 | LOW | `droost/droost-workflow/spec-r03-location.md:45` | The approach section still says the title "comes from the global metatag pattern … no metatag change is needed". The diff does change `metatag.metatag_defaults.canvas_page.yml` (` \| ` to ` — `), and that applies to every Canvas page. The code-phase grounding row (line 186) records the correction, so this misleads only someone who reads the approach section alone. | open |
| `F6` | 1 | LOW | `web/themes/custom/wildbills/components/hours_table/hours_table.js:71` | The `\|\| 'America/Chicago'` fallback repeats `Dealership::timezone()`'s default in a second place. `LocationDetails` always sets `data-timezone` to a non-empty value, so the fallback never runs. | open |
| `F1` | 2 (self-reviewed) | HIGH | `droost/droost-workflow/spec-r03-location.md:154` | AC-20 has no proof yet: it is the parity gate's criterion (frame at 1280 and 390 on /, /vehicles, /location), and that gate runs at the test phase under the strict flow. | carried: the parity gate runs at test; it proves AC-20 there or fails the run |
| `F2` | 2 (self-reviewed) | MEDIUM | `web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php:57` | Every proof predated the phpcs reformat of the wiring. | resolved |
| `F3` | 2 (self-reviewed) | MEDIUM | `web/themes/custom/wildbills/components/hours_table/hours_table.js:31` | The spec and wiki overstated "every string is a prop": the status lines, "· today" and "sample" are interface strings in code. | resolved |
| `F4` | 2 (self-reviewed) | MEDIUM | `web/themes/custom/wildbills/css/base.css:43` | A global `.wb-note` duplicated the inventory's. | resolved |
| `F5` | 2 (self-reviewed) | LOW | `droost/droost-workflow/spec-r03-location.md:45` | The approach still said no metatag change was needed. | resolved |
| `F6` | 2 (self-reviewed) | LOW | `web/themes/custom/wildbills/components/hours_table/hours_table.js:71` | A dead time-zone fallback repeated Dealership::timezone()'s default. | resolved |

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
| `/location` | `plan` | the Location & Hours page |
| `/location.html@301` | `plan` | redirects to /location |

### Criteria declared, and what proves each

| Ref | Statement | Proven by | Wordings |
|---|---|---|---|
| `AC-1` | When a visitor opens /location, the site shall show the eyebrow "Visit", the heading "Come see it in person." and the lede "Photos only tell you so much. Stop by during open hours, walk the lot and ta … (cut) | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-1 | 1 |
| `AC-2` | When /location renders, the map card shall show the illustrative map with its "Wild Bill's" pin and the caption "Illustrative graphic, not a real map. The address below is a sample placeholder." | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-2 and AC-3 | 1 |
| `AC-3` | When /location renders, "Open in Google Maps" shall link to `https://www.google.com/maps/search/?api=1&query=123%20Dusty%20Creek%20Rd%2C%20Dusty%20Creek%2C%20TX%2078701` and "Apple Maps" to `https://m … (cut) | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-2 and AC-3; DealershipTest::testMapLinks; LocationDetailsTest::testMapCard | 1 |
| `AC-4` | When /location renders, the "Address" card shall show its "sample" tag and "123 Dusty Creek Rd" and "Dusty Creek, TX 78701" from the dealership details. | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-4 and AC-5 | 1 |
| `AC-5` | When /location renders, "Before you head over" shall show "Call or email to confirm the car you want to see is still on the lot, and bring your driver's license for a test drive." and "Ask about a tes … (cut) | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-4 and AC-5 | 1 |
| `AC-6` | When /location renders, "Hours" (with its "sample" tag) shall list Monday to Sunday in order: Monday to Friday "8:00am – 7:00pm", Saturday "9:00am – 6:00pm", Sunday "Closed". | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-6, AC-12 and AC-13 | 1 |
| `AC-7` | When the page loads, the site shall mark the dealership's current day "· today" (with `aria-current="date"`), reckoned in the dealership's time zone. | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-7 and AC-8; › AC-7 and AC-10 (browser in Asia/Tokyo) | 1 |
| `AC-8` | While it is Monday 09:00 in America/Chicago, the status shall read "Open now · closes 7:00pm" with the open dot, even when the visitor's clock is in another time zone. | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-7 and AC-8 | 1 |
| `AC-9` | While it is Monday 07:00 in America/Chicago, the status shall read "Closed · opens today at 8:00am". | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-9 | 1 |
| `AC-10` | While it is Monday 20:00 or Sunday 10:00 in America/Chicago, the status shall read "Closed · opens tomorrow at 8:00am"; while it is Saturday 19:00 there, "Closed · opens Monday at 8:00am". | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-7 and AC-10 | 1 |
| `AC-11` | When a cached /location (a page-cache HIT) is opened at two different times, the status and today mark shall follow each moment. | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-11 (two x-drupal-cache HIT loads at two moments) | 1 |
| `AC-12` | When /location renders, the note under the hours shall read "Status uses the dealership's local time." and the source's "Status uses your device's clock." shall not appear. | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-6, AC-12 and AC-13 (.wb-hours-note) | 1 |
| `AC-13` | When /location renders, "Shortlist first." shall sit under the hours with "Browse the lot online so you know which cars to look at when you arrive." and "Browse inventory" linking to /vehicles. | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-6, AC-12 and AC-13 | 1 |
| `AC-14` | When staff change the address, the hours or the time zone in the dealership details, /location shall show the new address, map links, hours and status at once, with no edit to the page. | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › staff change the dealership details › AC-14 | 1 |
| `AC-15` | When an editor opens the Location & Hours page's tree, it shall hold two root components, page_head then split, with the map card, the two info cards (the first holding dealership_address), the hours  … (cut) | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-15 (canvas tree:get) | 1 |
| `AC-16` | When /location renders, its title shall be "Location & Hours — Wild Bill's Used Cars" and its meta description "Opening hours, address and map links for visiting Wild Bill's Used Cars. Sample location … (cut) | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-16 | 1 |
| `AC-17` | When a visitor requests /location.html, the site shall answer 301 to /location. | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-17 | 1 |
| `AC-18` | When the demo notices are off, the "sample" tags on the Address and Hours cards shall not show. | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › staff change the dealership details › AC-18 | 1 |
| `AC-19` | When `HoursTable` builds the rows, it shall order Monday to Sunday, give Sunday weekday 0, print "8:00am", "7:00pm", "8:30am", "12:00pm" and "12:00am", and read a day with an empty or malformed time a … (cut) | HoursTableTest under phpunit --group wildbills_site (48 tests pass, re-run after the fixes) | 1 |
| `AC-20` | When the parity gate judges /, /vehicles and /location at frame scope, the header (with Visit marked current on /location) and footer shall match the reference at 1280 and 390 wide, with no sideways s … (cut) | **nothing yet** | 1 |
| `AC-21` | When / renders after closing_cta gains `kind`, the home page's closing panel shall be unchanged ("Found one you like?", both buttons, two columns at 1280). | tests/e2e/location.spec.ts (re-run after the seeker fixes, 14/14) › AC-21; tests/e2e/inventory.spec.ts still passes with the inventory's own .wb-note | 1 |

**21 declared, 1 with nothing proving them.** A proof is RECORDED,
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
| `operator-commands` | allow | — | 85 |
| `pre-tool-use` | allow | — | 10 |
| `dispatched` | allow | — | 8 |
| `launched` | allow | — | 1 |
| `nudge` | note | `traverse:noted` | 1 |
| `operator-commands` | refuse | `operator-command:script-written-here` | 1 |
| `stop` | allow | — | 1 |
| `stop` | refuse | `stop-hold` | 1 |

**108 invocation(s), 2 refusal(s), 0 nudge(s).** The hook was
demonstrably live, so `hard` in §1 describes something that was actually
there.

**22 of these, 0 refusal(s) among them, were made inside a subagent**, not by
the run agent: `workflow-seeker` (22 call(s), 0 refused). A refusal there is the guard working on a
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


#### `phpcs` — `code`, attempt 1 — BLOCKED (agent), 1 finding — **superseded** by attempt 3 (satisfied)

| # | File | Line | Rule | Message | Detail |
|---|---|---|---|---|---|
| 0 | `web/modules/custom/wildbills_site/src/Hook/WildbillsSiteHooks.php` | 57 | `Drupal.Arrays.Array.LongLineDeclaration` | The array declaration extends to column 141 (the limit is 120). The array content should be split up over multiple lines | {"detail":"error"} |

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
