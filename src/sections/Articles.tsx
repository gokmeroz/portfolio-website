type Article = {
  title: string;
  topic: string;
  date: string;
  excerpt: string;
  source: string;
};

const items: Article[] = [
  {
    title: "Article A — Name of the Title",
    topic: "Topic: …",
    date: "2025-10-19",
    excerpt:
      "A few lines of summary about the article. Keep it tight and enticing for 'Read more'.",
    source: "https://medium.com/@gokmeroz",
  },
  {
    title: "Article B — Another Title",
    topic: "Topic: …",
    date: "2025-09-30",
    excerpt:
      "Another short preview of your writing with a clear takeaway and hook.",
    source: "https://medium.com/@gokmeroz",
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
              <span>{a.topic}</span>
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
          href="https://medium.com/@gokmeroz"
          className="underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          medium.com/@gokmeroz
        </a>
      </p>
    </section>
  );
}
