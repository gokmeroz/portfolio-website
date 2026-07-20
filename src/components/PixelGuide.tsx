import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "bot";
  html: string;
};

type Rule = {
  keywords: string[];
  reply: string;
};

const SCALE = 4;
const BUST_COLORS = {
  hood: "#241533",
  visor: "#4cd4ff",
  glow: "#ffd23f",
  neck: "#100a1f",
  trim: "#ffd23f",
  torso: "#1d1338",
};

const BUST_RECTS: [number, number, number, number, string][] = [
  [2, 0, 8, 2, BUST_COLORS.hood],
  [2, 3, 8, 1, BUST_COLORS.hood],
  [4, 4, 4, 1, BUST_COLORS.hood],
  [2, 2, 8, 1, BUST_COLORS.visor],
  [4, 2, 1, 1, BUST_COLORS.glow],
  [7, 2, 1, 1, BUST_COLORS.glow],
  [4, 5, 4, 1, BUST_COLORS.neck],
  [1, 6, 10, 1, BUST_COLORS.trim],
  [1, 7, 10, 3, BUST_COLORS.torso],
  [0, 7, 1, 2, BUST_COLORS.trim],
  [11, 7, 1, 2, BUST_COLORS.trim],
  [5, 8, 2, 1, BUST_COLORS.glow],
];

