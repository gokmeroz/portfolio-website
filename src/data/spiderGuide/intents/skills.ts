import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const skillsIntents: GuideIntent[] = [
  {
    id: "skills-summary",
    category: "skills",
    title: "Overall skills summary",
    patterns: [
      "What are his skills?",
      "What technologies does he know?",
      "Give me his full skill set.",
    ],
    keywords: ["skills", "technologies", "stack", "know"],
    answer:
      "Backend-leaning full-stack: TypeScript, Node.js, C#/.NET, Python, SQL, MongoDB, Docker, and AWS. Frontend: React, React Native, and Tailwind. AI/automation: PyTorch, scikit-learn, the Anthropic Claude API, MLOps concepts, and Playwright.",
    actions: [{ type: "navigate", target: "skills" }],
    followUpIntentIds: ["backend-tech-stack", "ml-skills-stack", "frameworks-libraries"],
    priority: 7,
    recruiterRelevant: true,
  },
  {
    id: "languages-tools-list",
    category: "skills",
    title: "Languages and tools",
    patterns: [
      "What languages and tools does he use?",
      "What is in his languages and tools list?",
    ],
    keywords: ["languages", "tools", "typescript", "git", "rabbitmq"],
    answer:
      "TypeScript, Node.js, C#, .NET, Python, SQL, MongoDB, Git, RabbitMQ, Docker, AWS, and AI Agents.",
    actions: [{ type: "filter-skills", category: "languages-tools" }],
    followUpIntentIds: ["skills-summary", "backend-tech-stack", "frameworks-libraries"],
    priority: 4,
  },
  {
    id: "frameworks-libraries",
    category: "skills",
    title: "Frameworks and libraries",
    patterns: [
      "What frameworks does he use?",
      "What libraries does he know?",
      "Does he know Framer Motion?",
    ],
    keywords: ["frameworks", "libraries", "react", "express", "tailwind"],
    answer:
      "React, Node.js, React Native, Express, Tailwind, Framer Motion, and Vite.",
    actions: [{ type: "filter-skills", category: "frameworks" }],
    followUpIntentIds: ["skills-summary", "languages-tools-list", "ml-skills-stack"],
    priority: 3,
  },
];
