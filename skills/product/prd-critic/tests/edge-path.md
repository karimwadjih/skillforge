# Edge Path Tests

## No real user problem edge path 1

### Prompt

Run PRD Critic when this condition appears: The PRD jumps directly into a solution without grounding the actual user problem.

### Checks

- Acknowledge the edge condition explicitly.
- Adapt the workflow rather than ignoring the issue.
- State that the document is solution-led, outline the missing problem framing, and avoid pretending the requirements are solid.

## Metrics without causality edge path 2

### Prompt

Run PRD Critic when this condition appears: Success metrics appear polished but do not connect to the proposed feature or behavior change.

### Checks

- Acknowledge the edge condition explicitly.
- Adapt the workflow rather than ignoring the issue.
- Challenge the metric logic and suggest what evidence would justify the link.
