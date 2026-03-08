import { getCatalog } from "@skillforge/catalog";
import { Hero } from "@skillforge/ui";
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
      />
      <CompareView skills={catalog} />
    </StudioShell>
  );
}
