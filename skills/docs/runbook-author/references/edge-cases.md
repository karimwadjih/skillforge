# Edge Cases

## Environment-specific variation matters

### Risk

A procedure differs across staging, prod, regions, or tenancy models, but the draft runbook reads as universal.

### How The Skill Should Respond

Separate environment-specific branches clearly and avoid writing one generic sequence that is wrong in multiple places.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.

## Some steps require elevated access

### Risk

An operator reaches the critical step and discovers that permissions, approvals, or secure context were never specified.

### How The Skill Should Respond

Pull access requirements into prerequisites and mark privileged steps clearly before execution starts.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.

## Rollback path is untested

### Risk

The team assumes rollback is available, but nobody has validated it recently.

### How The Skill Should Respond

Mark rollback confidence honestly, add containment guidance, and avoid presenting an untested path as guaranteed.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.
