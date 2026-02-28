---
name: daily-stock-analysis
description: Deterministic daily stock analysis skill for global equities. Use when users request daily stock analysis, next-trading-day close prediction, prior forecast review, prediction-accuracy calculation, and a markdown report with version control.
---

# Daily Stock Analysis (Stable + Self-Improving)

Goal: maximize consistency across models while preserving a clear self-improvement loop.

## Non-Negotiable Defaults

1. Always save exactly one report file per run.
2. Save reports under `<working_directory>/daily-stock-analysis/reports/`.
3. Base filename: `YYYY-MM-DD-<TICKER>-analysis.md`.
4. Before new analysis, review prior report files for the same ticker (if any), including legacy locations.
5. Report must contain machine-readable fields defined in `references/report_template.md`.

## Minimal Input Contract

Required:

- `ticker` (preferred) or company name

Optional:

- `market`: free text (for example `US`, `HK`, `CN`, `JP`, `UK`, `DE`)
- `mode`: `daily` (default) or `full_report`
- `window_days`: default `7`

If only company name is provided:

1. Resolve to ticker + exchange.
2. If ambiguous, ask user to confirm before continuing.

## Deterministic Run Order

Follow this exact order (see `references/workflow.md`):

1. Resolve ticker/exchange/timezone/trading day.
2. Load and review historical report files.
3. Collect current market/news/fundamental/technical data.
4. Generate recommendation + `pred_close_t1`.
5. Compute review and accuracy metrics.
6. Produce report using the fixed template.
7. Save report file to required folder.

## Required Output Objects

Every run must include:

- `recommendation`: Buy/Hold/Sell/Watch + trigger conditions
- `prediction`: `pred_close_t1`, confidence, assumptions
- `review`: `prev_pred_close_t1`, `prev_actual_close_t1`, `AE`, `APE`
- `accuracy`: strict/loose hit rates for 1d/3d/7d/30d (as available)
- `improvement_actions`: 1-3 concrete adjustments for next run

## Report Folder and Version Rules

Report folder (required):

- `<working_directory>/daily-stock-analysis/reports/`

Base report file:

- `YYYY-MM-DD-<TICKER>-analysis.md`

If same ticker is run multiple times on the same day and the base file already exists:

1. Ask user to choose:

- `overwrite`: replace existing base file
- `new_version`: create `YYYY-MM-DD-<TICKER>-analysis-v2.md`, `-v3.md`, ...

2. If user is unavailable (for unattended/automation runs), default to `new_version`.

## Legacy Compatibility and Optional Migration

Historical files may exist in legacy locations (within working directory only):

- `<working_directory>/`
- `<working_directory>/daily-stock-analysis/`

Compatibility rules:

1. Always scan legacy locations and the new reports folder before analysis.
   - Security rule: only read files under working directory; never access paths outside it.
2. Read legacy files when building review and accuracy history.
3. All newly generated reports must be saved only to:

- `<working_directory>/daily-stock-analysis/reports/`

Optional migration flow:

1. List all detected legacy files explicitly (full paths) for user review.
2. Ask user whether to move them into the new reports folder.
3. Only move files after explicit user confirmation.
4. If user does not confirm, keep files in place and continue with compatibility mode.

## Scheduling Recommendation

Recommend users run this skill as a recurring weekday task (for example 10:00 local time) to keep prediction-review-accuracy loops continuous and comparable over time.

## Self-Improvement (Core Capability)

This skill is explicitly self-improving.

On every run:

1. Learn from previous report errors and misses.
2. Identify repeat failure patterns (event shock, regime shift, bad assumption, timing mismatch).
3. Write 1-3 `improvement_actions` that change next run behavior.
4. Re-check whether those actions improve rolling accuracy.
5. Keep useful actions, discard ineffective ones.

## Error Handling (Strict)

1. Missing historical files:

- Continue analysis.
- Mark review as `N/A (insufficient history)`.

2. Missing official close price at runtime:

- Mark prior review as `pending`.
- Do not fabricate actual close.

3. Conflicting sources:

- Prefer official exchange/filing data.
- Keep confidence at `Low` if conflict remains.

4. Unresolvable ticker:

- Stop and request clarification.

## Reference Files

Use these by default:

- `references/workflow.md`
- `references/report_template.md`
- `references/metrics.md`
- `references/search_queries.md`

Use these only in `full_report` mode:

- `references/fundamental-analysis.md`
- `references/technical-analysis.md`
- `references/financial-metrics.md`

## Compliance

Always append this disclaimer:

"This content is for research and informational purposes only and does not constitute investment advice or a return guarantee. Markets are risky; invest with caution."
