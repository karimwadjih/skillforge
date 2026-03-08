import { notFound } from "next/navigation";
import { getCatalog, getSkillBySlug } from "@skillforge/catalog";
import { Badge, Hero, MarkdownArticle, Panel, StatCard } from "@skillforge/ui";
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
        aside={
          <>
            <StatCard label="Score" value={skill.score} note="Generated from structure, content, and test signals." />
            <StatCard label="Examples" value={skill.counts.examples} note="Realistic usage examples checked into the skill." />
            <StatCard label="Tests" value={skill.counts.tests} note="Happy path, edge path, and failure probes." />
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
            <p>{skill.description}</p>
            <p className="sf-note">
              {skill.maturity === "certified"
                ? "This skill is certified because it cleared the score threshold, example and test minimums, benchmark coverage, and manual review."
                : skill.tier === "flagship"
                  ? "This is a flagship skill. It is intentionally stronger than the broader library, but flagship status is not the same as certification."
                  : "This skill sits below the flagship tier. Read the maturity label literally and inspect the evidence before you reuse it."}
            </p>
            <MarkdownArticle source={stripHeading(skill.content.readme)} />
          </Panel>
          <div className="sf-stack">
            <Panel>
              <div className="sf-kicker">Trigger Surface</div>
              <h2>When to reach for it</h2>
              <ul>
                {skill.triggers.map((trigger) => (
                  <li key={trigger}>{trigger}</li>
                ))}
              </ul>
            </Panel>
            <Panel>
              <div className="sf-kicker">Inputs</div>
              <h2>What it expects</h2>
              <ul>
                {skill.expected_inputs.map((input) => (
                  <li key={input}>{input}</li>
                ))}
              </ul>
            </Panel>
            <Panel>
              <div className="sf-kicker">Outputs</div>
              <h2>What it should return</h2>
              <ul>
                {skill.expected_outputs.map((output) => (
                  <li key={output}>{output}</li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </section>
      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-copy">
            <div className="sf-kicker">Judgment Layer</div>
            <h2>Rubric and concrete examples.</h2>
          </div>
        </div>
        <div className="sf-grid sf-grid-2">
          <Panel>
            <h2>Rubric</h2>
            <MarkdownArticle source={skill.content.rubric} />
          </Panel>
          <Panel>
            <h2>Examples</h2>
            <MarkdownArticle source={skill.content.examples} />
          </Panel>
        </div>
      </section>
      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-copy">
            <div className="sf-kicker">Failure Surface</div>
            <h2>Edge cases and tests.</h2>
          </div>
        </div>
        <div className="sf-grid sf-grid-2">
          <Panel>
            <h2>Edge Cases</h2>
            <MarkdownArticle source={skill.content.edge_cases} />
          </Panel>
          <Panel>
            <h2>Tests</h2>
            <MarkdownArticle source={`${skill.content.happy_path}\n\n${skill.content.edge_path}\n\n${skill.content.failure_cases}`} />
          </Panel>
        </div>
      </section>
    </SiteShell>
  );
}
