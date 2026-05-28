# Tracking Readiness Checklist

> **Gate rule:** No ad spend until every item is ✅. Status tracked here. Owner updates daily.

## Tier 1 — Infrastructure (must be live before ANY traffic)

| # | Check | Status | Owner | Validated By |
|---|---|---|---|---|
| 1 | Domain `drinkvaritea.com` live and resolving | ⬜ | Founder | `ping drinkvaritea.com` |
| 2 | SSL certificate active (HTTPS) | ⬜ | Web Agent | Browser padlock check |
| 3 | Landing page live and loading under 3s | ⬜ | Web Agent | PageSpeed Insights |
| 4 | Stripe live checkout link wired to CTA button | ⬜ | Ecom Ops Agent | Manual test purchase |
| 5 | Stripe success/thank-you URL configured | ⬜ | Ecom Ops Agent | Post-purchase redirect test |
| 6 | Mobile layout tested (iPhone + Android) | ⬜ | Web Agent | BrowserStack / device test |

## Tier 2 — Analytics (must fire before any paid traffic)

| # | Check | Status | Owner | Validated By |
|---|---|---|---|---|
| 7 | GA4 property created and Measurement ID ready | ⬜ | Web Agent | GA4 admin console |
| 8 | GA4 tag firing on all pages | ⬜ | Web Agent | GA4 DebugView |
| 9 | Google Tag Manager container created | ⬜ | Web Agent | GTM preview mode |
| 10 | GTM container code on all pages (head + body) | ⬜ | Web Agent | GTM preview tag list |
| 11 | PostHog project created and snippet installed | ⬜ | Web Agent | PostHog Live Events tab |
| 12 | PostHog `page_view` events firing | ⬜ | Web Agent | PostHog Live Events |

## Tier 3 — Ad Platform Pixels (per channel)

