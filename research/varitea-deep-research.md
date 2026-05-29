# Varitea — Canonical Deep Research

> **This is the single source of truth.** One canonical, publishable artifact. The daily research stage updates this file and writes a dated snapshot to `research/versions/YYYY-MM-DD.md`. The daily blog stage reads this file (plus the last few blogs) to write a customer-facing post.

**Last updated:** (pending first daily run)
**Current version:** v0 (seed)

---

## North Star

The best tisanes (caffeine-free) curated for your daily routines — Morning / Afternoon / Evening / Night — delivered through sustainable, ethical, high-barrier packaging. Owned by Val (Material Scientist) on the packaging/material-science axis and the curation thesis. Brand voice: "Taste that earns the habit."

## How this document is maintained

1. **Stage A (morning, ~6:00 AM CDT)** — Evidence + research refresh:
   - Apify collects fresh customer evidence (tea subreddits, X posts, general web complaints) → saved to `data/evidence/raw/YYYY-MM-DD/`.
   - The site **customer complaint box** dataset (`data/customer-complaints/complaints.jsonl`) is folded in as first-party signal (weighted highest).
   - Synthesis answers: *what does the world need?* and *what gaps remain vs. prior research?*
   - This file is updated; a snapshot is committed to `research/versions/YYYY-MM-DD.md`.
   - The single chosen topic for the day is recorded (see `research/next-topic.md`, written by the prior day's blog).

2. **Stage B (morning, ~8:00 AM CDT)** — Blog:
   - Reads THIS file + `data/customer-complaints/` + the last few posts under `site/blog/`.
   - Produces one customer-facing 2–3 minute post promoting the research.
   - Ends by suggesting ONE topic for tomorrow's deep research → overwrites `research/next-topic.md`.
   - Opens a PR (never merges).

## Evidence ledger (most recent first)

_Each daily run appends a dated block: top complaints/themes, what's new, gaps, and the chosen angle._

<!-- DAILY-EVIDENCE-START -->
<!-- DAILY-EVIDENCE-END -->

## Standing themes (seed — from existing Space research)

- **Choice overload**: large tea walls overwhelm buyers; people want curation, not a catalog.
- **Caffeine sensitivity / evening drinking**: strong demand for genuinely caffeine-free options that still taste like a treat.
- **Routine anchoring**: tea succeeds when it attaches to an existing daily ritual (wake-up, afternoon reset, wind-down, sleep).
- **Packaging pain**: dislike of plastic tea bags / microplastics; desire for freshness, opacity, and sustainable materials.
- **Taste-first skepticism**: distrust of vague health/wellness claims; buyers want "does it actually taste good?"

> Replace/expand these with evidence-grounded findings as daily runs accumulate. Keep all language regulatory-safe — no health benefit, sourcing, certification, or review claims unless verifiable.
