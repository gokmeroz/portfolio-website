// src/sections/Certificates.tsx
import { useEffect, useRef, useState } from "react";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";

const groups = [
  {
    title: "Supervised Learning with scikit-learn",
    from: "DataCamp",
    certificate_url: "/certificates/supervised-Learning-with-scikit-learn.jpg",
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
    <Section id="certificates">
      <SectionHeader eyebrow="Achievements" title="Certificates" />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {groups.map((g, i) => (
          <button
            key={g.title + i}
            type="button"
            onClick={(e) => {
              triggerRef.current = e.currentTarget;
              setActive(i);
            }}
            className="pixel-panel flex cursor-pointer flex-col text-left"
            aria-label={`View certificate: ${g.title} — ${g.from}`}
          >
            <img
              src={g.certificate_url}
              alt=""
              loading="lazy"
              className="aspect-[4/3] w-full border-b-4 border-[var(--color-border)] object-cover"
            />
            <span className="flex flex-1 flex-col gap-2 p-3">
              <span className="text-sm font-bold leading-5 text-[var(--color-text-base)]">
                {g.title}
              </span>
              <span className="mt-auto font-pixel-ui text-[10px] uppercase tracking-[0.08em] text-[var(--color-accent)]">
                {g.from}
              </span>
            </span>
          </button>
        ))}
      </div>

      {openItem && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[var(--color-ink)]/80 p-6"
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
            <div className="flex-none flex items-start justify-between gap-3 border-b-4 border-[var(--color-border)] bg-[var(--color-accent-3)] px-4 py-3">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[var(--color-ink)] sm:text-base">
                  {openItem.title}
                </h3>
                <p className="mt-1 font-pixel-ui text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink)]">
                  {openItem.from}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label="Close certificate viewer"
                className="flex-none h-8 w-8 border-2 border-[var(--color-border)] bg-[var(--color-surface)] font-pixel-ui text-xs text-[var(--color-text-base)] hover:bg-[var(--color-accent)] hover:text-[var(--color-on-accent)]"
              >
                &#10005;
              </button>
            </div>

            <div className="flex items-center justify-center bg-[var(--color-surface-2)] p-2">
              <img
                src={openItem.certificate_url}
                alt={`${openItem.title} certificate from ${openItem.from}`}
                className="max-h-[65vh] w-full object-contain"
                draggable={false}
              />
            </div>

            <div className="flex-none flex flex-wrap items-center justify-between gap-4 border-t-4 border-[var(--color-border)] bg-[var(--color-surface)] px-4 pt-4 pb-5">
              <div className="flex gap-4">
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
