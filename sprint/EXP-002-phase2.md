# EXP-002 Phase 2 — Bundles + Shopify Checkout

**Persona:** Jared (Brand / Design / Conversion)
**Builds on:** PR #21 (EXP-002 Phase 1 — daypart routine builder)
**Status:** branch only — do NOT merge. Needs founder approval + Ops to
fill Shopify variant IDs before promotion.

## Why this exists

Andrew (Finance) signed off on a ritual-frequency offer architecture:
the customer told us they drink tea "once a day in the morning — or
twice a day, morning and evening." We stop selling products and start
selling **the ritual they already described.** Two hero bundles land in
the $25–$40 zone:

| Bundle | Price | CM | Role |
|---|---:|---:|---|
| **A3 Discover + Commit** | $31.99 | $18.74 | HERO for once-a-day |
| **B1 AM/PM Ritual Duo** | $36.99 | $22.41 | HERO for twice-a-day |

The unlock: blended AOV $16.59 → $32.34 (+95%), CM/order $7.62 → $19.05
(+150%). Cold paid CAC in the $15–20 range is now profitable on order
one. Phase 1 shipped the daypart picker; Phase 2 ships the offer + the
checkout pipe that turns the picker into revenue.

## What ships in this PR

```
site/preview/
├── shared/
│   ├── bundles.js          # margin-locked catalog (5 SKUs + S&S)
│   └── shopify.js          # cart-permalink builder (no SDK)
├── s2-v2/
│   ├── index.html          # CTA now routes to /preview/s2-v2/bundles/
│   └── bundles/
│       └── index.html      # ritual-gated bundle picker (hero auto-pinned)
├── cart/
│   └── index.html          # one-screen cart confirm + S&S toggle
└── thank-you/
    └── index.html          # post-Shopify return + purchase event
docs/
└── shopify-setup.md        # Ops setup checklist (handles, plans, return URL)
sprint/
└── EXP-002-phase2.md       # this file
```

## Funnel after this PR

```
/preview/s2-v2/                       (Phase 1: routine builder)
   ↓  CTA click — forwards ?ritual=once|twice&routine=Dark Morning + Moon Bloom
/preview/s2-v2/bundles/               (ritual gate + hero auto-pinned)
   ↓  Pick → ?bundle=B1&ritual=twice&routine=...
/preview/cart/                        (single confirm screen, S&S toggle, free-ship line)
   ↓  Continue to secure checkout → Shopify cart permalink
Shopify checkout                      (hosted, secure, payment)
   ↓  Order Status page additional-script redirect (1.5s)
/preview/thank-you/                   (purchase event, ritual recap, "read the research")
```

## Analytics surface (for Ronny)

Events preserved from Phase 1 (no dashboard breakage):
- `varitea:s2_tea_selected` · `varitea:s2_routine_changed`
- `varitea:s2_research_opened` · `varitea:s2_routine_checkout`

New events in Phase 2 (`postMessage` + `CustomEvent`, same shape):
- `varitea:bundles_view`            — page view of bundle picker
- `varitea:bundles_ritual_selected` — once/twice gate clicked
- `varitea:bundle_selected`         — bundle card "Pick this pack"
- `varitea:cart_view`               — cart confirm rendered
- `varitea:cart_subscribe_toggled`  — S&S toggle change
- `varitea:cart_checkout_click`     — Continue to Shopify clicked
- `varitea:purchase_confirmed`      — fired on /preview/thank-you/

All bundle IDs (A1/A2/A3/B1/B2) and `ritual` (once/twice/unknown) are
carried as cart attributes into Shopify so Ronny can rebuild the funnel
from Shopify order data alone.

## Margin discipline

- `site/preview/shared/bundles.js` is the single source of truth.
- Every price, contribution, and CM% is lifted directly from Andrew's
  table. Changing a price means re-checking with Finance first.
- The cart confirm screen displays the bundle price but **never**
  computes a different total — Shopify is the authority at checkout.

## Boundaries honored

- **No merge.** Branch lives at `feat/exp-002-phase2-bundles-checkout`.
- **No payment changes activated.** Checkout button is disabled until
  Ops fills the variant IDs in `shopify.js`.
- **No health claims** added; cart and thank-you stay ritual-framed.
- **No invented reviews.** Trust line uses generic checkout assurances.
- **No new vendor JS.** Zero Shopify SDK, zero analytics libraries
  added — events are `postMessage` + `CustomEvent` only, matching
  Phase 1's pattern. Ronny attaches GA4/Klaviyo on the parent page.

## Open items (Phase 3)

- Ad-creative URLs (3 sets) pointing to `/preview/s2-v2/bundles/?ritual=...`
- A/B: hero card auto-pin vs. user-driven sort
- @val packaging track for A3 sampler insert
- Promote `s2-v2/` and the funnel from `/preview/` to the production
  landing once smoke test passes.
