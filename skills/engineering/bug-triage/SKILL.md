---
name: Bug Triage
description: Use when a bug report is real enough to act on but still too messy for a team to prioritize confidently.
---

# Bug Triage

## Summary

Turn a raw bug report into a triage artifact with severity, repro confidence, likely owners, and next actions.

## Why This Skill Matters

Bug triage matters because the cost is not just mislabeling severity. Bad triage sends the wrong people into the wrong problem with the wrong urgency. This skill is for converting noisy reports into grounded next moves.

## When To Use

- An incoming bug report needs structured triage.
- You need a bug triage brief with severity rationale, repro assessment, likely surface area, and next-step ownership instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The task needs direct code execution rather than planning, review, or explanation.
- There is not enough repository or system context to support a grounded output.

## Inputs

- bug report
- logs or screenshots if available
- affected area
- user impact context

## Output Contract

- triage summary
- severity recommendation
- repro notes
- owner suggestions
- next actions

## Workflow

1. Separate observed symptoms, user impact, and speculation about cause.
2. Estimate severity and repro confidence from the evidence actually available.
3. Identify the likely surface area, owner group, and next debugging move.
4. Call out containment or rollback decisions when they materially matter.

## Deliverable Shape

A bug triage brief with severity rationale, repro assessment, likely surface area, and next-step ownership

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Failure Modes To Avoid

- Guessing root cause from a bug report and treating the guess like established fact.
- Equating loud stakeholder attention with actual user impact.
- Marking severity without noting repro confidence or containment urgency.

## Maturity Note

This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.
