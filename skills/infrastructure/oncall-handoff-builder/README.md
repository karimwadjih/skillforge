# Oncall Handoff Builder

Build an on-call handoff that captures current issues, watch items, and operating context.

## Quick View

- Category: `infrastructure`
- Maturity: `frontier`
- Tier: `developed`
- Evaluation status: `sampled`

## What This Skill Does

On-call handoffs fail when context transfer is too thin, especially around unresolved issues and timing-sensitive changes.

## When To Reach For It

- An on-call shift handoff needs a stronger summary.
- Operators need to transfer current context, risks, and watch items.

## What You Should Provide

- current incidents
- watch items
- pending changes
- operator notes

## What You Should Get Back

- handoff brief
- watch list
- risks
- follow-up notes

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
