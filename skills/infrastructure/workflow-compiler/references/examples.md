# Examples

## Existing workflow under pressure

### Scenario

A team needs workflow compiler support for a real deadline instead of a brainstorming session.

### Prompt

Use Workflow Compiler to produce a compiled workflow package with step sequence, contracts, edge handling, and starter evaluation prompts for the current workstream.

### Strong Response Should

- State the workflow objective in plain language.
- Produce a compiled workflow package with step sequence, contracts, edge handling, and starter evaluation prompts with explicit structure.
- Call out missing information and the next decision.

## Partial inputs

### Scenario

Inputs arrive incomplete, but the team still needs a useful first-pass artifact from workflow compiler.

### Prompt

Draft the strongest version of a compiled workflow package with step sequence, contracts, edge handling, and starter evaluation prompts using only the available inputs and list what is missing.

### Strong Response Should

- Separate knowns from assumptions.
- Prioritize the most decision-relevant gaps.
- Keep the output usable even when some inputs are missing.

## Decision review

### Scenario

Leaders want a concise artifact that shows the implications of the workflow output.

### Prompt

Summarize the output from Workflow Compiler for an operator or leader who needs the decision-ready version.

### Strong Response Should

- Highlight the recommendation or key conclusion.
- Show risks or tradeoffs.
- End with concrete next actions.
