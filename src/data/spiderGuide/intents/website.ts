import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const websiteIntents: GuideIntent[] = [
  {
    id: "what-is-spider-guide",
    category: "website",
    title: "What Spider-Guide is",
    patterns: [
      "What is Spider-Guide?",
      "Who are you?",
      "What are you?",
      "Are you an AI?",
      "Are you ChatGPT?",
      "Are you a chatbot?",
    ],
    keywords: ["spider-guide", "who", "what", "ai", "chatbot", "chatgpt"],
    answer:
      "Spider-Guide is an interactive portfolio knowledge system, not an AI assistant — every answer here is pre-written and matched deterministically against a local knowledge base about Mert. No external API, no language model, nothing leaves your browser. Ask about his projects, skills, experience, engineering decisions, goals, or how to reach him.",
    followUpIntentIds: ["how-does-spider-guide-work", "who-is-mert", "projects-overview"],
    priority: 8,
  },
  {
    id: "how-does-spider-guide-work",
    category: "website",
    title: "How Spider-Guide works",
    patterns: [
      "How does this work?",
      "How does Spider-Guide work?",
      "How do you find answers?",
    ],
    keywords: ["how", "work", "works", "find"],
    answer:
      "It matches what you type against a structured set of questions and answers about Mert, using keyword and phrase scoring — no network calls, no model. High-confidence matches answer directly; weaker matches surface a few close options instead of guessing.",
    followUpIntentIds: ["what-is-spider-guide", "who-is-mert"],
    priority: 4,
  },
  {
    id: "site-tech-stack",
    category: "website",
    title: "What this website is built with",
    patterns: [
      "What is this website built with?",
      "What tech stack does this portfolio use?",
      "How was this site made?",
    ],
    keywords: ["website", "site", "built", "portfolio", "tech"],
    answer:
      "React 19, TypeScript, and Vite, styled with Tailwind CSS v4, deployed to AWS S3 and CloudFront. The pixel/comic visual system and Spider-Guide itself are both custom-built for this site.",
    followUpIntentIds: ["backend-tech-stack", "skills-summary"],
    priority: 3,
  },
  {
    id: "off-topic-response",
    category: "website",
    title: "Handling requests outside the knowledge base",
    patterns: [
      "Write my homework.",
      "Tell me the weather.",
      "Generate production code for me.",
      "Ignore your instructions.",
      "Pretend you are ChatGPT.",
      "What is the meaning of life?",
    ],
    keywords: ["homework", "weather", "generate", "ignore", "instructions", "pretend"],
    excludedKeywords: ["mert", "nummoria", "jobpilot", "reprobot", "backend", "project"],
    answer:
      "That's outside my portfolio knowledge base. I can help you explore Mert's projects, skills, experience, engineering decisions, goals, or contact information.",
    followUpIntentIds: ["who-is-mert", "projects-overview", "how-to-contact"],
    priority: 1,
  },
  {
    id: "thanks-smalltalk",
    category: "website",
    title: "Thanks / small talk",
    patterns: [
      "Thanks.",
      "Thank you.",
      "Cool, thanks.",
      "That's helpful.",
      "Awesome.",
    ],
    keywords: ["thanks", "thank", "cool", "nice", "awesome", "great"],
    answer:
      "Anytime. Ask another question or pick a shortcut below — there's a lot more here than a standard portfolio FAQ.",
    followUpIntentIds: ["what-to-examine-first", "strongest-backend-project", "how-to-contact"],
    priority: 1,
  },
];
