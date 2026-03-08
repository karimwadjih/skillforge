import { Hero, MarkdownArticle, Panel } from "@skillforge/ui";
import { SiteShell } from "../../../components/site-shell";

const source = `
# Packaging guide

## Individual Skills

- Output path: \`dist/skills/<slug>/skill.zip\`
- Includes the skill directory, bundle manifest, and checksums.

## Collections

- Output path: \`dist/collections/<slug>.tar.gz\`
- Includes collection metadata plus the referenced skill directories.

## Why the split exists

Skill zips are convenient starter bundles. Collection tarballs preserve larger grouped assets with a manifest and bundled skill folders.
`;

export default function PackagingGuidePage() {
  return (
    <SiteShell>
      <Hero kicker="Packaging" title="Portable skill bundles with explicit manifests." subtitle="Packaging is part of the repo contract. Individual Skills ship as `skill.zip`, while curated collections ship as `.tar.gz` bundles with manifests and checksums." />
      <Panel style={{ marginTop: 24 }}>
        <MarkdownArticle source={source} />
      </Panel>
    </SiteShell>
  );
}
