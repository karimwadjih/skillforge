import { packageCollections, packageSkills } from "./index.ts";

function parseArg(flag: string) {
  const index = process.argv.indexOf(flag);
  if (index === -1) {
    return null;
  }
  return process.argv[index + 1] ?? null;
}

async function main() {
  const skillMode = parseArg("--skills");
  const collectionMode = parseArg("--collections");

  if (skillMode) {
    const mode = skillMode === "flagships" || skillMode === "all" ? skillMode : skillMode.split(",");
    const outputs = await packageSkills(mode);
    console.log(JSON.stringify({ packaged_skills: outputs }, null, 2));
    return;
  }

  if (collectionMode) {
    const mode = collectionMode === "all" ? "all" : collectionMode.split(",");
    const outputs = await packageCollections(mode);
    console.log(JSON.stringify({ packaged_collections: outputs }, null, 2));
    return;
  }

  throw new Error("Expected --skills <flagships|all|slug,...> or --collections <all|slug,...>");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
