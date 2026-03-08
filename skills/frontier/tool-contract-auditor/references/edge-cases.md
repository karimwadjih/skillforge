# Edge Cases

## Partial success is undefined

### Risk

A tool performs multiple side effects, but the contract does not say how mixed outcomes are represented.

### How The Skill Should Respond

Make partial-success states explicit and recommend result shapes that allow agents to recover safely.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.

## Fields are human-friendly but machine-ambiguous

### Risk

Parameters use labels or defaults that a human can guess correctly, but an agent may interpret inconsistently.

### How The Skill Should Respond

Recommend narrower schemas, explicit enums, and defaults that are safe under automation.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.

## Retry semantics can cause harm

### Risk

The contract implies retries are acceptable without defining idempotency or duplicate-effect behavior.

### How The Skill Should Respond

Treat retry behavior as a safety-critical contract dimension and flag unsafe automation paths clearly.

### Failure Probe

The response ignores the complication or hides the uncertainty instead of adapting the workflow.
