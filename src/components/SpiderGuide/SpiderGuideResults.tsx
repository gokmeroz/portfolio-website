import { CATEGORY_LABELS } from "../../data/spiderGuide/categories";
import type { GuideIntent, IntentMatchResult } from "../../lib/spiderGuide/types";
import SpiderGuideFollowUps from "./SpiderGuideFollowUps";

export type SpiderGuideLogEntry = {
  id: number;
  query: string;
  result: IntentMatchResult;
  scanning: boolean;
};

type SpiderGuideResultsProps = {
  entries: SpiderGuideLogEntry[];
  intentById: Map<string, GuideIntent>;
  onSelectIntent: (intent: GuideIntent) => void;
  logRef: React.RefObject<HTMLDivElement | null>;
};

const UNSUPPORTED_MESSAGE =
  "I couldn't find an exact match in Mert's portfolio knowledge base. Were you asking about one of these?";

function OptionButtons({
  intents,
  onSelectIntent,
}: {
  intents: GuideIntent[];
  onSelectIntent: (intent: GuideIntent) => void;
}) {
  if (intents.length === 0) return null;
  return (
    <div className="pixel-guide-options">
      {intents.map((intent) => (
        <button
          key={intent.id}
          type="button"
          className="pixel-guide-followup"
          onClick={() => onSelectIntent(intent)}
        >
          <span className="pixel-guide-followup-strand" aria-hidden="true" />
          {intent.title}
        </button>
      ))}
    </div>
  );
}

export default function SpiderGuideResults({
  entries,
  intentById,
  onSelectIntent,
  logRef,
}: SpiderGuideResultsProps) {
  return (
    <div ref={logRef} className="flex flex-1 min-h-[80px] flex-col gap-3 p-3 overflow-y-auto" aria-live="polite">
      {entries.map((entry) => (
        <div key={entry.id} className="flex flex-col gap-2">
          <div className="pixel-guide-msg user self-end">{entry.query}</div>

          {entry.scanning ? (
            <div className="pixel-guide-msg bot pixel-guide-scan">
              <span className="pixel-guide-scan-label">SCANNING</span>
              <span className="pixel-guide-scan-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </div>
          ) : entry.result.status === "matched" ? (
            <div className="pixel-guide-msg bot pixel-guide-msg--matched self-start">
              <div className="pixel-guide-result-meta">
                <span className="pixel-guide-status-label">Knowledge match found</span>
                <span className="pixel-guide-category-chip">
                  {CATEGORY_LABELS[entry.result.intent.category]}
                </span>
              </div>
              <p className="mt-2">{entry.result.intent.answer}</p>
              <SpiderGuideFollowUps
                intent={entry.result.intent}
                intentById={intentById}
                onSelect={onSelectIntent}
              />
            </div>
          ) : entry.result.status === "ambiguous" ? (
            <div className="pixel-guide-msg bot self-start">
              <p>Not sure which one you mean &mdash; did you mean one of these?</p>
              <OptionButtons intents={entry.result.candidates} onSelectIntent={onSelectIntent} />
            </div>
          ) : (
            <div className="pixel-guide-msg bot self-start">
              <p>{UNSUPPORTED_MESSAGE}</p>
              <OptionButtons intents={entry.result.suggestions} onSelectIntent={onSelectIntent} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
