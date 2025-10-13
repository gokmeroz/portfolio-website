export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 border-t border-black/10">
      <h2 className="uppercase tracking-[0.25em] text-xs text-zinc-500">
        About Me
      </h2>
      <p className="mt-6 text-zinc-700">
        I’m Göktuğ Mert Özdoğan — backend-leaning full-stack engineer focused on
        reliable systems, clear APIs, and fast UIs. Recent highlights:{" "}
        <b>Nummoria</b> (finance tracker), <b>Eyehub</b> (TÜBİTAK 122E085), and
        enterprise modules at Halkbank.
      </p>
      <p className="mt-4 text-zinc-700">
        Stack: Node.js/Express, React/TypeScript, C#/.NET, SQL Server, MongoDB,
        AWS (S3, CloudFront, Lambda, Route53).
      </p>
    </div>
  );
}
