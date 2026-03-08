---
name: Service Dependency Inventory
description: Use when a service depends on more systems than the team can easily keep in mind.
---

# Service Dependency Inventory

## Summary

Inventory dependencies for a service and explain which ones matter most operationally.

## When To Use

- A service dependency inventory is needed for planning or resilience review.
- You need a dependency inventory with critical dependencies, failure implications, and ownership notes instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- You need direct infrastructure access rather than a preparation or review artifact.
- The environment inventory is missing entirely.

## Inputs

- service context
- dependency list
- known critical paths

## Output Contract

- dependency inventory
- critical path notes
- risk summary

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a dependency inventory with critical dependencies, failure implications, and ownership notes using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A dependency inventory with critical dependencies, failure implications, and ownership notes

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
