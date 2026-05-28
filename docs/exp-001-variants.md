# EXP-001 — CMS Variants Table (Source of Truth)

> **Owner:** @jared (Brand / UX) · **Sprint:** EXP-001 PMF Campaign
> **Status:** copy LOCKED · code on branch `feat/exp-001-variant-copy-swap` (PR open, not deployed)
> **Rule:** This table is the single source of truth for what copy is live where.
> Any change here = bump the variant, ping Ronny, redeploy. No copy edits after QA freeze without telling Ronny — it changes the A/B read.

The single experiment variable is the **message angle**. Offer, price ($19), landing structure, the three flavors, and checkout are held **constant** across all variants. One landing page (`/`), UTM-driven hero copy swap.

---

## Variants table

| Field | Variant A | Variant B | Default (fallback) |
|---|---|---|---|
| `utm_campaign` | `pmf_choice_overload` | `pmf_coffee_alt` | `organic_founder_launch` |
| `page_variant` (body attr → tracker) | `choice_overload` | `coffee_switch` | `default` |
| **Hero headline** (Screen 1) | Tea stores have too many choices. | A better afternoon than coffee. | A better daily drink. |
| **Hero subhead** (Screen 1) | We made it easy. Start with three. | Three teas for energy, calm, and caffeine-free evenings. No jitters. | _(none — headline only)_ |
| **Hero CTA label** (Screen 1) | Start with 3 Teas — $19 | Try the Switch — $19 | Tap to begin |
| **Reassurance line** (Screen 4) | You don't need to know anything about tea to order. | Made for coffee drinkers. No bitterness, no crash. | _(none)_ |
| **Checkout CTA** (Screen 4 — CONSTANT) | Get the First Sip Box — $19 | Get the First Sip Box — $19 | Get the First Sip Box — $19 |
| `utm_content` (creative id) | `ig_static_3teas_a01` | `ig_static_coffeeswitch_b01` | — |

> **Note on the checkout CTA:** it is intentionally identical across variants. The experiment variable lives only in the hero angle (Screen 1) + the Screen-4 reassurance line. Keeping the checkout CTA constant isolates the message variable.

---

## The three flavors (FIXED across all variants — LOCKED)

These names ship **identically** in ads, on the box, on the landing Screen 2, and in `s2_tea_selected.tea_name` analytics. Exact strings — case-sensitive.

| Lane | `tea_name` (exact) | One-line flavor copy | Tasting notes | Use-case |
|---|---|---|---|---|
| 0 (amber) | `Bold Black` | A clean, confident morning cup — no bitterness, no fuss. | rich · warm · morning-ready | Morning / coffee-replacement |
| 1 (lavender) | `Floral Herbal` | Caffeine-free calm. Soft floral, a little sweet, easy to love. | floral · soothing · evening-calm | Evening / wind-down |
| 2 (sage) | `Smooth Green` | Smooth green tea that never goes grassy or harsh. Gentle lift. | smooth · fresh · gentle-lift | Afternoon / focus |

**Guardrail compliance:** plain-English, beginner-safe, no cultivar jargon. "Calm/soothing" is sensory/mood language (allowed); no health-benefit claims ("lowers anxiety", "improves sleep" — NOT used). Names do not copy Spice & Tea Exchange products.

---

## Where each value is wired (so nothing drifts)

| Value | Lives in | Read by |
|---|---|---|
| `page_variant` | `site/index.html` inline copy-swap script → `body[data-page-variant]` | `site/js/app.js` `onDocClick` → property on every event |
| Hero headline / subhead / CTA / reassurance | `VARIANTS{}` map in `site/index.html` copy-swap script | rendered into `#hero-headline`, `#hero-subhead`, `#hero-cta .cta__text`, `#hero-reassure` |
| Hero `cta_label` | `#hero-cta[data-cta-label]` (swapped in sync with visible text) | `app.js` → `cta_label` on `hero_cta_click` |
| `tea_name` | `site/preview/s2-v2/index.html` `.pouch[data-role]` (proper case) | embed `postMessage` → parent listener (Ronny) → `s2_tea_selected.tea_name` |
| `utm_campaign` / `utm_content` | set on the Meta ad URLs (Ronny) | `app.js` UTM capture → all events + Stripe link decoration |

---

## Change log

| Date | Change | By |
|---|---|---|
| 2026-05-28 | Initial lock. Flavor names confirmed proper-case; Variant A/B + default copy locked; copy-swap + s2 bridge implemented on `feat/exp-001-variant-copy-swap`. | @jared |
