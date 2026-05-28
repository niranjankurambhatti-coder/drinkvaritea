# Dispatch — @jared (Brand / UX Agent)

> **Sprint:** EXP-001 PMF Campaign. Read `EXP-001-shared-experiment-design.md` first — that's the joint brief you and Ronny co-own. This file is your execution lane.
>
> **Your mandate:** Pick the three flavor names, write the copy for **both** ad variants, fix the landing design for the experiment, and own CMS/content management of the variants. Hold the brand soul: less text / more sensory, no health claims, no shipping promises, no invented reviews.

---

## §1 — Three flavor names (FINAL — confirm or revise)

The live `/preview/s2-v2` (now landing Screen 2) ships three lanes. Lock the names so they're identical in ads, on the box, on the landing, and in `s2_tea_selected` analytics.

| Lane | Working name (in code) | Proposed final name | One-line flavor copy | Tasting notes (3 words) | Use-case framing |
|---|---|---|---|---|---|
| 0 (amber) | Bold Black | **Bold Black** | "A clean, confident morning cup — no bitterness, no fuss." | rich · warm · morning-ready | Morning / coffee-replacement |
| 1 (lavender) | Floral Herbal | **Floral Herbal** | "Caffeine-free calm. Soft floral, a little sweet, easy to love." | floral · soothing · evening-calm | Evening / wind-down |
| 2 (sage) | Smooth Green | **Smooth Green** | "Smooth green tea that never goes grassy or harsh. Gentle lift." | smooth · fresh · gentle-lift | Afternoon / focus |

**Deliverable:** Confirm these three names (or propose swaps) in the Notion EXP-001 log. If renamed, update: `site/preview/s2-v2/index.html` (`data-role`/`data-sub`), the box copy, and notify Ronny so `s2_tea_selected.tea_name` values match.

**Guardrails:** names must be plain-English and beginner-safe (no obscure cultivar jargon), must not imply a health benefit ("calm" is sensory/mood, fine; "lowers anxiety" is a health claim, not fine), must not copy Spice & Tea Exchange product names.

---

## §2 — Hero copy + CTA for both variants (the one experiment variable)

Same landing (`/`), same offer ($19, 3 teas, no subscription). UTM-driven copy swap. Keep within the per-screen word budget from your UX workspace (Screen 1 = headline + one CTA, nothing else).

### Variant A — "Choice Overload"  (`utm_campaign=pmf_choice_overload`)
- **Hero headline:** `Tea stores have too many choices.`
- **Hero subhead:** `We made it easy. Start with three.`
- **CTA label:** `Start with 3 Teas — $19`
- **One reassurance line (Screen 4):** `You don't need to know anything about tea to order.`

### Variant B — "Coffee Switch"  (`utm_campaign=pmf_coffee_alt`)
- **Hero headline:** `A better afternoon than coffee.`
- **Hero subhead:** `Three teas for energy, calm, and caffeine-free evenings. No jitters.`
- **CTA label:** `Try the Switch — $19`
- **One reassurance line (Screen 4):** `Made for coffee drinkers. No bitterness, no crash.`

**Default `/` (untargeted fallback — unchanged):** `A better daily drink.` / `Get the First Sip Box — $19`.

**Deliverable:** Final copy locked here → hand the exact strings + the `utm_campaign` keys to Ronny so the JS copy-swap and `page_variant` property line up. No copy edits after QA freeze without telling Ronny (it changes the A/B read).

---

## §3 — Ad creative direction (A & B)

You write the copy + art direction; Web App/media produces the asset; Ronny ships it into Meta. One static creative per variant for EXP-001 (fast, cheap read).

| | Variant A | Variant B |
|---|---|---|
| `utm_content` (creative id) | `ig_static_3teas_a01` | `ig_static_coffeeswitch_b01` |
| Visual | Three papercraft pouches in a clean row on cream — matte, calm, generous negative space. | One Bold Black pouch beside a set-down coffee mug; warm afternoon light. |
| On-image headline | "Too many teas? Start with 3." | "Swap the 3pm coffee." |
| Tone | Reassuring, uncluttered, premium-quiet. | Confident, friendly, no shame about coffee. |
| Must-not | No health claims, no fake "best-seller", no review screenshots. | Same. No "quit coffee" moralizing. |

Brand system: Instrument Serif headlines, Inter body, the cream/ink/lane-color palette already in the landing tokens. Matte everywhere; glossy reserved for the tea-liquid pour only.

**Deliverable:** Two creative briefs (copy + layout note) in Google Drive / Notion; tag Ronny when asset files are ready for Meta upload.

---

## §4 — Landing design fixes for the experiment

Make the page experiment-ready. Coordinate the code changes with Web App; you own the design decision, the repo is `site/`.

1. **UTM hero copy-swap** — implement (or spec for Web App) JS that reads `utm_campaign` and swaps Screen-1 headline/subhead/CTA + Screen-4 reassurance line per §2. Falls back to default `/` copy when no UTM. Must set a `page_variant` value the tracker can read (`choice_overload` / `coffee_switch` / `default`).
2. **Screen 2 polish** — the s2-v2 embed is live; confirm on real mobile that taps register, the leaf-burst fires, and the brandmark stays hidden in-embed (already wired via `?embed=1`).
3. **CTA consistency** — the `data-analytics-event` / `data-cta-label` attributes on the hero + checkout CTAs must match the copy you ship (Ronny reads `cta_label`). If you change a CTA label, update the attribute too.
4. **Thank-you page** — confirm `/thank-you` copy reflects a real, approved shipping turnaround (open dependency on Ecom Ops — do **not** invent a delivery promise).

**Deliverable:** PR(s) to `main` for copy-swap + any polish, Vercel preview verified, screenshot in Notion. (Pushing to `main` triggers a production deploy — get founder approval per Space boundaries before deploying.)

---

## §5 — CMS / content management of variants

You're the source of truth for what copy is live where. Maintain a single variants table so nothing drifts between ad, landing, and analytics.

| Field | Variant A | Variant B | Default |
|---|---|---|---|
| `utm_campaign` | `pmf_choice_overload` | `pmf_coffee_alt` | `organic_founder_launch` |
| `page_variant` | `choice_overload` | `coffee_switch` | `default` |
| Hero headline | (see §2) | (see §2) | A better daily drink. |
| CTA label | Start with 3 Teas — $19 | Try the Switch — $19 | Get the First Sip Box — $19 |
| `utm_content` | `ig_static_3teas_a01` | `ig_static_coffeeswitch_b01` | — |

**Deliverable:** Keep this table current in Notion (EXP-001 page). Any change here = ping Ronny + redeploy. If a variant copy is iterated mid-flight (per kill/iterate rules), bump the creative id (`_a02`) so the A/B history stays clean.

---

## Your definition of done
- [ ] 3 flavor names confirmed (or revised + propagated).
- [ ] Variant A & B hero/CTA/reassurance copy locked in §2 and handed to Ronny.
- [ ] 2 creative briefs delivered; assets ready for Meta.
- [ ] UTM copy-swap live on `/` with correct `page_variant`; Vercel preview verified.
- [ ] CMS variants table current in Notion; no drift between ad/landing/analytics.

## Handoffs out
- **→ Ronny:** exact copy strings, `utm_campaign` + `utm_content` + `page_variant` keys, creative asset files.
- **→ Ecom Ops:** real shipping turnaround for `/thank-you` (blocker).
- **→ Founder:** approval before any production deploy.

## Status block (update daily in Notion)
- **Decision:** _…_  **Next action:** _…_  **Metric moved:** _…_  **Blockers:** _…_  **Handoffs:** _…_
