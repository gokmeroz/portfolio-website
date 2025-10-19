import React from "react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects & Works" },
  { id: "contact", label: "Contact" },
  { id: "articles", label: "Articles" },
];

export default function Nav({ active }: { active: string }) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = (e.currentTarget.getAttribute("href") || "").slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-neutral-950/65 backdrop-blur-md">
      <div className="container-mx h-14 flex items-center justify-between">
        {/* Name (left) */}
        <a
          href="#about"
          onClick={onClick}
          className="font-semibold tracking-wide"
        >
          Göktuğ Mert Özdoğan
        </a>

        {/* Menu (right) */}
        <nav className="flex items-center gap-6 text-sm">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={onClick}
              className={`relative pb-1 transition-colors ${
                active === l.id
                  ? "text-brand-secondary"
                  : "text-neutral-200 hover:text-brand-secondary"
              }`}
            >
              {l.label}
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-brand-secondary transition-all ${
                  active === l.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
