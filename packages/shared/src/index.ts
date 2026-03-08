import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import fg from "fast-glob";
import matter from "gray-matter";
import { z } from "zod";

export const categoryValues = [
  "research",
  "product",
  "engineering",
  "gtm",
  "ops",
  "docs",
  "infrastructure",
  "frontier"
] as const;

export const maturityValues = [
  "scaffold",
  "experimental",
  "frontier",
  "certified"
] as const;

export const evaluationStatusValues = [
  "unbenchmarked",
  "sampled",
  "benchmarked"
] as const;

export const manualReviewValues = [
  "pending",
  "passed",
  "needs-work"
] as const;

export const contentTierValues = [
  "seeded",
  "developed",
  "flagship"
] as const;

export const requiredSkillFiles = [
  "SKILL.md",
  "skill.json",
  "README.md",
  "agents/openai.yaml",
  "references/examples.md",
  "references/rubric.md",
  "references/edge-cases.md",
  "assets/template.md",
  "tests/happy-path.md",
  "tests/edge-path.md",
  "tests/failure-cases.md"
] as const;

export const placeholderPatterns = [
  /\btodo\b/i,
  /\btbd\b/i,
  /\blorem ipsum\b/i,
  /\bplaceholder\b/i,
  /\bcoming soon\b/i
];

export const skillMetadataSchema = z.object({
  slug: z.string().min(1),
  category: z.enum(categoryValues),
  maturity: z.enum(maturityValues),
  summary: z.string().min(1),
  triggers: z.array(z.string().min(1)).min(1),
  expected_inputs: z.array(z.string().min(1)).min(1),
  expected_outputs: z.array(z.string().min(1)).min(1),
  evaluation_status: z.enum(evaluationStatusValues),
  tags: z.array(z.string().min(1)).min(1),
  maintainers: z.array(z.string().min(1)).min(1),
  manual_review: z.enum(manualReviewValues).optional()
});

export const skillSeedSchema = skillMetadataSchema.extend({
  name: z.string().min(1),
  description: z.string().min(1),
  tier: z.enum(contentTierValues),
  problem: z.string().min(1),
  use_when: z.array(z.string().min(1)).min(1),
  avoid_when: z.array(z.string().min(1)).min(1),
  deliverable: z.string().min(1),
  scenarios: z.array(
    z.object({
      title: z.string().min(1),
      context: z.string().min(1),
      prompt: z.string().min(1),
      expected: z.array(z.string().min(1)).min(1)
    })
  ).min(1),
  rubric: z.array(
    z.object({
      criterion: z.string().min(1),
      strong: z.string().min(1),
      weak: z.string().min(1)
    })
  ).min(3),
  edge_cases: z.array(
    z.object({
      title: z.string().min(1),
      risk: z.string().min(1),
      response: z.string().min(1)
    })
  ).min(2),
  tests: z.object({
    happy_path: z.array(
      z.object({
        title: z.string().min(1),
        prompt: z.string().min(1),
        checks: z.array(z.string().min(1)).min(1)
      })
    ).min(1),
    edge_path: z.array(
      z.object({
        title: z.string().min(1),
        prompt: z.string().min(1),
        checks: z.array(z.string().min(1)).min(1)
      })
    ).min(1),
    failure_cases: z.array(
      z.object({
        title: z.string().min(1),
        prompt: z.string().min(1),
        checks: z.array(z.string().min(1)).min(1)
      })
    ).min(1)
  }),
  template_outline: z.array(z.string().min(1)).min(3)
});

export const seedCollectionSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  audience: z.string().min(1),
  included_skills: z.array(z.string().min(1)).min(1),
  use_cases: z.array(z.string().min(1)).min(1),
  quick_start: z.array(z.string().min(1)).min(2)
});

export const seedDataSchema = z.object({
  skills: z.array(skillSeedSchema).min(60),
  collections: z.array(seedCollectionSchema).min(6),
  certification: z.object({
    score_threshold: z.number().min(0).max(100),
    required_examples: z.number().min(1),
    required_tests: z.number().min(1),
    requires_benchmark_assets: z.boolean(),
    requires_manual_review: z.boolean()
  })
});

export type Category = (typeof categoryValues)[number];
export type Maturity = (typeof maturityValues)[number];
export type EvaluationStatus = (typeof evaluationStatusValues)[number];
export type ManualReview = (typeof manualReviewValues)[number];
export type ContentTier = (typeof contentTierValues)[number];
export type SkillMetadata = z.infer<typeof skillMetadataSchema>;
export type SkillSeed = z.infer<typeof skillSeedSchema>;
export type SeedCollection = z.infer<typeof seedCollectionSchema>;
export type SeedData = z.infer<typeof seedDataSchema>;

export type LoadedSkill = {
  directory: string;
  relativeDirectory: string;
  frontmatter: {
    name: string;
    description: string;
  };
  metadata: SkillMetadata;
  content: Record<string, string>;
};

export function findRepoRoot(start = process.cwd()): string {
  let current = resolve(start);

  while (true) {
    if (existsSync(join(current, "data", "skill-seeds.json"))) {
      return current;
    }

    const parent = dirname(current);
    if (parent === current) {
      throw new Error(`Unable to find repo root from ${start}`);
    }
    current = parent;
  }
}

