// frontend/src/components/Cer.tsx
import { useEffect, useState } from "react";

type Cert = {
  title: string;
  from: string;
  certificate_url: string;
};

const groups: Cert[] = [
  {
    title: "Introduction to Back-End Development",
    from: "Meta",
    certificate_url:
      "src/assets/certificates/Introduction to Back-End Development .jpeg",
  },
  {
    title: "Introduction to Databases for Back-End Development",
    from: "Meta",
    certificate_url:
      "src/assets/certificates/Introduction to Databases for Back-End Development .jpeg",
  },
  {
    title: "Introduction to Structured Query Language (SQL)",
    from: "University of Michigan",
    certificate_url:
      "src/assets/certificates/Introduction to Structured Query Language (SQL).jpeg",
  },
  {
    title: "Node.js, Express, MongoDB & More — The Complete Bootcamp",
    from: "Udemy",
    certificate_url:
      "src/assets/certificates/Node.js, Express, MongoDB & More- The Complete Bootcamp.jpg",
  },
  {
    title: "Programming in Python",
    from: "Meta",
    certificate_url: "src/assets/certificates/Programming in Python .jpeg",
  },
  {
    title: "Requirements Gathering for Secure Software Development",
    from: "University of Colorado",
    certificate_url:
      "src/assets/certificates/Requirements Gathering for Secure Software Development .jpeg",
  },
  {
    title: "The Complete ASP.NET Core 9 Course for Busy Developers",
    from: "Udemy",
    certificate_url:
      "src/assets/certificates/The complete ASP.NET Core 9 course for busy developers .jpg",
  },
  {
    title: "Version Control",
    from: "Meta",
    certificate_url: "src/assets/certificates/Version Control .jpeg",
  },
];

export default function Cer() {
  const [active, setActive] = useState<number | null>(null);

  // Preload big images to avoid jank when opening
  useEffect(() => {
    groups.forEach((g) => {
      const img = new Image();
      img.src = g.certificate_url;
    });
  }, []);

  // Keyboard controls while modal is open
  useEffect(() => {
    if (active == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((i) => (i == null ? 0 : (i + 1) % groups.length));
      if (e.key === "ArrowLeft")
        setActive((i) =>
          i == null ? 0 : (i - 1 + groups.length) % groups.length
        );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const openItem = active != null ? groups[active] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 border-t border-black/10">
      <h2 className="uppercase tracking-[0.25em] text-xs text-zinc-500 mb-8">
        Certificates
      </h2>

      {/* Thumbnails: lightweight, no hover to open */}
      <div className="relative flex overflow-x-auto gap-4 pb-2 no-scrollbar">
        {groups.map((g, i) => (
          <button
            key={g.title + i}
            onClick={() => setActive(i)}
            className="group flex-shrink-0 outline-none"
            aria-label={`${g.title} — ${g.from}`}
          >
            <div className="relative">
              <img
                src={g.certificate_url}
                alt={g.title}
                loading="lazy"
                className="h-32 w-56 md:h-40 md:w-72 object-cover rounded-xl border shadow-sm transition-transform duration-200 transform-gpu group-hover:scale-[1.01]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white px-3 py-2 rounded-b-xl">
                <p className="text-[11px] md:text-xs font-medium line-clamp-1">
                  {g.title}
                </p>
                <p className="text-[10px] md:text-[11px] text-zinc-300">
                  {g.from}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Fullscreen modal — opens ONLY on click */}
      {openItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[2px] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActive(null); // close on backdrop click
          }}
        >
          <div className="relative w-full max-w-5xl transform-gpu">
            {/* Title bar pinned above image */}
            <div className="absolute -top-12 left-0 right-0 flex justify-center pointer-events-none">
              <div className="px-4 py-2 rounded-full bg-white/95 shadow">
                <h3 className="text-sm md:text-base font-semibold text-zinc-900 text-center">
                  {openItem.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-600 text-center -mt-0.5">
                  {openItem.from}
                </p>
              </div>
            </div>

            {/* Big image */}
            <div className="rounded-2xl overflow-hidden border shadow-2xl">
              <img
                src={openItem.certificate_url}
                alt={openItem.title}
                className="w-full max-h-[78vh] object-contain bg-white"
                draggable={false}
              />
            </div>

            {/* Controls */}
            <div className="mt-3 flex items-center justify-between text-zinc-200">
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setActive((i) =>
                      i == null ? 0 : (i - 1 + groups.length) % groups.length
                    )
                  }
                  className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                >
                  ◀ Prev
                </button>
                <button
                  onClick={() =>
                    setActive((i) => (i == null ? 0 : (i + 1) % groups.length))
                  }
                  className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                >
                  Next ▶
                </button>
              </div>
              <button
                onClick={() => setActive(null)}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
