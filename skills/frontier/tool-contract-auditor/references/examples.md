# Examples

## Search tool with ambiguous filters

### Scenario

An internal search tool works for humans in a UI, but the API contract leaves filters, defaults, and sort behavior too vague for reliable agent use.

### Prompt

Audit the search tool contract for ambiguous parameter semantics, default behavior, and the changes required to make it safer for agent use.

### Strong Response Should

- Treat vague defaults and overloaded parameters as contract defects, not minor wording issues.
- Explain how ambiguity would show up during agent execution.
- Recommend fixes that narrow machine interpretation.

## Ticket-creation tool with partial success

### Scenario

A ticketing integration can create a record, attach files, and notify watchers, but the contract does not say what happens if one stage fails.

### Prompt

Review the ticket-creation tool contract with emphasis on partial-success handling, retry safety, and result semantics.

### Strong Response Should

- Make partial-success states explicit instead of assuming all-or-nothing behavior.
- Review whether retries could duplicate or corrupt work.
- Recommend clearer result contracts for downstream agents.

## Billing action with dangerous retries

### Scenario

A financial operations tool exposes a mutation endpoint whose retry guidance is unclear, raising the risk of duplicate charges or repeated credits.

### Prompt

Audit the billing-action tool contract for retry safety, idempotency expectations, and agent-safe failure semantics.

### Strong Response Should

- Treat retry behavior as a core contract property, not an implementation footnote.
- Surface where agent automation could amplify damage.
- Recommend the minimum guarantees needed before agent use is safe.
