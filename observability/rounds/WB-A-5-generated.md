# Evaluation — `run-545c1eef904a`

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
| Round | `run-545c1eef904a` | measured |
| Started (as recorded) | `2026-10-23T05:44:35+00:00` | reported |
| Preset | `high` | reported |
| Mode | `agentic` | reported |
| Enforcement (requested) | `hard` | reported |
| Base commit | `756225c3c680fbc647f36e30887d9e9957f02f7b` | reported |
| Spec | `droost/droost-workflow/spec-r03-location.md` | reported |
| Frozen-sections hash | `bbb808f4cbd5bddcecaf52e6525eb059` | hashed by droost, over the file run.json names |
| Spec frozen at | `2026-10-23T05:46:20+00:00` | droost's clock, at plan exit |
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
| `phpcs` | `code` | 1 | satisfied |
| `phpstan` | `code` | 1 | satisfied |
| `eslint` | `code` | 1 | not applicable |
| `stylelint` | `code` | 1 | not applicable |
| `prettier` | `code` | 1 | not applicable |
| `phpunit` | — not recorded — | 0 | — not recorded — |
| `mutation` | — not recorded — | 0 | — not recorded — |
| `playwright` | — not recorded — | 0 | — not recorded — |
| `parity` | — not recorded — | 0 | — not recorded — |
| `coverage` | — not recorded — | 0 | — not recorded — |
| `house_rules` | `code` | 1 | satisfied |
| `wiki_fresh` | — not recorded — | 0 | — not recorded — |
| `custom:component_lint` | `code` | 1 | satisfied |

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
| `custom:component_lint` | `code` | satisfied | — | 0 | 4549 | yes | yes | — | — | unknown |
| `eslint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `house_rules` | `code` | satisfied | — | 0 | 0 | yes | no — the tool ran and examined nothing (a labeled pass) | — | — | unknown |
| `phpcs` | `code` | satisfied | — | 0 | 0 | yes | no — the tool ran and examined nothing (a labeled pass) | — | — | yes |
| `phpstan` | `code` | satisfied | — | 0 | 0 | yes | no — the tool ran and examined nothing (a labeled pass) | — | — | yes |
| `prettier` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |
| `stylelint` | `code` | not applicable | — | — not recorded — | — not recorded — | no | no — not applicable | — | — | — not recorded — |

**7 gates adjudicated. 1 measured something.** That second number
is the INPUT to §6's V score, and it is not the score: a gate that
could not have failed scores zero whatever its status, and no column
here knows what a gate was pointed at.

**2 of 7 verdicts could be re-measured against the tree as it now
stands; 0 had expired.** An expired verdict was green about code that
has since moved, which is not a green now. The rest had no resolvable
subject to fingerprint, which is not the same as unchanged.

### Invocations, as recorded

```
# custom:component_lint (code), attempt 1
run droost/gates/component-lint.php

# house_rules (code), attempt 1
house rules: HR1

# phpcs (code), attempt 1
phpcs (ticket scope: no changed file)

# phpstan (code), attempt 1
phpstan (ticket scope: no changed file)

