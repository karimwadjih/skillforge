---
name: Prompt Regression Hunter
description: Use when an updated skill may have improved one area while quietly breaking another.
---

# Prompt Regression Hunter

## Summary

Hunt for regressions between prompt or skill versions using consistent comparisons.

## When To Use

- A skill or prompt changed and regression checking is needed.
- You need a regression brief with changed behavior, risk cases, and recommended follow-up evaluation instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The team expects guaranteed production reliability from an experimental workflow.
- There is no observable output or test harness to evaluate.

## Inputs

- version A
- version B
- comparison cases
- scoring focus

## Output Contract

- regression brief
- difference summary
- risk cases

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a regression brief with changed behavior, risk cases, and recommended follow-up evaluation using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A regression brief with changed behavior, risk cases, and recommended follow-up evaluation

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
