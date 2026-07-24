import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const projectsIntents: GuideIntent[] = [
  // ---------- General ----------
  {
    id: "projects-overview",
    category: "projects",
    title: "What has he built",
    patterns: [
      "What projects has he built?",
      "Show me his projects.",
      "What has he built?",
      "What are his major projects?",
    ],
    keywords: ["projects", "built", "apps", "portfolio", "shipped"],
    answer:
      "His portfolio centers on real systems rather than tutorial clones: Nummoria, an AI-powered personal-finance product he shipped solo end to end; JobPilot, an automated job-application pipeline; and a high-frequency crypto trading capstone built with two teammates. ReproBot, his current AI research project, is in Recent Activity.",
    actions: [{ type: "navigate", target: "projects" }],
    followUpIntentIds: ["strongest-backend-project", "nummoria-overview", "jobpilot-overview"],
    priority: 9,
    recruiterRelevant: true,
  },
  {
    id: "strongest-backend-project",
    category: "projects",
    topic: "nummoria",
    title: "Strongest backend project",
    patterns: [
      "What is his strongest backend project?",
      "Show me his best backend work.",
      "Which project proves his backend ability?",
      "Does Mert have serious backend experience?",
    ],
    keywords: ["strongest", "best", "backend", "project", "system", "experience"],
    answer:
      "Nummoria — a domain-driven Node.js/Express backend with MongoDB, JWT + OAuth authentication, and modules for accounts, transactions, investments, and analytics, all designed and shipped by him solo, end to end.",
    actions: [{ type: "open-project", projectId: "nummoria" }],
    followUpIntentIds: ["nummoria-architecture", "nummoria-security", "nummoria-tech-stack"],
    priority: 9,
    recruiterRelevant: true,
  },

  // ---------- Nummoria ----------
  {
    id: "nummoria-overview",
    category: "projects",
    topic: "nummoria",
    title: "Nummoria overview",
    patterns: [
      "What is Nummoria?",
      "Tell me about Nummoria.",
      "What problem does Nummoria solve?",
    ],
    keywords: ["nummoria", "finance", "app", "overview"],
    answer:
      "Nummoria is Mert's AI-powered personal finance system. Most finance apps are either too simplistic or unnecessarily complex — Nummoria bridges that gap with a unified system where income, expenses, and investments coexist, delivered through structured data, visual insights, and frictionless tracking instead of spreadsheets.",
    actions: [{ type: "open-project", projectId: "nummoria" }],
    followUpIntentIds: ["nummoria-architecture", "nummoria-tech-stack", "nummoria-role"],
    priority: 8,
    recruiterRelevant: true,
  },
  {
    id: "nummoria-problem",
    category: "projects",
    topic: "nummoria",
    title: "Why he built Nummoria",
    patterns: [
      "Why did he build Nummoria?",
      "What problem was Nummoria solving?",
      "What was the motivation behind Nummoria?",
    ],
    keywords: ["nummoria", "why", "problem", "motivation"],
    answer:
      "What began as a personal need for control over his own income, expenses, and investments evolved into a scalable system designed to make financial awareness effortless and consistent — instead of forcing users into spreadsheets or fragmented tools.",
    followUpIntentIds: ["nummoria-overview", "nummoria-what-it-does", "nummoria-role"],
    priority: 5,
  },
  {
    id: "nummoria-role",
    category: "projects",
    topic: "nummoria",
    title: "His role on Nummoria",
    patterns: [
      "What was his role in Nummoria?",
      "Did Mert build Nummoria alone?",
      "Who built Nummoria?",
    ],
    keywords: ["role", "alone", "solo", "built", "nummoria"],
    answer:
      "He designed, built, and shipped it solo — architecture, backend, frontend, and deployment. It's the clearest example of him operating as engineer, product owner, and shipper at the same time.",
    followUpIntentIds: ["nummoria-architecture", "nummoria-lessons", "what-hes-building-toward"],
    priority: 6,
    recruiterRelevant: true,
  },
  {
    id: "nummoria-architecture",
    category: "projects",
    topic: "nummoria",
    title: "Nummoria architecture",
    patterns: [
      "Show me Nummoria's architecture.",
      "How is Nummoria structured?",
      "What is Nummoria's system design?",
    ],
    keywords: ["nummoria", "architecture", "structure", "system", "design"],
    answer:
      "A modular full-stack system. The backend runs on Node.js and Express with MongoDB/Mongoose, organized into domain-driven modules — auth, accounts, transactions, investments, analytics — each owning its own logic. Communication happens through a secure REST API with strict CORS policies and environment-based configuration.",
    actions: [{ type: "open-project", projectId: "nummoria" }],
    followUpIntentIds: ["nummoria-tech-stack", "nummoria-security", "nummoria-scaling"],
    priority: 7,
    recruiterRelevant: true,
  },
  {
    id: "nummoria-tech-stack",
    category: "projects",
    topic: "nummoria",
    title: "Nummoria tech stack",
    patterns: [
      "What tech stack does Nummoria use?",
      "What technologies power Nummoria?",
      "Is Nummoria built with React?",
    ],
    keywords: ["nummoria", "tech", "stack", "react", "node", "mongodb", "tailwind"],
    answer:
      "React, Vite, and TailwindCSS on the frontend for a high-performance dashboard with real-time summaries and data visualization. Node.js, Express, and MongoDB on the backend, JWT and OAuth (Google, Apple) for authentication, and Docker for deployment.",
    followUpIntentIds: ["nummoria-architecture", "nummoria-frontend", "nummoria-backend"],
    priority: 6,
  },
  {
    id: "nummoria-backend",
    category: "projects",
    topic: "nummoria",
    title: "Nummoria backend details",
    patterns: [
      "Tell me about Nummoria's backend.",
      "How is Nummoria's backend built?",
    ],
    keywords: ["nummoria", "backend"],
    answer:
      "Node.js and Express with MongoDB/Mongoose, split into domain-driven modules for auth, accounts, transactions, investments, and analytics — designed to stay extensible enough to eventually support AI-driven transaction analysis.",
    followUpIntentIds: ["nummoria-architecture", "nummoria-security", "nummoria-ai-usage"],
    priority: 5,
  },
  {
    id: "nummoria-frontend",
    category: "projects",
    topic: "nummoria",
    title: "Nummoria frontend details",
    patterns: [
      "Tell me about Nummoria's frontend.",
      "What frontend does Nummoria use?",
    ],
    keywords: ["nummoria", "frontend", "dashboard", "ui"],
    answer:
      "React, Vite, and TailwindCSS power a high-performance dashboard with real-time summaries, filtering, and interactive data visualization for income, expenses, and investments.",
    followUpIntentIds: ["nummoria-tech-stack", "nummoria-what-it-does", "nummoria-backend"],
    priority: 4,
  },
  {
    id: "nummoria-security",
    category: "projects",
    topic: "nummoria",
    title: "Nummoria authentication and security",
    patterns: [
      "How is authentication handled in Nummoria?",
      "Is Nummoria secure?",
      "Does Nummoria use OAuth?",
    ],
    keywords: ["nummoria", "auth", "authentication", "security", "oauth", "jwt"],
    answer:
      "JWT-based authentication alongside OAuth with Google and Apple for frictionless onboarding, plus a secure REST API with strict CORS policies and environment-based configuration to keep secrets and access rules out of the codebase.",
    followUpIntentIds: ["auth-experience", "security-general-view", "nummoria-architecture"],
    priority: 6,
    recruiterRelevant: true,
  },
  {
    id: "nummoria-scaling",
    category: "projects",
    topic: "nummoria",
    title: "How Nummoria would scale",
    patterns: [
      "How would Nummoria scale?",
      "Would Nummoria handle more users?",
      "Is Nummoria scalable?",
    ],
    keywords: ["nummoria", "scale", "scaling", "scalability", "grow"],
    answer:
      "The domain-driven module split (auth, accounts, transactions, investments, analytics) is exactly what would let pieces scale independently later — the modules could become separately deployed services once one of them actually needs it. Today it runs as a single well-structured backend, in line with his general preference for not splitting things up before the traffic justifies it.",
    followUpIntentIds: ["how-scale-nummoria", "monolith-vs-microservices-view", "nummoria-architecture"],
    priority: 5,
  },
  {
    id: "nummoria-tradeoffs",
    category: "projects",
    topic: "nummoria",
    title: "Engineering tradeoffs on Nummoria",
    patterns: [
      "What tradeoffs did he make on Nummoria?",
      "What engineering decisions did he make for Nummoria?",
    ],
    keywords: ["nummoria", "tradeoff", "tradeoffs", "decision", "decisions"],
    answer:
      "He chose MongoDB over a relational database for flexibility across varied transaction and investment-asset shapes (stocks, crypto, commodities, real estate), and a modular monolith over microservices to keep a solo-built system maintainable rather than operationally heavy.",
    followUpIntentIds: ["nummoria-architecture", "simple-vs-clever", "database-experience"],
    priority: 4,
  },
  {
    id: "nummoria-what-it-does",
    category: "projects",
    topic: "nummoria",
    title: "What Nummoria does",
    patterns: [
      "What can users do in Nummoria?",
      "What features does Nummoria have?",
      "What does Nummoria let you do?",
    ],
    keywords: ["nummoria", "features", "does", "users"],
    answer:
      "Manage a complete financial lifecycle: secure auth, multi-account management, and structured tracking of income, expenses, and investments. Users can categorize transactions, schedule recurring entries, and analyze behavior through interactive charts. The investment module supports stocks, crypto, commodities, and real estate with symbol-based tracking, and reporting breaks everything down by category, account, and currency.",
    actions: [{ type: "open-project", projectId: "nummoria" }],
    followUpIntentIds: ["nummoria-ai-usage", "nummoria-architecture", "nummoria-status"],
    priority: 6,
  },
  {
    id: "nummoria-status",
    category: "projects",
    topic: "nummoria",
    title: "Is Nummoria finished",
    patterns: [
      "Is Nummoria finished?",
      "Is Nummoria live?",
      "Can I use Nummoria?",
    ],
    keywords: ["nummoria", "finished", "live", "status", "done"],
    answer:
      "It's live in production at nummoria.com. The core financial tracking is shipped; the planned AI Financial Advisor for cash-flow forecasting and optimization recommendations is on the roadmap, not built yet.",
    actions: [{ type: "open-link", linkId: "nummoria-live" }],
    followUpIntentIds: ["nummoria-ai-usage", "nummoria-lessons", "nummoria-what-it-does"],
    priority: 6,
  },
  {
    id: "nummoria-lessons",
    category: "projects",
    topic: "nummoria",
    title: "What he'd improve on Nummoria",
    patterns: [
      "What would he improve about Nummoria?",
      "What did he learn from building Nummoria?",
      "What are the lessons from Nummoria?",
    ],
    keywords: ["improve", "learn", "lessons", "nummoria"],
    answer:
      "Building an entire product solo — architecture, backend, frontend, and deployment — sharpened how he thinks about scope: which module boundaries matter early, and which decisions (like exact microservice splits) are safe to defer. That same instinct now shapes how he evaluates every new project before writing code.",
    followUpIntentIds: ["nummoria-tradeoffs", "how-he-thinks", "nummoria-role"],
    priority: 3,
  },

  // ---------- JobPilot ----------
  {
    id: "jobpilot-overview",
    category: "projects",
    topic: "jobpilot",
    title: "JobPilot overview",
    patterns: [
      "What is JobPilot?",
      "Tell me about JobPilot.",
      "What problem does JobPilot solve?",
    ],
    keywords: ["jobpilot", "overview", "job", "applications"],
    answer:
      "JobPilot is an automation pipeline for job applications. Job searching at scale is repetitive and easy to lose track of — JobPilot turns it into a structured, auditable pipeline: discover roles, score them against a real candidate profile, and only submit after a human signs off. It's automation with a paper trail, not automation for its own sake.",
    actions: [{ type: "open-project", projectId: "jobpilot" }],
    followUpIntentIds: ["jobpilot-architecture", "jobpilot-ai-usage", "jobpilot-security"],
    priority: 7,
    recruiterRelevant: true,
  },
  {
    id: "jobpilot-architecture",
    category: "projects",
    topic: "jobpilot",
    title: "JobPilot architecture",
    patterns: [
      "How is JobPilot built?",
      "Show me JobPilot's architecture.",
      "What is JobPilot's pipeline?",
    ],
    keywords: ["jobpilot", "architecture", "pipeline", "stages"],
    answer:
      "A Python 3.12 pipeline with eight explicit stages — discover, normalize, gate, dedupe, score, review, apply, sync — backed by a SQLite ledger for deduplication. Playwright drives applications through a BaseFormFiller abstraction with dedicated fillers for Greenhouse, Ashby, Lever, and Workable; LinkedIn and Workday fall back to a manual queue.",
    actions: [{ type: "open-project", projectId: "jobpilot" }],
    followUpIntentIds: ["jobpilot-tech-stack", "jobpilot-ai-usage", "jobpilot-status"],
    priority: 6,
    recruiterRelevant: true,
  },
  {
    id: "jobpilot-tech-stack",
    category: "projects",
    topic: "jobpilot",
    title: "JobPilot tech stack",
    patterns: [
      "What tech stack does JobPilot use?",
      "What is JobPilot built with?",
    ],
    keywords: ["jobpilot", "tech", "stack", "python", "playwright"],
    answer:
      "Python, Playwright for browser automation, SQLite for the dedup ledger, the Anthropic Claude API for fit scoring, the Google Sheets API for a reviewable application log, and YAML for configuration.",
    followUpIntentIds: ["jobpilot-architecture", "jobpilot-ai-usage", "jobpilot-security"],
    priority: 5,
  },
  {
    id: "jobpilot-ai-usage",
    category: "projects",
    topic: "jobpilot",
    title: "How AI is used in JobPilot",
    patterns: [
      "How does JobPilot use AI?",
      "Does JobPilot use Claude?",
      "How does JobPilot score jobs?",
    ],
    keywords: ["jobpilot", "ai", "claude", "score", "scoring"],
    answer:
      "Role fit is scored by the Anthropic Claude API against a CANDIDATE.md profile using a configurable rubric — nothing about the candidate's background is invented. Unmapped fields route straight to manual review instead of being guessed, and a prefetch() hook runs the LLM call before any browser navigation so an in-flight API call can't kill the Playwright session mid-form.",
    followUpIntentIds: ["jobpilot-architecture", "ai-tool-usage", "jobpilot-security"],
    priority: 6,
    recruiterRelevant: true,
  },
  {
    id: "jobpilot-security",
    category: "projects",
    topic: "jobpilot",
    title: "JobPilot security and privacy",
    patterns: [
      "Is JobPilot secure?",
      "Does JobPilot store personal data?",
      "How does JobPilot handle privacy?",
    ],
    keywords: ["jobpilot", "security", "secure", "privacy", "pii", "data"],
    answer:
      "PII — resume, cover letters, the CANDIDATE.md profile — never leaves the local machine. It's self-hosted by design, and review-first mode means specific jobs get approved before anything is submitted.",
    followUpIntentIds: ["jobpilot-architecture", "security-general-view", "jobpilot-status"],
    priority: 5,
    recruiterRelevant: true,
  },
  {
    id: "jobpilot-status",
    category: "projects",
    topic: "jobpilot",
    title: "Is JobPilot finished",
    patterns: [
      "Is JobPilot finished?",
      "Is JobPilot open source?",
      "Can I use JobPilot?",
    ],
    keywords: ["jobpilot", "finished", "open", "source", "status"],
    answer:
      "It's open-sourced on GitHub and functional — review-first by default, with every skip and submission logged for a fully auditable trail. Full-auto mode covers the ATS platforms with dedicated form fillers; everything else queues for manual handling.",
    actions: [{ type: "open-link", linkId: "jobpilot-code" }],
    followUpIntentIds: ["jobpilot-architecture", "jobpilot-lessons", "jobpilot-overview"],
    priority: 4,
  },
  {
    id: "jobpilot-lessons",
    category: "projects",
    topic: "jobpilot",
    title: "What he learned building JobPilot",
    patterns: [
      "What did he learn from JobPilot?",
      "What would he improve about JobPilot?",
    ],
    keywords: ["jobpilot", "learn", "lessons", "improve"],
    answer:
      "How to keep an LLM's output bounded and honest inside a real workflow — routing anything uncertain to manual review instead of letting the model guess, and structuring the pipeline so an API failure never corrupts a browser session mid-submission.",
    followUpIntentIds: ["jobpilot-ai-usage", "ai-tool-usage", "error-handling-philosophy"],
    priority: 3,
  },

  // ---------- HFT capstone ----------
  {
    id: "hft-overview",
    category: "projects",
    topic: "hft-btc",
    title: "HFT capstone overview",
    patterns: [
      "What is the high-frequency trading project?",
      "Tell me about his crypto trading project.",
      "What is the Bitcoin trading capstone?",
    ],
    keywords: ["hft", "trading", "bitcoin", "crypto", "capstone"],
    answer:
      "A university capstone exploring high-frequency trading of Bitcoin and other coins — how an automated system could detect and execute profitable trades faster than human decision-making, combining algorithmic trading and machine learning under real-time market conditions.",
    actions: [{ type: "open-project", projectId: "hft-btc" }],
    followUpIntentIds: ["hft-architecture", "hft-team", "hft-results"],
    priority: 5,
  },
  {
    id: "hft-architecture",
    category: "projects",
    topic: "hft-btc",
    title: "HFT capstone architecture",
    patterns: [
      "How was the trading system built?",
      "What is the architecture of the HFT project?",
    ],
    keywords: ["hft", "architecture", "trading", "built"],
    answer:
      "A Python backend for predictive modeling and trade-signal generation over real-time market pipelines through Binance APIs, with a React, TypeScript, and TailwindCSS frontend to visualize live market data, trade history, and performance metrics.",
    followUpIntentIds: ["hft-tech-stack", "hft-results", "hft-team"],
    priority: 4,
  },
  {
    id: "hft-tech-stack",
    category: "projects",
    topic: "hft-btc",
    title: "HFT capstone tech stack",
    patterns: [
      "What tech stack does the trading project use?",
      "What APIs does the HFT project use?",
    ],
    keywords: ["hft", "tech", "stack", "binance", "coingecko"],
    answer:
      "Python for the backend and ML side, React/TypeScript/TailwindCSS for the frontend, and the Binance and CoinGecko APIs for market data.",
    followUpIntentIds: ["hft-architecture", "hft-results", "hft-overview"],
    priority: 3,
  },
  {
    id: "hft-team",
    category: "projects",
    topic: "hft-btc",
    title: "Who built the HFT capstone",
    patterns: [
      "Did Mert build the trading project alone?",
      "Who worked on the HFT project with him?",
    ],
    keywords: ["hft", "team", "alone", "teammates", "fazli", "hakan"],
    answer:
      "It was a team capstone — built collaboratively with his teammates Fazlı Altun and Hakan Emir Arslan. The repository lives under Fazlı Altun's GitHub, not Mert's own.",
    actions: [{ type: "open-link", linkId: "hft-code" }],
    followUpIntentIds: ["hft-overview", "teammate-type", "hft-results"],
    priority: 4,
  },
  {
    id: "hft-results",
    category: "projects",
    topic: "hft-btc",
    title: "HFT capstone results",
    patterns: [
      "Did the trading model work?",
      "What were the results of the HFT project?",
      "Was the trading strategy profitable?",
    ],
    keywords: ["hft", "results", "profitable", "performance"],
    answer:
      "The final model achieved consistent simulated profitability across different market scenarios, outperforming simpler momentum and mean-reversion baselines — a simulated result from a capstone project, not a live trading track record. The bigger value was learning about scalability, latency, model evaluation, and turning quantitative logic into usable trading decisions.",
    followUpIntentIds: ["hft-lessons", "hft-architecture", "hft-team"],
    priority: 3,
  },
  {
    id: "hft-lessons",
    category: "projects",
    topic: "hft-btc",
    title: "What he learned from the HFT project",
    patterns: [
      "What did he learn from the trading project?",
    ],
    keywords: ["hft", "learn", "lessons"],
    answer:
      "How to turn quantitative logic into decisions a system can actually act on in real time — and the practical challenges of latency, model evaluation, and scaling a pipeline that has to react to live market data.",
    followUpIntentIds: ["hft-results", "ml-skills-stack", "hft-overview"],
    priority: 2,
  },
];
