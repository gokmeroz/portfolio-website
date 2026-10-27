// Recent Activity content. Shared with the hero's arcade cabinet, which
// shows the short `explain` text on its screen.
export type Activity = {
  id: "reprobot" | "comartist";
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
  linkLabel?: string;
};

export const activities: Activity[] = [
  {
    id: "comartist",
    title: "ComArtist — Agentic AI Comic Production",
    org: "Meta Global AI Developer Hackathon",
    role: "Indie Developer",
    period: "Oct 2026 — Present",
    status: "ongoing",
    description:
      "Building ComArtist for the Meta Global AI Developer Hackathon (Indie developer track, theme: Build for Your World). It is a multi-agent system designed to turn a short story idea into a coherent comic chapter, treating comic generation as a long-running creative workflow instead of a single prompt-to-image call.",
    highlights: [
      "Pipeline: idea → story → script → visual direction → panel generation → critique → revision → comic chapter.",
      "Agents: a Story Architect, Script Writer, and Visual Director plan the chapter; a Critic and Chapter Judge review scripts and panels and drive revisions.",
      "Continuity: designed to keep characters, outfits, locations, and story state consistent across panels and chapters.",
      "Models: Meta models first (Muse Spark, Muse Image, SAM 3.1), behind a provider adapter with open-weights fallbacks.",
    ],
    tags: [
      "Python",
      "Multi-Agent Systems",
      "LLM / VLM",
      "Image Generation",
      "Pydantic",
      "Streamlit",
    ],
    explain: {
      normal:
        "ComArtist is designed to turn a short story idea into a comic chapter — planning the story, writing the script, drawing the panels, then critiquing and fixing its own work.",
      technical:
        "Multi-agent pipeline on Meta models: Story Architect, Script Writer and Visual Director agents plan the chapter, panels come from an image model, and a Critic checks them against the script for continuity and revision.",
      progress: [
        "Being built for the Meta Global AI Developer Hackathon — build window Oct 26 – Nov 4, 2026.",
        "Still in progress — the agents and panel generation are under construction.",
      ],
    },
    link: "https://github.com/gokmeroz/comartist",
    linkLabel: "View on GitHub",
  },
  {
    id: "reprobot",
    title: "ReproBot — Automated ML Paper Replication",
    org: "inzva AI Projects #10",
    role: "AI Project Contributor",
    period: "Jun 2026 — Oct 2026",
    status: "completed",
    description:
      "Contributed to the design and development of ReproBot, a multi-agent AI pipeline that transforms machine learning research papers into executable replication workflows. The system is designed to extract experimental details, generate code, run experiments safely, and compare reproduced results against published claims.",
    highlights: [
      "Reader Agent: extracts methods, datasets, metrics, claims, figures, tables, and hyperparameters from research PDFs using document-parsing and vision-language tooling.",
      "Coder and Runner Agents: generate PyTorch and Hugging Face experiment scripts, execute them inside Docker, and capture metrics, logs, and error traces.",
      "Critic and Orchestrator: compare reproduced results with paper claims and coordinate targeted code revisions through an iterative feedback loop.",
      "Evaluation: designed to benchmark across 20 image-classification papers using replication success, metric gaps, and refinement-loop ablation.",
      "Showcase: presented ReproBot in a live demo at the inzva AI Projects #10 showcase — placed 2nd of 7 teams.",
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
        "ReproBot turns a machine learning research paper into an executable replication workflow — it reads the paper, generates and runs the experiment, and compares the result against what the paper claims.",
      technical:
        "Multi-agent pipeline: a Reader Agent parses the paper, Coder and Runner Agents generate and run the experiment in Docker, and a Critic and Orchestrator check the results against its claims.",
      progress: [
        "Completed at inzva AI Projects #10 — AI Project Contributor, June to October 2026.",
        "Demoed live at the program showcase in front of an audience.",
        "Placed 2nd of 7 teams; the prize was a Levi's gift card.",
      ],
    },
    link: "https://inzva.com/ai-projects",
    linkLabel: "View inzva AI Projects",
  },
];
