import React, { useEffect, useRef, useState } from "react";
import { FileText, Menu, X } from "lucide-react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects & Works" },
  { id: "contact", label: "Contact" },
  { id: "articles", label: "Articles" },
];

// Tailwind `md` — below this the links collapse into the menu panel.
const DESKTOP_MIN_WIDTH = 768;

export default function Nav({ active }: { active: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollWebRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  // Scroll progress drives the web strand under the nav through a CSS
  // variable — no React state, so scrolling never re-renders the nav.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      scrollWebRef.current?.style.setProperty("--progress", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
      <div className="container-mx min-h-16 flex items-center justify-between gap-x-4 py-2">
        {/* Name (left) */}
        <a
          href="#about"
          onClick={onClick}
          className="flex items-center gap-3 whitespace-nowrap text-[var(--color-text-base)] hover:text-[var(--color-accent)]"
        >
          <span className="font-display text-[9px] leading-none sm:text-[10px]">
            GÖKTUĞ MERT ÖZDOĞAN
          </span>
          {/* wrapper carries the breakpoint: .caption-box sets its own display */}
          <span className="hidden lg:inline">
            <span className="caption-box">Software Engineer</span>
          </span>
        </a>

        {/* Desktop menu (right) */}
        <nav className="hidden md:flex items-center gap-2 font-pixel-ui text-[10px] uppercase tracking-[0.05em]">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={onClick}
              aria-current={active === l.id ? "true" : undefined}
              className={`nav-link ${active === l.id ? "is-active" : ""}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/resume/Goktug-Mert-Ozdogan-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="pixel-btn ml-3 !text-[10px] !px-3 !py-2"
          >
            <FileText size={13} strokeWidth={2.25} className="mr-1.5" />
            Résumé
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="pixel-btn !px-2.5 !py-2.5 md:!hidden"
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
          className="md:hidden container-mx flex flex-col gap-2 border-t-4 border-[var(--color-border)] pt-3 pb-5 font-pixel-ui text-[11px] uppercase tracking-[0.05em]"
        >
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={onClick}
              aria-current={active === l.id ? "true" : undefined}
              className={`nav-link !py-2.5 ${active === l.id ? "is-active" : ""}`}
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

      {/* Scroll-progress web strand with a spider riding it */}
      <div ref={scrollWebRef} className="scroll-web" aria-hidden="true">
        <span className="scroll-web__fill" />
        <span className="scroll-web__spider">
          <svg viewBox="0 0 7 5" fill="var(--color-ink)">
            <path d="M0 0h1v1H0zM6 0h1v1H6zM1 1h1v1H1zM5 1h1v1H5zM2 1h3v3H2zM0 3h2v1H0zM5 3h2v1H5zM1 4h1v1H1zM5 4h1v1H5z" />
            <path d="M3 2h1v1H3z" fill="var(--color-accent)" />
          </svg>
        </span>
      </div>
    </header>
  );
}
