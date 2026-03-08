# Tool Contract Auditor

Audit a tool contract for ambiguous parameters, missing guarantees, and agent-hostile failure behavior.

## Quick View

- Category: `frontier`
- Maturity: `frontier`
- Tier: `developed`
- Evaluation status: `sampled`

## What This Skill Does

Tools often look workable until an agent hits ambiguous parameters, unclear partial-success states, or retry behavior that can cause duplicate or destructive actions.

## When To Reach For It

- A tool or API is meant for agents, but the contract still reads like it was designed only for humans.
- The workflow depends on a tool whose inputs, outputs, or failure semantics are underspecified.

## What You Should Provide

- tool description or schema
- parameter and response definitions
- known execution behavior
- retry or failure handling expectations
- examples of current usage if available

## What You Should Get Back

- tool contract audit
- ambiguity list
- failure and retry risk notes
- recommended contract fixes

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
