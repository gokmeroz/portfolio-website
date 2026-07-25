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
    followUpIntentIds: [
      "why-spider-man-matters",
      "favorite-spiderman-actor",
      "marvel-vs-dc",
      "personality-summary",
      "hobbies-outside-coding",
    ],
    priority: 3,
  },
  {
    id: "why-spider-man-matters",
    category: "personality",
    title: "Why Spider-Man matters to him personally",
    patterns: [
      "Why is Spider-Man so important to him?",
      "What does Spider-Man mean to him personally?",
      "Why does Spider-Man matter to him so much?",
    ],
    keywords: ["spider-man", "important", "matter", "personally", "means"],
    answer:
      "Deeper than which hero is coolest: whenever he feels alone, behind, or not enough, Peter Parker is proof that someone can carry all of that and still become the person who shows up and saves the day.",
    followUpIntentIds: ["why-spider-man", "favorite-spiderman-actor", "personality-summary"],
    priority: 4,
  },
  {
    id: "favorite-spiderman-actor",
    category: "personality",
    title: "Favorite Spider-Man actor",
    patterns: [
      "Who's his favorite Spider-Man actor?",
      "Tobey Maguire or Andrew Garfield?",
      "Which Spider-Man movies are his favorite?",
    ],
    keywords: ["garfield", "tobey", "maguire", "actor", "amazing"],
    answer:
      "Andrew Garfield, and he won't debate it — The Amazing Spider-Man's Peter is the version that hit hardest for him, no contest.",
    followUpIntentIds: ["why-spider-man", "why-spider-man-matters", "marvel-vs-dc"],
    priority: 2,
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
    id: "coffee-preference",
    category: "personality",
    title: "Coffee habits",
    patterns: [
      "Does he drink coffee?",
      "What's his coffee order?",
      "Coffee or tea?",
    ],
    keywords: ["coffee", "americano", "iced", "tea", "drink"],
    answer:
      "Coffee, non-negotiably — iced Americano, year-round, regardless of the weather.",
    followUpIntentIds: ["hobbies-outside-coding", "personality-summary"],
    priority: 2,
  },
  {
    id: "music-taste",
    category: "personality",
    title: "Music taste",
    patterns: [
      "What music does he like?",
      "What's his music taste?",
      "Does he have a favorite genre?",
    ],
    keywords: ["music", "genre", "songs", "listen"],
    answer: "Genre-agnostic — he can listen to pretty much anything depending on mood.",
    followUpIntentIds: ["hobbies-outside-coding", "personality-summary"],
    priority: 1,
  },
  {
    id: "countries-visited",
    category: "personality",
    title: "Countries he's visited",
    patterns: [
      "What countries has he visited?",
      "Has he traveled abroad?",
      "Where has he traveled?",
    ],
    keywords: ["countries", "traveled", "travel", "visited", "abroad"],
    answer:
      "So far: Turkey, Germany, the Netherlands, Bulgaria, Italy, and the USA — Europe as the near-term map for working abroad, the US (New York included) as the long-term one.",
    followUpIntentIds: ["why-new-york", "why-move-abroad", "hobbies-outside-coding"],
    priority: 3,
    recruiterRelevant: true,
  },
  {
    id: "favorite-comic-books",
    category: "personality",
    title: "Favorite comic books",
    patterns: [
      "What are his favorite comic books?",
      "Does he read comics?",
      "What comics does he like?",
    ],
    keywords: ["comic", "comics", "books", "read"],
    answer:
      "That's one he'd rather talk through in person than list here — ask him directly and he'll happily go deep on it.",
    followUpIntentIds: ["why-spider-man", "fictional-worlds", "how-to-contact"],
    priority: 2,
  },
  {
    id: "favorite-food",
    category: "personality",
    title: "Favorite food",
    patterns: [
      "What's his favorite food?",
      "Does he have a favorite dish?",
      "What food does he like?",
    ],
    keywords: ["food", "dish", "eat", "cuisine", "kars", "goose"],
    answer:
      "The classic goose dish (kaz) from his hometown, Kars — and really any Caucasian/Kars-region cooking. That's what he'll always pick first.",
    followUpIntentIds: ["hobbies-outside-coding", "personality-summary"],
    priority: 2,
  },
  {
    id: "birthday",
    category: "personality",
    title: "His birthday",
    patterns: [
      "When is his birthday?",
      "What is his date of birth?",
      "How old is he?",
    ],
    keywords: ["birthday", "born", "birth", "age"],
    answer: "December 19, 2001.",
    followUpIntentIds: ["personality-summary", "hobbies-outside-coding"],
    priority: 1,
  },
  {
    id: "personal-life-privacy",
    category: "personality",
    title: "Family / personal life boundary",
    patterns: [
      "Is he married?",
      "Does he have siblings?",
      "What's his family like?",
      "Tell me about his personal life",
    ],
    keywords: [
      "family",
      "siblings",
      "married",
      "marriage",
      "kids",
      "children",
      "parents",
      "wife",
      "girlfriend",
      "personal life",
    ],
    answer:
      "That side of his life stays off the record — this guide sticks to his work, projects, goals, and the parts of his personality he's happy to share publicly.",
    followUpIntentIds: ["personality-summary", "hobbies-outside-coding"],
    priority: 3,
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
    followUpIntentIds: [
      "finance-interest",
      "why-new-york",
      "fictional-worlds",
      "coffee-preference",
      "favorite-food",
      "countries-visited",
    ],
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
