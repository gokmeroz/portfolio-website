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
];

export default function Skills() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 border-t border-white/5">
      <h2 className="uppercase tracking-[0.25em] text-xs text-[var(--color-text-muted)]">
        Skills
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {groups.map((g) => (
          <div
            key={g.title}
            className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-hud)] backdrop-blur-xl"
          >
            {/* subtle top glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-2)]/70 to-transparent" />

            {/* subtle corner glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-[var(--color-accent-2)]/10 blur-3xl" />

            <h3 className="relative text-sm font-semibold tracking-wide text-[var(--color-text-base)]">
              {g.title}
            </h3>

            <div className="relative mt-4 flex flex-wrap gap-2.5">
              {g.items.map((i) => (
                <span
                  key={i}
                  className="
                    inline-flex items-center rounded-full
                    border border-[var(--color-border)]
                    bg-white/[0.04]
                    px-3 py-1.5
                    text-xs font-medium tracking-wide
                    text-[var(--color-text-base)]
                    shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
                    transition
                    hover:-translate-y-[1px]
                    hover:border-[var(--color-border-strong)]
                    hover:bg-white/[0.07]
                  "
                >
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