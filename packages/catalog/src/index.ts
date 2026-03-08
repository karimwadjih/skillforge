import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { findRepoRoot } from "@skillforge/shared";

export type CatalogSkill = {
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

export type CatalogCollection = {
  slug: string;
  name: string;
  summary: string;
  audience: string;
  included_skills: string[];
  use_cases: string[];
  quick_start: string[];
  skills: CatalogSkill[];
};

async function readGenerated<T>(filename: string): Promise<T> {
  const root = findRepoRoot();
  const source = await readFile(join(root, "packages", "catalog", "generated", filename), "utf8");
  return JSON.parse(source) as T;
}

export async function getCatalog() {
  return readGenerated<CatalogSkill[]>("catalog.json");
}

export async function getCollections() {
  return readGenerated<CatalogCollection[]>("collections.json");
}

export async function getFlagships() {
  return readGenerated<CatalogSkill[]>("flagships.json");
}

export async function getSummary() {
  return readGenerated<Record<string, number>>("summary.json");
}

export async function getCategories() {
  return readGenerated<Record<string, CatalogSkill[]>>("categories.json");
}

export async function getSkillBySlug(slug: string) {
  const catalog = await getCatalog();
  return catalog.find((skill) => skill.slug === slug) ?? null;
}
