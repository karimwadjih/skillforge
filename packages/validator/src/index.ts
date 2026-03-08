import { join } from "node:path";
import { scoreAllSkills } from "@skillforge/scorer";
import {
  countOccurrences,
  findRepoRoot,
  getSkillFromPath,
  hasPlaceholderCopy,
  listSkillDirectories,
  loadSeedData,
  loadSkill,
  readJson,
  requiredSkillFiles,
  exists,
  type LoadedSkill
} from "@skillforge/shared";

export type ValidationMessage = {
  severity: "error" | "warning";
  path: string;
  message: string;
};

function exampleCount(skill: LoadedSkill) {
  return countOccurrences(skill.content["references/examples.md"], /^## /gm);
}

function totalTests(skill: LoadedSkill) {
  return [
    skill.content["tests/happy-path.md"],
    skill.content["tests/edge-path.md"],
    skill.content["tests/failure-cases.md"]
  ]
    .map((source) => countOccurrences(source, /^## /gm))
    .reduce((sum, count) => sum + count, 0);
}

function checkPlaceholderCopy(skill: LoadedSkill): ValidationMessage[] {
  return Object.entries(skill.content)
    .filter(([, content]) => hasPlaceholderCopy(content))
    .map(([relativePath]) => ({
      severity: "error" as const,
      path: join(skill.relativeDirectory, relativePath),
      message: "Contains placeholder copy that should be replaced with real content."
    }));
}

export async function validateLibrary(root = findRepoRoot()) {
  const seedData = await loadSeedData(root);
  const seedMap = new Map(seedData.skills.map((skill) => [skill.slug, skill]));
  const actualDirs = await listSkillDirectories(root);
  const messages: ValidationMessage[] = [];

  for (const directory of actualDirs) {
    const { slug, category } = getSkillFromPath(directory);
    const seed = seedMap.get(slug);

    if (!seed) {
      messages.push({
        severity: "error",
        path: directory.replace(`${root}/`, ""),
        message: "Skill directory is not declared in data/skill-seeds.json."
      });
      continue;
    }

    if (seed.category !== category) {
      messages.push({
        severity: "error",
        path: directory.replace(`${root}/`, ""),
        message: `Seed category ${seed.category} does not match folder category ${category}.`
      });
    }

    for (const relativeFile of requiredSkillFiles) {
      if (!(await exists(join(directory, relativeFile)))) {
        messages.push({
          severity: "error",
          path: join(directory.replace(`${root}/`, ""), relativeFile),
          message: "Required skill file is missing."
        });
      }
    }

    const skill = await loadSkill(directory, root);
    if (skill.metadata.slug !== slug) {
      messages.push({
        severity: "error",
        path: skill.relativeDirectory,
        message: `skill.json slug ${skill.metadata.slug} does not match folder slug ${slug}.`
      });
    }
    if (skill.metadata.category !== category) {
      messages.push({
        severity: "error",
        path: skill.relativeDirectory,
        message: `skill.json category ${skill.metadata.category} does not match folder category ${category}.`
      });
    }
    if (skill.frontmatter.name !== seed.name) {
      messages.push({
        severity: "warning",
        path: join(skill.relativeDirectory, "SKILL.md"),
        message: "Skill name differs from the seed entry. Confirm this is intentional."
      });
    }
    messages.push(...checkPlaceholderCopy(skill));

    const examples = exampleCount(skill);
    const tests = totalTests(skill);
    if (seed.tier === "flagship" && examples < 3) {
      messages.push({
        severity: "error",
        path: skill.relativeDirectory,
        message: "Flagship skills must include at least three examples."
      });
    }
    if (seed.tier === "flagship" && tests < 3) {
      messages.push({
        severity: "error",
        path: skill.relativeDirectory,
        message: "Flagship skills must include at least three tests."
      });
    }
    if (seed.tier === "developed" && examples < 2) {
      messages.push({
        severity: "warning",
        path: skill.relativeDirectory,
        message: "Developed skills should usually include at least two examples."
      });
    }
  }

  const actualSlugs = new Set(actualDirs.map((directory) => getSkillFromPath(directory).slug));
  for (const seed of seedData.skills) {
    if (!actualSlugs.has(seed.slug)) {
      messages.push({
        severity: "error",
        path: `skills/${seed.category}/${seed.slug}`,
        message: "Seeded skill is missing from the library tree."
      });
    }
  }

  for (const collection of seedData.collections) {
    const manifestPath = join(root, "collections", collection.slug, "manifest.json");
    const readmePath = join(root, "collections", collection.slug, "README.md");
    if (!(await exists(manifestPath))) {
      messages.push({
        severity: "error",
        path: manifestPath.replace(`${root}/`, ""),
        message: "Collection manifest is missing."
      });
      continue;
    }
    if (!(await exists(readmePath))) {
      messages.push({
        severity: "error",
        path: readmePath.replace(`${root}/`, ""),
        message: "Collection README is missing."
      });
    }

    const manifest = await readJson<{
      included_skills: string[];
      slug: string;
    }>(manifestPath);
    for (const slug of manifest.included_skills) {
      if (!seedMap.has(slug)) {
        messages.push({
          severity: "error",
          path: manifestPath.replace(`${root}/`, ""),
          message: `Collection references unknown skill ${slug}.`
        });
      }
    }
  }

  const scorecards = await scoreAllSkills(root);
  for (const card of scorecards) {
    if (card.tier === "flagship" && !card.benchmarkCovered) {
      messages.push({
        severity: "error",
        path: `evals/benchmark-cases/${card.slug}.json`,
        message: "Flagship skills must have benchmark assets."
      });
    }
    if (card.maturity === "certified" && !card.certificationEligible) {
      messages.push({
        severity: "error",
        path: `skills/${card.category}/${card.slug}`,
        message: "Certified skills must satisfy benchmark, scoring, example, test, and manual-review gates."
      });
    }
  }

  return {
    checkedSkills: actualDirs.length,
    messages,
    errors: messages.filter((message) => message.severity === "error"),
    warnings: messages.filter((message) => message.severity === "warning")
  };
}
