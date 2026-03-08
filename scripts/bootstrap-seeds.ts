import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

type Category =
  | "research"
  | "product"
  | "engineering"
  | "gtm"
  | "ops"
  | "docs"
  | "infrastructure"
  | "frontier";

type ContentTier = "seeded" | "developed" | "flagship";
type Maturity = "scaffold" | "experimental" | "frontier" | "certified";
type EvaluationStatus = "unbenchmarked" | "sampled" | "benchmarked";
type ManualReview = "pending" | "passed" | "needs-work";

type SkillSeed = {
  name: string;
  slug: string;
  category: Category;
  maturity: Maturity;
  summary: string;
  triggers: string[];
  expected_inputs: string[];
  expected_outputs: string[];
  evaluation_status: EvaluationStatus;
  tags: string[];
  maintainers: string[];
  manual_review?: ManualReview;
  description: string;
  tier: ContentTier;
  problem: string;
  use_when: string[];
  avoid_when: string[];
  deliverable: string;
  scenarios: Array<{
    title: string;
    context: string;
    prompt: string;
    expected: string[];
  }>;
  rubric: Array<{
    criterion: string;
    strong: string;
    weak: string;
  }>;
  edge_cases: Array<{
    title: string;
    risk: string;
    response: string;
  }>;
  tests: {
    happy_path: Array<{
      title: string;
      prompt: string;
      checks: string[];
    }>;
    edge_path: Array<{
      title: string;
      prompt: string;
      checks: string[];
    }>;
    failure_cases: Array<{
      title: string;
      prompt: string;
      checks: string[];
    }>;
  };
  template_outline: string[];
};

type SeedData = {
  skills: SkillSeed[];
  collections: Array<{
    slug: string;
    name: string;
    summary: string;
    audience: string;
    included_skills: string[];
    use_cases: string[];
    quick_start: string[];
  }>;
  certification: {
    score_threshold: number;
    required_examples: number;
    required_tests: number;
    requires_benchmark_assets: boolean;
    requires_manual_review: boolean;
  };
};

type DraftSkill = {
  name: string;
  slug: string;
  category: Category;
  tier: ContentTier;
  maturity: Maturity;
  summary: string;
  description: string;
  triggers: string[];
  expected_inputs: string[];
  expected_outputs: string[];
  problem: string;
  deliverable: string;
  tags: string[];
  scenario_frames?: Array<{
    title: string;
    context: string;
    prompt: string;
    expected: string[];
  }>;
  rubric?: Array<{
    criterion: string;
    strong: string;
    weak: string;
  }>;
  edge_cases?: Array<{
    title: string;
    risk: string;
    response: string;
  }>;
  use_when?: string[];
  avoid_when?: string[];
  manual_review?: ManualReview;
  evaluation_status?: EvaluationStatus;
};

const flagshipSlugs = new Set([
  "repo-onboarding",
  "prd-critic",
  "customer-interview-synthesizer",
  "research-dossier",
  "benchmark-brief",
  "executive-meeting-prep",
  "weekly-ops-update",
  "bug-triage",
  "architecture-explainer",
  "workflow-compiler",
  "skill-eval-builder",
  "launch-plan-generator"
]);

const categoryRubrics: Record<Category, Array<{ criterion: string; strong: string; weak: string }>> = {
  research: [
    {
      criterion: "Source quality",
      strong: "Uses credible evidence, distinguishes primary and secondary material, and flags weak sourcing.",
      weak: "Treats all sources as equal or cites unsupported assertions."
    },
    {
      criterion: "Synthesis depth",
      strong: "Connects evidence into themes, tradeoffs, and decision-relevant insights.",
      weak: "Restates findings without explaining why they matter."
    },
    {
      criterion: "Decision usefulness",
      strong: "Ends with a brief that helps a team decide what to do next.",
      weak: "Leaves the reader with a pile of notes and no recommendation."
    }
  ],
  product: [
    {
      criterion: "Problem framing",
      strong: "Clarifies the user problem, evidence strength, and scope boundary.",
      weak: "Confuses solutions with the actual problem."
    },
    {
      criterion: "Tradeoff rigor",
      strong: "Surfaces tradeoffs, risks, and assumptions explicitly.",
      weak: "Presents one direction as obvious without evaluating alternatives."
    },
    {
      criterion: "Execution readiness",
      strong: "Produces an output another product team member could act on.",
      weak: "Leaves next steps vague or underspecified."
    }
  ],
  engineering: [
    {
      criterion: "Technical accuracy",
      strong: "Uses repository or system details faithfully and avoids invented architecture.",
      weak: "Guesses at behavior or terminology."
    },
    {
      criterion: "Actionability",
      strong: "Produces steps, risks, and follow-ups that engineers can execute.",
      weak: "Stays abstract or descriptive only."
    },
    {
      criterion: "Change awareness",
      strong: "Identifies dependencies, rollout risks, and verification steps.",
      weak: "Ignores downstream impact."
    }
  ],
  gtm: [
    {
      criterion: "Audience fit",
      strong: "Tailors the output to the buyer, user, or channel context.",
      weak: "Uses generic messaging for every audience."
    },
    {
      criterion: "Differentiation",
      strong: "Shows what makes the message or plan distinct and credible.",
      weak: "Reads like interchangeable marketing filler."
    },
    {
      criterion: "Operational usefulness",
      strong: "Produces assets a GTM team could use in a real launch or pipeline review.",
      weak: "Creates copy without a usable rollout structure."
    }
  ],
  ops: [
    {
      criterion: "Signal clarity",
      strong: "Separates real issues from noise and ranks them for leaders.",
      weak: "Blends minor updates with major risks."
    },
    {
      criterion: "Cadence readiness",
      strong: "Fits recurring operating rhythms and recurring stakeholder expectations.",
      weak: "Feels like a one-off note with no repeatable structure."
    },
    {
      criterion: "Executive usefulness",
      strong: "Translates data into decisions, owners, and follow-ups.",
      weak: "Summarizes activity without showing implications."
    }
  ],
  docs: [
    {
      criterion: "Clarity",
      strong: "The output is direct, structured, and easy for a reader to use.",
      weak: "The draft is verbose or ambiguous."
    },
    {
      criterion: "Coverage",
      strong: "Addresses the missing context, prerequisites, and maintenance hooks.",
      weak: "Leaves obvious documentation gaps unresolved."
    },
    {
      criterion: "Maintainability",
      strong: "Produces docs that can be updated and owned over time.",
      weak: "Creates brittle one-off text."
    }
  ],
  infrastructure: [
    {
      criterion: "Operational realism",
      strong: "Accounts for rollout, rollback, dependencies, and failure modes.",
      weak: "Assumes ideal conditions."
    },
    {
      criterion: "System mapping",
      strong: "Explains how components, environments, or workflows connect.",
      weak: "Skips the relationships between moving parts."
    },
    {
      criterion: "Readiness",
      strong: "Leaves operators with a concrete readiness or handoff artifact.",
      weak: "Stops before the artifact is usable."
    }
  ],
  frontier: [
    {
      criterion: "Evaluation rigor",
      strong: "Defines measurable checks rather than vague quality language.",
      weak: "Uses aspirational language without testability."
    },
    {
      criterion: "Contract clarity",
      strong: "Makes the workflow, inputs, and outputs explicit enough to reuse safely.",
      weak: "Leaves behavior underspecified."
    },
    {
      criterion: "Safety and limits",
      strong: "Explains where the skill can fail and how to handle that safely.",
      weak: "Presents experimental behavior as production-safe by default."
    }
  ]
};

const defaultAvoidWhen: Record<Category, string[]> = {
  research: [
    "You need original field research rather than synthesis from available materials.",
    "The decision depends on live data that has not been collected yet."
  ],
  product: [
    "The team has not defined the product area or user segment at all yet.",
    "You need direct user validation rather than a synthesis artifact."
  ],
  engineering: [
    "The task needs direct code execution rather than planning, review, or explanation.",
    "There is not enough repository or system context to support a grounded output."
  ],
  gtm: [
    "There is no defined audience, channel, or launch moment yet.",
    "You need final legal review or brand approval rather than a working draft."
  ],
  ops: [
    "The update requires live operational data that has not been gathered.",
    "You need a human decision-maker to resolve a conflict before summarizing it."
  ],
  docs: [
    "The product behavior itself is still changing faster than the docs could stabilize.",
    "There is no source material to document or clarify yet."
  ],
  infrastructure: [
    "You need direct infrastructure access rather than a preparation or review artifact.",
    "The environment inventory is missing entirely."
  ],
  frontier: [
    "The team expects guaranteed production reliability from an experimental workflow.",
    "There is no observable output or test harness to evaluate."
  ]
};

function buildScenarios(skill: DraftSkill) {
  if (skill.scenario_frames) {
    return skill.scenario_frames;
  }

  const count = skill.tier === "flagship" ? 3 : skill.tier === "developed" ? 2 : 1;
  const bases = [
    {
      title: "Existing workflow under pressure",
      context: `A team needs ${skill.name.toLowerCase()} support for a real deadline instead of a brainstorming session.`,
      prompt: `Use ${skill.name} to produce ${skill.deliverable.toLowerCase()} for the current workstream.`,
      expected: [
        `State the workflow objective in plain language.`,
        `Produce ${skill.deliverable.toLowerCase()} with explicit structure.`,
        "Call out missing information and the next decision."
      ]
    },
    {
      title: "Partial inputs",
      context: `Inputs arrive incomplete, but the team still needs a useful first-pass artifact from ${skill.name.toLowerCase()}.`,
      prompt: `Draft the strongest version of ${skill.deliverable.toLowerCase()} using only the available inputs and list what is missing.`,
      expected: [
        "Separate knowns from assumptions.",
        "Prioritize the most decision-relevant gaps.",
        "Keep the output usable even when some inputs are missing."
      ]
    },
    {
      title: "Decision review",
      context: `Leaders want a concise artifact that shows the implications of the workflow output.`,
      prompt: `Summarize the output from ${skill.name} for an operator or leader who needs the decision-ready version.`,
      expected: [
        "Highlight the recommendation or key conclusion.",
        "Show risks or tradeoffs.",
        "End with concrete next actions."
      ]
    }
  ];

  return bases.slice(0, count);
}

