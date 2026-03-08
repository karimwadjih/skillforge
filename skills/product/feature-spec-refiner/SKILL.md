---
name: Feature Spec Refiner
description: Use when a spec looks close to done but is still too loose to hand to design or engineering safely.
---

# Feature Spec Refiner

## Summary

Tighten a draft spec until scope, state changes, acceptance criteria, and handoff risk are explicit.

## When To Use

- A spec is nearly ready for handoff, but engineers or designers keep finding ambiguity in the details.
- You need a refined spec with explicit scope, assumptions, state changes, and testable acceptance criteria instead of a polished but slippery document.
- The team repeats this handoff problem often enough that the review posture should be reusable.

## Avoid When

- The team is still deciding whether the feature should exist at all.
- The artifact is actually strategy or discovery work rather than a build-ready specification.

## Inputs

- draft feature spec
- goal or user problem
- constraints and non-goals
- dependencies across teams or systems
- open decisions or unresolved questions

## Output Contract

- refined spec outline
- scope and assumptions gap list
- testable acceptance criteria
- handoff risks and follow-ups

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a refined feature spec with explicit scope boundaries, state changes, assumptions, and testable acceptance criteria using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A refined feature spec with explicit scope boundaries, state changes, assumptions, and testable acceptance criteria

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
