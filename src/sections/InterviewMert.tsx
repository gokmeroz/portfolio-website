// src/sections/InterviewMert.tsx
import { useRef, useState } from "react";
import Section from "../components/Section";
import SectionHeader from "../components/SectionHeader";
import InterviewMertModal from "../components/InterviewMert/InterviewMertModal";
import SystemSandbox from "../components/pixelScenes/SystemSandbox";

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

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="pixel-panel pixel-panel--gold block-blue flex flex-col items-start gap-6 p-6 md:p-8">
          <p className="text-lg font-semibold leading-8">
            This isn't a resume line — it's a live walkthrough of how I actually
            reason through a system-design problem, stage by stage.
          </p>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="pixel-btn primary shrink-0 !px-5 !py-3 !text-xs focus-visible:outline-[var(--color-accent-3)]"
          >
            Interview Mert
          </button>
        </div>

        <div className="pixel-panel">
          <SystemSandbox />
        </div>
      </div>

      <InterviewMertModal open={open} onClose={close} />
    </Section>
  );
}
