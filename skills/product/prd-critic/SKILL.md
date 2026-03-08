---
name: PRD Critic
description: Use when a PRD exists but needs a serious review before engineering, design, or leadership align around it.
---

# PRD Critic

## Summary

Critique a product requirements document for clarity, scope, risk, and execution readiness.

## Why This Skill Matters

PRDs fail less often because of sentence-level writing problems than because they smuggle in weak assumptions, undefined scope, and missing decision logic. This skill matters before teams commit engineering time to the wrong shape of work.

## When To Use

- A PRD is drafted and needs rigorous critique before commitment.
- You need a structured critique covering problem clarity, scope quality, assumptions, risks, and revision priorities instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The team has not defined the product area or user segment at all yet.
- You need direct user validation rather than a synthesis artifact.

## Inputs

- product requirements document
- strategy context
- constraints
- target audience

## Output Contract

- critique summary
- gap list
- risk list
- revision recommendations

## Workflow

1. Read the PRD for the core problem statement, target user, and success logic before judging scope.
2. Stress-test scope boundaries, assumptions, and missing operational dependencies.
3. Mark weak requirements, missing acceptance criteria, and places where evidence is thin.
4. Return a revision sequence ordered by impact rather than by document order.

## Deliverable Shape

A structured critique covering problem clarity, scope quality, assumptions, risks, and revision priorities

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Failure Modes To Avoid

- Rewriting the PRD into cleaner English without confronting the broken logic underneath.
- Treating every gap as equal priority instead of separating fatal issues from polish issues.
- Accepting metrics or success criteria that do not actually prove the product bet worked.

## Maturity Note

This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.
