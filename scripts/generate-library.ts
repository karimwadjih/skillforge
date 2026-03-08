import { access, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

type SkillSeed = {
  name: string;
  slug: string;
  category: string;
  maturity: string;
  summary: string;
  triggers: string[];
  expected_inputs: string[];
  expected_outputs: string[];
  evaluation_status: string;
  tags: string[];
  maintainers: string[];
  manual_review?: string;
  description: string;
  tier: "seeded" | "developed" | "flagship";
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

type RubricRow = {
  criterion: string;
  strong: string;
  weak: string;
};

type EdgeCaseProfile = {
  title: string;
  risk: string;
  response: string;
  failure: string;
};

type FlagshipProfile = {
  why: string;
  different: string[];
  anti_patterns: string[];
  rubric: RubricRow[];
  edge_cases: EdgeCaseProfile[];
};

const flagshipWorkflowSteps: Record<string, string[]> = {
  "repo-onboarding": [
    "Inspect the repository shape, package manifests, and primary runtime boundaries.",
    "Trace the build, test, and local-development path in the order a new contributor actually needs it.",
    "Map the major packages, services, or apps to their responsibilities and dependencies.",
    "Identify the safest first tasks and the highest-confidence unresolved questions."
  ],
  "prd-critic": [
    "Read the PRD for the core problem statement, target user, and success logic before judging scope.",
    "Stress-test scope boundaries, assumptions, and missing operational dependencies.",
    "Mark weak requirements, missing acceptance criteria, and places where evidence is thin.",
    "Return a revision sequence ordered by impact rather than by document order."
  ],
  "customer-interview-synthesizer": [
    "Cluster the interview evidence by theme, segment, and strength of signal.",
    "Separate recurring patterns from one-off anecdotes without erasing the outliers.",
    "Translate insights into product implications, not just descriptive takeaways.",
    "Close with the next learning questions the team should validate."
  ],
  "research-dossier": [
    "Separate evidence, inference, and assumption before writing the summary.",
    "Group the strongest findings into themes with explicit support levels.",
    "Show tensions and contradictions rather than forcing a neat consensus.",
    "End with a decision-ready recommendation and unresolved questions."
  ],
  "benchmark-brief": [
    "Define the benchmark goal, what is in scope, and what the benchmark does not claim.",
    "Explain the cases, scoring dimensions, and interpretation logic in plain language.",
    "Show how to read version-to-version movement without overreading minor deltas.",
    "List the methodology caveats and next benchmark improvements."
  ],
  "executive-meeting-prep": [
    "Start from the decisions the meeting must produce, not the background material.",
    "Compress context into the smallest set of facts leaders need before discussion.",
    "Anticipate hard questions, dissent, and tradeoffs that will surface in the room.",
    "Finish with meeting asks, owners, and follow-up checkpoints."
  ],
  "weekly-ops-update": [
    "Filter the week for signal instead of narrating every activity item.",
    "Highlight changes in metrics, blockers, and cross-functional dependencies.",
    "Show owner-linked follow-ups for the most important risks.",
    "Keep the output short enough to scan and strong enough to act on."
  ],
  "bug-triage": [
    "Separate observed symptoms, user impact, and speculation about cause.",
    "Estimate severity and repro confidence from the evidence actually available.",
    "Identify the likely surface area, owner group, and next debugging move.",
    "Call out containment or rollback decisions when they materially matter."
  ],
  "architecture-explainer": [
    "Choose the explanation level for the audience before summarizing components.",
    "Map the system boundaries, core flows, and critical dependencies.",
    "Name the architectural tradeoffs and complexity hotspots that matter for future work.",
    "Finish with a short glossary and open questions for follow-up review."
  ],
  "workflow-compiler": [
    "Break the human workflow into explicit stages, decision points, and required context.",
    "Define the input contract, output contract, and failure behaviors for each stage.",
    "Reduce ambiguous instructions into reusable, testable workflow steps.",
    "Emit a starter skill package plus evaluation prompts for the workflow."
  ],
  "skill-eval-builder": [
    "Start from the behavior the skill must exhibit, not just from available prompts.",
    "Build golden prompts, edge probes, and failure probes that reflect real usage.",
    "Define scoring dimensions tied to observable output quality.",
    "Document what counts as improvement, regression, and inconclusive evidence."
  ],
  "launch-plan-generator": [
    "Anchor the plan in launch objective, audience, and non-negotiable constraints.",
    "Map workstreams, dependencies, and owner handoffs in time order.",
    "Call out readiness gates and the decisions required before launch day.",
    "End with post-launch checks and a short contingency plan."
  ]
};

const flagshipProfiles: Record<string, FlagshipProfile> = {
  "repo-onboarding": {
    why: "Most onboarding artifacts explain the directory tree. Very few reduce time-to-first-change. This skill matters when a new contributor needs a safe path into a live codebase, not an architecture lecture.",
    different: [
      "Optimizes for first-week momentum rather than exhaustive repository archaeology.",
      "Maps runtime boundaries and setup order in the sequence a new contributor actually hits them.",
      "Names the places where a human handoff is still required instead of pretending the repo is fully self-explanatory."
    ],
    anti_patterns: [
      "Listing folders without telling the reader which ones they will actually touch first.",
      "Dumping setup commands without warning about prerequisites, secrets, or environment traps.",
      "Suggesting a first task that is risky, overloaded, or blocked on tribal knowledge."
    ],
    rubric: [
      {
        criterion: "Ramp speed",
        strong: "Gets a contributor from clone to a safe first change with minimal dead ends.",
        weak: "Explains the repo at length while leaving the reader unsure where to start."
      },
      {
        criterion: "Boundary accuracy",
        strong: "Draws the real runtime boundaries, ownership lines, and dependency edges that matter in practice.",
        weak: "Blurs build-time, runtime, and deploy-time concerns into one vague architecture summary."
      },
      {
        criterion: "First-task judgment",
        strong: "Recommends starter work that is useful, low-risk, and aligned with how the repo actually changes.",
        weak: "Ends with generic advice like 'read more code' or proposes work that is unsafe for a newcomer."
      }
    ],
    edge_cases: [
      {
        title: "Docs drift behind the code",
        risk: "The README and setup docs describe commands or services that no longer match the current repo state.",
        response: "Treat executable configuration and package manifests as the primary source, call out the drift explicitly, and separate confirmed setup steps from inferred ones.",
        failure: "Blindly trusts stale docs and hands the new contributor a broken setup path."
      },
      {
        title: "Monorepo with uneven ownership",
        risk: "The repo contains multiple apps or packages, but ownership and critical paths are not documented consistently.",
        response: "Mark the major runtime surfaces, note where ownership is ambiguous, and recommend the smallest slice a newcomer can reason about safely.",
        failure: "Presents the monorepo as one coherent system and hides the fact that some areas need maintainer guidance."
      },
      {
        title: "Local setup depends on hidden credentials",
        risk: "A new contributor cannot complete setup without secrets, internal services, or organization-specific access.",
        response: "Stop pretending setup is turnkey, flag the missing access explicitly, and route the reader toward the next human checkpoint.",
        failure: "Suggests the repo is runnable end-to-end when it is not, wasting the contributor's first day."
      }
    ]
  },
  "prd-critic": {
    why: "PRDs fail less often because of sentence-level writing problems than because they smuggle in weak assumptions, undefined scope, and missing decision logic. This skill matters before teams commit engineering time to the wrong shape of work.",
    different: [
      "Interrogates the decision logic of the document, not just its prose quality.",
      "Separates missing evidence from missing detail so teams know what must be researched versus merely clarified.",
      "Returns a revision order that tells the author what to fix first."
    ],
    anti_patterns: [
      "Rewriting the PRD into cleaner English without confronting the broken logic underneath.",
      "Treating every gap as equal priority instead of separating fatal issues from polish issues.",
      "Accepting metrics or success criteria that do not actually prove the product bet worked."
    ],
    rubric: [
      {
        criterion: "Problem truthfulness",
        strong: "Tests whether the document describes a real user or business problem with enough evidence to justify action.",
        weak: "Accepts abstract pain points and solution-first framing at face value."
      },
      {
        criterion: "Scope discipline",
        strong: "Exposes where the PRD quietly expands scope, hides dependencies, or leaves decision boundaries loose.",
        weak: "Mentions 'scope risk' generically without pointing to the specific ambiguity."
      },
      {
        criterion: "Commitment readiness",
        strong: "Leaves the team knowing whether to proceed, revise, or stop and gather more evidence.",
        weak: "Produces a critique that sounds smart but does not change the decision path."
      }
    ],
    edge_cases: [
      {
        title: "Metrics sound precise but prove little",
        risk: "The PRD includes numeric targets, but the numbers do not establish causality or a meaningful user outcome.",
        response: "Question the metric logic directly, distinguish outcome metrics from activity metrics, and flag where the document is mistaking instrumentation for proof.",
        failure: "Treats quantified goals as inherently rigorous and misses that they do not validate the product bet."
      },
      {
        title: "Hidden dependency load",
        risk: "The document appears self-contained but relies on go-to-market, legal, data, or platform work that is barely acknowledged.",
        response: "Surface the dependency map, classify which dependencies are gating, and show how the plan changes if one of them slips.",
        failure: "Reviews only the feature surface and ignores the operational work required to ship it."
      },
      {
        title: "Executive pressure to approve quickly",
        risk: "Stakeholders want the PRD approved this week even though the evidence and acceptance criteria remain soft.",
        response: "Separate what is ready for commitment from what still needs decision or discovery work, and make the risk of premature approval explicit.",
        failure: "Softens the critique into stylistic comments because the timeline feels politically sensitive."
      }
    ]
  },
  "customer-interview-synthesizer": {
    why: "Interview synthesis goes wrong when teams flatten contradictory evidence into a neat story. This skill matters when product decisions depend on preserving nuance without drowning in raw transcripts.",
    different: [
      "Clusters evidence by pattern strength instead of forcing every observation into one summary line.",
      "Preserves segment differences and high-value outliers instead of averaging them away.",
      "Ends with product implications and next learning questions, not just a list of themes."
    ],
    anti_patterns: [
      "Counting how often a theme appears without checking whether the speakers represent the same segment.",
      "Treating one vivid quote as stronger evidence than a weaker but repeated pattern.",
      "Writing a neutral summary that never forces a product implication."
    ],
    rubric: [
      {
        criterion: "Signal discrimination",
        strong: "Separates recurring pain, emerging signal, and anecdotal noise with explicit confidence.",
        weak: "Reports every interview insight at the same level of importance."
      },
      {
        criterion: "Segment integrity",
        strong: "Shows where different user groups disagree or care about different parts of the workflow.",
        weak: "Blends all interviewees into one generic customer voice."
      },
      {
        criterion: "Decision translation",
        strong: "Connects interview evidence to concrete product, research, or GTM moves.",
        weak: "Stops at descriptive themes and leaves the team to infer the implications."
      }
    ],
    edge_cases: [
      {
        title: "Interview pool is biased toward one segment",
        risk: "Most of the notes come from one customer type, but the team wants a broad market conclusion.",
        response: "State the segment skew, constrain the claims accordingly, and call out what must be validated with a different cohort.",
        failure: "Generalizes a narrow interview pool into market-wide truth."
      },
      {
        title: "Strong outlier contradicts the dominant pattern",
        risk: "One customer story is strategically important even though it does not match the majority theme.",
        response: "Keep the outlier visible, explain why it may still matter, and avoid erasing it in the final synthesis.",
        failure: "Averages the outlier away because it makes the narrative less tidy."
      },
      {
        title: "Team already prefers one conclusion",
        risk: "Stakeholders want the synthesis to confirm a roadmap direction that the interviews only partially support.",
        response: "Anchor claims in evidence, separate supported conclusions from desired conclusions, and state what the interviews do not justify.",
        failure: "Turns the synthesis into a persuasive artifact for a decision the evidence has not earned."
      }
    ]
  },
  "research-dossier": {
    why: "Research only becomes useful when evidence, inference, and recommendation are traceable. This skill matters when scattered inputs need to turn into a brief that can survive scrutiny from decision-makers and operators.",
    different: [
      "Separates evidence from interpretation before making recommendations.",
      "Keeps contradictions visible instead of smoothing them into consensus.",
      "Produces a dossier that can serve both executive scanning and staff follow-through."
    ],
    anti_patterns: [
      "Packing the document with facts but never converting them into a decision posture.",
      "Presenting weak signals and strong evidence with the same confidence.",
      "Resolving contradictions by omission instead of acknowledging them."
    ],
    rubric: [
      {
        criterion: "Evidence traceability",
        strong: "Lets a reader see which claims are grounded, which are inferred, and where the evidence is weak.",
        weak: "Blends source material and interpretation into one authoritative voice."
      },
      {
        criterion: "Tension handling",
        strong: "Shows contradictions, edge cases, and open questions without collapsing them into false consensus.",
        weak: "Hides messy signals to keep the brief sounding tidy."
      },
      {
        criterion: "Decision force",
        strong: "Leaves the reader with a recommendation, the conditions behind it, and what evidence could change it.",
        weak: "Ends as a polished note dump with no decision posture."
      }
    ],
    edge_cases: [
      {
        title: "Evidence quality is uneven",
        risk: "The dossier has to use both strong primary material and weak secondary commentary.",
        response: "Tier the evidence, lower confidence where appropriate, and prevent weak commentary from driving the main recommendation.",
        failure: "Builds the recommendation on whatever source is most convenient or most quotable."
      },
      {
        title: "Contradictions are strategically material",
        risk: "Two strong evidence streams point in different directions and the team still needs a decision.",
        response: "Present the contradiction directly, explain the plausible interpretations, and define the trigger that would change the recommendation.",
        failure: "Pretends the disagreement is noise because a single recommendation feels cleaner."
      },
      {
        title: "Executive audience wants certainty",
        risk: "Leadership expects a decisive answer even though the evidence still has meaningful gaps.",
        response: "Give the best current recommendation, but state the uncertainty envelope and the highest-leverage next research move.",
        failure: "Overstates certainty in order to sound decisive."
      }
    ]
  },
  "benchmark-brief": {
    why: "Benchmarks lose trust when they present numbers without clarifying what changed, what stayed constant, and what the benchmark still cannot say. This skill matters when evaluation needs to inform decisions instead of decorate a slide.",
    different: [
      "Explains benchmark intent and limitations before interpreting scores.",
      "Translates version movement into decision meaning rather than score theater.",
      "Makes caveats legible to non-specialists without dumbing down the method."
    ],
    anti_patterns: [
      "Leading with aggregate scores before the reader understands the benchmark's scope.",
      "Treating small deltas as meaningful without discussing variance or case composition.",
      "Letting the benchmark imply product readiness or certification on its own."
    ],
    rubric: [
      {
        criterion: "Method transparency",
        strong: "States exactly what the benchmark measures, what it does not, and how cases and rubrics were chosen.",
        weak: "Presents results as authoritative without exposing the design choices underneath."
      },
      {
        criterion: "Interpretation discipline",
        strong: "Explains what score changes mean in operational terms and where interpretation should stop.",
        weak: "Recites numbers without connecting them to a real decision."
      },
      {
        criterion: "Caveat honesty",
        strong: "Makes limitations impossible to miss and prevents benchmark theater.",
        weak: "Treats caveats as legal fine print after the headline has already overclaimed."
      }
    ],
    edge_cases: [
      {
        title: "Benchmark cases drift between versions",
        risk: "Teams compare two score snapshots even though the underlying case set or rubric changed.",
        response: "Block apples-to-oranges interpretation, call out the drift, and say whether any trend can still be inferred responsibly.",
        failure: "Presents the comparison as longitudinal evidence when the benchmark conditions changed."
      },
      {
        title: "Stakeholders demand a single headline score",
        risk: "Leadership wants one number even though performance varies sharply by prompt type or failure mode.",
        response: "Provide the top-line figure only with segmentation and explain where the aggregate hides important behavior differences.",
        failure: "Compresses away the exact variation the benchmark was meant to reveal."
      },
      {
        title: "The benchmark is still immature",
        risk: "The case set is useful but incomplete, and teams still want to use it for launch decisions.",
        response: "Describe what the current benchmark can support, what it cannot, and what coverage gap matters most.",
        failure: "Lets an early benchmark posture as a comprehensive measure."
      }
    ]
  },
  "executive-meeting-prep": {
    why: "Executive meeting prep fails when it optimizes for completeness instead of decision velocity. This skill matters when leaders need the minimum context required to choose, align, or challenge in the room.",
    different: [
      "Starts from the decisions the meeting must produce, not the amount of background available.",
      "Compresses context into an executive brief while preserving the hard tradeoffs underneath.",
      "Anticipates likely objections and follow-up asks rather than stopping at a narrative summary."
    ],
    anti_patterns: [
      "Turning the prep note into a status document with no decision spine.",
      "Including background material that is interesting but not actionable in the meeting.",
      "Ignoring the questions executives will ask when assumptions, cost, or timing feel thin."
    ],
    rubric: [
      {
        criterion: "Decision framing",
        strong: "Clarifies what must be decided, what is still open, and what recommendation is on the table.",
        weak: "Offers context without making the decision moments explicit."
      },
      {
        criterion: "Executive compression",
        strong: "Reduces complex material into the smallest set of facts and tradeoffs leaders need.",
        weak: "Forces executives to read through staff-level detail to find the actual issue."
      },
      {
        criterion: "Room readiness",
        strong: "Prepares the team for pushback, follow-up asks, and unresolved risks that will surface live.",
        weak: "Ends once the brief is written and leaves the team exposed in the meeting."
      }
    ],
    edge_cases: [
      {
        title: "Multiple decisions are tangled together",
        risk: "The meeting appears to be about one issue, but it actually bundles budget, scope, and sequencing choices.",
        response: "Untangle the decisions, show the dependency order, and keep the meeting from collapsing into a circular debate.",
        failure: "Presents the meeting as one binary decision and hides the real decision stack."
      },
      {
        title: "Leadership views are already split",
        risk: "Different executives are likely to enter the room with conflicting priors or incentives.",
        response: "Name the likely fault lines, prepare the supporting evidence for each, and show where alignment is and is not realistic.",
        failure: "Writes a neutral brief that ignores the actual conflict dynamics in the room."
      },
      {
        title: "Decision must be made under incomplete data",
        risk: "The team cannot gather all the desired evidence before the meeting date.",
        response: "State the minimum evidence available, define the residual risk, and propose the least-regret decision posture.",
        failure: "Pretends the brief is complete rather than helping leaders decide under uncertainty."
      }
    ]
  },
  "weekly-ops-update": {
    why: "Ops updates become useless when they read like activity logs. This skill matters when leaders need the operating signal of the week in a format they can scan, trust, and act on.",
    different: [
      "Filters for changes in risk, metric movement, and blocked work rather than narrating task completion.",
      "Links issues to owners and next actions so the update can drive follow-through.",
      "Keeps the format tight enough for weekly cadence without flattening the hard parts."
    ],
    anti_patterns: [
      "Listing everything that happened because nobody chose the signal.",
      "Reporting metrics without explaining what changed or why anyone should care.",
      "Ending the update with vague concern and no ownership."
    ],
    rubric: [
      {
        criterion: "Signal density",
        strong: "Pulls forward the few changes, blockers, and shifts that actually matter this week.",
        weak: "Reads like a chronological dump of work completed."
      },
      {
        criterion: "Operational interpretation",
        strong: "Explains what the movement means for the operating plan, not just which number moved.",
        weak: "Reports metrics and incidents without interpreting their operational weight."
      },
      {
        criterion: "Action linkage",
        strong: "Connects each important risk or change to owners, decisions, or next checks.",
        weak: "Leaves leaders with awareness but no clear follow-up path."
      }
    ],
    edge_cases: [
      {
        title: "The week had lots of activity but little true movement",
        risk: "Teams want their work represented, but the update should not inflate noise into signal.",
        response: "Acknowledge the low-change week, summarize only the material movement, and keep the update short rather than padding it.",
        failure: "Manufactures significance so the update looks busy."
      },
      {
        title: "One issue dominates the week",
        risk: "A major incident or dependency problem crowds out every other topic.",
        response: "Lead with the dominant issue, summarize the rest tersely, and avoid burying the real operating story under equal-weight bullets.",
        failure: "Gives every update item the same weight and obscures the main risk."
      },
      {
        title: "Inputs from teams conflict",
        risk: "Different owners describe the same operational issue with different severity or confidence.",
        response: "State the discrepancy, note which interpretation is better supported, and flag the follow-up needed to reconcile it.",
        failure: "Combines conflicting status reports into a falsely coherent update."
      }
    ]
  },
  "bug-triage": {
    why: "Bug triage matters because the cost is not just mislabeling severity. Bad triage sends the wrong people into the wrong problem with the wrong urgency. This skill is for converting noisy reports into grounded next moves.",
    different: [
      "Separates user impact, repro confidence, and suspected cause instead of collapsing them into one severity guess.",
      "Optimizes for the next debugging or containment move, not just ticket classification.",
      "Signals when the available evidence is too weak for confident priority decisions."
    ],
    anti_patterns: [
      "Guessing root cause from a bug report and treating the guess like established fact.",
      "Equating loud stakeholder attention with actual user impact.",
      "Marking severity without noting repro confidence or containment urgency."
    ],
    rubric: [
      {
        criterion: "Evidence hygiene",
        strong: "Separates observed symptoms, user impact, and speculative cause cleanly.",
        weak: "Blends report content and engineer guesswork into one triage narrative."
      },
      {
        criterion: "Urgency judgment",
        strong: "Assigns urgency based on actual impact, blast radius, and containment needs.",
        weak: "Uses severity labels as shorthand without explaining the decision logic."
      },
      {
        criterion: "Next-step clarity",
        strong: "Leaves the team knowing who should look next, what to verify, and whether mitigation is needed immediately.",
        weak: "Creates a tidy ticket that still leaves the next move ambiguous."
      }
    ],
    edge_cases: [
      {
        title: "The report is credible but irreproducible",
        risk: "Users are clearly hitting a problem, but the team cannot reproduce it in a controlled environment yet.",
        response: "Keep impact and repro confidence separate, identify the missing diagnostic evidence, and define the fastest route to better signal.",
        failure: "Downgrades the issue solely because engineers cannot reproduce it on demand."
      },
      {
        title: "Symptom spans multiple owners",
        risk: "The visible failure could come from several services, clients, or infrastructure layers.",
        response: "Map the plausible surface area, note the most likely owner groups, and keep the handoff logic explicit.",
        failure: "Throws the issue at the loudest or most obvious team without narrowing the surface area."
      },
      {
        title: "Containment may matter more than diagnosis",
        risk: "The right next step is rollback, feature disablement, or communication, not deeper root-cause analysis.",
        response: "Call out containment decisions separately from debugging work and explain the tradeoff.",
        failure: "Treats triage as a purely investigative step and misses the immediate user-risk decision."
      }
    ]
  },
  "architecture-explainer": {
    why: "Architecture explanations fail when they either oversimplify into platitudes or drown readers in implementation detail. This skill matters when someone needs a mental model that is accurate enough to guide future changes.",
    different: [
      "Chooses the audience level explicitly before explaining the system.",
      "Explains boundaries, flows, and tradeoffs rather than just component names.",
      "Calls out complexity hotspots and open questions instead of pretending the design is cleaner than it is."
    ],
    anti_patterns: [
      "Turning code structure into an architecture explanation without showing runtime behavior.",
      "Explaining every component equally instead of focusing on leverage points and boundaries.",
      "Describing the current shape without naming the tradeoffs it imposes on future work."
    ],
    rubric: [
      {
        criterion: "Mental-model accuracy",
        strong: "Gives the audience a correct working model of boundaries, data flow, and dependencies.",
        weak: "Produces a simplified story that breaks the first time someone makes a change."
      },
      {
        criterion: "Tradeoff clarity",
        strong: "Names the constraints, bottlenecks, and design tradeoffs that actually shape engineering decisions.",
        weak: "Presents the architecture as neutral description with no decision implications."
      },
      {
        criterion: "Audience fit",
        strong: "Matches the level of explanation to the reader and leaves them able to navigate the code or system responsibly.",
        weak: "Either overwhelms newcomers or insults experienced readers with shallow summaries."
      }
    ],
    edge_cases: [
      {
        title: "The architecture is partly accidental",
        risk: "The system has grown through pragmatism, migration residue, or local workarounds rather than clean intentional design.",
        response: "Explain the shape honestly, distinguish intended design from accumulated reality, and show where the rough edges matter.",
        failure: "Romanticizes the current architecture and hides the accidental complexity."
      },
      {
        title: "Documentation and code disagree",
        risk: "Existing diagrams or docs describe a cleaner system than the code and runtime behavior reveal.",
        response: "Use the live implementation as the primary reference, note the drift, and explain where legacy docs may still be useful.",
        failure: "Repeats the old diagram because it sounds better than the real system."
      },
      {
        title: "Audience spans multiple technical levels",
        risk: "The same explainer has to work for product, adjacent engineers, and new maintainers.",
        response: "Layer the explanation from boundary summary to deeper flow detail and make the intended audience of each section explicit.",
        failure: "Picks one depth level and leaves the rest of the audience behind."
      }
    ]
  },
  "workflow-compiler": {
    why: "A repeated workflow is not reusable until its stages, contracts, and failure handling are explicit. This skill matters when teams want to turn operational know-how into a portable package instead of a loose prompt or tribal process.",
    different: [
      "Breaks a workflow into contracts and decision points, not just ordered instructions.",
      "Treats ambiguity and failure handling as first-class design concerns.",
      "Produces both the workflow package and the starter evaluation frame around it."
    ],
    anti_patterns: [
      "Encoding the happy path only and pretending the workflow is now reusable.",
      "Writing natural-language steps without specifying the input and output contract at each stage.",
      "Compiling a workflow that still depends on hidden judgment calls nobody documented."
    ],
    rubric: [
      {
        criterion: "Stage decomposition",
        strong: "Breaks the workflow into reusable stages with explicit handoff contracts and decision points.",
        weak: "Lists steps in order but leaves stage boundaries and responsibilities fuzzy."
      },
      {
        criterion: "Failure handling",
        strong: "Names where the workflow can stall, misfire, or require escalation and designs for it.",
        weak: "Acts as if the compiled workflow will only ever run on clean inputs."
      },
      {
        criterion: "Package readiness",
        strong: "Produces something that another operator could test, adapt, and ship as a real skill package.",
        weak: "Stops at a process description that still needs major translation work."
      }
    ],
    edge_cases: [
      {
        title: "Human judgment is doing hidden work",
        risk: "The workflow appears repeatable, but important routing or quality decisions still live in one operator's head.",
        response: "Expose the judgment points, document the decision criteria, and mark anything that cannot yet be compiled cleanly.",
        failure: "Treats undocumented expert judgment as if it were a stable deterministic step."
      },
      {
        title: "Workflow branches heavily by case type",
        risk: "The process changes materially depending on customer segment, severity, or operating context.",
        response: "Model the branch conditions explicitly and avoid collapsing materially different flows into one nominal path.",
        failure: "Builds one broad flow that is too vague to execute well in any branch."
      },
      {
        title: "Upstream inputs are inconsistent",
        risk: "The workflow receives varying levels of context or differently structured source material.",
        response: "Define minimum viable inputs, fallback behavior, and where the workflow should stop instead of pretending every run starts clean.",
        failure: "Compiles the ideal path and leaves input normalization as an implicit problem."
      }
    ]
  },
  "skill-eval-builder": {
    why: "Evaluation quality determines whether a skill can improve without fooling its maintainers. This skill matters when teams need evidence of behavior change, not just more prompts in a folder.",
    different: [
      "Starts from required behavior and failure modes before generating prompts.",
      "Builds golden prompts, edge probes, and failure probes as separate instruments with different jobs.",
      "Makes scoring dimensions observable so results can drive revision instead of argument."
    ],
    anti_patterns: [
      "Using only happy-path prompts and calling it evaluation coverage.",
      "Writing score dimensions that sound good but cannot be judged from the output.",
      "Confusing benchmark growth with better evaluation quality."
    ],
    rubric: [
      {
        criterion: "Behavior coverage",
        strong: "Covers expected behavior, boundary behavior, and failure behavior with distinct cases.",
        weak: "Relies on a handful of generic prompts that miss the risk surface."
      },
      {
        criterion: "Scoring observability",
        strong: "Defines dimensions that can be judged from the artifact without hidden grader knowledge.",
        weak: "Uses abstract criteria that different reviewers will interpret wildly differently."
      },
      {
        criterion: "Improvement usefulness",
        strong: "Creates eval assets that help maintainers detect regression, explain it, and revise the skill.",
        weak: "Produces more evaluation documents without improving the feedback loop."
      }
    ],
    edge_cases: [
      {
        title: "The skill behavior is underspecified",
        risk: "Teams want eval assets before the skill's expected outputs and guardrails are stable enough to judge.",
        response: "Surface the contract ambiguity first, define what can be evaluated now, and refuse fake precision where the skill is still undefined.",
        failure: "Generates polished eval assets for a behavior contract nobody has agreed on."
      },
      {
        title: "Maintainers want one score to rule them all",
        risk: "The team asks for a single number even though different failure modes matter differently.",
        response: "Segment the score dimensions, explain why aggregation can hide regressions, and keep failure visibility intact.",
        failure: "Compresses the evaluation into one headline number that obscures the real behavior changes."
      },
      {
        title: "Synthetic prompts are easier than real ones",
        risk: "It is tempting to write clean benchmark prompts that do not resemble the messy requests the skill will actually see.",
        response: "Bias toward realistic, decision-bearing prompts and document where synthetic cases are still useful.",
        failure: "Builds an easy benchmark that the skill can ace without proving real-world behavior."
      }
    ]
  },
  "launch-plan-generator": {
    why: "Launches fail when teams confuse a task list with a launch plan. This skill matters when sequencing, readiness gates, owner handoffs, and post-launch monitoring actually need to line up across functions.",
    different: [
      "Builds around launch objective, dependencies, and gating decisions rather than a flat checklist.",
      "Treats cross-functional handoffs as part of the plan, not a side note.",
      "Ends with post-launch checks and contingency posture, not just launch-day tasks."
    ],
    anti_patterns: [
      "Creating a long list of launch tasks with no critical path or decision gates.",
      "Treating messaging, product, support, and analytics as parallel workstreams with no dependency logic.",
      "Ending the plan at launch time instead of defining what happens after release."
    ],
    rubric: [
      {
        criterion: "Dependency logic",
        strong: "Maps the critical path, decision gates, and cross-functional dependencies clearly enough to run the launch.",
        weak: "Looks comprehensive while hiding what actually blocks what."
      },
      {
        criterion: "Operational realism",
        strong: "Reflects ownership, review cycles, and readiness checks teams really need before launch day.",
        weak: "Reads like a generic launch checklist that could apply to anything."
      },
      {
        criterion: "Post-launch preparedness",
        strong: "Includes monitoring, support posture, and contingency handling for the first days after release.",
        weak: "Treats launch as the finish line and ignores the immediate aftermath."
      }
    ],
    edge_cases: [
      {
        title: "Launch date is fixed but dependencies are not",
        risk: "The team has a public date committed while several gating decisions or workstreams remain unstable.",
        response: "Make the hard gates explicit, show contingency branches, and force visibility into what would trigger a scope cut or delay.",
        failure: "Produces a confident timeline that assumes every dependency resolves on schedule."
      },
      {
        title: "One cross-functional team is the bottleneck",
        risk: "Legal, analytics, support, or enablement work is likely to constrain the entire launch.",
        response: "Center the bottleneck in the plan, identify parallelizable work around it, and clarify what can and cannot proceed without it.",
        failure: "Treats all workstreams as equally paced and hides the actual blocking team."
      },
      {
        title: "Post-launch support load is uncertain",
        risk: "The team expects adoption but is unclear on likely ticket volume, incident risk, or watch metrics.",
        response: "Define the immediate operating posture, monitoring set, and fallback actions rather than pretending launch is routine.",
        failure: "Ships a plan that ends at announcement copy and says nothing about launch-week operations."
      }
    ]
  }
};

async function ensureDir(path: string) {
  await mkdir(path, { recursive: true });
}

async function writeText(path: string, value: string) {
  await ensureDir(dirname(path));
  await writeFile(path, value, "utf8");
}

async function writeTextIfMissing(path: string, value: string) {
  try {
    await access(path);
  } catch {
    await writeText(path, value);
  }
}

async function resetDirectory(path: string) {
  await rm(path, { recursive: true, force: true });
  await ensureDir(path);
}

function bullets(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

function numbered(items: string[]) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function yamlList(items: string[], indent = 2) {
  return items.map((item) => `${" ".repeat(indent)}- ${item}`).join("\n");
}

function maturityNote(skill: SkillSeed) {
  if (skill.maturity === "certified") {
    return "This Skill is marked `certified` because it meets the benchmark, scoring, and manual-review requirements defined in `certification/`.";
  }
  if (skill.tier === "flagship") {
    return "This is a flagship Skill. It is intentionally stronger than the broader seeded library, but not automatically certified.";
  }
  if (skill.tier === "developed") {
    return "This Skill is meaningfully filled for v1, with stronger examples and tests than the broader seeded tier.";
  }
  return "This Skill is part of the seeded breadth layer. It is intentionally lighter than the developed and flagship tiers.";
}

function templatePrompt(section: string, skill: SkillSeed) {
  const normalized = section.toLowerCase();
  if (normalized.includes("objective")) {
    return `State the decision or repeated workflow this artifact is meant to support for ${skill.name}.`;
  }
  if (normalized.includes("inputs")) {
    return "List the concrete materials reviewed. Note anything important that is still missing.";
  }
  if (normalized.includes("assumptions") || normalized.includes("open questions")) {
    return "Separate assumptions from unanswered questions so reviewers can see what still needs confirmation.";
  }
  if (normalized.includes("risk")) {
    return "Name the main failure modes, unresolved dependencies, and the follow-up actions that reduce risk.";
  }
  return `Replace this note with workflow-specific content for ${skill.name}.`;
}

function renderSkillMd(skill: SkillSeed) {
  const flagshipProfile = flagshipProfiles[skill.slug];
  const workflowSteps = flagshipWorkflowSteps[skill.slug] ?? [
    "Confirm the decision context, audience, and missing inputs.",
    `Build ${skill.deliverable.toLowerCase()} using the available evidence and constraints.`,
    "Separate facts from assumptions and make confidence explicit.",
    "Finish with next actions, open questions, or escalation notes."
  ];

  return `---
name: ${skill.name}
description: ${skill.description}
---

# ${skill.name}

## Summary

${skill.summary}

${flagshipProfile ? `## Why This Skill Matters\n\n${flagshipProfile.why}\n\n` : ""}## When To Use

${bullets(skill.use_when)}

## Avoid When

${bullets(skill.avoid_when)}

## Inputs

${bullets(skill.expected_inputs)}

## Output Contract

${bullets(skill.expected_outputs)}

## Workflow

${numbered(workflowSteps)}

## Deliverable Shape

${skill.deliverable}

## Guardrails

- Do not invent facts that are not present in the supplied materials.
- Make uncertainty explicit when inputs are incomplete or contradictory.
- Keep the output structured enough that another operator can reuse it.

${flagshipProfile ? `## Failure Modes To Avoid\n\n${bullets(flagshipProfile.anti_patterns)}\n\n` : ""}## Maturity Note

${maturityNote(skill)}
`;
}

function renderReadme(skill: SkillSeed) {
  const flagshipProfile = flagshipProfiles[skill.slug];
  const tierLabel =
    skill.tier === "flagship"
      ? "Flagship"
      : skill.tier === "developed"
        ? "Developed"
        : "Seeded";

  return `# ${skill.name}

${skill.summary}

## Quick View

- Category: \`${skill.category}\`
- Maturity: \`${skill.maturity}\`
- Tier: \`${tierLabel.toLowerCase()}\`
- Evaluation status: \`${skill.evaluation_status}\`

## What This Skill Does

${skill.problem}

${flagshipProfile ? `## Why This Skill Matters\n\n${flagshipProfile.why}\n\n## What Makes It Different\n\n${bullets(flagshipProfile.different)}\n\n` : ""}## When To Reach For It

${bullets(skill.triggers)}

## What You Should Provide

${bullets(skill.expected_inputs)}

## What You Should Get Back

${bullets(skill.expected_outputs)}

## Repository Notes

- Main instructions live in \`SKILL.md\`.
- Machine-readable metadata lives in \`skill.json\`.
- Examples, rubric, edge cases, and tests live under \`references/\` and \`tests/\`.

## Quality Position

${maturityNote(skill)}
`;
}

function renderExamples(skill: SkillSeed) {
  return `# Examples

${skill.scenarios
  .map(
    (scenario) => `## ${scenario.title}

### Scenario

${scenario.context}

### Prompt

${scenario.prompt}

### Strong Response Should

${bullets(scenario.expected)}`
  )
  .join("\n\n")}
`;
}

function renderRubric(skill: SkillSeed) {
  const rubric = flagshipProfiles[skill.slug]?.rubric ?? skill.rubric;
  const rows = rubric
    .map((criterion) => `| ${criterion.criterion} | ${criterion.strong} | ${criterion.weak} |`)
    .join("\n");

  return `# Rubric

| Criterion | Strong | Weak |
| --- | --- | --- |
${rows}

## Certification Note

Certified status requires benchmark coverage, score threshold, and \`manual_review: passed\`. It is not granted by structure alone.
`;
}

function renderEdgeCases(skill: SkillSeed) {
  const edgeCases = flagshipProfiles[skill.slug]?.edge_cases ?? skill.edge_cases.map((edge) => ({
    ...edge,
    failure: "The response ignores the complication or hides the uncertainty instead of adapting the workflow."
  }));
  return `# Edge Cases

${edgeCases
  .map(
    (edge) => `## ${edge.title}

### Risk

${edge.risk}

### How The Skill Should Respond

${edge.response}

### Failure Probe

${edge.failure}`
  )
  .join("\n\n")}
`;
}

function renderTemplate(skill: SkillSeed) {
  return `# ${skill.name} Template

Use this as a starter scaffold for the artifact this Skill should produce.

${skill.template_outline.map((item) => `## ${item}\n\n- ${templatePrompt(item, skill)}`).join("\n\n")}
`;
}

function renderTestFile(
  title: string,
  cases: Array<{
    title: string;
    prompt: string;
    checks: string[];
  }>
) {
  return `# ${title}

${cases
  .map(
    (testCase) => `## ${testCase.title}

### Prompt

${testCase.prompt}

### Checks

${bullets(testCase.checks)}`
  )
  .join("\n\n")}
`;
}

function renderOpenAiYaml(skill: SkillSeed) {
  return `version: 1
skill:
  name: ${skill.name}
  slug: ${skill.slug}
  category: ${skill.category}
  maturity: ${skill.maturity}
  description: ${skill.description}
  triggers:
${yamlList(skill.triggers, 4)}
  expected_inputs:
${yamlList(skill.expected_inputs, 4)}
  expected_outputs:
${yamlList(skill.expected_outputs, 4)}
execution:
  default_behavior:
    - Ask for missing critical inputs only when they materially change the output.
    - Produce a structured artifact with explicit assumptions.
    - Preserve uncertainty rather than smoothing it over.
guardrails:
  - Do not invent evidence.
  - Distinguish facts from inference.
  - Match the maturity expectations of the skill.
`;
}

function renderGoldenPrompt(skill: SkillSeed) {
  return `# Golden Prompts: ${skill.name}

${skill.scenarios
  .map(
    (scenario, index) => `## Prompt ${index + 1}: ${scenario.title}

${scenario.prompt}

### Minimum Expectations

${bullets(scenario.expected)}`
  )
  .join("\n\n")}
`;
}

function renderCollectionReadme(
  collection: SeedData["collections"][number],
  skills: SkillSeed[]
) {
  const included = collection.included_skills
    .map((slug) => skills.find((skill) => skill.slug === slug))
    .filter(Boolean) as SkillSeed[];

  return `# ${collection.name}

${collection.summary}

## Audience

${collection.audience}

## Included Skills

${included.map((skill) => `- \`${skill.slug}\`: ${skill.summary}`).join("\n")}

## Intended Use Cases

${bullets(collection.use_cases)}

## Quick Start

${numbered(collection.quick_start)}
`;
}

function renderCollectionManifest(collection: SeedData["collections"][number]) {
  return JSON.stringify(collection, null, 2);
}

function renderTemplateFiles() {
  return {
    skillReadme: `# Skill Template

Use this directory as a starting point for a new Skill. Keep \`SKILL.md\` minimal and put machine-readable metadata in \`skill.json\`.
`,
    skillJson: JSON.stringify(
      {
        slug: "new-skill",
        category: "research",
        maturity: "scaffold",
        summary: "One-sentence summary of the repeated workflow.",
        triggers: ["A precise trigger for when the skill should be used."],
        expected_inputs: ["What the user or system should provide."],
        expected_outputs: ["What the skill should produce."],
        evaluation_status: "unbenchmarked",
        tags: ["starter"],
        maintainers: ["skillforge-maintainers"]
      },
      null,
      2
    ),
    skillMd: `---
name: New Skill
description: Use when a repeated workflow needs a reusable skill package.
---

# New Skill

## Summary

Describe the workflow and why it repeats often enough to standardize.
`,
    collectionReadme: `# Collection Template

Describe who this pack is for, why these Skills belong together, and how to start using them.
`,
    benchmarkTemplate: JSON.stringify(
      {
        slug: "new-skill",
        prompts: [
          {
            id: "prompt-1",
            prompt: "Describe the benchmark prompt here.",
            minimum_expectations: ["List the minimum expectations."]
          }
        ]
      },
      null,
      2
    )
  };
}

function renderShowcaseSvg(title: string, subtitle: string, accent: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" fill="none">
  <rect width="1600" height="900" fill="#0b1320"/>
  <rect x="60" y="60" width="1480" height="780" rx="28" fill="#101b2f" stroke="#2d4469"/>
  <rect x="100" y="110" width="360" height="680" rx="20" fill="#0f1728" stroke="#24405c"/>
  <rect x="500" y="110" width="1000" height="120" rx="20" fill="${accent}" opacity="0.22"/>
  <rect x="500" y="270" width="1000" height="220" rx="20" fill="#16253b"/>
  <rect x="500" y="520" width="480" height="270" rx="20" fill="#16253b"/>
  <rect x="1020" y="520" width="480" height="270" rx="20" fill="#16253b"/>
  <text x="500" y="170" fill="#f5f7fb" font-family="Georgia, serif" font-size="44">${title}</text>
  <text x="500" y="215" fill="#b8c5db" font-family="ui-sans-serif, system-ui" font-size="24">${subtitle}</text>
  <text x="120" y="170" fill="#e4ebf7" font-family="ui-sans-serif, system-ui" font-size="28">Skillforge</text>
  <text x="120" y="220" fill="#99abc7" font-family="ui-sans-serif, system-ui" font-size="20">Production-grade Skills for ChatGPT and Codex.</text>
</svg>
`;
}

async function main() {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const seedPath = join(root, "data", "skill-seeds.json");
  const rawSeed = await readFile(seedPath, "utf8");
  const seedData = JSON.parse(rawSeed) as SeedData;

  const skillsRoot = join(root, "skills");
  const collectionsRoot = join(root, "collections");
  const evalRoot = join(root, "evals");
  const templatesRoot = join(root, "templates");
  const showcaseRoot = join(root, "showcase");

  await resetDirectory(skillsRoot);
  await resetDirectory(collectionsRoot);
  await resetDirectory(join(evalRoot, "golden-prompts"));
  await resetDirectory(join(evalRoot, "benchmark-cases"));
  await resetDirectory(join(evalRoot, "scorecards"));
  await resetDirectory(join(evalRoot, "results"));
  await ensureDir(join(showcaseRoot, "screenshots"));
  await ensureDir(join(showcaseRoot, "gifs"));
  await ensureDir(join(showcaseRoot, "example-runs"));

  for (const skill of seedData.skills) {
    const skillDir = join(skillsRoot, skill.category, skill.slug);
    await ensureDir(join(skillDir, "agents"));
    await ensureDir(join(skillDir, "references"));
    await ensureDir(join(skillDir, "assets"));
    await ensureDir(join(skillDir, "tests"));

    const metadata = {
      slug: skill.slug,
      category: skill.category,
      maturity: skill.maturity,
      summary: skill.summary,
      triggers: skill.triggers,
      expected_inputs: skill.expected_inputs,
      expected_outputs: skill.expected_outputs,
      evaluation_status: skill.evaluation_status,
      tags: skill.tags,
      maintainers: skill.maintainers,
      ...(skill.manual_review ? { manual_review: skill.manual_review } : {})
    };

    await writeText(join(skillDir, "SKILL.md"), renderSkillMd(skill));
    await writeText(join(skillDir, "skill.json"), `${JSON.stringify(metadata, null, 2)}\n`);
    await writeText(join(skillDir, "README.md"), renderReadme(skill));
    await writeText(join(skillDir, "agents", "openai.yaml"), renderOpenAiYaml(skill));
    await writeText(join(skillDir, "references", "examples.md"), renderExamples(skill));
    await writeText(join(skillDir, "references", "rubric.md"), renderRubric(skill));
    await writeText(join(skillDir, "references", "edge-cases.md"), renderEdgeCases(skill));
    await writeText(join(skillDir, "assets", "template.md"), renderTemplate(skill));
    await writeText(join(skillDir, "tests", "happy-path.md"), renderTestFile("Happy Path Tests", skill.tests.happy_path));
    await writeText(join(skillDir, "tests", "edge-path.md"), renderTestFile("Edge Path Tests", skill.tests.edge_path));
    await writeText(join(skillDir, "tests", "failure-cases.md"), renderTestFile("Failure Case Tests", skill.tests.failure_cases));

    if (skill.tier === "flagship") {
      const benchmarkCase = {
        slug: skill.slug,
        maturity: skill.maturity,
        prompts: skill.scenarios.map((scenario, index) => ({
          id: `${skill.slug}-prompt-${index + 1}`,
          title: scenario.title,
          prompt: scenario.prompt,
          minimum_expectations: scenario.expected,
          rubric_dimensions: skill.rubric.map((criterion) => criterion.criterion)
        }))
      };

      await writeText(join(evalRoot, "golden-prompts", `${skill.slug}.md`), renderGoldenPrompt(skill));
      await writeText(join(evalRoot, "benchmark-cases", `${skill.slug}.json`), `${JSON.stringify(benchmarkCase, null, 2)}\n`);
    }
  }

  for (const collection of seedData.collections) {
    const collectionDir = join(collectionsRoot, collection.slug);
    await ensureDir(collectionDir);
    await writeText(join(collectionDir, "README.md"), renderCollectionReadme(collection, seedData.skills));
    await writeText(join(collectionDir, "manifest.json"), `${renderCollectionManifest(collection)}\n`);
  }

  const templates = renderTemplateFiles();
  await ensureDir(join(templatesRoot, "skill-template"));
  await ensureDir(join(templatesRoot, "collection-template"));
  await ensureDir(join(templatesRoot, "benchmark-template"));
  await writeText(join(templatesRoot, "skill-template", "README.md"), templates.skillReadme);
  await writeText(join(templatesRoot, "skill-template", "SKILL.md"), templates.skillMd);
  await writeText(join(templatesRoot, "skill-template", "skill.json"), `${templates.skillJson}\n`);
  await writeText(join(templatesRoot, "collection-template", "README.md"), templates.collectionReadme);
  await writeText(join(templatesRoot, "collection-template", "manifest.json"), `${JSON.stringify({ slug: "new-collection", included_skills: [] }, null, 2)}\n`);
  await writeText(join(templatesRoot, "benchmark-template", "case.json"), `${templates.benchmarkTemplate}\n`);

  await writeTextIfMissing(
    join(showcaseRoot, "screenshots", "docs-home-preview.svg"),
    renderShowcaseSvg("Docs Home Preview", "Reference preview for docs layout coverage", "#85c4ff")
  );
  await writeTextIfMissing(
    join(showcaseRoot, "screenshots", "studio-preview.svg"),
    renderShowcaseSvg("Studio Preview", "Reference preview for catalog browsing and compare mode", "#ffd071")
  );
  await writeTextIfMissing(
    join(showcaseRoot, "example-runs", "README.md"),
    "# Example Runs\n\nStore authored before/after artifacts and demo-ready flows here.\n"
  );

  console.log(`Generated ${seedData.skills.length} skill directories and ${seedData.collections.length} collections.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
