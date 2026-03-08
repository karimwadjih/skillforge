---
name: Deployment Readiness Review
description: Use when a release needs a disciplined readiness review, not a ceremonial checklist pass.
---

# Deployment Readiness Review

## Summary

Review whether a release is actually ready to roll out, observe, and reverse if needed.

## When To Use

- A service or feature is approaching release and the team needs a real go or no-go read instead of optimism.
- You need a readiness review with gating logic, rollout realism, monitoring posture, and rollback credibility instead of a checklist that everyone wants to pass.
- The organization repeats launch decisions often enough that the review stance should be reusable.

## Avoid When

- The change is still too early for release planning and basic implementation facts are missing.
- You only need a deployment procedure, not a go or no-go review.

## Inputs

- release or change summary
- dependencies and rollout plan
- monitoring and alerting posture
- rollback or containment options
- known risks or unresolved checks

## Output Contract

- deployment readiness review
- go or no-go risk summary
- rollout notes
- monitoring and rollback gaps

## Workflow

1. Confirm the decision context, audience, and missing inputs.
2. Build a deployment readiness review with gating logic, rollout plan, monitoring posture, rollback credibility, and unresolved risks using the available evidence and constraints.
3. Separate facts from assumptions and make confidence explicit.
4. Finish with next actions, open questions, or escalation notes.

## Deliverable Shape

A deployment readiness review with gating logic, rollout plan, monitoring posture, rollback credibility, and unresolved risks

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

## Maturity Note

This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.
