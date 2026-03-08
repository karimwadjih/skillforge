import { getFlagships } from "@skillforge/catalog";
import { Hero, Panel, SkillCard } from "@skillforge/ui";
import { SiteShell } from "../../../components/site-shell";

export default async function FlagshipsPage() {
  const flagships = await getFlagships();
  const certified = flagships.filter((skill) => skill.maturity === "certified");

  return (
    <SiteShell>
      <Hero
        kicker="Flagship Skills"
        title="The public reference layer for what good looks like."
        subtitle="Flagships are where Skillforge is most differentiated: stronger workflow logic, sharper examples, more judgment-heavy rubrics, and benchmark assets that make them easier to compare over time."
      />
      <div className="sf-grid sf-grid-3" style={{ marginTop: 24 }}>
        <Panel>
          <h2>Distinct by design</h2>
          <p>Flagships are not just longer. Each one should feel like its own workflow instrument, with a different operating stance and failure surface.</p>
        </Panel>
        <Panel>
          <h2>Benchmarked, not overclaimed</h2>
          <p>Benchmark assets exist for the flagship tier, but benchmark coverage alone does not grant certification or prove production readiness.</p>
        </Panel>
        <Panel>
          <h2>Manual review still matters</h2>
          <p>Only a small subset will be `certified` in v1. That is deliberate. Public trust is worth more than a bigger badge count.</p>
        </Panel>
      </div>
      {certified.length > 0 ? (
        <Panel style={{ marginTop: 24 }}>
          <h2>Certified within the flagship tier</h2>
          <p>
            {certified.map((skill, index) => (
              <span key={skill.slug}>
                <a href={`/skills/${skill.slug}`}>{skill.name}</a>
                {index < certified.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </Panel>
      ) : null}
      <section style={{ marginTop: 24 }}>
        <div className="sf-kicker">Demo-ready picks</div>
        <div className="sf-grid sf-grid-3">
          <Panel className="sf-showcase-frame">
            <img alt="PRD Critic studio detail screenshot" src="/showcase/studio-prd-critic-real.png" />
            <h2>PRD Critic</h2>
            <p>Fastest way to show that Skillforge is about judgment, not formatting. The output has to expose weak logic, not just rewrite prose more neatly.</p>
            <a href="/skills/prd-critic">Open `prd-critic`</a>
          </Panel>
          <Panel className="sf-showcase-frame">
            <img alt="Repo Onboarding studio detail screenshot" src="/showcase/studio-repo-onboarding-real.png" />
            <h2>Repo Onboarding</h2>
            <p>Useful for live demos because it connects repository shape, local setup, and first-task guidance without pretending the codebase is simpler than it is.</p>
            <a href="/skills/repo-onboarding">Open `repo-onboarding`</a>
          </Panel>
          <Panel className="sf-showcase-frame">
            <img alt="Customer Interview Synthesizer studio detail screenshot" src="/showcase/studio-customer-interview-synthesizer-real.png" />
            <h2>Customer Interview Synthesizer</h2>
            <p>Shows evidence handling well: recurring patterns, outliers, and product implications stay visible instead of being flattened into vague insight themes.</p>
            <a href="/skills/customer-interview-synthesizer">Open `customer-interview-synthesizer`</a>
          </Panel>
        </div>
      </section>
      <div className="sf-grid sf-grid-3" style={{ marginTop: 24 }}>
        {flagships.map((skill) => (
          <SkillCard
            key={skill.slug}
            href={`/skills/${skill.slug}`}
            name={skill.name}
            summary={skill.summary}
            category={skill.category}
            maturity={skill.maturity}
            tier={skill.tier}
            score={skill.score}
          />
        ))}
      </div>
    </SiteShell>
  );
}
