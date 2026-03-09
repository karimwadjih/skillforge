"use client";

import { useState } from "react";
import type { CatalogSkill } from "@skillforge/catalog";
import { Badge, CompareTable, MarkdownArticle, Panel, cx } from "@skillforge/ui";

const tabs = [
  { id: "metadata", label: "Metadata" },
  { id: "rubric", label: "Rubric" },
  { id: "examples", label: "Examples + Tests" }
] as const;

function renderList(items: string[]) {
  return (
    <ul className="sf-compare-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

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
          <p className="sf-note">Side-by-side comparison of contract, quality posture, and evidence shape.</p>
        </div>
      </div>
      <div className="sf-form-row">
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
              <Badge label={skill.benchmark_covered ? "benchmark" : "no benchmark"} />
            </div>
            <h3>{skill.name}</h3>
            <p>{skill.summary}</p>
            <div className="sf-badges" style={{ marginTop: 14 }}>
              <Badge label={skill.certification_eligible ? "certification ready" : "needs review"} />
            </div>
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
              { label: "Primary trigger", left: left.triggers[0], right: right.triggers[0] },
              { label: "Expected inputs", left: renderList(left.expected_inputs.slice(0, 3)), right: renderList(right.expected_inputs.slice(0, 3)) },
              { label: "Expected outputs", left: renderList(left.expected_outputs.slice(0, 3)), right: renderList(right.expected_outputs.slice(0, 3)) },
              { label: "Examples / Tests", left: `${left.counts.examples} / ${left.counts.tests}`, right: `${right.counts.examples} / ${right.counts.tests}` },
              { label: "Score", left: left.score, right: right.score }
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
