import { validateLibrary } from "./index.ts";

async function main() {
  const result = await validateLibrary();

  if (result.warnings.length > 0) {
    console.log("Warnings:");
    for (const warning of result.warnings) {
      console.log(`- ${warning.path}: ${warning.message}`);
    }
  }

  if (result.errors.length > 0) {
    console.error("Errors:");
    for (const error of result.errors) {
      console.error(`- ${error.path}: ${error.message}`);
    }
    process.exit(1);
  }

  console.log(
    JSON.stringify(
      {
        skills_checked: result.checkedSkills,
        warnings: result.warnings.length,
        errors: result.errors.length
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
