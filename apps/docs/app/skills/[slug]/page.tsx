import { notFound } from "next/navigation";
import { getCatalog, getSkillBySlug } from "@skillforge/catalog";
import { Badge, Hero, MarkdownArticle, Panel } from "@skillforge/ui";
import { SiteShell } from "../../../components/site-shell";

function stripHeading(source: string) {
  return source.replace(/^# .+\n\n/, "");
}

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.map((skill) => ({ slug: skill.slug }));
}

export default async function DocsSkillPage({
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
    <SiteShell>
      <Hero
        kicker={`${skill.category} / ${skill.tier}`}
        title={skill.name}
        subtitle={skill.summary}
      />
      <Panel style={{ marginTop: 24 }}>
        <div className="sf-badges" style={{ marginBottom: 18 }}>
          <Badge label={skill.maturity} tone={skill.maturity as "certified" | "frontier" | "experimental" | "scaffold"} />
          <Badge label={skill.tier} />
          <Badge label={skill.evaluation_status} />
          <Badge label={`Score ${skill.score}`} />
        </div>
        <p>{skill.description}</p>
        <p className="sf-note">
          {skill.maturity === "certified"
            ? "This skill is certified because it cleared the score threshold, benchmark coverage, example/test requirements, and manual review."
            : skill.tier === "flagship"
              ? "This is a flagship Skill. It is stronger than the broader library, but flagship status is not the same as certification."
              : "This entry sits below the flagship tier. Read the maturity label literally."}
        </p>
      </Panel>
      <div className="sf-mini-grid" style={{ marginTop: 24 }}>
        <Panel>
          <h2>Triggers</h2>
          <ul>
            {skill.triggers.map((trigger) => (
              <li key={trigger}>{trigger}</li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <h2>Expected inputs</h2>
          <ul>
            {skill.expected_inputs.map((input) => (
              <li key={input}>{input}</li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <h2>Expected outputs</h2>
          <ul>
            {skill.expected_outputs.map((output) => (
              <li key={output}>{output}</li>
            ))}
          </ul>
        </Panel>
      </div>
      <Panel style={{ marginTop: 24 }}>
        <h2>Overview</h2>
        <MarkdownArticle source={stripHeading(skill.content.readme)} />
      </Panel>
      <div className="sf-grid sf-grid-2" style={{ marginTop: 24 }}>
        <Panel>
          <h2>Rubric</h2>
          <MarkdownArticle source={skill.content.rubric} />
        </Panel>
        <Panel>
          <h2>Examples</h2>
          <MarkdownArticle source={skill.content.examples} />
        </Panel>
      </div>
      <div className="sf-grid sf-grid-2" style={{ marginTop: 24 }}>
        <Panel>
          <h2>Edge Cases</h2>
          <MarkdownArticle source={skill.content.edge_cases} />
        </Panel>
        <Panel>
          <h2>Tests</h2>
          <MarkdownArticle source={`${skill.content.happy_path}\n\n${skill.content.edge_path}\n\n${skill.content.failure_cases}`} />
        </Panel>
      </div>
    </SiteShell>
  );
}
