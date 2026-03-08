import { notFound } from "next/navigation";
import { getCategories } from "@skillforge/catalog";
import { Hero, Panel, SkillCard } from "@skillforge/ui";
import { categoryProfiles, titleCaseCategory } from "../../../components/catalog-content";
import { SiteShell } from "../../../components/site-shell";

export async function generateStaticParams() {
  const categories = await getCategories();
  return Object.keys(categories).map((category) => ({ category }));
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categories = await getCategories();
  const skills = categories[category];

  if (!skills) {
    notFound();
  }

  const sortedSkills = skills.slice().sort((left, right) => {
    const tierWeight = (value: string) => (value === "flagship" ? 3 : value === "developed" ? 2 : 1);
    return tierWeight(right.tier) - tierWeight(left.tier) || right.score - left.score;
  });
  const profile = categoryProfiles[category];

  return (
    <SiteShell>
      <Hero
        kicker="Category View"
        title={profile?.title ?? titleCaseCategory(category)}
        subtitle={profile?.description ?? `This page shows the ${category} slice of Skillforge with maturity and score labels preserved.`}
      />
      <Panel style={{ marginTop: 24 }}>
        <h2>What this category is for</h2>
        <p>{profile?.angle ?? "Use this category when the workflow repeats often enough to justify a reusable skill package."}</p>
        <p className="sf-note">
          {skills.length} total skills. {skills.filter((skill) => skill.tier === "flagship").length} flagships.{" "}
          {skills.filter((skill) => skill.maturity === "certified").length} certified.
        </p>
      </Panel>
      <div className="sf-grid sf-grid-3" style={{ marginTop: 24 }}>
        {sortedSkills.map((skill) => (
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
    </SiteShell>
  );
}
