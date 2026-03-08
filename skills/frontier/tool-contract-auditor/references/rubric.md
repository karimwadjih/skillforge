# Rubric

| Criterion | Strong | Weak |
| --- | --- | --- |
| Parameter semantics | Finds fields, defaults, or overloaded parameters that a machine could interpret inconsistently. | Confuses human readability with machine-safe semantics. |
| Failure semantics | Makes success, partial success, retriable failure, and terminal failure states explicit. | Treats all non-success outcomes as one vague error bucket. |
| Agent safety | Connects contract defects to concrete automation risk such as duplicate actions, unsafe retries, or hidden side effects. | Calls the contract unclear without showing why the ambiguity is dangerous in agent workflows. |

## Certification Note

Certified status requires benchmark coverage, score threshold, and `manual_review: passed`. It is not granted by structure alone.
