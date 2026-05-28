/* ============================================================
   Varitea — Landing page JS + Analytics Event Bridge
   --------------------------------------------------------------
   - window.varitea.track(eventName, properties)
       Fans out to:
         * window.dataLayer  (GTM / GA4 via GTM)
         * window.gtag       (GA4 gtag.js if loaded)
         * window.posthog    (PostHog if loaded)
         * `varitea:track` CustomEvent (for any other listener)
   - UTM capture (URL → localStorage, 30-day TTL) + cookie fallback.
   - Stable anonymous_id + per-tab session_id, attached to every event.
   - Click delegation supports BOTH `data-analytics-event` (canonical)
     and `data-analytics` (legacy attribute on the live homepage).
   - Decorates outbound Stripe Payment Links with utm_* + client_reference_id
     at click time.
   ============================================================ */
(function () {
  'use strict';

  /* -----------------------------------------------------------
     CONFIG — placeholders. Set real IDs at runtime by defining
     globals BEFORE this script runs, e.g. in a small inline tag:

       <script>
         window.VARITEA_CONFIG = {
           GA4_MEASUREMENT_ID: 'G-XXXXXXX',       // e.g. 'G-ABC12345'
           GTM_CONTAINER_ID:   'GTM-XXXXXXX',     // optional
           POSTHOG_PROJECT_KEY:'phc_XXXXXXX',     // PostHog public project API key
           POSTHOG_HOST:       'https://us.i.posthog.com', // or self-host
           DEBUG: false
         };
       </script>

     We do NOT inject the GA4/GTM/PostHog snippets here — the
     founder/web-agent should drop those into <head> when the
     real IDs exist. This module gracefully no-ops on missing
     destinations and always pushes to window.dataLayer + the
     `varitea:track` CustomEvent so downstream listeners work.
     ----------------------------------------------------------- */
  var CONFIG = window.VARITEA_CONFIG || {};
  var DEBUG = !!(CONFIG.DEBUG || window.VARITEA_DEBUG);

  window.VARITEA_CHECKOUT_URL = window.VARITEA_CHECKOUT_URL ||
    'https://buy.stripe.com/aFa8wQ6Uz5tz0wCeGv5ZC00';

  window.VARITEA_CHECKOUT_URLS = window.VARITEA_CHECKOUT_URLS || {
    single: null,
    double: null,
    gift:   null
  };

  /* -----------------------------------------------------------
     Storage helpers — degrade gracefully if blocked.
     ----------------------------------------------------------- */
  var STORAGE_PREFIX = 'varitea.';
  var UTM_KEY        = STORAGE_PREFIX + 'utm';
  var ANON_KEY       = STORAGE_PREFIX + 'aid';
  var LANDING_KEY    = STORAGE_PREFIX + 'landing';
  var SESSION_KEY    = STORAGE_PREFIX + 'sid';
  var UTM_TTL_MS     = 30 * 24 * 60 * 60 * 1000; // 30 days

  function lsGet(k) {
    try { return window.localStorage.getItem(k); } catch (e) { return null; }
  }
  function lsSet(k, v) {
    try { window.localStorage.setItem(k, v); } catch (e) {}
  }
  function ssGet(k) {
    try { return window.sessionStorage.getItem(k); } catch (e) { return null; }
  }
  function ssSet(k, v) {
    try { window.sessionStorage.setItem(k, v); } catch (e) {}
  }
  function cookieSet(name, value, days) {
    try {
      var d = new Date(); d.setTime(d.getTime() + days * 86400000);
      document.cookie = name + '=' + encodeURIComponent(value) +
        ';expires=' + d.toUTCString() +
        ';path=/;SameSite=Lax';
    } catch (e) {}
  }
  function cookieGet(name) {
    try {
      var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return m ? decodeURIComponent(m.pop()) : null;
    } catch (e) { return null; }
  }

  /* -----------------------------------------------------------
     ID generation (no external dep). Not cryptographically
     strong — sufficient for client-side anon attribution.
     ----------------------------------------------------------- */
  function uid() {
    return 'v_' + Date.now().toString(36) +
      '_' + Math.random().toString(36).slice(2, 10);
  }

  function getAnonymousId() {
    var id = lsGet(ANON_KEY) || cookieGet('varitea_aid');
    if (!id) {
      id = uid();
      lsSet(ANON_KEY, id);
      cookieSet('varitea_aid', id, 365);
    } else if (!cookieGet('varitea_aid')) {
      // backfill cookie so server endpoints can read it
      cookieSet('varitea_aid', id, 365);
    }
    return id;
  }

  function getSessionId() {
    var id = ssGet(SESSION_KEY);
    if (!id) {
      id = uid();
      ssSet(SESSION_KEY, id);
    }
    return id;
  }

  /* -----------------------------------------------------------
     UTM capture — first-touch wins for 30 days, last-touch
     overwrites within the same session when explicit utm_* is
     present in the URL.
     ----------------------------------------------------------- */
  var UTM_KEYS = [
    'utm_source', 'utm_medium', 'utm_campaign',
    'utm_content', 'utm_term', 'utm_id',
    'gclid', 'fbclid', 'ttclid', 'msclkid'
  ];

  function parseUtmFromUrl() {
    var out = {};
    try {
      var p = new URLSearchParams(window.location.search);
      UTM_KEYS.forEach(function (k) {
        var v = p.get(k);
        if (v) out[k] = v;
      });
    } catch (e) {}
    return out;
  }

  function loadStoredUtm() {
    try {
      var raw = lsGet(UTM_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || !parsed._ts) return null;
      if (Date.now() - parsed._ts > UTM_TTL_MS) return null;
      return parsed;
    } catch (e) { return null; }
  }

  function persistUtm(obj) {
    obj._ts = Date.now();
    lsSet(UTM_KEY, JSON.stringify(obj));
  }

  function captureUtm() {
    var fromUrl = parseUtmFromUrl();
    var stored  = loadStoredUtm() || {};
    var merged  = Object.assign({}, stored);
    var hasNew  = false;
    Object.keys(fromUrl).forEach(function (k) {
      if (fromUrl[k]) { merged[k] = fromUrl[k]; hasNew = true; }
    });
    if (hasNew || !stored._ts) {
      persistUtm(merged);
    }
    // strip the internal timestamp for downstream use
    var clean = {};
    Object.keys(merged).forEach(function (k) {
      if (k !== '_ts') clean[k] = merged[k];
    });
    return clean;
  }

  function captureLanding() {
    var existing = lsGet(LANDING_KEY);
    if (existing) {
      try { return JSON.parse(existing); } catch (e) {}
    }
    var landing = {
      landing_path: location.pathname + location.search,
      landing_referrer: document.referrer || null,
      landing_ts: Date.now()
    };
    lsSet(LANDING_KEY, JSON.stringify(landing));
    return landing;
  }

  /* -----------------------------------------------------------
     Destination bridges
     ----------------------------------------------------------- */
  function pushDataLayer(payload) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(payload);
    } catch (e) {}
  }

  function sendGtag(eventName, payload) {
    if (typeof window.gtag !== 'function') return;
    try {
      // GA4 reserves a handful of names; map our schema through.
      var ga4Payload = Object.assign({}, payload);
      delete ga4Payload.event;
      window.gtag('event', eventName, ga4Payload);
    } catch (e) {}
  }

  function sendPosthog(eventName, payload) {
    if (!window.posthog || typeof window.posthog.capture !== 'function') return;
    try {
      window.posthog.capture(eventName, payload);
    } catch (e) {}
  }

  /* -----------------------------------------------------------
     track() — the public surface.
     ----------------------------------------------------------- */
  var UTM_CONTEXT     = captureUtm();
  var LANDING_CONTEXT = captureLanding();
  var ANON_ID         = getAnonymousId();
  var SESSION_ID      = getSessionId();

  function baseContext() {
    return {
      anonymous_id: ANON_ID,
      session_id: SESSION_ID,
      referrer: document.referrer || null,
      landing_path: LANDING_CONTEXT.landing_path,
      landing_referrer: LANDING_CONTEXT.landing_referrer,
      utm_source:   UTM_CONTEXT.utm_source   || null,
      utm_medium:   UTM_CONTEXT.utm_medium   || null,
      utm_campaign: UTM_CONTEXT.utm_campaign || null,
      utm_content:  UTM_CONTEXT.utm_content  || null,
      utm_term:     UTM_CONTEXT.utm_term     || null,
      utm_id:       UTM_CONTEXT.utm_id       || null,
      gclid:        UTM_CONTEXT.gclid        || null,
      fbclid:       UTM_CONTEXT.fbclid       || null
    };
  }

  function track(event, props) {
    var payload = Object.assign(
      { event: event, ts: Date.now(), page: location.pathname },
      baseContext(),
      props || {}
    );
    pushDataLayer(payload);
    sendGtag(event, payload);
    sendPosthog(event, payload);
    try {
      document.dispatchEvent(new CustomEvent('varitea:track', { detail: payload }));
    } catch (e) {}
    if (DEBUG) {
      try { console.log('[varitea]', event, payload); } catch (e) {}
    }
  }

  // Identify hook for downstream (PostHog) when we learn an email/order.
  function identify(traits) {
    if (!traits) return;
    if (window.posthog && typeof window.posthog.identify === 'function') {
      try { window.posthog.identify(ANON_ID, traits); } catch (e) {}
    }
    pushDataLayer(Object.assign({ event: 'identify' }, baseContext(), traits));
  }

  window.dataLayer = window.dataLayer || [];
  window.varitea = window.varitea || {};
  window.varitea.track = track;
  window.varitea.identify = identify;
  window.varitea.context = baseContext;
  window.varitea.anonymousId = ANON_ID;
  window.varitea.sessionId   = SESSION_ID;

  /* -----------------------------------------------------------
     Stripe link decoration
     - Appends utm_* + client_reference_id to outbound Stripe
       Payment Links so attribution survives the redirect.
     - We treat any href that contains "buy.stripe.com" or
       "checkout.stripe.com" as a Stripe destination.
     ----------------------------------------------------------- */
  function isStripeLink(href) {
    if (!href) return false;
    return /(?:buy|checkout)\.stripe\.com/i.test(href);
  }

  function decorateStripeUrl(href) {
    try {
      var u = new URL(href, window.location.href);
      var ctx = baseContext();
      [
        'utm_source','utm_medium','utm_campaign',
        'utm_content','utm_term','utm_id'
      ].forEach(function (k) {
        if (ctx[k] && !u.searchParams.has(k)) u.searchParams.set(k, ctx[k]);
      });
      // Stripe Payment Links accept `client_reference_id` as a query param;
      // surfaces in webhook + dashboard for attribution.
      if (!u.searchParams.has('client_reference_id')) {
        u.searchParams.set('client_reference_id', ANON_ID);
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  }

  /* -----------------------------------------------------------
     Click delegation — supports both attribute names.
       data-analytics-event  (preferred / canonical)
       data-analytics        (legacy, used on live homepage today)
     Also fires stripe_checkout_started when the click is heading
     to a Stripe URL.
     ----------------------------------------------------------- */
  var LEGACY_TO_CANONICAL = {
    s1_begin:     'hero_cta_click',
    s4_checkout:  'checkout_cta_click',
    s4_quiz:      'quiz_cta_click'
  };

  function readEventName(el) {
    var canonical = el.getAttribute('data-analytics-event');
    if (canonical) return canonical;
    var legacy = el.getAttribute('data-analytics');
    if (!legacy) return null;
    return LEGACY_TO_CANONICAL[legacy] || legacy;
  }

  function onDocClick(e) {
    var el = e.target.closest('[data-analytics-event],[data-analytics]');
    if (!el) return;
    var event = readEventName(el);
    if (!event) return;
    if (event === 'email_capture_focus') return; // handled by focus listener

    var href = el.getAttribute('href');
    var props = {
      cta_label: el.getAttribute('data-cta-label') ||
                 (el.textContent || '').trim().slice(0, 80) || null,
      bundle_id: el.getAttribute('data-bundle-id') || null,
      capture_source: el.getAttribute('data-capture-source') || null,
      href: href || null,
      page_variant: document.body.getAttribute('data-page-variant') || null,
      legacy_attr: el.getAttribute('data-analytics') || null
    };

    track(event, props);

    // Stripe link handling — decorate href + fire checkout_started.
    if (el.tagName === 'A' && href && isStripeLink(href)) {
      var decorated = decorateStripeUrl(href);
      if (decorated && decorated !== href) {
        el.setAttribute('href', decorated);
      }
      track('stripe_checkout_started', {
        cta_label: props.cta_label,
        bundle_id: props.bundle_id,
        href: decorated
      });
    }

    // Optional per-bundle override
    if (
      (event === 'hero_cta_click' || event === 'checkout_cta_click' || event === 'nav_checkout_click')
      && el.tagName === 'A'
    ) {
      var bundleInput = document.querySelector('input[name="bundle"]:checked');
      var bundleId = bundleInput ? bundleInput.value : 'single';
      var bundleUrl = window.VARITEA_CHECKOUT_URLS && window.VARITEA_CHECKOUT_URLS[bundleId];
      if (bundleUrl) {
        e.preventDefault();
        window.location.href = isStripeLink(bundleUrl) ? decorateStripeUrl(bundleUrl) : bundleUrl;
      }
    }
  }

  /* -----------------------------------------------------------
     page_view
     ----------------------------------------------------------- */
  function firePageView() {
    track('page_view', {
      page_type: document.body.getAttribute('data-analytics-page') || 'landing',
      path: location.pathname,
      title: document.title
    });
  }

  /* -----------------------------------------------------------
     Email capture + bundle radios (preserved from prior impl)
     ----------------------------------------------------------- */
  function wireEmailCapture() {
    document.querySelectorAll('input[type="email"]').forEach(function (input) {
      var src = input.getAttribute('data-capture-source') || 'unknown';
      input.addEventListener('focus', function () {
        track('email_capture_focus', { capture_source: src });
      }, { once: true });
    });
    document.querySelectorAll('form[data-analytics-event="email_capture_submit"]').forEach(function (form) {
      form.addEventListener('submit', function () {
        var input = form.querySelector('input[type="email"]');
        var email = input ? input.value : '';
        var src = form.getAttribute('data-capture-source') || 'unknown';
        track('email_capture_submit', { capture_source: src, has_email: !!email });
        if (email) identify({ email: email });
      });
    });
  }

  function wireBundleRadios() {
    document.querySelectorAll('input[name="bundle"]').forEach(function (input) {
      input.addEventListener('change', function () {
        track('bundle_option_change', { bundle_id: input.value });
      });
    });
  }

  /* -----------------------------------------------------------
     Scroll reveal (kept for legacy pages that use it; the new
     homepage handles its own reveals inline).
     ----------------------------------------------------------- */
  function wireReveal() {
    var els = document.querySelectorAll('[data-reveal]:not([data-reveal-managed])');
    if (!('IntersectionObserver' in window) || els.length === 0) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function init() {
    setYear();
    wireReveal();
    wireEmailCapture();
    wireBundleRadios();
    document.addEventListener('click', onDocClick, { passive: false });
    firePageView();

    // Auto-fire purchase_completed on thank-you page if marked.
    if (document.body.getAttribute('data-analytics-page') === 'thank_you') {
      var orderId =
        new URLSearchParams(location.search).get('session_id') ||
        new URLSearchParams(location.search).get('order_id') ||
        null;
      track('purchase_completed', {
        order_id: orderId,
        revenue: null,        // populated server-side by Stripe webhook in P1
        currency: 'USD',
        product_id: 'first_sip_box',
        product_name: 'Varitea First Sip Box'
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
