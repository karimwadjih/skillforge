---
name: Oncall Handoff Builder
description: Use when on-call context is changing hands and the next operator needs more than a raw ticket list.
---

# Oncall Handoff Builder

## Summary

Build an on-call handoff that captures current issues, watch items, and operating context.

## When To Use

- An on-call shift handoff needs a stronger summary.
- You need an on-call handoff brief with live issues, watch items, timing notes, and escalation reminders instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- You need direct infrastructure access rather than a preparation or review artifact.
- The environment inventory is missing entirely.

## Inputs

- current incidents
- watch items
- pending changes
- operator notes

## Output Contract

- handoff brief
- watch list
- risks
- follow-up notes

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build an on-call handoff brief with live issues, watch items, timing notes, and escalation reminders using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

An on-call handoff brief with live issues, watch items, timing notes, and escalation reminders

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
