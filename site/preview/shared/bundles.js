/* ============================================================
   Varitea — Bundle Catalog (EXP-002 Phase 2)
   ------------------------------------------------------------
   Single source of truth for the ritual-frequency offer system.
   Prices, contribution, CM% lifted from Andrew's offer table
   (handoff dated 2026-05-28). Do NOT discount hero bundles
   below the listed price without re-checking with Andrew.

   Storefront wiring:
     We use Shopify cart permalinks of the form
     https://{shop}.myshopify.com/cart/{variantId}:{qty}?...
     so we never have to ship a JS bundle for checkout. The
     real variant IDs are injected at deploy time from
     window.VARITEA_SHOPIFY (set by /preview/shared/shopify.js),
     so this file stays a pure catalog with zero secrets.
   ============================================================ */
(function (root) {
  'use strict';

  /* ---------- BLENDS (matches s2-v2 daypart roles) ---------- */
  const BLENDS = {
    'dark-morning': { name: 'Dark Morning', daypart: 'Morning',   tintA: '#3b2418', tintB: '#7a4a2c' },
    'tart-cooler':  { name: 'Tart Cooler',  daypart: 'Afternoon', tintA: '#7a2230', tintB: '#c25268' },
    'mint-reset':   { name: 'Mint Reset',   daypart: 'Evening',   tintA: '#2f5a44', tintB: '#7fae8a' },
    'moon-bloom':   { name: 'Moon Bloom',   daypart: 'Night',     tintA: '#3b2f5e', tintB: '#7a6cae' }
  };

  /* ---------- BUNDLES (margin-locked) ---------- */
  /* contribution + cm% are display-only; the authoritative
     numbers live in Andrew's finance sheet. Keep them in sync.  */
  const BUNDLES = [
    {
      id: 'A1', sku: 'VAR-A1-SINGLE',
      track: 'A', ritual: 'once',
      title: 'Single Pouch',
      tagline: 'One blend, 28 servings — about a month for a once-a-day drinker.',
      contents: ['1 full pouch (28 servings) of your chosen blend'],
      price: 21.99, contribution: 12.38, cm: 56.3,
      heroBlendKey: null,                // user picks blend in the picker
      role: 'entry', isHero: false,
      shopifyHandle: 'a1-single-pouch'
    },
    {
      id: 'A2', sku: 'VAR-A2-MORNING-DUO',
      track: 'A', ritual: 'once',
      title: 'Morning Duo',
      tagline: 'Two pouches of your morning rotation — never run out.',
      contents: ['Pouch 1: Dark Morning (28 srv)', 'Pouch 2: your pick (28 srv)'],
      price: 34.99, contribution: 20.47, cm: 58.5,
      heroBlendKey: 'dark-morning',
      role: 'duo', isHero: false,
      shopifyHandle: 'a2-morning-duo'
    },
    {
      id: 'A3', sku: 'VAR-A3-DISCOVER-COMMIT',
      track: 'A', ritual: 'once',
      title: 'Discover + Commit',
      tagline: 'Sampler flight of all 4 blends, plus a full pouch of the one you love.',
      contents: [
        'Sampler: 8 sachets covering all 4 blends',
        '1 full pouch (28 srv) of your chosen blend'
      ],
      price: 31.99, contribution: 18.74, cm: 58.6,
      heroBlendKey: 'dark-morning',
      role: 'hero', isHero: true,        // ⭐ HERO for once-a-day
      shopifyHandle: 'a3-discover-commit'
    },
    {
      id: 'B1', sku: 'VAR-B1-AMPM-DUO',
      track: 'B', ritual: 'twice',
      title: 'AM/PM Ritual Duo',
      tagline: 'A blend for your morning, a blend for your wind-down.',
      contents: [
        'AM pouch: Dark Morning (28 srv)',
        'PM pouch: Moon Bloom (28 srv)'
      ],
      price: 36.99, contribution: 22.41, cm: 60.6,
      heroBlendKey: 'dark-morning',
      role: 'hero', isHero: true,        // ⭐ HERO for twice-a-day
      shopifyHandle: 'b1-ampm-duo'
    },
    {
      id: 'B2', sku: 'VAR-B2-FULL-DAYPART',
      track: 'B', ritual: 'twice',
      title: 'Full Daypart Set',
      tagline: 'All four daypart blends — 112 servings, ~2 months of routine.',
      contents: [
        'Dark Morning · Tart Cooler · Mint Reset · Moon Bloom',
        '4 pouches × 28 servings = 112 servings total'
      ],
      price: 64.99, contribution: 40.85, cm: 62.8,
      heroBlendKey: null,
      role: 'max', isHero: false,
      shopifyHandle: 'b2-full-daypart-set'
    }
  ];

  /* ---------- SUBSCRIBE & SAVE 15% ---------- */
  /* Applied to A2 and B1 in Andrew's plan. Other SKUs default
     to one-time only unless Shopify variants exist.            */
  const SUBSCRIPTION = {
    discountPct: 15,
    eligible: { A2: true, B1: true, A3: true, A1: true, B2: false }
  };

  function effectiveSubPrice (bundle) {
    if (!SUBSCRIPTION.eligible[bundle.id]) return null;
    return Math.round(bundle.price * (1 - SUBSCRIPTION.discountPct / 100) * 100) / 100;
  }

  /* ---------- FREE-SHIP THRESHOLD ---------- */
  const FREE_SHIP_THRESHOLD = 25;        // every hero bundle clears it

  /* ---------- HELPERS ---------- */
  function bundleById (id) { return BUNDLES.find(function (b) { return b.id === id; }); }
  function bundlesForRitual (ritual) {
    if (!ritual || ritual === 'unknown') return BUNDLES.slice();
    return BUNDLES.filter(function (b) { return b.ritual === ritual; });
  }
  function heroForRitual (ritual) {
    return BUNDLES.find(function (b) { return b.isHero && b.ritual === ritual; }) || null;
  }
  function fmt (n) { return '$' + n.toFixed(2); }

  /* ---------- EXPORT ---------- */
  root.VariteaBundles = {
    BLENDS: BLENDS,
    BUNDLES: BUNDLES,
    SUBSCRIPTION: SUBSCRIPTION,
    FREE_SHIP_THRESHOLD: FREE_SHIP_THRESHOLD,
    bundleById: bundleById,
    bundlesForRitual: bundlesForRitual,
    heroForRitual: heroForRitual,
    effectiveSubPrice: effectiveSubPrice,
    fmt: fmt
  };
})(window);
