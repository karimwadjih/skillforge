# Migration Planner

Plan a code, data, or platform migration with dependencies, sequence, and rollback considerations.

## Quick View

- Category: `engineering`
- Maturity: `frontier`
- Tier: `developed`
- Evaluation status: `sampled`

## What This Skill Does

Migrations accumulate hidden coupling and often fail because the team underestimates sequence and rollback planning.

## When To Reach For It

- A system, library, or data migration needs a staged plan.
- The migration risk is high enough that sequencing must be explicit.

## What You Should Provide

- migration target
- current state
- constraints
- dependencies

## What You Should Get Back

- migration plan
- dependency map
- risk list
- rollback notes

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
