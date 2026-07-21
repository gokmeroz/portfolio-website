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
          <article key={i} className="pixel-panel p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {a.topic.map((t) => (
                  <span key={t} className="pixel-chip">
                    {t}
                  </span>
                ))}
              </div>
              <span className="font-pixel-ui text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                {a.date}
              </span>
            </div>
            <h3 className="mt-4 font-pixel-ui text-sm tracking-wide text-[var(--color-text-base)] sm:text-base">
              {a.title}
            </h3>
            <p className="mt-2 text-lg leading-7 text-[var(--color-text-base)]/85">
              {a.excerpt}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <a href={a.source} target="_blank" rel="noreferrer" className="pixel-btn">
                Read more
              </a>
              <span className="text-sm text-[var(--color-text-muted)]">
                source: {new URL(a.source).hostname}
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 text-lg text-[var(--color-text-base)]/85">
        Follow me on Medium for more &rarr;{" "}
        <a href="https://medium.com/@goekmeroz" target="_blank" rel="noreferrer">
          medium.com/@goekmeroz
        </a>
      </p>
    </Section>
  );
}
