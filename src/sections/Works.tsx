// src/sections/Works.tsx
type Project = {
  title: string;
  logoText: string;
  why: string;
  what: string;
  how: string;
  techs: string[];
  links: { what?: string; code?: string; live?: string };
};

const projects: Project[] = [
  {
    title: "NUMMORIA ~ Personalized Finance Tracker",
    logoText: "/logos/nummoria_logo.png",
    why: "Personal finance tools are either too basic to be useful or too complex for everyday tracking. Most people want to understand where their money goes, not study accounting. I built Nummoria to simplify that gap — a clean, intuitive app where income, expenses, and investments live together under one interface. The goal is clarity, not spreadsheets: see balances per account, visualize categories, track crypto, stocks, or land investments, and plan recurring transactions without friction. Instead of hiding insights behind complexity, Nummoria makes financial awareness part of your daily routine. It started as a personal need for better control, and evolved into a full-stack system designed for long-term use and AI-powered budgeting.",
    how: "Nummoria runs on a Node.js + Express backend with MongoDB/Mongoose for data persistence, structured as modular routes and controllers (auth, accounts, transactions, investments, reports). Authentication supports JWT for API access and OAuth via Google for instant signup/login. The frontend, built with React (Vite + TailwindCSS), provides a fast and responsive dashboard experience, including charts, summaries, and dynamic filtering by account or currency. ESLint + Prettier enforce code consistency; Docker can spin up MongoDB for local or production deployment. All communication between backend and frontend flows through a secure REST API; environment variables control credentials, and CORS rules limit origins. Planned AI integration (via OpenAI API) will analyze transactions, detect spending trends, and recommend budget allocations automatically. The codebase is fully open-source under MIT license, emphasizing simplicity, scalability, and transparency.",
    what: "The live app offers user registration, authentication (email/Google), profile management (name, profession, currency), and account types (checking, savings, credit, cash). Users can log income, expenses, and investments with category tagging and frequency scheduling. Reports visualize totals by category, currency, and account through pie and bar charts, giving immediate clarity on spending habits. The investment module supports stocks, crypto, gold, and real estate with symbol-based tracking (e.g., BTC-USD, AAPL). Recurring transactions ensure monthly patterns stay updated automatically. Upcoming releases will add an AI Financial Expert Agent to generate personalized insights, predict cash flow, and suggest optimizations. In short, Nummoria transforms raw financial data into usable knowledge — simple enough for daily use, powerful enough to replace multiple disconnected tools.",
    techs: ["React.js", "Node.js", "MongoDB", "TailwindCSS", "Docker"],
    links: {
      code: "https://github.com/gokmeroz/nummoria",
      live: "https://www.nummoria-finance.com",
    },
  },
  {
    title: "Sports Academies Management Mobile App",
    logoText: "/logos/sports-academy-managment-mobile-app.png",
    why: "Running a sports academy usually means juggling spreadsheets, WhatsApp groups, paper forms, and manual payments across multiple tools. Owners need an at-a-glance picture of teams, sessions, attendance, and finances; coaches want fast check-in and access to drills; parents want clear schedules and updates; players want progress tracking. This app unifies those flows into one mobile-first product with role-based access (player/parent/coach/admin), clean calendars, one-tap attendance, match sheets, drill libraries, and push notifications. It reduces admin time, prevents miscommunication, and makes day-to-day operations measurable instead of chaotic.",
    how: "Technically, it’s a React Native + Expo mobile app backed by a Node.js/Express API and MongoDB (Mongoose). The system is multi-tenant by design (every document scoped with clubId) so multiple academies can operate in isolation. On the backend, we follow a vertical slice structure (modules for users, teams, sessions, attendance, matches, drills, stats, media, notifications, messages, health) with joi validation, JWT auth (access/refresh), role guards, and security middleware (helmet, CORS whitelist, rate limiting). File uploads (avatars, drill clips) use Multer; push notifications are via Firebase (firebase-admin on server, expo-notifications on mobile) with topics per club/team/user. Navigation uses @react-navigation/native; AsyncStorage persists tokens; and the UI prefers offline-friendly patterns like optimistic updates.",
    what: "Phase 1 delivers the operational core: role-based onboarding, team & session scheduling with calendar views, one-tap attendance, player/coach profiles, and actionable push notifications (session reminders, changes, messages). Phase 2 adds drill libraries, match lineups, per-player stats, and parent/coach messaging threads. The long-term goal is a lean SaaS with analytics and multi-branch support — simple, affordable, and reliable for small academies worldwide.",
    techs: ["Node.js", "React Native", "TailwindCSS", "MongoDB", "Expo"],
    links: {
      code: "https://github.com/gokmeroz/sports-academy-managment-mobile-app",
      live: "#",
    },
  },
  {
    title: "High-Frequency Trading of Bitcoin and Other Coins",
    logoText: "/logos/hft_btc.jpg",
    why: "In volatile crypto markets, even milliseconds matter. We set out to design a system that detects and executes profitable trades automatically — faster than human decision-making — to showcase how algorithmic trading can optimize returns in real-time conditions.",
    how: "Built collaboratively as our university capstone project with my teammates Fazlı Altun and Hakan Emir Arslan, we combined machine learning and real-time data pipelines using Binance APIs. The backend runs on Python for predictive modeling and trade signal generation, while the frontend — built with React, TypeScript, and Tailwind — visualizes live market data, performance metrics, and trade history.",
    what: "The final model achieved consistent simulated profitability across various market scenarios, demonstrating how intelligent strategies can outperform simple momentum or mean-reversion tactics. Beyond grades, this project taught us scalability, latency optimization, and the art of translating math into money.",
    techs: [
      "Python",
      "JavaScript",
      "React",
      "TypeScript",
      "Tailwind",
      "Coingecko API",
      "Machine Learning",
    ],
    links: {
      code: "https://github.com/fazlialtunn/hft-bitcoin-capstone",
      live: "#",
    },
  },
];

function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-6 items-start">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src={p.logoText}
          alt={`${p.title} logo`}
          className="h-10 w-10 rounded-full object-contain border border-white/10"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/logos/nummoria_logo.png";
          }}
        />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-bold">{p.title}</h3>
        <ul className="mt-2 space-y-1 text-neutral-300">
          <li>
            <span className="font-semibold">WHY</span> {p.why}
          </li>
          <li>
            <span className="font-semibold">HOW</span> {p.how}
          </li>
          <li>
            <span className="font-semibold">WHAT</span> {p.what}
          </li>
        </ul>
        <div className="mt-3 text-sm">
          <span className="opacity-80">TECHS USED:</span> {p.techs.join(", ")}
        </div>
      </div>

      {/* Links */}
      <div className="flex md:flex-col gap-3 md:gap-2 justify-end md:justify-start text-right md:text-left">
        {p.links.what && (
          <a
            href={p.links.what}
            className="underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            WHAT
          </a>
        )}
        {p.links.code && (
          <a
            href={p.links.code}
            className="underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            CODE
          </a>
        )}
        {p.links.live && (
          <a
            href={p.links.live}
            className="underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            LIVE
          </a>
        )}
      </div>
    </div>
  );
}

export default function Works() {
  return (
    <section id="projects" className="scroll-mt-24 py-6">
      <h2 className="text-2xl font-extrabold tracking-tight">
        Projects &amp; Works
      </h2>
      <div className="mt-6 space-y-8">
        {projects.map((p, i) => (
          <ProjectCard key={i} p={p} />
        ))}
      </div>
      <Divider />
    </section>
  );
}
