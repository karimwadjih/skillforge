import { Hero, Panel } from "@skillforge/ui";
import { SiteShell } from "../../../components/site-shell";

export default function GettingStartedPage() {
  return (
    <SiteShell>
      <Hero
        kicker="Getting Started"
        title="Choose the shortest path to value."
        subtitle="Skillforge is broad enough to browse, but the right entry point is usually obvious: start with a flagship, grab a role-based collection, or generate a starter scaffold for a workflow you already repeat."
      />
      <div className="sf-grid sf-grid-3" style={{ marginTop: 24 }}>
        <Panel>
          <h2>Start with a flagship</h2>
          <p>If you want the quickest proof of value, start with the flagship tier. `prd-critic`, `repo-onboarding`, and `customer-interview-synthesizer` are the fastest public demos.</p>
          <a href="/flagships">Browse flagships</a>
        </Panel>
        <Panel>
          <h2>Start with a collection</h2>
          <p>If you are operating in a role rather than evaluating one skill, collections are the fastest way to find a credible working set.</p>
          <a href="/collections">Browse collections</a>
        </Panel>
        <Panel>
          <h2>Start from a scaffold</h2>
          <p>If your workflow is not in the library yet, use the studio app to generate a minimal `SKILL.md` and `skill.json` starter bundle, then compare it against an existing skill before you promote it.</p>
        </Panel>
      </div>
      <Panel style={{ marginTop: 24 }}>
        <h2>Local setup</h2>
        <pre>
          <code>{`pnpm install
pnpm skills:generate
pnpm score
pnpm catalog:generate
pnpm validate
pnpm test`}</code>
        </pre>
      </Panel>
      <Panel style={{ marginTop: 24 }}>
        <h2>Quick launch demo</h2>
        <ol>
          <li>Open the flagship layer and pick `prd-critic`, `repo-onboarding`, or `customer-interview-synthesizer`.</li>
          <li>Open the same skill in studio to inspect the rubric, tests, and metadata in one place.</li>
          <li>Use compare mode or scaffold export only after the public skill page makes the workflow credible.</li>
        </ol>
      </Panel>
      <Panel style={{ marginTop: 24 }}>
        <h2>Contribution loop</h2>
        <ol>
          <li>Update `data/skill-seeds.json` or deepen a generated Skill.</li>
          <li>Regenerate the library with `pnpm skills:generate`.</li>
          <li>Recompute scores and catalog artifacts.</li>
          <li>Run validation and tests before you open a PR.</li>
        </ol>
      </Panel>
      <Panel style={{ marginTop: 24 }}>
        <h2>Certification rule</h2>
        <p>
          Do not label a Skill `certified` unless benchmark coverage, the score threshold, example/test coverage, and `manual_review: passed`
          are all true. Skillforge treats that badge as a public trust signal, not a formatting choice.
        </p>
      </Panel>
    </SiteShell>
  );
}
