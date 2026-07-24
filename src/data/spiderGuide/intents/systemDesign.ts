import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const systemDesignIntents: GuideIntent[] = [
  {
    id: "how-scale-nummoria",
    category: "system-design",
    topic: "nummoria",
    title: "How he would scale Nummoria",
    patterns: [
      "How would Mert scale Nummoria?",
      "How would he scale Nummoria to more users?",
      "What would Nummoria need to handle more traffic?",
    ],
    keywords: ["scale", "nummoria", "scaling", "traffic"],
    requiredKeywords: ["scale"],
    answer:
      "He'd start by measuring, not guessing — profile the actual bottleneck instead of pre-splitting the system. Nummoria's domain-driven modules (accounts, transactions, investments, analytics) are already boundaries that could become separate services later; today it stays a single well-structured backend because nothing has demanded otherwise yet.",
    followUpIntentIds: ["first-bottleneck", "nummoria-scaling", "monolith-vs-microservices-decision"],
    priority: 5,
  },
  {
    id: "first-bottleneck",
    category: "system-design",
    topic: "nummoria",
    title: "First likely bottleneck",
    patterns: [
      "What might become the first bottleneck?",
      "Where would Nummoria break first under load?",
    ],
    keywords: ["bottleneck", "first", "break", "load"],
    answer:
      "Most likely the transaction and analytics read paths once reporting queries grow — that's usually where a general-purpose document store starts needing indexes, aggregation tuning, or a read-optimized path before anything else does.",
    followUpIntentIds: ["how-scale-nummoria", "database-experience", "caching-view"],
    priority: 3,
  },
  {
    id: "monolith-vs-microservices-decision",
    category: "system-design",
    title: "How he chooses between monoliths and microservices",
    patterns: [
      "How does he choose between monoliths and microservices?",
      "When would he split a monolith into microservices?",
    ],
    keywords: ["monolith", "microservices", "choose", "decide", "split"],
    answer:
      "By evidence, not fashion: he splits a service out when a specific part of the system has a genuinely different scaling profile, team ownership need, or failure mode — not because microservices are the assumed default. Until that's true, one well-structured codebase is easier to reason about and ship.",
    followUpIntentIds: ["monolith-vs-microservices-view", "simple-vs-clever", "how-scale-nummoria"],
    priority: 5,
  },
  {
    id: "transaction-service-design-thinking",
    category: "system-design",
    title: "How he'd design a transaction service",
    patterns: [
      "How would he design a transaction service?",
      "How would he build a payments system?",
    ],
    keywords: ["transaction", "service", "design", "payments"],
    answer:
      "Start from the invariants that must never break — no lost writes, no double-processing — then design the data model and idempotency around those first. It's the same instinct behind Nummoria's transactions module: a dedicated domain boundary rather than logic scattered across the API.",
    followUpIntentIds: ["nummoria-architecture", "auth-design-thinking", "reliability-improvement-approach"],
    priority: 3,
  },
  {
    id: "auth-design-thinking",
    category: "system-design",
    title: "How he thinks about authentication design",
    patterns: [
      "How does he think about authentication design?",
      "How would he design an auth system?",
    ],
    keywords: ["authentication", "auth", "design", "thinking"],
    answer:
      "Token-based and provider-flexible by default — JWT for session handling, OAuth for onboarding through providers users already trust. Nummoria's Google/Apple OAuth is exactly that reasoning applied: reduce onboarding friction without owning password storage risk directly.",
    followUpIntentIds: ["auth-experience", "nummoria-security", "security-general-view"],
    priority: 4,
  },
  {
    id: "api-structuring-thinking",
    category: "system-design",
    title: "How he structures APIs at a system-design level",
    patterns: [
      "How does he structure APIs?",
      "How does he think about API boundaries?",
    ],
    keywords: ["api", "structure", "boundaries", "design"],
    answer:
      "Around domain ownership, not around HTTP verbs. Each module — auth, accounts, transactions, investments, analytics in Nummoria's case — owns its own routes, validation, and data access, which keeps changes local instead of rippling across one shared layer.",
    followUpIntentIds: ["api-structuring-approach", "nummoria-architecture", "rest-api-design"],
    priority: 3,
  },
  {
    id: "reliability-improvement-approach",
    category: "system-design",
    title: "How he'd improve reliability",
    patterns: [
      "How would he improve reliability?",
      "How does he think about system reliability?",
    ],
    keywords: ["reliability", "improve", "resilience"],
    answer:
      "Make failures visible and recoverable before making them rare. JobPilot's approach is the clearest example — every skip and failure is logged with a reason to an auditable ledger, so nothing fails silently and every run can be reconstructed after the fact.",
    followUpIntentIds: ["error-handling-philosophy", "jobpilot-architecture", "scalability-general-view"],
    priority: 3,
  },
  {
    id: "engineering-tradeoffs-made",
    category: "system-design",
    title: "Engineering tradeoffs he's made",
    patterns: [
      "What engineering tradeoffs has he made?",
      "What tradeoffs has he made in his projects?",
    ],
    keywords: ["tradeoff", "tradeoffs", "engineering", "decisions"],
    answer:
      "Modular monolith over microservices on Nummoria to stay maintainable as a solo build; MongoDB over a relational store for flexible transaction/investment shapes; review-first over full-auto by default on JobPilot, trading a bit of speed for an auditable trail he actually trusts.",
    followUpIntentIds: ["nummoria-tradeoffs", "jobpilot-security", "simple-vs-clever"],
    priority: 4,
    recruiterRelevant: true,
  },
  {
    id: "system-design-for-ai",
    category: "system-design",
    title: "How he approaches system design for AI features",
    patterns: [
      "How does he design systems around AI?",
      "How does he integrate AI into a backend safely?",
    ],
    keywords: ["ai", "system", "design", "integrate", "safely"],
    answer:
      "Keep the model's output bounded and the system's guarantees independent of it — JobPilot routes anything the model is unsure about to manual review rather than letting it guess, and the API call happens before any side-effecting action so a failure can't corrupt state. Intelligence gets a fenced-off role, not blanket trust.",
    followUpIntentIds: ["jobpilot-ai-usage", "ai-tool-usage", "why-ai-ml"],
    priority: 4,
  },
];
