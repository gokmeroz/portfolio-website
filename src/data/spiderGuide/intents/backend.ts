import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const backendIntents: GuideIntent[] = [
  {
    id: "backend-tech-stack",
    category: "backend",
    title: "Backend languages and frameworks",
    patterns: [
      "What backend languages does he know?",
      "Does he know Node.js and C#?",
      "What backend frameworks has he used?",
      "What is his backend tech stack?",
    ],
    keywords: ["backend", "node", "express", "csharp", "dotnet", "python", "language", "framework"],
    answer:
      "Node.js and Express, C# and .NET Core, and Python. He's shipped production code in all three — .NET Core at Halkbank, Node.js at Eyehub and in Nummoria, and Python in JobPilot and the HFT capstone.",
    actions: [{ type: "filter-skills", category: "languages-tools" }],
    followUpIntentIds: ["database-experience", "rest-api-design", "backend-experience-summary"],
    priority: 6,
  },
  {
    id: "database-experience",
    category: "backend",
    title: "Database experience",
    patterns: [
      "What databases does he know?",
      "Does he know SQL and MongoDB?",
      "Has he done data modeling?",
    ],
    keywords: ["database", "sql", "mongodb", "data", "modeling"],
    answer:
      "Both relational and NoSQL: relational data modeling across 75+ tables of attendance logic in C#/.NET Core at Halkbank, and MongoDB for medical research datasets at Eyehub and for Nummoria's transaction and investment models. He picks the model based on what the domain needs rather than defaulting to one.",
    followUpIntentIds: ["backend-tech-stack", "rest-api-design", "simple-vs-clever"],
    priority: 5,
  },
  {
    id: "rest-api-design",
    category: "backend",
    title: "REST API design approach",
    patterns: [
      "How does he design APIs?",
      "Does he build REST APIs?",
      "What is his API design philosophy?",
    ],
    keywords: ["rest", "api", "design", "endpoint"],
    answer:
      "Domain-driven and boring on purpose: clear resource boundaries, explicit contracts, and CORS/config handled per environment rather than hardcoded. Nummoria's API is split into auth, accounts, transactions, investments, and analytics modules — each one owns its own logic instead of one shared god-controller.",
    followUpIntentIds: ["nummoria-architecture", "auth-experience", "api-structuring-approach"],
    priority: 5,
  },
  {
    id: "auth-experience",
    category: "backend",
    title: "Authentication and authorization experience",
    patterns: [
      "What is his authentication experience?",
      "Does he know JWT and OAuth?",
      "How does he handle authentication?",
    ],
    keywords: ["auth", "authentication", "jwt", "oauth", "authorization"],
    answer:
      "JWT-based authentication combined with OAuth (Google and Apple) in Nummoria for frictionless onboarding, plus authentication flows in the RESTful APIs he built at Eyehub for mobile client sync.",
    actions: [{ type: "open-project", projectId: "nummoria" }],
    followUpIntentIds: ["nummoria-security", "auth-design-thinking", "rest-api-design"],
    priority: 5,
    recruiterRelevant: true,
  },
  {
    id: "deployment-cloud-experience",
    category: "backend",
    title: "Deployment and cloud infrastructure experience",
    patterns: [
      "What cloud experience does he have?",
      "Has he deployed to AWS?",
      "Does he know Docker?",
      "What is his deployment experience?",
    ],
    keywords: ["cloud", "aws", "docker", "deployment", "infrastructure"],
    answer:
      "AWS EC2 and Lambda for backend infrastructure at Eyehub, Docker containerization at ComPro (including a cost/performance evaluation of IBM Cloud vs. AWS), and Docker again in Nummoria's deployment setup.",
    followUpIntentIds: ["compro-cloud-evaluation", "eyehub-tech-stack", "nummoria-tech-stack"],
    priority: 5,
  },
  {
    id: "monolith-vs-microservices-view",
    category: "backend",
    topic: "system-design",
    title: "His view on monoliths vs. microservices",
    patterns: [
      "Does he prefer monoliths or microservices?",
      "What does he think about microservices?",
      "How does he choose between a monolith and microservices?",
    ],
    keywords: ["monolith", "microservices", "prefer", "choose"],
    answer:
      "A well-structured monolith over premature microservices — he'd rather split a system when the traffic, team size, or failure modes actually demand it, not because microservices look more impressive on a diagram.",
    followUpIntentIds: ["simple-vs-clever", "monolith-vs-microservices-decision", "how-scale-nummoria"],
    priority: 5,
  },
  {
    id: "scalability-general-view",
    category: "backend",
    title: "General approach to scalability",
    patterns: [
      "How does he think about scalability?",
      "How does he approach scaling a system?",
      "What is his approach to performance?",
    ],
    keywords: ["scalability", "scaling", "performance", "approach"],
    answer:
      "Match the architecture to real constraints, not hypothetical ones. He'd rather measure where a system actually slows down and fix that bottleneck than pre-optimize for scale he doesn't have yet — that's the same instinct behind preferring monoliths until complexity earns its place.",
    followUpIntentIds: ["how-scale-nummoria", "first-bottleneck", "reliability-improvement-approach"],
    priority: 4,
  },
  {
    id: "error-handling-philosophy",
    category: "backend",
    title: "Error handling and reliability philosophy",
    patterns: [
      "How does he handle errors?",
      "What is his approach to reliability?",
      "How does he improve reliability?",
    ],
    keywords: ["error", "handling", "reliability", "resilience"],
    answer:
      "Fail loud and traceable rather than silently swallowing errors. JobPilot is a good example: every skipped or failed step is logged with a reason to a reviewable ledger instead of just moving on, so failures are debuggable after the fact, not just hidden.",
    actions: [{ type: "open-project", projectId: "jobpilot" }],
    followUpIntentIds: ["jobpilot-architecture", "reliability-improvement-approach", "scalability-general-view"],
    priority: 4,
  },
  {
    id: "caching-view",
    category: "backend",
    title: "View on caching",
    patterns: [
      "What does he think about caching?",
      "Does he use caching?",
    ],
    keywords: ["caching", "cache"],
    answer:
      "Caching is a tool for a measured bottleneck, not a default. His current projects are still at a scale where correct data modeling and indexing matter more than a caching layer — he'd add one when profiling actually shows it's needed.",
    followUpIntentIds: ["scalability-general-view", "how-scale-nummoria", "database-experience"],
    priority: 2,
  },
  {
    id: "security-general-view",
    category: "backend",
    title: "General approach to security",
    patterns: [
      "How does he think about security?",
      "What is his approach to secure software?",
      "Does he have security experience?",
    ],
    keywords: ["security", "secure", "vulnerability"],
    answer:
      "Security by default in the data flow, not bolted on after: strict CORS and environment-based config in Nummoria, IRB-compliant data-integrity standards for medical data at Eyehub, and a completed certificate in Requirements Gathering for Secure Software Development. JobPilot goes further — PII never leaves the local machine at all.",
    actions: [{ type: "navigate", target: "certificates" }],
    followUpIntentIds: ["nummoria-security", "jobpilot-security", "eyehub-tech-stack"],
    priority: 5,
    recruiterRelevant: true,
  },
  {
    id: "api-structuring-approach",
    category: "backend",
    topic: "system-design",
    title: "How he structures APIs",
    patterns: [
      "How does he structure APIs?",
      "How does he organize backend code?",
    ],
    keywords: ["structure", "structuring", "organize", "modules"],
    answer:
      "Domain-driven modules with clear ownership — Nummoria splits into auth, accounts, transactions, investments, and analytics, each with its own logic rather than one shared layer handling everything. It keeps the codebase readable as it grows instead of turning into one large controller.",
    followUpIntentIds: ["rest-api-design", "nummoria-architecture", "simple-vs-clever"],
    priority: 4,
  },
];
