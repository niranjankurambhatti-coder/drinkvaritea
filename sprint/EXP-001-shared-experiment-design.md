# EXP-001 — Shared Experiment Design (Jared × Ronny)

> **Sprint goal:** Run **one** successful paid campaign with **two ad variants**, fully tracked from **ad-click → order placed**, with the complete micro customer journey instrumented (scroll depth → every CTA → checkout → purchase). Output: a clean, attributable read on **product–market fit**.

This is the **joint brief**. Jared and Ronny co-own everything in this file. The two dispatch files (`jared-dispatch.md`, `ronny-dispatch.md`) split execution responsibilities downstream of these shared decisions.

---

## 1. The PMF question (the only thing this experiment exists to answer)

**Hypothesis:** *People who feel overwhelmed by tea will pay $19 for a curated 3-tea "First Sip Box" when the choice is made easy for them.*

- **Persona:** `variety_seeker` / Tea-Curious Beginner (primary), Coffee Refugee (secondary read).
- **Pain point:** Too many tea choices, no guidance — analysis paralysis at the shelf.
- **Desire:** A confident first tea purchase without needing to "know tea."
- **Offer (identical across both variants):** First Sip Box — 3 teas for **$19**, no subscription.

We are **not** testing the offer or the price in EXP-001. We are testing **the message angle** that best converts cold traffic into a paid order. Holding offer + price + landing structure constant isolates the creative/copy variable.

---

## 2. The two variants (the experiment's one variable)

Both variants drive to the **same landing page (`/`)** with **UTM-based hero copy swap** (no separate URLs — per `growth/landing-page-map.md`). Both use the **same three flavors, same box, same $19 offer, same checkout**. The only difference is the **angle + creative + hero copy**.

| | **Variant A — "Choice Overload"** | **Variant B — "Coffee Switch"** |
|---|---|---|
| PMF sub-angle | Decision fatigue / reassurance | Afternoon-ritual replacement for coffee |
| `utm_campaign` | `pmf_choice_overload` | `pmf_coffee_alt` |
| `utm_content` (creative id) | `ig_static_3teas_a01` | `ig_static_coffeeswitch_b01` |
| Hero copy | *Jared owns — see jared-dispatch* | *Jared owns — see jared-dispatch* |
| CTA label | *Jared owns* | *Jared owns* |
| Audience | Interests: tea, wellness, mindfulness — 25–44 US | Interests: coffee, espresso, productivity — 25–44 US |
| Landing | `/` (copy swap on `pmf_choice_overload`) | `/` (copy swap on `pmf_coffee_alt`) |

> **Three flavors** (shared, fixed across both variants): finalized by Jared in `jared-dispatch.md`. Current working names from the live `/preview/s2-v2` build are **Bold Black · Floral Herbal · Smooth Green** — Jared confirms or renames and writes the per-flavor copy.

