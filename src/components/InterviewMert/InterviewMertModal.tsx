// src/components/InterviewMert/InterviewMertModal.tsx
import { useEffect, useRef, useState } from "react";
import {
  INTERVIEW_QUESTIONS,
  STAGE_ORDER,
  type InterviewQuestion,
} from "../../data/interviewMert";

type InterviewMertModalProps = {
  open: boolean;
  onClose: () => void;
};

// reveal steps: N stages, then the diagram, then the Spider-Guide challenge
const DIAGRAM_STEP = STAGE_ORDER.length + 1;
const CHALLENGE_STEP = STAGE_ORDER.length + 2;
const TOTAL_STEPS = CHALLENGE_STEP;

export default function InterviewMertModal({
  open,
  onClose,
}: InterviewMertModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [showResponse, setShowResponse] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const question: InterviewQuestion | undefined = INTERVIEW_QUESTIONS.find(
    (q) => q.id === selectedId
  );

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => closeButtonRef.current?.focus(), 30);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [selectedId, open]);

  if (!open) return null;

  function selectQuestion(id: string) {
    setSelectedId(id);
    setRevealedCount(1);
    setShowResponse(false);
  }

  function backToQuestions() {
    setSelectedId(null);
    setRevealedCount(0);
    setShowResponse(false);
  }

  function revealNext() {
    setRevealedCount((n) => Math.min(n + 1, TOTAL_STEPS));
  }

  const allRevealed = revealedCount >= TOTAL_STEPS;
  const nextStageLabel =
    revealedCount < STAGE_ORDER.length
      ? question?.stages[revealedCount]?.label
      : revealedCount < DIAGRAM_STEP
        ? "Final diagram"
        : "Spider-Guide's challenge";

  return (
    <div
      className="interview-modal__backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="interview-mert-title"
        className="interview-modal__panel pixel-panel p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="interview-mert-title"
            className="font-display text-[clamp(13px,2.4vw,16px)] leading-relaxed text-[var(--color-text-base)]"
          >
            Interview Mert
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close Interview Mert"
            className="pixel-btn !px-3 !py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-2)]"
          >
            &#10005;
          </button>
        </div>

        {!question ? (
          <QuestionPicker onSelect={selectQuestion} />
        ) : (
          <div className="mt-6">
            <button
              type="button"
              onClick={backToQuestions}
              className="font-pixel-ui text-[10px] uppercase tracking-[0.1em] text-[var(--color-accent-2)] hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-2)]"
            >
              &larr; Choose a different question
            </button>

            <h3 className="mt-4 font-pixel-ui text-sm tracking-wide text-[var(--color-text-base)] sm:text-base">
              {question.title}
            </h3>

            <div className="mt-5 space-y-6">
              {STAGE_ORDER.slice(0, Math.min(revealedCount, STAGE_ORDER.length)).map(
                (stageKey) => {
                  const stageData = question.stages.find(
                    (s) => s.key === stageKey
                  );
                  if (!stageData) return null;
                  return (
                    <section key={stageData.key} className="fade-up">
                      <h4 className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-accent-3)]">
                        {stageData.label}
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {stageData.body.map((line) => (
                          <li
                            key={line}
                            className="flex gap-3 text-lg leading-7 text-[var(--color-text-base)]/85"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[6px] shrink-0 font-pixel-ui text-[10px] text-[var(--color-accent-2)]"
                            >
                              &gt;
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                }
              )}

              {revealedCount >= DIAGRAM_STEP && (
                <section className="fade-up">
                  <h4 className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-accent-3)]">
                    Final diagram
                  </h4>
                  <pre
                    aria-hidden="true"
                    className="mt-2 overflow-x-auto border-2 border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 font-sans text-sm leading-6 text-[var(--color-accent-2)]"
                  >
                    {question.diagram.ascii}
                  </pre>
                  <p className="sr-only">{question.diagram.description}</p>
                </section>
              )}

              {allRevealed && (
                <section className="fade-up interview-modal__challenge">
                  <p className="font-pixel-ui text-[10px] uppercase tracking-[0.12em] text-[var(--color-accent-2)]">
                    Spider-Guide challenges
                  </p>
                  <p className="mt-2 text-lg leading-7 text-[var(--color-text-base)]/90">
                    &ldquo;{question.challenge.prompt}&rdquo;
                  </p>

                  {!showResponse ? (
                    <button
                      type="button"
                      onClick={() => setShowResponse(true)}
                      className="pixel-btn mt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-2)]"
                    >
                      See his response
                    </button>
                  ) : (
                    <p className="mt-4 border-t-2 border-[var(--color-border)] pt-4 text-lg leading-7 text-[var(--color-text-base)]/85">
                      {question.challenge.response}
                    </p>
                  )}
                </section>
              )}
            </div>

            {!allRevealed && (
              <button
                type="button"
                onClick={revealNext}
                className="pixel-btn primary mt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-2)]"
              >
                Reveal: {nextStageLabel}
              </button>
            )}

            {allRevealed && showResponse && (
              <button
                type="button"
                onClick={backToQuestions}
                className="pixel-btn mt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-2)]"
              >
                Try another question
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function QuestionPicker({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mt-6">
      <p className="text-lg leading-7 text-[var(--color-text-base)]/75">
        Pick a prompt. The answer reveals stage by stage — requirements,
        constraints, initial architecture, bottlenecks, scaling strategy,
        trade-offs, and a final diagram.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {INTERVIEW_QUESTIONS.map((q) => (
          <button
            key={q.id}
            type="button"
            onClick={() => onSelect(q.id)}
            className="pixel-panel p-4 text-left transition-colors hover:border-[var(--color-border-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-2)]"
          >
            <span className="font-pixel-ui text-[11px] tracking-wide text-[var(--color-text-base)]">
              {q.title}
            </span>
            <span className="mt-2 block text-base leading-6 text-[var(--color-text-base)]/70">
              {q.tagline}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
