# Architecture Explainer

Explain a system or codebase architecture in a way that is grounded, digestible, and useful for future work.

## Quick View

- Category: `engineering`
- Maturity: `frontier`
- Tier: `flagship`
- Evaluation status: `benchmarked`

## What This Skill Does

Architecture explanations are often either too shallow to help or too exhaustive to read.

## Why This Skill Matters

Architecture explanations fail when they either oversimplify into platitudes or drown readers in implementation detail. This skill matters when someone needs a mental model that is accurate enough to guide future changes.

## What Makes It Different

- Chooses the audience level explicitly before explaining the system.
- Explains boundaries, flows, and tradeoffs rather than just component names.
- Calls out complexity hotspots and open questions instead of pretending the design is cleaner than it is.

## When To Reach For It

- A system needs to be explained to new contributors or adjacent teams.
- Architecture details exist in code but not in a digestible narrative.

## What You Should Provide

- codebase or architecture artifacts
- audience
- system boundaries
- known pain points

## What You Should Get Back

- architecture overview
- component map
- data or control flow summary
- key tradeoffs

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.
