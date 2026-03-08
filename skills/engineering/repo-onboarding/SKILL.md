---
name: Repo Onboarding
description: Use when someone needs to get productive in a repository quickly without reverse-engineering the whole system from scratch.
---

# Repo Onboarding

## Summary

Turn an unfamiliar codebase into a fast-start onboarding brief with setup, architecture, and first-task guidance.

## Why This Skill Matters

Most onboarding artifacts explain the directory tree. Very few reduce time-to-first-change. This skill matters when a new contributor needs a safe path into a live codebase, not an architecture lecture.

## When To Use

- A new engineer needs to understand a repository quickly.
- You need an onboarding brief with setup order, architecture map, terminology, key workflows, risks, and suggested first contributions instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- The task needs direct code execution rather than planning, review, or explanation.
- There is not enough repository or system context to support a grounded output.

## Inputs

- repository tree
- package manifests
- configuration files
- docs or recent PRs if available

## Output Contract

- onboarding brief
- setup sequence
- system map
- first-task suggestions
- open questions

## Workflow

1. Inspect the repository shape, package manifests, and primary runtime boundaries.
2. Trace the build, test, and local-development path in the order a new contributor actually needs it.
3. Map the major packages, services, or apps to their responsibilities and dependencies.
4. Identify the safest first tasks and the highest-confidence unresolved questions.

## Deliverable Shape

An onboarding brief with setup order, architecture map, terminology, key workflows, risks, and suggested first contributions

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Failure Modes To Avoid

- Listing folders without telling the reader which ones they will actually touch first.
- Dumping setup commands without warning about prerequisites, secrets, or environment traps.
- Suggesting a first task that is risky, overloaded, or blocked on tribal knowledge.

## Maturity Note

This Skill is marked `certified` because it meets the benchmark, scoring, and manual-review requirements defined in `certification/`.
