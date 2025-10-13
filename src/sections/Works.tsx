import WorkCard from "../components/WorkCard";

export default function Works() {
  const projects = [
    {
      title: "Nummoria — Personal Finance Tracker",
      tag: "Full-stack",
      year: "2025",
      summary: "Track income/expenses/investments with clean UI and AI helper.",
      code: "https://github.com/gokmeroz/nummoria",
      live: "#",
    },
    {
      title: "Eyehub — TÜBİTAK 122E085",
      tag: "Backend + AWS",
      year: "2025",
      summary:
        "Dyslexia detection tools & research workflows; backend and infra.",
    },
    {
      title: "Meeting Room App — Halkbank",
      tag: "ASP.NET MVC",
      year: "2024",
      summary:
        "Scheduling, roles & equipment management in enterprise context.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 border-t border-black/10">
      <h2 className="uppercase tracking-[0.25em] text-xs text-zinc-500">
        Selected Works / <span className="lowercase">(Projects)</span>
      </h2>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <WorkCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  );
}
