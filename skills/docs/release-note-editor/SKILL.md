---
name: Release Note Editor
description: Use when release notes exist but need a sharper edit before publication.
---

# Release Note Editor

## Summary

Edit release notes for clarity, audience fit, and upgrade usefulness.

## When To Use

- Release notes need audience-aware editing.
- You need a release-note edit with clearer structure, audience framing, and upgrade guidance instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The product behavior itself is still changing faster than the docs could stabilize.
- There is no source material to document or clarify yet.

## Inputs

- draft release notes
- audience
- version context

## Output Contract

- edited release notes
- clarity suggestions
- upgrade highlights

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a release-note edit with clearer structure, audience framing, and upgrade guidance using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A release-note edit with clearer structure, audience framing, and upgrade guidance

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
