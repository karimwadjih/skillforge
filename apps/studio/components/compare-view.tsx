"use client";

import { useState } from "react";
import type { CatalogSkill } from "@skillforge/catalog";
import { Badge, CompareTable, MarkdownArticle, Panel } from "@skillforge/ui";

export function CompareView({ skills }: { skills: CatalogSkill[] }) {
  const [leftSlug, setLeftSlug] = useState(skills[0]?.slug ?? "");
  const [rightSlug, setRightSlug] = useState(skills[1]?.slug ?? skills[0]?.slug ?? "");
  const left = skills.find((skill) => skill.slug === leftSlug) ?? skills[0];
  const right = skills.find((skill) => skill.slug === rightSlug) ?? skills[1] ?? skills[0];

  if (!left || !right) {
    return null;
  }

  return (
    <Panel style={{ marginTop: 24 }}>
      <h2>Compare Skills</h2>
      <p className="sf-note">This view is intentionally basic. It is for comparing metadata, rubric posture, and evidence assets, not for diffing every line of markdown.</p>
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
      <div className="sf-grid sf-grid-2" style={{ marginTop: 24 }}>
        {[left, right].map((skill) => (
          <Panel key={skill.slug}>
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
          </Panel>
        ))}
      </div>
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
      <div className="sf-grid sf-grid-2" style={{ marginTop: 24 }}>
        <Panel>
          <h3>{left.name} rubric</h3>
          <MarkdownArticle source={left.content.rubric} />
        </Panel>
        <Panel>
          <h3>{right.name} rubric</h3>
          <MarkdownArticle source={right.content.rubric} />
        </Panel>
      </div>
      <div className="sf-grid sf-grid-2" style={{ marginTop: 24 }}>
        <Panel>
          <h3>{left.name} examples and tests</h3>
          <MarkdownArticle source={`${left.content.examples}\n\n${left.content.happy_path}\n\n${left.content.failure_cases}`} />
        </Panel>
        <Panel>
          <h3>{right.name} examples and tests</h3>
          <MarkdownArticle source={`${right.content.examples}\n\n${right.content.happy_path}\n\n${right.content.failure_cases}`} />
        </Panel>
      </div>
    </Panel>
  );
}
