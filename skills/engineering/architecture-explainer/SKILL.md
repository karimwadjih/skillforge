---
name: Architecture Explainer
description: Use when someone needs a reliable architectural explanation rather than a folder-by-folder description.
---

# Architecture Explainer

## Summary

Explain a system or codebase architecture in a way that is grounded, digestible, and useful for future work.

## Why This Skill Matters

Architecture explanations fail when they either oversimplify into platitudes or drown readers in implementation detail. This skill matters when someone needs a mental model that is accurate enough to guide future changes.

## When To Use

- A system needs to be explained to new contributors or adjacent teams.
- You need an architecture explainer with system boundaries, component roles, flows, tradeoffs, and known complexity hotspots instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The task needs direct code execution rather than planning, review, or explanation.
- There is not enough repository or system context to support a grounded output.

## Inputs

- codebase or architecture artifacts
- audience
- system boundaries
- known pain points

## Output Contract

- architecture overview
- component map
- data or control flow summary
- key tradeoffs

## Workflow

1. Choose the explanation level for the audience before summarizing components.
2. Map the system boundaries, core flows, and critical dependencies.
3. Name the architectural tradeoffs and complexity hotspots that matter for future work.
4. Finish with a short glossary and open questions for follow-up review.

## Deliverable Shape

An architecture explainer with system boundaries, component roles, flows, tradeoffs, and known complexity hotspots

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Failure Modes To Avoid

- Turning code structure into an architecture explanation without showing runtime behavior.
- Explaining every component equally instead of focusing on leverage points and boundaries.
- Describing the current shape without naming the tradeoffs it imposes on future work.

## Maturity Note

This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.
