# Happy Path Tests

## Public REST field deprecation happy path

### Prompt

Review the proposed deprecation of a public response field and summarize compatibility risk, likely consumer breakage, and the minimum safe migration path.

### Checks

- Separate hard breaking changes from behavior changes that are only likely to break some clients.
- Call out undocumented consumer assumptions such as nullability or default parsing.
- Recommend rollout and communication steps that match the blast radius.

## Webhook retry semantics shift happy path

### Prompt

Review the webhook retry semantics change for contract risk, hidden consumer assumptions, and the safest migration posture.

### Checks

- Treat timing and retry behavior as contract, not implementation detail.
- Call out downstream systems likely to duplicate work or mis-handle retries.
- Tie the rollout plan to observability and support readiness.
