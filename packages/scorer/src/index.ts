import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  countOccurrences,
  countMarkdownSections,
  countBulletItems,
  findRepoRoot,
  hasPlaceholderCopy,
  loadAllSkills,
  loadSeedData,
  repoPaths,
  stripFrontmatter,
  type LoadedSkill,
  type SkillSeed,
  writeJson
} from "@skillforge/shared";

export type SkillScorecard = {
  slug: string;
  category: string;
  maturity: string;
  tier: string;
  total: number;
  breakdown: {
    structure: number;
    metadata: number;
    content: number;
    rubric: number;
    tests: number;
  };
  counts: {
    examples: number;
    edgeCases: number;
    tests: number;
    rubricCriteria: number;
    benchmarkAssets: number;
  };
  benchmarkCovered: boolean;
  certificationEligible: boolean;
  recommendations: string[];
};

function examplesCount(skill: LoadedSkill) {
  return countOccurrences(skill.content["references/examples.md"], /^## /gm);
}

function edgeCaseCount(skill: LoadedSkill) {
  return countOccurrences(skill.content["references/edge-cases.md"], /^## /gm);
}

function testCount(skill: LoadedSkill) {
  return [
    skill.content["tests/happy-path.md"],
    skill.content["tests/edge-path.md"],
    skill.content["tests/failure-cases.md"]
  ]
    .map((source) => countOccurrences(source, /^## /gm))
    .reduce((sum, count) => sum + count, 0);
}

function rubricCriteriaCount(skill: LoadedSkill) {
  return skill.content["references/rubric.md"]
    .split("\n")
    .filter((line) => line.startsWith("| ") && !line.includes("---") && !line.includes("Criterion"))
    .length;
}

function scoreStructure(skill: LoadedSkill) {
  const populatedFiles = Object.values(skill.content).filter((value) => value.trim().length > 0).length;
  return Math.round((populatedFiles / Object.keys(skill.content).length) * 30);
}

function scoreMetadata(skill: LoadedSkill) {
  let score = 0;
  if (skill.frontmatter.name.trim().length > 0) {
    score += 5;
  }
  if (skill.frontmatter.description.trim().length > 0) {
    score += 5;
  }
  if (skill.metadata.summary.trim().length > 40) {
    score += 4;
  }
  if (skill.metadata.triggers.length > 0 && skill.metadata.expected_inputs.length > 0 && skill.metadata.expected_outputs.length > 0) {
    score += 4;
  }
  if (skill.metadata.tags.length > 1 && skill.metadata.maintainers.length > 0) {
    score += 2;
  }
  return score;
}

function scoreContent(skill: LoadedSkill, tier: SkillSeed["tier"]) {
  const examples = examplesCount(skill);
  const edgeCases = edgeCaseCount(skill);
  const skillBody = stripFrontmatter(skill.content["SKILL.md"]);
  const readme = skill.content["README.md"];

  let score = 0;
  score += Math.min(5, Math.floor(skillBody.length / 350));
  score += Math.min(4, Math.floor(readme.length / 300));
  score += Math.min(9, examples * 3);
  score += Math.min(5, edgeCases * 2);
  score += countMarkdownSections(skillBody) >= 6 ? 2 : 0;

  if (tier === "seeded") {
    score = Math.min(score, 16);
  } else if (tier === "developed") {
    score = Math.min(score, 21);
  }

  if (hasPlaceholderCopy(skillBody) || hasPlaceholderCopy(readme)) {
    score = Math.max(0, score - 6);
  }

  return score;
}

function scoreRubric(skill: LoadedSkill) {
  const criteria = rubricCriteriaCount(skill);
  const source = skill.content["references/rubric.md"];
  let score = Math.min(6, criteria * 2);
  if (source.includes("Certification Note")) {
    score += 2;
  }
  if (countBulletItems(source) >= 1 || source.length > 350) {
    score += 2;
  }
  return Math.min(score, 10);
}

function scoreTests(skill: LoadedSkill, tier: SkillSeed["tier"]) {
  const total = testCount(skill);
  let score = Math.min(10, Math.round((total / 6) * 10));
  const allFilesPresent = [
    "tests/happy-path.md",
    "tests/edge-path.md",
    "tests/failure-cases.md"
  ].every((path) => skill.content[path].trim().length > 0);
  if (allFilesPresent) {
    score += 5;
  }

  if (tier === "seeded") {
    score = Math.min(score, 9);
  }

  return Math.min(score, 15);
}

function collectRecommendations(card: SkillScorecard): string[] {
  const recommendations: string[] = [];
  if (card.counts.examples < 3) {
    recommendations.push("Add more realistic examples to strengthen reuse and evaluation coverage.");
  }
  if (card.counts.tests < 3) {
    recommendations.push("Increase test coverage across happy, edge, and failure paths.");
  }
  if (!card.benchmarkCovered && card.tier === "flagship") {
    recommendations.push("Add benchmark assets so flagship content is easier to compare over time.");
  }
  if (card.total < 80) {
    recommendations.push("Deepen the instructions, examples, and README so the skill is easier to trust and apply.");
  }
  return recommendations;
}

function compareScorecards(left: SkillScorecard, right: SkillScorecard) {
  return (
    right.total - left.total ||
    left.category.localeCompare(right.category) ||
    left.slug.localeCompare(right.slug)
  );
}

export async function scoreAllSkills(root = findRepoRoot()): Promise<SkillScorecard[]> {
  const seedData = await loadSeedData(root);
  const seedMap = new Map(seedData.skills.map((skill) => [skill.slug, skill]));
  const skills = await loadAllSkills(root);
  const paths = repoPaths(root);

  const cards: SkillScorecard[] = skills.map((skill) => {
    const seed = seedMap.get(skill.metadata.slug);
    if (!seed) {
      throw new Error(`Missing seed for ${skill.metadata.slug}`);
    }

    const benchmarkCovered =
      skill.metadata.evaluation_status === "benchmarked" &&
      [
        join(paths.evals, "golden-prompts", `${skill.metadata.slug}.md`),
        join(paths.evals, "benchmark-cases", `${skill.metadata.slug}.json`)
      ].every((path) => existsSync(path));

    const structure = scoreStructure(skill);
    const metadata = scoreMetadata(skill);
    const content = scoreContent(skill, seed.tier);
    const rubric = scoreRubric(skill);
    const tests = scoreTests(skill, seed.tier);
    const total = structure + metadata + content + rubric + tests;

    const card: SkillScorecard = {
      slug: skill.metadata.slug,
      category: skill.metadata.category,
      maturity: skill.metadata.maturity,
      tier: seed.tier,
      total,
      breakdown: {
        structure,
        metadata,
        content,
        rubric,
        tests
      },
      counts: {
        examples: examplesCount(skill),
        edgeCases: edgeCaseCount(skill),
        tests: testCount(skill),
        rubricCriteria: rubricCriteriaCount(skill),
        benchmarkAssets: benchmarkCovered ? 2 : 0
      },
      benchmarkCovered,
      certificationEligible:
        total >= seedData.certification.score_threshold &&
        examplesCount(skill) >= seedData.certification.required_examples &&
        testCount(skill) >= seedData.certification.required_tests &&
        benchmarkCovered &&
        skill.metadata.manual_review === "passed",
      recommendations: []
    };

    card.recommendations = collectRecommendations(card);
    return card;
  });

  return cards.sort(compareScorecards);
}

export async function writeScorecards(root = findRepoRoot()) {
  const cards = await scoreAllSkills(root);
  const paths = repoPaths(root);
  const summary = {
    totals: {
      skills: cards.length,
      certifiedEligible: cards.filter((card) => card.certificationEligible).length
    },
    by_maturity: Object.fromEntries(
      Array.from(new Set(cards.map((card) => card.maturity))).map((maturity) => [
        maturity,
        cards.filter((card) => card.maturity === maturity).length
      ])
    ),
    average_score: Math.round(cards.reduce((sum, card) => sum + card.total, 0) / cards.length)
  };

  await Promise.all(
    cards.map((card) => writeJson(join(paths.scorecards, `${card.slug}.json`), card))
  );
  await writeJson(join(paths.scorecards, "summary.json"), summary);
  return { cards, summary };
}
