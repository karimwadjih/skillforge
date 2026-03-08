# Edge Path Tests

## Partial success edge path

### Prompt

Run Tool Contract Auditor when a tool can create records, attach files, and send notifications, but the contract says nothing about mixed outcomes.

### Checks

- Make partial-success states explicit.
- Connect mixed outcomes to recovery behavior.
- Recommend result semantics agents can act on safely.

## Human-friendly ambiguity edge path

### Prompt

Run Tool Contract Auditor when parameters are understandable to humans in the UI but ambiguous for machine callers.

### Checks

- Treat human-friendly labels as insufficient.
- Recommend narrower schemas or enums.
- Explain how ambiguity would create agent errors.
