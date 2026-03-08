# Bug Triage

Turn a raw bug report into a triage artifact with severity, repro confidence, likely owners, and next actions.

## Quick View

- Category: `engineering`
- Maturity: `frontier`
- Tier: `flagship`
- Evaluation status: `benchmarked`

## What This Skill Does

Bug reports often mix symptoms, guesses, and urgency without enough structure for teams to prioritize or route them well.

## Why This Skill Matters

Bug triage matters because the cost is not just mislabeling severity. Bad triage sends the wrong people into the wrong problem with the wrong urgency. This skill is for converting noisy reports into grounded next moves.

## What Makes It Different

- Separates user impact, repro confidence, and suspected cause instead of collapsing them into one severity guess.
- Optimizes for the next debugging or containment move, not just ticket classification.
- Signals when the available evidence is too weak for confident priority decisions.

## When To Reach For It

- An incoming bug report needs structured triage.
- The team needs severity, repro confidence, and follow-up decisions captured quickly.

## What You Should Provide

- bug report
- logs or screenshots if available
- affected area
- user impact context

## What You Should Get Back

- triage summary
- severity recommendation
- repro notes
- owner suggestions
- next actions

## Repository Notes

- Main instructions live in `SKILL.md`.
- Machine-readable metadata lives in `skill.json`.
- Examples, rubric, edge cases, and tests live under `references/` and `tests/`.

## Quality Position

This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.
