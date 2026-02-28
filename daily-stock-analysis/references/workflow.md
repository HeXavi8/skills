# Workflow (Deterministic)

Use this exact sequence to reduce model variance.

## Step 1: Resolve Instrument Context

1. Resolve `ticker`, `exchange`, `market` (global; not restricted to specific regions).
2. Resolve user-local date and target market trading calendar.
3. Resolve next valid trading day (`t+1`).

If ticker is ambiguous, stop and ask user.

## Step 2: Review Historical Reports First (Required)

1. Scan all compatible locations (working directory only):

- `<working_directory>/daily-stock-analysis/reports/` (new canonical)
- `<working_directory>/daily-stock-analysis/` (legacy)
- `<working_directory>/` (legacy)

2. Read files matching:

- `YYYY-MM-DD-<TICKER>-analysis.md`
- `YYYY-MM-DD-<TICKER>-analysis-vN.md`

3. Load from newest to oldest.
4. Default history depth: last 7 valid files (or user-provided window).
5. Extract:

- `pred_close_t1`, `actual_close_t1` (if present)
- prior `AE`, `APE`, hit status
- prior `improvement_actions`

If none found, set bootstrap status and continue.

## Step 2.1: Optional Legacy File Migration (Ask First)

If legacy files are found outside `reports/`:

1. List all legacy files explicitly (absolute paths) for user inspection.
2. Ask user whether to migrate all listed files into:

- `<workspace_root>/daily-stock-analysis/reports/`

3. Only migrate after explicit confirmation.
4. If no confirmation is provided, keep compatibility mode and continue.
5. Security rule: do not read or move files outside working directory.

## Step 3: Collect Current Data

Collect and timestamp:

1. Market: latest/close/open/high/low/volume
2. News/events: filings, announcements, major headlines
3. Fundamentals: growth, margins, leverage, cash flow
4. Technicals: trend, MA, RSI, MACD, support/resistance
5. Macro: rates, FX, commodities/index regime when relevant

## Step 4: Generate Analysis and Prediction

Output:

1. `recommendation`: Buy/Hold/Sell/Watch with entry/exit/invalidation triggers
2. `prediction`:

- `pred_close_t1` (required)
- optional range
- confidence
- assumptions

## Step 5: Compute Review and Accuracy

Using `metrics.md`:

1. Prior-run review (if actual is available):

- `AE`, `APE`, strict/loose hit

2. Rolling accuracy:

- 1d, 3d, 7d, 30d, custom (if requested)
- include sample size `n`

3. Improvement actions:

- 1-3 concrete adjustments for next run

## Step 6: Render with Fixed Template

Render using `report_template.md`.

- Include required machine-readable frontmatter.
- Keep all required keys even when value is `N/A`.

## Step 7: Persist to Report Folder (Required)

1. Ensure folder exists:

- `<working_directory>/daily-stock-analysis/reports/`

2. Base filename:

- `YYYY-MM-DD-<TICKER>-analysis.md`

3. If base file exists on same day and same ticker:

- Ask user: `overwrite` or `new_version`.
- If no user response available, use `new_version`.
- Version pattern: `YYYY-MM-DD-<TICKER>-analysis-v2.md`, `-v3.md`, ...

## Step 8: Final Response

Return:

1. one-paragraph summary
2. absolute saved file path
3. whether run used overwrite or versioning
4. any blocked/pending status
