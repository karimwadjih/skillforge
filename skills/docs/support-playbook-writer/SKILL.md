---
name: Support Playbook Writer
description: Use when support teams need a repeatable handling guide rather than tribal knowledge.
---

# Support Playbook Writer

## Summary

Write a support playbook for recurring issue types and escalation routes.

## When To Use

- Support handling is inconsistent for a recurring issue type.
- You need a support playbook with issue classification, response guidance, escalation steps, and resolution notes instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The product behavior itself is still changing faster than the docs could stabilize.
- There is no source material to document or clarify yet.

## Inputs

- issue types
- resolution notes
- escalation rules

## Output Contract

- support playbook
- handling guidance
- escalation map

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a support playbook with issue classification, response guidance, escalation steps, and resolution notes using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A support playbook with issue classification, response guidance, escalation steps, and resolution notes

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
