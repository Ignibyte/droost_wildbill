# Evaluation — WB-A · run 1: the intake (observer's half)

An intake opens no run, so droost renders no evaluation for it; its record
is the intake's own files (`droost/intake/`, `intake.json`, the answers
ledger), committed in the subject. The pre-registration, committed before
`send`, is `WB-A-1-prereg.md`; artifacts under
`bin/artifacts/2026-10-22/WB-A-1-*`; the client's answers as given,
`bin/artifacts/wb-a/client-answers.log`.

| | |
|---|---|
| Run | the intake `intake-cdfe85f8456a`, a fresh session, the request verbatim; sent 16:54 CDT, approved 17:06, **12 minutes** |
| Base | `8c01a92` (baseline 1); the approved intake committed after as `31375a4`, tag `wildbills-a-intake-approved` |
| Operator | the request, Claude Code's folder-trust dialog (a harness step), and the client's answers through the agent's AskUserQuestion: 12 questions in three calls and two approval answers |

## What happened

- The agent unpacked the zip to `design/src/`, audited the delivered build,
  wrote the model, and wrote `questions.md` with a **Category** column
  before asking: Q1 to Q8 asked in two calls of four, Q9 (a price is never
  "call for price") **settled by the source**, citing
  `d:src/site/shared.ts#VEHICLES` and `p:/#r2`.
- **Q3 asked for the real dealership's name, address, phone, email, hours
  and time zone**: the reading's top question, which Part 11's intake never
  asked. Its other first questions: who edits (Q1), what the site launches
  with (Q2), where inquiries go (Q4), a page per vehicle (Q5), scope (Q6),
  Drupal CMS's privacy links (Q7), which clock the open status reads (Q8).
- The client answered from the brief and deferred where it was silent (Q7,
  Q8). The agent recorded Q8's text change in `decided.json` as F-356 made
  possible: the source's "Status uses your device's clock." set aside, and
  "Status uses the dealership's local time." added after "Closed".
- **The first roadmap carried neither the sale status nor staff-managed
  body styles**, two brief items no question reached. The client answered
  "Not yet" with both. The agent did not just edit the plan: it asked three
  follow-ups (Q10 a pending car, Q11 a link to a sold car, Q12 which body
  styles get tiles), revised the model, two tickets and the ladder, and
  re-ran `intake check` (ready). The client approved the revision.
- **After approval the agent stopped** and told the operator to set parity's
  `routes` lever before rung 1 (`intake routes <rung>`, F-354), naming the
  value for each rung, instead of opening rung 1 as earlier intakes did.

## Against the predictions

| | Prediction | Reading |
|---|---|---|
| Q1 | found from the request alone | **held** |
| Q2 | the source read as the handoff says | **held**: four routes at their `.html` spellings (redirects in the ladder), the 15 vehicles from `shared.ts`, one form that drafts an email |
| Q3 | the model | **held**: Vehicle (stock number a field, title worked out, sale status after review), Make and Body style vocabularies, the details and hours as settings, no invented type |
| Q4 | every F-353 category; the reading's five | **held on categories** (editing 1, content 3, destinations 1, scope 3, values 4); **of the reading's five**: the real dealership (1), delivery (3) asked; the inventory's upkeep (2) only through the client's "Not yet"; the listing's facts (4) and the photos (5) decided unasked (the stock number a field; "I looked at all 17" photos). Better than Part 11, which missed (1), (4) and (5) |
| Q5 | the demo notices behind one switch; "Prepare email" never "Send" | **held**: one demo-notices setting; R04 keeps "This site has no message server…" and "Not sent yet…" word for word (the button's label is held by parity when /contact is judged whole) |
| Q6 | the ladder | **held, 4 rungs** (predicted 5 to 7): the frame and the home page's copy first, Vehicle with /vehicles and the home's cars second, /location, /contact last |
| Q7 | approval through the client's yes; nothing built before | **held**, after one "Not yet"; nothing built (the tree held the unpacked design, the intake and `decided.json`, uncommitted) |
| Q8 | decisions recorded, `decided.json` before approval | **held**: every answer verbatim, deferrals as `recommendation`; Q8's set-aside and addition |
| Q9 | two of the source's defects named | **held**: the hand-typed "15" (counted), the hand-typed contact details and hours (one settings form), the range defaults that hide stock (the sliders follow the inventory), the visitor's clock (Q8) |

## The three questions

1. **Measured.** `intake check` held the questions file to the five
   categories (F-353's fix, its first live use); the record shows each.
2. **Recorded honestly.** Each answer as given, deferrals marked, the source-
   settled row with its citations, the text change in `decided.json`.
3. **Forced.** The approval waited for the client's yes, and a "Not yet"
   held it. What no check forced: the inventory's upkeep and the listing's
   facts, which the categories cover only loosely (a "content" row about the
   samples satisfied the category without asking how stock changes).

## Findings

None for droost. The gap in Q4 is the intake's judgement within a passing
check, noted for the series: F-353's categories are coarse enough that
"what is real content" was answered by the samples question alone.
