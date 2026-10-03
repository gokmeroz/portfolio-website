import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import { experiences, type Experience } from "../data/experience";

function ExperienceItem(props: Experience) {
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
        {experiences.map((experience) => (
          <ExperienceItem key={experience.id} {...experience} />
        ))}
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
