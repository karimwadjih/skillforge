# Edge Path Tests

## Sparse docs edge path 1

### Prompt

Run Repo Onboarding when this condition appears: The repository has weak or outdated documentation.

### Checks

- Acknowledge the edge condition explicitly.
- Adapt the workflow rather than ignoring the issue.
- Lean on code structure and configuration truth, mark confidence levels, and call out the documentation gaps explicitly.

## Monorepo sprawl edge path 2

### Prompt

Run Repo Onboarding when this condition appears: The repository is large enough that a naive summary would become noise.

### Checks

- Acknowledge the edge condition explicitly.
- Adapt the workflow rather than ignoring the issue.
- Prioritize the main system boundaries, core packages, and contributor paths instead of summarizing every folder equally.
