import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const fromRepoRoot = (value: string) => fileURLToPath(new URL(value, import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["packages/**/*.test.ts", "scripts/**/*.test.ts"]
  },
  resolve: {
    alias: {
      "@skillforge/shared": fromRepoRoot("./packages/shared/src/index.ts"),
      "@skillforge/catalog": fromRepoRoot("./packages/catalog/src/index.ts"),
      "@skillforge/ui": fromRepoRoot("./packages/ui/src/index.tsx"),
      "@skillforge/ui/styles.css": fromRepoRoot("./packages/ui/src/styles.css"),
      "@skillforge/validator": fromRepoRoot("./packages/validator/src/index.ts"),
      "@skillforge/scorer": fromRepoRoot("./packages/scorer/src/index.ts"),
      "@skillforge/packager": fromRepoRoot("./packages/packager/src/index.ts"),
      "@skillforge/indexer": fromRepoRoot("./packages/indexer/src/index.ts")
    }
  }
});
