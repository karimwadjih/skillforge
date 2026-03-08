---
name: API Change Reviewer
description: Use when an API change needs a contract review that goes beyond the diff.
---

# API Change Reviewer

## Summary

Review an API change for silent behavior shifts, consumer blast radius, and rollout realism.

## When To Use

- An API shape or default is changing and downstream consumers may break or behave differently.
- You need a review with compatibility analysis, hidden behavioral change detection, blast-radius reasoning, and rollout guidance instead of a code review summary.
- The organization repeats this pattern enough that the review logic should be reusable.

## Avoid When

- You only need schema linting or code-generation checks.
- The contract is still entirely private and there are no meaningful consumers yet.

## Inputs

- current API contract or behavior
- proposed change
- known consumers or consumer types
- rollout, deprecation, or migration plan
- known monitoring or support constraints

## Output Contract

- API review brief
- compatibility analysis
- consumer-risk map
- rollout and migration recommendations

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build an api change review with compatibility analysis, hidden behavioral changes, consumer blast radius, and rollout guidance using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

An API change review with compatibility analysis, hidden behavioral changes, consumer blast radius, and rollout guidance

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
