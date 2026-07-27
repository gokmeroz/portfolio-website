import { PERSONA_GROUPS, type GuideVisitorPersona } from "../../data/spiderGuide";
import type { GuideIntent } from "../../lib/spiderGuide/types";
import type { GuideSuggestion } from "../../lib/spiderGuide/suggestQuestions";
import SpiderGuideInput from "./SpiderGuideInput";
import SpiderGuideSuggestions from "./SpiderGuideSuggestions";
import SpiderGuideResults, { type SpiderGuideLogEntry } from "./SpiderGuideResults";

const LISTBOX_ID = "spidey-guide-suggestions";

type SpiderGuidePanelProps = {
  open: boolean;
  onClose: () => void;
  entries: SpiderGuideLogEntry[];
  intentById: Map<string, GuideIntent>;
  onSelectIntent: (intent: GuideIntent) => void;
  selectedPersona: GuideVisitorPersona;
  onSelectPersona: (persona: GuideVisitorPersona) => void;
  onReset: () => void;
  logRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmitQuery: (value: string) => void;
  suggestions: GuideSuggestion[];
  suggestionsOpen: boolean;
  activeSuggestionIndex: number;
  onActiveSuggestionIndexChange: (index: number) => void;
  onSelectSuggestion: (suggestion: GuideSuggestion) => void;
  onCloseSuggestions: () => void;
};

export default function SpiderGuidePanel({
  open,
  onClose,
  entries,
  intentById,
  onSelectIntent,
  selectedPersona,
  onSelectPersona,
  onReset,
  logRef,
  inputRef,
  inputValue,
  onInputChange,
  onSubmitQuery,
  suggestions,
  suggestionsOpen,
  activeSuggestionIndex,
  onActiveSuggestionIndexChange,
  onSelectSuggestion,
  onCloseSuggestions,
}: SpiderGuidePanelProps) {
  if (!open) return null;

  const personaGroup = PERSONA_GROUPS.find((g) => g.persona === selectedPersona) ?? PERSONA_GROUPS[0];
  const starterIntents = personaGroup.intentIds
    .map((id) => intentById.get(id))
    .filter((i): i is GuideIntent => Boolean(i));

  const activeOptionId =
    suggestionsOpen && activeSuggestionIndex >= 0 ? `${LISTBOX_ID}-option-${activeSuggestionIndex}` : null;

  return (
    <>
      <div
        className="fixed inset-0 z-[2] bg-black/60 backdrop-blur-[1px]"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        className="pixel-panel !fixed top-[152px] left-4 z-[3] w-[min(360px,calc(100vw-32px))] max-h-[min(75vh,600px)] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Spidey-Guide: interactive portfolio knowledge system"
      >
        <div className="flex-none flex items-center gap-2.5 px-3 py-3 border-b-[3px] border-[var(--color-border)] bg-[var(--color-surface-2)]">
          <div className="flex-1 min-w-0">
            <div className="font-pixel-ui text-[11px] tracking-wide text-[var(--color-text-base)]">
              SPIDEY-GUIDE ONLINE
            </div>
            <div className="mt-1 font-pixel-ui text-[9px] uppercase tracking-wide text-[var(--color-accent-2)]">
              <span className="text-[#3ef29a]">&#9679;</span> Interactive
              Portfolio Guide
            </div>
          </div>
          {entries.length > 0 && (
            <button
              type="button"
              className="flex-none font-pixel-ui text-[9px] uppercase tracking-wide text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
              onClick={onReset}
            >
              Reset
            </button>
          )}
          <button
            type="button"
            className="flex-none w-[26px] h-[26px] border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-base)] font-pixel-ui text-xs hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            aria-label="Close Spidey-Guide"
            onClick={onClose}
          >
            &#10005;
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
            <p className="text-base leading-6 text-[var(--color-text-base)]/85">
              Explore Mert's work through hundreds of supported questions
              &mdash; a Personal Knowledge Engine for his backend, AI/ML,
              projects, and career.
            </p>

            <div>
              <span className="font-pixel-ui text-[9px] uppercase tracking-wide text-[var(--color-text-muted)]">
                I am a...
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PERSONA_GROUPS.map((group) => (
                  <button
                    key={group.persona}
                    type="button"
                    className={`pixel-chip cursor-pointer text-[9px] ${
                      group.persona === selectedPersona ? "is-active" : ""
                    }`}
                    aria-pressed={group.persona === selectedPersona}
                    onClick={() => onSelectPersona(group.persona)}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-pixel-ui text-[9px] uppercase tracking-wide text-[var(--color-text-muted)]">
                Ask about
              </span>
              <div className="mt-2 flex flex-col gap-1.5">
                {starterIntents.map((intent) => (
                  <button
                    key={intent.id}
                    type="button"
                    className="pixel-guide-followup"
                    onClick={() => onSelectIntent(intent)}
                  >
                    <span
                      className="pixel-guide-followup-strand"
                      aria-hidden="true"
                    />
                    {intent.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <SpiderGuideResults
            entries={entries}
            intentById={intentById}
            onSelectIntent={onSelectIntent}
            logRef={logRef}
          />
        )}

        <div className="relative flex-none">
          {suggestionsOpen && (
            <SpiderGuideSuggestions
              suggestions={suggestions}
              activeIndex={activeSuggestionIndex}
              listboxId={LISTBOX_ID}
              onHover={onActiveSuggestionIndexChange}
              onSelect={onSelectSuggestion}
            />
          )}
          <SpiderGuideInput
            inputRef={inputRef}
            value={inputValue}
            onChange={onInputChange}
            onSubmit={onSubmitQuery}
            suggestions={suggestions}
            suggestionsOpen={suggestionsOpen}
            activeIndex={activeSuggestionIndex}
            onActiveIndexChange={onActiveSuggestionIndexChange}
            onSelectSuggestion={onSelectSuggestion}
            onCloseSuggestions={onCloseSuggestions}
            onEscape={onClose}
            listboxId={LISTBOX_ID}
            activeOptionId={activeOptionId}
          />
        </div>
      </div>
    </>
  );
}
