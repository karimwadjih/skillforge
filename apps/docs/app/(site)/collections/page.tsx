import { getCollections } from "@skillforge/catalog";
import { Hero, Panel } from "@skillforge/ui";
import { SiteShell } from "../../../components/site-shell";

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <SiteShell>
      <Hero
        kicker="Collections"
        title="Role-based packs for faster adoption."
        subtitle="Collections are the quickest way to make the library useful without browsing every category. They bundle Skills around recurring operating contexts rather than around one team's org chart."
      />
      <div className="sf-grid sf-grid-3" style={{ marginTop: 24 }}>
        {collections.map((collection) => (
          <Panel key={collection.slug}>
            <h2>{collection.name}</h2>
            <p>{collection.summary}</p>
            <p className="sf-note">Audience: {collection.audience}</p>
            <h3>Use cases</h3>
            <ul>
              {collection.use_cases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
            <h3>Included skills</h3>
            <div className="sf-link-list">
              {collection.skills.map((skill) => (
                <a key={skill.slug} href={`/skills/${skill.slug}`}>
                  {skill.name}
                </a>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    </SiteShell>
  );
}
