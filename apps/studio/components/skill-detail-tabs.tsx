"use client";

import { useState } from "react";
import type { CatalogSkill } from "@skillforge/catalog";
import { Badge, MarkdownArticle, Panel, cx } from "@skillforge/ui";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "rubric", label: "Rubric" },
  { id: "examples", label: "Examples" },
  { id: "tests", label: "Tests" }
] as const;

function stripHeading(source: string) {
  return source.replace(/^# .+\n\n/, "");
}

export function SkillDetailTabs({ skill }: { skill: CatalogSkill }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const source =
    tab === "overview"
      ? stripHeading(skill.content.readme)
      : tab === "rubric"
      ? skill.content.rubric
      : tab === "examples"
        ? skill.content.examples
        : `${skill.content.happy_path}\n\n${skill.content.edge_path}\n\n${skill.content.failure_cases}`;

  return (
    <Panel style={{ marginTop: 24 }}>
      <div className="sf-section-head">
        <div className="sf-section-copy">
          <div className="sf-kicker">Evidence View</div>
          <h2>Inspect the skill before you reuse it.</h2>
          <p className="sf-note">
            {skill.certification_eligible
              ? "This skill currently clears the public certification gates."
              : "This skill may still be strong, but it has not yet cleared the public certification gates."}
          </p>
        </div>
        <div className="sf-badges">
          <Badge label={skill.maturity} tone={skill.maturity as "certified" | "frontier" | "experimental" | "scaffold"} />
          <Badge label={skill.tier} />
          <Badge label={`Score ${skill.score}`} />
          <Badge label={`${skill.counts.examples} examples`} />
          <Badge label={`${skill.counts.tests} tests`} />
          <Badge label={skill.benchmark_covered ? "benchmark assets" : "no benchmark assets"} />
        </div>
      </div>
      <div className="sf-tabbar">
        {tabs.map((item) => (
          <button key={item.id} className={cx("sf-pill", tab === item.id && "sf-pill-active")} onClick={() => setTab(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="sf-content-surface">
        <MarkdownArticle source={source} />
      </div>
    </Panel>
  );
}
