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
    <section id="articles" className="scroll-mt-24 py-6">
      <h2 className="text-2xl font-extrabold tracking-tight">Articles</h2>

      <div className="mt-6 space-y-6">
        {items.map((a, i) => (
          <article key={i} className="border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between text-sm text-neutral-400">
              <span>{a.topic.join(" ~ ")}</span>
              <span>{a.date}</span>
            </div>
            <h3 className="mt-2 text-lg font-bold">{a.title}</h3>
            <p className="mt-2 text-neutral-300">{a.excerpt}</p>
            <div className="mt-3 flex items-center justify-between">
              <a
                href={a.source}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Read more
              </a>
              <span className="text-sm text-neutral-400">
                source: {new URL(a.source).hostname}
              </span>
            </div>
          </article>
        ))}
      </div>
      <p>
        Follow me on Medium for more →{" "}
        <a
          href="https://medium.com/@goekmeroz"
          className="underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          medium.com/@goekmeroz
        </a>
      </p>
    </section>
  );
}
