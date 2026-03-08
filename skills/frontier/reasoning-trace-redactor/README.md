# Reasoning Trace Redactor

Design a safe redaction approach for internal reasoning traces or sensitive analysis artifacts.

## Quick View

- Category: `frontier`
- Maturity: `scaffold`
- Tier: `seeded`
- Evaluation status: `unbenchmarked`

## What This Skill Does

Teams frequently need to share outputs without sharing every intermediate note or sensitive detail.

## When To Reach For It

- A team wants to share an analysis artifact without exposing sensitive internal traces.
- Reasoning or review notes need a structured redaction pass.

## What You Should Provide

- artifact to redact
- sharing audience
- sensitivity concerns

## What You Should Get Back

- redaction plan
- safe-share artifact notes
- risk warnings

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
