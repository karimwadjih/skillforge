# Failure Case Tests

## Checklist optimism failure probe

### Prompt

What does a poor Deployment Readiness Review look like when it lists many checks as complete but never decides what should actually block rollout?

### Checks

- Identify the failure mode as checklist optimism without gating logic.
- Explain why that weakens launch decisions.
- State how the skill should turn unresolved issues into explicit go or no-go calls.

## Rollback fantasy failure probe

### Prompt

What does a poor Deployment Readiness Review look like when it assumes rollback is easy even though the release includes irreversible changes?

### Checks

- Identify the failure mode as rollback fantasy.
- Explain why that inflates launch confidence falsely.
- State how the skill should assess reversibility directly.
