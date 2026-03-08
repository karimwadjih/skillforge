# PRD Critic

Critique a product requirements document for clarity, scope, risk, and execution readiness.

## Quick View

- Category: `product`
- Maturity: `frontier`
- Tier: `flagship`
- Evaluation status: `benchmarked`

## What This Skill Does

PRDs often look complete on the surface while hiding missing assumptions, weak scope boundaries, or unresolved risks.

## Why This Skill Matters

PRDs fail less often because of sentence-level writing problems than because they smuggle in weak assumptions, undefined scope, and missing decision logic. This skill matters before teams commit engineering time to the wrong shape of work.

## What Makes It Different

- Interrogates the decision logic of the document, not just its prose quality.
- Separates missing evidence from missing detail so teams know what must be researched versus merely clarified.
- Returns a revision order that tells the author what to fix first.

## When To Reach For It

- A PRD is drafted and needs rigorous critique before commitment.
- The team suspects a requirements doc is vague, bloated, or risky.

## What You Should Provide

- product requirements document
- strategy context
- constraints
- target audience

## What You Should Get Back

- critique summary
- gap list
- risk list
- revision recommendations

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.
