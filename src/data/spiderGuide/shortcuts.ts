export type GuideVisitorPersona = "recruiter" | "engineer" | "ai-ml" | "founder" | "explorer";

export type GuidePersonaGroup = {
  persona: GuideVisitorPersona;
  label: string;
  intentIds: string[];
};

// Starter-question groups shown in the guide's welcome state. Picking a
// persona only changes which shortcuts are shown inside the guide panel —
// it never alters anything else on the page.
export const PERSONA_GROUPS: GuidePersonaGroup[] = [
  {
    persona: "recruiter",
    label: "Recruiter",
    intentIds: [
      "why-interview-him",
      "evidence-ships-software",
      "which-roles-suit-him",
      "strongest-backend-project",
    ],
  },
  {
    persona: "engineer",
    label: "Engineer",
    intentIds: [
      "nummoria-architecture",
      "how-scale-nummoria",
      "engineering-tradeoffs-made",
      "reprobot-agents",
    ],
  },
  {
    persona: "ai-ml",
    label: "AI / ML",
    intentIds: [
      "reprobot-overview",
      "ai-ml-direction",
      "jobpilot-ai-usage",
      "ml-skills-stack",
    ],
  },
  {
    persona: "founder",
    label: "Founder",
    intentIds: [
      "what-hes-building-toward",
      "nummoria-role",
      "engineer-vs-product-builder",
      "long-term-goal",
    ],
  },
  {
    persona: "explorer",
    label: "Explorer",
    intentIds: [
      "who-is-mert",
      "hobbies-outside-coding",
      "why-spider-man",
      "projects-overview",
    ],
  },
];
