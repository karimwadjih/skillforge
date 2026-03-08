# Runbook Author

Turn fragile procedural knowledge into a runbook operators can follow and verify under pressure.

## Quick View

- Category: `docs`
- Maturity: `frontier`
- Tier: `developed`
- Evaluation status: `sampled`

## What This Skill Does

Many runbooks read well in a calm review and fail in real use because they bury prerequisites, verification, rollback, or escalation exactly where an operator needs them most.

## When To Reach For It

- A procedure matters enough operationally that relying on tribal memory is now risky.
- An operator-facing workflow needs verification steps, failure containment, and escalation guidance before it is safe to reuse.

## What You Should Provide

- procedure or incident notes
- system or environment context
- prerequisites and permissions
- known failure points
- rollback or escalation options

## What You Should Get Back

- runbook draft
- step-by-step procedure
- verification checks
- rollback and escalation notes

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
