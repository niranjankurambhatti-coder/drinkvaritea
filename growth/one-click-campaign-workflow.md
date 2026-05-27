# One-Click Campaign Setup Workflow

A near-one-click system for launching a new PMF experiment. Each campaign setup should take < 30 minutes once tracking is live.

## Step 0 — Trigger

A new campaign is needed when:
- A new PMF question needs testing
- An existing campaign is killed and a successor is ready
- A creative variant test is needed for a running campaign
- A new landing page variant is live

## Step 1 — Fill the experiment brief (5 min)

Copy this template into `/experiments/EXP-[NNN]-[slug].json` and fill every field:

```json
{
  "experiment_id": "EXP-001",
  "campaign_name": "",
  "pmf_question": "",
  "persona": "",
  "pain_point": "",
  "desire": "",
  "offer": "First Sip Box — $19",
  "channel": "",
  "keyword_cluster": [],
  "audience": "",
  "creative_angle": "",
  "copy_variant": "A",
  "creative_asset_id": "",
  "landing_page": "/",
  "utm_string": "",
  "cta_label": "Get the First Sip Box",
  "budget_daily_usd": null,
  "budget_total_usd": null,
  "primary_kpi": "",
  "guardrail_metric": "",
  "kill_rule": "",
  "scale_rule": "",
  "start_date": "",
  "end_date": "",
  "decision_rule": "Review after 3 days or $[budget] spend, whichever comes first",
  "status": "planned"
}
```

## Step 2 — Generate outputs (auto, 5 min)

From the filled brief, the following are generated or assembled:

### 2a. Campaign brief (Markdown)

```
# [campaign_name] — Campaign Brief
PMF Question: [pmf_question]
Persona: [persona]
Offer: [offer]
Channel: [channel]
Landing Page: [landing_page]
Primary KPI: [primary_kpi]
Budget: $[budget_daily_usd]/day, cap $[budget_total_usd]
Decision rule: [decision_rule]
Kill rule: [kill_rule]
Scale rule: [scale_rule]
```

### 2b. Ad copy variants (fill per campaign from campaign-library.md)

**Variant A — Problem-first**
```
Hook: [ad_hook from campaign library]
Body: [2-3 sentences: problem → solution → proof]
CTA: [cta_label]
```

**Variant B — Desire-first**
```
Hook: [desire statement]
Body: [product benefit → simple how it works → CTA]
CTA: [cta_label]
```

**Variant C — Social proof (once reviews exist)**
```
Hook: [quote or result]
Body: [what they got → what you'll get]
CTA: [cta_label]
```

### 2c. Creative asset checklist

Pull from `/growth/asset-requirements.md` filtered by channel:

- [ ] Reel video (9:16, 15–30s) — `[creative_asset_id]`
- [ ] Static image (1:1, 1080×1080) — `[creative_asset_id]`
- [ ] Carousel frame 1 (1:1) — hook
- [ ] Carousel frame 2 — offer detail
- [ ] Carousel frame 3 — CTA
- [ ] OG image for landing page variant (1200×630)

### 2d. UTM links

Generated from `/growth/utm-builder.md`:

```
Main ad link: https://drinkvaritea.com/[landing_page]?utm_source=[source]&utm_medium=[medium]&utm_campaign=[campaign]&utm_content=[asset_id]&utm_term=[term]
```

Paste into: Meta ad URL, Google Ads final URL, all link-in-bio references.

### 2e. Tracking checklist

Before publishing the campaign:

- [ ] Tracking readiness checklist fully green (`/growth/tracking-readiness-checklist.md`)
- [ ] UTM link tested manually (paste in browser, confirm GA4 real-time shows correct source/campaign)
- [ ] CTA button confirmed working on mobile
- [ ] Landing page loads < 3s
- [ ] Pixel Helper shows correct events on landing page
- [ ] Budget set in platform (daily cap enforced)
- [ ] Conversion goal set in platform (checkout_cta_click OR purchase_completed)

### 2f. Budget guardrails

Pull from `/growth/budget-guardrails.md`:

- Daily cap: $[founder-approved]
- Total cap: $[founder-approved]
- Auto-pause: [guardrail_metric]
- Review trigger: [decision_rule]

### 2g. Reporting template

Create a new row in the daily reporting sheet with:
- experiment_id
- campaign_name
- start_date
- channel
- primary_kpi
- daily_budget
- Link to this brief

### 2h. GitHub issue

Create a GitHub issue titled: `[EXP-NNN] Launch: [campaign_name]`

With body:
```
Experiment: [experiment_id]
PMF question: [pmf_question]
Channel: [channel]
Status: ready_to_launch
Tracking checklist: [link]
Brief: [link to experiments/EXP-NNN-slug.json]
Handoffs needed:
- [ ] Brand Agent: [asset list]
- [ ] Web App Agent: [landing page variant]
- [ ] Ecom Ops Agent: [checkout link]
```

## Step 3 — Agent handoffs

After brief is filled, ping:

| Agent | Handoff |
|---|---|
| Brand Agent | Asset requirements from 2c |
| Web App Agent | Landing page variant URL, event hooks, UTM capture confirmation |
| SEO Agent | Landing page copy brief, keyword list |
| Social Agent | Organic version of ad hooks (same message, no paid CTA) |
| Ecom Ops Agent | Checkout link working for this offer |
| Finance Agent | Budget sign-off needed before launch |
| Founder | Approve budget, approve creative before go-live |

## Step 4 — Launch gate (founder approval required)

- [ ] Founder has seen creative
- [ ] Founder has approved budget
- [ ] All tracking checks green
- [ ] Asset in platform
- [ ] UTM link set in ad
- [ ] Campaign set to paused (not live) — **founder presses go**

## Step 5 — Daily review

Run `/growth/reporting-template.md` daily. First review after 24 hours of spend.

## Step 6 — Kill / Iterate / Scale

Document decision in `experiments/EXP-[NNN]-[slug].json` under `result` and `learning`. Link `next_experiment_id`.
