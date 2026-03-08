---
name: Safety Case Builder
description: Use when an agent workflow needs a more explicit risk story before wider rollout.
---

# Safety Case Builder

## Summary

Build a safety case for an agent workflow by mapping risks, controls, and residual uncertainty.

## When To Use

- A workflow needs a safety case.
- You need a safety case with hazards, controls, residual risks, and recommended monitoring instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The team expects guaranteed production reliability from an experimental workflow.
- There is no observable output or test harness to evaluate.

## Inputs

- workflow
- risk concerns
- existing controls

## Output Contract

- safety case
- risk map
- control summary
- residual risks

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a safety case with hazards, controls, residual risks, and recommended monitoring using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A safety case with hazards, controls, residual risks, and recommended monitoring

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
