# Budget Guardrails

Conservative test budget system. All dollar amounts require founder approval before any campaign goes live. Placeholder thresholds are marked `[FA]` (founder approval).

## Principles

1. Never spend to impress. Spend to learn.
2. Every dollar of ad spend must be traceable to a decision.
3. Kill fast. Iterate faster. Scale slowly.
4. No budget increase without at least one purchase signal.

---

## Test budget structure

| Level | Amount | Rule |
|---|---|---|
| First experiment total cap | $[FA] | The most we spend on any single PMF probe before a kill/iterate/scale decision |
| Daily cap per campaign | $[FA] | Prevents runaway spend if platform algorithms misbehave |
| Lifetime cap (all experiments pre-PMF) | $[FA] | Total test budget before first real PMF signal is confirmed |
| Scale increment | 20% per week | Never more than double overnight |
| Emergency pause threshold | Any day CTR < 0.3% and zero CTA clicks | Auto-pause, founder reviews next morning |

---

## CPC thresholds

| Channel | Good CPC | Warning CPC | Kill CPC |
|---|---|---|---|
| Meta (cold audience) | < $[FA] | $[FA]–$[FA] | > $[FA] |
| Google Search (exact) | < $[FA] | $[FA]–$[FA] | > $[FA] |
| Google Search (phrase) | < $[FA] | $[FA]–$[FA] | > $[FA] |

_Fill with founder-approved numbers before launch. Reference industry benchmarks for tea/ecommerce when setting._

---

## CTR thresholds

| Channel | Minimum CTR to continue | Strong signal CTR |
|---|---|---|
| Meta Reel/Story | 0.8% | > 2.0% |
| Meta Feed Static | 0.5% | > 1.5% |
| Google Search | 3% (search intent is high) | > 8% |

---

## Funnel conversion thresholds

| Funnel step | Minimum to proceed | Strong signal |
|---|---|---|
| Click → Landing page visit | > 85% (low bounce from ad click) | > 95% |
| Landing page → CTA click | > 5% | > 15% |
| CTA click → Checkout start | > 40% | > 70% |
| Checkout start → Purchase | > 20% | > 50% |
| Click → Email capture | > 10% | > 30% |

---

## Kill rules

Kill (pause campaign immediately, do not restart without brief update) if ANY of:

- Spend reaches $[FA] with zero checkout CTA clicks
- CTR < 0.3% after 2,000 impressions
- CPC > [FA kill threshold] after $[FA] spend
- Landing page bounce rate > 80% (people click ad, immediately leave)
- No email captures after $[FA] spend
- Comments/feedback signal serious brand misalignment (document in experiment result)

---

## Iterate rules

Iterate (do not kill, modify one element) if:

- CTR is strong (> 1%) but CTA click rate is < 5% → iterate landing page headline
- CTA clicks are happening but checkout starts < 20% → iterate offer clarity or friction
- Email captures happening but zero purchases → iterate email nurture sequence or offer
- One creative is 3× better CTR than others → pause weaker creatives, test new variants of winner

---

## Scale rules

Scale (increase daily budget by 20%) only if ALL of:

- At least 1 purchase has occurred from the campaign
- CTR is above minimum threshold for channel
- CPC is below warning threshold
- Checkout CTA click rate > 5%
- Margin-adjusted ROAS is positive (Finance Agent sign-off)
- Founder has reviewed and approved

---

## CAC targets

_Placeholder — Finance Agent must model with real COGS, AOV, and margin before launch._

| Stage | CAC target |
|---|---|
| First order (validation) | Any number — learning is the goal |
| First 10 orders | < [FA] — establish baseline |
| First 50 orders | < [FA] — approach sustainable range |
| Scaled (PMF confirmed) | < [FA] — margin supports LTV |

---

## Budget approval workflow

1. Paid Growth Agent fills experiment brief including proposed budget
2. Finance Agent reviews margin model and LTV estimate
3. Founder approves or adjusts budget
4. Budget is set in platform with daily and lifetime caps
5. No ad goes live without founder final approval of budget

---

## Reporting cadence tied to budget

| Spend level | Review cadence |
|---|---|
| First $[FA] | Daily review, every morning |
| $[FA]–$[FA] | Daily review + weekly PMF summary |
| > $[FA] | Daily review + weekly PMF summary + Finance Agent margin check |
