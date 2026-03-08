# Agent Handoff Designer

Design a handoff between agents or workflow stages with explicit contracts.

## Quick View

- Category: `frontier`
- Maturity: `experimental`
- Tier: `seeded`
- Evaluation status: `unbenchmarked`

## What This Skill Does

Multi-stage workflows break when handoffs rely on implicit context or undefined output shape.

## When To Reach For It

- A workflow has multiple agent or human-agent stages.
- A handoff contract needs to be specified to reduce dropped context.

## What You Should Provide

- workflow stages
- handoff points
- required context

## What You Should Get Back

- handoff design
- contract notes
- failure points

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
