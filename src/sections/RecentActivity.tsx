// src/sections/RecentActivity.tsx
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";

type Activity = {
  id: string;
  title: string;
  org: string;
  role: string;
  period: string;
  status: "ongoing" | "upcoming" | "completed";
  description: string;
  highlights?: string[];
  tags: string[];
  link?: string;
};

const activities: Activity[] = [
  {
    id: "reprobot",
    title: "ReproBot — Automated ML Paper Replication",
    org: "inzva AI Projects #10",
    role: "AI Project Contributor",
    period: "Jun 2026 — Present",
    status: "ongoing",
    description:
      "Contributing to the design and development of ReproBot, a multi-agent AI pipeline that transforms machine learning research papers into executable replication workflows. The system is designed to extract experimental details, generate code, run experiments safely, and compare reproduced results against published claims.",
    highlights: [
      "Reader Agent: extracts methods, datasets, metrics, claims, figures, tables, and hyperparameters from research PDFs using document-parsing and vision-language tooling.",
      "Coder and Runner Agents: generate PyTorch and Hugging Face experiment scripts, execute them inside Docker, and capture metrics, logs, and error traces.",
      "Critic and Orchestrator: compare reproduced results with paper claims and coordinate targeted code revisions through an iterative feedback loop.",
      "Evaluation: planned benchmarking across 20 image-classification papers using replication success, metric gaps, and refinement-loop ablation.",
    ],
    tags: [
      "Python",
      "PyTorch",
      "Hugging Face",
      "LLM / VLM",
      "Multi-Agent Systems",
      "LangChain",
      "Docker",
      "Scientific Reproducibility",
    ],
    link: "https://inzva.com/ai-projects",
  },
];

const STATUS_LABEL: Record<Activity["status"], string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
};

function StatusChip({ status }: { status: Activity["status"] }) {
  const color =
    status === "ongoing"
      ? "text-[var(--color-accent-2)] border-[var(--color-accent-2)]"
      : status === "upcoming"
        ? "text-[var(--color-accent-3)] border-[var(--color-accent-3)]"
        : "text-[var(--color-text-muted)] border-[var(--color-border)]";

  return (
    <span
      className={`shrink-0 border-[2px] px-2 py-1 font-pixel-ui text-[9px] uppercase tracking-[0.12em] ${color}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function ActivityCard({
  activity,
  index,
}: {
  activity: Activity;
  index: number;
}) {
  const cardClassName =
    "fade-up pixel-panel block p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]";

  const cardContent = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
            {activity.org}
          </p>

          <h3 className="mt-1.5 font-pixel-ui text-sm tracking-wide text-[var(--color-text-base)] sm:text-base">
            {activity.title}
          </h3>
        </div>

        <StatusChip status={activity.status} />
      </div>

      <p className="mt-3 font-pixel-ui text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
        {activity.role} · {activity.period}
      </p>

      <p className="mt-4 text-lg leading-7 text-[var(--color-text-base)]/85">
        {activity.description}
      </p>

      {activity.highlights && activity.highlights.length > 0 && (
        <ul className="mt-5 space-y-3">
          {activity.highlights.map((highlight) => (
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

      <div className="mt-5 flex flex-wrap gap-2.5">
        {activity.tags.map((tag) => (
          <span key={tag} className="pixel-chip">
            {tag}
          </span>
        ))}
      </div>

      {activity.link && (
        <p className="mt-5 font-pixel-ui text-[9px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
          View inzva AI Projects ↗
        </p>
      )}
    </>
  );

  if (activity.link) {
    return (
      <a
        id={`activity-${activity.id}`}
        href={activity.link}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`View ${activity.title} at ${activity.org}`}
        className={cardClassName}
        style={{ animationDelay: `${index * 110}ms` }}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <article
      id={`activity-${activity.id}`}
      className={cardClassName}
      style={{ animationDelay: `${index * 110}ms` }}
    >
      {cardContent}
    </article>
  );
}

export default function RecentActivity() {
  return (
    <Section id="recent-activity">
      <SectionHeader
        eyebrow="Research Log"
        title="Recent Activity"
        description="Current research and collaborative engineering work beyond my shipped products."
      />

      <div className="space-y-8">
        {activities.map((activity, index) => (
          <ActivityCard
            key={activity.title}
            activity={activity}
            index={index}
          />
        ))}
      </div>
    </Section>
  );
}
