# EXP-002 Phase 3 — `/picking` single long page

**Persona:** Jared (Brand / Design / Conversion)
**Builds on:** Phase 2 (PR #23 — bundles + cart confirm + Shopify wiring)
**Status:** Branch only — do NOT merge. Needs founder approval + Ops
must fill Shopify variant IDs (per Phase 2 `docs/shopify-setup.md`)
before the checkout button activates.

## Why this exists

Founder direction (2026-05-28, 8:18 PM CDT):

> Open a separate new page called drinkvaritea/picking. On landing
> page click. /picking is one full long page with customizable cart
> and offer attached. We will be using Shopify as the store front.

Phase 2 shipped the offer architecture as four routed pages
(`s2-v2/bundles/` → `cart/` → Shopify → `thank-you/`). Phase 3
collapses those steps into a **single long page at `/picking`** so
the buyer never re-navigates between picking, customizing, and
checking out — the state stays alive on one scroll.

## Funnel after this PR

```
/                              (main landing)
   ↓  hero CTA "Build your ritual"  →  /picking
   ↓  bottom CTA "Build your pack"  →  /picking
   ↓  secondary CTA                 →  /picking?ritual=twice
/picking                       (Phase 3: single long page)
   Section 1   Ritual gate   "Once a day / Twice a day"
   Section 2   Daypart picker — 1 slot (once) or 2 slots (twice)
   Section 3   Customizable cart:
                  · Suggested bundles (hero pre-selected by ritual)
                  · Live line items (slot choices drive blend names)
                  · "Add another pouch" extras at $14.99
                  · Subscribe & Save 15% toggle
                  · Live totals + free-ship progress (≥ $25)
                  · "Continue to secure checkout →"  →  Shopify
Shopify checkout               (hosted, secure, payment)
   ↓  Order-status redirect (per Phase 2 docs)
/preview/thank-you/            (Phase 2: purchase event + ritual recap)
```

## What ships

```
site/
├── index.html                          # hero + bottom CTAs now → /picking
└── picking/
    └── index.html                      # Phase 3 single long page
sprint/
└── EXP-002-phase3.md                   # this doc
```

Reuses (single source of truth — no duplication):
- `site/preview/shared/bundles.js` — margin-locked catalog
- `site/preview/shared/shopify.js`  — cart-permalink builder

Phase 2 routes remain live as fallbacks for anyone with a
bookmark (no breaking changes).

## Conversion design choices

1. **Progressive disclosure.** Sections 2 + 3 are hidden until the
   user picks a ritual. The page reveals + auto-scrolls to step 2.
2. **Hero auto-selection.** Picking "once" auto-loads A3 Discover +
   Commit; picking "twice" auto-loads B1 AM/PM Duo. The customer
   sees the recommended pack instantly — *but* can swap to any
   other bundle on the same track via the suggestion pills.
3. **True customization without breaking SKUs.** The bundle is
   still one Shopify variant (so margins, fulfillment, and the
   selling plan all hold), but the *blend choice* per pouch slot
   rides into Shopify as a cart attribute (`routine`). Ops can map
   slot attributes to fulfillment-layer flavour selection.
4. **Extras as add-ons (NOT bundle expansion).** "+ Add another
   pouch" adds individual blend pouches at $14.99. In this MVP
   they ride as a cart attribute (`extras=tart-cooler:2,mint-reset:1`)
   so Ops can fulfill manually or wire them to individual variants
   later — keeps Phase 2's Shopify wiring untouched.
5. **Sticky right column on desktop, stacked on mobile.** The order
   summary + CTA stays visible while the user customizes line items.
6. **Same Shopify wiring as Phase 2.** Zero new SDK. Same cart
   permalink. Same return URL. Same selling-plan IDs. The checkout
   button stays disabled until Ops fills variant IDs.

## Analytics surface

All events follow the existing `postMessage` + `CustomEvent` pattern
(no new vendor libraries). New `/picking` signals:

- `varitea:picking_view`
- `varitea:picking_ritual_selected`
- `varitea:picking_blend_selected`        — per-slot blend pick
- `varitea:picking_bundle_swapped`        — suggestion pill clicked
- `varitea:picking_extra_added`
- `varitea:picking_extra_changed`         — qty inc/dec/remove
- `varitea:picking_subscribe_toggled`
- `varitea:picking_checkout_click`

Cart attributes carried into Shopify:
`ritual`, `routine`, `bundle_id`, `sub_plan`, `extras`, `source=picking`

Phase 1 + Phase 2 events stay intact — the Phase 2 `/preview/cart/`
funnel is still reachable directly for anyone testing it.

## Open notes for downstream agents

- **Ronny:** the new ~$19 CM/order ceiling means a CAC of $15–20 is
  now profitable on order one. `/picking` is the destination for
  the next paid test. UTM landing example:
  `/picking?ritual=twice&utm_source=meta&utm_campaign=amp_pm`
- **Andrew:** all prices on `/picking` resolve through `bundles.js` —
  margin lock holds. No discount logic added beyond the S&S 15%
  already approved.
- **EXP-001 copy variants** (`hero_cta: 'Start with 3 Teas — $19'`)
  still live in `site/index.html`. They override the new CTA label
  on UTM campaign hits. **Recommend deprecating those variants** in
  a follow-up since "$19" no longer matches any SKU on `/picking`.
  Out of scope for this PR.
- **@val (Material Scientist):** A3 sampler insert packaging brief
  is still pending — same as Phase 2.

## QA performed

- [x] Playwright headless: ritual gate → daypart picker → cart customization → totals → CTA. **Zero console errors** across the full flow.
- [x] Desktop (1280×900) and mobile (390×844) snapshots clean.
- [x] Deep-link `?ritual=twice` auto-selects the gate and pre-loads B1.
- [x] Subscribe toggle math: $36.99 − 15% = $31.44 reflected in summary.
- [x] Free-ship progress bar reaches 100% at $25 subtotal.
- [x] Main landing CTAs all route to `/picking` with the new labels:
      "Build your ritual" / "Build your pack" / "Twice-a-day routine →"
- [x] Phase 2 routes (`/preview/cart/`, `/preview/s2-v2/bundles/`) still load.

## Boundaries honored

- No merge. Branch only.
- No live payment changes. Checkout button disabled until Ops fills variant IDs.
- No health claims, no invented reviews, no SDK additions.
- Pricing lifted from Andrew's table via `bundles.js` — no override.
- Phase 2 work is unmodified — additive only.
