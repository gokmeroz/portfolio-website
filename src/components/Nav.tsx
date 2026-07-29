import React, { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects & Works" },
  { id: "contact", label: "Contact" },
  { id: "articles", label: "Articles" },
];

export default function Nav({ active }: { active: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = (e.currentTarget.getAttribute("href") || "").slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`nav-surface fixed top-0 inset-x-0 ${menuOpen ? "z-[210]" : "z-50"}`}
    >
      <div className="container-mx min-h-16 flex items-center justify-between gap-x-3 py-2">
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

        {/* Desktop menu (right) */}
        <nav className="hidden sm:flex items-center gap-5 font-pixel-ui text-[10px] uppercase tracking-[0.05em]">
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

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="pixel-btn !px-2.5 !py-2.5 sm:!hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <X size={16} strokeWidth={2.25} />
          ) : (
            <Menu size={16} strokeWidth={2.25} />
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav
          id="mobile-nav-panel"
          className="sm:hidden container-mx flex flex-col gap-1 border-t border-[var(--color-border)] py-3 font-pixel-ui text-[11px] uppercase tracking-[0.05em]"
        >
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={onClick}
              className={`border-b border-[var(--color-border)] py-2.5 transition-colors ${
                active === l.id
                  ? "text-[var(--color-accent-2)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume/Goktug-Mert-Ozdogan-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="pixel-btn !text-[11px] mt-2 justify-center"
            onClick={() => setMenuOpen(false)}
          >
            <FileText size={13} strokeWidth={2.25} className="mr-1.5" />
            Résumé
          </a>
        </nav>
      )}
    </header>
  );
}
