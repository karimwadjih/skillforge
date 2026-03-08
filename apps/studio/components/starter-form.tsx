"use client";

import { useState } from "react";
import JSZip from "jszip";
import { Badge, Panel } from "@skillforge/ui";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function StarterForm() {
  const [name, setName] = useState("Workflow Review Starter");
  const [description, setDescription] = useState("Use when a repeated workflow needs a reusable skill scaffold.");
  const [category, setCategory] = useState("engineering");
  const [maturity, setMaturity] = useState("scaffold");
  const [summary, setSummary] = useState("A starter scaffold for a repeated workflow that still needs deeper authoring.");
  const [trigger, setTrigger] = useState("A team keeps repeating the same workflow and wants to standardize it.");
  const [inputs, setInputs] = useState("workflow description, source materials, known constraints");
  const [outputs, setOutputs] = useState("structured artifact, open questions, next actions");
  const slug = slugify(name);

  const skillMd = `---
name: ${name}
description: ${description}
---

# ${name}

## Summary

${summary}

## When To Use

- ${trigger}

## Inputs

- ${inputs.split(",").join("\n- ")}

## Output Contract

- ${outputs.split(",").join("\n- ")}
`;

  const skillJson = JSON.stringify(
    {
      slug,
      category,
      maturity,
      summary,
      triggers: [trigger],
      expected_inputs: inputs.split(",").map((item) => item.trim()),
      expected_outputs: outputs.split(",").map((item) => item.trim()),
      evaluation_status: "unbenchmarked",
      tags: ["starter", category],
      maintainers: ["skillforge-maintainers"]
    },
    null,
    2
  );

  const manifest = JSON.stringify(
    {
      type: "starter-skill",
      slug,
      generated_at: new Date().toISOString(),
      files: ["SKILL.md", "skill.json", "README.md"]
    },
    null,
    2
  );

  async function downloadZip() {
    const zip = new JSZip();
    zip.file("SKILL.md", skillMd);
    zip.file("skill.json", skillJson);
    zip.file("README.md", `# ${name}\n\n${summary}\n`);
    zip.file("manifest.json", manifest);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slug || "starter-skill"}.zip`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function copyText(value: string) {
    await navigator.clipboard.writeText(value);
  }

  function downloadManifest() {
    const blob = new Blob([manifest], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slug || "starter-skill"}-manifest.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Panel style={{ marginTop: 24 }}>
      <div className="sf-section-head">
        <div className="sf-section-copy">
          <div className="sf-kicker">Starter Generator</div>
          <h2>Export a clean scaffold, not a fake finished skill.</h2>
          <p className="sf-text-muted">Generate a minimal `SKILL.md`, `skill.json`, and starter bundle entirely client-side. This is for scaffolding, not for pretending a new skill is production-ready on day one.</p>
        </div>
      </div>
      <div className="sf-form">
        <div className="sf-form-row">
          <input className="sf-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Skill name" />
          <input className="sf-input" value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="One-sentence summary" />
        </div>
        <textarea className="sf-textarea" value={description} onChange={(event) => setDescription(event.target.value)} rows={3} />
        <div className="sf-form-row">
          <select className="sf-select" value={category} onChange={(event) => setCategory(event.target.value)}>
            {["research", "product", "engineering", "gtm", "ops", "docs", "infrastructure", "frontier"].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <select className="sf-select" value={maturity} onChange={(event) => setMaturity(event.target.value)}>
            {["scaffold", "experimental", "frontier"].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <input className="sf-input" value={trigger} onChange={(event) => setTrigger(event.target.value)} placeholder="Primary trigger" />
        <input className="sf-input" value={inputs} onChange={(event) => setInputs(event.target.value)} placeholder="Comma-separated inputs" />
        <input className="sf-input" value={outputs} onChange={(event) => setOutputs(event.target.value)} placeholder="Comma-separated outputs" />
      </div>
      <div className="sf-badges" style={{ marginTop: 18 }}>
        <Badge label={slug || "starter-skill"} />
        <Badge label={category} />
        <Badge label={maturity} tone={maturity as "frontier" | "experimental" | "scaffold"} />
      </div>
      <div className="sf-actions-row">
        <button className="sf-button sf-button-primary" onClick={downloadZip}>
          Download starter zip
        </button>
        <button className="sf-button" onClick={() => copyText(skillMd)}>
          Copy SKILL.md
        </button>
        <button className="sf-button" onClick={() => copyText(skillJson)}>
          Copy skill.json
        </button>
        <button className="sf-button" onClick={downloadManifest}>
          Export scaffold manifest
        </button>
      </div>
    </Panel>
  );
}
