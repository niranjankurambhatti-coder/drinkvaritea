# Daily Research → Blog Pipeline

Two automated morning stages that turn real customer evidence into one canonical research artifact and one customer-facing blog post per day. Both open PRs; nothing auto-merges or touches production.

## The loop

```
Apify (Reddit/X/web)  +  Complaint Box (first-party)  +  next-topic.md  +  last few blogs
            │                                                    │
            ▼ Stage A ~6:00 AM CDT                               │
   research/varitea-deep-research.md  (canonical, updated)       │
   research/versions/YYYY-MM-DD.md     (immutable snapshot)      │
            │                                                    │
            ▼ Stage B ~8:00 AM CDT  ◀──────────────────────────-┘
   site/blog/<slug>/index.html  (2–3 min customer-facing post)
            │
            └──▶ overwrites research/next-topic.md  (topic for tomorrow's Stage A)
```

## Stage A — Evidence + Research (≈6:00 AM CDT)

1. Collect fresh evidence via Apify (broad daily scope): tea subreddits, X queries, general web complaints → `data/evidence/raw/YYYY-MM-DD/`.
2. Load first-party `data/customer-complaints/complaints.jsonl` (weighted highest).
3. Synthesize: *what does the world need?* + *gaps vs. prior research*. Read `research/next-topic.md` (the topic the last blog requested) and prioritize it unless stronger evidence emerges.
4. Update `research/varitea-deep-research.md` (the one canonical artifact) and append a dated block to its evidence ledger.
5. Write an immutable snapshot to `research/versions/YYYY-MM-DD.md` (version history via files + git).
6. Open a PR titled: `chore(research): [Val / Material Scientist] daily deep-research refresh YYYY-MM-DD`.

## Stage B — Blog (≈8:00 AM CDT)

1. Read `research/varitea-deep-research.md`, `data/customer-complaints/`, and the last few posts under `site/blog/`.
2. If no fresh research is available, fall back to the **Perfect Blog Outline** (see below) using existing Space research.
3. Write ONE customer-facing post that PROMOTES the deep research — friendly, plain-language, 2–3 minute read (~500–700 words). It is the customer-facing translation of the canonical artifact.
4. Light build with a small Three.js accent; full SEO head + BlogPosting/BreadcrumbList JSON-LD; CTA → First Sip Box Stripe checkout; internal links to /blog and prior posts.
5. Add a card to `site/blog/index.html` and the URL to `site/sitemap.xml`.
6. End the post with a short "Coming next" note AND overwrite `research/next-topic.md` with the single suggested topic for tomorrow's Stage A.
7. Open a PR titled: `feat(blog): [SEO Agent / Val] <post title>`.

## Perfect Blog Outline (fallback + house structure)

Source: Connor Gillivan "Perfect Blog Outline". Every post should follow this:

- **Title** — base it on what's already winning; clickable + descriptive.
- **Meta title + description** — engaging, ≤60 char title, ~155 char description.
- **Primary keyword** — one per post. **Secondary keywords** — a small cluster.
- **Search intent label** — informational/commercial, so the writer knows the angle.
- **Intro paragraph** — hook the reader fast.
- **H1** — one only, includes the keyword.
- **Hero image** — break up text (reuse `/assets/blog/` OG art or quick nano-banana hero).
- **H2 sections** — the main 5–10 topics (here: 3–5, since it's a 2–3 min read).
- **H3s** — as needed under H2s.
- **CTA** — pitch the First Sip Box where natural.
- **FAQ (H2)** — address common questions (also strong for GEO/AI answers).
- **Conclusion** — wrap up + the "Coming next" research teaser.
- **Internal + external links** — to /blog, prior posts; reputable outside refs where useful.
- **Expert insights** — fold in research findings as the "expert" voice.

## Guardrails

- PR-only. Never merge, never push to main, never touch the domain/production.
- **Every PR title must include the persona** (Space rule).
- No fabricated claims, reviews, customers, health benefits, certifications, sourcing claims, shipping promises, or legal conclusions. Keep all language regulatory-safe.
- No PII in the complaint box.
- North star in every artifact: best tisanes curated for daily routines + sustainable high-barrier packaging.
