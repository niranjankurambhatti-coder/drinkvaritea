# Social Automation

## Recommendation

Start with Postiz if the priority is agentic automation, open-source flexibility, and direct integration with AI workflows. Use Metricool if the priority is analytics/reporting. Use Buffer if the priority is maximum reliability and simple scheduling.

## Initial decision

Recommended starting stack:

- Postiz for agentic scheduling and automation experiments
- Native platform analytics plus YouTube Analytics
- GA4/PostHog for downstream site behavior
- HubSpot for creator/partner CRM

## Guardrails

- Do not enable auto-like or auto-comment loops until platform-policy risk is reviewed.
- Use human approval for all public posts during the first 30 days.
- Track every social post with UTM parameters.
- Never post unverified health claims.
- Maintain a content asset library in Drive.

## Content workflow

```text
Market/SEO insight
  -> Content Factory Agent
  -> Draft hook/script/caption
  -> Founder approval
  -> Schedule in Postiz or chosen scheduler
  -> Publish
  -> Pull performance
  -> Repurpose winners
```

## Core content pillars

- Tea as coffee replacement
- Iced tea and cold brew
- Custom tea blend experience
- Flavor discovery
- Tea gifts
- Brew guides
- Behind-the-scenes package building
- Taste tests
- Rewards and drops

## Social post data model

| Field | Description |
|---|---|
| Post ID | Unique internal ID |
| Platform | TikTok, Instagram, YouTube Shorts, Pinterest, X, LinkedIn |
| Persona | Gifter, Coffee Refugee, Variety Seeker, etc. |
| Hook | First 1–2 seconds or first sentence |
| Asset | Video/image/file link |
| CTA | Click, comment, save, quiz, shop, email capture |
| Product tie-in | Product, bundle, quiz, or category |
| UTM | Campaign tracking |
| Status | Draft, approved, scheduled, published, repurposed |
| Metrics | Views, watch time, CTR, saves, comments, site sessions, conversion |

