# Drink Varitea — Paid Growth Infrastructure

> **Rule:** Do not run ads until every item in `/growth/tracking-readiness-checklist.md` is checked off.

Ads are not just acquisition. Ads are structured PMF probes that test personas, desires, copy, creative assets, landing pages, offers, keywords, and checkout intent.

## The only metric that matters right now

**Ad spend → order placed.** Every system in this folder exists to improve that ratio.

## Folder index

| File | Purpose |
|---|---|
| `tracking-readiness-checklist.md` | Gate: nothing ships until this is green |
| `event-taxonomy.md` | Complete event schema with destinations + validation |
| `utm-builder.md` | Strict UTM convention + generated examples |
| `campaign-experiment-schema.json` | Structured data model for every experiment |
| `campaign-library.md` | First 7 PMF campaigns, fully specced |
| `one-click-campaign-workflow.md` | Near-one-click campaign setup system |
| `landing-page-map.md` | Ad angle → landing page mapping + copy delta |
| `asset-requirements.md` | What Brand/Social agents must produce before launch |
| `budget-guardrails.md` | Conservative test budgets, kill/scale rules |
| `reporting-template.md` | Daily and weekly review templates |
| `keyword-copy-research-plan.md` | Research plan for keywords, copy, and intent |

## Decision

Build tracking infrastructure first. Campaign assets and copy in parallel. Zero ad spend until tracking gate is green.

## North star funnel

```
Impression → Click → Landing page → CTA click → Checkout start → Purchase
```

Each step is independently measured and optimized.

## Agent handoffs

- **Web App Agent:** Install GA4, GTM, Meta Pixel, PostHog, purchase event. Wire UTMs into checkout metadata.
- **Brand Agent:** Produce all assets per `/growth/asset-requirements.md`.
- **SEO Agent:** Keyword research, landing page copy, intent mapping.
- **Social Agent:** Organic versions of all ad hooks, Reel scripts, captions.
- **Ecommerce Ops Agent:** Live checkout link, Stripe purchase event, product SKUs.
- **Finance Agent:** Set real CAC thresholds, margin, AOV model.
- **Founder:** Approve budgets, kill/scale decisions, asset sign-off.
