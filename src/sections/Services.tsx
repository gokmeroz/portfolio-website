const items = [
  {
    title: "Motion graphics",
    text: "High-impact motion pieces and micro-animations for product and brand stories.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M4 6h16v12H4zM2 8h2v8H2zM20 8h2v8h-2zM7 9h4v6H7zM13 9h4v6h-4z"
        />
      </svg>
    ),
  },
  {
    title: "Scriptwriting & editing",
    text: "Narrative structure, pacing, and color for strong delivery and retention.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M3 5h14v14H3zM17 7h4v10h-4zM6 8h8v2H6zm0 4h8v2H6zm0 4h6v2H6z"
        />
      </svg>
    ),
  },
  {
    title: "Video distribution",
    text: "Export presets and platform-ready cuts for YT, IG, TikTok, and web.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="currentColor" d="M4 6h16v12H4V6zm6 2v8l6-4-6-4z" />
      </svg>
    ),
  },
  {
    title: "Video hosting",
    text: "Fast delivery via CDN with analytics to track watch time and drop-offs.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M12 3l9 4v10l-9 4-9-4V7l9-4zM7 10h10v4H7z"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <div className="bg-night2">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="md:flex md:items-end md:justify-between">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-accent2/80">
              My Services
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold">
              WHAT I DO?
            </h2>
            <div className="hr-accent mt-3 text-sm text-white/70 max-w-md">
              If you hire a videographer or our team, we deliver custom video
              that fits your brand and purpose.
            </div>
            <a
              href="#services-all"
              className="inline-block mt-6 text-xs px-3 py-2 rounded border border-accent text-accent hover:bg-accent hover:text-night transition-colors"
            >
              VIEW ALL SERVICES
            </a>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {items.map((s) => (
            <article
              key={s.title}
              className="p-5 rounded-2xl bg-card border border-white/10 shadow-glow"
            >
              <div className="h-9 w-9 flex items-center justify-center rounded border border-accent text-accent">
                {s.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-white/70">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
