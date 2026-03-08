# Edge Cases

## Human judgment is doing hidden work

### Risk

The workflow appears repeatable, but important routing or quality decisions still live in one operator's head.

### How The Skill Should Respond

Expose the judgment points, document the decision criteria, and mark anything that cannot yet be compiled cleanly.

### Failure Probe

Treats undocumented expert judgment as if it were a stable deterministic step.

## Workflow branches heavily by case type

### Risk

The process changes materially depending on customer segment, severity, or operating context.

### How The Skill Should Respond

Model the branch conditions explicitly and avoid collapsing materially different flows into one nominal path.

### Failure Probe

Builds one broad flow that is too vague to execute well in any branch.

## Upstream inputs are inconsistent

### Risk

The workflow receives varying levels of context or differently structured source material.

### How The Skill Should Respond

Define minimum viable inputs, fallback behavior, and where the workflow should stop instead of pretending every run starts clean.

### Failure Probe

Compiles the ideal path and leaves input normalization as an implicit problem.
