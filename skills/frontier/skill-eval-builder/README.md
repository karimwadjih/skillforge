# Skill Eval Builder

Build an evaluation scaffold for a Skill with prompts, scoring dimensions, and failure probes.

## Quick View

- Category: `frontier`
- Maturity: `frontier`
- Tier: `flagship`
- Evaluation status: `benchmarked`

## What This Skill Does

Good skills remain untrusted when teams never turn quality expectations into an explicit evaluation plan.

## Why This Skill Matters

Evaluation quality determines whether a skill can improve without fooling its maintainers. This skill matters when teams need evidence of behavior change, not just more prompts in a folder.

## What Makes It Different

- Starts from required behavior and failure modes before generating prompts.
- Builds golden prompts, edge probes, and failure probes as separate instruments with different jobs.
- Makes scoring dimensions observable so results can drive revision instead of argument.

## When To Reach For It

- A skill needs evaluation scaffolding.
- A team wants prompts, score dimensions, and failure probes for a workflow skill.

## What You Should Provide

- skill description
- expected behavior
- failure concerns
- output contract

## What You Should Get Back

- eval plan
- test prompts
- score dimensions
- failure probes

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.
