# Workflow Compiler

Compile a human workflow into a reusable, explicit skill package with steps, inputs, outputs, and failure handling.

## Quick View

- Category: `infrastructure`
- Maturity: `frontier`
- Tier: `flagship`
- Evaluation status: `benchmarked`

## What This Skill Does

Teams often know the workflow they want but fail to formalize it into reusable, evaluable structure.

## Why This Skill Matters

A repeated workflow is not reusable until its stages, contracts, and failure handling are explicit. This skill matters when teams want to turn operational know-how into a portable package instead of a loose prompt or tribal process.

## What Makes It Different

- Breaks a workflow into contracts and decision points, not just ordered instructions.
- Treats ambiguity and failure handling as first-class design concerns.
- Produces both the workflow package and the starter evaluation frame around it.

## When To Reach For It

- A workflow is repeated often enough to encode into a reusable skill.
- A team needs to turn human process knowledge into an explicit workflow package.

## What You Should Provide

- workflow description
- inputs
- operators
- failure conditions
- desired outputs

## What You Should Get Back

- compiled workflow
- skill scaffold
- guardrails
- test prompts

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.
