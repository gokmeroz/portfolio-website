import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const relocationIntents: GuideIntent[] = [
  {
    id: "current-location",
    category: "relocation",
    title: "Where he's based",
    patterns: [
      "Where is he based?",
      "Where does he live?",
      "What is his current location?",
    ],
    keywords: ["based", "location", "live", "where"],
    answer: "Istanbul, Turkey.",
    followUpIntentIds: ["relocation-open", "visa-sponsorship", "remote-vs-onsite"],
    priority: 6,
    recruiterRelevant: true,
  },
  {
    id: "relocation-open",
    category: "relocation",
    title: "Open to relocation",
    patterns: [
      "Is he open to relocation?",
      "Would he relocate for a job?",
      "Is he willing to move?",
    ],
    keywords: ["relocation", "relocate", "open", "move", "willing"],
    answer: "Yes — open to relocating and working on-site wherever a role needs him.",
    actions: [{ type: "navigate", target: "contact" }],
    followUpIntentIds: ["visa-sponsorship", "why-move-abroad", "current-location"],
    priority: 7,
    recruiterRelevant: true,
  },
  {
    id: "visa-sponsorship",
    category: "relocation",
    title: "Visa sponsorship",
    patterns: [
      "Does he need visa sponsorship?",
      "Does he require sponsorship?",
      "Is he a Turkish citizen?",
    ],
    keywords: ["visa", "sponsorship", "citizen", "authorization", "permit"],
    answer:
      "Yes — he's a Turkish citizen and would require employer-sponsored work authorization for roles outside Turkey.",
    actions: [{ type: "navigate", target: "contact" }],
    followUpIntentIds: ["relocation-open", "current-target-roles", "availability"],
    priority: 8,
    recruiterRelevant: true,
  },
  {
    id: "remote-vs-onsite",
    category: "relocation",
    title: "Remote or on-site preference",
    patterns: [
      "Does he prefer remote or on-site work?",
      "Is he open to on-site roles?",
    ],
    keywords: ["remote", "onsite", "on-site", "office"],
    answer:
      "Open to on-site roles anywhere the position needs him — office work early on tends to accelerate learning, with flexibility mattering more once that foundation is built.",
    followUpIntentIds: ["relocation-open", "why-move-abroad", "current-target-roles"],
    priority: 4,
  },
  {
    id: "availability",
    category: "relocation",
    title: "Availability / start date",
    patterns: [
      "When can he start?",
      "What is his availability?",
      "Does he have a notice period?",
    ],
    keywords: ["available", "availability", "start", "date", "notice"],
    answer:
      "Currently open to suitable opportunities. Exact timing depends on location and immigration process, so the fastest answer is a direct email.",
    actions: [{ type: "open-contact" }],
    followUpIntentIds: ["visa-sponsorship", "how-to-contact", "current-target-roles"],
    priority: 5,
    recruiterRelevant: true,
  },
];
