// src/sections/InterviewMert.tsx
import { useRef, useState } from "react";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import InterviewMertModal from "../components/InterviewMert/InterviewMertModal";

export default function InterviewMert() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <Section id="interview-mert">
      <SectionHeader
        eyebrow="Whiteboard"
        title="Interview Mert"
        description="Pick a system-design prompt and watch the answer unfold the way it would in a real interview — requirements, constraints, architecture, bottlenecks, scaling strategy, trade-offs, and a final diagram. Spidey-Guide pushes back on one decision along the way."
      />

      <div className="pixel-panel p-6">
        <p className="text-lg leading-7 text-[var(--color-text-base)]/85">
          This isn't a resume line — it's a live walkthrough of how I actually
          reason through a system-design problem, stage by stage.
        </p>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="pixel-btn primary mt-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
        >
          Interview Mert
        </button>
      </div>

      <InterviewMertModal open={open} onClose={close} />
    </Section>
  );
}
