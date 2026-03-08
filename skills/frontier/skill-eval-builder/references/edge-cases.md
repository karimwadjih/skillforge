# Edge Cases

## The skill behavior is underspecified

### Risk

Teams want eval assets before the skill's expected outputs and guardrails are stable enough to judge.

### How The Skill Should Respond

Surface the contract ambiguity first, define what can be evaluated now, and refuse fake precision where the skill is still undefined.

### Failure Probe

Generates polished eval assets for a behavior contract nobody has agreed on.

## Maintainers want one score to rule them all

### Risk

The team asks for a single number even though different failure modes matter differently.

### How The Skill Should Respond

Segment the score dimensions, explain why aggregation can hide regressions, and keep failure visibility intact.

### Failure Probe

Compresses the evaluation into one headline number that obscures the real behavior changes.

## Synthetic prompts are easier than real ones

### Risk

It is tempting to write clean benchmark prompts that do not resemble the messy requests the skill will actually see.

### How The Skill Should Respond

Bias toward realistic, decision-bearing prompts and document where synthetic cases are still useful.

### Failure Probe

Builds an easy benchmark that the skill can ace without proving real-world behavior.
