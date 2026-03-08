# Examples

## Notification batching handoff

### Scenario

A PM wrote a batching spec for notifications, but engineering is already flagging ambiguity around timing, fallback behavior, and user controls.

### Prompt

Refine the notification batching spec so scope boundaries, fallback behavior, and acceptance criteria are clear enough for implementation planning.

### Strong Response Should

- Clarify what is in scope now versus explicitly deferred.
- Make fallback behavior and edge conditions visible.
- Convert vague success statements into testable acceptance criteria.

## Permissions expansion spec

### Scenario

A team is extending a permission model and needs a cleaner spec before design and engineering finalize the build plan.

### Prompt

Tighten the permissions expansion spec so role boundaries, dependency assumptions, and acceptance criteria are explicit.

### Strong Response Should

- Expose hidden cross-team or data dependencies.
- State the assumption list instead of burying it in prose.
- Make boundary conditions around roles and overrides testable.

## Audit-log export workflow

### Scenario

A compliance-driven export feature is specified at a high level, but nobody has pinned down state transitions, failure handling, or ownership for long-running jobs.

### Prompt

Refine the audit-log export spec so request states, failure handling, ownership boundaries, and acceptance criteria are implementation-ready.

### Strong Response Should

- Make the state model and transitions explicit.
- Surface cross-team dependencies such as storage, security review, or admin UX.
- Leave engineering with acceptance criteria they could turn into test cases immediately.
