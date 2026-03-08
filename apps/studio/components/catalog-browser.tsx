"use client";

import { useState } from "react";
import type { CatalogSkill } from "@skillforge/catalog";
import { Badge, Panel, SkillCard } from "@skillforge/ui";

export function CatalogBrowser({ skills }: { skills: CatalogSkill[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [maturity, setMaturity] = useState("all");

  const filtered = skills
    .filter((skill) => {
    const matchesQuery =
      query.length === 0 ||
      `${skill.name} ${skill.summary} ${skill.tags.join(" ")} ${skill.triggers.join(" ")} ${skill.expected_outputs.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || skill.category === category;
    const matchesMaturity = maturity === "all" || skill.maturity === maturity;
    return matchesQuery && matchesCategory && matchesMaturity;
  })
    .sort((left, right) => {
      const tierWeight = (value: string) => (value === "flagship" ? 3 : value === "developed" ? 2 : 1);
      return tierWeight(right.tier) - tierWeight(left.tier) || right.score - left.score;
    });

  return (
    <Panel style={{ marginTop: 24 }}>
      <div className="sf-section-head">
        <div className="sf-section-copy">
          <div className="sf-kicker">Catalog Browser</div>
          <h2>Filter the library by actual workflow signals.</h2>
          <p className="sf-note">Search by workflow name, trigger, summary, tag, or expected output. Results are sorted by tier depth first, then score.</p>
        </div>
      </div>
      <div className="sf-badges" style={{ marginBottom: 18 }}>
        <Badge label={`${filtered.length} visible`} />
        <Badge label={`${skills.filter((skill) => skill.tier === "flagship").length} flagships`} />
        <Badge label={`${skills.filter((skill) => skill.maturity === "certified").length} certified`} />
      </div>
      <div className="sf-filter-grid">
        <input className="sf-input" placeholder="Search skills, summaries, or tags" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="sf-select" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All categories</option>
          {Array.from(new Set(skills.map((skill) => skill.category))).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select className="sf-select" value={maturity} onChange={(event) => setMaturity(event.target.value)}>
          <option value="all">All maturities</option>
          {Array.from(new Set(skills.map((skill) => skill.maturity))).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="sf-empty">No Skills match the current filters. Clear the query or widen the maturity filter before deciding the library has a gap.</div>
      ) : (
        <div className="sf-grid sf-grid-3">
          {filtered.map((skill) => (
            <SkillCard
              key={skill.slug}
              href={`/skill/${skill.slug}`}
              name={skill.name}
              summary={skill.summary}
              category={skill.category}
              maturity={skill.maturity}
              tier={skill.tier}
              score={skill.score}
            />
          ))}
        </div>
      )}
    </Panel>
  );
}
