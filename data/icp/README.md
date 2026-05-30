# ICP — Ideal Customer Profiles (structured, versioned)

> The structured source of truth for Varitea's target segments. Extracted from the **Foundational Brand Brief v1.0**. Used by the daily research → blog pipeline to tag evidence and target posts.

## Files

- `personas.jsonl` — one JSON object per persona (canonical).
- `versions/personas-YYYY-MM-DD.jsonl` — dated immutable snapshots (version history).

## Record schema (`personas.jsonl`)

```json
{
  "id": "kebab-case-id",
  "name": "Human name",
  "priority": "primary | secondary",
  "rank": 1,
  "rank_basis": "why this rank",
  "job_to_be_done": "the JTBD in the customer's words",
  "trigger": "what makes them buy now",
  "core_complaints": ["pain 1", "pain 2"],
  "themes": ["choice-overload","taste","caffeine","packaging","routine","price","personalization"],
  "desired_offer": "what they want to buy",
  "best_copy": "proven hook line",
  "product_implication": "what the product must do",
  "daypart_fit": ["morning","afternoon","evening","night","any"],
  "channels": ["where they are"],
  "source": "provenance"
}
```

## The five personas

**Primary (Days 0–30 — fastest first paid order):**
1. **Tea-Curious Beginner** — primary launch target; choice-overload + brew-rule confusion.
2. **Coffee Refugee** — high search-intent / paid-ad priority; vague caffeine labeling.
3. **Thoughtful Gifter** — highest AOV; impersonal-gift pain, wants polished personalization.

**Secondary (Days 31–60):**
4. **Orphaned Discovery Subscriber** — post-Sips-By guided-discovery demand, no subscription.
5. **Flavor Explorer** — wants unique flavors beyond the grocery shelf.

## How it's used in research

The daily research stage tags each piece of evidence (complaint box + Apify) with the matching `id`/`themes`, so synthesis can report demand and gaps **per segment**. The blog stage may target a specific persona per post. Keep `themes` aligned with the complaint-box `theme` field so the two datasets join cleanly.

## Maintenance

- Update from new evidence over time, but keep grounded — no invented segments.
- On any change: bump the canonical file and write a new dated snapshot under `versions/`.
