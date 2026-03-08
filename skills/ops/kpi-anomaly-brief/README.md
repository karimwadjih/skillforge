# KPI Anomaly Brief

Explain a KPI anomaly with possible drivers, confidence, and recommended next checks.

## Quick View

- Category: `ops`
- Maturity: `frontier`
- Tier: `developed`
- Evaluation status: `sampled`

## What This Skill Does

Sudden KPI changes often trigger reaction before anyone writes down the most likely drivers and evidence quality.

## When To Reach For It

- A KPI moved unexpectedly and needs a brief explanation.
- A team must separate signal from dashboard noise.

## What You Should Provide

- metric change
- time window
- related context
- known hypotheses

## What You Should Get Back

- anomaly brief
- likely drivers
- confidence notes
- next checks

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
