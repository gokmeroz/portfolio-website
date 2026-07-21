// src/sections/Certificates.tsx
import { useEffect, useRef, useState } from "react";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";

const groups = [
  {
    title: "Introduction to Back-End Development",
    from: "Meta",
    certificate_url: "/certificates/meta-intro-backend.jpeg",
  },
  {
    title: "Introduction to Databases for Back-End Development",
    from: "Meta",
    certificate_url: "/certificates/meta-intro-databases.jpeg",
  },
  {
    title: "Introduction to Structured Query Language (SQL)",
    from: "University of Michigan",
    certificate_url: "/certificates/michigan-sql.jpeg",
  },
  {
    title: "Node.js, Express, MongoDB & More — The Complete Bootcamp",
    from: "Udemy",
    certificate_url: "/certificates/udemy-node-express-mongodb.jpg",
  },
  {
    title: "Programming in Python",
    from: "Meta",
    certificate_url: "/certificates/meta-programming-python.jpeg",
  },
  {
    title: "Requirements Gathering for Secure Software Development",
    from: "University of Colorado",
    certificate_url: "/certificates/colorado-requirements-secure-dev.jpeg",
  },
  {
    title: "The Complete ASP.NET Core 9 Course for Busy Developers",
    from: "Udemy",
    certificate_url: "/certificates/udemy-aspnet-core-9.jpg",
  },
  {
    title: "Version Control",
    from: "Meta",
    certificate_url: "/certificates/meta-version-control.jpeg",
  },
];

export default function Certificates() {
  const [active, setActive] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    groups.forEach((g) => {
      const img = new Image();
      img.src = g.certificate_url;
    });
  }, []);

  useEffect(() => {
    if (active == null) return;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
      } else if (e.key === "ArrowLeft") {
        setActive((i) => (i == null ? 0 : (i - 1 + groups.length) % groups.length));
      } else if (e.key === "ArrowRight") {
        setActive((i) => (i == null ? 0 : (i + 1) % groups.length));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  function closeModal() {
    setActive(null);
    triggerRef.current?.focus();
  }

  const openItem = active != null ? groups[active] : null;

  return (
    <Section>
      <SectionHeader eyebrow="Achievements" title="Certificates" />

      <div className="relative flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {groups.map((g, i) => (
          <button
            key={g.title + i}
            onClick={(e) => {
              triggerRef.current = e.currentTarget;
              setActive(i);
            }}
            className="group relative flex-shrink-0 border-[3px] border-[var(--color-border)] outline-none transition-colors hover:border-[var(--color-border-strong)] focus-visible:border-[var(--color-accent-2)]"
            aria-label={`View certificate: ${g.title} — ${g.from}`}
          >
            <img
              src={g.certificate_url}
              alt=""
              loading="lazy"
              className="h-32 w-56 object-cover transition-transform duration-200 group-hover:scale-[1.02] md:h-40 md:w-72"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-bg-base)] to-transparent px-3 py-2">
              <p className="line-clamp-1 font-pixel-ui text-[10px] text-[var(--color-text-base)]">
                {g.title}
              </p>
              <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                {g.from}
              </p>
            </div>
          </button>
        ))}
      </div>

      {openItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${openItem.title} — ${openItem.from}`}
            className="pixel-panel relative flex w-full max-w-4xl flex-col overflow-hidden"
          >
            <div className="flex-none flex items-start justify-between gap-3 border-b-[3px] border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3">
              <div className="min-w-0">
                <h3 className="font-pixel-ui text-xs text-[var(--color-text-base)] sm:text-sm">
                  {openItem.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {openItem.from}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label="Close certificate viewer"
                className="flex-none w-[30px] h-[30px] border-2 border-[var(--color-border)] bg-[var(--color-surface)] font-pixel-ui text-xs text-[var(--color-text-base)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                &#10005;
              </button>
            </div>

            <div className="flex items-center justify-center bg-[var(--color-bg-base)] p-2">
              <img
                src={openItem.certificate_url}
                alt={`${openItem.title} certificate from ${openItem.from}`}
                className="max-h-[65vh] w-full object-contain"
                draggable={false}
              />
            </div>

            <div className="flex-none flex items-center justify-between gap-3 border-t-[3px] border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setActive((i) =>
                      i == null ? 0 : (i - 1 + groups.length) % groups.length
                    )
                  }
                  className="pixel-btn !text-[10px]"
                >
                  &#9664; Prev
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActive((i) => (i == null ? 0 : (i + 1) % groups.length))
                  }
                  className="pixel-btn !text-[10px]"
                >
                  Next &#9654;
                </button>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="pixel-btn !text-[10px]"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
