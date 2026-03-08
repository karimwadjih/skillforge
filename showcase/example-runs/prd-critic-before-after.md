# PRD Critic: Before / After

## Weak output

The weak version sounds helpful but does almost nothing:

- "This PRD is clear overall but could use more detail in a few sections."
- "Consider tightening scope and clarifying success metrics."
- "Engineering dependencies may need more discussion."

That output fails because it flatters the document and hides the real risk. No owner knows what to fix first.

## Stronger target output

### 1. Core problem test

- The PRD describes a workflow problem, but the evidence is anecdotal and not segmented by account type.
- The proposed urgency depends on churn reduction, yet the document never shows whether the churn pattern is concentrated in one segment or systemic.

### 2. Scope leak

- The draft claims to ship "notification batching" but quietly introduces preference management, admin overrides, and queue-failure recovery.
- Those are three separate surface areas with different owners and different acceptance criteria.

### 3. Missing acceptance logic

- "Users should feel less noisy communication" is not testable.
- Replace it with observable conditions such as batching window behavior, override rules, and fallback behavior when digest generation fails.

### 4. Decision-grade next moves

1. Split the current PRD into core batching versus preference-management follow-on.
2. Add explicit failure and fallback behavior for delayed jobs.
3. Rewrite the success section into acceptance criteria engineering and QA can execute.

## Why the stronger version matters

The stronger version changes the work. It gives the team a revision order, exposes the build boundary, and stops the PRD from being "approved" while still hiding the hardest implementation questions.
