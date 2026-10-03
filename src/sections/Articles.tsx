import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";

type Article = {
  title: string;
  topic: string[];
  date: string;
  excerpt: string;
  source: string;
};

const items: Article[] = [
  {
    title: "Why I Think JavaScript Can Do It All",
    topic: ["JavaScript", "Full Stack Development"],
    date: "2025-10-22",
    excerpt:
      "Every developer has their go-to language, and for me, that’s always been JavaScript. The more I create, the more I realize it’s far beyond just a scripting language",
    source:
      "https://medium.com/@goekmeroz/why-i-think-javascript-can-do-it-all-407f98599f5f",
  },
];

export default function Articles() {
  return (
    <Section id="articles">
      <SectionHeader eyebrow="Field Notes" title="Articles" />

      <div className="space-y-6">
        {items.map((a, i) => (
          <article key={i} className="pixel-panel pixel-panel--gold">
            <div className="panel-bar panel-bar--gold">
              <span>{a.date}</span>
              <span>source: {new URL(a.source).hostname}</span>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-extrabold leading-7 text-[var(--color-text-base)] sm:text-xl">
                {a.title}
              </h3>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-[var(--color-text-base)]">
                {a.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {a.topic.map((t) => (
                  <span key={t} className="pixel-chip">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={a.source}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn mt-6 mb-2"
              >
                Read more
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-10 text-lg text-[var(--color-text-base)]">
        Follow me on Medium for more &rarr;{" "}
        <a href="https://medium.com/@goekmeroz" target="_blank" rel="noreferrer">
          medium.com/@goekmeroz
        </a>
      </p>
    </Section>
  );
}
