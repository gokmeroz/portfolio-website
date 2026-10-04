// src/sections/Works.tsx
import { useState } from "react";
import { Github, Play } from "lucide-react";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import PipelineMachine from "../components/pixelScenes/PipelineMachine";
import { projects, type Project } from "../data/projects";

function ActionLink({
  href,
  children,
  variant = "default",
  kind,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "primary";
  kind?: "code" | "live";
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      className={`pixel-btn min-w-28 ${variant === "primary" ? "primary" : ""}`}
    >
      {kind === "code" && (
        <Github size={12} strokeWidth={2.25} className="mr-2" />
      )}
      {kind === "live" && (
        <span className="pixel-live-dot" aria-hidden="true" />
      )}
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
    <div className="border-4 border-dashed border-[var(--color-border)] bg-[var(--color-bg-base)] p-4">
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

      <div id={panelId} aria-live="polite" className="mt-4">
        {mode === "impact" ? (
          <ul className="pixel-list text-base leading-7 text-[var(--color-text-base)]">
            {explain.impact.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <p className="text-base leading-7 text-[var(--color-text-base)]">
            {mode === "normal" ? explain.normal : explain.technical}
          </p>
        )}
      </div>
    </div>
  );
}

// Dark "screen" strip across the top of a card. Shows the poster with a large
// play button; the video itself is only mounted (and fetched) once played.
function ProjectTrailer({
  trailer,
  title,
}: {
  trailer: NonNullable<Project["trailer"]>;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="border-b-4 border-[var(--color-border)] bg-[var(--color-ink)] p-4 sm:p-6">
      <div className="relative mx-auto aspect-video max-w-4xl">
        {playing ? (
          <video
            className="block h-full w-full"
            src={trailer.src}
            poster={trailer.poster}
            aria-label={trailer.label}
            controls
            autoPlay
            autoFocus
            playsInline
          />
        ) : (
          <button
            type="button"
            className="group block h-full w-full cursor-pointer"
            aria-label={`Play the trailer for ${title} (${trailer.duration}, with sound)`}
            onClick={() => setPlaying(true)}
          >
            <img
              src={trailer.poster}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="caption-box absolute left-3 top-3">
              Trailer / {trailer.duration}
            </span>
            <span className="absolute inset-0 flex items-end justify-center pb-6 sm:pb-10">
              <span className="btn-accent group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
                <Play
                  size={14}
                  fill="currentColor"
                  className="mr-3 shrink-0"
                  aria-hidden="true"
                />
                Play trailer
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

// One accent per issue, cycling down the list.
const ISSUE_STYLES = [
  { bar: "panel-bar--red", panel: "pixel-panel--red" },
  { bar: "panel-bar--blue", panel: "pixel-panel--blue" },
  { bar: "panel-bar--gold", panel: "pixel-panel--gold" },
  { bar: "", panel: "" },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const Icon = project.icon;
  const explainPanelId = `explain-panel-${index}`;
  const style = ISSUE_STYLES[index % ISSUE_STYLES.length];
  // JobPilot's card can run its pipeline as a small live demo
  const hasDemo = project.id === "jobpilot";
  const [demoOpen, setDemoOpen] = useState(false);
  const demoId = `project-demo-${project.id}`;
  const { trailer } = project;
  return (
    <article id={`project-${project.id}`} className={`pixel-panel ${style.panel}`}>
      <div className={`panel-bar !flex-nowrap !justify-start !gap-4 ${style.bar}`}>
        {/* Logo */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-1.5">
          {Icon ? (
            <Icon
              className="h-6 w-6 text-[var(--color-ink)]"
              strokeWidth={2}
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
        <div className="min-w-0">
          <p aria-hidden="true">Issue #{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-1 font-sans text-base font-extrabold normal-case leading-6 tracking-normal text-inherit sm:text-lg">
            {project.title}
          </h3>
        </div>
      </div>

      {trailer && <ProjectTrailer trailer={trailer} title={project.title} />}

      <div className="grid grid-cols-1 gap-8 p-4 sm:p-6 lg:grid-cols-2">
        {/* Story */}
        <div className="min-w-0">
          <p className="text-lg leading-8 text-[var(--color-text-base)]">
            {project.description}
          </p>

          {project.highlights.length > 0 && (
            <ul className="pixel-list mt-6 text-base leading-7 text-[var(--color-text-base)]">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Explain / stack / actions */}
        <div className="flex min-w-0 flex-col gap-6">
          <ExplainToggle explain={project.explain} panelId={explainPanelId} />

          <div>
            <span className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
              Tech Stack
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techs.map((tech) => (
                <span key={tech} className="pixel-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-5 pb-2">
            {project.links.what && (
              <ActionLink href={project.links.what}>What</ActionLink>
            )}

            {project.links.code && (
              <ActionLink href={project.links.code} kind="code">
                Code
              </ActionLink>
            )}

            {project.links.live && project.links.live !== "#" && (
              <ActionLink href={project.links.live} variant="primary" kind="live">
                Live
              </ActionLink>
            )}

            {hasDemo && (
              <button
                type="button"
                className="pixel-btn primary"
                aria-expanded={demoOpen}
                aria-controls={demoId}
                onClick={() => setDemoOpen(!demoOpen)}
              >
                {demoOpen ? "Hide pipeline" : "Run the pipeline"}
              </button>
            )}
          </div>
        </div>
      </div>

      {hasDemo && demoOpen && (
        <div
          id={demoId}
          className="border-t-4 border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 sm:p-6"
        >
          <div className="pixel-panel mx-auto max-w-xl">
            <PipelineMachine />
          </div>
        </div>
      )}
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

      <div className="space-y-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}