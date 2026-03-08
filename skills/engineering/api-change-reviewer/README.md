# API Change Reviewer

Review an API change for silent behavior shifts, consumer blast radius, and rollout realism.

## Quick View

- Category: `engineering`
- Maturity: `frontier`
- Tier: `developed`
- Evaluation status: `sampled`

## What This Skill Does

API changes fail less often because a field disappeared than because behavior, defaults, timing, or migration posture changed without a disciplined review of real consumers.

## When To Reach For It

- An API shape or default is changing and downstream consumers may break or behave differently.
- A seemingly small contract change could hide migration, deprecation, or observability risk.

## What You Should Provide

- current API contract or behavior
- proposed change
- known consumers or consumer types
- rollout, deprecation, or migration plan
- known monitoring or support constraints

## What You Should Get Back

- API review brief
- compatibility analysis
- consumer-risk map
- rollout and migration recommendations

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
