---
name: Runbook Author
description: Use when procedural knowledge needs to be survivable during real operating pressure, not just documented.
---

# Runbook Author

## Summary

Turn fragile procedural knowledge into a runbook operators can follow and verify under pressure.

## When To Use

- A procedure matters enough operationally that relying on tribal memory is now risky.
- You need a runbook with prerequisites, ordered steps, verification checks, rollback, and escalation notes instead of an informal how-to.
- The workflow repeats often enough that operational safety depends on a reusable version.

## Avoid When

- The procedure is still too fluid or untested to document as a reusable operating path.
- The real need is architecture explanation or training material rather than an operator runbook.

## Inputs

- procedure or incident notes
- system or environment context
- prerequisites and permissions
- known failure points
- rollback or escalation options

## Output Contract

- runbook draft
- step-by-step procedure
- verification checks
- rollback and escalation notes

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a runbook with prerequisites, ordered steps, verification checks, rollback, and escalation notes using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A runbook with prerequisites, ordered steps, verification checks, rollback, and escalation notes

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
