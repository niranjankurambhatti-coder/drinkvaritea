# Jared Spool — Varitea handoff: landing → customization → checkout

**Owner:** Jared (UX) · **Drafted by:** Computer · **Date:** 2026-05-27
**Scope:** Polish the three screens between "first impression" and "first paid order" so the visual, motion, and copy systems all hold together.

---

## TL;DR — what's already in main

1. **New homepage** (`site/index.html`) — the four-screen mobile concept landing replaces the previous SEO landing. Old homepage is preserved at `/legacy/` for reference.
2. **Logo system v1** ([varitea-logo-system-v1.zip](../site/brand/)) — wordmark + hand-tuned leaf glyph in three colorways (plum/ink/cream). Used in the nav and favicons. Source SVGs live in `site/brand/svg/`.
3. **Brand assets** — `site/assets/brand/` (favicon family + glyph SVGs used by the homepage). `site/brand/` (full design system, downloadable).
4. **Brand identity foundation** — three PDFs already in the Space: mood board, brand identity foundation, label card system.
5. **Stripe Payment Link** — already wired into the homepage primary CTA. Locked: `https://buy.stripe.com/aFa8wQ6Uz5tz0wCeGv5ZC00`

---

## The 30,000-foot frame

Today the path from "I saw an ad" to "I paid $19" has three states:

| State | Surface | Today |
|---|---|---|
| **1. Landing** | `/` (concept landing) | Built. Four screens, locked 30-word budget, Three.js leaves, scroll-locked video, Stripe CTA. |
| **2. Customization** | `/quiz` (linked from s4 ghost CTA) | **Does not exist yet.** Currently anchors to `#quiz` (dead link). |
| **3. Checkout** | Stripe Payment Link | Live, but no branded handoff or post-purchase moment. |

Your assignment is to design the **system that connects them**, not just polish each in isolation.

---

## Screen 1 — Landing (`/`)

### What's working
- Hero typography ("A better daily drink.") reads quietly and confidently above the fold.
- Three.js leaves are gentle, settle at bottom, and feel atmospheric not noisy.
- Stripe primary CTA + secondary quiz CTA gives users a low-commitment second path.
- Glyph + wordmark lockup in the nav establishes the brand mark immediately.

### What needs your attention
1. **"Why Varitea?" link goes nowhere.** Currently anchors to `#s4`. Either (a) add a real `#why` section between s2 and s3, or (b) re-label and link the nav element. If (a), the new section needs three short proof points that don't violate the Space's no-unverified-claims rule.
2. **Pouch screen (s2) reads as logos on tile, not as packaging.** The subtle wordmark is good but the pouches still look like CSS blocks. Either:
   - Generate three real pouch product shots (one per tea) and crossfade them, or
   - Lean into the abstraction — add a single illustrated tea-leaf icon per tea so each pouch has a visual identity beyond color
3. **The s3 video has no audio and no caption.** Three seconds in, a user might think it's a static image. Consider a subtle UI hint that this is a moving image (a small play-state indicator? a slow caption fade?).
4. **No social proof anywhere.** We do not have customer reviews yet, but we do have the "founder launch" framing. Consider a small "Founder launch · Limited first batch · 47 boxes available" chip on s4 to add urgency without faking validation.
5. **Desktop framing.** The phone-frame metaphor on desktop is clever but might feel limiting for press / partner reviews. Test whether desktop visitors over 1280px feel locked-out.

### Decision needed from Jared
- **Do we keep the strict 30-word budget**, or can we relax it slightly for a `#why` section?

---

## Screen 2 — Customization (`/quiz`) — NEW BUILD

This is the missing screen. It's also probably the most important one for the brand, because it's where Varitea earns the right to call itself "personalized tea" instead of just "another sampler box."

### Strategic position
- The brand brief says: "an Apple-like tea discovery/customization experience."
- The Reddit sentiment report says: "tea is overwhelming. Coffee has espresso/latte/drip. Tea has 4,000 SKUs and no map."
- The product is a **3-tea box for $19** with three lanes: bold black, floral herbal, smooth green.

### Recommended design direction
A **60-second guided quiz** that doesn't feel like a quiz. Four questions max:

1. **"When do you usually drink it?"** Morning · Afternoon · Evening · All day
2. **"How do you take coffee today?"** Black · With milk · I don't drink coffee · Iced
3. **"What flavor pulls you?"** (image-based) Bold + grounded · Floral + bright · Fruity + soft · Grassy + clean
4. **"Any of these out for you?"** (multi-select) Caffeine · Bergamot · Hibiscus · None

Output: a one-screen recommendation page that says *"Your three teas. Save $X with the First Sip Box."* with the same s2 pouches, but now **labeled with the user's reasoning** ("Because you said 'morning energy'").

### Design system requirements
- **Same visual language as the landing.** Cream background, Instrument Serif italic for question titles, large tappable answer cards.
- **One question per screen** (mobile-first, scroll-snap like the landing).
- **Progress dots at top, not a fill bar** (matches the dot pattern from s2).
- **A "skip to the box" escape hatch on every step.** Don't trap users.
- **Persist answers in localStorage.** If they bounce and come back, resume.

