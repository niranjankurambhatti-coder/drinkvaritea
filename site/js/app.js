/* ============================================================
   Varitea — Landing page JS
   - Analytics event hooks (window.dataLayer + window.varitea.track)
   - Configurable checkout URL (Stripe Payment Link / Shopify)
   - Scroll-reveal IntersectionObserver
   - Minimal, accessible micro-interactions
   ============================================================ */
(function () {
  'use strict';

  /* -----------------------------------------------------------
     CONFIG — replace these placeholders when checkout is ready.
     ----------------------------------------------------------- */
  window.VARITEA_CHECKOUT_URL = window.VARITEA_CHECKOUT_URL || 'https://buy.stripe.com/aFa8wQ6Uz5tz0wCeGv5ZC00';

  // Optional: per-bundle URLs. Falls back to VARITEA_CHECKOUT_URL.
  window.VARITEA_CHECKOUT_URLS = window.VARITEA_CHECKOUT_URLS || {
    single: null, // 'https://buy.stripe.com/...'
    double: null,
    gift:   null
  };

  /* -----------------------------------------------------------
     Analytics shim
     Pushes a typed event into window.dataLayer (for GTM/GA4)
     and dispatches a `varitea:track` CustomEvent for PostHog or
     anything else wired up via the main agent.
     ----------------------------------------------------------- */
  window.dataLayer = window.dataLayer || [];
  function track(event, props) {
    var payload = Object.assign(
      { event: event, ts: Date.now(), page: location.pathname },
      props || {}
    );
    try { window.dataLayer.push(payload); } catch (e) {}
    try {
      document.dispatchEvent(new CustomEvent('varitea:track', { detail: payload }));
    } catch (e) {}
    // Console for QA visibility — safe to leave on during MVP.
    if (window.VARITEA_DEBUG) console.log('[varitea]', payload);
  }
  window.varitea = window.varitea || {};
  window.varitea.track = track;

  /* -----------------------------------------------------------
     page_view — fired once on load
     ----------------------------------------------------------- */
  function firePageView() {
    var body = document.body;
    track('page_view', {
      page_type: body.getAttribute('data-analytics-page') || 'unknown',
      path: location.pathname,
      referrer: document.referrer || null,
      title: document.title
    });
  }

  /* -----------------------------------------------------------
     Delegated click tracking for [data-analytics-event]
     ----------------------------------------------------------- */
  function onDocClick(e) {
    var el = e.target.closest('[data-analytics-event]');
    if (!el) return;
    var event = el.getAttribute('data-analytics-event');
    if (!event) return;

    var props = {
      cta_label: el.getAttribute('data-cta-label') || null,
      bundle_id: el.getAttribute('data-bundle-id') || null,
      capture_source: el.getAttribute('data-capture-source') || null,
      href: el.getAttribute('href') || null,
      text: (el.textContent || '').trim().slice(0, 80)
    };

    // Skip pure focus events on click handler.
    if (event === 'email_capture_focus') return;

    track(event, props);

    // If a checkout link, optionally route to a per-bundle URL.
    if (
      (event === 'hero_cta_click' || event === 'checkout_cta_click' || event === 'nav_checkout_click')
      && el.tagName === 'A'
    ) {
      var bundleInput = document.querySelector('input[name="bundle"]:checked');
      var bundleId = bundleInput ? bundleInput.value : 'single';
      var bundleUrl = window.VARITEA_CHECKOUT_URLS && window.VARITEA_CHECKOUT_URLS[bundleId];
      if (bundleUrl) {
        e.preventDefault();
        window.location.href = bundleUrl;
      }
      // Otherwise: follow the link's href (now the Stripe Payment Link).
    }
  }

  /* -----------------------------------------------------------
     Focus + change tracking on the email capture
     ----------------------------------------------------------- */
  function wireEmailCapture() {
    document.querySelectorAll('input[type="email"]').forEach(function (input) {
      var src = input.getAttribute('data-capture-source') || 'unknown';
      input.addEventListener('focus', function () {
        track('email_capture_focus', { capture_source: src });
      }, { once: true });
    });

    document.querySelectorAll('form[data-analytics-event="email_capture_submit"]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        var input = form.querySelector('input[type="email"]');
        var email = input ? input.value : '';
        var src = form.getAttribute('data-capture-source') || 'unknown';
        track('email_capture_submit', { capture_source: src, has_email: !!email });
        // Static MVP fallback: keep the mailto behavior. Replace action
        // with backend endpoint (Resend, ConvertKit, Mailchimp, etc.).
      });
    });
  }

  /* -----------------------------------------------------------
     Bundle radio: also track on change (in addition to label click)
     ----------------------------------------------------------- */
  function wireBundleRadios() {
    document.querySelectorAll('input[name="bundle"]').forEach(function (input) {
      input.addEventListener('change', function () {
        track('bundle_option_change', { bundle_id: input.value });
      });
    });
  }

  /* -----------------------------------------------------------
     Reveal on scroll
     ----------------------------------------------------------- */
  function wireReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Light stagger by index within parent
          var siblings = entry.target.parentElement
            ? Array.prototype.slice.call(entry.target.parentElement.querySelectorAll('[data-reveal]'))
            : [];
          var idx = Math.max(0, siblings.indexOf(entry.target));
          entry.target.style.transitionDelay = Math.min(idx * 70, 350) + 'ms';
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* -----------------------------------------------------------
     Smooth anchor scroll for in-page nav
     ----------------------------------------------------------- */
  function wireSmoothAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (!id || id === '#' || id === '#checkout') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  }

  /* -----------------------------------------------------------
     Footer year
     ----------------------------------------------------------- */
  function setYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------------------------
     Init
     ----------------------------------------------------------- */
  function init() {
    setYear();
    wireReveal();
    wireEmailCapture();
    wireBundleRadios();
    wireSmoothAnchors();
    document.addEventListener('click', onDocClick, { passive: true });
    firePageView();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
