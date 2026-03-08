import { Hero, Panel } from "@skillforge/ui";
import { SiteShell } from "../../../components/site-shell";

export default function PhilosophyPage() {
  return (
    <SiteShell>
      <Hero
        kicker="Philosophy"
        title="Reusable workflows deserve structure, evidence, and review."
        subtitle="Skillforge is built on a simple premise: if a workflow is repeated enough to rely on, it should be documented, tested, benchmarked, and packaged with the same care as software."
      />
      <div className="sf-grid sf-grid-2" style={{ marginTop: 24 }}>
        <Panel>
          <h2>What Skillforge is not</h2>
          <p>It is not a prompt dump, a fake adoption page, or an official vendor project. The language stays conservative and the quality claims are tied to actual repository evidence.</p>
        </Panel>
        <Panel>
          <h2>What Skillforge optimizes for</h2>
          <p>Portable skill packages, visible maturity states, contributor-ready tooling, and public artifacts that can survive real review.</p>
        </Panel>
      </div>
    </SiteShell>
  );
}
