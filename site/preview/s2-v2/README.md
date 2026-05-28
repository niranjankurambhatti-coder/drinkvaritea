# Screen 2 v2 — Three Teas (preview)

Variation of the landing's second screen only. **Not wired into main landing yet.**

**Live preview:** [/preview/s2-v2/](https://drinkvaritea.com/preview/s2-v2/) (after merge)

## What changed vs. current s2

| Aspect | Current s2 (`site/index.html`) | New s2-v2 |
|---|---|---|
| Pouches | CSS-block tiles (looked like color swatches) | Papercraft hero photography, one per lane |
| Backdrop | Static radial gradient | Ambient muted pour loop (8s, 1.3 MB) + same lane-tinted gradient |
| Interaction | Auto-rotate every 2.4s — no pause control (a11y bug) | User-controlled (tap, swipe, arrows, dots, keyboard). Tap-the-pouch triggers Three.js leaf burst. |
| Switch motion | Crossfade | Lane-color tint shift + leaf burst on the new pouch |
| End state | None | "Pick your start" hint + Stripe CTA appears once all 3 seen |
| Reduced motion | n/a | Video + Three.js disabled. Static gradient + crossfade only. |

## Tech notes

- Three.js loaded as ES module from unpkg (one HTTP request, ~150 KB gzip)
- 80-leaf instanced pool — no per-burst allocations
- Pour video: `<video muted autoplay loop playsinline>` with poster fallback. Pauses on `visibilitychange`.
- All assets total: **~1.65 MB** (3 pouch JPEGs + muted MP4 + poster)
- Self-contained — does not touch the rest of `site/`

## Open items per Jared's handoff

- [ ] Decision: replace current s2 entirely, or keep both behind an A/B flag?
- [ ] Brand Agent: confirm pouch colorways align with v1 logo system (plum/ink/cream)
- [ ] Ops: shipping turnaround number — not used here, but needed before /thank-you
- [ ] Stripe CTA still points to `#quiz` (placeholder anchor) — wire to live Stripe Payment Link before promotion to main landing

## Files

```
preview/s2-v2/
├── index.html              # standalone page
├── assets/
│   ├── pouch-bold.jpg      # 104 KB
│   ├── pouch-floral.jpg    # 78 KB
│   ├── pouch-smooth.jpg    # 82 KB
│   ├── pour-loop-muted.mp4 # 1.3 MB (h264, no audio)
│   └── pour-poster.jpg     # 40 KB
└── README.md
```

Sources for the pouch images and pour video: generated 2026-05-27 via media tools. Originals (PNG at 1024×1365 + audio MP4) archived in `/varitea-concept/assets/` workspace folder; production-ready WebP swap is a future task.
