import { notFound } from "next/navigation";
import { getCatalog, getSkillBySlug } from "@skillforge/catalog";
import { Badge, Hero, Panel } from "@skillforge/ui";
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
      <Hero kicker={skill.category} title={skill.name} subtitle={skill.summary} />
      <Panel style={{ marginTop: 24 }}>
        <div className="sf-badges" style={{ marginBottom: 18 }}>
          <Badge label={skill.maturity} tone={skill.maturity as "certified" | "frontier" | "experimental" | "scaffold"} />
          <Badge label={skill.tier} />
          <Badge label={skill.evaluation_status} />
        </div>
        <p className="sf-text-muted">{skill.description}</p>
        <div className="sf-mini-grid" style={{ marginTop: 20 }}>
          <div>
            <h3>Triggers</h3>
            <ul>
              {skill.triggers.map((trigger) => (
                <li key={trigger}>{trigger}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Expected inputs</h3>
            <ul>
              {skill.expected_inputs.map((input) => (
                <li key={input}>{input}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Expected outputs</h3>
            <ul>
              {skill.expected_outputs.map((output) => (
                <li key={output}>{output}</li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
      <SkillDetailTabs skill={skill} />
    </StudioShell>
  );
}
