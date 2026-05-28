# Perplexity Connectors Required — EXP-001 PMF Campaign

> Status verified **2026-05-28**. Required to run one campaign with full **ad-click → order placed** attribution.

## Legend
- ✅ **Connected** — live and usable now.
- ❌ **Must connect** — blocks the sprint; needs founder auth.
- 🟡 **Optional** — nice-to-have for this sprint, not blocking.

---

## A. Critical path — must be connected before any ad spend

| Connector | Status | Why it's required | Owner |
|---|---|---|---|
| **Google Tag Manager** | ❌ Must connect | Central router for GA4 + Meta Pixel + Google Ads conversion tags. The event taxonomy assumes GTM fan-out. Without it, ad-platform conversions can't be wired cleanly. | Ronny |
| **Google Ads** | ❌ Must connect | Conversion actions for `checkout_cta_click` + `purchase_completed`; needed even if EXP-001 runs on Meta, so the same conversion plumbing is ready and we can read cross-channel. (If EXP-001 is Meta-only at launch, this can move to 🟡 — but connect now to avoid a second setup pass.) | Ronny |
| **Facebook Pages / Meta** | ❌ Must connect | Meta is the chosen channel for EXP-001. Required to publish the 2 ad variants, fire Meta Pixel (`PageView`, `ViewContent`, `InitiateCheckout`, `Purchase`), and read CTR/CPC/CAC per creative. | Ronny |
| **Google Analytics (GA4)** | ✅ Connected | Sessions, channel attribution, funnel events, conversions. Property/Measurement ID still needs to be generated + pasted into `window.VARITEA_CONFIG`. | Ronny |
| **PostHog** | ✅ Connected | Funnel + scroll-depth + per-step drop-off, session recordings for the micro-journey. Project key still needs pasting into `window.VARITEA_CONFIG`. | Ronny |
| **Stripe** | ✅ Connected | Checkout, revenue, `purchase_completed` source, UTM in metadata. Needs live mode + `/thank-you` redirect configured. | Ronny / Ecom Ops |
| **Vercel** | ✅ Connected | Deploys landing + variant copy swaps + event-bridge changes. | Jared / Web App |
| **GitHub** | ✅ Connected | Code, PRs, CI, experiment issue tracking. | Both |

---

## B. Supporting — used during the sprint, already connected

| Connector | Status | Use in this sprint |
|---|---|---|
| **Klaviyo** | ✅ Connected | Capture `email_capture_submit` leads, post-purchase + abandoned-cart flows (lifecycle, secondary path). |
| **Shopify** | ✅ Connected | Product/box catalog, orders cross-check vs. Stripe. |
| **Notion** | ✅ Connected | EXP-001 experiment log, daily status, learnings. |
| **Linear** | ✅ Connected | Sprint tasks for Jared (design/copy) and Ronny (instrumentation/QA). |
| **SEMrush** | ✅ Connected | Audience/keyword descriptors for the Coffee-Switch angle; competitor creative reference. |
| **Google Drive / Docs** | ✅ Connected | Creative asset storage, shared copy doc. |
| **Google Calendar** | ✅ Connected | 3-day decision checkpoint reminder. |
| **HubSpot** | ✅ Connected | Contact record if any leads need CRM follow-up. |

---

## C. Optional / next-sprint

| Connector | Status | Note |
|---|---|---|
| Google Search Console | not connected | SEO feedback loop — not needed for paid EXP-001. |
| Google Merchant Center | ❌ available | Only if/when we run Google Shopping. Not EXP-001. |
| YouTube Analytics | ❌ available | Only if a video-ad variant is added later. |
| DataForSEO | ❌ available | SEO research alt; SEMrush covers EXP-001 needs. |

---

## D. Action — connect these three now (founder auth)

These are the only blockers on the connector side. Each opens an auth popup:

1. **Google Tag Manager** (`google_tag_manager__pipedream`)
2. **Google Ads** (`google_ads__pipedream`)
3. **Facebook Pages / Meta** (`facebook_pages__pipedream`)

> Note: ad-platform connectors (Meta Ads / Google Ads) typically require an active Ads account + business verification on the platform side before campaigns can publish. Connecting here grants Computer API access; account creation/verification is a parallel founder task tracked in `growth/tracking-readiness-checklist.md` Tier 3.

---

## E. Credentials still owed (not connectors — paste into code)

Per `growth/tracking-readiness-checklist.md`:

| Value | Where | Source |
|---|---|---|
| `GA4_MEASUREMENT_ID` (`G-XXXX`) | `window.VARITEA_CONFIG` in `site/index.html` **and** `site/thank-you.html` | GA4 Admin → Data Streams |
| `POSTHOG_PROJECT_KEY` (`phc_…`) | same two files | PostHog → Project Settings |
| `GTM_CONTAINER_ID` (`GTM-XXXX`) | same two files (optional router) | GTM → Container Settings |
| Meta Pixel ID | GTM tag / direct snippet | Meta Events Manager |
| Stripe live link + `/thank-you?session_id={CHECKOUT_SESSION_ID}` redirect | Stripe Dashboard | Stripe |
