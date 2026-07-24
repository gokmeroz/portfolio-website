import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const goalsIntents: GuideIntent[] = [
  {
    id: "why-new-york",
    category: "goals",
    title: "Why New York",
    patterns: [
      "What is his relationship with New York?",
      "Why does he want to live in New York?",
      "Is New York his dream city?",
    ],
    keywords: ["new", "york", "nyc", "dream", "city"],
    answer:
      "New York is his long-term north star — density, ambition, technology, culture, and the feeling that something important is always being built nearby. The Upper West Side is the calmer, endgame version of that dream.",
    followUpIntentIds: ["why-move-abroad", "endgame-life-vision", "relocation-open"],
    priority: 3,
  },
  {
    id: "why-move-abroad",
    category: "goals",
    title: "Why he wants to work abroad",
    patterns: [
      "Why does he want to move abroad?",
      "Why does he want to work internationally?",
      "Why relocate?",
    ],
    keywords: ["move", "abroad", "relocate", "international", "why"],
    answer:
      "To compete in stronger engineering markets, learn from higher-scale teams, and build an international life rather than stay inside the limits of one local ecosystem. Europe — Germany, the Netherlands, Ireland, the UK — is the practical next map; New York remains the long-term destination.",
    actions: [{ type: "navigate", target: "contact" }],
    followUpIntentIds: ["relocation-open", "visa-sponsorship", "why-new-york"],
    priority: 5,
    recruiterRelevant: true,
  },
  {
    id: "endgame-life-vision",
    category: "goals",
    title: "His ideal life / endgame",
    patterns: [
      "What is his ideal life?",
      "What is his endgame?",
      "What kind of life does he want?",
    ],
    keywords: ["ideal", "life", "endgame", "future"],
    answer:
      "Freedom with substance: meaningful technical work, financial independence, an international life, strong health, a family he can be present for, and enough ownership to build rather than just execute someone else's roadmap forever.",
    followUpIntentIds: ["success-definition", "long-term-goal", "why-new-york"],
    priority: 3,
  },
];
