import { getCollections, getFlagships, getSummary } from "@skillforge/catalog";
import { Hero, Panel, SkillCard, StatCard } from "@skillforge/ui";
import { SiteShell } from "../../components/site-shell";

export default async function HomePage() {
  const summary = await getSummary();
  const collections = (await getCollections()).slice(0, 3);
  const flagships = (await getFlagships()).slice(0, 6);
  const certified = (await getFlagships()).filter((skill) => skill.maturity === "certified");

  return (
    <SiteShell>
      <Hero
        kicker="Portable Skill Packages"
        title="A public registry for Skills you can inspect before you trust."
        subtitle="Skillforge is built for teams that want reusable agent workflows to behave more like maintained software than loose prompt fragments. It is broad on purpose, but explicit about which assets are seeded, developed, flagship, or certified."
        aside={
          <>
            <StatCard label="Seeded Skills" value={summary.totalSkills} note="Breadth across eight workflow categories." />
            <StatCard label="Flagships" value={summary.flagshipCount} note="The public reference layer for stronger assets." />
            <StatCard label="Certified" value={summary.certifiedCount} note="A small subset with benchmark coverage and manual review." />
          </>
        }
      />

      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-copy">
            <div className="sf-kicker">Start Here</div>
            <h2>The fastest way to understand the project.</h2>
            <p className="sf-note">
              Skillforge is broad, but it should still be easy to know what to trust first, what to browse next, and what is intentionally unfinished.
            </p>
          </div>
        </div>
        <div className="sf-grid sf-grid-3">
          <Panel>
            <h2>Use it today</h2>
            <p>Start with the flagship tier if you want the fastest proof that Skillforge is useful. Those skills are the sharpest public assets in the repo.</p>
            <div className="sf-link-list">
              <a href="/flagships">Browse the flagship layer</a>
              <a href="/library">Scan the full library</a>
            </div>
          </Panel>
          <Panel>
            <h2>Read the quality labels correctly</h2>
            <p>`frontier` means strong. `certified` means stronger, benchmark-covered, and manually reviewed. Skillforge does not blur that distinction for marketing.</p>
            <div className="sf-link-list">
              <a href="/benchmark-methodology">Review the benchmark posture</a>
              <a href="/contributing">See the contribution bar</a>
            </div>
          </Panel>
          <Panel>
            <h2>Start from a pack, not a blank page</h2>
            <p>Collections bundle Skills by role so a founder, product lead, or eng manager can find a credible starting set quickly.</p>
            <div className="sf-link-list">
              <a href="/collections">Browse curated collections</a>
              <a href="/getting-started">Follow the getting started flow</a>
            </div>
          </Panel>
        </div>
      </section>

      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-copy">
            <div className="sf-kicker">Showcase</div>
            <h2>Actual surfaces, not product theater.</h2>
            <p className="sf-note">
              These captures come from the real docs and studio apps. The visuals should make the product easier to trust, not easier to fake.
            </p>
          </div>
        </div>
        <div className="sf-showcase-grid">
          <Panel className="sf-showcase-frame">
            <img alt="Skillforge flagship page screenshot" src="/showcase/docs-flagships-real.png" />
            <h2>Docs built for inspection</h2>
            <p className="sf-note">The docs surface quality tiers, certification posture, and real skill depth instead of hiding behind generic marketing language.</p>
            <div className="sf-link-list">
              <a href="/flagships">Browse flagship skills</a>
            </div>
          </Panel>
          <Panel className="sf-showcase-frame">
            <img alt="Skillforge studio homepage screenshot" src="/showcase/studio-home-real.png" />
            <h2>Studio built for comparison</h2>
            <p className="sf-note">The studio is intentionally narrow. It helps you inspect a skill contract, compare assets, and export a clean starter scaffold.</p>
            <div className="sf-link-list">
              <a href="/skills/prd-critic">Inspect the `prd-critic` skill page</a>
            </div>
          </Panel>
        </div>
        <div className="sf-link-list" style={{ marginTop: 12 }}>
          <a href="/flagships">See the flagship layer</a>
          <a href="/skills/prd-critic">Open `prd-critic`</a>
          <a href="/skills/repo-onboarding">Open `repo-onboarding`</a>
          <a href="/skills/customer-interview-synthesizer">Open `customer-interview-synthesizer`</a>
        </div>
      </section>

      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-copy">
            <div className="sf-kicker">Demo Flows</div>
            <h2>Three clean first demos.</h2>
            <p className="sf-note">Each one proves a different kind of value: critique quality, repository orientation, and evidence handling.</p>
          </div>
        </div>
        <div className="sf-grid sf-grid-3">
          <Panel className="sf-showcase-frame">
            <img alt="Studio view for PRD Critic" src="/showcase/studio-prd-critic-real.png" />
            <h2>PRD Critic</h2>
            <p>Good for a fast live demo because the value is obvious: weaker assumptions, scope leaks, and missing acceptance criteria become visible immediately.</p>
            <a href="/skills/prd-critic">Open the skill page</a>
          </Panel>
          <Panel className="sf-showcase-frame">
            <img alt="Studio view for Repo Onboarding" src="/showcase/studio-repo-onboarding-real.png" />
            <h2>Repo Onboarding</h2>
            <p>Shows that Skillforge can turn a real codebase into a faster first-week path instead of another architecture summary nobody uses.</p>
            <a href="/skills/repo-onboarding">Open the skill page</a>
          </Panel>
          <Panel className="sf-showcase-frame">
            <img alt="Studio view for Customer Interview Synthesizer" src="/showcase/studio-customer-interview-synthesizer-real.png" />
            <h2>Customer Interview Synthesizer</h2>
            <p>Demonstrates evidence handling: recurring themes, important outliers, and product implications stay separate instead of collapsing into generic insights.</p>
            <a href="/skills/customer-interview-synthesizer">Open the skill page</a>
          </Panel>
        </div>
      </section>

      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-copy">
            <div className="sf-kicker">Featured Flagships</div>
            <h2>Where to start if you want the strongest public assets.</h2>
            <p className="sf-note">These are the skills that best show workflow judgment, review posture, and reusable structure without pretending the entire library is equally mature.</p>
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

      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-copy">
            <div className="sf-kicker">Collections</div>
            <h2>Role-based starting points with cleaner context.</h2>
            <p className="sf-note">Packs keep the first pass practical. They group strong starting skills without over-claiming that one bundle solves an entire function.</p>
          </div>
        </div>
        <div className="sf-grid sf-grid-3">
          {collections.map((collection) => (
            <Panel key={collection.slug}>
              <h2>{collection.name}</h2>
              <p>{collection.summary}</p>
              <p className="sf-note">Audience: {collection.audience}</p>
              <div className="sf-link-list">
                {collection.skills.slice(0, 3).map((skill) => (
                  <a key={skill.slug} href={`/skills/${skill.slug}`}>
                    {skill.name}
                  </a>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      </section>

      {certified.length > 0 ? (
        <section className="sf-section">
          <div className="sf-kicker">Certified Now</div>
          <Panel>
            <p>
              Certified status is intentionally rare in v1. The current public set is{" "}
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
    </SiteShell>
  );
}
