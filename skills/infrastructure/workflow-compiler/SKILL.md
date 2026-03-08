---
name: Workflow Compiler
description: Use when a repeated human workflow needs to become a portable skill instead of a loose sequence of instructions.
---

# Workflow Compiler

## Summary

Compile a human workflow into a reusable, explicit skill package with steps, inputs, outputs, and failure handling.

## Why This Skill Matters

A repeated workflow is not reusable until its stages, contracts, and failure handling are explicit. This skill matters when teams want to turn operational know-how into a portable package instead of a loose prompt or tribal process.

## When To Use

- A workflow is repeated often enough to encode into a reusable skill.
- You need a compiled workflow package with step sequence, contracts, edge handling, and starter evaluation prompts instead of unstructured notes.
- The workflow repeats often enough to justify a reusable asset.

## Avoid When

- You need direct infrastructure access rather than a preparation or review artifact.
- The environment inventory is missing entirely.

## Inputs

- workflow description
- inputs
- operators
- failure conditions
- desired outputs

## Output Contract

- compiled workflow
- skill scaffold
- guardrails
- test prompts

## Workflow

1. Break the human workflow into explicit stages, decision points, and required context.
2. Define the input contract, output contract, and failure behaviors for each stage.
3. Reduce ambiguous instructions into reusable, testable workflow steps.
4. Emit a starter skill package plus evaluation prompts for the workflow.

## Deliverable Shape

A compiled workflow package with step sequence, contracts, edge handling, and starter evaluation prompts

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Failure Modes To Avoid

- Encoding the happy path only and pretending the workflow is now reusable.
- Writing natural-language steps without specifying the input and output contract at each stage.
- Compiling a workflow that still depends on hidden judgment calls nobody documented.

## Maturity Note

This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.