export function repoPaths(root = findRepoRoot()) {
  return {
    root,
    data: join(root, "data", "skill-seeds.json"),
    skills: join(root, "skills"),
    collections: join(root, "collections"),
    evals: join(root, "evals"),
    scorecards: join(root, "evals", "scorecards"),
    results: join(root, "evals", "results"),
    catalogGenerated: join(root, "packages", "catalog", "generated"),
    dist: join(root, "dist")
  };
}

export async function ensureDir(path: string): Promise<void> {
  await mkdir(path, { recursive: true });
}

export async function readJson<T>(path: string): Promise<T> {
  const raw = await readFile(path, "utf8");
  return JSON.parse(raw) as T;
}

export async function writeJson(path: string, value: unknown): Promise<void> {
  await ensureDir(dirname(path));
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function writeText(path: string, value: string): Promise<void> {
  await ensureDir(dirname(path));
  await writeFile(path, value, "utf8");
}

export async function listDirectories(path: string): Promise<string[]> {
  const entries = await readdir(path, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => join(path, entry.name));
}

export async function loadSeedData(root = findRepoRoot()): Promise<SeedData> {
  const paths = repoPaths(root);
  const parsed = seedDataSchema.safeParse(await readJson(paths.data));
  if (!parsed.success) {
    throw new Error(`Invalid seed data: ${parsed.error.message}`);
  }
  return parsed.data;
}

export function readSkillFrontmatter(source: string): {
  name: string;
  description: string;
  content: string;
} {
  const parsed = matter(source);
  const keys = Object.keys(parsed.data);
  if (keys.length !== 2 || !keys.includes("name") || !keys.includes("description")) {
    throw new Error("SKILL.md frontmatter must contain only name and description");
  }

  const name = parsed.data.name;
  const description = parsed.data.description;
  if (typeof name !== "string" || typeof description !== "string") {
    throw new Error("SKILL.md frontmatter values must be strings");
  }

  return {
    name,
    description,
    content: parsed.content.trim()
  };
}

export async function loadSkill(skillDir: string, root = findRepoRoot()): Promise<LoadedSkill> {
  const files = Object.fromEntries(
    await Promise.all(
      requiredSkillFiles.map(async (relativePath) => {
        const absolutePath = join(skillDir, relativePath);
        const content = await readFile(absolutePath, "utf8");
        return [relativePath, content];
      })
    )
  ) as Record<string, string>;

  const frontmatter = readSkillFrontmatter(files["SKILL.md"]);
  const metadata = skillMetadataSchema.parse(JSON.parse(files["skill.json"]));

  return {
    directory: skillDir,
    relativeDirectory: skillDir.replace(`${root}/`, ""),
    frontmatter: {
      name: frontmatter.name,
      description: frontmatter.description
    },
    metadata,
    content: files
  };
}

export async function listSkillDirectories(root = findRepoRoot()): Promise<string[]> {
  const directories = await fg("skills/*/*", {
    cwd: root,
    absolute: true,
    onlyDirectories: true
  });

  return directories.sort((left, right) => left.localeCompare(right));
}

export async function loadAllSkills(root = findRepoRoot()): Promise<LoadedSkill[]> {
  const directories = await listSkillDirectories(root);
  return Promise.all(directories.map((directory) => loadSkill(directory, root)));
}

export function countMarkdownSections(source: string, marker = "## "): number {
  return source.split("\n").filter((line) => line.startsWith(marker)).length;
}

export function countBulletItems(source: string): number {
  return source
    .split("\n")
    .filter((line) => line.trim().startsWith("- ") || line.trim().match(/^\d+\.\s/))
    .length;
}

export function countOccurrences(source: string, pattern: string | RegExp): number {
  if (typeof pattern === "string") {
    return source.split(pattern).length - 1;
  }

  const matches = source.match(new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`));
  return matches ? matches.length : 0;
}

export function hasPlaceholderCopy(source: string): boolean {
  return placeholderPatterns.some((pattern) => pattern.test(source));
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export async function sha256File(path: string): Promise<string> {
  const content = await readFile(path);
  return createHash("sha256").update(content).digest("hex");
}

export function titleCase(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

export function formatOrderedList(items: string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

export function formatMatrix(rows: Array<{ title: string; body: string }>): string {
  return rows.map((row) => `### ${row.title}\n\n${row.body}`).join("\n\n");
}

export async function exists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function readFileIfExists(path: string): Promise<string> {
  return (await exists(path)) ? readFile(path, "utf8") : "";
}

export function relativeSkillKey(skill: Pick<SkillMetadata, "category" | "slug">): string {
  return `${skill.category}/${skill.slug}`;
}

export async function writeIfChanged(path: string, value: string): Promise<void> {
  const previous = await readFileIfExists(path);
  if (previous !== value) {
    await writeText(path, value);
  }
}

export function bySlug<T extends { slug: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((item) => [item.slug, item]));
}

export function sortByName<T extends { name: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => left.name.localeCompare(right.name));
}

export function isFlagship(skill: SkillSeed): boolean {
  return skill.tier === "flagship";
}

export function isDeveloped(skill: SkillSeed): boolean {
  return skill.tier === "flagship" || skill.tier === "developed";
}

export function compact<T>(items: Array<T | undefined | null | false>): T[] {
  return items.filter(Boolean) as T[];
}

export function stripFrontmatter(source: string): string {
  const parsed = matter(source);
  return parsed.content.trim();
}

export function getSkillFromPath(directory: string): { category: string; slug: string } {
  return {
    category: basename(dirname(directory)),
    slug: basename(directory)
  };
}