function buildRubric(skill: DraftSkill) {
  return skill.rubric ?? categoryRubrics[skill.category];
}

function buildEdgeCases(skill: DraftSkill) {
  return (
    skill.edge_cases ?? [
      {
        title: "Inputs conflict",
        risk: `Different stakeholders provide conflicting inputs for ${skill.name.toLowerCase()}.`,
        response: "Surface the disagreement explicitly, state which interpretation drives the output, and list follow-up questions."
      },
      {
        title: "Evidence is thin",
        risk: `The workflow is still worth running, but the evidence is incomplete or uneven.`,
        response: "Reduce certainty, mark assumptions, and preserve the structure of the final artifact without pretending the evidence is stronger than it is."
      },
      {
        title: "Stakeholder ambiguity",
        risk: `The audience for the output is not fully clear.`,
        response: "Choose a default audience, label it, and include a note on how the artifact should change for a different audience."
      }
    ]
  );
}

function buildTests(skill: DraftSkill, scenarios: ReturnType<typeof buildScenarios>) {
  const happyCount = skill.tier === "flagship" ? 2 : 1;
  const edgeCount = skill.tier === "flagship" ? 2 : 1;
  const failureCount = skill.tier === "flagship" ? 2 : 1;

  return {
    happy_path: scenarios.slice(0, happyCount).map((scenario, index) => ({
      title: `${scenario.title} happy path ${index + 1}`,
      prompt: scenario.prompt,
      checks: scenario.expected
    })),
    edge_path: buildEdgeCases(skill).slice(0, edgeCount).map((edge, index) => ({
      title: `${edge.title} edge path ${index + 1}`,
      prompt: `Run ${skill.name} when this condition appears: ${edge.risk}`,
      checks: [
        "Acknowledge the edge condition explicitly.",
        "Adapt the workflow rather than ignoring the issue.",
        edge.response
      ]
    })),
    failure_cases: buildEdgeCases(skill).slice(0, failureCount).map((edge, index) => ({
      title: `${edge.title} failure probe ${index + 1}`,
      prompt: `What would a poor execution of ${skill.name} look like under this condition: ${edge.risk}`,
      checks: [
        "Identify the failure mode clearly.",
        "Explain why the output would become unreliable.",
        "State how the skill should recover or stop."
      ]
    }))
  };
}

function buildTemplateOutline(skill: DraftSkill) {
  return [
    `${skill.name} objective`,
    "Inputs provided",
    "Assumptions and open questions",
    skill.deliverable,
    "Risks and follow-ups"
  ];
}

function enrichSkill(skill: DraftSkill): SkillSeed {
  const scenarios = buildScenarios(skill);
  return {
    name: skill.name,
    slug: skill.slug,
    category: skill.category,
    maturity: skill.maturity,
    summary: skill.summary,
    triggers: skill.triggers,
    expected_inputs: skill.expected_inputs,
    expected_outputs: skill.expected_outputs,
    evaluation_status: skill.evaluation_status ?? (flagshipSlugs.has(skill.slug) ? "benchmarked" : skill.tier === "developed" ? "sampled" : "unbenchmarked"),
    tags: skill.tags,
    maintainers: ["skillforge-maintainers"],
    manual_review: skill.manual_review,
    description: skill.description,
    tier: skill.tier,
    problem: skill.problem,
    use_when: skill.use_when ?? [
      skill.triggers[0],
      `You need ${skill.deliverable.toLowerCase()} instead of unstructured notes.`,
      "The workflow repeats often enough to justify a reusable asset."
    ],
    avoid_when: skill.avoid_when ?? defaultAvoidWhen[skill.category],
    deliverable: skill.deliverable,
    scenarios,
    rubric: buildRubric(skill),
    edge_cases: buildEdgeCases(skill),
    tests: buildTests(skill, scenarios),
    template_outline: buildTemplateOutline(skill)
  };
}

