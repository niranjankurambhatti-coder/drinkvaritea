# EXP-001 — Ad Creative Brief · Variant B "Coffee Switch"

> **Owner:** @jared (Brand / UX) · **Produces:** Web App / media agent · **Ships to Meta:** Ronny
> One static creative for EXP-001 (fast, cheap PMF read). Tag Ronny when the asset file is ready for Meta upload.

## Identity
- **Creative id (`utm_content`):** `ig_static_coffeeswitch_b01`
- **Campaign (`utm_campaign`):** `pmf_coffee_alt` → landing swaps to `page_variant=coffee_switch`
- **Audience (Ronny):** Interests: coffee, espresso, productivity — 25–44, US
- **PMF sub-angle:** afternoon-ritual replacement for coffee — "a better 3pm than another coffee"

## The single job
Catch the coffee drinker at the moment of the afternoon cup. Offer a calmer, no-jitter alternative without shaming the coffee habit. Make tea feel like an upgrade, not a sacrifice.

## Visual direction
- **Subject:** One **Bold Black** pouch set beside a just-put-down coffee mug, warm late-afternoon light. The pouch is the hero; the mug is context, slightly out of focus / mid-ground.
- **Composition:** warm side-light, soft shadows, a lived-in desk or kitchen surface — calm, real, not a stock "wellness" flatlay. Pouch front-and-center; top third for the headline.
- **Palette:** warmer end of the system — cream `#F8F2EA`, ink `#2D241E`, amber `#D2AE64` (Bold Black cue). Keep the lavender/sage out of this one; it's the bold-black/coffee story.
- **Finish:** matte pouch. The ONLY allowed gloss is tea liquid — if a brewed cup appears, the liquid surface may catch a soft highlight; everything else stays matte.

## On-image copy
- **Headline (on image):** `Swap the 3pm coffee.`
- **Type:** Instrument Serif (italic) headline; Inter for any small mark. Headline only — short overlay discipline.
- **No price on the image** unless Ronny runs a price test — flag if so.

## Tone
Confident, friendly, no shame about coffee. Talks to a coffee lover as a peer offering a better afternoon — never preachy.

## Must-not (guardrails)
- No health claims (no "coffee is bad for you", no detox/calm-as-cure/sleep/immune language).
- No "quit coffee" moralizing — this is a *swap*, not a lecture.
- No fake "best-seller" / awards / review screenshots / invented testimonials.
- No supplier-copied imagery or claims.

## Specs
- **Primary ratio:** 1080×1350 (4:5 feed). Also export 1080×1920 (9:16 stories/reels), same layout with more vertical air.
- **Filename (per UX asset convention):** `varitea_ad_image_boldblack-coffee-swap_4x5_v01` (and `_9x16_v01`).
- **Asset metadata to log:** source, status, usage rights, funnel stage = paid ad, crop ratios, product-claim risk = none, alt text.

## Asset → Meta handoff
Asset file + this brief → tag Ronny. Ronny attaches `utm_source=facebook/instagram`, `utm_medium=paid_social`, `utm_campaign=pmf_coffee_alt`, `utm_content=ig_static_coffeeswitch_b01` to the destination URL (`https://drinkvaritea.com/?utm_campaign=pmf_coffee_alt&utm_content=ig_static_coffeeswitch_b01&utm_source=...&utm_medium=paid_social`).

## Iterate rule
If CTR strong (>1%) but `hero_cta_click` < 5%, rework hero copy (not this creative). If CTR < 0.3% after 2,000 impressions, retire and bump to `ig_static_coffeeswitch_b02` with a new hook. Keep the A/B history clean.

---

## Formats for this variant (2026-05-28 founder scope)

We only change/manage **ad → landing-page copy**. Variant B ships **2 ad text copies + 2 static images + a video idea**. Each format gets its own `utm_content`; both route to `page_variant=coffee_switch` (same landing hero).

| Format | `utm_content` | Asset | Status |
|---|---|---|---|
| Static image 1 | `ig_static_coffeeswitch_b01` | `docs/exp-001-mockups/B1_coffee-switch_desk-mug.png` (bold black canister + put-down coffee mug, desk) | mockup for review |
| Static image 2 (alt) | `ig_static_coffeeswitch_b01` | `docs/exp-001-mockups/B2_coffee-switch_brewed-cup.png` (bold black canister + brewed cup, steam) | mockup for review |
| Video | `ig_video_coffeeswitch_b01` | idea-prompt below | for review |

### Ad text copies (both → landing hero "A better afternoon than coffee.")
- **Copy 1 — primary text:** "The 3pm coffee isn't the only option. A smoother afternoon — bold black, smooth green, or a caffeine-free evening. $19, no subscription." · **on-image headline:** `Swap the 3pm coffee.`
- **Copy 2 — primary text:** "Made for coffee drinkers. Three teas for energy, calm, and caffeine-free evenings — no bitterness, no crash. $19, no subscription." · **on-image / on-video headline:** `A better afternoon than coffee.`

### Video idea prompt (6–8s, 9:16, sound-off-safe)
> **Hook (0–1.5s):** a coffee mug being set down on a warm desk, late-afternoon light, a slight tired beat. On-screen: `The 3pm coffee again?`
> **Turn (1.5–4s):** hand reaches past the mug; the matte `bold black` canister comes into focus beside it. On-screen: `Try the switch.`
> **Resolve (4–7s):** a calm amber cup of tea is poured — the ONLY gloss is the liquid; soft steam. On-screen: `No bitterness. No crash.`
> **End card (7–8s):** canister + cup on cream + CTA text `Try the Switch — $19`.
- **Production:** assemble from the static mockups + `site/preview/s2-v2/assets/pour-loop-muted.mp4` (amber pour) as B-roll, or generate. Matte canister; gloss only on tea liquid. Captions burned in (runs muted).
- **Must-not:** no health claims, no "coffee is bad" moralizing, no shipping/delivery promise, no review/testimonial, no "#1/best-seller". Only factual claims: `$19`, `no subscription`, `caffeine-free` (true of Floral Herbal), `no bitterness/no crash` (sensory, product-true).
- **Naming map:** on-screen `bold black` (and any flavor name shown) must match landing Screen-2 `tea_name` exactly — `Bold Black` / `Floral Herbal` / `Smooth Green`.
