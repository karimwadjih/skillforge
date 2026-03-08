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
      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-copy">
            <div className="sf-kicker">Public Standard</div>
            <h2>Flagship means stronger and more distinct. Nothing more, nothing less.</h2>
            <p className="sf-note">
              This tier exists to show how a reusable skill should feel when the workflow logic, examples, and judgment criteria have been pushed past boilerplate.
            </p>
          </div>
        </div>
        <div className="sf-grid sf-grid-3">
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
      </section>
      {certified.length > 0 ? (
        <section className="sf-section">
          <Panel>
            <div className="sf-kicker">Certified Within Flagships</div>
            <p>
              {certified.map((skill, index) => (
                <span key={skill.slug}>
                  <a href={`/skills/${skill.slug}`}>{skill.name}</a>
                  {index < certified.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </Panel>
        </section>
      ) : null}
      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-copy">
            <div className="sf-kicker">Demo-Ready Picks</div>
            <h2>Three flagships that explain the project quickly.</h2>
            <p className="sf-note">Each one demonstrates a different kind of value: critique, orientation, and evidence synthesis.</p>
          </div>
        </div>
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
      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-copy">
            <div className="sf-kicker">Full Flagship Set</div>
            <h2>The complete launch tier.</h2>
            <p className="sf-note">These are the strongest public skills in the repo today. They are not uniform, and that is part of the point.</p>
          </div>
        </div>
        <div className="sf-grid sf-grid-3">
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
      </section>
    </SiteShell>
  );
}
