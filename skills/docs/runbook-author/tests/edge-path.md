# Edge Path Tests

## Environment branch edge path

### Prompt

Run Runbook Author when the procedure differs materially across regions and production tenants.

### Checks

- Separate environment-specific branches clearly.
- Avoid pretending one sequence works everywhere.
- Keep the operator from choosing the wrong path under pressure.

## Untested rollback edge path

### Prompt

Run Runbook Author when rollback is assumed to exist but has not been validated recently.

### Checks

- Mark rollback confidence honestly.
- Add containment guidance if rollback is shaky.
- Avoid presenting the rollback path as guaranteed.
