---
name: Changelog Composer
description: Use when raw change inputs need to become a readable changelog for users or contributors.
---

# Changelog Composer

## Summary

Compose a clear changelog entry set from commits, PRs, or release notes.

## When To Use

- Release changes need a human-readable changelog.
- You need a changelog draft with grouped changes, highlights, impact notes, and upgrade cautions instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The product behavior itself is still changing faster than the docs could stabilize.
- There is no source material to document or clarify yet.

## Inputs

- change list
- audience
- version context

## Output Contract

- changelog draft
- highlights
- upgrade notes

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a changelog draft with grouped changes, highlights, impact notes, and upgrade cautions using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A changelog draft with grouped changes, highlights, impact notes, and upgrade cautions

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