const drafts: DraftSkill[] = [
  {
    name: "Research Dossier",
    slug: "research-dossier",
    category: "research",
    tier: "flagship",
    maturity: "certified",
    summary: "Turn scattered research inputs into a decision-ready dossier with evidence, themes, and unresolved questions.",
    description: "Use when a team needs a structured research brief instead of raw notes, links, and loosely connected takeaways.",
    triggers: [
      "You need to brief a team on a topic that spans many sources or interviews.",
      "Raw research notes are piling up and decisions are getting delayed."
    ],
    expected_inputs: ["source documents or links", "research questions", "decision context", "known constraints"],
    expected_outputs: ["dossier summary", "evidence-backed findings", "risks and open questions", "recommended next actions"],
    problem: "Teams often collect substantial research but fail to turn it into a concise artifact that can support actual decisions.",
    deliverable: "A structured dossier with executive summary, evidence map, findings, tensions, and next-step recommendations",
    tags: ["research", "analysis", "synthesis", "flagship"],
    manual_review: "passed",
    scenario_frames: [
      {
        title: "Market entry briefing",
        context: "A strategy team needs a research packet on a new market before committing budget to a launch program.",
        prompt: "Synthesize analyst notes, competitor pricing snapshots, customer calls, and internal assumptions into a market-entry dossier.",
        expected: [
          "Separate facts, inferences, and assumptions.",
          "Map the strongest signals and the biggest unknowns.",
          "End with a clear recommendation on whether to proceed, pause, or research further."
        ]
      },
      {
        title: "Interview-heavy synthesis",
        context: "A product team ran a dozen interviews and now needs a single artifact leadership can review quickly.",
        prompt: "Create a dossier from the interview notes, call recordings, and prior product metrics.",
        expected: [
          "Cluster recurring themes without erasing disagreement.",
          "Show which findings are well supported and which are tentative.",
          "Translate the findings into product or GTM implications."
        ]
      },
      {
        title: "Urgent board prep",
        context: "Leadership needs a two-level output: an executive summary for the board and deeper evidence for staff follow-up.",
        prompt: "Produce a board-ready research dossier that keeps the short version crisp while preserving evidence quality underneath.",
        expected: [
          "Start with the key message for the board.",
          "Keep the evidence traceable.",
          "List the next questions that require more research before acting."
        ]
      }
    ],
    edge_cases: [
      {
        title: "Mixed source quality",
        risk: "The available materials mix strong primary evidence with noisy secondary commentary.",
        response: "Tier the evidence, reduce confidence where sourcing is thin, and avoid presenting weak commentary as established fact."
      },
      {
        title: "Contradictory signals",
        risk: "Interviews and market data point in different directions.",
        response: "Show the conflict, suggest possible explanations, and avoid flattening the contradiction into a false consensus."
      },
      {
        title: "Decision pressure exceeds evidence",
        risk: "Stakeholders need a recommendation even though the evidence is still incomplete.",
        response: "Provide the best recommendation available, name the evidence gaps, and state what would change the recommendation."
      }
    ]
  },
  {
    name: "Benchmark Brief",
    slug: "benchmark-brief",
    category: "research",
    tier: "flagship",
    maturity: "frontier",
    summary: "Create a concise benchmark brief that explains what is being measured, how it is scored, and how to interpret the results.",
    description: "Use when a team needs a benchmark design or benchmark readout that is understandable, comparable, and honest about limits.",
    triggers: [
      "You need to design or explain an evaluation benchmark for an agent workflow.",
      "Stakeholders are asking for benchmark results without understanding what the numbers mean."
    ],
    expected_inputs: ["benchmark goal", "cases or prompts", "scoring dimensions", "known limitations"],
    expected_outputs: ["benchmark brief", "measurement summary", "interpretation notes", "follow-up recommendations"],
    problem: "Benchmark artifacts often contain raw scores without enough methodology or interpretation to make the results trustworthy.",
    deliverable: "A benchmark brief with purpose, method, score interpretation, caveats, and recommended next measurement steps",
    tags: ["research", "benchmarking", "evaluation", "flagship"],
    manual_review: "pending",
    scenario_frames: [
      {
        title: "Internal benchmark kickoff",
        context: "A team is creating its first benchmark for a new skill library and needs the methodology to be clear before implementation.",
        prompt: "Draft a benchmark brief for a new skill-evaluation benchmark, including scope, scoring logic, and failure modes.",
        expected: [
          "Explain why the benchmark exists.",
          "Define what the benchmark can and cannot say.",
          "Link the metric design to decisions the team will actually make."
        ]
      },
      {
        title: "Executive result summary",
        context: "Leadership wants to review benchmark results but should not be overloaded with the full methodology document.",
        prompt: "Summarize benchmark results into a short brief that preserves the important caveats.",
        expected: [
          "Lead with the headline finding.",
          "Explain the strongest and weakest areas.",
          "State the most important limitation."
        ]
      },
      {
        title: "Version comparison",
        context: "Two skill versions need to be compared using the same benchmark criteria.",
        prompt: "Create a benchmark comparison brief for version A and version B of a workflow skill.",
        expected: [
          "Compare like-for-like conditions.",
          "Explain score movement rather than just listing numbers.",
          "Identify whether the benchmark signals an actual product decision."
        ]
      }
    ]
  },
  {
    name: "Literature Map",
    slug: "literature-map",
    category: "research",
    tier: "developed",
    maturity: "frontier",
    summary: "Map a topic area into major themes, schools of thought, and evidence gaps.",
    description: "Use when a team needs a clear landscape view of a topic before diving into deeper reading or synthesis.",
    triggers: [
      "You need a fast orientation to a topic with many papers, articles, or reports.",
      "You want to identify where the literature agrees, disagrees, or remains thin."
    ],
    expected_inputs: ["topic definition", "available papers or reports", "time horizon", "decision context"],
    expected_outputs: ["theme map", "clusters of evidence", "gaps", "reading priorities"],
    problem: "Teams waste time reading everything chronologically instead of understanding the major clusters and open questions first.",
    deliverable: "A topic map that groups the literature into themes, evidence strength, and recommended follow-up reading",
    tags: ["research", "literature", "mapping"]
  },
  {
    name: "Competitor Briefing",
    slug: "competitor-briefing",
    category: "research",
    tier: "developed",
    maturity: "experimental",
    summary: "Turn competitor signals into a briefing focused on strategy, positioning, and operational implications.",
    description: "Use when competitors are moving and the team needs something more useful than a spreadsheet of screenshots.",
    triggers: [
      "You need to brief a team on a competitor launch, pricing change, or positioning shift.",
      "Competitive signals are available but not yet synthesized into implications."
    ],
    expected_inputs: ["competitor materials", "market context", "internal strategy context"],
    expected_outputs: ["competitor briefing", "signal summary", "implication list"],
    problem: "Competitive intel often remains a list of observations without showing what internal teams should actually do with it.",
    deliverable: "A competitor briefing that summarizes moves, interprets likely intent, and recommends internal responses",
    tags: ["research", "competition", "strategy"]
  },
  {
    name: "Market Signal Scanner",
    slug: "market-signal-scanner",
    category: "research",
    tier: "seeded",
    maturity: "experimental",
    summary: "Collect and rank external market signals for a team that needs a fast situational read.",
    description: "Use when you need to summarize changes in a market without pretending every signal carries equal weight.",
    triggers: [
      "A market is changing and the team needs a concise weekly or monthly view.",
      "You need to separate important external signals from background noise."
    ],
    expected_inputs: ["signal list", "industry context", "time window"],
    expected_outputs: ["ranked signal summary", "implication notes", "watch list"],
    problem: "Signal reviews often become noisy roundups instead of a prioritized picture of what changed and why it matters.",
    deliverable: "A ranked signal scanner output with significance, confidence, and monitoring recommendations",
    tags: ["research", "market", "signals"]
  },
  {
    name: "Source Credibility Audit",
    slug: "source-credibility-audit",
    category: "research",
    tier: "seeded",
    maturity: "experimental",
    summary: "Audit a set of sources for credibility, bias, recency, and usefulness.",
    description: "Use when research inputs vary widely in quality and someone needs to sort reliable evidence from weak material.",
    triggers: [
      "The research set includes sources with mixed credibility.",
      "A team needs to know which inputs are strong enough to rely on."
    ],
    expected_inputs: ["source list", "decision context", "quality concerns"],
    expected_outputs: ["credibility audit", "source tiers", "usage notes"],
    problem: "Teams frequently consume whatever sources are easiest to reach rather than what is most reliable.",
    deliverable: "A credibility audit that tiers sources and explains how each should or should not influence a decision",
    tags: ["research", "sources", "credibility"]
  },
  {
    name: "Field Note Synthesizer",
    slug: "field-note-synthesizer",
    category: "research",
    tier: "seeded",
    maturity: "experimental",
    summary: "Turn raw field notes into themes, anomalies, and follow-up questions.",
    description: "Use when observation notes are messy but still need to feed product, operations, or strategy decisions.",
    triggers: [
      "A team gathered observational notes and needs a reliable synthesis.",
      "Field notes contain patterns that are easy to miss in raw form."
    ],
    expected_inputs: ["field notes", "observation goal", "known constraints"],
    expected_outputs: ["theme summary", "anomalies", "follow-up questions"],
    problem: "Raw observational notes degrade quickly when nobody turns them into a structured artifact.",
    deliverable: "A synthesis note with recurring themes, exceptions, evidence snippets, and suggested follow-up work",
    tags: ["research", "fieldwork", "synthesis"]
  },
  {
    name: "Decision Memo Builder",
    slug: "decision-memo-builder",
    category: "research",
    tier: "seeded",
    maturity: "scaffold",
    summary: "Shape research and context into a decision memo with options and recommendations.",
    description: "Use when a decision needs a formal memo instead of an unstructured summary.",
    triggers: [
      "You need to turn research into a decision memo.",
      "Stakeholders need options, tradeoffs, and a recommendation in one place."
    ],
    expected_inputs: ["background", "decision statement", "evidence", "options"],
    expected_outputs: ["decision memo", "option comparison", "recommendation"],
    problem: "Teams gather enough information to decide but fail to package it into a format leaders can review quickly.",
    deliverable: "A decision memo with background, options, tradeoffs, recommendation, and follow-up questions",
    tags: ["research", "memo", "decision"]
  },
  {
    name: "PRD Critic",
    slug: "prd-critic",
    category: "product",
    tier: "flagship",
    maturity: "frontier",
    summary: "Critique a product requirements document for clarity, scope, risk, and execution readiness.",
    description: "Use when a PRD exists but needs a serious review before engineering, design, or leadership align around it.",
    triggers: [
      "A PRD is drafted and needs rigorous critique before commitment.",
      "The team suspects a requirements doc is vague, bloated, or risky."
    ],
    expected_inputs: ["product requirements document", "strategy context", "constraints", "target audience"],
    expected_outputs: ["critique summary", "gap list", "risk list", "revision recommendations"],
    problem: "PRDs often look complete on the surface while hiding missing assumptions, weak scope boundaries, or unresolved risks.",
    deliverable: "A structured critique covering problem clarity, scope quality, assumptions, risks, and revision priorities",
    tags: ["product", "prd", "review", "flagship"],
    scenario_frames: [
      {
        title: "Bloated scope review",
        context: "A PRD bundles multiple feature ideas together and the team needs a critique before engineering sizing begins.",
        prompt: "Review this PRD for scope bloat, hidden assumptions, and readiness for implementation.",
        expected: [
          "Identify where the document mixes separate bets.",
          "Show which requirements are vague or untestable.",
          "Recommend the highest-leverage revisions."
        ]
      },
      {
        title: "Leadership alignment",
        context: "A product lead needs to send the PRD to leadership but wants to catch weak logic before that meeting.",
        prompt: "Critique the PRD with a focus on decision quality, tradeoffs, and risk communication.",
        expected: [
          "Separate product logic from presentation polish.",
          "Highlight decisions leadership still needs to make.",
          "Explain what evidence is missing."
        ]
      },
      {
        title: "Cross-functional handoff",
        context: "Design and engineering are about to consume the PRD and need to know where ambiguity will hurt downstream work.",
        prompt: "Analyze the PRD for handoff risk, unresolved dependencies, and missing success criteria.",
        expected: [
          "Call out ambiguous requirements.",
          "Identify dependencies and missing stakeholders.",
          "End with a revision sequence the PM should tackle first."
        ]
      }
    ],
    edge_cases: [
      {
        title: "No real user problem",
        risk: "The PRD jumps directly into a solution without grounding the actual user problem.",
        response: "State that the document is solution-led, outline the missing problem framing, and avoid pretending the requirements are solid."
      },
      {
        title: "Metrics without causality",
        risk: "Success metrics appear polished but do not connect to the proposed feature or behavior change.",
        response: "Challenge the metric logic and suggest what evidence would justify the link."
      },
      {
        title: "Dependency blind spot",
        risk: "The PRD ignores an operational or platform dependency that could block the plan.",
        response: "Add the dependency, its risk, and how it changes the sequence or scope."
      }
    ]
  },
  {
    name: "Customer Interview Synthesizer",
    slug: "customer-interview-synthesizer",
    category: "product",
    tier: "flagship",
    maturity: "frontier",
    summary: "Turn multiple customer interviews into a synthesis with themes, tensions, and product implications.",
    description: "Use when customer conversations are rich but scattered and the team needs a synthesis that respects nuance.",
    triggers: [
      "Interview notes need to become a product-facing synthesis.",
      "Multiple interviews reveal patterns but also contradictions."
    ],
    expected_inputs: ["interview notes or transcripts", "research goal", "customer segments", "known hypotheses"],
    expected_outputs: ["theme synthesis", "segment differences", "evidence quotes", "product implications"],
    problem: "Interview programs frequently generate strong raw material but weak synthesis artifacts that flatten nuance or overclaim certainty.",
    deliverable: "An interview synthesis with recurring themes, exceptions, segment differences, evidence, and product recommendations",
    tags: ["product", "research", "interviews", "flagship"],
    scenario_frames: [
      {
        title: "Pattern extraction across segments",
        context: "A team has interviews from admins, end users, and buyers and needs the overlaps and differences clearly separated.",
        prompt: "Synthesize these customer interviews into a segment-aware artifact with themes, contradictions, and product implications.",
        expected: [
          "Avoid collapsing the segments into one generic voice.",
          "Show where signals are strong and where they are tentative.",
          "Translate the synthesis into concrete product implications."
        ]
      },
      {
        title: "Roadmap input",
        context: "Product leadership wants to use the interview findings to influence upcoming roadmap choices.",
        prompt: "Turn this interview set into a roadmap-facing synthesis that distinguishes opportunity, friction, and noise.",
        expected: [
          "Separate tactical complaints from strategic opportunities.",
          "Keep evidence traceable to interviews.",
          "End with recommendations that a PM can discuss with leadership."
        ]
      },
      {
        title: "Executive readout",
        context: "The team must brief executives quickly without oversimplifying the underlying research.",
        prompt: "Create an executive-ready customer interview synthesis with a short headline section and a deeper evidence section.",
        expected: [
          "Lead with the most material customer insight.",
          "Preserve nuance and dissenting evidence.",
          "Show the next learning questions."
        ]
      }
    ]
  },
  {
    name: "Roadmap Tradeoff Mapper",
    slug: "roadmap-tradeoff-mapper",
    category: "product",
    tier: "developed",
    maturity: "frontier",
    summary: "Compare roadmap options and surface the most important tradeoffs before commitment.",
    description: "Use when multiple product bets compete for the same time, people, or strategic attention.",
    triggers: [
      "The team needs to compare roadmap options explicitly.",
      "Tradeoffs are being discussed informally but not captured in one artifact."
    ],
    expected_inputs: ["candidate roadmap items", "constraints", "goals", "dependencies"],
    expected_outputs: ["tradeoff map", "option comparison", "recommendation notes"],
    problem: "Roadmap discussions often stay in opinions instead of a structured comparison of bets, cost, and strategic value.",
    deliverable: "A tradeoff map that compares options by upside, downside, cost, dependencies, and timing",
    tags: ["product", "roadmap", "tradeoffs"]
  },
  {
    name: "Opportunity Solution Tree",
    slug: "opportunity-solution-tree",
    category: "product",
    tier: "seeded",
    maturity: "experimental",
    summary: "Structure an opportunity solution tree from product goals, opportunities, and candidate solutions.",
    description: "Use when product discovery needs a clearer map from outcomes to opportunities and solutions.",
    triggers: [
      "The team wants to connect a product goal to candidate discovery paths.",
      "Discovery conversations need more structure than a backlog list."
    ],
    expected_inputs: ["goal", "known opportunities", "candidate ideas", "constraints"],
    expected_outputs: ["opportunity tree", "assumption notes", "discovery next steps"],
    problem: "Discovery work often jumps between goals and solutions without a visible map of the reasoning.",
    deliverable: "An opportunity solution tree with goal alignment, opportunity branches, solution options, and assumption notes",
    tags: ["product", "discovery", "mapping"]
  },
  {
    name: "Feature Spec Refiner",
    slug: "feature-spec-refiner",
    category: "product",
    tier: "developed",
    maturity: "frontier",
    summary: "Refine a feature spec into a clearer, tighter, and more implementation-ready document.",
    description: "Use when a feature spec exists but still needs sharper scope, assumptions, or acceptance criteria.",
    triggers: [
      "A feature spec is drafted and needs tightening before engineering work begins.",
      "A PM wants to improve spec quality without rewriting from scratch."
    ],
    expected_inputs: ["draft feature spec", "business goal", "constraints", "dependencies"],
    expected_outputs: ["refined spec outline", "gap list", "acceptance criteria suggestions"],
    problem: "Feature specs often contain enough detail to appear complete while still leaving downstream ambiguity.",
    deliverable: "A refined feature spec with clearer scope, explicit assumptions, and stronger success criteria",
    tags: ["product", "spec", "refinement"]
  },
  {
    name: "Pricing Experiment Designer",
    slug: "pricing-experiment-designer",
    category: "product",
    tier: "seeded",
    maturity: "experimental",
    summary: "Design a pricing experiment with hypotheses, guardrails, and decision thresholds.",
    description: "Use when pricing ideas need an experiment plan instead of a vague test suggestion.",
    triggers: [
      "A team wants to test pricing without creating avoidable operational risk.",
      "Pricing discussion needs a structured experiment design."
    ],
    expected_inputs: ["pricing hypothesis", "customer segment", "constraints", "guardrails"],
    expected_outputs: ["experiment plan", "success thresholds", "risk notes"],
    problem: "Pricing experiments are easy to suggest and easy to run badly without clear decision thresholds or guardrails.",
    deliverable: "A pricing experiment plan with hypothesis, exposure model, guardrails, and interpretation notes",
    tags: ["product", "pricing", "experiments"]
  },
  {
    name: "Churn Insight Analyzer",
    slug: "churn-insight-analyzer",
    category: "product",
    tier: "seeded",
    maturity: "experimental",
    summary: "Analyze churn signals and convert them into actionable themes and retention hypotheses.",
    description: "Use when churn data, interviews, and support inputs need to become a product-facing analysis.",
    triggers: [
      "The team needs a better story behind churn than top-level metrics alone.",
      "Retention work needs hypothesis generation from mixed evidence."
    ],
    expected_inputs: ["churn metrics", "customer feedback", "segment context"],
    expected_outputs: ["churn theme summary", "retention hypotheses", "follow-up questions"],
    problem: "Teams track churn numbers but struggle to turn them into coherent product decisions.",
    deliverable: "A churn analysis brief with segment patterns, likely drivers, and recommended next investigations",
    tags: ["product", "retention", "analysis"]
  },
  {
    name: "Product Risk Register",
    slug: "product-risk-register",
    category: "product",
    tier: "seeded",
    maturity: "scaffold",
    summary: "Create a product risk register for an initiative before the team commits fully.",
    description: "Use when a launch or initiative needs an explicit record of product, delivery, and adoption risks.",
    triggers: [
      "A product initiative is moving forward without a clear risk register.",
      "Leaders want a structured view of product risks before approval."
    ],
    expected_inputs: ["initiative scope", "timeline", "dependencies", "known concerns"],
    expected_outputs: ["risk register", "severity view", "mitigation notes"],
    problem: "Product risks are often discussed informally and then forgotten until they materialize.",
    deliverable: "A product risk register with severity, probability, mitigation, owners, and review cadence",
    tags: ["product", "risk", "planning"]
  },
  {
    name: "Repo Onboarding",
    slug: "repo-onboarding",
    category: "engineering",
    tier: "flagship",
    maturity: "certified",
    summary: "Turn an unfamiliar codebase into a fast-start onboarding brief with setup, architecture, and first-task guidance.",
    description: "Use when someone needs to get productive in a repository quickly without reverse-engineering the whole system from scratch.",
    triggers: [
      "A new engineer needs to understand a repository quickly.",
      "A contributor needs a grounded map of setup, architecture, and safe starting points."
    ],
    expected_inputs: ["repository tree", "package manifests", "configuration files", "docs or recent PRs if available"],
    expected_outputs: ["onboarding brief", "setup sequence", "system map", "first-task suggestions", "open questions"],
    problem: "Codebases accumulate enough implicit knowledge that new contributors lose hours reconstructing how things fit together.",
    deliverable: "An onboarding brief with setup order, architecture map, terminology, key workflows, risks, and suggested first contributions",
    tags: ["engineering", "onboarding", "repository", "flagship"],
    manual_review: "passed",
    scenario_frames: [
      {
        title: "New engineer first week",
        context: "A new engineer has local access to a repo and needs a reliable starting brief for the first week.",
        prompt: "Read the repository structure, manifests, configs, and existing docs, then produce a repo onboarding brief.",
        expected: [
          "List the setup sequence in the correct order.",
          "Explain the major folders and runtime boundaries.",
          "Suggest the safest first contribution areas and what is still unclear."
        ]
      },
      {
        title: "Cross-team handoff",
        context: "Ownership of a service is moving to a different team and the receiving team needs an accelerated onboarding artifact.",
        prompt: "Create a repo onboarding brief focused on service ownership transfer, risks, and operating habits.",
        expected: [
          "Highlight commands, environments, and deployment touchpoints.",
          "Flag hidden dependencies and unusual local setup steps.",
          "State the high-risk areas that need direct human follow-up."
        ]
      },
      {
        title: "Open-source contributor guide",
        context: "A maintainer wants to help external contributors ramp up faster without turning the README into a wall of text.",
        prompt: "Produce an onboarding brief for a prospective contributor that explains the project shape, contribution path, and repo conventions.",
        expected: [
          "Differentiate maintainer concerns from contributor concerns.",
          "Recommend a first reading path through the repo.",
          "End with a concrete first-task shortlist."
        ]
      }
    ],
    edge_cases: [
      {
        title: "Sparse docs",
        risk: "The repository has weak or outdated documentation.",
        response: "Lean on code structure and configuration truth, mark confidence levels, and call out the documentation gaps explicitly."
      },
      {
        title: "Monorepo sprawl",
        risk: "The repository is large enough that a naive summary would become noise.",
        response: "Prioritize the main system boundaries, core packages, and contributor paths instead of summarizing every folder equally."
      },
      {
        title: "Conflicting conventions",
        risk: "The codebase mixes multiple eras of tooling or naming conventions.",
        response: "Note the inconsistency, explain which convention appears current, and tell the reader where caution is needed."
      }
    ]
  },
  {
    name: "Bug Triage",
    slug: "bug-triage",
    category: "engineering",
    tier: "flagship",
    maturity: "frontier",
    summary: "Turn a raw bug report into a triage artifact with severity, repro confidence, likely owners, and next actions.",
    description: "Use when a bug report is real enough to act on but still too messy for a team to prioritize confidently.",
    triggers: [
      "An incoming bug report needs structured triage.",
      "The team needs severity, repro confidence, and follow-up decisions captured quickly."
    ],
    expected_inputs: ["bug report", "logs or screenshots if available", "affected area", "user impact context"],
    expected_outputs: ["triage summary", "severity recommendation", "repro notes", "owner suggestions", "next actions"],
    problem: "Bug reports often mix symptoms, guesses, and urgency without enough structure for teams to prioritize or route them well.",
    deliverable: "A bug triage brief with severity rationale, repro assessment, likely surface area, and next-step ownership",
    tags: ["engineering", "bugs", "triage", "flagship"],
    scenario_frames: [
      {
        title: "Noisy user report",
        context: "Support forwards a bug report that includes urgency but limited technical detail.",
        prompt: "Triage this incoming bug report and identify severity, missing reproduction details, and likely owners.",
        expected: [
          "Separate observed symptoms from guesses.",
          "State the current repro confidence.",
          "Recommend the next fastest move for the engineering team."
        ]
      },
      {
        title: "Regression candidate",
        context: "A bug may be tied to a recent release and the team needs fast routing plus rollback considerations.",
        prompt: "Create a triage brief for a likely regression affecting a recently changed area.",
        expected: [
          "Call out likely regression evidence.",
          "Identify the likely area and the verification path.",
          "Mention rollback or containment considerations if relevant."
        ]
      },
      {
        title: "Prioritization queue",
        context: "Several bugs compete for attention and one needs a cleaner priority case before planning.",
        prompt: "Convert this bug report into a planning-ready triage summary with severity logic and scope of impact.",
        expected: [
          "Explain severity with user impact and blast radius.",
          "Distinguish urgency from importance.",
          "End with a recommended routing decision."
        ]
      }
    ]
  },
  {
    name: "Architecture Explainer",
    slug: "architecture-explainer",
    category: "engineering",
    tier: "flagship",
    maturity: "frontier",
    summary: "Explain a system or codebase architecture in a way that is grounded, digestible, and useful for future work.",
    description: "Use when someone needs a reliable architectural explanation rather than a folder-by-folder description.",
    triggers: [
      "A system needs to be explained to new contributors or adjacent teams.",
      "Architecture details exist in code but not in a digestible narrative."
    ],
    expected_inputs: ["codebase or architecture artifacts", "audience", "system boundaries", "known pain points"],
    expected_outputs: ["architecture overview", "component map", "data or control flow summary", "key tradeoffs"],
    problem: "Architecture explanations are often either too shallow to help or too exhaustive to read.",
    deliverable: "An architecture explainer with system boundaries, component roles, flows, tradeoffs, and known complexity hotspots",
    tags: ["engineering", "architecture", "explanation", "flagship"]
  },
  {
    name: "Incident Retrospective Writer",
    slug: "incident-retrospective-writer",
    category: "engineering",
    tier: "seeded",
    maturity: "experimental",
    summary: "Draft a structured retrospective after an incident with chronology, causes, and follow-ups.",
    description: "Use when a team needs a clean retrospective draft from notes, timelines, and remediation records.",
    triggers: [
      "An incident occurred and the follow-up needs a structured write-up.",
      "The team has facts and notes but not a coherent retrospective."
    ],
    expected_inputs: ["timeline", "impact summary", "remediation actions", "open questions"],
    expected_outputs: ["retrospective draft", "chronology", "root-cause analysis", "follow-up actions"],
    problem: "Post-incident write-ups often lose important causal detail or fail to separate facts from speculation.",
    deliverable: "An incident retrospective with impact, timeline, contributing factors, lessons, and follow-up actions",
    tags: ["engineering", "incident", "retro"]
  },
  {
    name: "API Change Reviewer",
    slug: "api-change-reviewer",
    category: "engineering",
    tier: "developed",
    maturity: "frontier",
    summary: "Review an API change for compatibility, rollout risk, and consumer impact.",
    description: "Use when an API change needs more than schema diffing and should be evaluated like a real integration change.",
    triggers: [
      "An API contract is changing and downstream effects must be reviewed.",
      "A team needs a structured view of API compatibility and rollout risk."
    ],
    expected_inputs: ["current API contract", "proposed change", "known consumers", "rollout constraints"],
    expected_outputs: ["API review brief", "compatibility notes", "consumer risks", "migration recommendations"],
    problem: "API changes are often reviewed at the code level without capturing the operational implications for consumers.",
    deliverable: "An API change review with compatibility analysis, consumer impact, rollout sequencing, and migration notes",
    tags: ["engineering", "api", "review"]
  },
  {
    name: "Migration Planner",
    slug: "migration-planner",
    category: "engineering",
    tier: "developed",
    maturity: "frontier",
    summary: "Plan a code, data, or platform migration with dependencies, sequence, and rollback considerations.",
    description: "Use when a migration is inevitable and the team needs a written plan rather than a loose set of tasks.",
    triggers: [
      "A system, library, or data migration needs a staged plan.",
      "The migration risk is high enough that sequencing must be explicit."
    ],
    expected_inputs: ["migration target", "current state", "constraints", "dependencies"],
    expected_outputs: ["migration plan", "dependency map", "risk list", "rollback notes"],
    problem: "Migrations accumulate hidden coupling and often fail because the team underestimates sequence and rollback planning.",
    deliverable: "A migration plan with phases, prerequisites, checkpoints, rollback paths, and ownership notes",
    tags: ["engineering", "migration", "planning"]
  },
  {
    name: "Test Plan Designer",
    slug: "test-plan-designer",
    category: "engineering",
    tier: "seeded",
    maturity: "experimental",
    summary: "Design a test plan for a change, workflow, or system area.",
    description: "Use when a team needs a test plan that covers happy paths, edge cases, and failure conditions explicitly.",
    triggers: [
      "A meaningful change needs a structured test plan.",
      "Teams need to define test scope before implementation or rollout."
    ],
    expected_inputs: ["change description", "risk areas", "critical paths"],
    expected_outputs: ["test plan", "coverage map", "edge-case list"],
    problem: "Teams routinely know what should probably be tested but fail to package it into a reviewable plan.",
    deliverable: "A test plan with coverage goals, case types, and verification priorities",
    tags: ["engineering", "testing", "quality"]
  },
  {
    name: "Codebase Dependency Mapper",
    slug: "codebase-dependency-mapper",
    category: "engineering",
    tier: "seeded",
    maturity: "scaffold",
    summary: "Map important dependencies in a codebase and explain why they matter.",
    description: "Use when a repository's internal and external dependencies need to be explained for planning or onboarding.",
    triggers: [
      "A team needs a dependency map for a codebase.",
      "Dependency complexity is making change planning harder."
    ],
    expected_inputs: ["repository structure", "dependency manifests", "service boundaries"],
    expected_outputs: ["dependency map", "risk notes", "change hotspots"],
    problem: "Dependency risk often stays invisible until changes break more surfaces than expected.",
    deliverable: "A dependency map with critical paths, integration surfaces, and maintenance hotspots",
    tags: ["engineering", "dependencies", "mapping"]
  },
  {
    name: "Launch Plan Generator",
    slug: "launch-plan-generator",
    category: "gtm",
    tier: "flagship",
    maturity: "frontier",
    summary: "Build a practical launch plan with sequencing, owners, messaging dependencies, and readiness checks.",
    description: "Use when a launch needs a real operating plan instead of a list of hopeful tasks.",
    triggers: [
      "A launch needs a coordinated GTM plan across functions.",
      "A team needs a launch artifact with sequencing, dependencies, and readiness logic."
    ],
    expected_inputs: ["launch objective", "audience", "timeline", "channels", "constraints"],
    expected_outputs: ["launch plan", "owner map", "dependency list", "readiness checkpoints"],
    problem: "Launches often fail because responsibilities and dependencies remain implicit until late in the process.",
    deliverable: "A launch plan with sequencing, owners, deliverables, decision gates, and post-launch follow-up",
    tags: ["gtm", "launch", "planning", "flagship"]
  },
  {
    name: "Sales Call Brief",
    slug: "sales-call-brief",
    category: "gtm",
    tier: "developed",
    maturity: "frontier",
    summary: "Prepare a sales or solution call brief that sharpens the account context and talking points.",
    description: "Use when an upcoming customer call needs more than a CRM summary.",
    triggers: [
      "A sales or partnership call needs a well-prepared brief.",
      "The team has scattered account context and needs a concise prep artifact."
    ],
    expected_inputs: ["account context", "meeting objective", "participants", "open questions"],
    expected_outputs: ["call brief", "talking points", "risk notes", "next-step suggestions"],
    problem: "Meeting prep is often fragmented across notes, CRM, and memory, which weakens call quality.",
    deliverable: "A sales call brief with account context, conversation goals, risks, and follow-up plan",
    tags: ["gtm", "sales", "meetings"]
  },
  {
    name: "Positioning Statement Builder",
    slug: "positioning-statement-builder",
    category: "gtm",
    tier: "developed",
    maturity: "frontier",
    summary: "Build a positioning statement with target audience, problem, value, and differentiation.",
    description: "Use when a product or feature needs sharper positioning before launch or campaign work.",
    triggers: [
      "A product or feature needs clearer positioning.",
      "Messaging is drifting because the core value statement is not locked."
    ],
    expected_inputs: ["audience", "problem", "product value", "alternatives"],
    expected_outputs: ["positioning statement", "supporting proof points", "message guardrails"],
    problem: "Positioning work often stays abstract and never becomes a usable statement with constraints and proof points.",
    deliverable: "A positioning statement set with audience, value proposition, differentiation, and proof support",
    tags: ["gtm", "positioning", "messaging"]
  },
  {
    name: "Campaign Message Matrix",
    slug: "campaign-message-matrix",
    category: "gtm",
    tier: "seeded",
    maturity: "experimental",
    summary: "Create a message matrix across audience segments, channels, and desired actions.",
    description: "Use when campaign planning needs a message map instead of a pile of copy variants.",
    triggers: [
      "A campaign needs channel-specific message planning.",
      "Teams need to align on core and adapted messages across audiences."
    ],
    expected_inputs: ["campaign objective", "audiences", "channels", "proof points"],
    expected_outputs: ["message matrix", "channel guidance", "CTA map"],
    problem: "Campaign messaging often drifts across channels because the core and adapted messages are not aligned explicitly.",
    deliverable: "A message matrix with segment framing, channel adaptation, proof points, and calls to action",
    tags: ["gtm", "campaigns", "messaging"]
  },
  {
    name: "Objection Handling Prep",
    slug: "objection-handling-prep",
    category: "gtm",
    tier: "seeded",
    maturity: "experimental",
    summary: "Prepare objection handling guidance for sales, partnerships, or launch support teams.",
    description: "Use when teams keep hearing the same objections and need consistent, credible responses.",
    triggers: [
      "A go-to-market team wants a better objection handling asset.",
      "Repeated buyer or partner objections need structured prep."
    ],
    expected_inputs: ["objection list", "product context", "proof points", "known constraints"],
    expected_outputs: ["objection guide", "response options", "evidence notes"],
    problem: "Objection handling often becomes improvisation instead of a reusable operating asset.",
    deliverable: "An objection handling guide with concern framing, response options, and proof guidance",
    tags: ["gtm", "sales", "enablement"]
  },
  {
    name: "Persona Refresh",
    slug: "persona-refresh",
    category: "gtm",
    tier: "seeded",
    maturity: "scaffold",
    summary: "Refresh a persona artifact using newer research, pipeline signals, or product context.",
    description: "Use when existing personas feel stale and teams need a cleaner working version.",
    triggers: [
      "Existing personas are out of date.",
      "Recent research or sales signals should update audience understanding."
    ],
    expected_inputs: ["current persona", "new evidence", "strategy context"],
    expected_outputs: ["refreshed persona", "changes summary", "open questions"],
    problem: "Personas tend to linger long after the underlying audience understanding has shifted.",
    deliverable: "A refreshed persona with role context, goals, blockers, buying triggers, and change notes",
    tags: ["gtm", "personas", "audience"]
  },
  {
    name: "Customer Proof Extractor",
    slug: "customer-proof-extractor",
    category: "gtm",
    tier: "seeded",
    maturity: "experimental",
    summary: "Extract credible customer proof points from interviews, calls, or success stories.",
    description: "Use when teams need stronger proof language rooted in actual customer evidence.",
    triggers: [
      "The team needs customer proof for messaging or sales enablement.",
      "Evidence exists in raw materials but not in reusable form."
    ],
    expected_inputs: ["calls or interviews", "customer stories", "target use cases"],
    expected_outputs: ["proof point set", "quote candidates", "usage notes"],
    problem: "Proof is often hidden in transcripts and case-study materials rather than extracted for reuse.",
    deliverable: "A proof library with evidence statements, quote candidates, and relevance by audience",
    tags: ["gtm", "proof", "customers"]
  },
  {
    name: "Pipeline Review Prep",
    slug: "pipeline-review-prep",
    category: "gtm",
    tier: "seeded",
    maturity: "experimental",
    summary: "Prepare a clean pipeline review with deal movement, risks, and leadership discussion points.",
    description: "Use when pipeline review prep needs to focus on signal and decisions instead of record recitation.",
    triggers: [
      "A pipeline review meeting needs a better prep artifact.",
      "Leaders need a concise view of movement, risk, and next decisions."
    ],
    expected_inputs: ["pipeline snapshot", "deal notes", "targets", "known risks"],
    expected_outputs: ["pipeline review brief", "movement summary", "risk callouts", "decision prompts"],
    problem: "Pipeline meetings often devolve into status reading instead of decision-making.",
    deliverable: "A pipeline review brief with movement, blockers, confidence notes, and decisions needed",
    tags: ["gtm", "pipeline", "forecasting"]
  },
  {
    name: "Weekly Ops Update",
    slug: "weekly-ops-update",
    category: "ops",
    tier: "flagship",
    maturity: "frontier",
    summary: "Build a weekly operating update that highlights signal, risk, and follow-ups without reading like status spam.",
    description: "Use when a recurring ops update needs to be concise, repeatable, and decision-useful for leaders.",
    triggers: [
      "A weekly operating update needs to be synthesized from many small inputs.",
      "Leaders need the signal from operations without reading every source document."
    ],
    expected_inputs: ["weekly operational notes", "metrics", "issues", "cross-functional updates"],
    expected_outputs: ["weekly ops update", "key changes", "risks", "follow-up items"],
    problem: "Weekly updates often become activity logs that bury the few issues leaders actually need to track.",
    deliverable: "A weekly ops update with signal summary, metrics shifts, risk callouts, owners, and next actions",
    tags: ["ops", "weekly", "updates", "flagship"]
  },
  {
    name: "Executive Meeting Prep",
    slug: "executive-meeting-prep",
    category: "ops",
    tier: "flagship",
    maturity: "frontier",
    summary: "Prepare a leadership meeting brief with objectives, decisions, risks, and likely questions.",
    description: "Use when an executive meeting needs strong prep instead of disconnected slide fragments.",
    triggers: [
      "An executive meeting needs a concise prep brief.",
      "The team needs to anticipate decisions, risks, and likely questions."
    ],
    expected_inputs: ["agenda", "supporting notes", "participants", "known tensions"],
    expected_outputs: ["meeting prep brief", "decision list", "risk notes", "question prep"],
    problem: "Executive meetings go sideways when teams bring context but not a decision-oriented briefing asset.",
    deliverable: "An executive meeting brief with objectives, decision points, supporting context, risks, and anticipated questions",
    tags: ["ops", "executive", "meetings", "flagship"]
  },
  {
    name: "Operating Rhythm Designer",
    slug: "operating-rhythm-designer",
    category: "ops",
    tier: "developed",
    maturity: "frontier",
    summary: "Design an operating rhythm with meetings, artifacts, owners, and escalation paths.",
    description: "Use when a team has work to coordinate repeatedly but no durable cadence design.",
    triggers: [
      "A team needs a better operating rhythm.",
      "Recurring meetings and update artifacts need a more deliberate design."
    ],
    expected_inputs: ["team goals", "participants", "current cadence", "coordination pain points"],
    expected_outputs: ["operating rhythm design", "cadence map", "owner map", "escalation notes"],
    problem: "Teams often inherit meeting rhythms that no longer match the actual work or decision flow.",
    deliverable: "An operating rhythm design with recurring ceremonies, ownership, artifacts, and escalation pathways",
    tags: ["ops", "cadence", "coordination"]
  },
  {
    name: "KPI Anomaly Brief",
    slug: "kpi-anomaly-brief",
    category: "ops",
    tier: "developed",
    maturity: "frontier",
    summary: "Explain a KPI anomaly with possible drivers, confidence, and recommended next checks.",
    description: "Use when a metric moves sharply and leaders need a concise interpretation artifact quickly.",
    triggers: [
      "A KPI moved unexpectedly and needs a brief explanation.",
      "A team must separate signal from dashboard noise."
    ],
    expected_inputs: ["metric change", "time window", "related context", "known hypotheses"],
    expected_outputs: ["anomaly brief", "likely drivers", "confidence notes", "next checks"],
    problem: "Sudden KPI changes often trigger reaction before anyone writes down the most likely drivers and evidence quality.",
    deliverable: "A KPI anomaly brief with possible causes, confidence level, implications, and follow-up analysis steps",
    tags: ["ops", "metrics", "analysis"]
  },
  {
    name: "Vendor Evaluation Memo",
    slug: "vendor-evaluation-memo",
    category: "ops",
    tier: "seeded",
    maturity: "experimental",
    summary: "Evaluate a vendor option using criteria, risks, and adoption fit.",
    description: "Use when a team needs a vendor memo instead of a loosely organized buying discussion.",
    triggers: [
      "A vendor choice needs a structured evaluation memo.",
      "Stakeholders need an explicit record of vendor tradeoffs."
    ],
    expected_inputs: ["vendor options", "requirements", "constraints", "risks"],
    expected_outputs: ["evaluation memo", "criteria comparison", "recommendation"],
    problem: "Vendor selection often leans on opinion unless the team captures criteria and tradeoffs explicitly.",
    deliverable: "A vendor evaluation memo with criteria, tradeoffs, recommendation, and follow-up diligence questions",
    tags: ["ops", "vendors", "procurement"]
  },
  {
    name: "Hiring Loop Summarizer",
    slug: "hiring-loop-summarizer",
    category: "ops",
    tier: "seeded",
    maturity: "experimental",
    summary: "Summarize a hiring loop with themes, risks, and decision support notes.",
    description: "Use when interview feedback needs to become a coherent hiring decision artifact.",
    triggers: [
      "A hiring panel needs a better synthesis of interview feedback.",
      "Interview notes exist but not a decision-ready summary."
    ],
    expected_inputs: ["interview feedback", "role rubric", "known concerns"],
    expected_outputs: ["loop summary", "signal themes", "decision support notes"],
    problem: "Hiring feedback can be lengthy, inconsistent, and difficult to convert into a fair summary.",
    deliverable: "A hiring loop summary with rubric-aligned findings, open risks, and final decision framing",
    tags: ["ops", "hiring", "interviews"]
  },
  {
    name: "Escalation Path Auditor",
    slug: "escalation-path-auditor",
    category: "ops",
    tier: "seeded",
    maturity: "scaffold",
    summary: "Audit an escalation path for clarity, timing, and owner confusion.",
    description: "Use when an escalation process exists but does not behave clearly under pressure.",
    triggers: [
      "An escalation path needs review after confusion or delay.",
      "Leaders want to know whether owners and triggers are explicit enough."
    ],
    expected_inputs: ["current escalation process", "owners", "incident examples"],
    expected_outputs: ["audit summary", "failure points", "improvement recommendations"],
    problem: "Escalation paths usually look clear on paper until a real event exposes ambiguity.",
    deliverable: "An escalation audit with trigger gaps, owner gaps, timing issues, and improvement recommendations",
    tags: ["ops", "escalation", "governance"]
  },
  {
    name: "Documentation Gap Finder",
    slug: "documentation-gap-finder",
    category: "docs",
    tier: "developed",
    maturity: "frontier",
    summary: "Find the most important gaps in a documentation surface and explain what is missing for real users.",
    description: "Use when docs exist but are failing readers in ways that need prioritization rather than generic critique.",
    triggers: [
      "A documentation area needs a gap audit.",
      "Teams want to know which missing docs matter most to users or contributors."
    ],
    expected_inputs: ["doc set", "user type", "product or workflow context"],
    expected_outputs: ["gap audit", "priority list", "recommended doc additions"],
    problem: "Documentation quality work gets stuck when teams cannot agree on which missing pieces matter most.",
    deliverable: "A documentation gap audit with missing topics, user impact, and recommended repair sequence",
    tags: ["docs", "audit", "quality"]
  },
  {
    name: "Changelog Composer",
    slug: "changelog-composer",
    category: "docs",
    tier: "seeded",
    maturity: "experimental",
    summary: "Compose a clear changelog entry set from commits, PRs, or release notes.",
    description: "Use when raw change inputs need to become a readable changelog for users or contributors.",
    triggers: [
      "Release changes need a human-readable changelog.",
      "Teams need a changelog draft from commits or PR summaries."
    ],
    expected_inputs: ["change list", "audience", "version context"],
    expected_outputs: ["changelog draft", "highlights", "upgrade notes"],
    problem: "Changelogs often overfit engineering language and miss what users need to know.",
    deliverable: "A changelog draft with grouped changes, highlights, impact notes, and upgrade cautions",
    tags: ["docs", "changelog", "releases"]
  },
  {
    name: "Runbook Author",
    slug: "runbook-author",
    category: "docs",
    tier: "developed",
    maturity: "frontier",
    summary: "Turn procedural knowledge into a runbook with prerequisites, steps, checks, and escalation notes.",
    description: "Use when operational procedures live in heads or chat threads and need to become maintainable documentation.",
    triggers: [
      "A repeated operational procedure needs a durable runbook.",
      "Teams want a clearer procedure document with verification and escalation hooks."
    ],
    expected_inputs: ["procedure notes", "operators", "prerequisites", "failure modes"],
    expected_outputs: ["runbook draft", "step sequence", "verification steps", "escalation notes"],
    problem: "Runbooks decay when they do not capture prerequisites, verification steps, and failure handling explicitly.",
    deliverable: "A runbook with prerequisites, step-by-step actions, verification checks, rollback guidance, and escalation notes",
    tags: ["docs", "runbooks", "operations"]
  },
  {
    name: "Knowledge Base Curator",
    slug: "knowledge-base-curator",
    category: "docs",
    tier: "seeded",
    maturity: "experimental",
    summary: "Curate a knowledge base by grouping, pruning, and clarifying article sets.",
    description: "Use when a knowledge base has grown messy enough that structure, ownership, and article quality need review.",
    triggers: [
      "A knowledge base needs structure and cleanup.",
      "Support or enablement content is difficult to navigate."
    ],
    expected_inputs: ["article set", "audience", "content problems"],
    expected_outputs: ["curation plan", "article grouping", "cleanup recommendations"],
    problem: "Knowledge bases become unusable gradually, often through duplication and unclear ownership.",
    deliverable: "A knowledge base curation plan with grouping, pruning, ownership notes, and update priorities",
    tags: ["docs", "knowledge-base", "curation"]
  },
  {
    name: "Support Playbook Writer",
    slug: "support-playbook-writer",
    category: "docs",
    tier: "seeded",
    maturity: "experimental",
    summary: "Write a support playbook for recurring issue types and escalation routes.",
    description: "Use when support teams need a repeatable handling guide rather than tribal knowledge.",
    triggers: [
      "Support handling is inconsistent for a recurring issue type.",
      "A support playbook needs to be drafted from scattered procedures."
    ],
    expected_inputs: ["issue types", "resolution notes", "escalation rules"],
    expected_outputs: ["support playbook", "handling guidance", "escalation map"],
    problem: "Support organizations often repeat the same work because playbooks are thin or outdated.",
    deliverable: "A support playbook with issue classification, response guidance, escalation steps, and resolution notes",
    tags: ["docs", "support", "playbook"]
  },
  {
    name: "Release Note Editor",
    slug: "release-note-editor",
    category: "docs",
    tier: "seeded",
    maturity: "experimental",
    summary: "Edit release notes for clarity, audience fit, and upgrade usefulness.",
    description: "Use when release notes exist but need a sharper edit before publication.",
    triggers: [
      "Release notes need audience-aware editing.",
      "The team wants to improve clarity and upgrade guidance."
    ],
    expected_inputs: ["draft release notes", "audience", "version context"],
    expected_outputs: ["edited release notes", "clarity suggestions", "upgrade highlights"],
    problem: "Release notes often become changelog fragments instead of a useful communication artifact.",
    deliverable: "A release-note edit with clearer structure, audience framing, and upgrade guidance",
    tags: ["docs", "release-notes", "editing"]
  },
  {
    name: "Policy Clarifier",
    slug: "policy-clarifier",
    category: "docs",
    tier: "seeded",
    maturity: "scaffold",
    summary: "Clarify a policy or internal guideline into a more readable, operationally useful document.",
    description: "Use when a policy exists but readers struggle to understand what it means in practice.",
    triggers: [
      "A policy document needs clearer language and action framing.",
      "Teams need help translating a policy into day-to-day implications."
    ],
    expected_inputs: ["policy text", "audience", "common confusion points"],
    expected_outputs: ["clarified policy draft", "operational guidance", "FAQ candidates"],
    problem: "Policy documents often optimize for completeness while sacrificing usability.",
    deliverable: "A clarified policy document with definitions, practical guidance, and open question flags",
    tags: ["docs", "policy", "clarity"]
  },
  {
    name: "Workflow Compiler",
    slug: "workflow-compiler",
    category: "infrastructure",
    tier: "flagship",
    maturity: "frontier",
    summary: "Compile a human workflow into a reusable, explicit skill package with steps, inputs, outputs, and failure handling.",
    description: "Use when a repeated human workflow needs to become a portable skill instead of a loose sequence of instructions.",
    triggers: [
      "A workflow is repeated often enough to encode into a reusable skill.",
      "A team needs to turn human process knowledge into an explicit workflow package."
    ],
    expected_inputs: ["workflow description", "inputs", "operators", "failure conditions", "desired outputs"],
    expected_outputs: ["compiled workflow", "skill scaffold", "guardrails", "test prompts"],
    problem: "Teams often know the workflow they want but fail to formalize it into reusable, evaluable structure.",
    deliverable: "A compiled workflow package with step sequence, contracts, edge handling, and starter evaluation prompts",
    tags: ["infrastructure", "workflows", "skills", "flagship"]
  },
  {
    name: "Deployment Readiness Review",
    slug: "deployment-readiness-review",
    category: "infrastructure",
    tier: "developed",
    maturity: "frontier",
    summary: "Review whether a service or change is ready to deploy with the right checks, rollout notes, and risks.",
    description: "Use when deployment prep needs a real readiness artifact rather than verbal reassurance.",
    triggers: [
      "A release or service change needs a readiness review.",
      "The team wants a consistent way to check deployment readiness."
    ],
    expected_inputs: ["change summary", "deployment process", "risks", "monitoring context"],
    expected_outputs: ["readiness review", "checklist summary", "risk list", "rollback notes"],
    problem: "Deployment reviews fail when readiness is treated as a mood instead of an explicit checklist with context.",
    deliverable: "A deployment readiness review with check status, risk notes, rollout steps, and rollback considerations",
    tags: ["infrastructure", "deployments", "review"]
  },
  {
    name: "Environment Drift Checker",
    slug: "environment-drift-checker",
    category: "infrastructure",
    tier: "seeded",
    maturity: "experimental",
    summary: "Check for environment drift and summarize what changed, why it matters, and where to verify.",
    description: "Use when environments may have drifted and a team needs a review artifact before acting.",
    triggers: [
      "A team suspects environment drift.",
      "Operators need a structured summary of differences across environments."
    ],
    expected_inputs: ["environment configs", "expected baseline", "known incidents"],
    expected_outputs: ["drift summary", "difference list", "verification priorities"],
    problem: "Configuration drift is easy to notice and hard to explain cleanly enough for action.",
    deliverable: "An environment drift report with changed items, significance, and verification priorities",
    tags: ["infrastructure", "environment", "drift"]
  },
  {
    name: "Infra Change Explainer",
    slug: "infra-change-explainer",
    category: "infrastructure",
    tier: "seeded",
    maturity: "experimental",
    summary: "Explain an infrastructure change in plain language for operators or adjacent teams.",
    description: "Use when infra work needs a clearer explanation than a raw diff or ticket provides.",
    triggers: [
      "An infrastructure change needs a readable explanation.",
      "Adjacent teams need to understand an infra change and its impact."
    ],
    expected_inputs: ["change description", "affected systems", "audience"],
    expected_outputs: ["change explainer", "impact summary", "risk notes"],
    problem: "Infrastructure changes are often well understood by implementers but poorly communicated to everyone else.",
    deliverable: "An infrastructure change explainer with rationale, affected components, impact, and follow-up checks",
    tags: ["infrastructure", "changes", "communication"]
  },
  {
    name: "Service Dependency Inventory",
    slug: "service-dependency-inventory",
    category: "infrastructure",
    tier: "seeded",
    maturity: "experimental",
    summary: "Inventory dependencies for a service and explain which ones matter most operationally.",
    description: "Use when a service depends on more systems than the team can easily keep in mind.",
    triggers: [
      "A service dependency inventory is needed for planning or resilience review.",
      "Teams want a clearer dependency picture before change or migration work."
    ],
    expected_inputs: ["service context", "dependency list", "known critical paths"],
    expected_outputs: ["dependency inventory", "critical path notes", "risk summary"],
    problem: "Dependency sprawl creates hidden risk unless the team can see which links are truly critical.",
    deliverable: "A dependency inventory with critical dependencies, failure implications, and ownership notes",
    tags: ["infrastructure", "services", "dependencies"]
  },
  {
    name: "Oncall Handoff Builder",
    slug: "oncall-handoff-builder",
    category: "infrastructure",
    tier: "developed",
    maturity: "frontier",
    summary: "Build an on-call handoff that captures current issues, watch items, and operating context.",
    description: "Use when on-call context is changing hands and the next operator needs more than a raw ticket list.",
    triggers: [
      "An on-call shift handoff needs a stronger summary.",
      "Operators need to transfer current context, risks, and watch items."
    ],
    expected_inputs: ["current incidents", "watch items", "pending changes", "operator notes"],
    expected_outputs: ["handoff brief", "watch list", "risks", "follow-up notes"],
    problem: "On-call handoffs fail when context transfer is too thin, especially around unresolved issues and timing-sensitive changes.",
    deliverable: "An on-call handoff brief with live issues, watch items, timing notes, and escalation reminders",
    tags: ["infrastructure", "oncall", "handoff"]
  },
  {
    name: "Capacity Planning Brief",
    slug: "capacity-planning-brief",
    category: "infrastructure",
    tier: "seeded",
    maturity: "scaffold",
    summary: "Create a capacity planning brief for a service, workflow, or infrastructure area.",
    description: "Use when capacity concerns need a structured brief rather than isolated metric screenshots.",
    triggers: [
      "Capacity questions need a more organized planning artifact.",
      "Leaders want a summary of capacity risk and timing."
    ],
    expected_inputs: ["usage patterns", "constraints", "growth assumptions", "current limits"],
    expected_outputs: ["capacity brief", "risk summary", "planning recommendations"],
    problem: "Capacity planning falls apart when assumptions and constraints are not written down in one place.",
    deliverable: "A capacity planning brief with assumptions, stress points, thresholds, and recommended actions",
    tags: ["infrastructure", "capacity", "planning"]
  },
  {
    name: "Skill Eval Builder",
    slug: "skill-eval-builder",
    category: "frontier",
    tier: "flagship",
    maturity: "frontier",
    summary: "Build an evaluation scaffold for a Skill with prompts, scoring dimensions, and failure probes.",
    description: "Use when a skill is useful enough to deserve an evaluation plan instead of ad hoc spot checks.",
    triggers: [
      "A skill needs evaluation scaffolding.",
      "A team wants prompts, score dimensions, and failure probes for a workflow skill."
    ],
    expected_inputs: ["skill description", "expected behavior", "failure concerns", "output contract"],
    expected_outputs: ["eval plan", "test prompts", "score dimensions", "failure probes"],
    problem: "Good skills remain untrusted when teams never turn quality expectations into an explicit evaluation plan.",
    deliverable: "An evaluation scaffold with golden prompts, score dimensions, edge probes, and output checks",
    tags: ["frontier", "evaluation", "skills", "flagship"]
  },
  {
    name: "Prompt Regression Hunter",
    slug: "prompt-regression-hunter",
    category: "frontier",
    tier: "developed",
    maturity: "frontier",
    summary: "Hunt for regressions between prompt or skill versions using consistent comparisons.",
    description: "Use when an updated skill may have improved one area while quietly breaking another.",
    triggers: [
      "A skill or prompt changed and regression checking is needed.",
      "Version comparisons need more than subjective side-by-side reading."
    ],
    expected_inputs: ["version A", "version B", "comparison cases", "scoring focus"],
    expected_outputs: ["regression brief", "difference summary", "risk cases"],
    problem: "Prompt changes often improve the headline case while regressing in edge or formatting behavior.",
    deliverable: "A regression brief with changed behavior, risk cases, and recommended follow-up evaluation",
    tags: ["frontier", "regression", "evaluation"]
  },
  {
    name: "Agent Handoff Designer",
    slug: "agent-handoff-designer",
    category: "frontier",
    tier: "seeded",
    maturity: "experimental",
    summary: "Design a handoff between agents or workflow stages with explicit contracts.",
    description: "Use when an agent workflow crosses stages and the handoff needs more structure and fewer assumptions.",
    triggers: [
      "A workflow has multiple agent or human-agent stages.",
      "A handoff contract needs to be specified to reduce dropped context."
    ],
    expected_inputs: ["workflow stages", "handoff points", "required context"],
    expected_outputs: ["handoff design", "contract notes", "failure points"],
    problem: "Multi-stage workflows break when handoffs rely on implicit context or undefined output shape.",
    deliverable: "A handoff design with stage boundaries, context contract, failure modes, and fallback behavior",
    tags: ["frontier", "agents", "handoffs"]
  },
  {
    name: "Multimodal Task Brief",
    slug: "multimodal-task-brief",
    category: "frontier",
    tier: "seeded",
    maturity: "experimental",
    summary: "Create a task brief for workflows that span text, images, or other media inputs.",
    description: "Use when a workflow includes multiple modalities and needs a clear input and output contract.",
    triggers: [
      "A task involves text plus image or media inputs.",
      "The team needs a cleaner multimodal task brief."
    ],
    expected_inputs: ["task goal", "modalities involved", "constraints", "expected outputs"],
    expected_outputs: ["task brief", "modality handling notes", "output contract"],
    problem: "Multimodal tasks often fail because the input contract is fuzzy and the task brief assumes too much.",
    deliverable: "A multimodal task brief with modality roles, constraints, output structure, and failure notes",
    tags: ["frontier", "multimodal", "task-design"]
  },
  {
    name: "Tool Contract Auditor",
    slug: "tool-contract-auditor",
    category: "frontier",
    tier: "developed",
    maturity: "frontier",
    summary: "Audit a tool contract for ambiguity, missing guarantees, and agent usability.",
    description: "Use when a tool integration exists but the contract is still too fuzzy for reliable agent behavior.",
    triggers: [
      "A tool contract needs review before agent use.",
      "The team wants to know whether tool semantics are explicit enough."
    ],
    expected_inputs: ["tool schema or docs", "expected usage", "failure conditions"],
    expected_outputs: ["contract audit", "ambiguity list", "recommended clarifications"],
    problem: "Tool integrations are brittle when the contract leaves edge behavior or field semantics unclear.",
    deliverable: "A tool contract audit with ambiguity findings, missing guarantees, and suggested corrections",
    tags: ["frontier", "tools", "contracts"]
  },
  {
    name: "Safety Case Builder",
    slug: "safety-case-builder",
    category: "frontier",
    tier: "seeded",
    maturity: "experimental",
    summary: "Build a safety case for an agent workflow by mapping risks, controls, and residual uncertainty.",
    description: "Use when an agent workflow needs a more explicit risk story before wider rollout.",
    triggers: [
      "A workflow needs a safety case.",
      "The team wants a more explicit map of controls and residual risks."
    ],
    expected_inputs: ["workflow", "risk concerns", "existing controls"],
    expected_outputs: ["safety case", "risk map", "control summary", "residual risks"],
    problem: "Teams often talk about safety controls informally rather than documenting the reasoning in one place.",
    deliverable: "A safety case with hazards, controls, residual risks, and recommended monitoring",
    tags: ["frontier", "safety", "governance"]
  },
  {
    name: "Reasoning Trace Redactor",
    slug: "reasoning-trace-redactor",
    category: "frontier",
    tier: "seeded",
    maturity: "scaffold",
    summary: "Design a safe redaction approach for internal reasoning traces or sensitive analysis artifacts.",
    description: "Use when internal reasoning or sensitive process notes need a cleaner sharing boundary.",
    triggers: [
      "A team wants to share an analysis artifact without exposing sensitive internal traces.",
      "Reasoning or review notes need a structured redaction pass."
    ],
    expected_inputs: ["artifact to redact", "sharing audience", "sensitivity concerns"],
    expected_outputs: ["redaction plan", "safe-share artifact notes", "risk warnings"],
    problem: "Teams frequently need to share outputs without sharing every intermediate note or sensitive detail.",
    deliverable: "A redaction plan with removable fields, share-safe summaries, and residual disclosure risks",
    tags: ["frontier", "redaction", "privacy"]
  }
];

