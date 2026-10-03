import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";

const groups = [
  {
    id: "skills-languages-tools",
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
    id: "skills-frameworks",
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
    id: "skills-ai-ml",
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

const BARS = ["panel-bar--red", "panel-bar--blue", "panel-bar--gold"];

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeader eyebrow="Inventory" title="Skills" />

      <div className="grid gap-8 md:grid-cols-2">
        {groups.map((g, gi) => (
          <div
            key={g.title}
            id={g.id}
            className={`pixel-panel ${g.isNew ? "is-new md:col-span-2" : ""}`}
          >
            <div className={`panel-bar ${BARS[gi % BARS.length]}`}>
              <h3 className="text-inherit">{g.title}</h3>
              {g.isNew && <span className="badge-new">New</span>}
            </div>

            <div className="flex flex-wrap gap-2 p-5">
              {g.items.map((i) => (
                <span key={i} className="pixel-chip">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}