| # | Check | Status | Owner | Validated By |
|---|---|---|---|---|
| — | **Connector: Google Tag Manager** authorized (founder) | ✅ | Paid Growth Agent | `google_tag_manager__pipedream` CONNECTED (2026-05-28) |
| — | **Connector: Meta / Facebook** authorized (founder) | ✅ | Paid Growth Agent | `facebook_pages__pipedream` CONNECTED (2026-05-28) |
| — | **Connector: Google Ads** authorized (founder) | ✅ | Paid Growth Agent | `google_ads__pipedream` CONNECTED (2026-05-28) |
| 13 | Meta Pixel created in Meta Events Manager | ❌ | Paid Growth Agent | Meta Events Manager — **need Meta Pixel ID from founder** |
| 14 | Meta Pixel firing `PageView` on landing page | ⬜ | Paid Growth Agent | Meta Pixel Helper extension (blocked on #13) |
| 15 | Meta Pixel firing `InitiateCheckout` event | ⬜ | Paid Growth Agent | Meta Events Manager test (blocked on #13) |
| 16 | Meta Pixel firing `Purchase` event with value | ⬜ | Paid Growth Agent | Meta Events Manager test (blocked on #13) |
| 17 | Google Ads account created / accessible | ✅ | Paid Growth Agent | Connector authorized 2026-05-28; account list via API |
| 18 | Google Ads conversion action created: `checkout_cta_click` | ⬜ | Paid Growth Agent | Google Ads conversions tab (blocked on GTM container ID) |
| 19 | Google Ads conversion action created: `purchase_completed` | ⬜ | Paid Growth Agent | Google Ads conversions tab (blocked on GTM container ID) |
| 20 | Google Ads tag firing via GTM | ⬜ | Paid Growth Agent | GTM preview mode (blocked on GTM container ID) |

## Tier 4 — Event Tracking (specific events per taxonomy)

| # | Event | Trigger | Destination | Status |
|---|---|---|---|---|
| 21 | `page_view` | All page loads | GA4, PostHog | ⬜ |
| 22 | `hero_cta_click` | Hero section CTA button click | GA4, GTM, Meta, PostHog | ⬜ |
| 23 | `quiz_cta_click` | Quiz entry CTA click | GA4, GTM, Meta, PostHog | ⬜ |
| 24 | `bundle_option_change` | User changes bundle selection | GA4, PostHog | ⬜ |
| 24a | `scroll_depth` | 25/50/75/100% scroll, once/session | GA4, GTM, PostHog | 🔄 code merged-pending (PR #17), verified locally via Playwright; live verify blocked on GA4/PH IDs |
| 24b | `s2_tea_selected` | Tea selected in Screen-2 iframe | GA4, GTM, PostHog | 🔄 code merged-pending (PR #17), verified locally via Playwright; live verify blocked on GA4/PH IDs |
| 25 | `checkout_cta_click` | Final checkout button click | GA4, GTM, Meta, Google Ads, PostHog | ⬜ |
| 26 | `email_capture_submit` | Email form submission | GA4, GTM, Meta, PostHog, Klaviyo | ⬜ |
| 27 | `stripe_checkout_started` | Redirect to Stripe checkout | GA4, GTM, Meta, PostHog | ⬜ |
| 28 | `purchase_completed` | Stripe webhook / success page | GA4, GTM, Meta, Google Ads, PostHog, Klaviyo | ⬜ |
| 29 | `customer_added_to_list` | Klaviyo list membership trigger | Klaviyo | ⬜ |
| 30 | `review_requested` | Post-purchase email trigger | Klaviyo, PostHog | ⬜ |

## Tier 5 — UTM and Attribution

| # | Check | Status | Owner | Validated By |
|---|---|---|---|---|
| 31 | UTM convention documented and shared with all agents | ⬜ | Paid Growth Agent | `/growth/utm-builder.md` |
| 32 | UTM parameters captured in GA4 Source/Medium reports | ⬜ | Web Agent | GA4 → Acquisition → Traffic |
| 33 | UTM parameters stored in Stripe metadata on purchase | ⬜ | Web Agent | Stripe dashboard checkout metadata |
| 34 | UTM parameters stored in Klaviyo on email capture | ⬜ | Web Agent | Klaviyo profile properties |
| 35 | UTM parameters visible in PostHog person properties | ⬜ | Web Agent | PostHog person profile |

## Tier 6 — Pre-launch Sanity Test

| # | Check | Status |
|---|---|---|
| 36 | Run a $0 test with a personal link including all UTM params. Verify GA4 captures source/medium/campaign/content correctly. | ⬜ |
| 37 | Complete a manual test purchase with Stripe test mode. Verify `purchase_completed` fires in GA4, PostHog, and Meta Pixel. | ⬜ |
| 38 | Submit test email. Verify contact appears in Klaviyo with UTM properties. | ⬜ |
| 39 | Check GTM preview mode shows all tags firing in correct order. | ⬜ |
| 40 | Confirm mobile experience: CTA tappable, checkout flow works on mobile without zoom. | ⬜ |

## Status legend

- ⬜ Not started
- 🔄 In progress
- ✅ Live and validated
- ❌ Blocked — note blocker inline

## Current blockers

_Update this section daily._

- [x] ~~GTM, Google Ads, Meta connectors~~ — **all three authorized by founder 2026-05-28** ✅
- [ ] **Founder credentials still owed** — `GA4_MEASUREMENT_ID`, `POSTHOG_PROJECT_KEY` + `POSTHOG_HOST`, `GTM_CONTAINER_ID`, **Meta Pixel ID**. These gate ALL live destination verification (Tier 2, Tier 3 #13-20, Tier 4 live, Tier 6 #36-37). Config blocks in `site/index.html` + `site/thank-you.html` are empty (safe no-op) until pasted.
- [ ] Domain DNS not yet configured (Tier 1 #1)
- [ ] Stripe live mode + `/thank-you` redirect requires founder action (Tier 1 #4-5)
- [ ] PR #17 (scroll_depth + s2_tea_selected) awaiting founder approval before merge (merge = production deploy)
- [ ] EXP-001 ad spend gated on founder budget approval (`[FA]` values in campaign schema + budget-guardrails)

## Event bridge — installed, awaiting credentials

The client-side event bridge is wired up on the live homepage and on
`/thank-you`. It currently no-ops on missing destinations and always
pushes events to `window.dataLayer` + the `varitea:track` CustomEvent.

**Founder-supplied values still needed** (paste into the
`window.VARITEA_CONFIG` block in `site/index.html` AND
`site/thank-you.html` — the two files must stay in sync):

| Key | What | Where to get it |
|---|---|---|
| `GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | GA4 Admin → Data Streams → Web |
| `GTM_CONTAINER_ID` | `GTM-XXXXXXX` (optional) | GTM → Container Settings |
| `POSTHOG_PROJECT_KEY` | `phc_…` public project API key | PostHog → Project Settings → Project API key |
| `POSTHOG_HOST` | `https://us.i.posthog.com` or `https://eu.i.posthog.com` | PostHog region |

**Stripe Payment Link configuration still needed:**

1. In the Stripe Dashboard → Payment Links → the live link → **after payment**, set redirect URL to:
   `https://drinkvaritea.com/thank-you?session_id={CHECKOUT_SESSION_ID}`
   (Stripe interpolates `{CHECKOUT_SESSION_ID}` automatically.)
2. Confirm `client_reference_id` and `utm_*` are visible in the Stripe Dashboard for completed sessions — the tracker appends these to the Payment Link href at click time.

**P1 server-side follow-ups (out of scope for this P0 PR):**

- Stripe webhook → server endpoint to fire `purchase_completed` with real `revenue`, `currency`, line items, and `utm_*` from `client_reference_id` lookup. Client-side `purchase_completed` is best-effort only (ad blockers, refreshes, deep links can drop it).
- Klaviyo + Meta CAPI server-side mirrors for `purchase_completed` and `email_capture_submit`.

## How to verify the bridge

1. Visit `https://drinkvaritea.com/?utm_source=test&utm_campaign=qa` in an incognito window.
2. In DevTools Console: `window.varitea.context()` → should show `utm_source: "test"`, `anonymous_id`, `session_id`.
3. `window.dataLayer` should contain a `page_view` event with utm fields.
4. Click "Tap to begin" → `hero_cta_click` appears in `window.dataLayer`.
5. Click "Get yours" → href is rewritten to include `utm_*` + `client_reference_id` before navigation; `checkout_cta_click` and `stripe_checkout_started` both appear in `window.dataLayer`.
6. Once GA4 / PostHog keys are pasted in, the same events should show in GA4 DebugView and PostHog Live Events.
