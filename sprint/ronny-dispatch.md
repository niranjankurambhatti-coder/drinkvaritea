# Dispatch — @ronny (Paid Growth / Analytics Agent)

> **Sprint:** EXP-001 PMF Campaign. Read `EXP-001-shared-experiment-design.md` first — that's the joint brief you and Jared co-own. This file is your execution lane.
>
> **Your mandate:** Stand up the complete analytics integration, instrument the full funnel (ad-click → order placed) including the two new micro-journey events, test and verify every event, build the 2-variant campaign with correct UTMs and budget caps, then monitor/review and call the A/B winner. You own the kill/iterate/scale recommendation.

---

## §1 — Connect the missing connectors (blocker — do first)

Per `connectors-required.md`, three connectors are not yet connected and block ad-click→order attribution. Trigger founder auth for each:

1. **Google Tag Manager** — central tag router (GA4 + Meta + Google Ads).
2. **Google Ads** — conversion actions (`checkout_cta_click`, `purchase_completed`), even if EXP-001 launches Meta-only.
3. **Facebook Pages / Meta** — publish the 2 variants, Meta Pixel + CAPI, read CTR/CPC/CAC.

Already connected and yours to use: GA4, PostHog, Stripe, Klaviyo, Shopify, SEMrush.

**Deliverable:** All three connected; note in `growth/tracking-readiness-checklist.md` Tier 3.

---

## §2 — Event-bridge credentials + verification

The client-side event bridge from PR #16 is wired but no-ops until creds exist. Get and install:

| Value | Where (BOTH files must stay in sync) |
|---|---|
| `GA4_MEASUREMENT_ID` | `window.VARITEA_CONFIG` in `site/index.html` + `site/thank-you.html` |
| `POSTHOG_PROJECT_KEY` + `POSTHOG_HOST` | same two files |
| `GTM_CONTAINER_ID` (optional router) | same two files |
| Meta Pixel ID | GTM tag (preferred) or direct snippet |

