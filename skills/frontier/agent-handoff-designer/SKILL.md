---
name: Agent Handoff Designer
description: Use when an agent workflow crosses stages and the handoff needs more structure and fewer assumptions.
---

# Agent Handoff Designer

## Summary

Design a handoff between agents or workflow stages with explicit contracts.

## When To Use

- A workflow has multiple agent or human-agent stages.
- You need a handoff design with stage boundaries, context contract, failure modes, and fallback behavior instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The team expects guaranteed production reliability from an experimental workflow.
- There is no observable output or test harness to evaluate.

## Inputs

- workflow stages
- handoff points
- required context

## Output Contract

- handoff design
- contract notes
- failure points

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a handoff design with stage boundaries, context contract, failure modes, and fallback behavior using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A handoff design with stage boundaries, context contract, failure modes, and fallback behavior

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
