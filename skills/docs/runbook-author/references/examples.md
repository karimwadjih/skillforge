# Examples

## Credential rotation runbook

### Scenario

A platform team rotates production credentials infrequently enough that nobody remembers the exact sequence, but often enough that the risk is real.

### Prompt

Write a runbook for rotating a production API credential with prerequisites, command order, verification checks, and rollback steps.

### Strong Response Should

- Make prerequisites and permissions explicit before the first action.
- Include verification steps after each risky stage.
- Define rollback or containment actions before the runbook ends.

## Region failover runbook

### Scenario

An infrastructure team needs a cleaner operator document for controlled regional failover during high-pressure incidents.

### Prompt

Author a runbook for controlled regional failover with prechecks, execution steps, verification, and escalation guidance for degraded rollback conditions.

### Strong Response Should

- Keep the steps legible under pressure instead of overexplaining architecture.
- Separate prechecks, execution, and validation clearly.
- State what to do if rollback conditions are not healthy.

## After-hours queue drain

### Scenario

Support and operations need a safe procedure for draining a stuck background queue overnight without guessing which steps are reversible.

### Prompt

Create a runbook for after-hours queue drain and recovery with operator checks, failure containment, and escalation rules.

### Strong Response Should

- Prioritize operator safety and reversibility over narrative detail.
- Make the stop conditions and escalation triggers obvious.
- Keep the sequence usable for someone who did not write the original system.
