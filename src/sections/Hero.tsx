import { FileCheck2, MapPin, Plane } from "lucide-react";
import HeroScene from "../components/HeroScene";

export default function Hero() {
  return (
    // pt-14 keeps the opening lines clear of the fixed Spidey-Guide badge
    // and its "Click me!" callout in the top-left corner.
    <section className="pt-14">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div className="min-w-0">
          {/* Eyebrow */}
          <p className="caption-box">Hi, my name is</p>

          {/* Name */}
          <h1 className="hero-name mt-6">Göktuğ Mert Özdoğan.</h1>

          {/* Tagline */}
          <h2 className="hero-tagline mt-4">
            I build things.
            <span className="hero-cursor" aria-hidden="true" />
          </h2>

          {/* Short intro (keep hero tight; full bio lives below) */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-base)]">
            A CS graduate (2025) with 1.5+ years of hands-on experience across
            enterprise internships and a shipped production fintech app, I’m a
            software engineer focused on backend-leaning full-stack work,
            data-driven features, and finance tech — with a growing pull toward
            applied AI/ML, from agentic pipelines to production model
            integration. I care about clean, accessible digital experiences that
            actually ship and scale.
          </p>

          {/* Location / relocation / work-authorization signal */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="pixel-chip">
              <MapPin size={12} strokeWidth={2.25} className="mr-1.5 shrink-0" />
              Istanbul, Turkey
            </span>
            <span className="pixel-chip">
              <Plane size={12} strokeWidth={2.25} className="mr-1.5 shrink-0" />
              Open to relocation, on-site anywhere the role needs me
            </span>
            <span className="pixel-chip">
              <FileCheck2 size={12} strokeWidth={2.25} className="mr-1.5 shrink-0" />
              Turkish citizen — visa sponsorship needed outside Turkey
            </span>
          </div>
        </div>

        <HeroScene />
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
        <div className="space-y-4">
          <p className="max-w-prose text-lg leading-8 text-[var(--color-text-base)]">
            I’m a software engineer from Istanbul who’s been building things
            since I was a kid — these days that means backend systems and AI,
            with Node.js, C#/.NET, and Python as home turf. Outside of code:
            football, combat sports, comics, and probably too many tabs open on
            the markets.
          </p>
          <p className="font-pixel-ui text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Curious about the rest? Ask{" "}
            <span className="text-[var(--color-accent)]">Spidey-Guide</span> —
            that’s what it’s for.
          </p>
        </div>

        <h3 className="motto">
          <span className="block-red">Code.</span>
          <span className="block-blue">Build.</span>
          <span className="block-gold">Invest.</span>
          <span className="bg-[var(--color-ink)] text-[var(--color-on-accent)]">
            Repeat.
          </span>
        </h3>
      </div>
    </section>
  );
}
