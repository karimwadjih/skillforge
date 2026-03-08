# Deployment Readiness Review

Review whether a release is actually ready to roll out, observe, and reverse if needed.

## Quick View

- Category: `infrastructure`
- Maturity: `frontier`
- Tier: `developed`
- Evaluation status: `sampled`

## What This Skill Does

Teams confuse launch confidence with launch readiness. A release is only ready if the rollout, monitoring, rollback, and operator handoff are credible under the actual risk profile.

## When To Reach For It

- A service or feature is approaching release and the team needs a real go or no-go read instead of optimism.
- The launch path depends on rollout controls, monitoring, rollback posture, or operational coordination that could still fail.

## What You Should Provide

- release or change summary
- dependencies and rollout plan
- monitoring and alerting posture
- rollback or containment options
- known risks or unresolved checks

## What You Should Get Back

- deployment readiness review
- go or no-go risk summary
- rollout notes
- monitoring and rollback gaps

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
