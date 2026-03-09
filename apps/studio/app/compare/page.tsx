import { getCatalog } from "@skillforge/catalog";
import { Hero, StatCard } from "@skillforge/ui";
import { CompareView } from "../../components/compare-view";
import { StudioShell } from "../../components/studio-shell";

export default async function ComparePage() {
  const catalog = await getCatalog();

  return (
    <StudioShell>
      <Hero
        kicker="Compare"
        title="Compare the contracts and judgment layers, not just the names."
        subtitle="The compare surface is intentionally narrow: metadata, rubric posture, and examples/tests. That is enough to tell whether two skills genuinely differ or just reuse the same shape with different wording."
        aside={
          <>
            <StatCard label="Views" value="3" note="Metadata, rubric, and examples/tests." />
            <StatCard label="Pairing" value="2 skills" note="Side-by-side contract and evidence review." />
            <StatCard label="Default" value="PRD vs Spec" note="A useful contrast between critique and refinement." />
          </>
        }
      />
      <CompareView skills={catalog} />
    </StudioShell>
  );
}
