"use client";

import { useState } from "react";
import type { CatalogSkill } from "@skillforge/catalog";
import { Badge, CompareTable, MarkdownArticle, Panel, cx } from "@skillforge/ui";

const tabs = [
  { id: "metadata", label: "Metadata" },
  { id: "rubric", label: "Rubric" },
  { id: "examples", label: "Examples + Tests" }
] as const;

export function CompareView({ skills }: { skills: CatalogSkill[] }) {
  const preferredLeft = skills.find((skill) => skill.slug === "prd-critic")?.slug ?? skills[0]?.slug ?? "";
  const preferredRight =
    skills.find((skill) => skill.slug === "feature-spec-refiner")?.slug ?? skills[1]?.slug ?? skills[0]?.slug ?? "";
  const [leftSlug, setLeftSlug] = useState(preferredLeft);
  const [rightSlug, setRightSlug] = useState(preferredRight);
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("metadata");
  const left = skills.find((skill) => skill.slug === leftSlug) ?? skills[0];
  const right = skills.find((skill) => skill.slug === rightSlug) ?? skills[1] ?? skills[0];

  if (!left || !right) {
    return null;
  }

  return (
    <Panel style={{ marginTop: 24 }}>
      <div className="sf-section-head">
        <div className="sf-section-copy">
          <div className="sf-kicker">Compare Skills</div>
          <h2>Check whether two skills truly differ.</h2>
          <p className="sf-note">
            This view is intentionally basic. It is for comparing metadata, rubric posture, and evidence assets, not for diffing every line of markdown.
          </p>
        </div>
      </div>
      <div className="sf-filter-grid">
        <select className="sf-select" value={leftSlug} onChange={(event) => setLeftSlug(event.target.value)}>
          {skills.map((skill) => (
            <option key={skill.slug} value={skill.slug}>
              {skill.name}
            </option>
          ))}
        </select>
        <select className="sf-select" value={rightSlug} onChange={(event) => setRightSlug(event.target.value)}>
          {skills.map((skill) => (
            <option key={skill.slug} value={skill.slug}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      <div className="sf-compare-top" style={{ marginTop: 24 }}>
        {[left, right].map((skill) => (
          <div key={skill.slug} className="sf-compare-card">
            <div className="sf-badges" style={{ marginBottom: 14 }}>
              <Badge label={skill.maturity} tone={skill.maturity as "certified" | "frontier" | "experimental" | "scaffold"} />
              <Badge label={skill.tier} />
              <Badge label={`Score ${skill.score}`} />
            </div>
            <h3>{skill.name}</h3>
            <p>{skill.summary}</p>
            <p className="sf-note">
              {skill.benchmark_covered ? "Benchmark assets present." : "No benchmark assets."}{" "}
              {skill.certification_eligible ? "Eligible for certification." : "Not certification-eligible."}
            </p>
          </div>
        ))}
      </div>
      <div className="sf-tabbar" style={{ marginTop: 22 }}>
        {tabs.map((item) => (
          <button key={item.id} className={cx("sf-pill", tab === item.id && "sf-pill-active")} onClick={() => setTab(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      {tab === "metadata" ? (
        <div style={{ marginTop: 20 }}>
          <CompareTable
            rows={[
              { label: "Category", left: left.category, right: right.category },
              { label: "Maturity", left: left.maturity, right: right.maturity },
              { label: "Tier", left: left.tier, right: right.tier },
              { label: "Summary", left: left.summary, right: right.summary },
              { label: "Triggers", left: left.triggers.join("; "), right: right.triggers.join("; ") },
              { label: "Expected inputs", left: left.expected_inputs.join("; "), right: right.expected_inputs.join("; ") },
              { label: "Expected outputs", left: left.expected_outputs.join("; "), right: right.expected_outputs.join("; ") },
              { label: "Score", left: left.score, right: right.score },
              { label: "Benchmark assets", left: left.benchmark_covered ? "yes" : "no", right: right.benchmark_covered ? "yes" : "no" },
              {
                label: "Certification eligible",
                left: left.certification_eligible ? "yes" : "no",
                right: right.certification_eligible ? "yes" : "no"
              }
            ]}
          />
        </div>
      ) : null}
      {tab === "rubric" ? (
        <div className="sf-grid sf-grid-2" style={{ marginTop: 24 }}>
          <Panel>
            <h3>{left.name} rubric</h3>
            <div className="sf-content-surface">
              <MarkdownArticle source={left.content.rubric} />
            </div>
          </Panel>
          <Panel>
            <h3>{right.name} rubric</h3>
            <div className="sf-content-surface">
              <MarkdownArticle source={right.content.rubric} />
            </div>
          </Panel>
        </div>
      ) : null}
      {tab === "examples" ? (
        <div className="sf-grid sf-grid-2" style={{ marginTop: 24 }}>
          <Panel>
            <h3>{left.name} examples and tests</h3>
            <div className="sf-content-surface">
              <MarkdownArticle source={`${left.content.examples}\n\n${left.content.happy_path}\n\n${left.content.failure_cases}`} />
            </div>
          </Panel>
          <Panel>
            <h3>{right.name} examples and tests</h3>
            <div className="sf-content-surface">
              <MarkdownArticle source={`${right.content.examples}\n\n${right.content.happy_path}\n\n${right.content.failure_cases}`} />
            </div>
          </Panel>
        </div>
      ) : null}
    </Panel>
  );
}
