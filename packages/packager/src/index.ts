import { createWriteStream } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import archiver from "archiver";
import {
  ensureDir,
  findRepoRoot,
  loadSeedData,
  repoPaths,
  writeJson
} from "@skillforge/shared";

async function listFilesRecursive(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const collected = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = join(root, entry.name);
      if (entry.isDirectory()) {
        return listFilesRecursive(absolutePath);
      }
      return [absolutePath];
    })
  );

  return collected.flat();
}

async function checksumLines(files: Array<{ absolute: string; relative: string }>) {
  const lines = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(file.absolute);
      const digest = createHash("sha256").update(content).digest("hex");
      return `${digest}  ${file.relative}`;
    })
  );

  return `${lines.join("\n")}\n`;
}

async function createArchive(
  outputPath: string,
  type: "zip" | "tar",
  populate: (archive: any) => Promise<void> | void
) {
  await ensureDir(dirname(outputPath));
  const archive =
    type === "zip"
      ? archiver("zip", { zlib: { level: 9 } })
      : archiver("tar", { gzip: true, gzipOptions: { level: 9 } });

  const output = createWriteStream(outputPath);
  const completion = new Promise<void>((resolve, reject) => {
    output.on("close", () => resolve());
    output.on("error", reject);
    archive.on("error", reject);
  });

  archive.pipe(output);
  await populate(archive);
  await archive.finalize();
  await completion;
}

export async function packageSkills(
  mode: "flagships" | "all" | string[],
  root = findRepoRoot()
) {
  const seedData = await loadSeedData(root);
  const paths = repoPaths(root);
  const targets =
    mode === "all"
      ? seedData.skills
      : mode === "flagships"
        ? seedData.skills.filter((skill) => skill.tier === "flagship")
        : seedData.skills.filter((skill) => mode.includes(skill.slug));

  const packaged: string[] = [];

  for (const skill of targets) {
    const skillDir = join(paths.skills, skill.category, skill.slug);
    const files = (await listFilesRecursive(skillDir)).map((absolute) => ({
      absolute,
      relative: absolute.replace(`${skillDir}/`, "")
    }));
    const outputPath = join(paths.dist, "skills", skill.slug, "skill.zip");
    const manifest = {
      type: "skill",
      slug: skill.slug,
      category: skill.category,
      maturity: skill.maturity,
      bundled_at: new Date().toISOString(),
      included_files: files.map((file) => file.relative)
    };
    const checksums = await checksumLines(files);

    await createArchive(outputPath, "zip", async (archive) => {
      for (const file of files) {
        archive.file(file.absolute, { name: join(skill.slug, file.relative) });
      }
      archive.append(JSON.stringify(manifest, null, 2), { name: join(skill.slug, "manifest.json") });
      archive.append(checksums, { name: join(skill.slug, "checksums.txt") });
    });

    await writeJson(join(paths.dist, "skills", skill.slug, "manifest.json"), manifest);
    packaged.push(outputPath.replace(`${root}/`, ""));
  }

  return packaged;
}

export async function packageCollections(
  mode: "all" | string[],
  root = findRepoRoot()
) {
  const seedData = await loadSeedData(root);
  const paths = repoPaths(root);
  const collections =
    mode === "all"
      ? seedData.collections
      : seedData.collections.filter((collection) => mode.includes(collection.slug));
  const packaged: string[] = [];

  for (const collection of collections) {
    const collectionDir = join(paths.collections, collection.slug);
    const collectionFiles = (await listFilesRecursive(collectionDir)).map((absolute) => ({
      absolute,
      relative: absolute.replace(`${collectionDir}/`, "")
    }));
    const includedSkillRoots = seedData.skills.filter((skill) => collection.included_skills.includes(skill.slug));
    const skillFiles = (
      await Promise.all(
        includedSkillRoots.map(async (skill) => {
          const skillDir = join(paths.skills, skill.category, skill.slug);
          const files = await listFilesRecursive(skillDir);
          return files.map((absolute) => ({
            absolute,
            relative: join("skills", skill.slug, absolute.replace(`${skillDir}/`, ""))
          }));
        })
      )
    ).flat();

    const allFiles = [...collectionFiles.map((file) => ({ ...file, relative: join(collection.slug, file.relative) })), ...skillFiles];
    const outputPath = join(paths.dist, "collections", `${collection.slug}.tar.gz`);
    const manifest = {
      type: "collection",
      slug: collection.slug,
      bundled_at: new Date().toISOString(),
      included_skills: collection.included_skills,
      included_files: allFiles.map((file) => file.relative)
    };
    const checksums = await checksumLines(allFiles);

    await createArchive(outputPath, "tar", async (archive) => {
      for (const file of allFiles) {
        archive.file(file.absolute, { name: file.relative });
      }
      archive.append(JSON.stringify(manifest, null, 2), { name: join(collection.slug, "bundle-manifest.json") });
      archive.append(checksums, { name: join(collection.slug, "checksums.txt") });
    });

    await writeJson(join(paths.dist, "collections", `${collection.slug}.manifest.json`), manifest);
    packaged.push(outputPath.replace(`${root}/`, ""));
  }

  return packaged;
}
