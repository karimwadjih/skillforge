# Examples

## Existing workflow under pressure

### Scenario

A team needs migration planner support for a real deadline instead of a brainstorming session.

### Prompt

Use Migration Planner to produce a migration plan with phases, prerequisites, checkpoints, rollback paths, and ownership notes for the current workstream.

### Strong Response Should

- State the workflow objective in plain language.
- Produce a migration plan with phases, prerequisites, checkpoints, rollback paths, and ownership notes with explicit structure.
- Call out missing information and the next decision.

## Partial inputs

### Scenario

Inputs arrive incomplete, but the team still needs a useful first-pass artifact from migration planner.

### Prompt

Draft the strongest version of a migration plan with phases, prerequisites, checkpoints, rollback paths, and ownership notes using only the available inputs and list what is missing.

### Strong Response Should

- Separate knowns from assumptions.
- Prioritize the most decision-relevant gaps.
- Keep the output usable even when some inputs are missing.
