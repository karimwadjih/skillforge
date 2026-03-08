---
name: Reasoning Trace Redactor
description: Use when internal reasoning or sensitive process notes need a cleaner sharing boundary.
---

# Reasoning Trace Redactor

## Summary

Design a safe redaction approach for internal reasoning traces or sensitive analysis artifacts.

## When To Use

- A team wants to share an analysis artifact without exposing sensitive internal traces.
- You need a redaction plan with removable fields, share-safe summaries, and residual disclosure risks instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The team expects guaranteed production reliability from an experimental workflow.
- There is no observable output or test harness to evaluate.

## Inputs

- artifact to redact
- sharing audience
- sensitivity concerns

## Output Contract

- redaction plan
- safe-share artifact notes
- risk warnings

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a redaction plan with removable fields, share-safe summaries, and residual disclosure risks using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A redaction plan with removable fields, share-safe summaries, and residual disclosure risks

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
