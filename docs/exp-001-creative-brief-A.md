# EXP-001 — Ad Creative Brief · Variant A "Choice Overload"

> **Owner:** @jared (Brand / UX) · **Produces:** Web App / media agent · **Ships to Meta:** Ronny
> One static creative for EXP-001 (fast, cheap PMF read). Tag Ronny when the asset file is ready for Meta upload.

## Identity
- **Creative id (`utm_content`):** `ig_static_3teas_a01`
- **Campaign (`utm_campaign`):** `pmf_choice_overload` → landing swaps to `page_variant=choice_overload`
- **Audience (Ronny):** Interests: tea, wellness, mindfulness — 25–44, US
- **PMF sub-angle:** decision fatigue / reassurance — "too many tea choices, just start with three"

## The single job
Make an overwhelmed tea-curious beginner feel that the decision is already made for them. Calm the shelf-anxiety in the first half-second, then point at one easy starter path.

## Visual direction
- **Subject:** Three papercraft pouches in a clean row on cream. Matte finish, soft daylight, generous negative space. (Reuse the box-reveal / pouch family already in `site/assets` + `site/preview/s2-v2/assets`.)
- **Composition:** pouches lower-center or lower-third; top third reserved for the on-image headline; lots of breathing room. Premium-quiet, editorial, not busy.
- **Palette:** cream `#F8F2EA` ground, ink `#2D241E`, and the three lane cues — amber `#D2AE64` (Bold Black), lavender `#D8C8E4` (Floral Herbal), sage `#A2AD8E` (Smooth Green).
- **Finish:** matte everywhere. Glossy is reserved ONLY for tea-liquid pour — there is no liquid in this creative, so keep it fully matte.

## On-image copy
- **Headline (on image):** `Too many teas? Start with 3.`
- **Type:** Instrument Serif (italic) for the headline; Inter for any tiny supporting mark. Keep to the headline only — 1–4 word overlay discipline; this is the one allowed exception (a short two-part line) because it carries the whole angle.
- **No price on the image** (the landing carries $19) unless Ronny wants a price test — flag if so.

## Tone
Reassuring, uncluttered, premium-quiet. Speaks to someone who wants to like tea but freezes at the wall of options.

## Must-not (guardrails)
- No health claims (no detox/calm-as-cure/sleep/immune/weight language).
- No fake "best-seller" / "#1" / awards.
- No review screenshots or invented testimonials.
- No supplier-copied imagery or claims.

## Specs
- **Primary ratio:** 1080×1350 (4:5 feed). Also export 1080×1920 (9:16 stories/reels) using the same layout, more vertical air.
- **Filename (per UX asset convention):** `varitea_ad_image_three-pouches-row_4x5_v01` (and `_9x16_v01`).
- **Asset metadata to log:** source (Stitch/generated/photo), status, usage rights, funnel stage = paid ad, crop ratios, product-claim risk = none, alt text.

## Asset → Meta handoff
Asset file + this brief → tag Ronny. Ronny attaches `utm_source=facebook/instagram`, `utm_medium=paid_social`, `utm_campaign=pmf_choice_overload`, `utm_content=ig_static_3teas_a01` to the destination URL (`https://drinkvaritea.com/?utm_campaign=pmf_choice_overload&utm_content=ig_static_3teas_a01&utm_source=...&utm_medium=paid_social`).

## Iterate rule
If CTR is strong (>1%) but `hero_cta_click` < 5%, the hero copy is the suspect — not this creative. If CTR < 0.3% after 2,000 impressions, retire and bump to `ig_static_3teas_a02` with a new visual hook. Keep the A/B history clean.

---

## Formats for this variant (2026-05-28 founder scope)

We only change/manage **ad → landing-page copy**. Variant A ships **2 ad text copies + 2 static images + a video idea**. Each format gets its own `utm_content`; both route to `page_variant=choice_overload` (same landing hero).

| Format | `utm_content` | Asset | Status |
|---|---|---|---|
| Static image 1 | `ig_static_3teas_a01` | `docs/exp-001-mockups/A1_choice-overload_three-pouches.png` (three canisters in a row, headline space top) | mockup for review |
| Static image 2 (alt) | `ig_static_3teas_a01` | `docs/exp-001-mockups/A2_choice-overload_box-reveal.png` (open box, three pouches, papercraft hills) | mockup for review |
| Video | `ig_video_3teas_a01` | idea-prompt below | for review |

### Ad text copies (both → landing hero "Tea stores have too many choices.")
- **Copy 1 — primary text:** "A whole wall of tea is a lot. We picked the three worth starting with — one bold, one floral, one green. $19, no subscription." · **on-image headline:** `Too many teas? Start with 3.`
- **Copy 2 — primary text:** "You don't need to be a tea person to start. Three teas, chosen for you. Brew one tonight. $19, no subscription." · **on-image / on-video headline:** `Start with three.`

### Video idea prompt (6–8s, 9:16, sound-off-safe)
> **Hook (0–1.5s):** quick top-down of a crowded tea shelf / many tins — visual overwhelm. On-screen: `Too many teas?`
> **Turn (1.5–4s):** hand sweeps the clutter away; cut to clean cream surface as the three matte canisters (bold black / floral herbal / smooth green) land in a calm row. On-screen: `Start with 3.`
> **Resolve (4–7s):** slow push-in on the three labels; a single pouch is lifted. On-screen: `$19 · no subscription`.
> **End card (7–8s):** the three in a row on cream + CTA text `Start with 3 Teas — $19`.
- **Production:** can be assembled from the static mockups + `site/preview/s2-v2/assets/pour-loop-muted.mp4` as optional B-roll, or generated. Matte everywhere; gloss only on tea liquid if a pour is shown. Captions burned in (runs muted in feed).
- **Must-not:** no health claims, no shipping/delivery promise, no review/testimonial, no "#1/best-seller". Only factual claims allowed: `$19`, `no subscription`, the three flavor names.
- **Naming map:** the three on-screen names must read exactly `bold black` / `floral herbal` / `smooth green` (lowercase on-pack), matching landing Screen-2 `tea_name` `Bold Black` / `Floral Herbal` / `Smooth Green`.
