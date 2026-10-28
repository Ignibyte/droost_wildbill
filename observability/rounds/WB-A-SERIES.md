# WB-A: Wild Bill's, from the client's delivery to a finished site (series summary)

**The series** (2026-10-22 to 23) was one install of a fresh Drupal CMS site
from the droost_cms recipe, with droost as one command in `tools/droost/`
and no droost module. Wild Bill's delivery (`Wild-Bills-Cars.zip`, Part
11's, the only thing copied out of the owner's site) went through the
intake, then the four rungs it planned, each a governed run at **`high`**
(enforcement hard, flow strict, the seeker on and holding on CRITICAL),
autonomous. KCH-A ran at `low`, UNI-A at `medium`: this is the dial's third
step.

**The roles:** the observer was also the client, answering from a brief
written before the intake asked anything (`WB-A-1-prereg.md`). After the
intake a run received its kickoff, and in four of the seven rounds one
operator answer to a question the agent asked (below), or a resume after
the machine slept.

## Outcome

| Round | Ticket | Result |
|---|---|---|
| WB-A-1 | the intake | approved in 12 min after one "Not yet"; every F-353 category asked, the real dealership included |
| WB-A-2 | R01, the theme, frame and home copy | passed; the agent asked for an HR1 exception (two thin templates), granted; phpunit's first attempt BLOCKED with no suite |
| WB-A-3 | R02, Vehicles | passed, 1 h 29 min; an independent seeker's 3 HIGH, missing from the run report's line (F-362) |
| WB-A-4 | R03, /location, attempt 1 | held in test: the agent found parity's capture sampled three weekdays, so a correct page failed four days a week (F-363) |
| WB-A-5 | R03, attempt 2 | held in code: the observer left attempt 1's code in the tree; every PHP gate examined nothing and `type_coverage` held the phase |
| WB-A-6 | R03, attempt 3 | passed, 42 min, from a clean tree; the seeker closed by an independent re-inspection |
| WB-A-7 | R04, /contact | passed, 50 min; every page judged whole |

**The site** (subject tag `wildbills-a-r04-done`, `e568dde`):
- the four pages answer 200 and their `.html` addresses 301 with the query
  kept; 15 sample vehicles with a sale status, Make and Body style lists
  staff add to, a dealership details form with the demo notices behind one
  switch; the contact form drafts an email and stores nothing, its button
  "Prepare email";
- **the observer's final run:** Playwright **71/71**, phpunit **72**, and
  parity **8/8 views with every page whole at both widths**, `/location`'s
  eight clock texts named as not judged.

## What droost was found doing wrong, and fixed

Four findings, F-360 to F-363, each with a test that fails before its fix,
all pushed on `off-drupal` with CI green on both legs:

| | |
|---|---|
| F-360 | (another subject run 7, reported by another subject's observer) a human-led run's complete hold refused the human's answer to a dialog in the agent's own words, and the refusal did not say why |
| F-361 | `droost-parity` ignored options it did not read: `--help` ran a judgement; a misspelled `--scope` judged at page scope |
| F-362 | **the run report had no HIGH column**: a seeker's three HIGH read as none |
| F-363 | **capture sampled the clock on three weekdays**: a page that marks today failed parity four days a week; found by the agent, reproduced by the observer |

## The three questions, across the series

1. **Did each gate measure?**
   - Parity measured each rung's pages whole from R02, each after a control
     that failed on the unbuilt page; in R01 it judged the frame on `/`.
   - phpcs, phpstan and HR1 read the files each run changed, and **said so
     when they read none** (WB-A-5, "labelled: it ran and examined
     nothing").
   - phpunit's first attempt in R01 could not run (no suite config) and was
     recorded BLOCKED, not passed; the run had to make one.
   - The seeker found something in every rung: 5 MEDIUM in R01, 3 HIGH in
     R02, 1 HIGH in each of R03's two built attempts. Four of its HIGH were
     proofs recorded before their code last changed.
2. **Was it recorded honestly?**
   - In the evaluation, yes throughout. The exception was droost's summary:
     the run report dropped HIGH (F-362, fixed; seen working in WB-A-4,
     "high 1").
   - HR1 read "reported (not blocking)" on the two templates the operator
     granted, never passed.
   - The agents named what they changed in earlier rungs' tests, a
     regression they caused and repaired, and bugs outside their rung they
     left.
3. **Was the agent forced?**
   - **`type_coverage` held a phase whose gates read nothing** (WB-A-5): the
     first time that wall was seen on a real run, and the agent refused to
     touch files to be counted.
   - The frozen parity reference held: the agent could not re-capture or
     waive, and asked (WB-A-4).
   - **Not forced: HR1.** At `high` it still only reports (the project's rule
     has no `mode: block`); the agent's question in R01 was its own choice.
   - The independent seeker forced fixes the gates had passed.

## What `high` added over `medium`, as seen

- The seeker ran independently at least once in every rung, and in R03
  attempt 3 independently closed what it found; at `medium` every closing in
  UNI-A was self-reviewed.
- `wiki_fresh` at complete: each rung kept a page for the module and the
  theme.
- phpunit at test held a project with PHP and no suite.
- The strict flow's runs were long where the seeker found most: R02, 1 h 29
  min.

## Open for the owner

- **HR1 at `high`.** droost_cms's `droost.yml` gives HR1 no `mode`, so it
  reports at every level. Make it block from `high` (HR3 does), or keep
  exceptions as reports: the owner's call.
- **F-360's first ask**: accept a complete-hold answer when the chosen option
  is one of the hold's own, whatever the dialog's question. Kept strict for
  now (a yes to another question is no approval to finish).
- **The parity reference holds the year** ("© 2026"): from 1 January 2027 the
  footer fails until it is re-captured or the year is set aside in
  `decided.json`.
- **The routine** (now in the memory note): a rung re-run starts from a
  clean tree and the database as the previous rung left it, its deploy hooks
  included. Two things cost this series time: the machine slept mid-run
  (`caffeinate` from then on), and the observer left an attempt's code in
  the tree.
- **The agents' notes outside their rungs:** the footer brand link's
  apostrophe is escaped twice in its accessible name (R01);
  `Inventory::listedQuery()` treats a car with no sale status as unlisted.
- **Page content** is still in the database: each rung wrote an
  `apply-*.sh` to rebuild its page. droost_cms's export into a committed site
  recipe (owner, 2026-10-22) is not built yet.
