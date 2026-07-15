// src/sections/Works.tsx
import { Plane, type LucideIcon } from "lucide-react";

type Project = {
  title: string;
  logoSrc?: string;
  icon?: LucideIcon;
  why: string;
  what: string;
  how: string;
  techs: string[];
  links: {
    what?: string;
    code?: string;
    live?: string;
  };
};

const projects: Project[] = [
  {
    title: "NUMMORIA ~ AI-Powered Personal Finance System",
    logoSrc: "/logos/nummoria_logo.png",
    why: "Most finance apps fail at one of two extremes: they’re either overly simplistic or unnecessarily complex. Users do not want accounting software — they want clarity. Nummoria was built to bridge that gap. It provides a unified, intuitive system where income, expenses, and investments coexist seamlessly. Instead of forcing users into spreadsheets or fragmented tools, it delivers a clear financial picture through structured data, visual insights, and frictionless tracking. What began as a personal need for control evolved into a scalable system designed to make financial awareness effortless and consistent.",
    how: "Nummoria is built as a modular full-stack system. The backend leverages Node.js and Express with MongoDB/Mongoose, organized into domain-driven modules such as auth, accounts, transactions, investments, and analytics. It supports JWT-based authentication alongside OAuth with Google and Apple for seamless onboarding. The frontend is developed with React, Vite, and TailwindCSS, delivering a high-performance dashboard with real-time summaries, filtering, and data visualization. Communication is handled through a secure REST API with strict CORS policies and environment-based configuration. The architecture is designed for extensibility, enabling AI integration to analyze transaction patterns, detect behavioral trends, and generate actionable financial insights.",
    what: "The platform enables users to manage their complete financial lifecycle. Core features include secure authentication, multi-account management, and structured tracking of income, expenses, and investments. Users can categorize transactions, schedule recurring entries, and analyze their financial behavior through interactive charts and summaries. The investment module supports multiple asset classes such as stocks, crypto, commodities, and real estate with symbol-based tracking. Reporting tools provide breakdowns by category, account, and currency, turning raw financial data into actionable insight. Upcoming iterations introduce an AI Financial Advisor capable of forecasting cash flow, identifying inefficiencies, and recommending optimizations.",
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
    links: {
      code: "https://github.com/gokmeroz/nummoria",
      live: "https://www.nummoria.com",
    },
  },
  {
    title: "JobPilot — Autopilot for Job Applications",
    icon: Plane,
    why: "Job searching at scale is repetitive, error-prone, and easy to lose track of — the same form filled out a hundred times, with no record of what was applied to or why a role got skipped. JobPilot turns that grind into a structured, auditable pipeline: discover roles across job boards and ATS APIs, filter and score them against a real candidate profile, and only touch a submit button after a human has signed off. The goal was never full automation for its own sake — it's automation with a paper trail, built for high-volume job searches without losing control of what gets sent out under your name.",
    how: "JobPilot is a Python 3.12 pipeline with eight explicit stages — discover, normalize, gate, dedupe, score, review, apply, sync — backed by a SQLite ledger for deduplication. Role fit is scored by the Anthropic Claude API against a CANDIDATE.md profile using a configurable rubric, so nothing about a candidate's background is invented; unmapped fields route straight to manual review instead of being guessed. Playwright drives the actual applications through a BaseFormFiller abstraction with dedicated fillers for Greenhouse, Ashby, Lever, and Workable (LinkedIn and Workday fall back to a manual queue), and a prefetch() hook runs LLM calls before any browser navigation so an in-flight API call can't kill the Playwright session. Every run syncs to Google Sheets for a clean, reviewable application ledger.",
    what: "In review-first mode, the pipeline stops after scoring and writes a review file so specific jobs get approved before anything is submitted; full-auto mode submits automatically on supported ATS platforms and queues the rest. Every skip is logged with a reason, every application is auditable after the fact, and PII — resume, cover letters, CANDIDATE.md — never leaves the local machine. It's an open-source, self-hosted tool built to bring the same rigor to job hunting as any production pipeline.",
    techs: [
      "Python",
      "Playwright",
      "Anthropic Claude API",
      "SQLite",
      "Google Sheets API",
      "YAML",
    ],
    links: {
      code: "https://github.com/gokmeroz/jobpilot-autopilot-for-job-applications",
    },
  },
  {
    title: "High-Frequency Trading of Bitcoin and Other Coins",
    logoSrc: "/logos/hft_btc.jpg",
    why: "In volatile crypto markets, even milliseconds matter. This project explored how an automated system could detect and execute profitable trades faster than human decision-making. The goal was to demonstrate how algorithmic trading and machine learning could be combined to optimize returns under real-time market conditions.",
    how: "Built collaboratively as a university capstone project with my teammates Fazlı Altun and Hakan Emir Arslan, the system combined machine learning models and real-time market pipelines through Binance APIs. The backend was developed in Python for predictive modeling and trade signal generation, while the frontend used React, TypeScript, and TailwindCSS to visualize live market data, trade history, and performance metrics.",
    what: "The final model achieved consistent simulated profitability across different market scenarios, demonstrating how intelligent strategies can outperform simpler momentum or mean-reversion baselines. Beyond the academic result, the project deepened our understanding of scalability, latency, model evaluation, and the challenge of turning quantitative logic into usable trading decisions.",
    techs: [
      "Python",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Binance API",
      "CoinGecko API",
      "Machine Learning",
    ],
    links: {
      code: "https://github.com/fazlialtunn/hft-bitcoin-capstone",
    },
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
      {children}
    </span>
  );
}

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
      className={[
        "inline-flex items-center justify-center rounded-xl px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition",
        variant === "primary"
          ? "border border-[var(--color-border-strong)] bg-[var(--color-accent)]/12 text-[var(--color-text-base)] hover:-translate-y-[1px] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/18"
          : "border border-[var(--color-border)] bg-white/[0.03] text-[var(--color-text-base)] hover:-translate-y-[1px] hover:border-[var(--color-accent-2)] hover:bg-white/[0.06]",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

function TechChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium tracking-[0.04em] text-[var(--color-text-base)] transition hover:border-[var(--color-border-strong)] hover:bg-white/[0.07]">
      {label}
    </span>
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
  return (
    <article
      className="fade-up group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-hud)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)]"
      style={{ animationDelay: `${index * 110}ms` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-2)]/70 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-12 bottom-0 h-28 w-28 rounded-full bg-[var(--color-accent-2)]/10 blur-3xl" />

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-start">
        {/* Logo */}
        <div className="flex items-start">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-black/20 p-2 shadow-[0_0_20px_rgba(0,0,0,0.18)]">
            {Icon ? (
              <Icon
                className="h-7 w-7 text-[var(--color-accent-3)]"
                strokeWidth={1.75}
              />
            ) : (
              <img
                src={project.logoSrc}
                alt={`${project.title} logo`}
                className="h-full w-full rounded-xl object-contain"
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
          <h3 className="text-lg font-extrabold tracking-tight text-[var(--color-text-base)] sm:text-xl">
            {project.title}
          </h3>

          <div className="mt-5 space-y-5">
            <div>
              <SectionLabel>Why</SectionLabel>
              <p className="mt-2 text-sm leading-7 text-white/78 sm:text-[15px]">
                {project.why}
              </p>
            </div>

            <div>
              <SectionLabel>How</SectionLabel>
              <p className="mt-2 text-sm leading-7 text-white/78 sm:text-[15px]">
                {project.how}
              </p>
            </div>

            <div>
              <SectionLabel>What</SectionLabel>
              <p className="mt-2 text-sm leading-7 text-white/78 sm:text-[15px]">
                {project.what}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <SectionLabel>Tech Stack</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {project.techs.map((tech) => (
                <TechChip key={tech} label={tech} />
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

function Divider() {
  return <div className="hr-soft mt-10" />;
}

export default function Works() {
  return (
    <section id="projects" className="scroll-mt-24 py-10">
      <div className="mb-6">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
          Selected Work
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--color-text-base)] sm:text-3xl">
          Projects &amp; Works
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65 sm:text-[15px]">
          A selection of systems I built across fintech, AI-driven
          automation, and algorithmic trading — focused on product thinking,
          scalable backend architecture, and clear user-facing execution.
        </p>
      </div>

      <div className="space-y-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      <Divider />
    </section>
  );
}