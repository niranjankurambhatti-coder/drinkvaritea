# Shopify Setup Checklist — EXP-002 Phase 2

**Owner:** Ecommerce Ops · **Required by:** Jared (Brand/Conversion)
**Scope:** wire the 5 bundle SKUs + Subscribe & Save 15% + free-ship rule
so the Phase 2 cart confirm screen can hand off to Shopify checkout.

This checklist exists because `site/preview/shared/shopify.js` is shipped
with empty placeholders. The cart's "Continue to secure checkout" button
**stays disabled** until those values are filled in and the file redeployed.

---

## 1. Create the 5 products

Match handles exactly — they're the slug used by code search/auditing.

| Bundle | Title | Shopify handle | Price (USD) | Compare-at |
|--------|-------|----------------|------------:|-----------:|
| **A1** | Single Pouch | `a1-single-pouch` | $21.99 | — |
| **A2** | Morning Duo  | `a2-morning-duo` | $34.99 | — |
| **A3** ⭐ | Discover + Commit | `a3-discover-commit` | $31.99 | — |
| **B1** ⭐ | AM/PM Ritual Duo | `b1-ampm-duo` | $36.99 | — |
| **B2** | Full Daypart Set | `b2-full-daypart-set` | $64.99 | — |

For A1 / A2 / A3 (which include a "your pick" pouch), create one variant
per blend choice OR use a product option `Blend choice` with values
`Dark Morning | Tart Cooler | Mint Reset | Moon Bloom`. Pick the simplest
shape that still lets us deep-link with one variant ID per bundle.

> Margins are locked to Andrew's table. Do NOT discount hero bundles
> (A3, B1) below the listed price without re-checking with Finance.

## 2. Create the Subscribe & Save 15% selling plan

Shopify Admin → Products → Subscriptions → Create selling plan group.

- **Name:** Subscribe & Save 15%
- **Discount:** 15% off
- **Delivery interval:** Every 30 days
- **Attach to variants:** A1, A2, A3, B1 (NOT B2 — too big to refill monthly)
- **Cancellation:** anytime, no fee

After creation, copy each variant's `sellingPlanId` for the table below.

## 3. Free-shipping rule

Shopify Admin → Settings → Shipping → Domestic profile.

- Rate name: **Free shipping over $25**
- Condition: Order subtotal ≥ **$25.00**
- Price: $0.00
- Below threshold: existing flat rate stays

Every hero bundle (A3 $31.99, B1 $36.99) clears this; the A1 single
pouch ($21.99) sits just under, which is the intended upsell nudge.

## 4. Order-status return URL

Shopify Admin → Settings → Checkout → "Order status page" → Additional
scripts. Append:

```html
<script>
  // Redirect to Varitea thank-you with order context for analytics + UX
  (function(){
    var url = new URL('https://drinkvaritea.com/preview/thank-you/');
    if (typeof Shopify !== 'undefined' && Shopify.checkout) {
      url.searchParams.set('order_id', Shopify.checkout.order_id || '');
    }
    // Cart attributes carried in from /preview/cart/
    var attrs = (Shopify && Shopify.checkout && Shopify.checkout.note_attributes) || [];
    attrs.forEach(function(a){ url.searchParams.set(a.name, a.value); });
    setTimeout(function(){ window.location = url.toString(); }, 1500);
  })();
</script>
```

(1.5 s delay so the buyer sees Shopify's order confirmation first.)

## 5. Fill in `shopify.js`

Edit `site/preview/shared/shopify.js` (PUBLIC values — no secrets):

```js
const CONFIG = {
  shopDomain: 'drinkvaritea.myshopify.com',
  variants: {
    A1: { variantId: '4xxxxxx0001', sellingPlanId: 'gid://shopify/SellingPlan/123' },
    A2: { variantId: '4xxxxxx0002', sellingPlanId: 'gid://shopify/SellingPlan/123' },
    A3: { variantId: '4xxxxxx0003', sellingPlanId: 'gid://shopify/SellingPlan/123' },
    B1: { variantId: '4xxxxxx0004', sellingPlanId: 'gid://shopify/SellingPlan/123' },
    B2: { variantId: '4xxxxxx0005', sellingPlanId: '' }
  }
};
```

Note: Shopify cart permalinks accept **numeric** variant IDs
(`https://shop.myshopify.com/cart/40123456789012:1`). The selling-plan
suffix uses Shopify's `selling_plan` query attribute. The helper in
`shopify.js` builds the URL — Ops only needs to paste IDs.

## 6. Smoke test (before promoting to main landing)

1. `/preview/s2-v2/` → pick "twice a day" → assign Dark Morning + Moon Bloom → click CTA
2. `/preview/s2-v2/bundles/?ritual=twice&routine=Dark%20Morning%20%2B%20Moon%20Bloom` → "AM/PM Duo" should show with "Recommended" badge
3. `/preview/cart/?bundle=B1&ritual=twice&routine=...` → toggle Subscribe & Save → totals reflect 15% off → free-ship line shows "unlocked ✓"
4. Click "Continue to secure checkout" → Shopify cart loads with one line item, selling plan attached, cart attributes (ritual, routine, bundle_id, sub_plan) present in cart notes
5. Complete a $0.01 test order with a test gateway → land back on `/preview/thank-you/?order_id=...&bundle_id=B1&ritual=twice&sub_plan=ss-15`

If all five steps pass, hand back to Jared for promotion review.
