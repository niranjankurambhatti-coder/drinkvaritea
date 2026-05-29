# founding/

State and run logs for the Varitea **founding-loop search system** (Stage C of the daily pipeline).

- `state.json` — the evolving population. Survivors persist night-over-night; the cron mutates them and injects fresh candidates. Holds founder-approved weights, the hard gate, and the cascade order.
- `runs/YYYY-MM-DD.md` — one file per nightly run: the **Search Declaration** (decision / fitness function / stopping condition) and the per-domain **Loop Spec** log (inputs, candidates, scores, winner, mutation).

See `docs/founding-loop-fitness-functions.md` for the full fitness functions and `docs/daily-research-blog-pipeline.md` for how this stage fits the daily run. PR-only; no fabrication; no PII; caffeine-free only.
