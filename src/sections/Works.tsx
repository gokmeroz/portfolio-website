type Project = {
  title: string;
  logoText: string;
  why: string;
  what: string;
  how: string;
  techs: string[];
  links: { what?: string; code?: string; live?: string };
};

const projects: Project[] = [
  {
    title: "NUMMORIA ~ Personalized Finance Tracker",
    logoText: "src/assets/nummoria_logo.png",
    what: "Nummoria is a full-stack personal finance application that helps you manage expenses, income, investments, and accounts in one place..",
    why: "To help users to track their transactions and build better financial habits.",
    how: "Stack + approach in a sentence.",
    techs: ["React.js", "Node.js", "MongoDB", "Vue.js", "Tailwindcss"],
    links: {
      code: "https://github.com/gokmeroz/nummoria",
      live: "https://www.nummoria-finance.com",
    },
  },
  {
    title: "Project 2",
    logoText: "2",
    why: "Problem & value proposition.",
    how: "How you built it.",
    what: "Performance/users/etc.",
    techs: ["Next.js", "Prisma", "Tailwind"],
    links: { code: "#", live: "#" },
  },
];

function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-6 items-start">
      <div className="flex items-center gap-3">
        <img
          src={p.logoText}
          alt="Project Logo"
          className="h-8 w-8 rounded-full object contain"
        />
      </div>

      <div>
        <h3 className="text-lg font-bold">{p.title}</h3>
        <ul className="mt-2 space-y-1 text-neutral-300">
          <li>
            <span className="font-semibold">WHY?</span> {p.why}
          </li>
          <li>
            <span className="font-semibold">HOW?</span> {p.how}
          </li>
          <li>
            <span className="font-semibold">what?</span> {p.what}
          </li>
        </ul>
        <div className="mt-3 text-sm">
          <span className="opacity-80">TECHS USED:</span> {p.techs.join(", ")}
        </div>
      </div>

      <div className="flex md:flex-col gap-3 md:gap-2 justify-end md:justify-start text-right md:text-left">
        {p.links.what && (
          <a
            href={p.links.what}
            className="underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            what?
          </a>
        )}
        {p.links.code && (
          <a
            href={p.links.code}
            className="underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            CODE?
          </a>
        )}
        {p.links.live && (
          <a
            href={p.links.live}
            className="underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            LIVE?
          </a>
        )}
      </div>
    </div>
  );
}

export default function Works() {
  return (
    <section id="projects" className="scroll-mt-24 py-6">
      <h2 className="text-2xl font-extrabold tracking-tight">
        Projects &amp; Works
      </h2>
      <div className="mt-6 space-y-8">
        {projects.map((p, i) => (
          <ProjectCard key={i} p={p} />
        ))}
      </div>
      <Divider />
    </section>
  );
}
