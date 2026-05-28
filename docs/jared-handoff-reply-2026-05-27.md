# Re: Varitea handoff — landing → customization → checkout

**From:** Jared (UX) · **To:** Computer
**Re:** Handoff drafted 2026-05-27
**Date:** 2026-05-27

Read it. Good frame. The thing I want to keep central while we work through this is the soul question: *"What must this brand make people believe in 5 seconds, and what must it make them buy in 5 minutes?"* Every decision below is a vote in service of that, not in service of design completeness.

---

## Decisions on your four open questions

### 1. Quiz structure — keep 4 questions, but reshape Q3 and Q4

Approved with amendments. The four-question shape is right. The cap is right. Two amendments:

- **Q3 ("What flavor pulls you?")** — drop the four-up image grid. It re-introduces the catalog problem we are explicitly trying to remove. Use **three large papercraft cards** matching the three lanes (bold / floral / smooth). The card *is* the answer. Tap it, the card folds forward, next question appears. The cards are the same objects that resolve into pouches at the end. That continuity is the whole point.
- **Q4 ("Any of these out for you?")** — keep as multi-select, but reword to **"Anything to leave out?"** with the same four chips. "Out for you" reads clinical.

The "skip to the box" escape hatch is correct. Keep it. Label it **"Just send me the box."** Not "skip" — skip implies the quiz is the destination. The box is the destination.

### 2. Quiz pace — editorial, not app-like

Editorial. Match the landing.

The whole reason the landing breathes is that we are asking the customer to **feel chosen for**, not to grind through a funnel. If the quiz speeds up to feel like progress, we accidentally tell the customer "this is a form." A form is what every other tea site has. We are not that.

One question per scroll-snap screen. The paper card folds, the next one rises. Progress dots at the top, dim until reached. Same dot pattern as s2. No fill bar — a fill bar measures effort, and we are not asking for effort.

**Target time on quiz: 60–75 seconds.** If our analytics show median completion under 30 seconds, we are moving too fast and we'll lose the "chosen for me" feeling. If over 120, we are asking too much. Tune from there.

### 3. The #why section — remove the link, do not build the section

Remove. Do not build.

The brief asks me to decide between (a) build a real #why section with three proof points, or (b) re-label the link. I am choosing (c) — **delete the link entirely.**

Three reasons:

1. We have no proof points that survive the no-unverified-claims rule. We have no reviews, no press, no shipped boxes. Anything we put there would be marketing prose, and marketing prose in a four-screen sensory landing breaks the spell. The whole landing is built on the premise that the *visual is the argument*. A "why" section is the visual giving up.
2. The 30-word budget is what makes the landing feel premium. Relaxing it for one section means relaxing it forever. I'd rather defend the budget and let the visuals carry the weight.
3. The job of "why Varitea" is being done on screens s2 and s3 already — pouches you can see, brewing you can watch. If those screens aren't convincing, a paragraph won't save them.

Nav becomes: **Logo · The Box · Quiz**. Three items. Clean.

### 4. Pouch screen (s2) — papercraft cutouts, not photography

Do not commission product photography in week one. We don't have final SKUs locked, the lead time burns the founder-batch window, and the photos would lock us into a visual that may not survive the first 50 boxes.

Instead, **three papercraft pouch illustrations** — one per lane. This matches the soul-document material law (matte papercraft world, glossy reserved for tea liquid and leaves). Each pouch gets:

- A folded paper silhouette with the wordmark and lane name (sentence case — "bold black", "floral herbal", "smooth green")
- A single tactile cue per pouch — small cutout leaf for bold, dried floral for floral, sage sprig for smooth
- The same plum/ink/cream colorway as the logo system, one dominant tone per pouch (amber for bold, lavender for floral, sage for smooth — these are already in the design tokens)

When we have shipped boxes and real photography, we swap in. The papercraft becomes the editorial illustration set we use forever for ads, brew cards, and email.

**Auto-rotate must pause on hover/tap, and must stop entirely if the user has interacted in the last 8 seconds.** This is non-negotiable. The current implementation fails accessibility.

### Bonus: Subscription placement (cross-cutting Q5)

You asked indirectly. My answer: **not on /thank-you. Email lifecycle only, starting at day 14.**

The thank-you page is a confirmation moment. It is the customer believing they made a good decision. The instant we add "want this every month?" we re-introduce anxiety into the moment that is supposed to remove it. Subscription is a relationship — it earns its way in via the lifecycle agent after the customer has actually drunk the tea.

The "tell us what to send next" interaction you proposed for /thank-you screen 3 is good, but reframe it: **not subscription, just preference capture.** "Which one did you reach for first?" — single-tap, stored in the customer record, used later by lifecycle. No commitment, no recurring charge, no anxiety.

---

## Per-screen notes

### Screen 1 — Landing (/)

Working points are correctly identified. Carry them.

Concerns I want to add:

- **Video s3 with no audio/no caption.** Add a subtle 1-second **caption fade-in** at scroll entry: "watch — brewing in real time." 6 words. Disappears after first scroll past. Do not add a play indicator — those read app-like, and we are editorial.
- **Founder launch chip on s4.** Approved in principle but **do not state a specific box count** ("47 boxes available"). We don't have inventory locked, and a number we can't honor becomes a fake-claim violation. Use **"Founder launch · Limited first batch"** — two facts, both true, no number. If we want urgency later, we add a real countable thing (a deadline, a batch close date) when we have one.
- **Desktop framing at >1280px.** Keep the phone frame for now. The risk you're identifying is real for press/partner review, but the press/partner audience is approximately zero people in week one and the cold-traffic audience is overwhelmingly mobile. Revisit when we have >5k desktop sessions/month. Today: do nothing.

### Screen 2 — Customization (/quiz) — NEW BUILD

See decisions above. Adding implementation guardrails:

- **localStorage persistence: yes, but include a "start over" affordance** on the result screen. People share links; the next person should not inherit answers.
- **PostHog event naming.** `quiz_completed` is fine. Also fire `quiz_started`, `quiz_step_completed` (with step index), and `quiz_abandoned` (on tab close mid-quiz with at least one answer). We need the funnel shape, not just the conversion.
- **Result page copy:** the reasoning text you proposed ("Because you said 'morning energy'") is correct *if* we have the answer phrased as the customer would phrase it. "Because you said morning" is fine. "Because you said morning energy" risks sounding like we are paraphrasing them at themselves. Use the literal answer label.
- **Result page CTA:** "Get my first three — $19" (not "Save $X with the First Sip Box"). We do not have a comparison price established, so claiming savings is unverifiable. Sell the box, not the discount.

### Screen 3 — Checkout handoff

Working point confirmed: Stripe Payment Link is live.

- **Stripe branding customization** — do it this week. Logo, plum primary color (#8E78A6), cream background where Stripe allows. This is the single highest-leverage 30-minute change in the document.
- **/thank-you page** — approved, three-screen scroll-snap matching the landing. The amber Three.js leaves are the right call (warmer post-purchase). Ship the page even if screen 3 (preference capture) takes another iteration — the welcome moment cannot wait for the perfect interaction.
- **Shipping commitment language** — pull from Ops, do not invent. If Ops hasn't given us a number, use **"We'll email tracking as soon as your box ships."** It's true, it's a real commitment, and it does not put us in a bind.

---

## Revised priority order

Your order is mostly right. Two swaps:

| # | Task | Why | Est. |
|---|------|-----|------|
| **1** | **Stripe branding customization** | 30-minute change, every paying customer in the next 7 days benefits. Moved up from #4. | 30 min |
| **2** | Resolve "Why Varitea?" link — delete it | 1-hour change that removes a broken nav element. Moved up from #3. | 1 hour |
| **3** | Build /quiz — 4 questions + result | Closes the dead link, completes the funnel. | 1–2 days |
| **4** | Design /thank-you | Captures the high-emotion moment. | 0.5 day |
| **5** | Pouch screen (s2) papercraft upgrade | Closes the credibility gap. Lower than your order because it's the highest-effort visual swap and we should learn from the first 10 orders before committing to the illustration set. | 1 day |
| **6** | Component inventory + token extraction to `tokens.css` | Foundation. Do this *while* building /quiz, not after — extract tokens as you need them. | 0.5 day |
| **7** | Accessibility pass — pause control, focus states, contrast audit | Must ship before paid traffic. The auto-rotate-with-no-pause is a real bug today. | 0.5 day |

Rationale for the reorder: items 1 and 2 are tiny and unblock real revenue / fix a real broken link. They should not wait behind the larger /quiz build. /quiz is still the most important thing — it just shouldn't block 30-minute wins.

---

## What I'm signing off, what I still need

**Signed off and ready to build:**
- Quiz structure (4 questions, editorial pace, papercraft cards)
- Delete the #why link
- Pouch papercraft direction (no photography in week one)
- /thank-you three-screen scroll pattern
- Subscription delayed to email lifecycle
- Revised priority order

**Still need from the rest of the team:**
- **Ecommerce Ops Agent:** real shipping turnaround commitment for the /thank-you copy. Even "5–10 business days after order" is enough. I cannot ship the page without a true number.
- **Brand Agent:** confirm the three pouch illustrations align with the v1 logo system colorways. If amber/lavender/sage cause any conflict with the plum/ink/cream lockup, surface it now.
- **Web App Agent:** confirm Three.js leaf system can be re-skinned to amber for /thank-you without a second WebGL context. Do not load Three.js twice.
- **Lifecycle Agent:** day-14 subscription-introduction email is now your problem, not mine. Spec when you're ready.

---

## One thing I want to say out loud

The brief frames this as "polishing three screens." It's not. It's defending a small, fragile, premium feeling against the gravitational pull of looking like every other DTC tea site. Every decision above — keeping the 30-word budget, refusing the catalog grid in Q3, killing the #why section, refusing subscription on /thank-you — is the same decision: **less text, more sensory, fewer apologies for being quiet.**

If we get this right, the customer feels like they walked into a small paper world that was made for them. If we get it wrong, we are a sampler box with a moodboard.

— J

---

**File:** `docs/handoffs/2026-05-27-jared-reply.md`
**Reply by:** Computer (Web App Agent + Brand Agent for tactical items)
**Open in repo:** issues will be opened for items 1–7 referencing this doc.
