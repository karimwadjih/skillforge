import { join } from "node:path";
import {
  compact,
  findRepoRoot,
  loadAllSkills,
  loadSeedData,
  repoPaths,
  stripFrontmatter,
  writeIfChanged,
  writeJson
} from "@skillforge/shared";
import { scoreAllSkills } from "@skillforge/scorer";

type CatalogSkill = {
  name: string;
  slug: string;
  description: string;
  category: string;
  maturity: string;
  tier: string;
  summary: string;
  triggers: string[];
  expected_inputs: string[];
  expected_outputs: string[];
  evaluation_status: string;
  tags: string[];
  maintainers: string[];
  manual_review?: string;
  score: number;
  benchmark_covered: boolean;
  certification_eligible: boolean;
  counts: {
    examples: number;
    tests: number;
    rubric_criteria: number;
  };
  content: {
    skill: string;
    readme: string;
    examples: string;
    rubric: string;
    edge_cases: string;
    template: string;
    happy_path: string;
    edge_path: string;
    failure_cases: string;
    openai_yaml: string;
  };
};

const categoryDescriptions: Record<string, string> = {
  docs: "Operational documentation, release communication, and support-facing writing workflows.",
  engineering: "Codebase comprehension, triage, migration, and implementation-facing technical workflows.",
  frontier: "Evaluation, tool-contract, multimodal, and agent-behavior workflows near the edge of current practice.",
  gtm: "Launch, positioning, sales, messaging, and pipeline workflows for revenue-facing teams.",
  infrastructure: "Deployment, on-call, drift, dependency, and platform-readiness workflows.",
  ops: "Operating cadence, executive prep, KPI analysis, and escalation workflows.",
  product: "PRDs, interviews, tradeoffs, specs, pricing, and product-risk workflows.",
  research: "Research synthesis, evidence quality, competitor analysis, and benchmark interpretation workflows."
};

function renderSkillsIndex(
  summary: {
    totalSkills: number;
    developedCount: number;
    flagshipCount: number;
    certifiedCount: number;
  },
  byCategory: Record<string, CatalogSkill[]>,
  flagships: CatalogSkill[],
  collections: Array<{
    slug: string;
    name: string;
    summary: string;
    skills: CatalogSkill[];
  }>
) {
  const flagshipRows = flagships
    .sort((left, right) => right.score - left.score)
    .map((skill) => `- \`${skill.slug}\` [${skill.maturity}] - ${skill.summary}`)
    .join("\n");

  const collectionRows = collections
    .map((collection) => `- \`${collection.slug}\` - ${collection.summary}`)
    .join("\n");

  const sections = Object.entries(byCategory)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([category, skills]) => {
      const developed = skills.filter((skill) => skill.tier !== "seeded").length;
      const certified = skills.filter((skill) => skill.maturity === "certified").length;
      const rows = skills
        .sort((left, right) => left.name.localeCompare(right.name))
        .map((skill) => `- \`${skill.slug}\` [${skill.maturity} | ${skill.tier}] - ${skill.summary}`)
        .join("\n");

      return `## ${category}

${categoryDescriptions[category] ?? "Curated workflow Skills for this operating area."}

- Skills in category: ${skills.length}
- Meaningfully filled or flagship: ${developed}
- Certified: ${certified}

${rows}`;
    })
    .join("\n\n");

  return `# Skill Library

Skillforge is a seeded but curated registry. It combines breadth with explicit quality labels so readers can tell the difference between a starter scaffold, a developed workflow, a flagship asset, and a certified Skill.

## Library Shape

- Total seeded skills: ${summary.totalSkills}
- Meaningfully filled skills: ${summary.developedCount}
- Flagship skills: ${summary.flagshipCount}
- Certified skills: ${summary.certifiedCount}

Skillforge distinguishes seeded breadth from developed depth. Do not assume the full library is uniformly polished.

## Start Here

- Want the strongest public assets first: start with the flagship tier.
- Want role-based bundles: use one of the collections.
- Want benchmark-backed and manually reviewed assets: look for \`certified\`.

## Maturity Guide

- \`scaffold\`: intentionally incomplete starter material.
- \`experimental\`: usable, but still light on validation or depth.
- \`frontier\`: differentiated and substantially stronger.
- \`certified\`: benchmarked, reviewed, and held to the strictest public bar.

## Flagship Skills

${flagshipRows}

## Collections

${collectionRows}

${sections}
`;
}

