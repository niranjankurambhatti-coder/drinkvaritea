# EXP-001 — Experiment Log

> Shared daily async log (Jared × Ronny). Mirror of the Notion EXP-001 page until Notion is connected.
> Joint brief: `sprint/EXP-001-shared-experiment-design.md`. CMS source of truth: `docs/exp-001-variants.md`.

---

## Status — @jared — 2026-05-28

- **Decision:** Three flavor names LOCKED as-is (Bold Black · Floral Herbal · Smooth Green) — confirmed, not revised. Variant A/B + default hero copy LOCKED. UTM copy-swap + `page_variant` + Screen-2 `tea_name` bridge implemented and QA'd on branch `feat/exp-001-variant-copy-swap`.
- **Next action:** Founder review/merge of PR (no production deploy yet, per Space boundary). One open copy decision for founder: floral lane subcopy (see "Open copy decision" below).
- **Metric moved:** none yet (pre-launch). The instrumentation for the A/B read is now correctly wired on the Jared side (`page_variant` tags every event; `s2_tea_selected.tea_name` matches the flavor names).
- **Blockers:** (1) Founder approval to merge/deploy. (2) Ecom Ops — real shipping turnaround for `/thank-you` (do not invent). (3) Ronny's connectors + budget caps (shared brief §7).
- **Handoffs:** → Ronny: exact copy strings + `utm_campaign`/`utm_content`/`page_variant` keys + parent-side `s2_tea_selected` listener contract (below). → Ecom Ops: shipping turnaround. → Founder: merge approval + floral subcopy decision.

---

## Open copy decision for founder (floral lane subcopy)

The s2-v2 Screen-2 floral lane previously read **"soft · fragrant · caffeine-free"**. I aligned it to the §1 dispatch spec **"floral · soothing · evening-calm"** in the current branch. Founder asked to discuss copy to test. Three on-brand, guardrail-safe options for the floral lane sub-line (≤3 short words/dots, sensory only — no health claims):

| Option | Sub-line | Why |
|---|---|---|
| **A (shipped now)** | floral · soothing · evening-calm | Matches the dispatch table; sets up the "evening wind-down" use-case. "Soothing/calm" = mood/sensory (allowed). |
| **B (previous live)** | soft · fragrant · caffeine-free | Avoids "calm" entirely; leads with the concrete "caffeine-free" fact, which is a strong beginner signal. |
| **C (hybrid)** | soft · floral · caffeine-free | Pure sensory + the caffeine fact; drops "soothing" if we want zero mood language. |

Recommendation: **A** for the evening/wind-down framing, but **B/C** are safest if we want to keep all mood words off Screen 2. One-line change in `data-sub` either way — say the word and I'll set it before merge.

---

## Parent-side `s2_tea_selected` contract (for Ronny)

The embed now postMessages on every tea selection. Parent listener to add (same-origin, `/preview/s2-v2/?embed=1`):

```js
window.addEventListener('message', function (e) {
  if (e.origin !== window.location.origin) return;
  var d = e.data;
  if (!d || d.type !== 'varitea:s2_tea_selected') return;
  window.varitea && window.varitea.track('s2_tea_selected', {
    tea_name: d.tea_name,       // 'Bold Black' | 'Floral Herbal' | 'Smooth Green'
    lane_index: d.lane_index,   // 0 | 1 | 2
    interaction: d.interaction  // 'tap' | 'swipe' | 'arrow' | 'dot'
  });
});
```

Verified payload (Playwright, mobile viewport): emits proper-case `tea_name`, correct `lane_index`, and `interaction` ∈ {tap, arrow, swipe, dot}.

---

## QA evidence (branch `feat/exp-001-variant-copy-swap`)

- Default `/` → `page_variant=default`, headline "A better daily drink.", no subhead/reassurance, hero CTA "Tap to begin". ✅
- `?utm_campaign=pmf_choice_overload` → `page_variant=choice_overload`, full Variant A copy, hero `cta_label` attribute synced to visible text. ✅
- `?utm_campaign=pmf_coffee_alt` → `page_variant=coffee_switch`, full Variant B copy, attribute synced. ✅
- `page_view` carries `utm_campaign`; `body[data-page-variant]` resolves before `app.js` (deferred) runs. ✅
- Screenshots: `docs/exp-001-screenshots/` (variant-default, variant-a, variant-b, screen2-bold-black).
- Visual QA: no text wrap/overflow/contrast issues on 390×844 mobile. ✅
