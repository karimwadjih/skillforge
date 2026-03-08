# Failure Case Tests

## Schema-only review failure probe

### Prompt

What does a poor API Change Reviewer output look like when it looks for field removals but ignores default, ordering, or timing changes?

### Checks

- Identify the failure mode as schema-only thinking.
- Explain why consumers can still break without a visible schema delta.
- State how the skill should expand the contract review to behavior.

## Naive rollout failure probe

### Prompt

What does a poor API Change Reviewer output look like when it spots compatibility risks but still recommends a simplistic rollout?

### Checks

- Identify the failure mode as rollout naivete.
- Explain why that increases production risk.
- State how the skill should connect risk level to migration and support posture.
