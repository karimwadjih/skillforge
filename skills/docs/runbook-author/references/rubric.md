# Rubric

| Criterion | Strong | Weak |
| --- | --- | --- |
| Operator legibility | Reads like a calm set of actions an operator can execute under pressure. | Buried in prose, missing ordering, or too abstract to use live. |
| Verification discipline | Pairs risky steps with checks that confirm whether the system is in the expected state. | Assumes the operator will notice success or failure without explicit verification. |
| Failure containment | Makes rollback, stop conditions, and escalation visible before the operator needs them. | Leaves recovery logic implicit or tacked on at the end. |

## Certification Note

Certified status requires benchmark coverage, score threshold, and `manual_review: passed`. It is not granted by structure alone.
