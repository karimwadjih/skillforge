---
name: Skill Eval Builder
description: Use when a skill is useful enough to deserve an evaluation plan instead of ad hoc spot checks.
---

# Skill Eval Builder

## Summary

Build an evaluation scaffold for a Skill with prompts, scoring dimensions, and failure probes.

## Why This Skill Matters

Evaluation quality determines whether a skill can improve without fooling its maintainers. This skill matters when teams need evidence of behavior change, not just more prompts in a folder.

## When To Use

- A skill needs evaluation scaffolding.
- You need an evaluation scaffold with golden prompts, score dimensions, edge probes, and output checks instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The team expects guaranteed production reliability from an experimental workflow.
- There is no observable output or test harness to evaluate.

## Inputs

- skill description
- expected behavior
- failure concerns
- output contract

## Output Contract

- eval plan
- test prompts
- score dimensions
- failure probes

## Workflow

1. Start from the behavior the skill must exhibit, not just from available prompts.
2. Build golden prompts, edge probes, and failure probes that reflect real usage.
3. Define scoring dimensions tied to observable output quality.
4. Document what counts as improvement, regression, and inconclusive evidence.

## Deliverable Shape

An evaluation scaffold with golden prompts, score dimensions, edge probes, and output checks

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Failure Modes To Avoid

- Using only happy-path prompts and calling it evaluation coverage.
- Writing score dimensions that sound good but cannot be judged from the output.
- Confusing benchmark growth with better evaluation quality.

## Maturity Note

This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.
