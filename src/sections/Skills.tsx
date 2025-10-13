const groups = [
  {
    title: "Languages & Tools",
    items: [
      "TypeScript",
      "JavaScript",
      "C#",
      ".NET",
      "SQL",
      "MongoDB",
      "Git",
      "Postman",
      "Docker",
      "AWS",
    ],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React", "Node.js", "Express", "Tailwind", "Framer Motion", "Vite"],
  },
];

export default function Skills() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 border-t border-black/10">
      <h2 className="uppercase tracking-[0.25em] text-xs text-zinc-500">
        Skills
      </h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {groups.map((g) => (
          <div key={g.title} className="p-5 border rounded-2xl bg-white">
            <h3 className="text-sm font-semibold">{g.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.items.map((i) => (
                <span key={i} className="text-xs bg-zinc-100 px-2 py-1 rounded">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
