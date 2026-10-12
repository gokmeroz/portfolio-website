// Recent Activity content. Shared with the hero's arcade cabinet, which
// shows the short `explain` text on its screen.
export type Activity = {
  id: "reprobot";
  title: string;
  org: string;
  role: string;
  period: string;
  status: "ongoing" | "upcoming" | "completed";
  description: string;
  highlights?: string[];
  tags: string[];
  // Arcade-sized summary. `progress` states where the work stands — it is
  // not a list of results, so keep it free of outcomes that do not exist yet.
  explain: {
    normal: string;
    technical: string;
    progress: string[];
  };
  link?: string;
};

export const activities: Activity[] = [
  {
    id: "reprobot",
    title: "ReproBot — Automated ML Paper Replication",
    org: "inzva AI Projects #10",
    role: "AI Project Contributor",
    period: "Jun 2026 — Present",
    status: "ongoing",
    description:
      "Contributing to the design and development of ReproBot, a multi-agent AI pipeline that transforms machine learning research papers into executable replication workflows. The system is designed to extract experimental details, generate code, run experiments safely, and compare reproduced results against published claims.",
    highlights: [
      "Reader Agent: extracts methods, datasets, metrics, claims, figures, tables, and hyperparameters from research PDFs using document-parsing and vision-language tooling.",
      "Coder and Runner Agents: generate PyTorch and Hugging Face experiment scripts, execute them inside Docker, and capture metrics, logs, and error traces.",
      "Critic and Orchestrator: compare reproduced results with paper claims and coordinate targeted code revisions through an iterative feedback loop.",
      "Evaluation: planned benchmarking across 20 image-classification papers using replication success, metric gaps, and refinement-loop ablation.",
    ],
    tags: [
      "Python",
      "PyTorch",
      "Hugging Face",
      "LLM / VLM",
      "Multi-Agent Systems",
      "LangChain",
      "Docker",
      "Scientific Reproducibility",
    ],
    explain: {
      normal:
        "ReproBot turns a machine learning research paper into an executable replication workflow — it is designed to read the paper, generate and run the experiment, and compare the result against what the paper claims.",
      technical:
        "Multi-agent pipeline: a Reader Agent parses the paper, Coder and Runner Agents generate and run the experiment in Docker, and a Critic and Orchestrator check the results against its claims.",
      progress: [
        "Ongoing at inzva AI Projects #10 — AI Project Contributor since June 2026.",
        "Planned evaluation: benchmarking across 20 image-classification papers.",
        "Still in progress — the evaluation has not been run yet.",
      ],
    },
    link: "https://inzva.com/ai-projects",
  },
];