const RULES: Rule[] = [
  {
    keywords: ["hi", "hello", "hey", "yo", "sup"],
    reply:
      "Hey. I know the professional Mert, the personal Mert, and a few hidden character stats. Ask about how he <b>thinks</b>, what he is <b>building toward</b>, his <b>hobbies</b>, or why you should <b>hire</b> him.",
  },
  {
    keywords: [
      "are you real",
      "are you ai",
      "are you a bot",
      "what are you",
      "who are you",
      "pixelguide",
      "pixel guide",
      "npc",
    ],
    reply:
      "I'm <b>PixelGuide</b>: a scripted NPC built into Mert's portfolio. I'm not a live language model, but my save file covers his work, mindset, goals, interests, and contact details.",
  },
  {
    keywords: [
      "who is",
      "who's he",
      "who is mert",
      "about him",
      "tell me about him",
      "describe mert",
      "elevator pitch",
    ],
    reply:
      "Göktuğ Mert Özdoğan is an Istanbul-based software engineer: backend-leaning, product-minded, and moving deeper into AI/ML. He does not just want to implement tickets; he wants to understand the product, design the system, and ship something people can actually use.",
  },
  {
    keywords: [
      "why hire",
      "why should i hire",
      "why should we hire",
      "why should you hire",
      "worth hiring",
      "make a case",
      "sell me on",
      "convince me",
      "pitch me",
      "why him",
      "why choose him",
      "good fit",
      "good hire",
      "hiring manager",
      "top reasons",
      "what makes him different",
    ],
    reply:
      'Because he already behaves beyond the usual junior profile: he has shipped software used by <b>10,000+ employees</b>, built products end to end, worked across banking and research environments, and actively uses AI as an engineering tool rather than a buzzword. His edge is the combination of <b>backend depth, product instinct, ownership, and ambition</b>. <a href="mailto:goekmeroz@gmail.com">Email him</a> or open his <a href="/resume/Goktug-Mert-Ozdogan-Resume.pdf" target="_blank" rel="noreferrer noopener">r&eacute;sum&eacute;</a>.',
  },
  {
    keywords: [
      "how does he think",
      "how he thinks",
      "mindset",
      "thinking style",
      "decision making",
      "make decisions",
      "approach problems",
      "solve problems",
      "difficult problems",
      "challenge assumptions",
      "uncertainty",
    ],
    reply:
      "He starts with the real problem, not the fashionable solution. He likes to reduce ambiguity, challenge assumptions, compare tradeoffs, and then build the smallest version that proves the idea. He can overthink, but his best work happens when he turns that intensity into a concrete system and ships.",
  },
  {
    keywords: [
      "engineer or product builder",
      "product builder",
      "product thinking",
      "implementer or architect",
      "architect",
      "technical product architect",
      "what kind of engineer",
      "engineer is he becoming",
      "does he want to stay hands-on",
      "stay hands-on",
    ],
    reply:
      'He is becoming a <b>Technical Product Architect</b>: still hands-on with code, but capable of connecting architecture, product strategy, user value, and business outcomes. In plain English: not just "build this ticket," but "why are we building it, how should it work, and can it scale?"',
  },
  {
    keywords: [
      "speed or perfection",
      "ship or polish",
      "shipping or polishing",
      "move fast",
      "perfectionist",
      "perfectionism",
      "overthink",
      "overthinking",
    ],
    reply:
      "His natural bias is toward high standards, sometimes too high. He is learning to separate <b>reversible decisions</b> from expensive ones: ship the reversible choices quickly, slow down for architecture, security, and data decisions that are painful to undo.",
  },
  {
    keywords: [
      "simple or clever",
      "simple systems",
      "clever systems",
      "clean code",
      "architecture tradeoff",
      "technical decisions",
      "monolith or microservices",
      "microservices",
      "monolith",
    ],
    reply:
      "Simple until complexity earns its place. He prefers a well-structured monolith over premature microservices, explicit code over clever tricks, and architecture that matches the actual traffic, team, and failure modes rather than a diagram designed to look impressive.",
  },
  {
    keywords: [
      "what kind of teammate",
      "team player",
      "work with a team",
      "working alone",
      "alone or team",
      "collaboration",
      "teammate",
      "ownership",
      "take ownership",
    ],
    reply:
      "He is independent enough to own a problem end to end, but he does not want to build in a vacuum. He works best with direct teammates who challenge ideas, communicate clearly, and care about the result more than protecting their ego.",
  },
  {
    keywords: [
      "feedback",
      "code review",
      "criticism",
      "manager",
      "management style",
      "best environment",
      "perform best",
    ],
    reply:
      'Direct, specific feedback works best. He would rather hear "this design breaks under X" than receive vague praise. The ideal environment gives him ownership, high standards, technical mentorship, and enough trust to propose a better path when he sees one.',
  },
  {
    keywords: [
      "debug",
      "debugging",
      "new technology",
      "learn technology",
      "learns",
      "learning style",
      "does not know",
      "doesn't know",
      "what does he want to learn next",
    ],
    reply:
      "He learns by building. First he gets the mental model, then creates a small working version, breaks it, reads the failure, and rebuilds it properly. When debugging, he prefers narrowing the system with evidence over randomly changing code until the error disappears.",
  },
  {
    keywords: [
      "backend or frontend",
      "backend",
      "frontend",
      "full stack",
      "full-stack",
      "strongest technical",
      "technical strength",
    ],
    reply:
      "Backend is his strongest lane: APIs, business logic, data models, authentication, integrations, and system behavior. He is still comfortable shipping full-stack products with React and React Native, which helps him reason from database constraints all the way to the user's screen.",
  },
  {
    keywords: [
      "ai engineer",
      "machine learning",
      "ai/ml",
      "why ai",
      "why machine learning",
      "interested in ai",
      "ml path",
      "artificial intelligence",
    ],
    reply:
      "AI/ML is the next layer of his engineering path, not a total career reset. He already knows how to build products and backend systems; now he is deepening the modeling, evaluation, agent, and MLOps skills needed to make intelligent features reliable in production.",
  },
  {
    keywords: [
      "use ai",
      "ai while developing",
      "ai native",
      "claude",
      "codex",
      "llm",
      "agent",
      "agents",
    ],
    reply:
      "He treats AI as a force multiplier, not an autopilot button. He uses coding agents for exploration, implementation, review, and automation, but keeps architecture, validation, security, and product judgment human-owned.",
  },
  {
    keywords: [
      "ambitious",
      "ambition",
      "motivates",
      "motivation",
      "what drives him",
      "keeps him going",
      "what does he believe he has not achieved",
      "competitive",
    ],
    reply:
      "He is driven by the gap between where he is and what he believes he can become. The goal is not simply a comfortable developer job; it is becoming internationally competitive, building serious products, and creating a life with freedom, impact, and options.",
  },
  {
    keywords: [
      "failure",
      "lose",
      "losing",
      "setback",
      "pressure",
      "when things fail",
      "motivation disappears",
    ],
    reply:
      "He takes losses personally for a moment, then converts them into data. His pattern is to inspect what failed, tighten the system, and go again. The bigger risk for him is not failure; it is losing momentum through inconsistency or overthinking.",
  },
  {
    keywords: [
      "biggest weakness",
      "weakness",
      "needs to improve",
      "improve about himself",
      "missing",
    ],
    reply:
      "His biggest weakness is trying to upgrade too many parts of his life at once. That can turn ambition into scattered execution. His next level comes from ruthless prioritization, deeper focus, and finishing fewer things at a much higher standard.",
  },
  {
    keywords: [
      "biggest strength",
      "strength",
      "best quality",
      "strongest passive",
      "passive ability",
    ],
    reply:
      "His strongest passive ability is <b>builder persistence</b>: he can move between product, backend, frontend, deployment, and AI tooling until the whole thing works. He is difficult to stop once a problem becomes personal.",
  },
  {
    keywords: [
      "afraid",
      "fear",
      "scared",
      "what does he fear",
      "wasted potential",
    ],
    reply:
      "Not failure itself. The real fear is wasted potential: becoming passive, accepting a smaller life than he is capable of building, or looking back and knowing inconsistency—not ability—was the limiting factor.",
  },
  {
    keywords: [
      "success",
      "what does success mean",
      "fulfilled potential",
      "known for",
      "legacy",
      "impact or recognition",
    ],
    reply:
      "Success means becoming excellent enough to choose his work, location, and lifestyle—then using that freedom to build products with real value. He wants to be known as someone who could think strategically, engineer deeply, and still ship.",
  },
  {
    keywords: [
      "long term goal",
      "long-term goal",
      "does he think long term",
      "think long term",
      "five years",
      "5 years",
      "ten years",
      "10 years",
      "future role",
      "dream role",
      "career goal",
    ],
    reply:
      "Long term, he wants to become a product-driven senior or principal engineer—eventually a <b>Technical Product Architect</b>—who designs systems, still writes code, understands monetization, and can turn a strong idea into a real company or product.",
  },
  {
    keywords: [
      "main quest",
      "current quest",
      "what is he building toward",
      "where does he want to go next",
      "current goal",
      "next chapter",
      "where does he want to go next",
    ],
    reply:
      "Current main quest: earn a strong international engineering role, deepen AI/ML and system-design skills, and keep shipping proof that he can operate beyond the boundaries of a conventional junior developer.",
  },
  {
    keywords: [
      "side quest",
      "side quests",
      "currently upgrading",
      "skills upgrading",
      "skill tree",
      "leveling",
      "xp",
    ],
    reply:
      "Active skill-tree upgrades: machine learning fundamentals, production AI systems, MLOps, distributed-system design, German, interview problem solving, and the discipline to keep the gym, learning, and shipping loops running together.",
  },
  {
    keywords: [
      "final boss",
      "biggest obstacle",
      "holding him back",
      "enemy",
      "difficulty level",
    ],
    reply:
      "The final boss is not intelligence or technical ability. It is <b>consistent execution</b>: defeating distraction, impatience, and the temptation to pursue five main quests at the same time.",
  },
  {
    keywords: [
      "endgame",
      "ideal life",
      "life he wants",
      "kind of life",
      "future life",
    ],
    reply:
      "The endgame is freedom with substance: meaningful technical work, financial independence, an international life, strong health, a family he can be present for, and enough ownership to build rather than merely execute someone else's roadmap forever.",
  },
  {
    keywords: [
      "character stats",
      "stats",
      "rpg class",
      "class would he choose",
      "game character",
      "inventory",
      "save file",
    ],
    reply:
      "<b>Class:</b> Engineer/Builder hybrid.<br/><b>Highest stats:</b> ambition, product instinct, persistence, backend thinking.<br/><b>Current debuff:</b> overthinking.<br/><b>Inventory:</b> MacBook, terminal, gym bag, too many open tabs, and at least one unfinished big idea.",
  },
  {
    keywords: [
      "loading screen",
      "loading-screen",
      "game tip",
      "new game",
      "checkpoint",
      "lives left",
    ],
    reply:
      "<b>Loading-screen tip:</b> Mert gains more XP from shipping one complete system than starting three exciting ones. Failure does not consume a life; it creates a checkpoint.",
  },
  {
    keywords: [
      "spider-man",
      "spiderman",
      "spider man",
      "spidey",
      "marvel",
      "favorite superhero",
      "superhero",
    ],
    reply:
      "Yes—<b>Spider-Man is his favorite</b>. Not because he is the strongest hero, but because he is smart, flawed, responsible, and keeps moving while ordinary life keeps hitting him. That combination is very Mert-coded.",
  },
  {
    keywords: ["batman", "dc or marvel", "marvel or dc"],
    reply:
      "Marvel, mainly because of Spider-Man. Batman gets respect for preparation and discipline, but Spidey wins on relatability, humor, science, and carrying responsibility without becoming emotionally bulletproof.",
  },
  {
    keywords: [
      "football",
      "soccer",
      "fenerbahce",
      "fenerbahçe",
      "which club",
      "favorite team",
    ],
    reply:
      'Fenerbahçe. "Fan" is technically accurate, but emotionally incomplete.',
  },
  {
    keywords: [
      "mma",
      "boxing",
      "bjj",
      "martial arts",
      "combat sports",
      "fight",
    ],
    reply:
      "He follows MMA and is interested in boxing and BJJ. He likes the part where technique, pressure, discipline, and honest feedback all meet—there is nowhere to hide behind theory once the round starts.",
  },
  {
    keywords: ["gym", "fitness", "training", "workout", "health"],
    reply:
      "The gym is both a physical goal and a mental reset. He wants to become leaner, stronger, and more disciplined, but the deeper value is proving that consistency can beat mood.",
  },
  {
    keywords: [
      "harry potter",
      "fiction",
      "fictional world",
      "what fictional worlds",
      "movies",
      "stories",
    ],
    reply:
      "He likes the Spider-Man and Harry Potter worlds—stories where identity, responsibility, friendship, and becoming capable matter more than looking invincible.",
  },
  {
    keywords: [
      "new york",
      "nyc",
      "manhattan",
      "upper west side",
      "why new york",
      "dream city",
    ],
    reply:
      "New York is the long-term north star: density, ambition, technology, culture, and the feeling that something important is always being built nearby. The Upper West Side is the calmer endgame version of that dream.",
  },
  {
    keywords: [
      "berlin or new york",
      "germany",
      "netherlands",
      "ireland",
      "uk",
      "united kingdom",
      "move abroad",
      "international",
    ],
    reply:
      "New York is the dream; Europe is the most realistic next map. Germany, the Netherlands, Ireland, and the UK all fit the immediate goal: join a strong engineering environment, relocate, and grow internationally.",
  },
  {
    keywords: [
      "hobbies",
      "hobby",
      "fun",
      "free time",
      "outside coding",
      "outside of coding",
      "interests",
      "talk about for hours",
    ],
    reply:
      "Outside code: Fenerbahçe, MMA, the gym, Spider-Man, Harry Potter, New York, personal finance, product ideas, and probably another conversation about where technology can take his life next.",
  },
  {
    keywords: [
      "finance",
      "stocks",
      "crypto",
      "invest",
      "money",
      "financial independence",
    ],
    reply:
      "He follows personal finance, US markets, and crypto because money is another system to understand—not because he thinks every chart is an invitation to gamble. The long-term objective is freedom and optionality.",
  },
  {
    keywords: [
      "introvert",
      "extrovert",
      "social",
      "personality",
      "what is he like",
      "friends say",
    ],
    reply:
      "Focused, direct, ambitious, occasionally stubborn, and much more playful once he is comfortable. He enjoys people, but serious building still requires long stretches of solo concentration.",
  },
  {
    keywords: [
      "values",
      "what does he value",
      "what does he care about",
      "respect",
      "trust",
      "loyalty",
      "people he respects",
    ],
    reply:
      "He respects competence without arrogance, direct communication, loyalty, self-awareness, and people who keep their word. He trusts consistency more than presentation.",
  },
  {
    keywords: [
      "younger self",
      "future mert",
      "advice to himself",
      "tell himself",
      "prove to himself",
    ],
    reply:
      "The message would be: stop waiting to feel fully ready. Pick the main quest, build the evidence, and let consistency create the confidence.",
  },
  {
    keywords: [
      "how does mert think",
      "what is mert actually like",
      "introverted or extroverted",
      "introvert or extrovert",
      "logical or emotional",
      "what frustrates him",
      "what does he take seriously",
      "refuse to settle",
      "what does he refuse",
    ],
    reply:
      "He is analytical first, emotional underneath, and direct once he trusts the room. He takes his future, his work, and keeping his word seriously. What frustrates him most is wasted effort, vague thinking, avoidable inconsistency, and settling for a result he knows could have been better.",
  },
  {
    keywords: [
      "what is he trying to build",
      "worth building",
      "idea is worth",
      "balance business and engineering",
      "optimize for",
      "building products",
      "vague ideas",
      "prioritize features",
      "architecture with delivery",
      "communicate technical decisions",
    ],
    reply:
      "He is trying to build useful products and eventually the capability to lead them from idea to architecture to market. He judges ideas by user pain, feasibility, differentiation, and whether a small version can validate the core assumption. Features are prioritized by impact and evidence, not by how impressive they sound.",
  },
  {
    keywords: [
      "learn from mistakes",
      "code reviews",
      "code review",
      "ship quickly",
      "polish forever",
      "what does he bring",
      "development team",
    ],
    reply:
      "He brings ownership, cross-stack context, product awareness, and the willingness to stay with a problem until it works. Reviews and mistakes are treated as system feedback: identify the underlying pattern, fix the immediate issue, and change the process so the same class of problem is less likely to return.",
  },
  {
    keywords: [
      "problems energize",
      "work energizes",
      "work drains",
      "problems drain",
      "kind of work",
      "what energizes him",
    ],
    reply:
      "He is energized by ambiguous product problems, backend architecture, automation, and work where he can own a visible outcome. He is drained by repetitive ticket execution with no context, no learning curve, and no room to improve the underlying system.",
  },
  {
    keywords: [
      "why did mert become",
      "why software engineer",
      "became a software engineer",
      "why engineering",
    ],
    reply:
      "Because software gives him leverage: an idea can become a real system, reach thousands of people, and keep improving after the first version ships. Engineering also fits the way his brain works—break the problem down, model it, build it, and see whether reality agrees.",
  },
  {
    keywords: [
      "enjoy about building ai",
      "production systems",
      "working on production",
      "systems does he want",
      "distributed systems",
      "system design",
    ],
    reply:
      "He is most interested in systems where intelligence has to survive contact with production: APIs, data pipelines, evaluation, retries, observability, security, and real user behavior. Longer term, he wants deeper experience with distributed systems and reliable high-throughput backends—not AI demos that only work in a notebook.",
  },
  {
    keywords: [
      "startup or big tech",
      "startups or large companies",
      "industries interest",
      "fintech interest",
      "role would fit",
      "best role",
      "hands-on with code",
      "typical junior",
      "specialist or generalist",
      "individual contributor or team lead",
    ],
    reply:
      "Best fit today: a junior or new-grad backend/full-stack role with real ownership, strong engineers, and exposure to AI-enabled products. He is a backend-leaning generalist now, with the goal of becoming a deep technical individual contributor who can later lead architecture and product direction without abandoning code.",
  },
  {
    keywords: [
      "why work abroad",
      "want to work abroad",
      "countries is he interested",
      "company does he want",
      "city is his next map",
      "next map",
    ],
    reply:
      "He wants to work abroad to compete in stronger engineering markets, learn from higher-scale teams, and build an international life rather than stay inside the limits of one local ecosystem. Europe is the practical next map; New York remains the long-term destination.",
  },
  {
    keywords: [
      "impact does he want",
      "become an entrepreneur",
      "entrepreneur",
      "optimizing his life",
      "fulfilled his potential",
      "not achieved yet",
      "recognition or impact",
    ],
    reply:
      "He has not reached the level of technical depth, international experience, fitness, and financial freedom he expects from himself yet. He wants impact over empty recognition and may eventually build a company, but first he wants the engineering credibility to create something durable rather than merely call himself a founder.",
  },
  {
    keywords: ["what comics", "read comics", "draw comics", "comic collector"],
    reply:
      "Spider-Man is the confirmed obsession. This guide is not going to invent a secret comic-collector or artist backstory for him; his connection is mainly to the character, the world, and what Spider-Man represents.",
  },
  {
    keywords: [
      "outside of technology",
      "fictional worlds",
      "not coding",
      "when he is not coding",
    ],
    reply:
      "When he is not coding, he is usually orbiting the gym, football, MMA, Spider-Man, Harry Potter, finance, New York, German, or the next version of the life he is trying to build.",
  },
  {
    keywords: [
      "software did not exist",
      "without software",
      "what would mert build",
    ],
    reply:
      "Probably still a system: a business, a training plan, a product, or an operating model. Software is his strongest medium, but the deeper instinct is organizing messy inputs into something useful and repeatable.",
  },
  {
    keywords: [
      "having your life together",
      "life together",
      "what does having",
    ],
    reply:
      "For him, having life together means the basics no longer depend on motivation: health is moving forward, work has direction, money is controlled, relationships are protected, and promises to himself are treated like real commitments.",
  },
  {
    keywords: [
      "class would mert choose",
      "class would he choose",
      "achievement did he unlock",
      "unlock recently",
      "grinding or exploring",
      "how many lives",
    ],
    reply:
      "<b>RPG class:</b> Engineer/Builder hybrid.<br/><b>Latest unlock:</b> rebuilding this portfolio as an 8-bit experience and adding PixelGuide.<br/><b>Current mode:</b> mostly grinding, selectively exploring.<br/><b>Lives:</b> one—but failures become checkpoints, not game-over screens.",
  },
  {
    keywords: [
      "building products or solving leetcode",
      "engineering or entrepreneurship",
      "stability or upside",
      "football or mma",
      "gym before coding",
      "coding before gym",
      "remote work or office",
      "money freedom impact recognition",
    ],
    reply:
      "Products over LeetCode, though interviews still need both. Engineering first, entrepreneurship later. Calculated upside over passive stability. Football for identity, MMA for respect. Gym before coding when possible. Office for acceleration early, flexibility later. Freedom and impact over status.",
  },
  {
    keywords: [
      "project",
      "projects",
      "portfolio piece",
      "apps",
      "built",
      "shipped",
      "what has he built",
    ],
    reply:
      "His portfolio centers on real systems rather than tutorial clones: an AI-powered personal-finance product, an automated job-application pipeline, banking software used internally at scale, and research-oriented backend work. Open the Projects &amp; Works section for the full builds and links.",
  },
  {
    keywords: ["nummoria", "finance app", "personal finance app"],
    reply:
      "<b>Nummoria</b> is his AI-powered personal-finance product, built across web, mobile, backend, authentication, transaction modeling, analytics, and AI guidance. It is the clearest example of him operating as engineer, product owner, and shipper at the same time.",
  },
  {
    keywords: [
      "jobpilot",
      "job pilot",
      "job application pipeline",
      "automation project",
      "playwright project",
    ],
    reply:
      "<b>JobPilot</b> is a Python automation pipeline that discovers roles, applies hard gates, scores fit, plans applications, interacts with forms through Playwright, and uses Claude for structured reasoning. It turns a repetitive workflow into an auditable system.",
  },
  {
    keywords: [
      "inzva",
      "recent activity",
      "currently working on",
      "what is he doing now",
      "what's he up to",
      "reproducibility",
      "scientific reproducibility",
    ],
    reply:
      "Right now he's contributing to a team project at <b>inzva AI Projects #10</b> on <b>Agentic AI for Scientific Reproducibility</b> — using autonomous, tool-using agents to verify and validate published research workflows. See the Recent Activity section for details.",
  },
  {
    keywords: [
      "skill",
      "skills",
      "tech",
      "stack",
      "pytorch",
      "scikit-learn",
      "mlops",
      "language",
      "framework",
    ],
    reply:
      "Backend-leaning full-stack: TypeScript, Node.js, C#/.NET, Python, SQL, MongoDB, Docker, and AWS. Frontend: React, React Native, and Tailwind. AI/automation: PyTorch, scikit-learn, Anthropic Claude API, MLOps concepts, and Playwright.",
  },
  {
    keywords: [
      "experience",
      "intern",
      "work history",
      "halkbank",
      "tubitak",
      "eyehub",
      "compro",
      "professional background",
      "resume",
      "cv",
    ],
    reply:
      "He worked on internal banking software at <b>Halkbank</b>, contributed backend foundations to the TUBITAK-funded <b>EyeHub</b> research project, and completed an earlier software-engineering internship at <b>ComPro</b>. His experience spans enterprise systems, research, cloud, and self-directed product development.",
  },
  {
    keywords: [
      "education",
      "degree",
      "university",
      "college",
      "bachelor",
      "b.sc",
      "bsc",
      "graduate",
      "computer engineering",
      "bahcesehir",
      "bahçeşehir",
    ],
    reply:
      "B.Sc. in Computer Engineering from <b>Bahçeşehir University</b> in Istanbul, completed in August 2025. The degree gave him the foundation; most of his practical growth came from internships, independent products, and learning by shipping.",
  },
  {
    keywords: [
      "certificate",
      "certification",
      "certifications",
      "course",
      "courses",
      "udemy",
      "coursera",
    ],
    reply:
      "His certificates cover backend development, SQL, secure software requirements, and ASP.NET Core through providers including Meta, the University of Michigan, the University of Colorado, and Udemy. The full list is in the Certificates section.",
  },
  {
    keywords: [
      "location",
      "based",
      "where is he",
      "where does he live",
      "relocate",
      "relocation",
      "remote",
      "onsite",
      "on-site",
      "on site",
      "visa",
      "sponsorship",
      "work authorization",
      "work permit",
      "citizen",
    ],
    reply:
      "Based in <b>Istanbul, Turkey</b>. He is open to relocation and on-site roles internationally. As a Turkish citizen, he would require employer-sponsored work authorization for roles outside Turkey.",
  },
  {
    keywords: [
      "available",
      "availability",
      "start date",
      "notice period",
      "when can he start",
      "when can you start",
    ],
    reply:
      'He is currently open to suitable opportunities. Exact timing depends on the location and immigration process, so the fastest answer is a direct email: <a href="mailto:goekmeroz@gmail.com">goekmeroz@gmail.com</a>.',
  },
  {
    keywords: [
      "salary",
      "compensation",
      "pay",
      "rate",
      "day rate",
      "how much does he cost",
      "expected salary",
    ],
    reply:
      'Compensation depends on role scope, location, level, and relocation requirements. That conversation belongs in a real process, not an NPC dialogue box: <a href="mailto:goekmeroz@gmail.com">contact him directly</a>.',
  },
  {
    keywords: [
      "contact",
      "hire",
      "email",
      "reach",
      "linkedin",
      "github",
      "twitter",
      "reach out",
    ],
    reply:
      'Best route: <a href="mailto:goekmeroz@gmail.com">goekmeroz@gmail.com</a>. You can also find him on <a href="https://github.com/gokmeroz" target="_blank" rel="noreferrer noopener">GitHub</a>, <a href="https://linkedin.com/in/goktugmertozdogan" target="_blank" rel="noreferrer noopener">LinkedIn</a>, and <a href="https://x.com/gokmeroz_dev" target="_blank" rel="noreferrer noopener">X</a>.',
  },
  {
    keywords: ["thank", "thanks", "cool", "nice", "awesome", "great"],
    reply:
      "Anytime. Ask another question or pick a shortcut—there is more in this save file than a standard portfolio FAQ.",
  },
];

