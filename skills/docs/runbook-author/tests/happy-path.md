# Happy Path Tests

## Credential rotation runbook happy path

### Prompt

Write a runbook for rotating a production API credential with prerequisites, command order, verification checks, and rollback steps.

### Checks

- Make prerequisites and permissions explicit before the first action.
- Include verification steps after each risky stage.
- Define rollback or containment actions before the runbook ends.

## After-hours queue drain happy path

### Prompt

Create a runbook for after-hours queue drain and recovery with operator checks, failure containment, and escalation rules.

### Checks

- Prioritize operator safety and reversibility over narrative detail.
- Make the stop conditions and escalation triggers obvious.
- Keep the sequence usable for someone who did not write the original system.
