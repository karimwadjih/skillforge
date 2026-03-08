---
name: Escalation Path Auditor
description: Use when an escalation process exists but does not behave clearly under pressure.
---

# Escalation Path Auditor

## Summary

Audit an escalation path for clarity, timing, and owner confusion.

## When To Use

- An escalation path needs review after confusion or delay.
- You need an escalation audit with trigger gaps, owner gaps, timing issues, and improvement recommendations instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The update requires live operational data that has not been gathered.
- You need a human decision-maker to resolve a conflict before summarizing it.

## Inputs

- current escalation process
- owners
- incident examples

## Output Contract

- audit summary
- failure points
- improvement recommendations

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build an escalation audit with trigger gaps, owner gaps, timing issues, and improvement recommendations using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

An escalation audit with trigger gaps, owner gaps, timing issues, and improvement recommendations

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
