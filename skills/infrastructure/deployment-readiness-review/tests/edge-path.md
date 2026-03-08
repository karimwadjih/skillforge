# Edge Path Tests

## Flag is not rollback edge path

### Prompt

Run Deployment Readiness Review when a team argues that a feature flag makes the rollout safe even though the release also changes data and support behavior.

### Checks

- Separate traffic control from true rollback.
- Keep residual risk visible.
- Avoid approving launch on flag logic alone.

## Unbriefed on-call edge path

### Prompt

Run Deployment Readiness Review when the release team is prepared but on-call and support have not been briefed on the likely failure modes.

### Checks

- Treat operational briefing as part of launch readiness.
- Keep on-call posture in the gate, not as a later follow-up.
- Show how the missing handoff changes launch confidence.
