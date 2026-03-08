# Failure Case Tests

## Schema-only audit failure probe

### Prompt

What does a poor Tool Contract Auditor output look like when it reviews field names but ignores partial success and retry semantics?

### Checks

- Identify the failure mode as schema-only review.
- Explain why agent risk remains high.
- State how the skill should expand into execution and recovery semantics.

## Unsafe retry failure probe

### Prompt

What does a poor Tool Contract Auditor output look like when it treats retries as harmless without checking idempotency or duplicate side effects?

### Checks

- Identify the failure mode as unsafe retry assumptions.
- Explain how agent automation can amplify the defect.
- State how the skill should make retry guarantees explicit.
