# Examples

## Existing workflow under pressure

### Scenario

A team needs skill eval builder support for a real deadline instead of a brainstorming session.

### Prompt

Use Skill Eval Builder to produce an evaluation scaffold with golden prompts, score dimensions, edge probes, and output checks for the current workstream.

### Strong Response Should

- State the workflow objective in plain language.
- Produce an evaluation scaffold with golden prompts, score dimensions, edge probes, and output checks with explicit structure.
- Call out missing information and the next decision.

## Partial inputs

### Scenario

Inputs arrive incomplete, but the team still needs a useful first-pass artifact from skill eval builder.

### Prompt

Draft the strongest version of an evaluation scaffold with golden prompts, score dimensions, edge probes, and output checks using only the available inputs and list what is missing.

### Strong Response Should

- Separate knowns from assumptions.
- Prioritize the most decision-relevant gaps.
- Keep the output usable even when some inputs are missing.

## Decision review

### Scenario

Leaders want a concise artifact that shows the implications of the workflow output.

### Prompt

Summarize the output from Skill Eval Builder for an operator or leader who needs the decision-ready version.

### Strong Response Should

- Highlight the recommendation or key conclusion.
- Show risks or tradeoffs.
- End with concrete next actions.
