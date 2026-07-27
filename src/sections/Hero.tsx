import { FileCheck2, MapPin, Plane } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-4 md:pt-6">
      {/* Eyebrow */}
      <p className="font-pixel-ui text-[11px] uppercase tracking-[0.08em] text-[var(--color-accent-2)]">
        <span className="text-[var(--color-accent-3)]">&gt;</span> Hi, my name
        is
      </p>

      {/* Name */}
      <h1
        className="mt-4 font-display text-[clamp(22px,6vw,44px)] leading-[1.5] text-[var(--color-text-base)]"
        style={{ textShadow: "3px 3px 0 rgba(255,77,109,0.55)" }}
      >
        Göktuğ Mert Özdoğan.
      </h1>

      {/* Tagline */}
      <h2
        className="mt-4 font-display text-[clamp(17px,4vw,28px)] leading-[1.6] text-[var(--color-accent-2)]"
        style={{ textShadow: "3px 3px 0 rgba(31,95,120,0.7)" }}
      >
        I build things.
        <span className="inline-block w-[0.5em] h-[0.9em] align-[-0.15em] ml-1 bg-[var(--color-accent-3)] animate-pulse" />
      </h2>

      {/* Short intro (keep hero tight; full bio lives below) */}
      <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-base)]/90">
        A CS graduate (2025) with 1.5+ years of hands-on experience across
        enterprise internships and a shipped production fintech app, I’m a
        software engineer focused on backend-leaning full-stack work,
        data-driven features, and finance tech — with a growing pull toward
        applied AI/ML, from agentic pipelines to production model
        integration. I care about clean, accessible digital experiences that
        actually ship and scale.
      </p>

      {/* Location / relocation / work-authorization signal */}
      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <span className="pixel-chip">
          <MapPin size={12} strokeWidth={2.25} className="mr-1.5" />
          Istanbul, Turkey
        </span>
        <span className="pixel-chip">
          <Plane size={12} strokeWidth={2.25} className="mr-1.5" />
          Open to relocation, on-site anywhere the role needs me
        </span>
        <span className="pixel-chip">
          <FileCheck2 size={12} strokeWidth={2.25} className="mr-1.5" />
          Turkish citizen — visa sponsorship needed outside Turkey
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <p className="max-w-prose text-lg leading-7 text-[var(--color-text-base)]/85">
          I’m a software engineer from Istanbul who’s been building things
          since I was a kid — these days that means backend systems and AI,
          with Node.js, C#/.NET, and Python as home turf. Outside of code:
          football, combat sports, comics, and probably too many tabs open on
          the markets.
        </p>
        <p className="font-pixel-ui text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          Curious about the rest? Ask{" "}
          <span className="text-[var(--color-accent-2)]">Spidey-Guide</span> —
          that’s what it’s for.
        </p>
        <h3 className="font-pixel-ui text-sm tracking-wide text-[var(--color-accent-3)]">
          Code. Build. Invest. Repeat.
        </h3>
      </div>
    </section>
  );
}
