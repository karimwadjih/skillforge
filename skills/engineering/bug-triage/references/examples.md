# Examples

## Noisy user report

### Scenario

Support forwards a bug report that includes urgency but limited technical detail.

### Prompt

Triage this incoming bug report and identify severity, missing reproduction details, and likely owners.

### Strong Response Should

- Separate observed symptoms from guesses.
- State the current repro confidence.
- Recommend the next fastest move for the engineering team.

## Regression candidate

### Scenario

A bug may be tied to a recent release and the team needs fast routing plus rollback considerations.

### Prompt

Create a triage brief for a likely regression affecting a recently changed area.

### Strong Response Should

- Call out likely regression evidence.
- Identify the likely area and the verification path.
- Mention rollback or containment considerations if relevant.

## Prioritization queue

### Scenario

Several bugs compete for attention and one needs a cleaner priority case before planning.

### Prompt

Convert this bug report into a planning-ready triage summary with severity logic and scope of impact.

### Strong Response Should

- Explain severity with user impact and blast radius.
- Distinguish urgency from importance.
- End with a recommended routing decision.
