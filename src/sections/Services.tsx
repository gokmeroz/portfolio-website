const items = [
  {
    title: "Backend APIs & Services",
    text: "Design and ship robust REST/JSON APIs with Node.js/Express or .NET 7+, focus on clean architecture, validation, and DX.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M3 5h18v4H3zM3 11h8v8H3zM13 11h8v8h-8z" />
      </svg>
    ),
  },
  {
    title: "Full-stack Web (React/Next.js)",
    text: "Killer UIs with React + Tailwind, SSR/SSG with Next.js, forms, dashboards, and real-time features wired to your API.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M4 4h16v6H4zM4 14h7v6H4zM13 14h7v6h-7z" />
      </svg>
    ),
  },
  {
    title: "Data Ingestion & Analytics",
    text: "CSV/PDF import, parsing pipelines, and metrics. Python/Node ETL, aggregation, and reporting you can act on.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M3 3h4v18H3zM9 9h4v12H9zM15 5h4v16h-4z" />
      </svg>
    ),
  },
  {
    title: "Fintech Integrations",
    text: "Bank syncing, minor-unit math, multi-currency, Stripe/PayPal, and clean financial models (Nummoria-style).",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M4 6h16v12H4zM7 9h10v2H7zm0 4h6v2H7z" />
      </svg>
    ),
  },
  {
    title: "AI Assistants & Automation",
    text: "OpenAI-powered features, retrieval (RAG), summarizers, and workflow bots that save real time and money.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M12 2l4 4-4 4-4-4 4-4zm0 6v14m-6-4h12" />
      </svg>
    ),
  },
  {
    title: "Security & Auth",
    text: "JWT/OAuth2, RBAC, input sanitization, rate-limiting, and secure secrets management from day one.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M12 2a5 5 0 015 5v1h1a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h1V7a5 5 0 015-5zm-3 6h6V7a3 3 0 00-6 0v1z"
        />
      </svg>
    ),
  },
  {
    title: "DevOps & Cloud",
    text: "Docker, CI/CD, logging, and AWS deployments. Sensible infra that scales without drama.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M6 18h12l3-6-3-6H6L3 12l3 6zM6 12h12" />
      </svg>
    ),
  },
  {
    title: "Performance & Observability",
    text: "Profiling, caching, pagination, and tracing. Faster endpoints, smaller payloads, happier users.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M3 13l4-4 4 4 6-6 4 4v7H3z" />
      </svg>
    ),
  },
];

function Divider() {
  return <div className="hr-soft mt-10" />;
}

export default function Services() {
  return (
    <section className="scroll-mt-24 py-10">
      <div className="mb-6">
        <p className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
          Build Menu
        </p>
        <h2 className="mt-2 font-display text-[clamp(14px,2.6vw,20px)] text-[var(--color-text-base)]">
          What I Build
        </h2>
        <p className="mt-3 max-w-3xl text-lg leading-7 text-[var(--color-text-base)]/70">
          Backend-leaning full-stack solutions with data-driven features and
          fintech-grade reliability. Clean code, measurable outcomes.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((s, i) => (
          <article
            key={s.title}
            className="fade-up pixel-panel p-6"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div className="flex h-9 w-9 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-accent-2)]">
              {s.icon}
            </div>
            <h3 className="mt-4 font-pixel-ui text-sm tracking-wide text-[var(--color-text-base)]">
              {s.title}
            </h3>
            <p className="mt-2 text-base leading-6 text-[var(--color-text-base)]/70">
              {s.text}
            </p>
          </article>
        ))}
      </div>

      <Divider />
    </section>
  );
}
