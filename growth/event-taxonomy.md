# Event Taxonomy

Complete event schema for all Drink Varitea tracking. Every event must fire consistently across all destinations.

## Destinations legend

| Abbreviation | Platform |
|---|---|
| GA4 | Google Analytics 4 |
| GTM | Google Tag Manager (routes to GA4, Meta, Google Ads) |
| META | Meta Pixel / Conversions API |
| GADS | Google Ads conversion tag |
| PH | PostHog |
| KL | Klaviyo |
| STRIPE | Stripe metadata |

---

## Events

### `page_view`

| Field | Value |
|---|---|
| Trigger | Every page load, including Stripe redirect pages |
| Required properties | `page_type` (landing/quiz/checkout/success), `path`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` |
| Destinations | GA4, GTM, META (PageView), PH |
| Validation | GA4 DebugView shows event on every navigation. PostHog Live Events tab. Meta Pixel Helper shows PageView. |

---

### `hero_cta_click`

| Field | Value |
|---|---|
| Trigger | Click on primary hero section CTA button ("Get the First Sip Box", "Start the Quiz", etc.) |
| Required properties | `utm_source`, `utm_campaign`, `cta_label`, `selected_bundle`, `page_variant` |
| Destinations | GA4, GTM, META (ViewContent), PH |
| Validation | Click button in GTM preview; confirm tag fires. PostHog funnel shows step 1. |

---

### `quiz_cta_click`

| Field | Value |
|---|---|
| Trigger | Click on any quiz entry CTA ("Take the 60-second quiz", "Find my tea") |
| Required properties | `utm_source`, `utm_campaign`, `entry_point` (hero/nav/scroll/exit) |
| Destinations | GA4, GTM, META, PH |
| Validation | GTM preview; PostHog funnel. |

---

### `quiz_step_completed`

| Field | Value |
|---|---|
| Trigger | User advances past each quiz question |
| Required properties | `step_number`, `step_name`, `selected_value`, `utm_campaign` |
| Destinations | GA4, PH |
| Validation | PostHog funnel — drop-off rate per step visible. |

---

### `bundle_option_change`

| Field | Value |
|---|---|
| Trigger | User selects or changes a bundle option (Hot/Iced, size, variant) |
| Required properties | `option_type`, `option_value_from`, `option_value_to`, `utm_campaign` |
| Destinations | GA4, PH |
| Validation | PostHog session recordings show interaction. GA4 event explorer. |

---

### `scroll_depth`

| Field | Value |
|---|---|
| Trigger | Landing-page scroll progress crosses each of 25/50/75/100%. Fires each threshold **exactly once per session** (deduped). Owned by the inline scroll module in `site/index.html`, fired through `window.varitea.reportScroll()` so it carries full utm/context. |
| Required properties | `depth_pct` (25/50/75/100), `max_section_reached` (`s1`-`s4`), `page_variant`, plus inherited `utm_*` context |
| Destinations | GA4, GTM, PH |
| Validation | GA4 DebugView shows up to 4 `scroll_depth` events per session, no duplicates. PostHog Live Events shows `depth_pct` ladder. Re-scrolling does not re-fire. |
| Implementation note | EXP-001 micro-journey event. Thresholds `[25,50,75,100]`; `max_section_reached` is the furthest scroll-snap screen reached (`s1`-`s4`), monotonic within a session. |

---

### `s2_tea_selected`

| Field | Value |
|---|---|
| Trigger | User selects a tea in the Screen-2 discovery experience (`/preview/s2-v2/?embed=1`, embedded as an iframe). Selection = navigation to a new lane (arrow / swipe / dot / keyboard) OR a deliberate tap on the already-active pouch. The iframe `postMessage`s up to the parent, which re-emits via `window.varitea.track()`. |
| Required properties | `tea_name` (Jared's FINAL names: `Bold Black` / `Floral Herbal` / `Smooth Green`), `lane_index` (0-2), `interaction` (`arrow`/`swipe`/`dot`/`tap`), `page_variant`, plus inherited `utm_*` context |
| Destinations | GA4, GTM, PH |
| Validation | Select each lane; GA4/PostHog show `s2_tea_selected` with matching `tea_name`/`lane_index`. `tea_name` must match the ad creatives and box exactly (title case). Standalone preview (no `?embed=1`) does NOT fire. |
| Implementation note | EXP-001 micro-journey event. `TEA_NAME_BY_INDEX` in the s2-v2 page is the single source of truth mapping `lane_index` → display name. Tap-on-active is debounced 600ms to avoid double-counting. |

---

### `checkout_cta_click`

| Field | Value |
|---|---|
| Trigger | Click on the final checkout/order button that initiates Stripe redirect |
| Required properties | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `selected_bundle`, `offer_price`, `page_variant` |
| Destinations | GA4, GTM, META (InitiateCheckout), GADS (conversion), PH |
| Validation | Most critical event. Validate in GA4 real-time, Meta Events Manager, Google Ads conversion tag via GTM preview. |

---

### `email_capture_submit`

| Field | Value |
|---|---|
| Trigger | Successful email form submission (hero, exit intent, quiz result, footer) |
| Required properties | `utm_source`, `utm_campaign`, `form_location`, `offer_label`, `quiz_result` (if from quiz) |
| Destinations | GA4, GTM, META (Lead), PH, KL |
| Validation | Check Klaviyo for new profile. PostHog person property `email` set. GA4 event count. |

---

### `stripe_checkout_started`

| Field | Value |
|---|---|
| Trigger | User lands on Stripe checkout URL (redirect or embedded) |
| Required properties | `utm_source`, `utm_campaign`, `utm_content`, `cart_value`, `product_id` |
| Destinations | GA4, GTM, META, PH, STRIPE (metadata) |
| Validation | Stripe dashboard: checkout session metadata shows UTM params. GA4 event. |
| Implementation note | Pass UTM params as Stripe checkout session metadata via query string or server-side. |

---

### `purchase_completed`

| Field | Value |
|---|---|
| Trigger | Stripe `payment_intent.succeeded` webhook OR Stripe success URL load |
| Required properties | `order_id`, `revenue`, `product_id`, `product_name`, `utm_source`, `utm_campaign`, `utm_content`, `utm_term`, `discount_code` (if used), `is_gift` |
| Destinations | GA4 (Purchase event with revenue), GTM, META (Purchase with value + currency), GADS (conversion with value), PH, KL, STRIPE |
| Validation | Most important event. Run a real $1 test purchase. Validate: GA4 shows purchase revenue, Meta Events Manager shows Purchase event, Google Ads shows conversion, PostHog shows purchase property. |

---

### `customer_added_to_list`

| Field | Value |
|---|---|
| Trigger | Klaviyo list membership event (post-purchase auto-enrollment or opt-in) |
| Required properties | `list_id`, `list_name`, `source` (purchase/email_capture/quiz), `utm_campaign` |
| Destinations | KL, PH |
| Validation | Klaviyo activity feed for test email. |

---

### `review_requested`

| Field | Value |
|---|---|
| Trigger | Post-purchase Klaviyo email sent (T+3 days) |
| Required properties | `order_id`, `product_id`, `days_since_purchase` |
| Destinations | KL, PH |
| Validation | Klaviyo flow activity shows sent event. |

---

### `review_submitted`

| Field | Value |
|---|---|
| Trigger | User submits a review via review widget or form |
| Required properties | `order_id`, `product_id`, `rating`, `has_text`, `utm_source` (if from review request email) |
| Destinations | GA4, PH, KL |
| Validation | PostHog event appears. GA4 event count. |

---

## Event firing priority

| Priority | Event | Why |
|---|---|---|
| P0 | `purchase_completed` | Revenue attribution |
| P0 | `checkout_cta_click` | Primary conversion signal |
| P0 | `page_view` | Channel attribution |
| P1 | `email_capture_submit` | Top-of-funnel lead |
| P1 | `stripe_checkout_started` | Funnel drop-off diagnosis |
| P2 | `hero_cta_click` | Engagement signal |
| P2 | `quiz_cta_click` | Intent signal |
| P3 | `bundle_option_change` | Product preference signal |
| P3 | `quiz_step_completed` | Funnel optimization |
| P3 | `s2_tea_selected` | Discovery/customization engagement signal (EXP-001 micro-journey) |
| P3 | `scroll_depth` | Landing-page engagement / drop-off depth (EXP-001 micro-journey) |
| P4 | `review_submitted` | Social proof signal |
