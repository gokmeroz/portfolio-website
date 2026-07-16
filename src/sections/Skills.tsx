const groups = [
  {
    title: "Languages & Tools",
    items: [
      "TypeScript",
      "Node.js",
      "C#",
      ".NET",
      "Python",
      "SQL",
      "MongoDB",
      "Git",
      "RabbitMQ",
      "Docker",
      "AWS",
      "AI Agents",
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: [
      "React",
      "Node.js",
      "React Native",
      "Express",
      "Tailwind",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    title: "AI / ML & Automation",
    isNew: true,
    items: [
      "PyTorch",
      "scikit-learn",
      "Pandas",
      "NumPy",
      "Anthropic Claude API",
      "MLOps",
      "Playwright",
    ],
  },
];

export default function Skills() {
  return (
    <section className="py-16 border-t border-white/5">
      <p className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
        Inventory
      </p>
      <h2 className="mt-2 font-display text-[clamp(14px,2.4vw,18px)] text-[var(--color-text-base)]">
        Skills
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {groups.map((g, gi) => (
          <div
            key={g.title}
            className={`fade-up pixel-panel p-6 ${
              g.isNew ? "is-new md:col-span-2" : ""
            }`}
            style={{ animationDelay: `${gi * 90}ms` }}
          >
            <div className="flex items-center gap-2.5">
              <h3 className="font-pixel-ui text-xs uppercase tracking-wide text-[var(--color-text-base)]">
                {g.title}
              </h3>
              {g.isNew && <span className="badge-new">New</span>}
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {g.items.map((i) => (
                <span key={i} className="pixel-chip">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}