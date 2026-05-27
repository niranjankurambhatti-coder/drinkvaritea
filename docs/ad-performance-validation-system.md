# Ad Performance Validation System

Goal: validate Drink Varitea through ad performance, not opinions.

Use paid campaigns as PMF probes. Every ad must answer one question about customer demand, not just “does this creative work?”

## Core principle

Do not optimize for broad traffic. Optimize for validated buyer intent.

```text
Ad angle
  -> Landing page promise
  -> CTA click
  -> Checkout start
  -> Purchase
  -> Email capture
  -> Review / objection
  -> Next campaign decision
```

## Validation hierarchy

Do not judge early campaigns only by purchase volume. Judge the funnel step-by-step.

| Stage | Metric | What it validates |
|---|---|---|
| Ad impression | CTR | The desire/angle is interesting |
| Click | CPC | The market can be reached affordably |
| Landing page | Time on page / scroll / quiz start | The promise matches the visitor's intent |
| CTA | Checkout CTA click | The offer is clear enough to consider buying |
| Checkout | Payment attempt / purchase | Price, trust, and friction are acceptable |
| Post-purchase | Review / repeat interest | The product experience can compound |

## PMF questions to test

### Question 1: Is choice overload the buying wedge?

Hypothesis:

People do not want to browse 100 teas. They want someone to make the first choice easy.

Ad angle:

```text
Tea stores have too many choices.
Start with 3 beginner-friendly teas.
```

Landing promise:

```text
The First Sip Box: three curated teas for people who do not know where to start.
```

Primary metric:

- Checkout CTA click rate

Secondary metrics:

- Email capture
- Purchase
- Cost per checkout click

### Question 2: Is coffee replacement the buying wedge?

Hypothesis:

Coffee drinkers want a better daily drink but do not know which tea to start with.

Ad angle:

```text
Coffee making you jittery?
Try a better afternoon ritual.
```

Landing promise:

```text
Three teas for energy, comfort, and caffeine-free evenings.
```

Primary metric:

- Checkout CTA click rate

Secondary metrics:

- CPC
- Email capture
- Purchase

### Question 3: Is gifting the buying wedge?

Hypothesis:

Tea discovery is easier to sell as a gift than as a self-purchase.

Ad angle:

```text
A tea gift that does not feel random.
```

Landing promise:

```text
Gift a simple tea discovery box built for beginners.
```

Primary metric:

- Purchase conversion rate

Secondary metrics:

- AOV
- Checkout CTA click
- Add gift edition interest

### Question 4: Is customization the buying wedge?

Hypothesis:

Personalized tea selection creates higher interest than a fixed starter box.

Ad angle:

```text
Build your tea by flavor, caffeine, and mood.
```

Landing promise:

```text
Take the 60-second taste quiz and reserve your First Sip Box.
```

Primary metric:

- Quiz start / email capture rate

Secondary metrics:

- Builder/customization interest
- Purchase

## Campaign structure

Use one campaign per PMF question.

```text
Campaign: PMF - Choice Overload
  Ad Set A: Tea curious
  Ad Set B: Gift shoppers
  Ad Set C: Coffee alternative
  Creative 1: Founder video
  Creative 2: Product mockup
  Creative 3: Problem/solution text
```

Do not mix multiple messages in one campaign. If the ad angle wins, the reason should be obvious.

## First campaigns

### Meta / Instagram

Use for:

- Desire testing
- Visual hooks
- Founder-led content
- Retargeting later

Start with:

- Reels-style creative
- Founder story
- Simple product mockup
- Strong first 2 seconds

Do not start with:

- Polished brand ads
- Generic lifestyle stock imagery
- Vague “premium tea” messaging

### Google Search

Use for:

- High-intent keyword testing
- Offer wording
- CPC reality check

Initial keyword groups:

- beginner tea box
- loose leaf tea sampler
- tea gift box
- coffee alternative tea
- herbal tea sampler
- custom tea blend
- tea sampler gift

Do not use broad match until exact/phrase tests produce signal.

## Required tracking before spend

Minimum required:

- GA4 installed
- Google Tag Manager installed
- Meta Pixel installed if running Meta ads
- Google Ads conversion tracking installed if running search ads
- PostHog installed or event capture equivalent
- Stripe live checkout link
- Success/thank-you path or Stripe payment event tracking
- UTM convention

Required events:

| Event | Required properties |
|---|---|
| page_view | source, medium, campaign, content, path |
| hero_cta_click | source, campaign, selected_bundle |
| quiz_cta_click | source, campaign |
| email_capture_submit | source, campaign, form_location |
| checkout_cta_click | source, campaign, selected_bundle |
| purchase_completed | source, campaign, order_value, product |

## UTM convention

Format:

```text
utm_source=[platform]
utm_medium=[paid_social|paid_search|organic_social|reddit|email]
utm_campaign=[pmf_question]
utm_content=[creative_id]
utm_term=[keyword_or_audience]
```

Example:

```text
?utm_source=instagram&utm_medium=paid_social&utm_campaign=pmf_choice_overload&utm_content=reel_founder_001&utm_term=tea_curious
```

## Daily campaign review

Every day, the Paid Growth Agent should answer:

1. Which PMF question got the strongest signal?
2. Which ad angle had the best CTR?
3. Which audience had the cheapest qualified click?
4. Which landing-page CTA got clicked?
5. Did checkout clicks become purchases?
6. What objection or friction appeared?
7. What should be killed, iterated, or scaled?

## Decision rules

### Kill

Kill if:

- CTR is weak across multiple creatives
- CPC is too high for the offer
- Visitors bounce without CTA clicks
- The angle attracts curiosity but not buying intent

### Iterate

Iterate if:

- CTR is good but landing page engagement is weak
- CTA clicks happen but no checkout starts
- Email capture happens but purchase does not
- Comments reveal a clearer objection

### Scale cautiously

Scale only if:

- CTR is strong
- CPC is acceptable
- Checkout CTA clicks happen
- At least one purchase or strong email capture signal exists
- The economics can work after COGS, shipping, Stripe fees, and returns

## First paid validation backlog

| Priority | Campaign | PMF question | Channel | Primary KPI |
|---|---|---|---|---|
| P0 | Choice Overload | Do people pay to avoid tea confusion? | Meta + Google Search | Checkout CTA click |
| P0 | Coffee Alternative | Do coffee drinkers want a starter tea box? | Meta + Search | Checkout CTA click |
| P1 | Giftable Tea Box | Is gifting the fastest wedge? | Meta | Purchase |
| P1 | Custom Tea Quiz | Does customization create intent? | Meta | Email capture |
| P2 | Iced Tea Starter | Is cold/iced format more clickable? | Meta + Search | CPC + CTA click |

## Reporting format

Use this format for every ad review:

```text
Decision:

Best signal:

Worst signal:

Numbers:
- Spend:
- Impressions:
- CTR:
- CPC:
- Landing page visits:
- CTA clicks:
- Email captures:
- Purchases:
- CAC:

Interpretation:

Next action:

Handoff:
```

## Rule

Ad performance is the validation layer. Brand, SEO, UI, social, and product decisions should all adapt to what the ads prove.

