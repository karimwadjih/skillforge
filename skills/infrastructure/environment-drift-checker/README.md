# Environment Drift Checker

Check for environment drift and summarize what changed, why it matters, and where to verify.

## Quick View

- Category: `infrastructure`
- Maturity: `experimental`
- Tier: `seeded`
- Evaluation status: `unbenchmarked`

## What This Skill Does

Configuration drift is easy to notice and hard to explain cleanly enough for action.

## When To Reach For It

- A team suspects environment drift.
- Operators need a structured summary of differences across environments.

## What You Should Provide

- environment configs
- expected baseline
- known incidents

## What You Should Get Back

- drift summary
- difference list
- verification priorities

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
