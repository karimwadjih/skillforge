import { describe, expect, it } from "vitest";
import { validateLibrary } from "./index.ts";

describe("validateLibrary", () => {
  it("passes the generated v1 library without errors", async () => {
    const result = await validateLibrary();
    expect(result.errors).toHaveLength(0);
  });
});
