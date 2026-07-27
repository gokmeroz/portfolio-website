// src/data/interviewMert.ts
// Static, deterministic content for the "Interview Mert" system-design mode.
// No AI/API calls — every answer here is pre-written, same philosophy as Spidey-Guide.

export type InterviewStageKey =
  | "requirements"
  | "constraints"
  | "architecture"
  | "bottlenecks"
  | "scaling"
  | "tradeoffs";

export type InterviewStage = {
  key: InterviewStageKey;
  label: string;
  body: string[];
};

export type InterviewQuestion = {
  id: string;
  title: string;
  tagline: string;
  stages: InterviewStage[];
  diagram: {
    ascii: string;
    description: string;
  };
  challenge: {
    prompt: string;
    response: string;
  };
};

export const STAGE_LABELS: Record<InterviewStageKey, string> = {
  requirements: "Requirements",
  constraints: "Constraints",
  architecture: "Initial architecture",
  bottlenecks: "Bottlenecks",
  scaling: "Scaling strategy",
  tradeoffs: "Trade-offs",
};

export const STAGE_ORDER: InterviewStageKey[] = [
  "requirements",
  "constraints",
  "architecture",
  "bottlenecks",
  "scaling",
  "tradeoffs",
];

function stage(key: InterviewStageKey, body: string[]): InterviewStage {
  return { key, label: STAGE_LABELS[key], body };
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "transaction-platform",
    title: "Design a transaction platform",
    tagline: "Invariants first: no lost writes, no double-processing.",
    stages: [
      stage("requirements", [
        "Every transaction is recorded exactly once, even if a client retries after a timeout.",
        "Balances and histories stay consistent under concurrent writes to the same account.",
        "Every state change is auditable after the fact — who did what, when, and why it was accepted or rejected.",
      ]),
      stage("constraints", [
        "Clients will retry on timeouts, so the API has to be safe to call twice for the same intent.",
        "Money-moving writes can't be eventually consistent — the ledger has to be right immediately, not right \"soon\".",
        "A solo or small team has to be able to reason about the whole write path without a distributed-systems team backing it up.",
      ]),
      stage("architecture", [
        "A dedicated transactions module, not logic scattered across a generic API — the same instinct behind Nummoria's domain-driven layout (auth, accounts, transactions, investments, analytics as separate modules).",
        "Every write carries a client-generated idempotency key; the service persists (key → result) so a retried request returns the original result instead of creating a second transaction.",
        "A single source of truth for balance state, updated inside the same transaction as the ledger entry — never inferred after the fact from a log.",
      ]),
      stage("bottlenecks", [
        "Row-level contention on hot accounts once concurrent writes to the same balance start queuing behind each other.",
        "The idempotency-key lookup itself becoming a hotspot if it's not indexed the same way the write path is.",
        "Reporting and analytics queries competing with the write path for the same tables once transaction volume grows.",
      ]),
      stage("scaling", [
        "Split the read path from the write path first — reporting and analytics get their own read-optimized store or replica before anything about the write path changes.",
        "Shard or partition by account/user once a single node's write throughput is the actual measured limit, not before.",
        "Push non-critical side effects (notifications, analytics events) onto a queue so the core write stays fast and narrow.",
      ]),
      stage("tradeoffs", [
        "Strong consistency on the ledger over eventual consistency everywhere — accepting the operational cost of a real transaction boundary because a wrong balance is worse than a slower write.",
        "A dedicated module over a shared generic \"data\" layer, trading a little duplication for the ability to change transaction logic without touching unrelated code.",
        "Idempotency keys over deduplication-by-inspection — a small amount of extra state per request instead of trying to detect duplicates heuristically after the fact.",
      ]),
    ],
    diagram: {
      ascii: `[ Client ]
    |
    v  (idempotency key)
[ API Gateway / Auth ]
    |
    v
[ Transaction Service ] --writes--> [ Ledger DB ]
    |                                    |
    | queues                             | replicates
    v                                    v
[ Event Queue ]                  [ Read Replica ]
    |                                    |
    v                                    v
[ Notifications ]                [ Analytics / Reporting ]`,
      description:
        "A client sends a request with an idempotency key through an API gateway to the transaction service. The transaction service writes to the ledger database and pushes side effects onto an event queue for notifications, while the ledger replicates to a read replica used for analytics and reporting — keeping the write path isolated from reporting load.",
    },
    challenge: {
      prompt:
        "You're using idempotency keys, but what stops two different retried requests from racing each other and both passing the check before either one writes?",
      response:
        "That's a real gap if the idempotency check and the write aren't the same atomic operation — the fix is to make the (key → result) row itself the lock: insert the key first with a unique constraint, and let the second concurrent request fail that insert and wait for the first one's result instead of racing it. It's the same reasoning as the ledger writes themselves: don't infer safety after the fact, make the data model enforce it.",
    },
  },
  {
    id: "scale-nummoria",
    title: "Scale Nummoria to one million users",
    tagline: "Measure the real bottleneck before splitting anything.",
    stages: [
      stage("requirements", [
        "Nummoria's core loop — tracking income, expenses, and investments across multiple accounts — has to stay fast and correct as the number of accounts and transactions per user grows.",
        "Existing auth (JWT plus Google/Apple OAuth) and the domain-driven module boundaries (auth, accounts, transactions, investments, analytics) shouldn't need to change shape, just scale underneath.",
        "No downtime-worthy migration — growth has to be absorbed incrementally on a live product.",
      ]),
      stage("constraints", [
        "It's currently a single well-structured Node.js/Express backend with MongoDB via Mongoose — any scaling plan has to work with that stack, not assume a rewrite.",
        "It was designed and shipped solo, so operational complexity has a real cost — every new moving part is something one person has to keep understanding.",
        "Nothing about today's traffic has actually demanded splitting the system yet, so the plan has to be about what to do *when* evidence shows up, not a pre-emptive rebuild.",
      ]),
      stage("architecture", [
        "Today: one backend, MongoDB/Mongoose, domain modules already separated in code even though they share one process and one database.",
        "That existing separation is exactly what makes future extraction possible — the module boundaries were drawn along real domain lines, not arbitrary file splits.",
        "Frontend (React/Vite/Tailwind) already talks to the backend over a versioned REST API, so backend internals can change without the client needing to change in lockstep.",
      ]),
      stage("bottlenecks", [
        "Most likely first: the transaction and analytics read paths, once reporting queries (spending breakdowns, multi-account summaries) start scanning large collections.",
        "A general-purpose document store without the right indexes or aggregation tuning shows that pain before the write path does.",
        "OAuth/session validation on every request becoming a shared hot path if it's not cached appropriately.",
      ]),
      stage("scaling", [
        "Start with measurement, not architecture — profile which endpoint actually degrades first instead of guessing.",
        "Add read replicas and targeted indexes/aggregation pipelines for the analytics module before touching anything else — the cheapest fix that matches the most likely bottleneck.",
        "Only extract a module into its own service once it has a genuinely different scaling profile, team-ownership need, or failure mode from the rest — the same bar used for the monolith-vs-microservices decision generally, not \"users grew, therefore microservices\".",
      ]),
      stage("tradeoffs", [
        "Modular monolith over microservices, to stay maintainable as a solo (or small-team) build — accepting one shared deploy unit in exchange for not having to run and monitor a distributed system prematurely.",
        "MongoDB over a relational store, for the flexible transaction and investment shapes multi-asset tracking (stocks, crypto, commodities, real estate) actually needs — accepting weaker cross-collection joins in exchange for schema flexibility that matches how the data really varies.",
        "Scale the data layer before scaling the org chart — read replicas and indexes are reversible; splitting a team and a service is not, so the reversible move comes first.",
      ]),
    ],
    diagram: {
      ascii: `[ React / Vite Frontend ]
          |
          v
   [ REST API Gateway ]
          |
   -----------------------------
   |       |         |         |
   v       v         v         v
[ Auth ] [Accounts][Transactions][Investments/Analytics]
   |       |         |         |
   -----------------------------
          |
          v
  [ MongoDB / Mongoose ] ---> [ Read Replica for Analytics ]`,
      description:
        "The React frontend talks to a REST API gateway in front of one Node.js/Express backend. That backend is internally split into domain modules — auth, accounts, transactions, investments and analytics — all still sharing one MongoDB database, with a read replica added specifically to absorb analytics query load.",
    },
    challenge: {
      prompt: "Mert chose MongoDB here. Would you challenge that decision?",
      response:
        "Fair challenge — a relational database would give stronger transactional guarantees and joins for free. The reasoning for MongoDB was the shape of the data, not the shape of the transactions: investments alone span stocks, crypto, commodities, and real estate, each with different fields, and forcing that into a rigid relational schema would mean constant migrations as asset types get added. The trade-off is real — weaker cross-collection joins — but it's a deliberate one, made because the variability was in the data model, not in the consistency requirements.",
    },
  },
  {
    id: "paper-reproduction-pipeline",
    title: "Design a paper-reproduction pipeline",
    tagline: "Let agents disagree with the paper before trusting either.",
    stages: [
      stage("requirements", [
        "Take a machine learning research paper (PDF) and turn it into an executable, runnable replication of its experiments.",
        "Compare reproduced results against the paper's published claims, not just \"does the code run\".",
        "Keep every step auditable — what was extracted from the paper, what code was generated, what actually happened when it ran.",
      ]),
      stage("constraints", [
        "Papers describe experiments in prose, tables, and figures — extraction has to handle document parsing and vision-language input, not just plain text.",
        "Generated code has to run safely without arbitrary access to the host machine, since it's LLM-authored and untrusted by default.",
        "The system has to be able to tell the difference between \"the paper's claim doesn't reproduce\" and \"the generated code is just broken\" — those require different fixes.",
      ]),
      stage("architecture", [
        "A Reader Agent extracts methods, datasets, metrics, claims, figures, tables, and hyperparameters from the research PDF using document-parsing and vision-language tooling.",
        "Coder and Runner Agents generate PyTorch/Hugging Face experiment scripts from that extraction and execute them inside Docker, capturing metrics, logs, and error traces.",
        "A Critic and Orchestrator compare reproduced results against the paper's claims and coordinate targeted code revisions through an iterative feedback loop, rather than a single generate-and-hope pass.",
      ]),
      stage("bottlenecks", [
        "Extraction accuracy — a wrong hyperparameter or dataset split read from the paper poisons everything downstream before any code even runs.",
        "The feedback loop itself: without a limit, the Critic/Orchestrator cycle could keep revising code indefinitely on a paper that simply doesn't reproduce.",
        "Compute and time cost of running full experiments across many papers, especially anything that assumed large-scale training in the original paper.",
      ]),
      stage("scaling", [
        "Benchmark across breadth before depth — the plan is a controlled evaluation across roughly 20 image-classification papers, measuring replication success, metric gaps, and refinement-loop ablation, rather than trying to handle every paper category on day one.",
        "Cap the Critic/Orchestrator revision loop with a fixed retry budget, so a non-reproducing paper fails loudly and auditably instead of looping forever.",
        "Sandbox and resource-limit every Runner execution in Docker so one bad paper's experiment can't affect another's, or the host.",
      ]),
      stage("tradeoffs", [
        "Multi-agent separation (Reader / Coder / Runner / Critic-Orchestrator) over one monolithic \"do everything\" agent — more moving parts, but each stage's output is inspectable and each failure is attributable to a specific stage.",
        "Sandboxed Docker execution over running generated code directly, accepting the overhead of containerization because the code being run was written by a model, not reviewed by a human first.",
        "Iterative critique over a single-shot attempt — slower per paper, but the goal is honest replication success measurement, not the appearance of a working demo.",
      ]),
    ],
    diagram: {
      ascii: `[ Research Paper PDF ]
        |
        v
  [ Reader Agent ] --extracts--> methods, datasets, metrics, claims
        |
        v
[ Coder Agent ] --generates--> [ PyTorch / HF experiment script ]
        |
        v
[ Runner Agent ] --executes inside--> [ Docker Sandbox ]
        |
        v
[ Critic + Orchestrator ] --compares vs. paper claims--
        |
        +--> reproduces? --> record success + metric gap
        |
        +--> doesn't? --> revise code --> back to Runner (bounded retries)`,
      description:
        "A research paper PDF is read by a Reader Agent that extracts methods, datasets, metrics and claims. A Coder Agent generates a PyTorch or Hugging Face experiment script, which a Runner Agent executes inside a Docker sandbox. A Critic and Orchestrator then compare the reproduced results against the paper's claims, either recording success and the metric gap, or triggering a bounded number of code revisions back through the Runner.",
    },
    challenge: {
      prompt:
        "You're letting an LLM generate code and then just running it in Docker — how is that actually safe?",
      response:
        "Docker sandboxing bounds the blast radius, it doesn't make the code trustworthy — that's an important distinction. The Runner executes inside a container with no assumed access to anything outside it, so a bad or malicious generation can't reach the host or other papers' runs. What Docker doesn't solve is correctness, which is why the Critic/Orchestrator step exists separately: it's there specifically to catch \"the code ran but the result doesn't match the paper,\" which is a different failure than \"the code shouldn't have been allowed to run at all.\" Sandboxing and correctness-checking are solving two different problems, and ReproBot treats them as two separate stages on purpose.",
    },
  },
  {
    id: "monolith-vs-microservices",
    title: "Monolith versus microservices",
    tagline: "Split on evidence, not on fashion.",
    stages: [
      stage("requirements", [
        "The system needs to keep shipping fast while it's small, and stay maintainable as it grows — those are in tension, and the architecture has to serve both without over-committing early.",
        "Whoever owns the system (solo builder or a small team) needs to be able to reason about the whole write path and deploy confidently.",
        "If and when a part of the system does need to scale or fail independently, the codebase shouldn't fight that split.",
      ]),
      stage("constraints", [
        "Premature service extraction adds real operational cost — network calls where function calls used to be, new failure modes, more things to deploy and monitor.",
        "A monolith with no internal boundaries makes the eventual split expensive and risky when it is actually needed.",
        "Team size and ownership model matter as much as traffic — a service split that makes sense for ten teams can be pure overhead for one.",
      ]),
      stage("architecture", [
        "Default to a modular monolith: one deploy unit, but internal boundaries drawn along real domain lines — Nummoria's auth, accounts, transactions, investments, and analytics modules are exactly this, each owning its own routes, validation, and data access.",
        "Those boundaries are drawn early on purpose, even though everything still runs in one process — the separation is a design decision, not a deployment decision.",
        "APIs are structured around domain ownership rather than HTTP verbs, so a module's internals can change without rippling into a shared layer.",
      ]),
      stage("bottlenecks", [
        "A module whose traffic pattern, latency requirement, or scaling need diverges sharply from the rest of the system.",
        "A team-ownership boundary that starts causing real coordination overhead inside a single shared codebase.",
        "A failure mode that shouldn't be allowed to take down unrelated functionality — e.g. a flaky third-party integration living inside the same process as core transaction writes.",
      ]),
      stage("scaling", [
        "Extract a module into its own service only once one of those bottlenecks is actually observed — a genuinely different scaling profile, ownership need, or failure mode — not on a calendar or because \"the system got bigger\".",
        "Because the module boundary already exists in code, extraction is a deployment change more than a redesign — the domain logic doesn't need to be rewritten to be split out.",
        "Prefer the reversible scaling move first (read replicas, caching, horizontal scaling of the whole monolith) before the harder-to-reverse move (splitting a service and a team around it).",
      ]),
      stage("tradeoffs", [
        "One well-structured codebase over a fleet of services, while nothing has demonstrated a need for the split — trading some future refactor cost for present-day simplicity and shipping speed.",
        "Domain-driven internal modules over a single shared layer, even inside the monolith — a bit more structure up front, so the option to split later stays open instead of foreclosed.",
        "Evidence-driven splitting over pattern-following — accepting that this means occasionally being \"behind\" the trend, in exchange for not paying for complexity that isn't earning its keep yet.",
      ]),
    ],
    diagram: {
      ascii: `Modular Monolith (default)          Extracted Service (only on evidence)
+---------------------------+        +---------------------------+
| [Auth] [Accounts]         |        |     Monolith (remaining    |
| [Transactions]            |  --->  |      modules)               |
| [Investments] [Analytics] |        +---------------------------+
+---------------------------+                    |
   one deploy unit,                              v
   domain-bounded modules              +--------------------+
                                        | Extracted Module    |
                                        | (own deploy, own    |
                                        |  scaling, own team) |
                                        +--------------------+`,
      description:
        "By default the system is a single deployable modular monolith with domain-bounded internal modules like auth, accounts, transactions, investments, and analytics. Only once a specific module shows a genuinely different scaling profile, ownership need, or failure mode does it get pulled out into its own independently deployed and scaled service.",
    },
    challenge: {
      prompt:
        "Isn't waiting for 'evidence' before splitting just a nice way of describing technical debt you'll pay for later?",
      response:
        "Only if the monolith has no internal boundaries — that's the actual debt, not the monolith itself. Because the domain modules are already separated by code ownership, validation, and data access, extracting one later is mostly a deployment and infrastructure change, not a rewrite of business logic. The debt this approach avoids is the opposite kind: over-provisioned microservices with premature network boundaries, shared-nothing databases nobody needed yet, and coordination overhead across services that had no reason to be separate. Waiting for evidence isn't avoiding the decision — it's making the decision reversible until the cost of guessing wrong actually shows up.",
    },
  },
  {
    id: "secure-ai-financial-app",
    title: "Secure an AI-powered financial application",
    tagline: "Fence the model in; don't extend it blanket trust.",
    stages: [
      stage("requirements", [
        "User identity, credentials, and financial data need strong protection at rest and in transit.",
        "Any AI component (insight generation, anomaly detection, recommendations) has to be useful without being able to directly cause an unreviewed side effect.",
        "The system needs to fail safely — an AI mistake should degrade gracefully, never silently corrupt financial state.",
      ]),
      stage("constraints", [
        "Users expect low-friction onboarding, which pulls toward third-party auth providers rather than owning password storage outright.",
        "AI outputs are probabilistic by nature — they can't be treated as ground truth inputs to anything that writes financial state.",
        "Regulatory and trust expectations for financial data are stricter than for a typical consumer app; mistakes are costlier and more visible.",
      ]),
      stage("architecture", [
        "Token-based, provider-flexible auth: JWT for session handling, OAuth (Google/Apple, as in Nummoria) for onboarding through providers users already trust — reducing onboarding friction without owning password-storage risk directly.",
        "Strict CORS policy and environment-based configuration, so secrets and allowed origins are never assumed or hardcoded.",
        "The AI layer sits alongside the core system, reading from it for analysis but never writing directly to financial state — any AI-influenced action passes through the same validation and authorization path a human-triggered action would.",
      ]),
      stage("bottlenecks", [
        "A single compromised token becoming a full account takeover if session handling doesn't rotate or scope tokens tightly.",
        "An AI component that's wrong with confidence — the harder failure mode, since it doesn't look like an error.",
        "Sensitive data (transactions, identity details) leaving the trust boundary just to be fed to a model for analysis.",
      ]),
      stage("scaling", [
        "Keep the model's output bounded and the system's guarantees independent of it — the same instinct behind JobPilot routing anything it's unsure about to manual review rather than letting it guess.",
        "Any AI call that could inform a side-effecting action happens before the side effect, not interleaved with it, so a failed or slow AI call can't corrupt in-progress state.",
        "PII and sensitive financial data stay local/first-party wherever possible, rather than routed through third parties by default — matching the same discipline JobPilot applies to resumes and candidate data.",
      ]),
      stage("tradeoffs", [
        "OAuth-first onboarding over owning password storage, accepting dependency on a third-party identity provider in exchange for meaningfully lower credential-breach risk.",
        "A fenced-off AI role over blanket trust in model output — accepting that some AI-driven convenience gets slowed down by a manual-review or validation step, because a wrong financial action is worse than a slightly slower one.",
        "Auditable logging of AI-influenced decisions over silent automation — a bit more engineering overhead, in exchange for being able to explain, after the fact, why the system did what it did.",
      ]),
    ],
    diagram: {
      ascii: `[ Client ]
    |
    v
[ Auth: JWT + OAuth (Google/Apple) ]
    |
    v
[ Core Financial API ] <---- reads only ---- [ AI Insights Layer ]
    |                                               |
    v                                               v
[ Ledger / Accounts DB ]                  [ Anomaly / Recommendation
    ^                                        output, never a direct
    |                                        write path ]
    | validated + authorized writes only
    +---------------------------------------------+`,
      description:
        "A client authenticates through JWT-backed sessions with OAuth onboarding. The core financial API is the only path that can write to the ledger and accounts database, and every write is validated and authorized. An AI insights layer reads from the core system to generate anomaly detection or recommendations, but has no direct write path — its output can only ever reach the ledger through the same validated, authorized path any other action would use.",
    },
    challenge: {
      prompt:
        "You're relying on JWT plus OAuth — isn't that a pretty standard setup? Why would that be considered a real security answer for a financial app?",
      response:
        "It's standard on purpose — for identity, novelty is a risk, not a feature. The interesting security decision here isn't the auth mechanism, it's what it's protecting: owning as little password-storage liability as possible by delegating identity to providers users already trust, so the app's own attack surface for credential theft shrinks. The part that actually needs custom thinking is what happens after auth — making sure the AI layer never gets a write path that bypasses the same authorization checks a human action would go through. A fancier auth scheme wouldn't fix that; a disciplined boundary around the AI layer would, and does.",
    },
  },
];
