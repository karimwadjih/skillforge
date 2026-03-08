import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["packages/**/*.test.ts", "scripts/**/*.test.ts"]
  },
  resolve: {
    alias: {
      "@skillforge/shared": "/Users/karimwadjih/skillforge/packages/shared/src/index.ts",
      "@skillforge/catalog": "/Users/karimwadjih/skillforge/packages/catalog/src/index.ts",
      "@skillforge/ui": "/Users/karimwadjih/skillforge/packages/ui/src/index.tsx",
      "@skillforge/ui/styles.css": "/Users/karimwadjih/skillforge/packages/ui/src/styles.css",
      "@skillforge/validator": "/Users/karimwadjih/skillforge/packages/validator/src/index.ts",
      "@skillforge/scorer": "/Users/karimwadjih/skillforge/packages/scorer/src/index.ts",
      "@skillforge/packager": "/Users/karimwadjih/skillforge/packages/packager/src/index.ts",
      "@skillforge/indexer": "/Users/karimwadjih/skillforge/packages/indexer/src/index.ts"
    }
  }
});
