---
name: Incident Retrospective Writer
description: Use when a team needs a clean retrospective draft from notes, timelines, and remediation records.
---

# Incident Retrospective Writer

## Summary

Draft a structured retrospective after an incident with chronology, causes, and follow-ups.

## When To Use

- An incident occurred and the follow-up needs a structured write-up.
- You need an incident retrospective with impact, timeline, contributing factors, lessons, and follow-up actions instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The task needs direct code execution rather than planning, review, or explanation.
- There is not enough repository or system context to support a grounded output.

## Inputs

- timeline
- impact summary
- remediation actions
- open questions

## Output Contract

- retrospective draft
- chronology
- root-cause analysis
- follow-up actions

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build an incident retrospective with impact, timeline, contributing factors, lessons, and follow-up actions using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

An incident retrospective with impact, timeline, contributing factors, lessons, and follow-up actions

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
