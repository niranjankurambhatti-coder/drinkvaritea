# Measurement Architecture

## North star

Profitable repeat purchase from taste-first tea discovery.

## Funnel

```text
Impression
  -> Click
  -> Landing page view
  -> Quiz start
  -> Quiz complete
  -> Email capture
  -> Product recommendation view
  -> Add to cart
  -> Checkout start
  -> Purchase
  -> Review
  -> Repeat purchase
  -> Referral
```

## Core events

| Event | Required properties |
|---|---|
| page_view | page_type, path, source, campaign |
| quiz_started | entry_point, persona_hint |
| quiz_step_completed | step_name, selected_value |
| quiz_completed | caffeine, flavor_notes, brew_style, recommended_product |
| email_captured | source, offer, quiz_result |
| product_viewed | product_id, category, tea_type |
| bundle_viewed | bundle_id, bundle_type |
| builder_started | entry_point |
| builder_option_selected | option_type, option_value |
| builder_completed | base, notes, caffeine, package_type |
| add_to_cart | product_id, price, category, source |
| checkout_started | cart_value, item_count |
| purchase_completed | order_id, revenue, margin_estimate, discount_code |
| reward_enrolled | source |
| review_submitted | product_id, rating |
| referral_started | source |

## Daily KPI pulse

Track:

- Sessions
- Conversion rate
- Revenue
- Orders
- AOV
- Add-to-cart rate
- Checkout conversion
- Email capture rate
- CAC
- ROAS
- Gross margin estimate
- Top landing pages
- Top products
- Failed experiments

## CPC optimization loop

```text
SEMrush keywords
  -> Google Ads test
  -> Landing page variant
  -> GA4/PostHog event data
  -> Shopify/Stripe revenue
  -> Margin-adjusted ROAS
  -> Scale/iterate/kill decision
```

## Decision rules

- Kill ads if CPC rises without add-to-cart signal.
- Iterate landing page if CTR is strong but conversion is weak.
- Improve offer if add-to-cart is weak across multiple audiences.
- Improve checkout if checkout starts are strong but purchase is weak.
- Scale only after margin-adjusted ROAS supports the spend.

