# Edge Cases

## Behavior changes without schema diffs

### Risk

Defaults, ordering, retry timing, or nullability semantics change even though the surface looks almost identical.

### How The Skill Should Respond

Treat behavior as contract and make the hidden breakage risk explicit.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.

## Some consumers are unknown

### Risk

The team cannot confidently enumerate all callers, making a clean migration story impossible to assume.

### How The Skill Should Respond

Lower confidence, recommend defensive rollout steps, and avoid pretending the blast radius is fully mapped.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.

## Versioning promises more safety than reality

### Risk

A version bump or alias exists, but migration guidance, support windows, and observability are still weak.

### How The Skill Should Respond

Review migration posture as seriously as the contract change itself and call out where versioning is mostly cosmetic.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.