const collections = [
  {
    slug: "founder-pack",
    name: "Founder Pack",
    summary: "A curated set for founders who need quick research, product, GTM, and weekly operating leverage.",
    audience: "Founders and startup operators",
    included_skills: ["research-dossier", "prd-critic", "launch-plan-generator", "weekly-ops-update", "executive-meeting-prep", "sales-call-brief"],
    use_cases: ["Prepare strategic decisions", "Pressure-test roadmap and GTM plans", "Run a tighter weekly cadence"],
    quick_start: ["Pick one operating problem that repeats every week.", "Use the most relevant flagship skill first, then expand into related pack assets."]
  },
  {
    slug: "product-lead-pack",
    name: "Product Lead Pack",
    summary: "Skills for product discovery, PRD critique, interview synthesis, and roadmap tradeoff work.",
    audience: "Product leads and principal product managers",
    included_skills: ["prd-critic", "customer-interview-synthesizer", "roadmap-tradeoff-mapper", "feature-spec-refiner", "benchmark-brief", "research-dossier"],
    use_cases: ["Refine product strategy", "Improve spec quality", "Turn research into roadmap decisions"],
    quick_start: ["Start with the skill closest to the current artifact you already have.", "Use the output as input to the next product planning step."]
  },
  {
    slug: "researcher-pack",
    name: "Researcher Pack",
    summary: "A set for synthesis-heavy research workflows and benchmark framing.",
    audience: "Researchers, strategy teams, and analyst functions",
    included_skills: ["research-dossier", "benchmark-brief", "literature-map", "competitor-briefing", "source-credibility-audit", "field-note-synthesizer"],
    use_cases: ["Turn raw material into briefings", "Map evidence and gaps", "Prepare benchmark methodology"],
    quick_start: ["Use Research Dossier for broad synthesis and Literature Map for early orientation.", "Keep credibility and benchmark framing separate instead of mixing them into one document."]
  },
  {
    slug: "eng-manager-pack",
    name: "Engineering Manager Pack",
    summary: "A set for onboarding, architecture explanation, migration planning, and bug triage.",
    audience: "Engineering managers and tech leads",
    included_skills: ["repo-onboarding", "architecture-explainer", "bug-triage", "migration-planner", "api-change-reviewer", "test-plan-designer"],
    use_cases: ["Accelerate team ramp-up", "Review changes and migrations", "Improve technical communication"],
    quick_start: ["Use Repo Onboarding or Architecture Explainer for context building first.", "Use Bug Triage or Migration Planner when a concrete engineering problem appears."]
  },
  {
    slug: "ops-pack",
    name: "Ops Pack",
    summary: "Recurring operational communication and decision support skills.",
    audience: "Operators, chiefs of staff, and operations leads",
    included_skills: ["weekly-ops-update", "executive-meeting-prep", "operating-rhythm-designer", "kpi-anomaly-brief", "vendor-evaluation-memo", "escalation-path-auditor"],
    use_cases: ["Improve recurring reporting", "Prepare leadership meetings", "Tighten operating systems"],
    quick_start: ["Start with Weekly Ops Update for recurring cadence.", "Use Executive Meeting Prep and KPI Anomaly Brief for decision-heavy weeks."]
  },
  {
    slug: "go-to-market-pack",
    name: "Go-To-Market Pack",
    summary: "GTM planning and messaging support for launches, positioning, pipeline reviews, and proof extraction.",
    audience: "GTM leads, PMMs, and revenue teams",
    included_skills: ["launch-plan-generator", "positioning-statement-builder", "sales-call-brief", "campaign-message-matrix", "customer-proof-extractor", "pipeline-review-prep"],
    use_cases: ["Launch new products", "Improve messaging discipline", "Prepare better revenue meetings"],
    quick_start: ["Lock positioning before building downstream message assets.", "Use launch planning and proof extraction together for stronger GTM execution."]
  }
];

