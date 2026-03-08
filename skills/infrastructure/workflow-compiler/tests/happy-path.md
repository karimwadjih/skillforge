# Happy Path Tests

## Existing workflow under pressure happy path 1

### Prompt

Use Workflow Compiler to produce a compiled workflow package with step sequence, contracts, edge handling, and starter evaluation prompts for the current workstream.

### Checks

- State the workflow objective in plain language.
- Produce a compiled workflow package with step sequence, contracts, edge handling, and starter evaluation prompts with explicit structure.
- Call out missing information and the next decision.

## Partial inputs happy path 2

### Prompt

Draft the strongest version of a compiled workflow package with step sequence, contracts, edge handling, and starter evaluation prompts using only the available inputs and list what is missing.

### Checks

- Separate knowns from assumptions.
- Prioritize the most decision-relevant gaps.
- Keep the output usable even when some inputs are missing.
