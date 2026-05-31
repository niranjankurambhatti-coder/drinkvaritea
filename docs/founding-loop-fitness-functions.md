# Founding-Loop Fitness Functions

The pre-company founding decisions for Varitea are run as overnight **search systems**, not one-off questions. Each domain defines a *search space*, a *fitness function*, and a *stopping condition*, then the loop runs until it converges or times out.

> **Meta-pattern:** We are not asking AI a question. We define a search space, a fitness function, and a stopping condition — then let it run, keep the survivors, mutate them, and inject fresh candidates each night.

## North star (what every score must serve)

Varitea is an **innovation layer over the famous tea brands**: (1) a sustainable, plastic-free **packaging layer** and (2) a deeply-researched, fully-cited **blending layer**. Customer revenue funds R&D into both. So the ICP we hunt for is the segment whose dollars *fund the mission* — weighted toward mission-alignment, but real enough to retain.

## Fitness function anatomy

```
Score = Σ (weightᵢ × criterion_scoreᵢ)
```

Each criterion has: a clear definition of "good," a 1–5 scale, a weight (sums to 100% per domain), and a **measurement method** grounded in external signal — primarily **complaint mining (Reddit / public reviews)** so the loop scores against real ground truth and does not hallucinate quality upward.

### Canonical signal source (one actor)

The loop mines ground truth through **one canonical Apify actor: `trudax/reddit-scraper-lite`** (Reddit). This is deliberately a single source of truth — Reddit is where caffeine-free tea ritual + sustainability language lives richest, and keeping one actor makes the ICP signal consistent and comparable night-over-night. **This canonical actor *is* our emerging ICP** — the population it surfaces becomes the segment we build the pipeline for. Do not silently swap or fan out to other actors; if a second source is ever added it must be an explicit, documented change, never an ad-hoc substitution. (X and web actors, if used at all, are supplementary color only and never override the canonical Reddit signal or the first-party complaint box.)

### FREEZE RULE — no fresh ground truth ⇒ no score movement (mandatory)

A loop that scores winners without new external signal is grading its own homework — scores drift upward on the model's own priors, not reality. To prevent phantom progress:

**Fresh ground truth** = the canonical Reddit actor returned a non-empty dataset **this run** OR new first-party complaints were added to `data/customer-complaints/complaints.jsonl` since the last run.

**If no fresh ground truth lands this run:**
1. **FREEZE scores.** Do NOT advance, raise, or recompute any domain score. Carry the prior winners and their prior scores forward verbatim from `founding/state.json`.
2. **Do NOT mutate or inject** new candidates this run (mutation without new signal is noise). The population is held.
3. **FLAG the run.** Set `founding/state.json` → `last_run_ground_truth: false` and `frozen: true`; record the failure (actor + runId/datasetId or "no first-party delta") in `founding/runs/YYYY-MM-DD.md` under a **GROUND TRUTH: MISSING — SCORES FROZEN** header.
4. **Surface it in the PR + founder letter.** The PR body and the letter's "what we learned tonight" must say plainly: *"No fresh ground truth this run — scores frozen, no progress claimed."* Never restate a frozen score as if it were tonight's result.
5. Stage A (research) and Stage B (blog) may still run on existing evidence, but must not imply new validation occurred.

**Only when fresh ground truth lands** does the loop generate, score, select, mutate, and evolve the population as normal (`last_run_ground_truth: true`, `frozen: false`).

**Universal hard gate (binary eliminator, applies to every domain):**
- ❌ **No caffeine-free fit** — if winning the candidate requires caffeinated tea/coffee, it is disqualified regardless of score. Off-brand for Varitea.

**Scale legend (1–5):** 1 = no evidence / contradicted · 2 = weak/anecdotal · 3 = moderate, mixed signal · 4 = strong, repeated across sources · 5 = overwhelming, unsolved by incumbents.

**Stopping condition (all domains):** stop when the top candidate clears **weighted score ≥ 4.0 / 5** OR the per-night time box / max-iteration cap is hit — whichever comes first. Log the best either way.

---

## Domain 1 — Customer Identity (ICP) — runs first

Optimizes for a segment that **both** has a strong caffeine-free tea ritual (retention) **and** pays premiums for sustainability + honest provenance (funds the mission), weighted toward mission-alignment.

