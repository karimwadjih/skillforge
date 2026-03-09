import { notFound } from "next/navigation";
import { getCatalog, getSkillBySlug } from "@skillforge/catalog";
import { Badge, Hero, Panel, StatCard } from "@skillforge/ui";
import { SkillDetailTabs } from "../../../components/skill-detail-tabs";
import { StudioShell } from "../../../components/studio-shell";

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.map((skill) => ({ slug: skill.slug }));
}

export default async function SkillPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);

  if (!skill) {
    notFound();
  }

  return (
    <StudioShell>
      <Hero
        kicker={skill.category}
        title={skill.name}
        subtitle={skill.summary}
        aside={
          <>
            <StatCard label="Score" value={skill.score} note="Generated quality signal, not a substitute for review." />
            <StatCard label="Examples" value={skill.counts.examples} note="Committed examples that show how the skill behaves." />
            <StatCard label="Tests" value={skill.counts.tests} note="Prompt-based checks for happy, edge, and failure paths." />
          </>
        }
      />
      <section className="sf-section">
        <div className="sf-split">
          <Panel className="sf-summary-panel">
            <div className="sf-badges" style={{ marginBottom: 18 }}>
              <Badge label={skill.maturity} tone={skill.maturity as "certified" | "frontier" | "experimental" | "scaffold"} />
              <Badge label={skill.tier} />
              <Badge label={skill.evaluation_status} />
            </div>
            <p className="sf-text-muted">{skill.description}</p>
            <ul className="sf-fact-list">
              <li className="sf-fact-item">
                <span className="sf-fact-label">Primary trigger</span>
                <p className="sf-fact-value">{skill.triggers[0]}</p>
              </li>
              <li className="sf-fact-item">
                <span className="sf-fact-label">Current review posture</span>
                <p className="sf-fact-value">
                  {skill.certification_eligible ? "Clears the public certification gates." : "Strong enough to inspect, not yet certification-eligible."}
                </p>
              </li>
            </ul>
          </Panel>
          <div className="sf-stack">
            <div className="sf-contract-card">
              <div className="sf-kicker">Trigger Surface</div>
              <h3>When this skill should activate</h3>
              <ul>
                {skill.triggers.map((trigger) => (
                  <li key={trigger}>{trigger}</li>
                ))}
              </ul>
            </div>
            <div className="sf-contract-card">
              <div className="sf-kicker">Input Contract</div>
              <h3>What the skill expects</h3>
              <ul>
                {skill.expected_inputs.map((input) => (
                  <li key={input}>{input}</li>
                ))}
              </ul>
            </div>
            <div className="sf-contract-card">
              <div className="sf-kicker">Output Contract</div>
              <h3>What the skill should return</h3>
              <ul>
                {skill.expected_outputs.map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <SkillDetailTabs skill={skill} />
    </StudioShell>
  );
}