### Conversion mechanics
- Every quiz completion → write to PostHog event `quiz_completed` with the answer set.
- Persona buckets feed into the recommendation copy. Even if the actual mix is fixed at first, the *reasoning text* personalizes the moment.

### Decision needed from Jared
- **Quiz feel: editorial (slow, one question per scroll) or app-like (instant tap, fast progression)?** The landing is editorial. The quiz could either match that pace or deliberately speed up to feel like progress.

---

## Screen 3 — Checkout handoff (Stripe Payment Link → post-purchase)

### What's working
- Stripe Payment Link is live and tested. No payment-form integration risk for the first orders.

### What's broken or missing
1. **The handoff from `/` to Stripe is jarring.** User goes from a hand-crafted mobile-cinematic site to a generic Stripe page in a new tab. We lose all brand context. Mitigation: customize the Stripe Checkout branding (logo, color, custom domain) at https://dashboard.stripe.com/settings/branding.
2. **No order confirmation page on our own domain.** Stripe redirects back to `https://drinkvaritea.com/` (or wherever the Payment Link's success URL is set). We should send users to `/thank-you` with:
   - A serif "Welcome to Varitea" headline
   - The same glyph mark
   - "We'll ship within X days" expectation (must be a real commitment we can keep — confirm with Ops)
   - A nudge to share or follow Instagram
3. **No post-purchase customization moment.** This is the highest-leverage missing experience. After someone pays, they should be invited to *customize* their box (within constraints — maybe a single swap?). This is what turns a $19 transaction into a relationship.

### Recommended design direction for `/thank-you`
- Same four-screen scroll-snap pattern as the landing, but with **three** screens:
  1. **"Welcome to Varitea"** — confetti of the same Three.js leaves, but warmer (amber instead of green-grey)
  2. **"Your box is being assembled"** — a packing animation or a static product shot with their three picks visible
  3. **"Tell us what to send next"** — a single "next month, swap [X] for [Y]?" interaction. Builds the subscription muscle gently.

### Decision needed from Jared
- **Where does subscription enter the experience?** Today it does not. Should `/thank-you` introduce it, or do we wait until email lifecycle?

---

## Cross-cutting design system tasks

### 1. Component inventory (no design system file exists yet)
Create `site/brand/components.md` documenting:
- Buttons (primary, ghost, chip)
- Card patterns (pouch, chip, hint)
- Typography scale (display, h2, body, caption)
- Spacing tokens
- Motion principles (when do things fade, when do they slide, how long)

### 2. Color tokens
The CSS variables are defined inline in `index.html`. Extract to `site/css/tokens.css` and document. Tokens already live in the Brand Identity Foundation PDF — make sure code matches.

### 3. Motion system
Currently we have: pulse ring (CTA), scroll-snap, intersection-observer crossfade, Three.js leaves, scroll-locked video. Document the **why** behind each so future agents don't add motion arbitrarily. Specifically:
- Motion only when it earns its keep
- Always respect `prefers-reduced-motion`
- Never animate text on first load — it makes reading harder

### 4. Accessibility audit
- Three.js canvas has `aria-hidden="true"` — good.
- Pouch carousel auto-rotates with no pause control — bad. Add a manual pause.
- Color contrast on the s4 chip should be checked at the smallest font size.
- All interactive elements need a visible focus state. Today they rely on browser defaults.

---

## Priority order (recommended)

| # | Task | Why first | Est. effort |
|---|---|---|---|
| 1 | Build `/quiz` — 4 questions + result | Closes the dead link, completes the funnel | 1-2 days |
| 2 | Design `/thank-you` | Captures the high-emotion moment | 0.5 day |
| 3 | Resolve "Why Varitea?" link target | Removes the broken nav link | 1 hour |
| 4 | Stripe branding customization | Reduces brand-context loss at checkout | 30 min |
| 5 | Pouch screen (s2) visual upgrade | Closes the credibility gap on the product | 1 day |
| 6 | Component inventory + token extraction | Foundation for everything that comes next | 0.5 day |
| 7 | Accessibility pass | Catches issues before paid traffic | 0.5 day |

---

## What I need from Jared back

1. **Sign-off or amendments to the quiz structure** (4 questions, editorial vs app-like pace).
2. **A decision on the `#why` section** — add it or remove the link.
3. **A recommended visual treatment for the pouches** that doesn't require us to commission real product photography in week one.
4. **An opinion on subscription placement** (thank-you page, email-only, or not yet).

Reply in this doc or open issues on the repo. I'll wire up whatever's decided.

---

## File reference

- Live site: https://drinkvaritea.com (Vercel auto-deploys `main`)
- Homepage source: `site/index.html`
- Legacy homepage (previous SEO landing): `site/legacy/index.html`
- Logo system source: `site/brand/svg/` (21 SVGs)
- Logo system rendered: `site/brand/png/` (78 PNGs)
- Concept landing project (workspace, used during iteration): `/home/user/workspace/varitea-concept/`
- Brand foundation PDFs: Space → `Spice and Tea` → `Drink Varitea — Foundational Brand Brief.md`
