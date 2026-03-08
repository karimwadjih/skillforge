---
name: Test Plan Designer
description: Use when a team needs a test plan that covers happy paths, edge cases, and failure conditions explicitly.
---

# Test Plan Designer

## Summary

Design a test plan for a change, workflow, or system area.

## When To Use

- A meaningful change needs a structured test plan.
- You need a test plan with coverage goals, case types, and verification priorities instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The task needs direct code execution rather than planning, review, or explanation.
- There is not enough repository or system context to support a grounded output.

## Inputs

- change description
- risk areas
- critical paths

## Output Contract

- test plan
- coverage map
- edge-case list

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a test plan with coverage goals, case types, and verification priorities using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A test plan with coverage goals, case types, and verification priorities

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
