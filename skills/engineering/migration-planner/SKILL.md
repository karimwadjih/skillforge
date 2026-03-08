---
name: Migration Planner
description: Use when a migration is inevitable and the team needs a written plan rather than a loose set of tasks.
---

# Migration Planner

## Summary

Plan a code, data, or platform migration with dependencies, sequence, and rollback considerations.

## When To Use

- A system, library, or data migration needs a staged plan.
- You need a migration plan with phases, prerequisites, checkpoints, rollback paths, and ownership notes instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The task needs direct code execution rather than planning, review, or explanation.
- There is not enough repository or system context to support a grounded output.

## Inputs

- migration target
- current state
- constraints
- dependencies

## Output Contract

- migration plan
- dependency map
- risk list
- rollback notes

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a migration plan with phases, prerequisites, checkpoints, rollback paths, and ownership notes using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A migration plan with phases, prerequisites, checkpoints, rollback paths, and ownership notes

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
