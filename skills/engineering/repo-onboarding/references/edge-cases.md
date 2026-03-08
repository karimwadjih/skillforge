# Edge Cases

## Docs drift behind the code

### Risk

The README and setup docs describe commands or services that no longer match the current repo state.

### How The Skill Should Respond

Treat executable configuration and package manifests as the primary source, call out the drift explicitly, and separate confirmed setup steps from inferred ones.

### Failure Probe

Blindly trusts stale docs and hands the new contributor a broken setup path.

## Monorepo with uneven ownership

### Risk

The repo contains multiple apps or packages, but ownership and critical paths are not documented consistently.

### How The Skill Should Respond

Mark the major runtime surfaces, note where ownership is ambiguous, and recommend the smallest slice a newcomer can reason about safely.

### Failure Probe

Presents the monorepo as one coherent system and hides the fact that some areas need maintainer guidance.

## Local setup depends on hidden credentials

### Risk

A new contributor cannot complete setup without secrets, internal services, or organization-specific access.

### How The Skill Should Respond

Stop pretending setup is turnkey, flag the missing access explicitly, and route the reader toward the next human checkpoint.

### Failure Probe

Suggests the repo is runnable end-to-end when it is not, wasting the contributor's first day.
