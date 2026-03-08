import { describe, expect, it } from "vitest";
import { scoreAllSkills } from "./index.ts";

describe("scoreAllSkills", () => {
  it("identifies the certified flagship subset as certification eligible", async () => {
    const cards = await scoreAllSkills();
    const repoOnboarding = cards.find((card) => card.slug === "repo-onboarding");
    const researchDossier = cards.find((card) => card.slug === "research-dossier");

    expect(repoOnboarding?.certificationEligible).toBe(true);
    expect(researchDossier?.certificationEligible).toBe(true);
    expect(cards.filter((card) => card.certificationEligible)).toHaveLength(2);
  });
});
