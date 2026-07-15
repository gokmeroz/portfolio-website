function Divider() {
  return <div className="hr-soft" />;
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:gap-6">
      {children}
    </div>
  );
}

function ExperienceItem(props: {
  title: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
}) {
  const { title, company, location, date, bullets } = props;
  return (
    <Row>
      <div>
        <h3 className="tracking-wide">{title}</h3>
        <div className="text-neutral-300">
          <div className="font-semibold">{company}</div>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-right md:text-left flex md:block items-center justify-between md:justify-end">
        <div className="text-neutral-300">{location}</div>
        <div className="font-medium mt-1 md:mt-2">{date}</div>
      </div>
    </Row>
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
    <Row>
      <div>
        <h3 className="tracking-wide">{degree}</h3>
        <div className="text-neutral-300">
          <div className="font-semibold">{school}</div>
        </div>
      </div>
      <div className="text-right md:text-left flex md:block items-center justify-between md:justify-end">
        <div className="text-neutral-300">{location}</div>
        <div className="font-medium mt-1 md:mt-2">{date}</div>
      </div>
    </Row>
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <h2 className="text-2xl font-extrabold tracking-tight">Experience</h2>
      <div className="mt-6 space-y-8">
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
        <Divider />
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
        <Divider />
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

      <h2 className="mt-14 text-2xl font-extrabold tracking-tight">
        Education
      </h2>
      <div className="mt-6">
        <EducationItem
          degree="B.Sc. in Computer Engineering"
          school="Bahçeşehir University"
          location="Istanbul, Turkey"
          date="Oct 2021 - Aug 2025"
        />
      </div>
    </section>
  );
}
