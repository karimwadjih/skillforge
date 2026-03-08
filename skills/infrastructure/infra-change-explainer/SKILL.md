---
name: Infra Change Explainer
description: Use when infra work needs a clearer explanation than a raw diff or ticket provides.
---

# Infra Change Explainer

## Summary

Explain an infrastructure change in plain language for operators or adjacent teams.

## When To Use

- An infrastructure change needs a readable explanation.
- You need an infrastructure change explainer with rationale, affected components, impact, and follow-up checks instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- You need direct infrastructure access rather than a preparation or review artifact.
- The environment inventory is missing entirely.

## Inputs

- change description
- affected systems
- audience

## Output Contract

- change explainer
- impact summary
- risk notes

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build an infrastructure change explainer with rationale, affected components, impact, and follow-up checks using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

An infrastructure change explainer with rationale, affected components, impact, and follow-up checks

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
