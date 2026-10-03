import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";

function ExperienceItem(props: {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}) {
  const { id, title, company, location, date, bullets } = props;
  return (
    <li>
      <article id={id} className="pixel-panel">
        <div className="panel-bar">
          <span>{date}</span>
          <span>{location}</span>
        </div>
        <div className="p-4 sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.06em] text-[var(--color-accent)]">
            {company}
          </p>
          <h3 className="mt-2 text-lg font-extrabold leading-7 text-[var(--color-text-base)] sm:text-xl">
            {title}
          </h3>

          <ul className="pixel-list mt-5 max-w-4xl text-base leading-7 text-[var(--color-text-base)]">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </article>
    </li>
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
    <article className="pixel-panel pixel-panel--blue">
      <div className="panel-bar panel-bar--blue">
        <span>{date}</span>
        <span>{location}</span>
      </div>
      <div className="p-4 sm:p-6">
        <p className="text-sm font-bold uppercase tracking-[0.06em] text-[var(--color-accent)]">
          {school}
        </p>
        <h3 className="mt-2 text-lg font-extrabold leading-7 text-[var(--color-text-base)] sm:text-xl">
          {degree}
        </h3>
      </div>
    </article>
  );
}

export default function About() {
  return (
    <Section id="about">
      <SectionHeader eyebrow="Career Log" title="Experience" />
      <ol className="timeline">
        <ExperienceItem
          id="exp-halkbank"
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
          id="exp-eyehub"
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
          id="exp-compro"
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
      </ol>

      <div className="mt-16">
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
