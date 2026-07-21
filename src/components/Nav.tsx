import React from "react";
import { FileText } from "lucide-react";

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
    <header className="nav-surface fixed top-0 inset-x-0 z-50">
      <div className="container-mx min-h-16 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2">
        {/* Name (left) */}
        <a
          href="#about"
          onClick={onClick}
          className="font-pixel-ui text-[10px] tracking-wide text-[var(--color-text-base)] whitespace-nowrap sm:text-[11px]"
        >
          GÖKTUĞ MERT ÖZDOĞAN
          <span className="hidden sm:inline">
            {" "}
            <span className="text-[var(--color-accent-3)]">_</span> SOFTWARE
            ENGINEER
          </span>
        </a>

        {/* Menu (right) */}
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 font-pixel-ui text-[10px] uppercase tracking-[0.05em] sm:gap-5">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={onClick}
              className={`pb-1 border-b-[3px] transition-colors ${
                active === l.id
                  ? "text-[var(--color-accent-2)] border-[var(--color-accent-2)]"
                  : "text-[var(--color-text-muted)] border-transparent hover:text-[var(--color-text-base)]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume/Goktug-Mert-Ozdogan-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="pixel-btn !text-[10px] !px-3 !py-2"
          >
            <FileText size={13} strokeWidth={2.25} className="mr-1.5" />
            Résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
