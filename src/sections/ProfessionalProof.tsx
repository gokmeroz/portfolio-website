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

const BLOCKS = ["block-gold", "block-red", "block-blue"];

export default function ProfessionalProof() {
  return (
    <Section id="proof">
      <SectionHeader eyebrow="Evidence Log" title="Proof, Not Promises" />

      <div className="grid gap-8 md:grid-cols-3">
        {cards.map((card, i) => (
          <article
            key={card.stat}
            className={`pixel-panel p-6 ${BLOCKS[i % BLOCKS.length]}`}
          >
            <p className="font-display text-[clamp(14px,1.8vw,18px)] leading-[1.6]">
              {card.stat}
            </p>
            <p className="mt-4 text-base font-semibold leading-6">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
