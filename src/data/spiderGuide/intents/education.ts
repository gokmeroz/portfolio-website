import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const educationIntents: GuideIntent[] = [
  {
    id: "degree-info",
    category: "education",
    title: "Degree and university",
    patterns: [
      "What did he study?",
      "What is his degree?",
      "Where did he go to university?",
      "What is his educational background?",
    ],
    keywords: ["degree", "study", "university", "education", "college", "bachelor"],
    answer:
      "B.Sc. in Computer Engineering from Bahçeşehir University in Istanbul, October 2021 to August 2025.",
    actions: [{ type: "navigate", target: "about" }],
    followUpIntentIds: ["when-graduated", "certifications-summary", "career-summary"],
    priority: 6,
  },
  {
    id: "when-graduated",
    category: "education",
    title: "Graduation date",
    patterns: [
      "When did he graduate?",
      "Is he a recent graduate?",
      "When did he finish university?",
    ],
    keywords: ["graduate", "graduated", "recent", "finish"],
    answer:
      "He graduated in August 2025 — a recent Computer Engineering graduate with 1.5+ years of hands-on experience already built up through internships and Nummoria alongside his degree.",
    followUpIntentIds: ["degree-info", "career-summary", "current-target-roles"],
    priority: 4,
  },
  {
    id: "certifications-summary",
    category: "education",
    title: "Certifications",
    patterns: [
      "What certifications does he have?",
      "Has he done any online courses?",
      "What certificates has he earned?",
    ],
    keywords: ["certifications", "certificates", "courses", "certification"],
    answer:
      "Certificates covering backend development, SQL, secure software requirements, and ASP.NET Core, from providers including Meta, the University of Michigan, the University of Colorado, and Udemy — most centered on backend fundamentals and database work.",
    actions: [{ type: "navigate", target: "certificates" }],
    followUpIntentIds: ["degree-info", "backend-experience-summary", "skills-summary"],
    priority: 4,
  },
];
