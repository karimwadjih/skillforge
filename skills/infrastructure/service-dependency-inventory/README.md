# Service Dependency Inventory

Inventory dependencies for a service and explain which ones matter most operationally.

## Quick View

- Category: `infrastructure`
- Maturity: `experimental`
- Tier: `seeded`
- Evaluation status: `unbenchmarked`

## What This Skill Does

Dependency sprawl creates hidden risk unless the team can see which links are truly critical.

## When To Reach For It

- A service dependency inventory is needed for planning or resilience review.
- Teams want a clearer dependency picture before change or migration work.

## What You Should Provide

- service context
- dependency list
- known critical paths

## What You Should Get Back

- dependency inventory
- critical path notes
- risk summary

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
