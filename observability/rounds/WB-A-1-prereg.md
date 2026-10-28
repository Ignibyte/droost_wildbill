# WB-A · run 1 — pre-registration (the intake)

Committed before `send`, and never shown to the subject. The yardstick is
`docs/intake/WILDBILLS-READING.md` (the observer's held-out reading of
2026-10-09, written for Part 11, restored from `pre-reset-2026-10-16`); this
file adds the round's identity, the client's answers, fixed before any
question is asked, and the predictions the round is read against.

## Why this series

The owner, 2026-10-22, after UNI-A finished: run Wild Bill's "one more
round", **at `high`**, as a fresh droost_cms build "with everything including
install of droost", then the intake. Wild Bill's is the owner's real site at
`<the original site>` and is never touched: only its zip is copied
out, as United's was for UNI-A.

- **Dial: `high`**, the next step up. KCH-A proved `low`, UNI-A `medium`.
  What `high` adds over `medium`, read resolved: enforcement **hard**, flow
  **strict**, a loop budget of 5, the seeker holding on CRITICAL. The
  linters, mutation and coverage stay off until `xhigh` ("none of the slow
  tiers"). The intake itself runs no gate, so this round measures droost's
  intake, not the dial; the dial binds from rung 1.
- **The machine:** another subject has no run open; KCH-A and UNI-A are stopped.

## Identity

| | |
|---|---|
| Round | WB-A · run 1: the intake on Wild Bill's Used Cars' delivery |
| Subject | `<site>`, ddev `wildbills-a`, tag `wildbills-a-baseline-1` (`8c01a92`) |
| Source | `design/Wild-Bills-Cars.zip`, sha256 `3b19974ae5f1a709a141838a4f610bd8a10281aee157c8dd0ab14207aad37396`, Part 11's, which the client confirmed current on 2026-10-10 |
| Stack | Drupal CMS on core 11.4, core-dev (`-W`); droost_cms `off-drupal` `af20101`, recipe applied clean; droost_theme `4fd2da8`; droost/workflow `off-drupal` `de7ca7e` (F-353 to F-359), droost/engine `146ca63`; Playwright 1.64.1 on the host and in the container; `probe-canvas-layer` 8/8 |
| Dial | `high`, resolved: enforcement hard, require_run hard, flow strict, max_loops 5, retries 2; phpcs, phpstan (level 6) and phpunit (in diff) on `web/modules/custom,web/themes/custom`, house_rules and `component_lint` at code; playwright required and parity required at frame scope at test; wiki_fresh; seekers on, 1 round, holds CRITICAL |
| Lead | autonomous (`lead: autonomous`; `mode: agentic`) |
| Reference | 8 pages (`/`, `/vehicles`, `/contact`, `/location` at 1280 and 390), read on darwin from the observer's copy of the delivered build (`dist/public/`, served static on `localhost:5399` and stopped before the round); 119/114 texts on the home page, as Part 11 read; the location page's clock-driven lines kept out as live |
| Client and observer | the same session, as in KCH-A and UNI-A: the observer sends the request, answers each AskUserQuestion dialog from the brief below, and approves |

## The request (verbatim, what `send` types)

The owner's own words, as Parts 10 and 11 and UNI-A used them:

> hey build me a site no mistakes off this: design/Wild-Bills-Cars.zip

## The client's brief (fixed before any question)

Part 11's client took every recommendation. These answers keep that
client's direction (the site stays a demo for now, built so the real
details drop in later) and answer the reading's questions Part 11 never
asked. Where a question is not covered below, the client defers to the
recommendation.

1. **The real dealership.** Not yet: it stays a demo until the real details
   and photos are ready. Keep every sample value and every demo notice. Put
   the dealership's name, phone, email, address and hours (with minutes)
   in one settings form, so the real ones go in later in one place. No real
   map until the address is real.
2. **The inventory.** Staff enter the cars in Drupal; no import or feed. A
   car is available, sale pending or sold; a sold car leaves the listing.
3. **Inquiries.** Stay an email draft that sends and stores nothing, with
   every notice saying so. "Prepare email" stays "Prepare email".
4. **A listing's facts.** The source's fields, plus a stock number the
   dealer types. Nothing else for now (no VIN, trim, fuel or gallery).
5. **Photos and logo.** Keep the illustrative photos as images an editor
   can replace; no logo file yet, keep the text brand.
6. **The demo notices.** One switch hides them all; the owner turns it off
   at launch, not before.
7. **Domain and SEO.** Not in scope now.
8. **Filters and featured.** Body styles as terms the staff can add to;
   ranges from the cars; "Featured this week" a flag the staff set.
9. **Financing, trade-ins, warranties, inspections, reviews.** None offered
   on the site; build nothing for them. "Trade-in" and "Payment options"
   stay as contact topics only.
10. **Who edits.** One staff role edits the cars and the dealership details;
    no sign-off before a change goes live. The location page keeps the
    source's name.
11. **Tracking.** No analytics.
12. **Approval.** Approve the roadmap when it carries all of the above. Say
    "Not yet", with the reason, if it builds something out of scope, drops
    a demo notice, or makes the form send.

## Predictions

**Q1 · the intake is found from the request alone**, no slash command.

**Q2 · the source is read as the handoff says** (reading §12, design of
record): `artifacts/wildbills/`, not React; four routes at their `.html`
spellings with their query strings; 15 vehicles from `shared.ts`; one form
that drafts an email.

**Q3 · the model** (reading §12, types): Vehicle with its 15 sample
records, Make and Body style as vocabularies or argued lists, the details
and hours as settings, no invented type.

**Q4 · the questions.** **Every category of F-353 has a row**, since
`intake check` now refuses otherwise: who edits what, what is real content,
where things go, what is out of scope, what a free-text value is. Against
the reading: at least the real dealership (1), the inventory's upkeep (2),
delivery (3), the listing's facts (4) and the photos (5); none the source
answers; none confirming a sample value. Part 11 asked 6 and missed (1),
(4) and (5): this is where F-353 should show.

**Q5 · the demo notices** carried, ideally behind one switch; "Prepare
email" never "Send" (reading §12, demo notices and honesty).

**Q6 · the ladder**: the frame first; Vehicle before `/vehicles`, the
contact prefill and `/`; the home page after the types it shows; 5 to 7
rungs, with each rung's pages in the Pages column (now parity's routes,
F-354).

**Q7 · approval** through AskUserQuestion and the client's yes; nothing
built before.

**Q8 · decisions recorded**: every answer verbatim; any text the client's
answers add to or remove from a page in `decided.json` (`added` or
`set_aside`, F-356), before approval.

**Q9 · the source's defects**: at least two of the reading's named;
nothing working called broken.
