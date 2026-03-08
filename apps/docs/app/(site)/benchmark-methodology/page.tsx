import { Hero, MarkdownArticle, Panel } from "@skillforge/ui";
import { SiteShell } from "../../../components/site-shell";

const source = `
# Benchmark methodology

Skillforge v1 ships with committed golden prompts and benchmark-case files for the flagship tier.

## Adapter paths

### Mock adapter (default)

- Deterministic and safe for CI.
- Useful for verifying the result-loading path, scorecard format, and UI presentation.
- Not evidence of real model performance.

### Command adapter (optional)

- Set \`SKILLFORGE_BENCHMARK_ADAPTER=command\`.
- Set \`SKILLFORGE_BENCHMARK_COMMAND\` to a local command that reads prompt JSON on stdin and returns JSON with \`output\`, plus optional scoring fields.
- This path is real in the sense that it can execute an external evaluator or model-backed script, but Skillforge does not ship a default model provider binding or make performance claims on your behalf.

## What is real in v1

- Benchmark cases and golden prompts are committed to the repo.
- Score dimensions are visible and inspectable.
- Result artifacts are written to \`evals/results/\`.
- Certified status still requires more than benchmark presence.

## What is not claimed

- Mock results do not represent live model quality.
- Running a command adapter does not automatically make the results comparable across teams.
- Benchmark coverage does not replace manual review.
`;

export default function BenchmarkMethodologyPage() {
  return (
    <SiteShell>
      <Hero
        kicker="Benchmarks"
        title="Real benchmark assets, restrained claims."
        subtitle="Skillforge keeps the benchmark layer provider-neutral and honest. The repo ships real cases and score structures, plus a deterministic path for CI and an optional command adapter for teams that want live evaluation without pretending the results are universal."
      />
      <Panel style={{ marginTop: 24 }}>
        <MarkdownArticle source={source} />
      </Panel>
    </SiteShell>
  );
}
