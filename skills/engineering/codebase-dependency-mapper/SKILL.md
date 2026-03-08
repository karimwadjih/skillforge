---
name: Codebase Dependency Mapper
description: Use when a repository's internal and external dependencies need to be explained for planning or onboarding.
---

# Codebase Dependency Mapper

## Summary

Map important dependencies in a codebase and explain why they matter.

## When To Use

- A team needs a dependency map for a codebase.
- You need a dependency map with critical paths, integration surfaces, and maintenance hotspots instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The task needs direct code execution rather than planning, review, or explanation.
- There is not enough repository or system context to support a grounded output.

## Inputs

- repository structure
- dependency manifests
- service boundaries

## Output Contract

- dependency map
- risk notes
- change hotspots

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a dependency map with critical paths, integration surfaces, and maintenance hotspots using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A dependency map with critical paths, integration surfaces, and maintenance hotspots

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.
