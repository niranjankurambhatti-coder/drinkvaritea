# UTM Builder & Convention

All traffic sent to Drink Varitea must use this UTM convention. No exceptions. Inconsistent UTMs break attribution.

## Standard UTM structure

```
https://drinkvaritea.com/[landing-page]?
  utm_source=[platform]
  &utm_medium=[medium]
  &utm_campaign=[pmf_question_slug]
  &utm_content=[creative_id]
  &utm_term=[keyword_or_audience]
```

## Parameter definitions

| Parameter | Required | Values | Notes |
|---|---|---|---|
| `utm_source` | ✅ | `instagram`, `facebook`, `google`, `reddit`, `email`, `youtube`, `influencer`, `tiktok` | Lowercase, no spaces |
| `utm_medium` | ✅ | `paid_social`, `paid_search`, `organic_social`, `organic_search`, `email`, `referral`, `creator` | Lowercase, no spaces |
| `utm_campaign` | ✅ | See campaign slugs below | Maps to PMF question |
| `utm_content` | ✅ | See content ID format below | Identifies specific ad/creative |
| `utm_term` | Paid search only | Keyword or audience segment | Use `+` for spaces in keywords |

## Campaign slugs (PMF questions)

| Campaign | utm_campaign value |
|---|---|
| Choice Overload | `pmf_choice_overload` |
| Coffee Alternative | `pmf_coffee_alt` |
| Giftable Tea Box | `pmf_gift` |
| Custom Tea Builder / Quiz | `pmf_custom_quiz` |
| Iced Tea Starter | `pmf_iced_tea` |
| Flavor Discovery | `pmf_flavor_discovery` |
| Premium Starter Box | `pmf_premium_starter` |
| Founder Launch Organic | `organic_founder_launch` |
| Email Welcome Flow | `email_welcome` |
| Abandoned Cart Recovery | `email_abandon_cart` |
| Post-Purchase | `email_post_purchase` |

## Content ID format

```
[channel_short]_[format]_[variant]_[version]
```

Examples:
- `ig_reel_founder_001` — Instagram Reel, founder video, version 1
- `ig_static_productmock_002` — Instagram static image, product mockup, v2
- `fb_carousel_3teas_001` — Facebook carousel, 3 teas angle, v1
- `gs_text_beginnerbox_001` — Google Search text ad, beginner box angle, v1
- `yt_preroll_coffeereplace_001` — YouTube pre-roll, coffee replacement
- `email_hero_launchannounce_001` — Email hero image, launch announcement

---

## Generated UTM Examples

### Meta Prospecting — Choice Overload

```
https://drinkvaritea.com/?utm_source=instagram&utm_medium=paid_social&utm_campaign=pmf_choice_overload&utm_content=ig_reel_founder_001&utm_term=tea_curious_broad
```

### Meta Prospecting — Coffee Alternative

```
https://drinkvaritea.com/coffee-alternative?utm_source=instagram&utm_medium=paid_social&utm_campaign=pmf_coffee_alt&utm_content=ig_reel_coffeejitter_001&utm_term=coffee_drinkers_25_44
```

### Meta Retargeting — Checkout Abandonment

```
https://drinkvaritea.com/?utm_source=facebook&utm_medium=paid_social&utm_campaign=pmf_choice_overload&utm_content=fb_static_retarget_cart_001&utm_term=checkout_abandoners_7d
```

### Google Search — Exact Match: "beginner tea box"

```
https://drinkvaritea.com/?utm_source=google&utm_medium=paid_search&utm_campaign=pmf_choice_overload&utm_content=gs_text_beginnerbox_001&utm_term=beginner+tea+box
```

### Google Search — Phrase Match: coffee alternative tea

```
https://drinkvaritea.com/coffee-alternative?utm_source=google&utm_medium=paid_search&utm_campaign=pmf_coffee_alt&utm_content=gs_text_coffeealt_001&utm_term=coffee+alternative+tea
```

### Instagram Organic

```
https://drinkvaritea.com/?utm_source=instagram&utm_medium=organic_social&utm_campaign=organic_founder_launch&utm_content=ig_reel_founder_001
```

### Reddit Organic

```
https://drinkvaritea.com/?utm_source=reddit&utm_medium=organic_social&utm_campaign=organic_founder_launch&utm_content=reddit_post_rtea_001
```

### Influencer / Creator Link

```
https://drinkvaritea.com/?utm_source=influencer&utm_medium=creator&utm_campaign=pmf_flavor_discovery&utm_content=creator_[creator_handle]_001
```

### Email Launch Announcement

```
https://drinkvaritea.com/?utm_source=email&utm_medium=email&utm_campaign=email_welcome&utm_content=email_hero_launchannounce_001
```

---

## Implementation checklist

- [ ] All landing page links in ads use these parameters exactly
- [ ] UTM spreadsheet/generator maintained for team use (link to Sheet)
- [ ] UTMs appended automatically to Klaviyo email links
- [ ] UTMs visible in GA4 → Acquisition → Traffic acquisition report
- [ ] UTMs stored in Stripe checkout metadata
- [ ] UTMs stored in Klaviyo profile on email capture
- [ ] No manually typed UTMs — all links generated from this doc or a Google Sheets formula

## Google Sheets UTM generator formula

In a sheet with columns: base_url | source | medium | campaign | content | term

```
=A2&"?utm_source="&B2&"&utm_medium="&C2&"&utm_campaign="&D2&"&utm_content="&E2&IF(F2<>"","&utm_term="&F2,"")
```
