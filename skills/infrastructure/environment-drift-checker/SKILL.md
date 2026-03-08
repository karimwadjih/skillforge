---
name: Environment Drift Checker
description: Use when environments may have drifted and a team needs a review artifact before acting.
---

# Environment Drift Checker

## Summary

Check for environment drift and summarize what changed, why it matters, and where to verify.

## When To Use

- A team suspects environment drift.
- You need an environment drift report with changed items, significance, and verification priorities instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- You need direct infrastructure access rather than a preparation or review artifact.
- The environment inventory is missing entirely.

## Inputs

- environment configs
- expected baseline
- known incidents

## Output Contract

- drift summary
- difference list
- verification priorities

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build an environment drift report with changed items, significance, and verification priorities using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

An environment drift report with changed items, significance, and verification priorities

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
