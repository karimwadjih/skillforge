# AGENTS.md

## Repository philosophy

Skillforge treats Skills as software assets:

- reusable
- reviewable
- benchmarkable
- portable
- packaged
- explicit about maturity and limits

Do not frame this repository as a prompt dump, an official OpenAI project, or a library where all seeded Skills are equally polished.

## Source of truth

- `data/skill-seeds.json`: canonical seeded inventory and baseline generation data
- `skills/**/SKILL.md`: human-readable skill instructions with minimal frontmatter
- `skills/**/skill.json`: machine-readable metadata
- `packages/catalog/generated/*`: generated artifacts; do not hand-edit

When content or metadata changes, regenerate the library and catalog rather than patching generated outputs by hand.

## Commands

- `pnpm skills:generate`: generate skill folders, templates, collections, and baseline eval assets from seed data
- `pnpm catalog:generate`: generate catalog JSON and `SKILLS.md`
- `pnpm validate`: run structural and quality validation
- `pnpm score`: produce scorecards and readiness signals
- `pnpm benchmark:run`: run the provider-neutral benchmark loader against sample adapters
- `pnpm test`: run Vitest
- `pnpm dev:docs`: run the docs app
- `pnpm dev:studio`: run the studio app

## Naming conventions

- Skill folder names use lowercase kebab-case slugs.
- `SKILL.md` frontmatter supports only `name` and `description`.
- `skill.json` uses lowercase snake_case keys exactly as defined by the schema.
- Categories are fixed: `research`, `product`, `engineering`, `gtm`, `ops`, `docs`, `infrastructure`, `frontier`.
- Maturity is fixed: `scaffold`, `experimental`, `frontier`, `certified`.

## Validation expectations

Every Skill must include:

- `SKILL.md`
- `skill.json`
- `README.md`
- `agents/openai.yaml`
- `references/examples.md`
- `references/rubric.md`
- `references/edge-cases.md`
- `assets/template.md`
- `tests/happy-path.md`
- `tests/edge-path.md`
- `tests/failure-cases.md`

Validator checks should enforce:

- tree completeness
- metadata consistency
- slug/category correctness
- seed drift
- banned placeholder phrases
- certification gates

## Skill quality standards

Good Skills in this repo:

- solve a repeated workflow
- declare a clear trigger
- ask for concrete inputs
- produce structured outputs
- include realistic examples
- include edge cases and failure probes
- avoid generic phrasing that could fit any task

Flagship Skills must feel distinct. If two Skills read like variants of the same template, that is a defect.

## Certification

`certified` requires:

- score threshold
- benchmark coverage
- adequate examples and tests
- `manual_review: passed`

Do not auto-upgrade maturity from score alone.
