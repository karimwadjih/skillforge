import { getCatalog, getSummary } from "@skillforge/catalog";
import { Hero, StatCard } from "@skillforge/ui";
import { CatalogBrowser } from "../components/catalog-browser";
import { StarterForm } from "../components/starter-form";
import { StudioShell } from "../components/studio-shell";

export default async function StudioHomePage() {
  const catalog = await getCatalog();
  const summary = await getSummary();

  return (
    <StudioShell>
      <Hero
        kicker="Studio"
        title="Inspect the library, compare judgment layers, and scaffold clean starting points."
        subtitle="The studio stays intentionally narrow in v1: browse/filter, evidence-rich detail views, basic compare mode, and starter-skill generation. The goal is a useful public surface, not a fake internal platform."
        aside={
          <>
            <StatCard label="Skills" value={summary.totalSkills} note="Pulled from the generated catalog." />
            <StatCard label="Developed + Flagship" value={summary.developedCount} note="The depth labels are literal, not marketing." />
            <StatCard label="Certified" value={summary.certifiedCount} note="Small by design." />
          </>
        }
      />
      <CatalogBrowser skills={catalog} />
      <StarterForm />
    </StudioShell>
  );
}
