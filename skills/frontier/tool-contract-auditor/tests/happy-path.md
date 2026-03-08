# Happy Path Tests

## Ambiguous search tool happy path

### Prompt

Audit the search tool contract for ambiguous parameter semantics, default behavior, and the changes required to make it safer for agent use.

### Checks

- Treat vague defaults and overloaded parameters as contract defects, not minor wording issues.
- Explain how ambiguity would show up during agent execution.
- Recommend fixes that narrow machine interpretation.

## Billing action retry safety happy path

### Prompt

Audit the billing-action tool contract for retry safety, idempotency expectations, and agent-safe failure semantics.

### Checks

- Treat retry behavior as a core contract property, not an implementation footnote.
- Surface where agent automation could amplify damage.
- Recommend the minimum guarantees needed before agent use is safe.