| Criterion | Definition of "good" | Weight | Measurement |
|---|---|---|---|
| **Sustainability + provenance willingness-to-pay** | Already pays more for plastic-free / compostable / traceable, cited products | **30%** | Complaint/forum mining for plastic-packaging gripes + WTP language |
| **Ritual intensity (retention proxy)** | Frames caffeine-free tea as a non-negotiable daily ritual (morning/evening) | **25%** | Routine/habit language density in Reddit + reviews |
| **Pain: acute taste/quality gap** | Vocal that caffeine-free teas taste bland/medicinal — urgency language | **20%** | Complaint mining across Vahdam/Harney/Art of Tea/David's Tea |
| **Self-articulates the need** | Describes the problem in its own words (high forum language density) | **15%** | Reddit/forum verbatim density |
| **Reachable without paid enterprise sales** | Reachable via content/SEO/community in < 3 touchpoints | **10%** | Channel-presence check in mined sources |

*Selection rule:* keep the top-scoring segment as the night's **ICP winner**; it feeds Domain 2.
*Mutation rule:* next night, keep the survivor segment, mutate its sub-attributes (ritual time, value driver), inject 1–2 fresh candidate segments.

---

## Domain 2 — Positioning & Story (runs after ICP)

Find the narrative cluster with the **least competition** and **highest resonance with the ICP winner**. Candidate clusters: origin/terroir · founder story · ethics/sustainability · honest provenance/citation · authenticity.

| Criterion | Definition of "good" | Weight | Measurement |
|---|---|---|---|
| **ICP resonance** | The story maps directly to the Domain-1 winner's stated values | **35%** | Cross-check narrative vs. ICP winner's mined language |
| **Competitive whitespace** | Incumbents under-tell or fumble this story | **30%** | Complaint mining: "wish they told me where it's from / what's in it" |
| **Mission-truth fit** | Story is *true* for the packaging + cited-blend layer (no fabrication) | **20%** | Verifiable against repo research + sourced data |
| **Regulatory safety** | Tells the story without health/medical claims | **15%** | Language audit (taste/ritual only) |

*Selection rule:* top narrative cluster becomes the night's positioning winner; feeds Domain 3.
*Mutation rule:* keep the winning cluster, mutate the framing/angle, inject one adjacent narrative.

---

## Domain 3 — Acquisition + Retention/Moat + Whitespace (combined GTM block, runs last)

Scores go-to-market moves against the ICP + positioning winners. Retention is treated as the moat — for a consumable, retention *is* the business.

| Criterion | Definition of "good" | Weight | Measurement |
|---|---|---|---|
| **ICP reachability + channel fit** | Channel reaches the ICP winner in < 3 touchpoints, organic-first | **30%** | Channel presence in mined sources |
| **Retention / ritual-design strength** | The move deepens the daily ritual → repeat purchase (the moat) | **30%** | Habit-language + repeat-intent signals in reviews |
| **Whitespace / underserved** | Targets a repeated, structurally unserved complaint | **25%** | Complaint mining across the four incumbents |
| **Mission-funding margin** | Move preserves margin that funds packaging + blend R&D | **15%** | Cost-vs-spend reasoning grounded in cited benchmarks |

*Selection rule:* top GTM move is the night's winner.
*Mutation rule:* keep the winning move, mutate the tactic, inject one fresh channel/retention idea.

---

## Loop wiring (sequential cascade, evolve-population)

```
ICP winner ──▶ Positioning winner ──▶ GTM winner
   ▲                  ▲                    ▲
   └── keep survivors, mutate, inject fresh candidates each night ──┘
```

No hard gate *between* domains — the cascade always runs in order, but the universal caffeine-free gate eliminates any candidate at any stage.

## What breaks a fitness function (checklist before each run)

- Too vague → not measurable. Every criterion must map to a mined signal.
- No external ground truth → scores hallucinate upward. Anchor on complaint mining.
- Wrong weights → optimizes the wrong thing. Weights are founder-approved (above).
- Missing a hard gate → caffeine-free gate is mandatory and binary.

## Guardrails (inherited)

- PR-only. Never merge, never push to main, never touch the domain/production.
- No fabricated complaints, reviews, customers, health benefits, certifications, sourcing claims, shipping promises, or legal conclusions. Regulatory-safe taste/ritual language only.
- No PII anywhere. Every candidate must be grounded in at least one real sourced signal.
