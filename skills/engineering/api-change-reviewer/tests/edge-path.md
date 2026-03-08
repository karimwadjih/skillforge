# Edge Path Tests

## Unknown consumer edge path

### Prompt

Run API Change Reviewer when several downstream consumers are unknown or only inferred from logs.

### Checks

- Lower confidence in the blast-radius map.
- Recommend a defensive rollout posture.
- Avoid pretending the migration story is cleaner than it is.

## Versioning theater edge path

### Prompt

Run API Change Reviewer when a version bump exists but migration guidance, support timing, and observability are still weak.

### Checks

- Treat versioning as insufficient by itself.
- Review migration support and observability directly.
- Call out where the safety story is more cosmetic than real.
