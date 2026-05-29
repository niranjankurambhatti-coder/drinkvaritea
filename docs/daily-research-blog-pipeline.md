# Daily Pipeline — Research → Blog → Founding Loop (one 6:00 AM run)

One automated morning run (≈6:00 AM CDT) that turns real customer evidence into: one canonical research artifact, one customer-facing blog post, and one nightly advance of the **founding-loop search system** — then opens a single PR with a **founder letter** attached. Everything is PR-only; nothing auto-merges or touches production.

> **Why one run:** the former Stage A (≈6 AM) and Stage B (≈8 AM) crons were merged into a single 6:00 AM CDT task that runs the stages sequentially and attaches the founder letter to the PR.

## The loop

```
Apify (Reddit/X/web)  +  Complaint Box (first-party)  +  next-topic.md  +  last few blogs
            │
            ▼  Stage A — Evidence + Research
   research/varitea-deep-research.md  (canonical, updated)
   research/versions/YYYY-MM-DD.md     (immutable snapshot)
            │
            ▼  Stage B — Blog
   site/blog/<slug>/index.html  (2–3 min customer-facing post)
   overwrites research/next-topic.md
            │
            ▼  Stage C — Founding Loop (search system)
   founding/state.json            (population: survivors + mutations + fresh)
   founding/runs/YYYY-MM-DD.md     (search declaration + per-domain loop log + winners)
            │
            ▼  ONE PR  +  Founder Letter attached (ikigai + fitness formulas + tonight's findings)
```

## Stage A — Evidence + Research

1. Collect fresh evidence via Apify (tea subreddits, X queries, web complaints) → `data/evidence/raw/YYYY-MM-DD/`.
2. Load first-party `data/customer-complaints/complaints.jsonl` (weighted highest).
3. Synthesize gaps vs. prior research; read `research/next-topic.md` and prioritize it unless stronger evidence emerges.
4. Update `research/varitea-deep-research.md` and append a dated block to its evidence ledger.
5. Write an immutable snapshot to `research/versions/YYYY-MM-DD.md`.

## Stage B — Blog

1. Read the canonical research, the complaint box, and the last few posts under `site/blog/`.
2. Write ONE customer-facing post (~500–700 words, 2–3 min) that promotes the deep research; follow the Perfect Blog Outline.
3. Light build: small Three.js accent; full SEO head + BlogPosting/BreadcrumbList/FAQPage JSON-LD; CTA → First Sip Box Stripe checkout; internal links.
4. Add a card to `site/blog/index.html` and the URL to `site/sitemap.xml`.
5. Overwrite `research/next-topic.md` with tomorrow's single topic.

## Stage C — Founding Loop (the search system)

Runs the overnight founding decisions as a sequential cascade of fitness-scored search loops. Full criteria/weights/gates in `docs/founding-loop-fitness-functions.md`.

**Active domains, in cascade order:** ICP → Positioning & Story → Acquisition + Retention/Moat + Whitespace. (Pricing & Format is parked for now.)

### 1. Search Declaration (write at top of `founding/runs/YYYY-MM-DD.md`)
- **Decision:** which founding question this domain resolves.
- **Fitness function:** the weighted criteria (see formula block / fitness doc).
- **Stopping condition:** top weighted score **≥ 4.0/5** OR time box / max iterations — whichever first.

### 2. Loop Spec (per domain, logged in the same run file)
- **Input sources:** complaint mining (Reddit / public reviews) as ground truth + first-party complaint box + prior survivors.
- **Generation step:** produce candidate segments / narratives / GTM moves.
- **Scoring rubric:** `Score = Σ (weightᵢ × criterion_scoreᵢ)`, 1–5 scale, grounded in mined signal.
- **Hard gate:** caffeine-free fit = false → disqualify (any domain).
- **Selection rule:** keep the top candidate as the domain winner; it feeds the next domain.
- **Mutation rule:** keep survivors, mutate sub-attributes, inject 1–2 fresh candidates next night (evolve the population in `founding/state.json`).

### 3. Cascade
ICP winner → Positioning input; Positioning winner → GTM input. No gate *between* domains; the cascade always runs in order.

## Founder Letter (attach to every PR)

After the stages, fill `docs/founder-letter-template.md` for the night and append it to the PR description: ikigai (four rings, Varitea at center), the fitness-function formula block (verbatim), and the "what we learned tonight" winners + one findings line grounded in the run. Never fabricate findings.

## PR

Open ONE PR per run. Title must include the persona (Space rule). Suggested title:
`chore(founding): [Val / Founder] daily research + blog + founding loop YYYY-MM-DD`
(or keep the dual `chore(research)` / `feat(blog)` framing in the body). The founder letter is part of the PR description.

## Perfect Blog Outline (fallback + house structure)

Source: Connor Gillivan "Perfect Blog Outline". Every post should follow this:
- **Title** — clickable + descriptive, based on what's winning.
- **Meta title + description** — ≤60 char title, ~155 char description.
- **Primary keyword** (one) + **secondary cluster**. **Search intent label.**
- **Intro** hook · **H1** (one, includes keyword) · **Hero image** · **H2 sections** (3–5) · **H3s** as needed.
- **CTA** to First Sip Box · **FAQ (H2)** · **Conclusion** with "Coming next" teaser · **Internal + external links** · **Expert insights** from research.

## Guardrails

- PR-only. Never merge, never push to main, never touch the domain/production.
- **Every PR title must include the persona** (Space rule).
- No fabricated complaints, reviews, customers, health benefits, certifications, sourcing claims, shipping promises, or legal conclusions. Regulatory-safe taste/ritual language only.
- No PII anywhere. Every founding candidate grounded in at least one real sourced signal.
- North star in every artifact: the innovation layer over the famous tea brands — sustainable plastic-free packaging + deeply-researched cited blends, funded by customers, caffeine-free only.
