# Happy Path Tests

## Feature-flagged release with migration risk happy path

### Prompt

Review this feature-flagged launch for real deployment readiness, including whether the flag meaningfully reduces risk, what still needs monitoring, and what should block rollout.

### Checks

- Treat the flag as one control, not as automatic proof of safe rollout.
- Surface migration and support-readiness risk alongside code readiness.
- State what should block rollout if unresolved.

## Data-pipeline upgrade under time pressure happy path

### Prompt

Review the readiness of the data-pipeline upgrade, including gating checks, monitoring gaps, on-call posture, and whether the launch should slip.

### Checks

- Use go or no-go language instead of vague risk commentary.
- Make monitoring and on-call readiness first-class gates.
- Explain when slipping the launch is the stronger operational decision.
