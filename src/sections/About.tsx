import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";

function ExperienceItem(props: {
  title: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}) {
  const { title, company, location, date, bullets } = props;
  return (
    <article className="pixel-panel p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
            {company}
          </p>
          <h3 className="mt-1.5 font-pixel-ui text-sm tracking-wide text-[var(--color-text-base)] sm:text-base">
            {title}
          </h3>
        </div>
        <p className="shrink-0 font-pixel-ui text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
          {location} &middot; {date}
        </p>
      </div>

      <ul className="mt-4 space-y-3">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-3 text-base leading-6 text-[var(--color-text-base)]/75"
          >
            <span
              aria-hidden="true"
              className="mt-[2px] shrink-0 font-pixel-ui text-[10px] text-[var(--color-accent-2)]"
            >
              &gt;
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function EducationItem(props: {
  degree: string;
  school: string;
  location: string;
  date: string;
}) {
  const { degree, school, location, date } = props;
  return (
    <article className="pixel-panel p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
            {school}
          </p>
          <h3 className="mt-1.5 font-pixel-ui text-sm tracking-wide text-[var(--color-text-base)] sm:text-base">
            {degree}
          </h3>
        </div>
        <p className="shrink-0 font-pixel-ui text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
          {location} &middot; {date}
        </p>
      </div>
    </article>
  );
}

export default function About() {
  return (
    <Section id="about">
      <SectionHeader eyebrow="Career Log" title="Experience" />
      <div className="space-y-6">
        <ExperienceItem
          title="Full-Stack Software Engineering Intern"
          company="Halkbank — One of Turkey's Largest State-Owned Banks"
          location="Istanbul, Turkey"
          date="Apr 2025 - Jul 2025"
          bullets={[
            "Contributed to a Personnel Absence System serving 10,000+ employees, implementing attendance-tracking logic in C#/.NET Core across 75+ relational tables (holidays, medical leave, approval workflows).",
            "Built a full-stack Angular + ASP.NET Core solution for real-time reporting and high-volume data processing across 800+ branch-level operations nationwide.",
            "Delivered features end-to-end in an enterprise Agile/Scrum environment, participating in sprint planning, code reviews, and production deployments.",
          ]}
        />
        <ExperienceItem
          title="Backend Engineer"
          company="Eyehub — TUBITAK Government Research Project 122E085"
          location="Istanbul, Turkey"
          date="Nov 2023 - Jun 2024"
          bullets={[
            "Served as backend engineer for a government-funded (TUBITAK) dyslexia-detection mobile app, designing and deploying scalable backend infrastructure on AWS (EC2, Lambda) for concurrent research data ingestion.",
            "Modeled complex medical datasets in MongoDB (NoSQL), enforcing strict data-integrity standards for academic analysis and IRB compliance.",
            "Built secure, high-performance RESTful APIs in Node.js powering mobile client sync, authentication, and real-time data submission.",
            "Collaborated directly with university researchers under Prof. Gunet Eroglu, translating clinical requirements into production-grade backend systems on tight academic milestones.",
          ]}
        />
        <ExperienceItem
          title="Software Engineering Intern"
          company="ComPro — IBM Platinum Partner"
          location="Istanbul, Turkey"
          date="Aug 2023 - Sep 2023"
          bullets={[
            "Contributed to enterprise cloud migration projects at Turkey's leading IBM Platinum Partner, gaining production-level experience with Docker containerization, CI/CD pipelines, and Linux system administration.",
            "Built proof-of-concept Docker environments for legacy backend modernization, enabling faster iteration cycles for internal dev teams and client demos.",
            "Conducted technical evaluation of IBM Cloud vs. AWS for containerized workloads, analyzing cost/performance trade-offs across compute, storage, and orchestration to inform client migration strategy.",
          ]}
        />
      </div>

      <div className="mt-12">
        <SectionHeader eyebrow="Academy Log" title="Education" />
        <EducationItem
          degree="B.Sc. in Computer Engineering"
          school="Bahçeşehir University"
          location="Istanbul, Turkey"
          date="Oct 2021 - Aug 2025"
        />
      </div>
    </Section>
  );
}
