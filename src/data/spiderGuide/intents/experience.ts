import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const experienceIntents: GuideIntent[] = [
  {
    id: "halkbank-overview",
    category: "experience",
    topic: "halkbank",
    title: "Halkbank internship",
    patterns: [
      "What did Mert build at Halkbank?",
      "Tell me about his Halkbank internship.",
      "What did he do at Halkbank?",
      "Has he worked in a bank?",
      "Has he worked in fintech or banking?",
    ],
    keywords: ["halkbank", "bank", "banking", "fintech", "internship"],
    answer:
      "Full-Stack Software Engineering Intern at Halkbank — one of Turkey's largest state-owned banks — from April to July 2025. He contributed to a Personnel Absence System serving 10,000+ employees, implementing attendance-tracking logic in C#/.NET Core across 75+ relational tables (holidays, medical leave, approval workflows).",
    actions: [
      { type: "open-experience", experienceId: "halkbank" },
    ],
    followUpIntentIds: ["halkbank-tech-stack", "production-systems-impact", "team-collaboration-experience"],
    priority: 8,
    recruiterRelevant: true,
  },
  {
    id: "halkbank-tech-stack",
    category: "experience",
    topic: "halkbank",
    title: "Halkbank tech stack and scope",
    patterns: [
      "What technology did he use at Halkbank?",
      "What was the Halkbank tech stack?",
      "Did Halkbank involve real-time reporting?",
      "What did he build with Angular at Halkbank?",
    ],
    keywords: ["halkbank", "angular", "aspnet", "reporting", "tech", "stack"],
    answer:
      "C#/.NET Core on the backend for the Personnel Absence System, and a full-stack Angular + ASP.NET Core solution for real-time reporting and high-volume data processing across 800+ branch-level operations nationwide. He worked in an enterprise Agile/Scrum environment — sprint planning, code reviews, and production deployments.",
    followUpIntentIds: ["halkbank-overview", "backend-experience-summary", "production-systems-impact"],
    priority: 6,
  },
  {
    id: "production-systems-impact",
    category: "experience",
    title: "Has he worked on real production systems that affect users",
    patterns: [
      "Has he worked on real production systems?",
      "Did his work affect real users?",
      "Does he have production experience?",
      "Has he shipped software that people actually use?",
    ],
    keywords: ["production", "real", "users", "shipped", "scale"],
    answer:
      "Yes. The Personnel Absence System at Halkbank served 10,000+ employees across 800+ branch-level operations, and Nummoria is a live production app he designed and shipped solo at nummoria.com. Both are real systems handling real data, not demos.",
    actions: [{ type: "open-experience", experienceId: "halkbank" }],
    followUpIntentIds: ["halkbank-overview", "strongest-backend-project", "evidence-ships-software"],
    priority: 9,
    recruiterRelevant: true,
  },
  {
    id: "eyehub-overview",
    category: "experience",
    topic: "eyehub",
    title: "Eyehub / TÜBİTAK project",
    patterns: [
      "What did he do in the TÜBİTAK project?",
      "Tell me about Eyehub.",
      "What was his role at Eyehub?",
      "Has he worked on a research project?",
    ],
    keywords: ["eyehub", "tubitak", "research", "project"],
    answer:
      "Backend Engineer on Eyehub, a TÜBİTAK-funded government research project (122E085), from November 2023 to June 2024. He designed and deployed scalable backend infrastructure on AWS (EC2, Lambda) for a dyslexia-detection mobile app, supporting concurrent research data ingestion.",
    actions: [{ type: "open-experience", experienceId: "eyehub" }],
    followUpIntentIds: ["eyehub-tech-stack", "eyehub-collaboration", "backend-experience-summary"],
    priority: 7,
    recruiterRelevant: true,
  },
  {
    id: "eyehub-tech-stack",
    category: "experience",
    topic: "eyehub",
    title: "Eyehub tech stack",
    patterns: [
      "What technology did he use at Eyehub?",
      "Did he use MongoDB at Eyehub?",
      "What APIs did he build for Eyehub?",
    ],
    keywords: ["eyehub", "mongodb", "aws", "lambda", "nodejs", "api"],
    answer:
      "MongoDB for modeling complex medical datasets under strict data-integrity standards for academic analysis and IRB compliance, and secure, high-performance RESTful APIs in Node.js powering mobile client sync, authentication, and real-time data submission — deployed on AWS EC2 and Lambda.",
    followUpIntentIds: ["eyehub-overview", "backend-experience-summary", "eyehub-collaboration"],
    priority: 5,
  },
  {
    id: "eyehub-collaboration",
    category: "experience",
    topic: "eyehub",
    title: "Eyehub research collaboration",
    patterns: [
      "Did he work with researchers?",
      "Who did he collaborate with at Eyehub?",
      "Has he worked in an academic environment?",
    ],
    keywords: ["researchers", "collaborate", "academic", "professor"],
    answer:
      "He collaborated directly with university researchers under Prof. Gunet Eroglu, translating clinical requirements into production-grade backend systems on tight academic milestones.",
    followUpIntentIds: ["eyehub-overview", "team-collaboration-experience", "reprobot-overview"],
    priority: 3,
  },
  {
    id: "compro-overview",
    category: "experience",
    topic: "compro",
    title: "ComPro internship",
    patterns: [
      "What did he do at ComPro?",
      "Tell me about his ComPro internship.",
      "Has he worked with cloud migration?",
      "Has he used Docker professionally?",
    ],
    keywords: ["compro", "cloud", "migration", "docker", "ibm"],
    answer:
      "Software Engineering Intern at ComPro — Turkey's leading IBM Platinum Partner — from August to September 2023. He contributed to enterprise cloud migration projects, gaining production-level experience with Docker containerization, CI/CD pipelines, and Linux system administration.",
    actions: [{ type: "open-experience", experienceId: "compro" }],
    followUpIntentIds: ["compro-cloud-evaluation", "backend-experience-summary", "career-summary"],
    priority: 6,
  },
  {
    id: "compro-cloud-evaluation",
    category: "experience",
    topic: "compro",
    title: "ComPro cloud evaluation work",
    patterns: [
      "Did he compare AWS and IBM Cloud?",
      "What cloud work did he do at ComPro?",
      "Did he build proof-of-concept environments?",
    ],
    keywords: ["ibm", "cloud", "aws", "evaluation", "compare", "poc"],
    answer:
      "He built proof-of-concept Docker environments for legacy backend modernization to speed up iteration for internal dev teams and client demos, and conducted a technical evaluation of IBM Cloud vs. AWS for containerized workloads — comparing cost and performance across compute, storage, and orchestration to inform client migration strategy.",
    followUpIntentIds: ["compro-overview", "backend-experience-summary"],
    priority: 3,
  },
  {
    id: "team-collaboration-experience",
    category: "experience",
    title: "Team and engineering collaboration experience",
    patterns: [
      "Has he worked in engineering teams?",
      "Has he worked in an Agile team?",
      "Does he have team experience?",
    ],
    keywords: ["team", "agile", "scrum", "collaboration", "engineering"],
    answer:
      "Yes — at Halkbank he delivered features end to end in an enterprise Agile/Scrum environment: sprint planning, code reviews, and production deployments. At Eyehub he worked directly with university researchers translating requirements into backend systems.",
    followUpIntentIds: ["halkbank-overview", "eyehub-collaboration", "teammate-type"],
    priority: 5,
  },
  {
    id: "backend-experience-summary",
    category: "experience",
    topic: "backend",
    title: "Overall professional backend experience",
    patterns: [
      "What professional backend experience does he have?",
      "Summarize his backend experience.",
      "Has he built real APIs and databases professionally?",
    ],
    keywords: ["professional", "backend", "experience", "summary"],
    answer:
      "C#/.NET Core and Angular at Halkbank on a system serving 10,000+ employees; Node.js and MongoDB at Eyehub building secure APIs for medical research data; Docker and cloud infrastructure at ComPro. Add Nummoria's Node.js/Express/MongoDB backend on top of that, and it spans relational and NoSQL data modeling, authentication, and production deployment.",
    actions: [{ type: "navigate", target: "about" }],
    followUpIntentIds: ["strongest-backend-project", "backend-tech-stack", "production-systems-impact"],
    priority: 8,
    recruiterRelevant: true,
  },
];
