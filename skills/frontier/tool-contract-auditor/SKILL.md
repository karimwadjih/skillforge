---
name: Tool Contract Auditor
description: Use when a tool contract needs to survive agent use, retries, and machine interpretation instead of relying on human guesswork.
---

# Tool Contract Auditor

## Summary

Audit a tool contract for ambiguous parameters, missing guarantees, and agent-hostile failure behavior.

## When To Use

- A tool or API is meant for agents, but the contract still reads like it was designed only for humans.
- You need an audit of parameter semantics, failure semantics, and safe retry behavior instead of a schema review alone.
- The organization will reuse the tool enough that contract quality has long-tail impact on agent reliability.

## Avoid When

- The tool is still too early to have meaningful contract expectations.
- You only need implementation debugging rather than contract analysis.

## Inputs

- tool description or schema
- parameter and response definitions
- known execution behavior
- retry or failure handling expectations
- examples of current usage if available

## Output Contract

- tool contract audit
- ambiguity list
- failure and retry risk notes
- recommended contract fixes

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a tool contract audit with ambiguity findings, failure and retry risks, and recommended contract fixes using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A tool contract audit with ambiguity findings, failure and retry risks, and recommended contract fixes

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
