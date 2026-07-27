import type { GuideSuggestion } from "../../lib/spiderGuide/suggestQuestions";

type SpiderGuideInputProps = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  suggestions: GuideSuggestion[];
  suggestionsOpen: boolean;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSelectSuggestion: (suggestion: GuideSuggestion) => void;
  onCloseSuggestions: () => void;
  onEscape: () => void;
  listboxId: string;
  activeOptionId: string | null;
};

export default function SpiderGuideInput({
  inputRef,
  value,
  onChange,
  onSubmit,
  suggestions,
  suggestionsOpen,
  activeIndex,
  onActiveIndexChange,
  onSelectSuggestion,
  onCloseSuggestions,
  onEscape,
  listboxId,
  activeOptionId,
}: SpiderGuideInputProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (suggestionsOpen && activeIndex >= 0 && suggestions[activeIndex]) {
      onSelectSuggestion(suggestions[activeIndex]);
      return;
    }
    onSubmit(value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      if (!suggestionsOpen || suggestions.length === 0) return;
      e.preventDefault();
      onActiveIndexChange(activeIndex >= suggestions.length - 1 ? 0 : activeIndex + 1);
      return;
    }
    if (e.key === "ArrowUp") {
      if (!suggestionsOpen || suggestions.length === 0) return;
      e.preventDefault();
      onActiveIndexChange(activeIndex <= 0 ? suggestions.length - 1 : activeIndex - 1);
      return;
    }
    if (e.key === "Escape") {
      if (suggestionsOpen) {
        e.preventDefault();
        e.stopPropagation();
        onCloseSuggestions();
        return;
      }
      onEscape();
    }
  }

  return (
    <form
      className="flex-none flex gap-2 p-3 border-t-[3px] border-[var(--color-border)] bg-[var(--color-surface-2)]"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        className="pixel-guide-input"
        placeholder="Ask anything about Mert..."
        autoComplete="off"
        aria-label="Ask Spidey-Guide a question"
        aria-expanded={suggestionsOpen}
        aria-controls={listboxId}
        aria-activedescendant={activeOptionId ?? undefined}
        aria-autocomplete="list"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className="pixel-btn text-[10px]">
        Send
      </button>
    </form>
  );
}
