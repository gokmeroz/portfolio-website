import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const recruiterIntents: GuideIntent[] = [
  {
    id: "why-interview-him",
    category: "recruiter",
    title: "Why interview him",
    patterns: [
      "Why should we interview Mert?",
      "Why should you hire him?",
      "Make a case for hiring him.",
      "Convince me to interview him.",
    ],
    keywords: ["why", "interview", "hire", "convince", "case"],
    answer:
      "He's already behaving beyond the usual junior profile: shipped software used by 10,000+ employees at Halkbank, designed and shipped a production fintech product solo (Nummoria), worked across banking and academic research environments, and treats AI as an engineering tool rather than a buzzword.",
    actions: [{ type: "open-contact" }],
    followUpIntentIds: ["strongest-qualifications", "evidence-ships-software", "which-roles-suit-him"],
    priority: 10,
    recruiterRelevant: true,
  },
  {
    id: "which-roles-suit-him",
    category: "recruiter",
    title: "Which roles suit him best",
    patterns: [
      "Which roles suit him best?",
      "What role would fit him?",
      "What position should we offer him?",
    ],
    keywords: ["roles", "suit", "fit", "position", "best"],
    answer:
      "A junior or new-grad backend or full-stack role with real ownership, strong engineers to learn from, and exposure to AI-enabled products — fintech and backend-heavy product teams play to his strengths most directly.",
    followUpIntentIds: ["current-target-roles", "strongest-qualifications", "why-interview-him"],
    priority: 7,
    recruiterRelevant: true,
  },
  {
    id: "strongest-qualifications",
    category: "recruiter",
    title: "Strongest qualifications",
    patterns: [
      "What are his strongest qualifications?",
      "What is his strongest evidence for hiring?",
      "What are his top skills for a recruiter?",
    ],
    keywords: ["strongest", "qualifications", "evidence", "top"],
    answer:
      "Production backend experience at 10,000+-employee scale (Halkbank), a solo-shipped end-to-end product (Nummoria), and a genuine, current AI/ML research contribution (ReproBot) — depth, ownership, and forward direction all backed by real work.",
    followUpIntentIds: ["evidence-ships-software", "production-systems-impact", "leadership-ownership-evidence"],
    priority: 8,
    recruiterRelevant: true,
  },
  {
    id: "evidence-ships-software",
    category: "recruiter",
    title: "Evidence he can ship software",
    patterns: [
      "What evidence shows he can ship software?",
      "Has he actually shipped things?",
      "Can he deliver production code?",
    ],
    keywords: ["evidence", "ship", "shipped", "deliver", "production"],
    answer:
      "Nummoria is live at nummoria.com, built and deployed solo. The Personnel Absence System at Halkbank is in production serving 10,000+ employees. JobPilot is open-sourced and functional on GitHub. All three are real, running systems, not portfolio demos.",
    actions: [{ type: "navigate", target: "projects" }],
    followUpIntentIds: ["strongest-backend-project", "production-systems-impact", "jobpilot-status"],
    priority: 9,
    recruiterRelevant: true,
  },
  {
    id: "leadership-ownership-evidence",
    category: "recruiter",
    title: "Leadership and product-ownership evidence",
    patterns: [
      "Does he have leadership experience?",
      "Does he have product ownership experience?",
      "Has he owned a product end to end?",
    ],
    keywords: ["leadership", "ownership", "product", "lead"],
    answer:
      "Nummoria is the clearest evidence — he owned it from architecture through deployment, alone, including the product decisions about what to build and why. He also treats code review and mistakes as process feedback, not just individual fixes, which is a product-owner instinct more than a pure IC one.",
    followUpIntentIds: ["nummoria-role", "what-hes-building-toward", "mistakes-and-code-review"],
    priority: 6,
    recruiterRelevant: true,
  },
  {
    id: "current-development-areas",
    category: "recruiter",
    title: "Current development areas",
    patterns: [
      "What are his current development areas?",
      "What is he still working on improving professionally?",
    ],
    keywords: ["development", "areas", "improving", "growth"],
    answer:
      "Deepening distributed-systems and production AI/ML experience — he's strong on backend fundamentals and shipping, and is now building the evaluation, MLOps, and large-scale-systems muscle to match. ReproBot and his ongoing ML learning track are the current evidence of that.",
    followUpIntentIds: ["ai-ml-direction", "reprobot-overview", "biggest-weakness"],
    priority: 5,
    recruiterRelevant: true,
  },
  {
    id: "interview-question-suggestions",
    category: "recruiter",
    title: "What to ask him in an interview",
    patterns: [
      "What should I ask him during an interview?",
      "What interview questions would reveal the most about him?",
    ],
    keywords: ["interview", "questions", "ask"],
    answer:
      "Ask him to walk through a tradeoff he made on Nummoria or JobPilot and why — his answers tend to reveal the reasoning, not just the tech choice. Also worth asking what he'd change about Nummoria's architecture now; he has a clear answer.",
    followUpIntentIds: ["nummoria-tradeoffs", "engineering-tradeoffs-made", "nummoria-lessons"],
    priority: 4,
    recruiterRelevant: true,
  },
  {
    id: "salary-compensation",
    category: "recruiter",
    title: "Salary / compensation expectations",
    patterns: [
      "What are his salary expectations?",
      "How much does he cost?",
      "What is his expected compensation?",
    ],
    keywords: ["salary", "compensation", "pay", "rate", "cost"],
    answer:
      "Compensation depends on role scope, location, level, and relocation requirements — that conversation belongs in a real process, not a guide dialogue box. Reach out directly and he'll talk it through.",
    actions: [{ type: "open-contact" }],
    followUpIntentIds: ["how-to-contact", "current-target-roles", "availability"],
    priority: 4,
    recruiterRelevant: true,
  },
];
