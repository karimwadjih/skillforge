import { describe, expect, it } from "vitest";
import { loadSeedData } from "./index.ts";

describe("seed data", () => {
  it("contains the planned library and collection counts", async () => {
    const data = await loadSeedData();

    expect(data.skills).toHaveLength(60);
    expect(data.collections).toHaveLength(6);
    expect(data.skills.filter((skill) => skill.tier === "flagship")).toHaveLength(12);
  });
});
