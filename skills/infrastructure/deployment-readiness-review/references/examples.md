# Examples

## Feature-flagged release with migration risk

### Scenario

A feature is technically behind a flag, but the release still includes a migration and changes to support workflows.

### Prompt

Review this feature-flagged launch for real deployment readiness, including whether the flag meaningfully reduces risk, what still needs monitoring, and what should block rollout.

### Strong Response Should

- Treat the flag as one control, not as automatic proof of safe rollout.
- Surface migration and support-readiness risk alongside code readiness.
- State what should block rollout if unresolved.

## Mobile backend rollout

### Scenario

A backend change will affect a mobile client population that updates slowly, so rollback and observability posture matter more than usual.

### Prompt

Produce a deployment readiness review for the backend rollout with client-version risk, monitoring posture, and rollback realism.

### Strong Response Should

- Account for mixed client populations and delayed upgrades.
- Tie monitoring to the failure modes most likely to surface first.
- Be honest about what rollback can and cannot undo once traffic shifts.

## Data-pipeline upgrade under time pressure

### Scenario

A data-platform team wants to ship an upgrade before quarter close, but monitoring coverage and rollback clarity are both weaker than they should be.

### Prompt

Review the readiness of the data-pipeline upgrade, including gating checks, monitoring gaps, on-call posture, and whether the launch should slip.

### Strong Response Should

- Use go or no-go language instead of vague risk commentary.
- Make monitoring and on-call readiness first-class gates.
- Explain when slipping the launch is the stronger operational decision.
