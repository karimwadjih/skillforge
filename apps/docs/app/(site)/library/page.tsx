import { getCategories, getCollections, getSummary } from "@skillforge/catalog";
import { Hero, Panel, SkillCard } from "@skillforge/ui";
import { categoryProfiles, maturityGuide } from "../../../components/catalog-content";
import { SiteShell } from "../../../components/site-shell";

export default async function LibraryPage() {
  const categories = await getCategories();
  const collections = await getCollections();
  const summary = await getSummary();

  return (
    <SiteShell>
      <Hero
        kicker="Library"
        title="Browse by workflow, not by prompt style."
        subtitle={`Skillforge spans ${summary.totalSkills} Skills, but it keeps the depth labels visible. Some entries are starter scaffolds, some are substantially developed, and the flagship tier is where the repo is most opinionated.`}
      />
      <Panel style={{ marginTop: 24 }}>
        <h2>How to read the library</h2>
        <ul>
          {maturityGuide.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Panel>
      <div className="sf-grid" style={{ marginTop: 24 }}>
        {Object.entries(categories).map(([category, skills]) => (
          <Panel key={category}>
            <h2 style={{ marginBottom: 8 }}>{categoryProfiles[category]?.title ?? category}</h2>
            <p>{categoryProfiles[category]?.description ?? "Browse the workflows in this category."}</p>
            <p className="sf-note">{categoryProfiles[category]?.angle ?? `Browse the full ${category} category at /library/${category}.`}</p>
            <p className="sf-text-muted">
              {skills.length} skills. {skills.filter((skill) => skill.tier !== "seeded").length} meaningfully filled or flagship.{" "}
              <a href={`/library/${category}`}>Browse /library/{category}</a>.
            </p>
            <div className="sf-grid sf-grid-3" style={{ marginTop: 18 }}>
              {skills.slice().sort((left, right) => right.score - left.score).slice(0, 3).map((skill) => (
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
          </Panel>
        ))}
      </div>

      <section style={{ marginTop: 28 }}>
        <div className="sf-kicker">Collections</div>
        <div className="sf-grid sf-grid-3">
          {collections.map((collection) => (
            <Panel key={collection.slug}>
              <h2>{collection.name}</h2>
              <p>{collection.summary}</p>
              <p className="sf-note">Audience: {collection.audience}</p>
              <a href="/collections">See the collection detail</a>
            </Panel>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
