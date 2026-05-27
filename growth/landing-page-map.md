# Landing Page Map

Every ad angle maps to a specific landing page or page variant. Copy deltas are defined here so Web App and SEO agents know exactly what must change per variant.

## Master page: `/` (First Sip Box — Default)

This is the universal fallback. All untargeted organic traffic lands here.

| Section | Default copy |
|---|---|
| Hero headline | Taste-first tea discovery |
| Hero subhead | The First Sip Box: 3 beginner-friendly teas. No guessing. |
| CTA | Get the First Sip Box — $19 |
| Social proof slot | Placeholder until first review exists |
| Product detail | Three curated teas: energizing, cozy, caffeine-free |
| Trust line | Founder launch. No subscription required. |

---

## Variant 1: `/` with `utm_campaign=pmf_choice_overload`

**Audience:** People overwhelmed by tea options

| Section | Delta copy |
|---|---|
| Hero headline | Tea stores have too many choices. |
| Hero subhead | We made it easy. Start with 3. |
| CTA | Start with 3 Teas — $19 |
| Body emphasis | "You don't need to know anything about tea to order." |

_Implementation: GTM or JavaScript can swap hero copy based on UTM parameter. No separate URL needed at MVP — UTM-based copy swap is sufficient._

---

## Variant 2: `/coffee-alternative`

**Audience:** Coffee refugees / caffeine optimizers

| Section | Delta copy |
|---|---|
| Hero headline | A better afternoon ritual than coffee. |
| Hero subhead | Three teas for energy, calm, and caffeine-free evenings. No jitters. |
| CTA | Try the Coffee Switcher Box — $19 |
| Body emphasis | Caffeine comparison: where each tea lands vs coffee |
| FAQ add | "How much caffeine does this have compared to coffee?" |
| Trust line | Recommended for coffee drinkers switching to tea |

_SEO target: "coffee alternative tea", "switch from coffee to tea"_

---

## Variant 3: `/gift`

**Audience:** Gifters

| Section | Delta copy |
|---|---|
| Hero headline | A tea gift that doesn't feel random. |
| Hero subhead | Curated, beautiful, beginner-friendly. Ships in 2 days. |
| CTA | Gift the First Sip Box — $19 |
| Body emphasis | "Perfect for: mom, coworkers, housewarming, Secret Santa" |
| Urgency add | "Order by [date] for [occasion] delivery" |
| Gift messaging option | Custom gift note at checkout |

_SEO target: "tea gift box", "tea gift for mom", "tea gift for coworkers"_

---

## Variant 4: `/quiz` (or `/start`)

**Audience:** Variety seekers, wellness optimizers — quiz/customizer interest

| Section | Delta copy |
|---|---|
| Hero headline | Find your first favorite tea. |
| Hero subhead | 60-second taste quiz → personalized First Sip Box. |
| CTA | Start the Taste Quiz |
| Body emphasis | Quiz step UI (question 1, 2, 3 → email capture → recommendation) |
| Pre-quiz line | "No tea knowledge required." |

_Primary conversion: email capture. Secondary: purchase from recommendation._

---

## Variant 5: `/iced-tea`

**Audience:** Iced tea explorers, summer buyers

| Section | Delta copy |
|---|---|
| Hero headline | Better iced tea starts here. |
| Hero subhead | Cold brew loose leaf in 5 minutes. No fancy equipment. |
| CTA | Get the Iced Tea Starter — $19 |
| Body emphasis | Cold brew how-to visual (3 steps), flavor options |
| Product callout | Which teas are included and why they cold brew well |
| Lifestyle visual | Glass of iced tea, summer aesthetics |

_SEO target: "iced tea starter kit", "cold brew tea at home", "best iced tea loose leaf"_

---

## Variant 6: Future SEO category pages

To be built post-PMF validation when organic traffic is scaled:

| Page | Target keyword cluster |
|---|---|
| `/collections/herbal-tea` | herbal tea sampler, caffeine-free tea, herbal tea starter |
| `/collections/black-tea` | best black tea, black tea for coffee drinkers, strong loose leaf tea |
| `/collections/green-tea` | green tea sampler, loose leaf green tea, beginner green tea |
| `/collections/gift-sets` | tea gift set, tea gift box, gourmet tea gift |
| `/blog/tea-for-beginners` | tea for beginners, how to start drinking tea |
| `/blog/coffee-alternative` | coffee alternative drinks, best tea to replace coffee |

---

## Copy delta summary

| Variant | Headline changes | CTA changes | Body adds | SEO intent |
|---|---|---|---|---|
| Default `/` | No | No | No | Brand awareness |
| Choice Overload | Yes | Yes | Reassurance copy | Beginner queries |
| Coffee Alt `/coffee-alternative` | Yes | Yes | Caffeine comparison | Coffee switcher intent |
| Gift `/gift` | Yes | Yes | Gift occasion + delivery | Gift shopping intent |
| Quiz `/quiz` | Yes | Yes | Quiz UI embed | Personalization interest |
| Iced Tea `/iced-tea` | Yes | Yes | Cold brew visual how-to | Summer / iced intent |
