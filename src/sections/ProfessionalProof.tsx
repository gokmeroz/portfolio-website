// src/sections/ProfessionalProof.tsx
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";

type ProofCard = {
  stat: string;
  description: string;
};

const cards: ProofCard[] = [
  {
    stat: "10,000+",
    description: "Halkbank — enterprise banking workflow optimization",
  },
  {
    stat: "Solo-Built",
    description: "Product — live web platform, iOS in progress",
  },
  {
    stat: "Inzva AI Projects #10",
    description: "Agentic AI research contributor",
  },
];

export default function ProfessionalProof() {
  return (
    <Section id="proof">
      <SectionHeader eyebrow="Evidence Log" title="Proof, Not Promises" />

      <div className="grid gap-6 sm:grid-cols-3">
        {cards.map((card, i) => (
          <article
            key={card.stat}
            className="fade-up pixel-panel p-6"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <p className="font-display text-[clamp(13px,2.2vw,17px)] leading-relaxed text-[var(--color-accent-3)]">
              {card.stat}
            </p>
            <p className="mt-3 text-base leading-6 text-[var(--color-text-base)]/70">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
