---
name: KPI Anomaly Brief
description: Use when a metric moves sharply and leaders need a concise interpretation artifact quickly.
---

# KPI Anomaly Brief

## Summary

Explain a KPI anomaly with possible drivers, confidence, and recommended next checks.

## When To Use

- A KPI moved unexpectedly and needs a brief explanation.
- You need a kpi anomaly brief with possible causes, confidence level, implications, and follow-up analysis steps instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The update requires live operational data that has not been gathered.
- You need a human decision-maker to resolve a conflict before summarizing it.

## Inputs

- metric change
- time window
- related context
- known hypotheses

## Output Contract

- anomaly brief
- likely drivers
- confidence notes
- next checks

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a kpi anomaly brief with possible causes, confidence level, implications, and follow-up analysis steps using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A KPI anomaly brief with possible causes, confidence level, implications, and follow-up analysis steps

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
