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

export default function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="space-y-8">
        <ExperienceItem
          title="Full stack Web Development Intern"
          company="Halkbank"
          location="Istanbul, Turkey"
          date="Apr 2025 - Jul 2025"
          bullets={[
            "Developed and maintained internal banking applications using .NET 7.0, C#, TypeScript, SQL, and AngularJS. ",
            "Collaborated with senior developers to enhance role-based access and database integration.",
            "Improved front-end design responsiveness, contributing to a better user experience.",
            "Gained hands-on experience in enterprise software development practices and backend APIs.",
          ]}
        />
        <Divider />
        <ExperienceItem
          title="Backend Developer"
          company="TUBITAK PROJECT 122E085 - Eyehub"
          location="Istanbul, Turkey"
          date="Nov 2023 - Jun 2024"
          bullets={[
            "Supported a research-driven project focused on dyslexia detection for children",
            "Built and maintained backend servers using Node.js and JavaScript",
            "Deployed and managed project infrastructure with AWS Cloud Services",
            "Collaborated with researchers and engineers under Prof. Gunet Eroglu, bridging academia and software development",
          ]}
        />
        <Divider />
        <ExperienceItem
          title="Software Engineering Intern"
          company="ComPro"
          location="Istanbul, Turkey"
          date="Aug 2023 - Sep 2023"
          bullets={[
            "Assisted in backend API development, enabling seamless data exchange across web modules",
            "Supported cloud-based solutions on IBM Cloud, contributing to scalable applications.",
            "Conducted debugging and unit testing, improving application stability and reducing defects",
            "Collaborated in an Agile team environment, ensuring on-time delivery of enterprise cloud projects",
          ]}
        />
      </div>
    </section>
  );
}
