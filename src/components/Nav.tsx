const links = [
  { href: "#about", label: "01. About" },
  { href: "#experience", label: "02. Experience" },
  { href: "#work", label: "03. Work" },
  { href: "#contact", label: "04. Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-ink/80 backdrop-blur border-b border-white/10">
      <nav className="max-w-content mx-auto px-5 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-mint text-mint font-bold"
        >
          G
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  className="text-slate2 hover:text-mint transition-colors"
                  href={l.href}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="inline-flex items-center gap-2 rounded border px-4 py-2 text-sm border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 transition-colors">
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