```

### Environment blocks, and who may lift them

A block carrying `environment` cannot be satisfied from where the
agent stands. The phase still does not advance — an OPERATOR lifts
it, recorded as `unblocked by the operator`, and the agent may propose
that and never perform it. What `environment` alone carries is a
REMEDY: a command the record prints. A block with any other fault can
also be lifted by the operator — `gate-waive` refuses only the
mandatory trio, and does not consult the fault — but nothing tells
them how, because for those the answer is to change the work. Read a
waiver on an `agent` fault as exactly that: somebody decided to ship
past it, with no remedy printed because there was none to print.

- `type_coverage` (declaration) in `code` — mixed work rests on phpcs, phpstan, and phpcs, phpstan ran without examining anything. A gate that passes over an empty path set has not checked the thing this ticket is about — so this is the gate's  … (cut)
  - This cannot be fixed from where you are. Show the OPERATOR the remedy below and ask them to run it in their terminal; do not run it yourself and do not retry around it.
  - remedy: `Point phpcs at the code: set `gates.phpcs.paths` in droost/droost.yml, or give phpcs its own phpcs.xml — a tool's own config names its own paths and outranks the lever. Then run the phase again. This takes effect NOW, not next run: `on` is frozen at begin, but the tuning levers are re-read from the file at gate time and the gate's summary says so when they have moved. No `reset --force` is needed — and if nothing changes, check the file still parses, because an unreadable droost/droost.yml leaves the frozen levers in force without comment. If the declared work type is wrong for this diff, `droost workflow:declare-changes --type=<type>` is the other answer.`

### Declarations — what the plan promised

| Kind | Declared | Audited in | State | Fault | Summary |
|---|---|---|---|---|---|
| `file` | 7 | `code` | satisfied | — | 7 declared path(s), no undeclared changes; 7 declared and not touched: config/sync, droost/canvas, droost/evidence, droost/wiki, tests/e2e, web/modules/custom/wildbills_site, web/themes/custom/wildbil … (cut) |
| `test` | 5 | `code` | recorded (not blocking) | — | NOT VERIFIED — droost cannot see which tests a suite ran, only that one ran and how many. 5 planned, on record: DealershipTest, HoursTableTest, LocationDetailsTest, WildbillsSiteHooksTest, location.sp … (cut) |
| `type_coverage` | — not recorded — | `code` | BLOCKED | environment | mixed work rests on phpcs, phpstan, and phpcs, phpstan ran without examining anything. A gate that passes over an empty path set has not checked the thing this ticket is about — so this is the gate's  … (cut) |
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
- `droost/evidence`
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
| `check` | `plan_grounded` | `plan` | 1 | satisfied | — | plan looked: 2 knowledge call(s) this run (code:tree ×1, code:wiki ×1), and 20 Grounding citation(s) resolve; the code index is ready |

## 4a. The tool-call ledger — what droost was ACTUALLY asked

One row per tool result, successes and refusals alike. This is the
only place in the system that is not the subject's account of itself.

| Measure | Value | Reading |
|---|---|---|
| Total calls | 2 | every tool result, successes and refusals alike |
| Distinct tools | 2 | — |
| **Knowledge calls** (the codegraph, search, wiki, introspection and the brief: `KNOWLEDGE_TOOLS`) | 2 | the codebase was reached |
| Refusals (`outcome: fail`) | 0 | each one is a gate that was off, or an argument that was wrong |

### By phase

The JSONL ledger this replaced carried no phase, so its lines could
not be attributed to one from the record alone.

| Phase | Calls | Distinct tools | Knowledge |
|---|---|---|---|
| `plan` | 2 | 2 | 2 |

### Every tool called

| Tool | Calls | Class |
|---|---|---|
| `code:tree` | 1 | knowledge |
| `code:wiki` | 1 | knowledge |

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

## 4d. The seeker's findings — what an adversarial read caught

`seekers` was **on** and no findings are recorded. That means either
every inspection came back clean, or an inspection ran and its ledger
was never recorded. The seeker rows in §4 say which — a clean round
leaves a row.

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
| `AC-1` | When a visitor opens /location, the site shall show the eyebrow "Visit", the heading "Come see it in person." and the lede "Photos only tell you so much. Stop by during open hours, walk the lot and ta … (cut) | tests/e2e/location.spec.ts › AC-1 passes; curl /location shows 'Come see it in person.' | 1 |
| `AC-2` | When /location renders, the map card shall show the illustrative map with its "Wild Bill's" pin and the caption "Illustrative graphic, not a real map. The address below is a sample placeholder." | tests/e2e/location.spec.ts › AC-2 and AC-3 passes; curl /location shows the caption | 1 |
| `AC-3` | When /location renders, "Open in Google Maps" shall link to `https://www.google.com/maps/search/?api=1&query=123%20Dusty%20Creek%20Rd%2C%20Dusty%20Creek%2C%20TX%2078701` and "Apple Maps" to `https://m … (cut) | tests/e2e/location.spec.ts › AC-2 and AC-3 passes (hrefs, target, rel); DealershipTest map-link tests pass | 1 |
| `AC-4` | When /location renders, the "Address" card shall show its "sample" tag and "123 Dusty Creek Rd" and "Dusty Creek, TX 78701" from the dealership details. | tests/e2e/location.spec.ts › AC-4 and AC-5 passes; curl /location shows 'Dusty Creek, TX 78701' | 1 |
| `AC-5` | When /location renders, "Before you head over" shall show "Call or email to confirm the car you want to see is still on the lot, and bring your driver's license for a test drive." and "Ask about a tes … (cut) | tests/e2e/location.spec.ts › AC-4 and AC-5 passes; curl shows topic=Test%20drive | 1 |
| `AC-6` | When /location renders, "Hours" (with its "sample" tag) shall list Monday to Sunday in order: Monday to Friday "8:00am – 7:00pm", Saturday "9:00am – 6:00pm", Sunday "Closed". | tests/e2e/location.spec.ts › AC-6, AC-12 and AC-13 passes; curl shows 5× '8:00am – 7:00pm' and '9:00am – 6:00pm' | 1 |
| `AC-7` | When the page loads, the site shall mark the dealership's current day "· today" (with `aria-current="date"`), reckoned in the dealership's time zone. | tests/e2e/location.spec.ts › AC-7 and AC-8, AC-7 and AC-10 pass (stopped clock, visitor in Asia/Tokyo) | 1 |
| `AC-8` | While it is Monday 09:00 in America/Chicago, the status shall read "Open now · closes 7:00pm" with the open dot, even when the visitor's clock is in another time zone. | tests/e2e/location.spec.ts › AC-7 and AC-8 passes | 1 |
| `AC-9` | While it is Monday 07:00 in America/Chicago, the status shall read "Closed · opens today at 8:00am". | tests/e2e/location.spec.ts › AC-9 passes | 1 |
| `AC-10` | While it is Monday 20:00 or Sunday 10:00 in America/Chicago, the status shall read "Closed · opens tomorrow at 8:00am"; while it is Saturday 19:00 there, "Closed · opens Monday at 8:00am". | tests/e2e/location.spec.ts › AC-7 and AC-10 passes | 1 |
| `AC-11` | When a cached /location (a page-cache HIT) is opened at two different times, the status and today mark shall follow each moment. | tests/e2e/location.spec.ts › AC-11 passes (two HITs, two moments) | 1 |
| `AC-12` | When /location renders, the note under the hours shall read "Status uses the dealership's local time." and the source's "Status uses your device's clock." shall not appear. | tests/e2e/location.spec.ts › AC-6, AC-12 and AC-13 passes; curl shows the Q8 note and not the device-clock note | 1 |
| `AC-13` | When /location renders, "Shortlist first." shall sit under the hours with "Browse the lot online so you know which cars to look at when you arrive." and "Browse inventory" linking to /vehicles. | tests/e2e/location.spec.ts › AC-6, AC-12 and AC-13 passes | 1 |
| `AC-14` | When staff change the address, the hours or the time zone in the dealership details, /location shall show the new address, map links, hours and status at once, with no edit to the page. | tests/e2e/location.spec.ts › staff change the dealership details › AC-14 passes | 1 |
| `AC-15` | When an editor opens the Location & Hours page's tree, it shall hold two root components, page_head then split, with the map card, the two info cards (the first holding dealership_address), the hours  … (cut) | tests/e2e/location.spec.ts › AC-15 passes (droost/bin/canvas tree:get) | 1 |
| `AC-16` | When /location renders, its title shall be "Location & Hours — Wild Bill's Used Cars" and its meta description "Opening hours, address and map links for visiting Wild Bill's Used Cars. Sample location … (cut) | tests/e2e/location.spec.ts › AC-16 passes | 1 |
| `AC-17` | When a visitor requests /location.html, the site shall answer 301 to /location. | tests/e2e/location.spec.ts › AC-17 passes; curl -I /location.html → 301 /location | 1 |
| `AC-18` | When the demo notices are off, the "sample" tags on the Address and Hours cards shall not show. | tests/e2e/location.spec.ts › staff change the dealership details › AC-18 passes | 1 |
| `AC-19` | When `HoursTable` builds the rows, it shall order Monday to Sunday, give Sunday weekday 0, print "8:00am", "7:00pm", "8:30am", "12:00pm" and "12:00am", and read a day with an empty or malformed time a … (cut) | HoursTableTest passes (phpunit 48/48) | 1 |
| `AC-20` | When the parity gate judges /, /vehicles and /location against the re-captured reference (which reads /location on every weekday), the header (with Visit marked current on /location) and footer shall  … (cut) | droost-parity judge --scope frame --pages /,/vehicles,/location against droost/parity (re-captured 05:42Z): 6 views PASS on a Friday, /location whole at 1280, 8 live texts not judged; the parity gate  … (cut) | 1 |
| `AC-21` | When / renders after closing_cta gains `kind`, the home page's closing panel shall be unchanged ("Found one you like?", both buttons, two columns at 1280). | tests/e2e/location.spec.ts › AC-21 and tests/e2e/home.spec.ts › AC-13 pass | 1 |

**21 declared, 0 with nothing proving them.** A proof is RECORDED,
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
| `operator-commands` | allow | — | 22 |
| `pre-tool-use` | allow | — | 2 |
| `operator-commands` | refuse | `protected-path:interpreter` | 1 |

**25 invocation(s), 1 refusal(s), 0 nudge(s).** The hook was
demonstrably live, so `hard` in §1 describes something that was actually
there.

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

No check recorded a structured finding in this run. Read that
against §4: a gate that measured nothing also finds nothing, and the
two look identical from here.

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
