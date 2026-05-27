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
| 13 | Meta Pixel created in Meta Events Manager | ⬜ | Paid Growth Agent | Meta Events Manager |
| 14 | Meta Pixel firing `PageView` on landing page | ⬜ | Paid Growth Agent | Meta Pixel Helper extension |
| 15 | Meta Pixel firing `InitiateCheckout` event | ⬜ | Paid Growth Agent | Meta Events Manager test |
| 16 | Meta Pixel firing `Purchase` event with value | ⬜ | Paid Growth Agent | Meta Events Manager test |
| 17 | Google Ads account created | ⬜ | Paid Growth Agent | Google Ads console |
| 18 | Google Ads conversion action created: `checkout_cta_click` | ⬜ | Paid Growth Agent | Google Ads conversions tab |
| 19 | Google Ads conversion action created: `purchase_completed` | ⬜ | Paid Growth Agent | Google Ads conversions tab |
| 20 | Google Ads tag firing via GTM | ⬜ | Paid Growth Agent | GTM preview mode |

## Tier 4 — Event Tracking (specific events per taxonomy)

| # | Event | Trigger | Destination | Status |
|---|---|---|---|---|
| 21 | `page_view` | All page loads | GA4, PostHog | ⬜ |
| 22 | `hero_cta_click` | Hero section CTA button click | GA4, GTM, Meta, PostHog | ⬜ |
| 23 | `quiz_cta_click` | Quiz entry CTA click | GA4, GTM, Meta, PostHog | ⬜ |
| 24 | `bundle_option_change` | User changes bundle selection | GA4, PostHog | ⬜ |
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

- [ ] Domain DNS not yet configured
- [ ] GTM, Meta Pixel, Google Ads accounts need to be created
- [ ] Stripe live mode requires business verification
- [ ] PostHog project not yet created
