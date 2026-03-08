import { writeScorecards } from "./index.ts";

async function main() {
  const { summary } = await writeScorecards();
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