const FALLBACK_REPLY =
  "That question is not mapped yet. Try asking how he <b>thinks</b>, what his <b>main quest</b> is, whether he likes <b>Spider-Man</b>, what he does outside <b>coding</b>, or why you should <b>hire</b> him.";

const CHIPS = [
  { label: "Why hire him?", query: "why hire him" },
  { label: "How does he think?", query: "how does he think" },
  { label: "Main quest", query: "what is his current main quest" },
  { label: "Character stats", query: "what are his character stats" },
  { label: "Spider-Man?", query: "does he like Spider-Man" },
  { label: "Outside coding", query: "what does he do outside coding" },
  { label: "Goals", query: "what is his long-term goal" },
  { label: "Experience", query: "experience" },
  { label: "Skills", query: "skills" },
  { label: "Contact", query: "contact" },
];

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘`]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesKeyword(query: string, keyword: string): boolean {
  const kw = normalizeText(keyword);
  const suffix = kw.length > 2 && !kw.includes(" ") ? "s?" : "";
  const pattern = new RegExp(
    `(?<![a-z0-9])${escapeRegExp(kw)}${suffix}(?![a-z0-9])`,
    "i"
  );
  return pattern.test(query);
}

function findReply(raw: string): string {
  const query = normalizeText(raw);
  for (const rule of RULES) {
    if (rule.keywords.some((keyword) => matchesKeyword(query, keyword))) {
      return rule.reply;
    }
  }
  return FALLBACK_REPLY;
}

let messageId = 0;

export default function PixelGuide() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chipsExpanded, setChipsExpanded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typingTimer = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    BUST_RECTS.forEach(([x, y, w, h, color]) => {
      ctx.fillStyle = color;
      ctx.fillRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
    });
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    return () => {
      if (typingTimer.current) window.clearTimeout(typingTimer.current);
    };
  }, []);

  function openGuide() {
    setOpen(true);
    if (!seen) {
      setSeen(true);
      setMessages([
        {
          id: messageId++,
          role: "bot",
          html: "Hey, I'm Spider-Guide. Ask how Mert thinks, what he is building toward, what he does outside code, or whether Spider-Man beats Batman &mdash; or tap a shortcut below.",
        },
      ]);
    }
    window.setTimeout(() => inputRef.current?.focus(), 50);
  }

  function closeGuide() {
    setOpen(false);
  }

  function ask(raw: string) {
    const text = raw.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { id: messageId++, role: "user", html: escapeHtml(text) }]);
    setTyping(true);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typingTimer.current) window.clearTimeout(typingTimer.current);
    typingTimer.current = window.setTimeout(
      () => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: messageId++, role: "bot", html: findReply(text) },
        ]);
      },
      reduced ? 0 : 420
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = inputValue;
    setInputValue("");
    ask(value);
  }

  function handleChip(query: string) {
    if (!open) openGuide();
    ask(query);
    setChipsExpanded(false);
  }

  return (
    <div className="fixed z-[200] top-[80px] left-4 sm:left-4 font-sans">
      {/* decorative web */}
      <svg
        className="pixel-guide-web absolute -top-[38px] -left-[38px] w-[128px] h-[128px] pointer-events-none opacity-55"
        viewBox="-55 -55 110 110"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="0" y2="-46" />
        <line x1="0" y1="0" x2="32.5" y2="-32.5" />
        <line x1="0" y1="0" x2="46" y2="0" />
        <line x1="0" y1="0" x2="32.5" y2="32.5" />
        <line x1="0" y1="0" x2="0" y2="46" />
        <line x1="0" y1="0" x2="-32.5" y2="32.5" />
        <line x1="0" y1="0" x2="-46" y2="0" />
        <line x1="0" y1="0" x2="-32.5" y2="-32.5" />
        <polygon points="0,-14 9.9,-9.9 14,0 9.9,9.9 0,14 -9.9,9.9 -14,0 -9.9,-9.9" />
        <polygon points="0,-27 19.1,-19.1 27,0 19.1,19.1 0,27 -19.1,19.1 -27,0 -19.1,-19.1" />
        <polygon points="0,-40 28.3,-28.3 40,0 28.3,28.3 0,40 -28.3,28.3 -40,0 -28.3,-28.3" />
      </svg>

      <button
        type="button"
        className="pixel-guide-badge relative z-[1]"
        aria-label="Open Mert's pixel guide to ask a question"
        aria-expanded={open}
        onClick={() => (open ? closeGuide() : openGuide())}
      >
        <canvas ref={canvasRef} width={48} height={40} />
        {!seen && (
          <span className="pixel-guide-ping" aria-hidden="true">
            ?
          </span>
        )}
      </button>

      {!seen && (
        <div className="pixel-guide-callout absolute top-2 left-[76px] z-[2]">
          <span className="pixel-guide-callout-arrow" />
          <span className="pixel-guide-callout-text">Click me!</span>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[2] bg-black/60 backdrop-blur-[1px]"
          aria-hidden="true"
          onClick={closeGuide}
        />
      )}

      {open && (
        <div
          className="pixel-panel absolute top-[72px] left-0 z-[3] w-[min(340px,calc(100vw-32px))] max-h-[min(70vh,560px)] flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Ask Mert's pixel guide"
        >
          <div className="flex-none flex items-center gap-2.5 px-3 py-3 border-b-[3px] border-[var(--color-border)] bg-[var(--color-surface-2)]">
            <div className="flex-1 min-w-0">
              <div className="font-pixel-ui text-[11px] tracking-wide text-[var(--color-text-base)]">
                NPC://MERT-GUIDE
              </div>
              <div className="mt-1 font-pixel-ui text-[9px] uppercase tracking-wide text-[var(--color-accent-2)]">
                <span className="text-[#3ef29a]">&#9679;</span> Online
              </div>
            </div>
            <button
              type="button"
              className="flex-none w-[26px] h-[26px] border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-base)] font-pixel-ui text-xs hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              aria-label="Close"
              onClick={closeGuide}
            >
              &#10005;
            </button>
          </div>

          <div
            ref={logRef}
            className="flex flex-1 min-h-[80px] flex-col gap-2.5 p-3 overflow-y-auto"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`pixel-guide-msg ${m.role}`}
                dangerouslySetInnerHTML={{ __html: m.html }}
              />
            ))}
            {typing && (
              <div className="pixel-guide-msg bot text-[var(--color-text-muted)]">
                ...
              </div>
            )}
          </div>

          <div className="flex-none border-t-[3px] border-[var(--color-border)]">
            <div className="flex items-center justify-between px-3 pt-2">
              <span className="font-pixel-ui text-[9px] uppercase tracking-wide text-[var(--color-text-muted)]">
                Shortcuts
              </span>
              <button
                type="button"
                className="font-pixel-ui text-[9px] uppercase tracking-wide text-[var(--color-accent-2)] hover:text-[var(--color-accent)]"
                onClick={() => setChipsExpanded((v) => !v)}
                aria-expanded={chipsExpanded}
              >
                {chipsExpanded ? "Show less ▲" : "See all ▼"}
              </button>
            </div>
            <div
              className={
                chipsExpanded
                  ? "flex flex-wrap gap-1.5 px-3 pt-2 pb-3 max-h-[180px] overflow-y-auto"
                  : "no-scrollbar flex flex-nowrap gap-1.5 overflow-x-auto px-3 pt-2 pb-3"
              }
            >
              {CHIPS.map((c) => (
                <button
                  key={c.query}
                  type="button"
                  className="pixel-chip flex-none text-[9px]"
                  onClick={() => handleChip(c.query)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <form
            className="flex-none flex gap-2 p-3 border-t-[3px] border-[var(--color-border)] bg-[var(--color-surface-2)]"
            onSubmit={handleSubmit}
          >
            <input
              ref={inputRef}
              type="text"
              className="pixel-guide-input"
              placeholder="Ask anything about Mert..."
              autoComplete="off"
              aria-label="Type a question"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="pixel-btn text-[10px]">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}