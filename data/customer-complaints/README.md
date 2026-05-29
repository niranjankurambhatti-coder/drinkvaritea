# Customer Complaint Box (first-party feedback dataset)

> A growing, append-only record of real customer feedback and complaints. This is **important first-party data** for Varitea — it is weighted highest in daily research synthesis. Treat it as a strategic asset.

## Files

- `complaints.jsonl` — append-only, one JSON object per line. The canonical store.
- `raw/YYYY-MM-DD/` — daily raw exports (site form submissions, support inbox, etc.) before normalization.

## Record schema (`complaints.jsonl`)

One JSON object per line:

```json
{
  "id": "uuid-or-hash",
  "date": "2026-05-28",
  "source": "site_form | email | reddit | x | review | other",
  "channel_url": "https://... (if public)",
  "text": "verbatim customer words",
  "theme": "packaging | taste | caffeine | choice-overload | shipping | price | routine | other",
  "sentiment": "negative | neutral | mixed | positive",
  "actionable": true
}
```

## Privacy rules

- **No PII.** Do not store names, emails, phone numbers, addresses, or payment data. Strip or hash any identifiers before committing.
- Public-source items (Reddit/X) store the public URL; private feedback (site form/email) stores only the anonymized text + theme.
- This dataset must never contain fabricated complaints. Only real, sourced feedback.

## How it's used

- Daily research stage reads `complaints.jsonl`, clusters by `theme`, and folds the highest-signal pains into the canonical research doc.
- First-party complaints outrank external scraped signal when they conflict.
