# Founder Letter — Template (attach to every PR)

Every PR opened by the Varitea pipeline attaches this letter, filled in for the night. It is a **concise manifesto (~250–400 words)**: ikigai framing up top, the fitness-function formulas as a clean block, and one short "what we learned tonight" section grounded only in that PR's sourced evidence.

Fill the `{{ }}` slots from the run. Never fabricate findings — if a slot has no grounded evidence, write "no new signal tonight."

**Frozen run (no fresh ground truth):** if the ground-truth gate froze the loop (see `docs/founding-loop-fitness-functions.md`), label each winner line `(frozen, prior score)` and set the `{{TONIGHT}}` line to exactly: *"No fresh ground truth this run — scores frozen, no progress claimed."* Never present a frozen score as tonight's result.

---

## How to fill it each run

1. Copy the letter body below into the PR description, under the standard PR content.
2. Replace `{{DATE}}`, `{{ICP_WINNER}}`, `{{ICP_SCORE}}`, `{{POSITIONING_WINNER}}`, `{{POSITIONING_SCORE}}`, `{{GTM_WINNER}}`, `{{GTM_SCORE}}`, and `{{TONIGHT}}`.
3. Keep the ikigai block and formula block verbatim (they are constants); only the findings line changes night to night.

---

## Letter body (template)

> **Founder Letter — Varitea · {{DATE}}**
>
> We are not selling tea. We are building the innovation layer over the famous tea brands: a sustainable, plastic-free **packaging layer** and a deeply-researched, fully-cited **blending layer**. Every customer dollar funds that R&D. Tonight's search moved that mission one loop forward.
>
> **Ikigai — Varitea at the center**
> - **What we love (passion):** the craft of the daily caffeine-free ritual — the morning cup, the evening wind-down.
> - **What we're good at (vocation):** cited, research-driven blending and sustainable, plastic-free packaging engineering.
> - **What the world needs (mission):** honest provenance and an end to throwaway plastic in tea.
> - **What we can be paid for (profession):** customers who fund the innovation and stay for the ritual.
>
> Varitea lives where all four meet. The fitness functions below keep every overnight decision honest to that center.
>
> **Fitness functions (how tonight was scored)**
> ```
> Score = Σ (weightᵢ × criterion_scoreᵢ)          scale 1–5 · stop at ≥4.0 or time box
> Hard gate: caffeine-free fit = false → disqualified (any domain)
>
> ICP          = 0.30·SustainProvenanceWTP + 0.25·RitualIntensity
>              + 0.20·TasteGapPain + 0.15·SelfArticulation + 0.10·Reachability
> Positioning  = 0.35·ICPResonance + 0.30·Whitespace
>              + 0.20·MissionTruth + 0.15·RegulatorySafety
> GTM          = 0.30·Reachability + 0.30·RitualRetentionMoat
>              + 0.25·Whitespace + 0.15·MissionFundingMargin
> ```
> Ground truth = complaint mining (Reddit / public reviews). Sequential cascade: ICP → Positioning → GTM. Population evolves nightly: keep survivors, mutate, inject fresh.
>
> **What we learned tonight**
> - ICP winner: {{ICP_WINNER}} (score {{ICP_SCORE}}/5)
> - Positioning winner: {{POSITIONING_WINNER}} (score {{POSITIONING_SCORE}}/5)
> - GTM winner: {{GTM_WINNER}} (score {{GTM_SCORE}}/5)
> - {{TONIGHT}}
>
> Keeping Varitea at the center. — The founder

---

## Guardrails for the letter

- Regulatory-safe taste/ritual language only — no health/medical claims.
- No fabricated findings, reviews, or numbers. Scores must come from the night's grounded run.
- No PII. PR-only — the letter never authorizes a merge or production change.
