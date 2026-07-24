import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const personalityIntents: GuideIntent[] = [
  {
    id: "why-spider-man",
    category: "personality",
    title: "Why he likes Spider-Man",
    patterns: [
      "Why does he like Spider-Man?",
      "Is Spider-Man his favorite superhero?",
      "Why Spider-Man?",
    ],
    keywords: ["spider-man", "spiderman", "superhero", "marvel"],
    answer:
      "Spider-Man is his favorite — not because he's the strongest hero, but because he's smart, flawed, responsible, and keeps moving while ordinary life keeps hitting him. That combination is very Mert-coded, and it's a big part of why this site's guide looks the way it does.",
    followUpIntentIds: ["marvel-vs-dc", "personality-summary", "hobbies-outside-coding"],
    priority: 3,
  },
  {
    id: "marvel-vs-dc",
    category: "personality",
    title: "Marvel or DC",
    patterns: [
      "Marvel or DC?",
      "Does he prefer Batman or Spider-Man?",
    ],
    keywords: ["marvel", "dc", "batman"],
    answer:
      "Marvel, mainly because of Spider-Man. Batman gets respect for preparation and discipline, but Spidey wins on relatability, humor, science, and carrying responsibility without becoming emotionally bulletproof.",
    followUpIntentIds: ["why-spider-man", "hobbies-outside-coding"],
    priority: 2,
  },
  {
    id: "football-fenerbahce",
    category: "personality",
    title: "Football / Fenerbahçe",
    patterns: [
      "Does he follow football?",
      "Which football team does he support?",
      "Is he a Fenerbahçe fan?",
    ],
    keywords: ["football", "soccer", "fenerbahce", "team"],
    answer:
      "Fenerbahçe — \"fan\" is technically accurate but emotionally incomplete. He follows football religiously.",
    followUpIntentIds: ["combat-sports", "hobbies-outside-coding", "personality-summary"],
    priority: 2,
  },
  {
    id: "combat-sports",
    category: "personality",
    title: "MMA / boxing / BJJ",
    patterns: [
      "Does he do MMA?",
      "Is he into boxing or BJJ?",
      "Does he follow combat sports?",
    ],
    keywords: ["mma", "boxing", "bjj", "combat", "sports", "fight"],
    answer:
      "He follows MMA and is interested in boxing and BJJ — he likes the part where technique, pressure, discipline, and honest feedback all meet. There's nowhere to hide behind theory once the round starts.",
    followUpIntentIds: ["gym-fitness", "football-fenerbahce", "personality-summary"],
    priority: 2,
  },
  {
    id: "gym-fitness",
    category: "personality",
    title: "Gym and fitness",
    patterns: [
      "Does he go to the gym?",
      "Is he into fitness?",
      "Does he train regularly?",
    ],
    keywords: ["gym", "fitness", "training", "workout"],
    answer:
      "Regularly — it's both a physical goal and a mental reset. He wants to be leaner, stronger, and more disciplined, but the deeper value is proving that consistency can beat mood.",
    followUpIntentIds: ["combat-sports", "hobbies-outside-coding", "energizing-vs-draining-work"],
    priority: 2,
  },
  {
    id: "hobbies-outside-coding",
    category: "personality",
    title: "What he does outside coding",
    patterns: [
      "What does he do outside of coding?",
      "What are his hobbies?",
      "What does he do in his free time?",
    ],
    keywords: ["hobbies", "hobby", "free", "time", "outside", "coding"],
    answer:
      "Fenerbahçe, MMA, the gym, Spider-Man, Harry Potter, New York, and personal finance. He also follows crypto and U.S. stock markets partly out of curiosity about the psychology behind trading, not to gamble on charts.",
    followUpIntentIds: ["finance-interest", "why-new-york", "fictional-worlds"],
    priority: 4,
  },
  {
    id: "fictional-worlds",
    category: "personality",
    title: "Favorite fictional worlds",
    patterns: [
      "What fictional worlds does he like?",
      "Does he like Harry Potter?",
    ],
    keywords: ["harry", "potter", "fiction", "fictional", "worlds"],
    answer:
      "Spider-Man and Harry Potter — stories where identity, responsibility, friendship, and becoming capable matter more than looking invincible.",
    followUpIntentIds: ["why-spider-man", "hobbies-outside-coding"],
    priority: 2,
  },
  {
    id: "finance-interest",
    category: "personality",
    title: "Interest in personal finance and investing",
    patterns: [
      "Is he interested in finance?",
      "Does he invest?",
      "Does he trade crypto or stocks?",
    ],
    keywords: ["finance", "investing", "stocks", "crypto", "invest"],
    answer:
      "He follows personal finance, U.S. markets, and crypto because money is another system to understand, not because every chart is an invitation to gamble. It's also the reason Nummoria exists — he built it to visualize his own income, expenses, and investments.",
    actions: [{ type: "open-project", projectId: "nummoria" }],
    followUpIntentIds: ["nummoria-problem", "hobbies-outside-coding", "why-move-abroad"],
    priority: 3,
  },
  {
    id: "personality-summary",
    category: "personality",
    title: "What he's like",
    patterns: [
      "What is he like as a person?",
      "How would you describe his personality?",
      "Is he introverted or extroverted?",
    ],
    keywords: ["personality", "like", "introvert", "extrovert", "character"],
    answer:
      "Focused, direct, ambitious, occasionally stubborn, and more playful once he's comfortable. He enjoys people, but serious building still requires long stretches of solo concentration — analytical first, emotional underneath.",
    followUpIntentIds: ["values", "teammate-type", "feedback-style"],
    priority: 3,
  },
];
