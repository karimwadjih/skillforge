export const categoryProfiles: Record<
  string,
  {
    title: string;
    description: string;
    angle: string;
  }
> = {
  docs: {
    title: "Docs Skills",
    description: "Operational writing workflows for release notes, runbooks, support material, and knowledge surfaces.",
    angle: "Use this category when the hard part is not prose quality but turning implicit process knowledge into usable documentation."
  },
  engineering: {
    title: "Engineering Skills",
    description: "Repository comprehension, triage, API review, migration, and architecture workflows for code-heavy environments.",
    angle: "These Skills help engineers get oriented faster, classify technical risk, and explain systems with enough fidelity to guide real work."
  },
  frontier: {
    title: "Frontier Skills",
    description: "Evaluation, multimodal, handoff, and tool-contract workflows for agent systems and advanced automation.",
    angle: "This category is for teams refining agent behavior, evaluation posture, and workflow contracts near the current edge of practice."
  },
  gtm: {
    title: "GTM Skills",
    description: "Launch, sales, positioning, messaging, and pipeline workflows for revenue-facing teams.",
    angle: "These Skills are strongest when a team needs a decision-grade artifact instead of another marketing brainstorm."
  },
  infrastructure: {
    title: "Infrastructure Skills",
    description: "Deployment, drift, on-call, capacity, and dependency workflows for platform and operations teams.",
    angle: "Use this category when the work spans rollout risk, platform dependencies, and service-level operating context."
  },
  ops: {
    title: "Ops Skills",
    description: "Operating cadence, KPI interpretation, escalation clarity, and executive-prep workflows.",
    angle: "These Skills prioritize signal, ownership, and cadence discipline over status-report verbosity."
  },
  product: {
    title: "Product Skills",
    description: "PRDs, interviews, prioritization, specs, pricing, and product-risk workflows.",
    angle: "Use this category when a product artifact needs sharper logic, tighter scope, or evidence-backed synthesis."
  },
  research: {
    title: "Research Skills",
    description: "Evidence synthesis, competitor analysis, credibility review, and benchmark interpretation workflows.",
    angle: "These Skills are for turning scattered evidence into briefs that survive scrutiny from decision-makers."
  }
};

export const maturityGuide = [
  "`scaffold` means the asset is a structured starting point, not a finished recommendation engine.",
  "`experimental` means the workflow is usable but not deeply validated.",
  "`frontier` means the skill is materially stronger, sharper, and better tested.",
  "`certified` means the skill crossed the public review bar: score threshold, benchmark coverage, enough examples/tests, and manual review."
];

export function titleCaseCategory(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