**Channel for EXP-001:** Meta (Instagram + Facebook feed/reels), one ad set, two creatives (A/B) running against their respective audiences. Meta is chosen over Google Search for the first probe because the angle is demand-*generation* (people aren't searching "fix my tea confusion"), and Meta's creative A/B is the fastest PMF read.

---

## 3. The micro customer journey (every step instrumented)

This is the full funnel both agents must see end-to-end. Event names are **locked** to `growth/event-taxonomy.md` — no new event names without updating that file.

```
Ad impression  (Meta)
  → ad click            ───────────────── utm_* captured
  → page_view           (landing, page_type=landing)
  → scroll_depth        (25 / 50 / 75 / 100 %)   ← NEW, see §4
  → hero_cta_click      (Screen 1 "Tap to begin")
  → s2_tea_selected     (Screen 2 pouch tap — papercraft/Three.js)  ← NEW, see §4
  → bundle_option_change (if any option toggled)
  → checkout_cta_click  ("Get yours" → Stripe)
  → stripe_checkout_started
  → purchase_completed  (Stripe success → /thank-you)
```

Secondary path (lead, not loss): `email_capture_submit` wherever an email field exists.

---

## 4. New instrumentation this sprint adds (beyond what PR #16 shipped)

PR #16 already shipped: UTM capture, anonymous/session IDs, GA4/GTM/PostHog fan-out, Stripe link decoration, `page_view`, `hero_cta_click`, `checkout_cta_click`, `quiz_cta_click`, `stripe_checkout_started`, `purchase_completed`. **This sprint adds the two missing "micro-journey" signals:**

1. **`scroll_depth`** — fire at 25/50/75/100% of the landing scroll-snap progression (s1→s2→s3→s4). Property: `depth_pct`, `max_section_reached`. → GA4, PostHog. *(Maps to the rail/`onScroll` already in `site/index.html`.)*
2. **`s2_tea_selected`** — fire when a user taps/swipes to a tea inside the Screen-2 experience (the `/preview/s2-v2` iframe). Property: `tea_name`, `lane_index`, `interaction` (tap/swipe/arrow). → GA4, PostHog. *(Requires the iframe to `postMessage` the selection up to the parent tracker — Ronny + Web App.)*

These two turn "did they convert?" into "**where exactly did they fall off?**" — the whole point of the micro-journey ask.

---

## 5. Success metrics & decision rules (locked before launch)

Thresholds reference `growth/budget-guardrails.md`. Dollar figures marked `[FA]` need founder approval before launch — see open decisions §7.

| Funnel step | Minimum to proceed | Strong PMF signal |
|---|---|---|
| Ad click → landing `page_view` | > 85% | > 95% |
| `page_view` → `hero_cta_click` | > 5% | > 15% |
| reaches Screen 2 (`s2_tea_selected` OR scroll 50%) | > 40% | > 65% |
| → `checkout_cta_click` | > 5% of LP visits | > 15% |
| `checkout_cta_click` → `stripe_checkout_started` | > 40% | > 70% |
| `stripe_checkout_started` → `purchase_completed` | > 20% | > 50% |

**Primary KPI:** `purchases` (and per-variant CAC). **Guardrail:** CPC and CTR per `budget-guardrails.md`.

- **Kill** a variant: spend reaches `$[FA]` with **0** `checkout_cta_click`, OR CTR < 0.3% after 2,000 impressions.
- **Iterate** (Jared): CTR strong (>1%) but `hero_cta_click` < 5% → rework hero copy. Reaches Screen 2 but no `checkout_cta_click` → rework offer clarity / Screen 4.
- **Scale** (founder sign-off): ≥1 purchase, CTR above channel minimum, CPC below warning, checkout CTA rate > 5%, positive margin-adjusted ROAS.
- **Decision checkpoint:** review at **3 days OR `$[FA]` spend**, whichever first. Declare A vs B winner; one variant carries forward to EXP-002.

**Definition of "successful campaign" for this sprint:** the funnel is *fully attributable end-to-end for both variants* (every step above shows real data tied to `utm_content`), and we can name **which angle won and why** — even if total purchases are low. Learning is the deliverable; revenue is the bonus.

---

## 6. Division of responsibility (who owns what after this brief)

| Area | Owner | Detail |
|---|---|---|
| 3 flavor names + per-flavor copy | **Jared** | `jared-dispatch.md §1` |
| Hero copy + CTA for Variant A & B | **Jared** | `jared-dispatch.md §2` |
| Ad creative copy/visual direction (A & B) | **Jared** | `jared-dispatch.md §3` |
| Landing design fixes + UTM copy-swap wiring | **Jared** (+ Web App) | `jared-dispatch.md §4` |
| CMS / content management of variants | **Jared** | `jared-dispatch.md §5` |
| Connector setup (GTM, Meta, Google Ads) | **Ronny** | `ronny-dispatch.md §1` |
| Event-bridge credentials + verification | **Ronny** | `ronny-dispatch.md §2` |
| `scroll_depth` + `s2_tea_selected` instrumentation | **Ronny** (+ Web App) | `ronny-dispatch.md §3` |
| Full-funnel QA ($0 + $1 test) | **Ronny** | `ronny-dispatch.md §4` |
| Campaign build, UTMs, budget caps | **Ronny** | `ronny-dispatch.md §5` |
| Daily monitoring + A/B read + decision | **Ronny** | `ronny-dispatch.md §6` |
| Experiment log (Notion) + GitHub issue | **Ronny** | `ronny-dispatch.md §6` |

**Shared rituals:** daily async status in the Notion experiment log (EXP-001); both must sign off the tracking checklist (`growth/tracking-readiness-checklist.md`) reaching ✅ on all Tier 1–6 rows **before any spend**.

---

## 7. Open decisions blocking launch (need founder)

1. **Budget caps** — daily cap, total EXP-001 cap, kill-spend threshold (`[FA]` everywhere in `budget-guardrails.md`). *Recommend a small, learning-only cap.*
2. **Connect 3 missing connectors** — Google Tag Manager, Google Ads, Facebook Pages/Meta (see `connectors-required.md`). Without these, ad-click→order attribution cannot close.
3. **Analytics credentials** — GA4 Measurement ID + PostHog project key into `window.VARITEA_CONFIG` (both `site/index.html` and `site/thank-you.html`).
4. **Stripe** — live-mode link + post-payment redirect to `/thank-you?session_id={CHECKOUT_SESSION_ID}`; live mode needs business verification.
5. **Confirm flavor names** — approve Jared's three names or request changes.

---

## 8. Status block (sprint template — update daily)

- **Decision:** EXP-001 designed; offer/price/landing held constant; angle is the single variable across 2 Meta creatives.
- **Next action:** Jared finalizes flavors + variant copy; Ronny connects GTM/Meta/Google Ads and adds the 2 micro-journey events.
- **Metric moved:** none yet (pre-launch). Target first read at 3-day checkpoint.
- **Blockers:** §7 items 1–4 (founder).
- **Handoffs:** Jared → Ronny (final copy + `utm_content` ids); Ronny → Founder (budget + connector auth).
