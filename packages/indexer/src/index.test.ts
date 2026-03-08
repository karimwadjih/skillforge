import { describe, expect, it } from "vitest";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { findRepoRoot } from "@skillforge/shared";

describe("generated catalog", () => {
  it("contains the expected summary counts", async () => {
    const root = findRepoRoot();
    const summary = JSON.parse(
      await readFile(join(root, "packages", "catalog", "generated", "summary.json"), "utf8")
    ) as {
      totalSkills: number;
      developedCount: number;
      flagshipCount: number;
      certifiedCount: number;
    };

    expect(summary.totalSkills).toBe(60);
    expect(summary.developedCount).toBe(28);
    expect(summary.flagshipCount).toBe(12);
    expect(summary.certifiedCount).toBe(2);
  });
});
