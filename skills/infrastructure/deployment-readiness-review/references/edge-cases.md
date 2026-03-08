# Edge Cases

## Feature flag is mistaken for rollback

### Risk

The team treats a flag as equivalent to rollback even though data changes, side effects, or support impact are not reversible.

### How The Skill Should Respond

Separate traffic control from true rollback and make the residual risk explicit.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.

## Migration is hard to reverse

### Risk

A schema or data migration introduces irreversible or high-cost rollback conditions.

### How The Skill Should Respond

Treat migration reversibility as a first-class gate and avoid approving rollout on flag logic alone.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.

## On-call is not briefed

### Risk

The release team is ready, but the operators who will absorb the failure modes are not prepared.

### How The Skill Should Respond

Include on-call briefing, support posture, and escalation readiness in the release gate instead of treating them as post-launch details.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.
