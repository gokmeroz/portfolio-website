type Work = {
  title: string;
  tag: string;
  year: string;
  summary: string;
  live?: string;
  code?: string;
};
export default function WorkCard({
  title,
  tag,
  year,
  summary,
  live,
  code,
}: Work) {
  return (
    <article className="p-5 rounded-2xl border border-black/10 bg-white shadow-soft">
      <div className="text-xs uppercase tracking-wide text-zinc-500">
        {tag} • {year}
      </div>
      <h3 className="text-xl font-semibold mt-1">{title}</h3>
      <p className="mt-2 text-sm text-zinc-700">{summary}</p>
      <div className="mt-4 flex gap-4 text-sm">
        {live && (
          <a
            className="text-[var(--brand)] underline decoration-dotted"
            target="_blank"
            href={live}
          >
            Live
          </a>
        )}
        {code && (
          <a
            className="text-[var(--brand)] underline decoration-dotted"
            target="_blank"
            href={code}
          >
            Code
          </a>
        )}
      </div>
    </article>
  );
}