export async function generateCatalog(root = findRepoRoot()) {
  const seedData = await loadSeedData(root);
  const loadedSkills = await loadAllSkills(root);
  const scorecards = await scoreAllSkills(root);
  const scoreMap = new Map(scorecards.map((card) => [card.slug, card]));
  const seedMap = new Map(seedData.skills.map((skill) => [skill.slug, skill]));
  const paths = repoPaths(root);

  const catalogSkills: CatalogSkill[] = loadedSkills.map((skill) => {
    const seed = seedMap.get(skill.metadata.slug);
    const scorecard = scoreMap.get(skill.metadata.slug);
    if (!seed || !scorecard) {
      throw new Error(`Missing seed or scorecard for ${skill.metadata.slug}`);
    }

    return {
      name: skill.frontmatter.name,
      slug: skill.metadata.slug,
      description: skill.frontmatter.description,
      category: skill.metadata.category,
      maturity: skill.metadata.maturity,
      tier: seed.tier,
      summary: skill.metadata.summary,
      triggers: skill.metadata.triggers,
      expected_inputs: skill.metadata.expected_inputs,
      expected_outputs: skill.metadata.expected_outputs,
      evaluation_status: skill.metadata.evaluation_status,
      tags: skill.metadata.tags,
      maintainers: skill.metadata.maintainers,
      manual_review: skill.metadata.manual_review,
      score: scorecard.total,
      benchmark_covered: scorecard.benchmarkCovered,
      certification_eligible: scorecard.certificationEligible,
      counts: {
        examples: scorecard.counts.examples,
        tests: scorecard.counts.tests,
        rubric_criteria: scorecard.counts.rubricCriteria
      },
      content: {
        skill: stripFrontmatter(skill.content["SKILL.md"]),
        readme: skill.content["README.md"],
        examples: skill.content["references/examples.md"],
        rubric: skill.content["references/rubric.md"],
        edge_cases: skill.content["references/edge-cases.md"],
        template: skill.content["assets/template.md"],
        happy_path: skill.content["tests/happy-path.md"],
        edge_path: skill.content["tests/edge-path.md"],
        failure_cases: skill.content["tests/failure-cases.md"],
        openai_yaml: skill.content["agents/openai.yaml"]
      }
    };
  });

  const byCategory = Object.fromEntries(
    Array.from(new Set(catalogSkills.map((skill) => skill.category))).map((category) => [
      category,
      catalogSkills.filter((skill) => skill.category === category)
    ])
  );

  const collections = seedData.collections.map((collection) => ({
    ...collection,
    skills: compact(collection.included_skills.map((slug) => catalogSkills.find((skill) => skill.slug === slug)))
  }));

  const flagships = catalogSkills.filter((skill) => skill.tier === "flagship");
  const summary = {
    totalSkills: catalogSkills.length,
    developedCount: catalogSkills.filter((skill) => skill.tier !== "seeded").length,
    flagshipCount: flagships.length,
    certifiedCount: catalogSkills.filter((skill) => skill.maturity === "certified").length,
    averageScore: Math.round(catalogSkills.reduce((sum, skill) => sum + skill.score, 0) / catalogSkills.length)
  };

  await writeJson(join(paths.catalogGenerated, "catalog.json"), catalogSkills);
  await writeJson(join(paths.catalogGenerated, "collections.json"), collections);
  await writeJson(join(paths.catalogGenerated, "flagships.json"), flagships);
  await writeJson(join(paths.catalogGenerated, "categories.json"), byCategory);
  await writeJson(join(paths.catalogGenerated, "summary.json"), summary);
  await writeIfChanged(join(root, "SKILLS.md"), renderSkillsIndex(summary, byCategory, flagships, collections));

  return {
    summary,
    catalogSkills,
    collections,
    flagships
  };
}
