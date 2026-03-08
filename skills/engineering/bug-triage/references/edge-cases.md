# Edge Cases

## The report is credible but irreproducible

### Risk

Users are clearly hitting a problem, but the team cannot reproduce it in a controlled environment yet.

### How The Skill Should Respond

Keep impact and repro confidence separate, identify the missing diagnostic evidence, and define the fastest route to better signal.

### Failure Probe

Downgrades the issue solely because engineers cannot reproduce it on demand.

## Symptom spans multiple owners

### Risk

The visible failure could come from several services, clients, or infrastructure layers.

### How The Skill Should Respond

Map the plausible surface area, note the most likely owner groups, and keep the handoff logic explicit.

### Failure Probe

Throws the issue at the loudest or most obvious team without narrowing the surface area.

## Containment may matter more than diagnosis

### Risk

The right next step is rollback, feature disablement, or communication, not deeper root-cause analysis.

### How The Skill Should Respond

Call out containment decisions separately from debugging work and explain the tradeoff.

### Failure Probe

Treats triage as a purely investigative step and misses the immediate user-risk decision.
