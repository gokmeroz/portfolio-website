// src/sections/Works.tsx
import { useState } from "react";
import { Plane, type LucideIcon } from "lucide-react";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";

type Project = {
  id: "nummoria" | "jobpilot" | "hft-btc";
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

const projects: Project[] = [
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
];

function ActionLink({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "primary";
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      className={`pixel-btn ${variant === "primary" ? "primary" : ""}`}
    >
      {children}
    </a>
  );
}

type ExplainMode = "normal" | "technical" | "impact";

const EXPLAIN_MODES: { key: ExplainMode; label: string }[] = [
  { key: "normal", label: "Explain Normally" },
  { key: "technical", label: "Explain Technically" },
  { key: "impact", label: "Business Impact" },
];

function ExplainToggle({
  explain,
  panelId,
}: {
  explain: Project["explain"];
  panelId: string;
}) {
  const [mode, setMode] = useState<ExplainMode>("normal");

  return (
    <div className="mt-5 border-t-2 border-[var(--color-border)] pt-5">
      <div
        role="group"
        aria-label="Explanation depth"
        className="flex flex-wrap gap-2"
      >
        {EXPLAIN_MODES.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            aria-pressed={mode === key}
            aria-controls={panelId}
            onClick={() => setMode(key)}
            className={`pixel-chip cursor-pointer ${mode === key ? "is-active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div id={panelId} aria-live="polite" className="mt-3">
        {mode === "impact" ? (
          <ul className="space-y-2">
            {explain.impact.map((line) => (
              <li
                key={line}
                className="flex gap-3 text-lg leading-7 text-[var(--color-text-base)]/85"
              >
                <span
                  aria-hidden="true"
                  className="mt-[6px] shrink-0 font-pixel-ui text-[10px] text-[var(--color-accent-2)]"
                >
                  &gt;
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg leading-7 text-[var(--color-text-base)]/85">
            {mode === "normal" ? explain.normal : explain.technical}
          </p>
        )}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const Icon = project.icon;
  const explainPanelId = `explain-panel-${index}`;
  return (
    <article
      id={`project-${project.id}`}
      className="fade-up pixel-panel p-6"
      style={{ animationDelay: `${index * 110}ms` }}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-start">
        {/* Logo */}
        <div className="flex items-start">
          <div className="flex h-14 w-14 items-center justify-center border-[3px] border-[var(--color-border)] bg-[var(--color-surface-2)] p-2">
            {Icon ? (
              <Icon
                className="h-7 w-7 text-[var(--color-accent-3)]"
                strokeWidth={1.75}
              />
            ) : (
              <img
                src={project.logoSrc}
                alt={`${project.title} logo`}
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/logos/nummoria_logo.png";
                }}
              />
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="min-w-0">
          <h3 className="font-pixel-ui text-sm tracking-wide text-[var(--color-text-base)] sm:text-base">
            {project.title}
          </h3>

          <p className="mt-4 text-lg leading-7 text-[var(--color-text-base)]/85">
            {project.description}
          </p>

          {project.highlights.length > 0 && (
            <ul className="mt-5 space-y-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-base leading-6 text-[var(--color-text-base)]/75"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[2px] shrink-0 font-pixel-ui text-[10px] text-[var(--color-accent-2)]"
                  >
                    &gt;
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          <ExplainToggle explain={project.explain} panelId={explainPanelId} />

          <div className="mt-5">
            <span className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
              Tech Stack
            </span>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {project.techs.map((tech) => (
                <span key={tech} className="pixel-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-row flex-wrap items-start gap-2 lg:w-[110px] lg:flex-col lg:justify-start">
          {project.links.what && (
            <ActionLink href={project.links.what}>What</ActionLink>
          )}

          {project.links.code && (
            <ActionLink href={project.links.code}>Code</ActionLink>
          )}

          {project.links.live && project.links.live !== "#" && (
            <ActionLink href={project.links.live} variant="primary">
              Live
            </ActionLink>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Works() {
  return (
    <Section id="projects">
      <SectionHeader
        eyebrow="Quest Log"
        title="Projects & Works"
        description="A selection of systems I built across fintech, AI-driven automation, and algorithmic trading — focused on product thinking, scalable backend architecture, and clear user-facing execution."
      />

      <div className="space-y-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}