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
        <Panel className="sf-summary-panel">
          <div className="sf-badges" style={{ marginBottom: 18 }}>
            <Badge label={skill.maturity} tone={skill.maturity as "certified" | "frontier" | "experimental" | "scaffold"} />
            <Badge label={skill.tier} />
            <Badge label={skill.evaluation_status} />
          </div>
          <p className="sf-text-muted">{skill.description}</p>
        </Panel>
      </section>
      <section className="sf-section">
        <div className="sf-contract-grid">
          <Panel>
            <div className="sf-kicker">Trigger Surface</div>
            <h2>When this skill should activate</h2>
            <ul>
              {skill.triggers.map((trigger) => (
                <li key={trigger}>{trigger}</li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <div className="sf-kicker">Input Contract</div>
            <h2>What the skill expects</h2>
            <ul>
              {skill.expected_inputs.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <div className="sf-kicker">Output Contract</div>
            <h2>What the skill should return</h2>
            <ul>
              {skill.expected_outputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
          </Panel>
        </div>
      </section>
      <SkillDetailTabs skill={skill} />
    </StudioShell>
  );
}
