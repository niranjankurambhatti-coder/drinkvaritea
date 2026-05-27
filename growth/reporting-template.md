# Reporting Templates

Use these templates every day and every week. Consistent format enables comparison across experiments.

---

## Daily Ad Review Template

_Fill out every morning. Copy into Notion experiment log or GitHub issue comment._

```
=== DAILY AD REVIEW ===
Date: [YYYY-MM-DD]
Experiment ID: [EXP-NNN]
Campaign: [campaign_name]
Channel: [channel]
Day: [day N of campaign]

--- SPEND & REACH ---
Spend today: $
Spend to date: $
Impressions: 
Reach: 
Frequency: 

--- CLICK PERFORMANCE ---
Clicks: 
CTR: %
CPC: $

--- ON-PAGE BEHAVIOR ---
Landing page visits (GA4): 
Bounce rate (GA4): %
Avg. time on page: 
Scroll depth (PostHog): 
Hero section visible: %

--- FUNNEL EVENTS ---
hero_cta_click: 
quiz_cta_click: 
bundle_option_change: 
checkout_cta_click: 
email_capture_submit: 
stripe_checkout_started: 
purchase_completed: 

--- CONVERSION MATH ---
CTA click rate (CTA clicks / page visits): %
Checkout start rate (checkout starts / CTA clicks): %
Purchase rate (purchases / checkout starts): %
Email capture rate (email captures / page visits): %

--- REVENUE ---
Purchases: 
Revenue: $
CAC (spend / purchases): $
ROAS (revenue / spend): 

--- SIGNAL ANALYSIS ---
Strongest signal: [what worked]
Weakest signal: [what failed]
Surprise: [anything unexpected]
Ad creative performing best: [creative_id]

--- DECISION ---
[ ] KILL — Reason:
[ ] ITERATE — Change:
[ ] SCALE — By how much:
[ ] CONTINUE — No change needed yet

--- HANDOFFS ---
To Brand Agent:
To Web App Agent:
To SEO Agent:
To Social Agent:
To Ecom Ops Agent:
To Finance Agent:
To Founder (needs approval):

=== END ===
```

---

## Weekly PMF Learning Summary

_Fill out every Sunday evening. Add to Notion PMF learnings log._

```
=== WEEKLY PMF LEARNING SUMMARY ===
Week: [YYYY-WNN]
Date range: [start] to [end]
Experiments active: [EXP-NNN, EXP-NNN]

--- BEST PERFORMING ---
Winning persona: 
Winning pain point: 
Winning offer: 
Winning copy language (exact words that drove clicks): 
Winning creative type (Reel / static / carousel): 
Winning landing page variant: 
Winning channel: 

--- WEAK SIGNALS ---
Persona with weakest response: 
Ad angle that got curiosity but no purchase intent: 
Landing page section with highest drop-off: 
Offer that got engagement but no checkout: 

--- CUSTOMER VOICE ---
Biggest objection seen (comments, DMs, form responses): 
Most common question: 
Any unexpected use case or audience: 

--- PMF SCORECARD ---
Total spend this week: $
Total purchases this week: 
Total email captures this week: 
Blended CAC this week: $
Best experiment ROAS: 
Worst experiment ROAS: 
PMF signal strength (1–5): 
Basis for PMF score: 

--- NEXT WEEK PLAN ---
Experiment to launch: [EXP-NNN]
Experiment to kill: [EXP-NNN]
Experiment to iterate: [EXP-NNN — change: X]
Key question to answer next week: 

--- HANDOFFS ---
To Brand Agent: 
To Web App Agent: 
To SEO Agent: 
To Founder (key decision needed): 

=== END ===
```

---

## Experiment result log (append to experiments/EXP-NNN.json)

When an experiment is completed (killed, scaled, or concluded), update the `result` and `learning` fields:

```json
"result": {
  "spend_usd": 0,
  "impressions": 0,
  "clicks": 0,
  "ctr_pct": 0.0,
  "cpc_usd": 0.0,
  "landing_page_visits": 0,
  "cta_clicks": 0,
  "email_captures": 0,
  "checkout_starts": 0,
  "purchases": 0,
  "revenue_usd": 0.0,
  "cac_usd": 0.0,
  "roas": 0.0
},
"learning": "[One sentence: what this proved or disproved about PMF]",
"next_experiment_id": "EXP-NNN"
```

---

## Dashboard links reference

_Fill in actual URLs once tools are connected._

| Dashboard | URL | What to check daily |
|---|---|---|
| GA4 Real-time | [fill] | Active sessions, events, source/medium |
| GA4 Acquisition | [fill] | Channel performance, UTM breakdown |
| GA4 Events | [fill] | checkout_cta_click, purchase_completed counts |
| PostHog Funnels | [fill] | page_view → hero_cta → checkout_cta → purchase |
| PostHog Live Events | [fill] | Real-time event stream |
| Meta Ads Manager | [fill] | Spend, impressions, CTR, CPC per ad set |
| Meta Events Manager | [fill] | Pixel event health, purchase events |
| Google Ads | [fill] | Search impression share, CPC, conversions |
| Stripe Dashboard | [fill] | Revenue, payment success rate |
| Klaviyo | [fill] | Email captures, list growth, open rates |
| SEMrush | [fill] | Keyword ranking, competitor changes |
