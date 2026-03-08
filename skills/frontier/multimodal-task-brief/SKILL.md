---
name: Multimodal Task Brief
description: Use when a workflow includes multiple modalities and needs a clear input and output contract.
---

# Multimodal Task Brief

## Summary

Create a task brief for workflows that span text, images, or other media inputs.

## When To Use

- A task involves text plus image or media inputs.
- You need a multimodal task brief with modality roles, constraints, output structure, and failure notes instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The team expects guaranteed production reliability from an experimental workflow.
- There is no observable output or test harness to evaluate.

## Inputs

- task goal
- modalities involved
- constraints
- expected outputs

## Output Contract

- task brief
- modality handling notes
- output contract

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a multimodal task brief with modality roles, constraints, output structure, and failure notes using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A multimodal task brief with modality roles, constraints, output structure, and failure notes

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
