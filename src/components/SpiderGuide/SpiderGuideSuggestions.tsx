import { CATEGORY_LABELS } from "../../data/spiderGuide/categories";
import type { GuideSuggestion } from "../../lib/spiderGuide/suggestQuestions";

type SpiderGuideSuggestionsProps = {
  suggestions: GuideSuggestion[];
  activeIndex: number;
  listboxId: string;
  onHover: (index: number) => void;
  onSelect: (suggestion: GuideSuggestion) => void;
};

function HighlightedLabel({ suggestion }: { suggestion: GuideSuggestion }) {
  const { label, matchIndex, matchLength } = suggestion;
  if (matchIndex < 0 || matchLength <= 0) {
    return <>{label}</>;
  }
  const before = label.slice(0, matchIndex);
  const match = label.slice(matchIndex, matchIndex + matchLength);
  const after = label.slice(matchIndex + matchLength);
  return (
    <>
      {before}
      <mark className="pixel-guide-suggestion-match">{match}</mark>
      {after}
    </>
  );
}

export default function SpiderGuideSuggestions({
  suggestions,
  activeIndex,
  listboxId,
  onHover,
  onSelect,
}: SpiderGuideSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <ul
      id={listboxId}
      role="listbox"
      aria-label="Suggested questions"
      className="pixel-guide-suggestions"
    >
      {suggestions.map((suggestion, index) => (
        <li key={suggestion.intent.id} role="presentation">
          <button
            type="button"
            id={`${listboxId}-option-${index}`}
            role="option"
            aria-selected={index === activeIndex}
            className={`pixel-guide-suggestion ${index === activeIndex ? "is-active" : ""}`}
            onMouseDown={(e) => e.preventDefault()}
            onMouseEnter={() => onHover(index)}
            onClick={() => onSelect(suggestion)}
          >
            <span className="pixel-guide-suggestion-category">
              {CATEGORY_LABELS[suggestion.intent.category]}
            </span>
            <span className="pixel-guide-suggestion-label">
              <HighlightedLabel suggestion={suggestion} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
