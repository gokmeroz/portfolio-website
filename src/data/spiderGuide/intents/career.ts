import type { GuideIntent } from "../../../lib/spiderGuide/types";

export const careerIntents: GuideIntent[] = [
  {
    id: "how-he-thinks",
    category: "career",
    title: "How he thinks",
    patterns: [
      "How does he think?",
      "How does he approach problems?",
      "What is his thinking style?",
      "How does he make decisions?",
      "How does he handle difficult problems?",
    ],
    keywords: ["think", "thinking", "approach", "problems", "decisions", "mindset"],
    answer:
      "He starts with the real problem, not the fashionable solution. He reduces ambiguity, challenges assumptions, compares tradeoffs, then builds the smallest version that proves the idea. He can overthink, but his best work happens when he turns that intensity into a concrete system and ships it.",
    followUpIntentIds: ["speed-vs-perfection", "simple-vs-clever", "learning-style"],
    priority: 6,
  },
  {
    id: "speed-vs-perfection",
    category: "career",
    title: "Speed vs. perfection",
    patterns: [
      "Does he prefer speed or perfection?",
      "Is he a perfectionist?",
      "Does he ship fast or polish forever?",
      "How does he balance shipping and quality?",
    ],
    keywords: ["speed", "perfection", "perfectionist", "ship", "polish", "overthink"],
    answer:
      "His natural bias is toward high standards — sometimes too high. He's learning to separate reversible decisions from expensive ones: ship the reversible choices quickly, slow down for architecture, security, and data decisions that are painful to undo.",
    followUpIntentIds: ["how-he-thinks", "biggest-weakness", "simple-vs-clever"],
    priority: 5,
  },
  {
    id: "simple-vs-clever",
    category: "career",
    topic: "system-design",
    title: "Simple systems vs. clever systems",
    patterns: [
      "Does he prefer simple or clever systems?",
      "How does he think about architecture tradeoffs?",
      "Monolith or microservices?",
      "Does he like clean code?",
    ],
    keywords: ["simple", "clever", "architecture", "monolith", "microservices", "clean", "tradeoff"],
    answer:
      "Simple until complexity earns its place. He prefers a well-structured monolith over premature microservices, explicit code over clever tricks, and architecture that matches the actual traffic, team, and failure modes — not a diagram designed to look impressive.",
    followUpIntentIds: ["how-scale-nummoria", "monolith-vs-microservices-decision", "how-he-thinks"],
    priority: 6,
  },
  {
    id: "teammate-type",
    category: "career",
    title: "What kind of teammate he is",
    patterns: [
      "What kind of teammate is he?",
      "Does he work well in a team?",
      "Can he work alone?",
      "How does he collaborate?",
    ],
    keywords: ["teammate", "team", "collaborate", "alone", "ownership"],
    answer:
      "Independent enough to own a problem end to end, but he doesn't want to build in a vacuum. He works best with direct teammates who challenge ideas, communicate clearly, and care about the result more than protecting their ego.",
    followUpIntentIds: ["feedback-style", "team-collaboration-experience", "values"],
    priority: 5,
  },
  {
    id: "feedback-style",
    category: "career",
    title: "Feedback and management style he responds to",
    patterns: [
      "How does he handle feedback?",
      "What management style works for him?",
      "What environment does he perform best in?",
      "How does he take criticism?",
    ],
    keywords: ["feedback", "criticism", "management", "environment", "perform"],
    answer:
      "Direct, specific feedback works best — he'd rather hear \"this design breaks under X\" than vague praise. The ideal environment gives him ownership, high standards, technical mentorship, and enough trust to propose a better path when he sees one.",
    followUpIntentIds: ["teammate-type", "mistakes-and-code-review", "values"],
    priority: 5,
  },
  {
    id: "learning-style",
    category: "career",
    title: "How he learns and debugs",
    patterns: [
      "How does he learn new technology?",
      "How does he debug?",
      "What is his debugging approach?",
      "How does he learn things he doesn't know?",
    ],
    keywords: ["learn", "learning", "debug", "debugging", "technology"],
    answer:
      "He learns by building: get the mental model, create a small working version, break it, read the failure, rebuild it properly. When debugging, he prefers narrowing the system with evidence over randomly changing code until the error disappears.",
    followUpIntentIds: ["how-he-thinks", "ai-tool-usage", "biggest-strength"],
    priority: 5,
  },
  {
    id: "engineer-vs-product-builder",
    category: "career",
    title: "Engineer or product builder",
    patterns: [
      "Is he an engineer or a product builder?",
      "Does he want to stay hands-on with code?",
      "Is he becoming an architect?",
      "What kind of engineer is he becoming?",
    ],
    keywords: ["engineer", "product", "builder", "architect", "hands-on"],
    answer:
      "He's becoming a Technical Product Architect: still hands-on with code, but able to connect architecture, product strategy, user value, and business outcomes. In plain terms: not just \"build this ticket,\" but \"why are we building it, how should it work, and can it scale?\"",
    followUpIntentIds: ["long-term-goal", "what-hes-building-toward", "current-target-roles"],
    priority: 6,
  },
  {
    id: "motivation-ambition",
    category: "career",
    title: "What motivates him",
    patterns: [
      "What motivates him?",
      "What drives him?",
      "Is he ambitious?",
      "What keeps him going?",
    ],
    keywords: ["motivates", "motivation", "drives", "ambitious", "ambition"],
    answer:
      "The gap between where he is and what he believes he can become. The goal isn't just a comfortable developer job — it's becoming internationally competitive, building serious products, and creating a life with freedom, impact, and options.",
    followUpIntentIds: ["long-term-goal", "endgame-life-vision", "why-move-abroad"],
    priority: 5,
  },
  {
    id: "failure-response",
    category: "career",
    title: "How he handles failure",
    patterns: [
      "How does he handle failure?",
      "What happens when things fail?",
      "How does he handle pressure?",
      "How does he handle losing?",
    ],
    keywords: ["failure", "fail", "losing", "setback", "pressure"],
    answer:
      "He takes losses personally for a moment, then converts them into data — inspect what failed, tighten the system, go again. The bigger risk for him isn't failure; it's losing momentum through inconsistency or overthinking.",
    followUpIntentIds: ["biggest-weakness", "final-boss", "biggest-fear"],
    priority: 4,
  },
  {
    id: "biggest-weakness",
    category: "career",
    title: "Biggest weakness",
    patterns: [
      "What is his biggest weakness?",
      "What does he need to improve?",
      "What is he working on improving?",
      "What is missing from his profile?",
    ],
    keywords: ["weakness", "improve", "missing", "development", "area"],
    answer:
      "Trying to upgrade too many parts of his life at once, which can turn ambition into scattered execution. His next level comes from ruthless prioritization, deeper focus, and finishing fewer things at a much higher standard.",
    followUpIntentIds: ["biggest-strength", "current-development-areas", "final-boss"],
    priority: 6,
    recruiterRelevant: true,
  },
  {
    id: "biggest-strength",
    category: "career",
    title: "Biggest strength",
    patterns: [
      "What is his biggest strength?",
      "What is his best quality?",
      "What is he really good at as a person?",
    ],
    keywords: ["strength", "best", "quality", "strongest"],
    excludedKeywords: ["technical", "backend"],
    answer:
      "Builder persistence: he can move between product, backend, frontend, deployment, and AI tooling until the whole thing works. He's difficult to stop once a problem becomes personal.",
    followUpIntentIds: ["strongest-backend-project", "differentiator", "learning-style"],
    priority: 6,
    recruiterRelevant: true,
  },
  {
    id: "biggest-fear",
    category: "career",
    title: "What he's afraid of",
    patterns: [
      "What does he fear?",
      "What is he afraid of?",
      "What scares him?",
    ],
    keywords: ["afraid", "fear", "scared"],
    answer:
      "Not failure itself — wasted potential. Becoming passive, accepting a smaller life than he's capable of building, or looking back and knowing inconsistency, not ability, was the limiting factor.",
    followUpIntentIds: ["failure-response", "final-boss", "success-definition"],
    priority: 3,
  },
  {
    id: "success-definition",
    category: "career",
    title: "What success means to him",
    patterns: [
      "What does success mean to him?",
      "How does he define success?",
      "What is his definition of a fulfilled career?",
    ],
    keywords: ["success", "define", "fulfilled", "legacy"],
    answer:
      "Becoming excellent enough to choose his work, location, and lifestyle — then using that freedom to build products with real value. He wants to be known as someone who could think strategically, engineer deeply, and still ship.",
    followUpIntentIds: ["long-term-goal", "endgame-life-vision", "motivation-ambition"],
    priority: 5,
  },
  {
    id: "long-term-goal",
    category: "career",
    title: "Long-term career goal",
    patterns: [
      "What is his long-term goal?",
      "Where does he see himself in five years?",
      "What is his dream role?",
      "What is his career goal?",
    ],
    keywords: ["long-term", "goal", "five", "years", "dream", "role", "future"],
    answer:
      "A product-driven senior or principal engineer — eventually a Technical Product Architect — who designs systems, still writes code, understands monetization, and can turn a strong idea into a real product or company.",
    actions: [{ type: "navigate", target: "contact" }],
    followUpIntentIds: ["engineer-vs-product-builder", "main-quest", "why-move-abroad"],
    priority: 6,
  },
  {
    id: "main-quest",
    category: "career",
    title: "Current main focus",
    patterns: [
      "What is his current main quest?",
      "What is he building toward right now?",
      "What is his current focus?",
      "What is he working on next?",
    ],
    keywords: ["main", "quest", "current", "focus", "building", "toward"],
    answer:
      "Earning a strong international engineering role, deepening AI/ML and system-design skills, and continuing to ship proof that he can operate beyond a conventional junior developer's scope.",
    followUpIntentIds: ["side-quests", "ai-ml-direction", "current-target-roles"],
    priority: 5,
  },
  {
    id: "side-quests",
    category: "career",
    title: "Skills he's actively upgrading",
    patterns: [
      "What skills is he upgrading?",
      "What is he currently learning?",
      "What are his side quests?",
    ],
    keywords: ["skills", "upgrading", "learning", "side", "quests"],
    answer:
      "Machine learning fundamentals, production AI systems, MLOps, distributed-system design, German, interview problem solving, and the discipline to keep the gym, learning, and shipping loops running together.",
    followUpIntentIds: ["ai-ml-direction", "reprobot-overview", "main-quest"],
    priority: 4,
  },
  {
    id: "final-boss",
    category: "career",
    title: "Biggest obstacle",
    patterns: [
      "What is his final boss?",
      "What is holding him back?",
      "What is his biggest obstacle?",
    ],
    keywords: ["final", "boss", "obstacle", "holding", "back"],
    answer:
      "Not intelligence or technical ability — consistent execution. Defeating distraction, impatience, and the temptation to pursue several ambitious things at once.",
    followUpIntentIds: ["biggest-weakness", "failure-response", "endgame-life-vision"],
    priority: 3,
  },
  {
    id: "values",
    category: "career",
    title: "What he values",
    patterns: [
      "What does he value?",
      "What does he value in engineering?",
      "What does he care about in people?",
      "What does he value in a team?",
    ],
    keywords: ["values", "value", "care", "trust", "respect", "loyalty"],
    answer:
      "Competence without arrogance, direct communication, loyalty, self-awareness, and people who keep their word. He trusts consistency more than presentation.",
    followUpIntentIds: ["teammate-type", "feedback-style", "personality-summary"],
    priority: 4,
  },
  {
    id: "mistakes-and-code-review",
    category: "career",
    title: "How he treats mistakes and code review",
    patterns: [
      "How does he learn from mistakes?",
      "What does he think about code review?",
      "How does he handle being wrong?",
    ],
    keywords: ["mistakes", "code", "review", "wrong"],
    answer:
      "He treats reviews and mistakes as system feedback: identify the underlying pattern, fix the immediate issue, and change the process so the same class of problem is less likely to return.",
    followUpIntentIds: ["feedback-style", "leadership-ownership-evidence", "what-hes-building-toward"],
    priority: 4,
  },
  {
    id: "energizing-vs-draining-work",
    category: "career",
    title: "What kind of work energizes him",
    patterns: [
      "What kind of work energizes him?",
      "What work drains him?",
      "What problems does he enjoy solving?",
    ],
    keywords: ["energizes", "drains", "energy", "enjoy", "work"],
    answer:
      "He's energized by ambiguous product problems, backend architecture, automation, and work where he can own a visible outcome. He's drained by repetitive ticket execution with no context, no learning curve, and no room to improve the underlying system.",
    followUpIntentIds: ["what-hes-building-toward", "current-target-roles", "how-he-thinks"],
    priority: 4,
  },
  {
    id: "why-became-engineer",
    category: "career",
    title: "Why he became a software engineer",
    patterns: [
      "Why did he become a software engineer?",
      "Why did he choose engineering?",
      "Why software?",
    ],
    keywords: ["why", "became", "engineer", "software", "choose"],
    answer:
      "Software gives him leverage: an idea can become a real system, reach people, and keep improving after the first version ships. It also fits how his brain works — break the problem down, model it, build it, and see whether reality agrees.",
    followUpIntentIds: ["how-he-thinks", "motivation-ambition", "what-hes-building-toward"],
    priority: 3,
  },
  {
    id: "what-hes-building-toward",
    category: "career",
    title: "What he's trying to build",
    patterns: [
      "What is he trying to build?",
      "How does he decide if an idea is worth building?",
      "How does he prioritize features?",
    ],
    keywords: ["building", "worth", "prioritize", "features", "ideas"],
    answer:
      "Useful products, and eventually the capability to lead them from idea to architecture to market. He judges ideas by user pain, feasibility, differentiation, and whether a small version can validate the core assumption — features are prioritized by impact and evidence, not by how impressive they sound.",
    followUpIntentIds: ["engineer-vs-product-builder", "leadership-ownership-evidence", "strongest-backend-project"],
    priority: 5,
    recruiterRelevant: true,
  },
];
