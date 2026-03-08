# Edge Cases

## The architecture is partly accidental

### Risk

The system has grown through pragmatism, migration residue, or local workarounds rather than clean intentional design.

### How The Skill Should Respond

Explain the shape honestly, distinguish intended design from accumulated reality, and show where the rough edges matter.

### Failure Probe

Romanticizes the current architecture and hides the accidental complexity.

## Documentation and code disagree

### Risk

Existing diagrams or docs describe a cleaner system than the code and runtime behavior reveal.

### How The Skill Should Respond

Use the live implementation as the primary reference, note the drift, and explain where legacy docs may still be useful.

### Failure Probe

Repeats the old diagram because it sounds better than the real system.

## Audience spans multiple technical levels

### Risk

The same explainer has to work for product, adjacent engineers, and new maintainers.

### How The Skill Should Respond

Layer the explanation from boundary summary to deeper flow detail and make the intended audience of each section explicit.

### Failure Probe

Picks one depth level and leaves the rest of the audience behind.
