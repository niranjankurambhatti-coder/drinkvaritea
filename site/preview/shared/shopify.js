/* ============================================================
   Varitea — Shopify Storefront Wiring (EXP-002 Phase 2)
   ------------------------------------------------------------
   Strategy: ship NO Shopify JS SDK. We use cart permalinks.

     One-time purchase:
       https://{shop}.myshopify.com/cart/{variantId}:{qty}
         ?attributes[ritual]=once
         &attributes[routine]=Dark%20Morning
         &return_to=/checkout

     Subscribe & Save (Shopify Subscriptions / native or app):
       Same URL + selling_plan={sellingPlanId}

   Ops checklist (docs/shopify-setup.md):
     - Create 5 products + variants in Shopify
     - Set product handles to match `shopifyHandle` in bundles.js
     - Create Selling Plan Group "Subscribe & Save 15%" and
       attach to A1/A2/A3/B1 variants
     - Set free-shipping rule: orders ≥ $25
     - Paste the shop domain + variant IDs into the
       window.VARITEA_SHOPIFY block below

   This file is intentionally a static config. No secrets here
   — variant IDs and shop domain are PUBLIC in Shopify.
   ============================================================ */
(function (root) {
  'use strict';

  /* ----------------------------------------------------------
     CONFIG — fill in after Ops creates products in Shopify.
     Until then, the checkout button on /preview/cart/ stays
     disabled and shows an inline "checkout wiring pending"
     hint instead of producing a broken Shopify link.
     ---------------------------------------------------------- */
  const CONFIG = {
    shopDomain: 'u0xw6n-yj.myshopify.com',   // Varitea store (Trial plan)
    currency: 'USD',
    // bundleId -> { variantId, sellingPlanId? }
    // Variant IDs created via Shopify Admin 2026-05-31 (Ops). Numeric IDs
    // are what cart permalinks consume. sellingPlanId left blank until the
    // store is upgraded off Trial and the "Subscribe & Save 15%" plan group
    // is created (see docs/shopify-setup.md §2).
    variants: {
      A1: { variantId: '48346184286400', sellingPlanId: '' },
      A2: { variantId: '48346184220864', sellingPlanId: '' },
      A3: { variantId: '48346184319168', sellingPlanId: '' },
      B1: { variantId: '48346184188096', sellingPlanId: '' },
      B2: { variantId: '48346184253632', sellingPlanId: '' }
    },
    // Where to send the buyer after Shopify checkout completes.
    // Configure in Shopify Admin → Settings → Checkout → Order status page → "Additional scripts"
    // to redirect to /preview/thank-you/ — this is the absolute fallback.
    returnTo: '/preview/thank-you/'
  };

  function isWired () {
    return !!CONFIG.shopDomain;
  }

  function variantFor (bundleId, subscribe) {
    const v = CONFIG.variants[bundleId];
    if (!v || !v.variantId) return null;
    return {
      variantId: v.variantId,
      sellingPlanId: subscribe ? (v.sellingPlanId || '') : ''
    };
  }

  /* ----------------------------------------------------------
     buildCheckoutUrl(items, attrs)
       items: [{ bundleId, qty, subscribe }]
       attrs: { ritual, routine, ... }  -> Shopify cart attributes
     Returns a string URL or null if not wired yet.
     ---------------------------------------------------------- */
  function buildCheckoutUrl (items, attrs) {
    if (!isWired()) return null;
    if (!items || !items.length) return null;

    const parts = [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const v = variantFor(it.bundleId, it.subscribe);
      if (!v) return null;
      const qty = it.qty && it.qty > 0 ? it.qty : 1;
      let token = v.variantId + ':' + qty;
      // Selling plan attaches per-line via the line-item key syntax
      if (v.sellingPlanId) token += '@' + v.sellingPlanId;
      parts.push(token);
    }

    const url = new URL('https://' + CONFIG.shopDomain + '/cart/' + parts.join(','));

    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (attrs[k] == null || attrs[k] === '') return;
        url.searchParams.set('attributes[' + k + ']', String(attrs[k]));
      });
    }
    url.searchParams.set('return_to', CONFIG.returnTo);
    return url.toString();
  }

  root.VariteaShopify = {
    CONFIG: CONFIG,
    isWired: isWired,
    buildCheckoutUrl: buildCheckoutUrl
  };
})(window);