**Verify (from the bridge's own checklist):**
1. Visit `https://drinkvaritea.com/?utm_source=test&utm_campaign=qa` incognito → `window.varitea.context()` shows `utm_source:"test"`, `anonymous_id`, `session_id`.
2. `window.dataLayer` contains `page_view` with utm fields.
3. Click hero → `hero_cta_click` in dataLayer; click "Get yours" → href rewritten with `utm_*` + `client_reference_id`, `checkout_cta_click` + `stripe_checkout_started` fire.
4. Once GA4/PostHog keys are in: same events appear in GA4 DebugView + PostHog Live Events.

**Deliverable:** Tier 2 + Tier 4 events in `tracking-readiness-checklist.md` flipped to ✅ with screenshots.

---

## §3 — Instrument the two new micro-journey events

PR #16 covers the main events. This sprint adds the two signals that turn "did they convert" into "where did they drop." Coordinate the code with Web App; spec them precisely.

### `scroll_depth`
- **Trigger:** landing scroll-snap reaches 25 / 50 / 75 / 100% (s1→s2→s3→s4). Fire each threshold once per session.
- **Properties:** `depth_pct`, `max_section_reached` (s1–s4), plus the standard utm/context the bridge already attaches.
- **Destinations:** GA4, PostHog.
- **Hook:** the existing `onScroll` / `#rail` progress logic in `site/index.html`.

### `s2_tea_selected`
- **Trigger:** user taps/swipes/arrows to a tea inside the Screen-2 experience (the `/preview/s2-v2` iframe).
- **Properties:** `tea_name` (must equal Jared's final flavor names), `lane_index` (0–2), `interaction` (tap/swipe/arrow).
- **Destinations:** GA4, PostHog.
- **Mechanism:** the iframe `postMessage`s the selection to the parent; the parent landing listens and calls `window.varitea.track('s2_tea_selected', …)`. (Iframe is same-origin `/preview/s2-v2/?embed=1`, so postMessage is straightforward.)

**Add both to `growth/event-taxonomy.md`** so the schema stays the single source of truth.

**Deliverable:** Both events firing + visible in PostHog funnel; taxonomy updated; PR merged.

---

## §4 — Full-funnel QA before any spend

No ad goes live until the whole journey is verified end-to-end for **both** variants. Run `tracking-readiness-checklist.md` Tier 6:

- [ ] **$0 UTM test** — personal link with full UTMs for each variant; confirm GA4 captures source/medium/campaign/content and `page_variant` resolves correctly per variant.
- [ ] **Scroll + tea-select test** — scroll the full page, tap each tea; confirm `scroll_depth` (all 4 thresholds) and `s2_tea_selected` (all 3 teas) fire in PostHog.
- [ ] **$1 test purchase (Stripe test mode)** — confirm `purchase_completed` fires in GA4 (with revenue), PostHog, and Meta Events Manager; UTMs land in Stripe metadata + Klaviyo profile.
- [ ] **GTM preview** — all tags fire in correct order.
- [ ] **Mobile** — CTA tappable, checkout works without zoom, Screen-2 taps register.

**Deliverable:** Tier 6 all ✅. This is the **gate** — both you and Jared sign off before spend.

---

## §5 — Build the campaign (2 variants)

Use the schema in `growth/campaign-experiment-schema.json`; one record, two creatives. UTMs strictly per `growth/utm-builder.md`.

| Field | Variant A | Variant B |
|---|---|---|
| `experiment_id` | EXP-001 | EXP-001 |
| `campaign_name` | Choice Overload — Static A | Coffee Switch — Static B |
| `persona` | variety_seeker | coffee_refugee |
| `channel` | meta_ig / meta_fb | meta_ig / meta_fb |
| `landing_page` | `/` | `/` |
| `utm_campaign` | `pmf_choice_overload` | `pmf_coffee_alt` |
| `utm_content` | `ig_static_3teas_a01` | `ig_static_coffeeswitch_b01` |
| `cta_label` | Start with 3 Teas — $19 | Try the Switch — $19 |
| `primary_kpi` | purchases (+ CAC) | purchases (+ CAC) |
| `budget_daily_usd` | `[FA]` | `[FA]` |
| `budget_total_usd` | `[FA]` | `[FA]` |
| `kill_rule` | $`[FA]` spend, 0 checkout CTA clicks, OR CTR<0.3% @2k impr | same |
| `scale_rule` | ≥1 purchase + CTR≥min + CPC<warning + checkout CTA>5% + ROAS+ | same |
| `decision_rule` | review at 3 days OR $`[FA]`, whichever first | same |

Example UTM (Variant A): `https://drinkvaritea.com/?utm_source=instagram&utm_medium=paid_social&utm_campaign=pmf_choice_overload&utm_content=ig_static_3teas_a01&utm_term=tea_curious_broad`

**Set platform caps** (daily + lifetime) per `budget-guardrails.md`. **No ad goes live without founder budget approval.**

**Deliverable:** Two ready-to-launch ads in Meta (paused), UTMs verified, caps set, founder-approval requested.

---

## §6 — Monitor, review, decide

Daily KPI pulse per `measurement-architecture.md`: sessions, CTR, CPC, LP→CTA rate, checkout starts, purchases, CAC, ROAS, plus the micro-journey drop-off (scroll depth, tea-select, per-step funnel) **split by `utm_content`** so A vs B is always comparable.

- **Cadence:** daily review each morning; PMF summary at the 3-day / `$[FA]` checkpoint.
- **At checkpoint:** declare A vs B winner, write the `learning` field, set `next_experiment_id` (EXP-002 = winning angle, next variable to test). Apply kill/iterate/scale per the shared brief §5.
- **Log:** maintain the **Notion EXP-001 experiment log** (daily status + final learning) and a **GitHub issue** linking the campaign record, PRs, and decision.

**Deliverable:** Daily log entries; checkpoint decision with named winner + the PMF read; EXP-002 seeded.

---

## Your definition of done
- [ ] GTM + Google Ads + Meta connected.
- [ ] GA4/PostHog/GTM/Meta creds installed; main events verified.
- [ ] `scroll_depth` + `s2_tea_selected` firing; taxonomy updated.
- [ ] Tier 1–6 of `tracking-readiness-checklist.md` all ✅ (joint sign-off with Jared).
- [ ] 2 variants built in Meta with correct UTMs + caps, paused pending founder budget approval.
- [ ] Daily monitoring live; 3-day checkpoint decision delivered with A/B winner + PMF learning.

## Handoffs out
- **→ Founder:** connector auth (GTM/Ads/Meta), analytics creds, Stripe live + `/thank-you` redirect, budget caps.
- **→ Jared:** confirm `page_variant` + `cta_label` values match shipped copy; flag if a CTA attribute drifts.
- **→ Finance Agent:** margin/CAC model for scale sign-off.

## Status block (update daily in Notion)
- **Decision:** _…_  **Next action:** _…_  **Metric moved:** _…_  **Blockers:** _…_  **Handoffs:** _…_
