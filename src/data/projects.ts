// Project content for the Projects section. Shared with the hero's arcade
// cabinet, which shows the same explanations on its screen.
import { Eye, Plane, type LucideIcon } from "lucide-react";

export type Project = {
  id: "nummoria" | "jobpilot" | "hft-btc" | "eyehub";
  title: string;
  logoSrc?: string;
  icon?: LucideIcon;
  description: string;
  highlights: string[];
  techs: string[];
  explain: {
    normal: string;
    technical: string;
    impact: string[];
  };
  links: {
    what?: string;
    code?: string;
    live?: string;
  };
};

export const projects: Project[] = [
  {
    id: "nummoria",
    title: "NUMMORIA ~ AI-Powered Personal Finance System",
    logoSrc: "/logos/nummoria_logo.png",
    description:
      "Most finance apps are either too simplistic or unnecessarily complex — Nummoria bridges that gap with a unified system where income, expenses, and investments coexist in one place instead of spreadsheets and fragmented tools. It's a full-stack platform (React/Vite/TailwindCSS frontend, Node.js/Express/MongoDB backend) handling the complete financial lifecycle, with a domain-driven architecture built to extend into AI-assisted insights on top of transaction data.",
    highlights: [
      "Multi-asset investment tracking across stocks, crypto, commodities, and real estate with symbol-based tracking.",
      "Domain-driven backend modules for auth, accounts, transactions, investments, and analytics, with JWT and Google/Apple OAuth.",
      "Interactive dashboard for categorizing transactions, scheduling recurring entries, and visualizing financial behavior.",
      "Upcoming: an AI Financial Advisor for cash-flow forecasting and inefficiency detection.",
    ],
    techs: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "TailwindCSS",
      "JWT",
      "OAuth",
      "Docker",
    ],
    explain: {
      normal:
        "Nummoria helps you see where your money actually goes — income, expenses, and investments in one place, with tracking that doesn't feel like spreadsheet busywork.",
      technical:
        "React + Vite frontend backed by a Node.js/Express REST API, MongoDB via Mongoose, JWT and Google/Apple OAuth for auth, domain-driven modules for accounts, transactions, and investments, containerized with Docker.",
      impact: [
        "Live production app at nummoria.com.",
        "Designed, built, and shipped solo — architecture, backend, frontend, and deployment.",
        "Multi-asset investment tracking (stocks, crypto, commodities, real estate) built from scratch.",
      ],
    },
    links: {
      code: "https://github.com/gokmeroz/nummoria",
      live: "https://www.nummoria.com",
    },
  },
  {
    id: "jobpilot",
    title: "JobPilot — Autopilot for Job Applications",
    icon: Plane,
    description:
      "Job searching at scale is repetitive and easy to lose track of — JobPilot turns it into a structured, auditable pipeline instead of blind automation. It's a Python 3.12 tool that discovers roles across job boards and ATS APIs, scores them against a real candidate profile via the Anthropic Claude API, and only submits after a human signs off — automation with a paper trail, built for high-volume job searches without losing control of what goes out under your name.",
    highlights: [
      "Eight-stage pipeline (discover → normalize → gate → dedupe → score → review → apply → sync) backed by a SQLite dedup ledger.",
      "Playwright-driven ATS form fillers for Greenhouse, Ashby, Lever, and Workable, with LinkedIn/Workday routed to a manual review queue.",
      "Review-first by default: every skip is logged with a reason, every application is auditable after the fact.",
      "Open-source and self-hosted — resume, cover letters, and candidate profile never leave the local machine.",
    ],
    techs: [
      "Python",
      "Playwright",
      "Anthropic Claude API",
      "SQLite",
      "Google Sheets API",
      "YAML",
    ],
    explain: {
      normal:
        "JobPilot applies to jobs for you — it finds roles, checks if they're a real fit, and only submits after a human signs off, so nothing goes out under your name without review.",
      technical:
        "Python 3.12 pipeline with 8 explicit stages (discover → normalize → gate → dedupe → score → review → apply → sync), a SQLite dedup ledger, Claude API scoring against a CANDIDATE.md profile, and Playwright-driven ATS form fillers for Greenhouse, Ashby, Lever, and Workable.",
      impact: [
        "Open-sourced on GitHub, self-hosted by design.",
        "Runs review-first by default — every skip and submission is logged with a reason for a fully auditable trail.",
        "Resume, cover letters, and candidate profile never leave the local machine.",
      ],
    },
    links: {
      code: "https://github.com/gokmeroz/jobpilot-autopilot-for-job-applications",
    },
  },
  {
    id: "hft-btc",
    title: "High-Frequency Trading of Bitcoin and Other Coins",
    logoSrc: "/logos/hft_btc.jpg",
    description:
      "In volatile crypto markets, milliseconds matter — this university capstone project, built with teammates Fazlı Altun and Hakan Emir Arslan, explored whether an automated system could detect and execute profitable trades faster than human decision-making. A Python backend handled predictive modeling and trade-signal generation over real-time Binance market data, paired with a React/TypeScript/TailwindCSS dashboard for live prices, trade history, and performance metrics.",
    highlights: [
      "Achieved consistent simulated profitability across market scenarios, outperforming simple momentum and mean-reversion baselines.",
      "Real-time market data pipeline built on the Binance and CoinGecko APIs.",
      "Shared ownership across model design, market-data pipeline, and dashboard as a 3-person team.",
    ],
    techs: [
      "Python",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Binance API",
      "CoinGecko API",
      "Machine Learning",
    ],
    explain: {
      normal:
        "An automated trading system that watches crypto markets in real time and tries to catch profitable trades faster than a human could.",
      technical:
        "Python backend for predictive modeling and trade-signal generation over real-time Binance market data, with a React/TypeScript/TailwindCSS dashboard for live prices, trade history, and performance metrics.",
      impact: [
        "Built as a 3-person university capstone with Fazlı Altun and Hakan Emir Arslan.",
        "Achieved consistent simulated profitability across market scenarios, outperforming simple momentum and mean-reversion baselines.",
        "Shared ownership across model design, market-data pipeline, and dashboard.",
      ],
    },
    links: {
      code: "https://github.com/fazlialtunn/hft-bitcoin-capstone",
    },
  },
  {
    id: "eyehub",
    title: "Eyehub — TÜBİTAK Dyslexia-Detection Research Platform",
    icon: Eye,
    description:
      "Eyehub is a TÜBİTAK-funded (122E085) research project owned by Prof. Günet Eroğlu at Bahçeşehir University, building a dyslexia-detection mobile app for academic research. I contributed as backend engineer — building the Node.js REST API layer and AWS infrastructure behind it, not the project itself.",
    highlights: [
      "Secure Node.js REST APIs supporting mobile synchronization, authentication, and real-time data submission.",
      "AWS infrastructure on EC2 and Lambda for reliable, concurrent research-data ingestion.",
      "MongoDB data models with validation and integrity controls for academic analysis and IRB compliance.",
      "Worked directly with university researchers to translate clinical and academic requirements into production backend workflows on tight milestones.",
    ],
    techs: ["Node.js", "AWS", "EC2", "Lambda", "MongoDB"],
    explain: {
      normal:
        "Eyehub is a university research app that helps detect dyslexia — I built the backend keeping it synced, secure, and feeding clean data to the research team, on a project owned by Prof. Gunet Eroğlu.",
      technical:
        "Node.js REST API layer on AWS (EC2 + Lambda) for a TÜBİTAK-funded (122E085) dyslexia-detection app — handles mobile sync, authentication, and real-time data submission, with MongoDB-backed research data models validated for academic/IRB compliance.",
      impact: [
        "Backend engineer on a TÜBİTAK government-funded research project (122E085), owned by Prof. Gunet Eroğlu at Bahçeşehir University.",
        "Built and deployed the production API and AWS infrastructure supporting concurrent research-data ingestion.",
        "Worked directly with university researchers to turn clinical and academic requirements into shipped backend workflows.",
      ],
    },
    links: {
      code: "https://github.com/eyehub2/eyehub_web",
    },
  },
];
