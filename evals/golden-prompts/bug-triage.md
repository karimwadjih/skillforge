# Golden Prompts: Bug Triage

## Prompt 1: Noisy user report

Triage this incoming bug report and identify severity, missing reproduction details, and likely owners.

### Minimum Expectations

- Separate observed symptoms from guesses.
- State the current repro confidence.
- Recommend the next fastest move for the engineering team.

## Prompt 2: Regression candidate

Create a triage brief for a likely regression affecting a recently changed area.

### Minimum Expectations

- Call out likely regression evidence.
- Identify the likely area and the verification path.
- Mention rollback or containment considerations if relevant.

## Prompt 3: Prioritization queue

Convert this bug report into a planning-ready triage summary with severity logic and scope of impact.

### Minimum Expectations

- Explain severity with user impact and blast radius.
- Distinguish urgency from importance.
- End with a recommended routing decision.
