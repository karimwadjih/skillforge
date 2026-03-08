# Repo Onboarding: Before / After

## Weak output

The weak version reads like a familiar architecture summary:

- "This is a monorepo with apps and packages."
- "Run install, then start the dev server."
- "The main packages support shared logic."

It is technically true and still useless for a new contributor on day one.

## Stronger target output

### 1. First-hour path

1. Install dependencies and run validation before opening the apps.
2. Read the root docs, then inspect the seed source and generator before touching generated skills.
3. Open the docs app only after the catalog artifacts have been regenerated once.

### 2. Mental model

- `data/skill-seeds.json` is the content source of truth.
- `scripts/generate-library.ts` materializes the skill tree, collections, eval scaffolding, and baseline showcase assets.
- `packages/indexer` and `packages/catalog` are the public browsing layer, so content drift shows up there first.

### 3. Safe first tasks

- Improve one developed skill in the seed data and regenerate.
- Update a docs page that reads from the catalog output.
- Run the packaging flow for a flagship skill and inspect the bundle manifest.

### 4. Known sharp edges

- Generated outputs should not be hand-edited.
- Showcase assets were previously at risk during generation, so verify they persist after content changes.
- Certification is intentionally strict; do not infer it from score alone.

## Why the stronger version matters

Good onboarding removes false starts. It gives a new contributor the right order of operations, the real source of truth, and a first task that improves the repo without causing drift.
