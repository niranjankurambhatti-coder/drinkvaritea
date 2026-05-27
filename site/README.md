# Varitea — Landing Page MVP

Production-quality, SEO-optimized static landing page for the **Drink Varitea First Sip Box**. Built mobile-first, designed to ship the first paid order ASAP.

> **Project path:** `drinkvaritea/site/`
> **Stack:** Pure HTML + CSS + vanilla JS. No build step, no dependencies.

## Quick start

```bash
cd drinkvaritea/site
python3 -m http.server 8000
# open http://localhost:8000
```

That's it — the site is a static bundle and runs anywhere that serves files (S3, Vercel, Netlify, Cloudflare Pages, GitHub Pages, plain nginx).

## Files

```
drinkvaritea/site/
├── index.html              # Single-page landing, all copy + SEO + JSON-LD
├── css/styles.css          # Design system: warm tea-house palette, Fraunces + Inter
├── js/app.js               # Analytics hooks, reveal animations, checkout routing
├── assets/
│   ├── logo.svg            # Brand wordmark
│   ├── og-image.svg        # 1200×630 source for OG image
│   └── og-image.png        # Rendered OG image (used by meta tags)
├── robots.txt
├── sitemap.xml
└── README.md               # this file
```

## Configuring the checkout URL

The CTAs currently use `href="#checkout"` as a placeholder. To wire up Stripe Payment Link or Shopify:

**Option A — set globals at the top of the page** (drop a small inline script before `js/app.js`):

```html
<script>
  window.VARITEA_CHECKOUT_URL  = 'https://buy.stripe.com/abc123';
  window.VARITEA_CHECKOUT_URLS = {
    single: 'https://buy.stripe.com/abc-single',
    double: 'https://buy.stripe.com/abc-double',
    gift:   'https://buy.stripe.com/abc-gift'
  };
</script>
```

**Option B — edit `js/app.js`** (look for the `CONFIG` block at the top).

When set, every primary/checkout CTA (`hero_cta_click`, `checkout_cta_click`, `nav_checkout_click`) intercepts the click and routes to the configured URL, preserving the currently-selected bundle.

## Analytics event hooks

All events are pushed to `window.dataLayer` (GTM/GA4 compatible) **and** dispatched as a `varitea:track` `CustomEvent` (PostHog, Segment, etc.).

```js
document.addEventListener('varitea:track', (e) => {
  // e.detail = { event, ts, page, ...props }
  posthog.capture(e.detail.event, e.detail);
});
```

Events emitted:

| Event                  | When                                                                  |
| ---------------------- | --------------------------------------------------------------------- |
| `page_view`            | On load. `page_type=landing-home`.                                    |
| `hero_cta_click`       | Click on hero primary CTA.                                            |
| `quiz_cta_click`       | Click on any “take the quiz / start the quiz” link.                   |
| `email_capture_focus`  | First focus of the email input.                                       |
| `email_capture_submit` | Form submit on the quiz email capture.                                |
| `bundle_option_click`  | Click on a bundle radio label.                                        |
| `bundle_option_change` | Change of bundle selection (also fires on keyboard nav).              |
| `checkout_cta_click`   | Click on “Send me the box” / final CTA / nav checkout.                |
| `nav_checkout_click`   | Click on the sticky nav CTA.                                          |

All clicked elements with `[data-analytics-event]` are tracked via a single delegated listener — adding a new event is just an HTML attribute. Set `window.VARITEA_DEBUG = true` in DevTools to log every event to the console.

## SEO inventory

- **Title:** `Varitea First Sip Box — Curated 3-Tea Starter for People Who Want Better Than Coffee` (under 60 chars body, slightly longer with brand)
- **Meta description:** under 160 chars, keyword-loaded, conversion-toned
- **Canonical:** `https://drinkvaritea.com/`
- **Open Graph + Twitter Card** with 1200×630 PNG
- **Semantic headings:** one `<h1>`, multiple `<h2>` per section, `<h3>` for cards
- **JSON-LD:**
  - `Organization` + `WebSite`
  - `Product` with `Offer` ($19 USD, `PreOrder` availability) — no `aggregateRating`, no shipping rate (real values to be added post-launch)
  - `FAQPage` with six Q/A pairs
- **Targeted keywords** woven into copy: *custom tea blend, loose leaf tea sampler, tea gift box, iced tea starter, coffee alternative tea, herbal tea sampler, beginner tea box*
- **`robots.txt` + `sitemap.xml`** in place

## Design system

- **Typography:** Fraunces (display, serif) + Inter (body)
- **Palette:** Cream `#f5efe4` surfaces · Matcha green `#264a3a` · Steeped-honey amber `#b8884a`
- **Motion:** subtle scroll reveal, micro-hover lift on cards/buttons, animated steam, marquee strip. Respects `prefers-reduced-motion`.
- **Mobile-first** with grid + clamp() type scale. Verified at 390×844 (iPhone 12-class) and 1440-wide desktop.

## Deployment

This is a static bundle. Recommended paths:

- **Vercel:** `vercel --prod` from `drinkvaritea/site/` (configure project root to `drinkvaritea/site`).
- **Cloudflare Pages / Netlify:** point to the `drinkvaritea/site/` directory; no build command.
- **S3 + CloudFront:** sync the directory; set `index.html` as the default doc.

> **Note for the main agent:** do **not** publish to a permanent `*.pplx.app` URL. Use `deploy_website` for preview only.

## Email capture backend (not required for launch)

The current form posts via `mailto:` as a safe static fallback. To collect leads properly, swap the `<form action>` on `#quiz` to any of:

- ConvertKit / Mailchimp / Klaviyo hosted form action
- A Resend / Loops API endpoint
- A Supabase Edge Function that inserts into a `subscribers` table

The `email_capture_submit` analytics event already fires regardless of backend.

## What's intentionally **not** in scope for the MVP

- Real Stripe/Shopify checkout (placeholder anchor only)
- Quiz flow (CTA routes to email capture — full quiz lives in a later sprint per `docs/measurement-architecture.md`)
- Multi-page (PDP, account, reviews) — single landing only
- A/B testing harness (event hooks are ready for it)

## Handoff checklist for the main agent

- [ ] Pick payment processor (Stripe Payment Link recommended for speed)
- [ ] Set `VARITEA_CHECKOUT_URL` / `VARITEA_CHECKOUT_URLS`
- [ ] Connect GA4 / GTM and verify events fire (set `window.VARITEA_DEBUG = true`)
- [ ] Connect PostHog via the `varitea:track` event listener
- [ ] Replace mailto on the quiz form with a real backend
- [ ] Deploy preview, then sanity check on mobile Safari + Chrome
- [ ] Drive first batch of paid traffic to validate hero / offer
