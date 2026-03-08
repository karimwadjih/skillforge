# Happy Path Tests

## Existing workflow under pressure happy path 1

### Prompt

Use Skill Eval Builder to produce an evaluation scaffold with golden prompts, score dimensions, edge probes, and output checks for the current workstream.

### Checks

- State the workflow objective in plain language.
- Produce an evaluation scaffold with golden prompts, score dimensions, edge probes, and output checks with explicit structure.
- Call out missing information and the next decision.

## Partial inputs happy path 2

### Prompt

Draft the strongest version of an evaluation scaffold with golden prompts, score dimensions, edge probes, and output checks using only the available inputs and list what is missing.

### Checks

- Separate knowns from assumptions.
- Prioritize the most decision-relevant gaps.
- Keep the output usable even when some inputs are missing.