function assertCounts(skills: DraftSkill[]) {
  const byCategory = skills.reduce<Record<string, number>>((accumulator, skill) => {
    accumulator[skill.category] = (accumulator[skill.category] ?? 0) + 1;
    return accumulator;
  }, {});

  const total = skills.length;
  if (total !== 60) {
    throw new Error(`Expected 60 skills, received ${total}`);
  }

  const expected = {
    research: 8,
    product: 8,
    engineering: 8,
    gtm: 8,
    ops: 7,
    docs: 7,
    infrastructure: 7,
    frontier: 7
  };

  for (const [category, count] of Object.entries(expected)) {
    if (byCategory[category] !== count) {
      throw new Error(`Expected ${count} skills in ${category}, received ${byCategory[category] ?? 0}`);
    }
  }
}

async function main() {
  assertCounts(drafts);
  const skills = drafts.map(enrichSkill);
  const seedData: SeedData = {
    skills,
    collections,
    certification: {
      score_threshold: 90,
      required_examples: 3,
      required_tests: 3,
      requires_benchmark_assets: true,
      requires_manual_review: true
    }
  };

  const root = fileURLToPath(new URL("..", import.meta.url));
  const outputPath = join(root, "data", "skill-seeds.json");
  await writeFile(outputPath, `${JSON.stringify(seedData, null, 2)}\n`, "utf8");
  console.log(`Wrote ${skills.length} skill seeds to ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
