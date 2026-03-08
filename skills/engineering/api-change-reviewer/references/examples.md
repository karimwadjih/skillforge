# Examples

## Public REST field deprecation

### Scenario

A public endpoint is dropping a field that external customers still read, and the team needs a safer migration plan than a release note line item.

### Prompt

Review the proposed deprecation of a public response field and summarize compatibility risk, likely consumer breakage, and the minimum safe migration path.

### Strong Response Should

- Separate hard breaking changes from behavior changes that are only likely to break some clients.
- Call out undocumented consumer assumptions such as nullability or default parsing.
- Recommend rollout and communication steps that match the blast radius.

## Pagination default change

### Scenario

An internal service wants to change pagination defaults to reduce load, but several downstream consumers may rely on current behavior.

### Prompt

Review the pagination default change for compatibility, consumer impact, and rollout sequencing.

### Strong Response Should

- Treat default behavior as part of the contract, not an implementation detail.
- Show which consumers are likely to feel the change first.
- Recommend a rollout path safer than flipping the default globally.

## Webhook retry semantics shift

### Scenario

A platform team wants to change retry timing and idempotency guidance for webhook delivery, and support is worried about duplicate downstream actions.

### Prompt

Review the webhook retry semantics change for contract risk, hidden consumer assumptions, and the safest migration posture.

### Strong Response Should

- Treat timing and retry behavior as contract, not implementation detail.
- Call out downstream systems likely to duplicate work or mis-handle retries.
- Tie the rollout plan to observability and support readiness.
