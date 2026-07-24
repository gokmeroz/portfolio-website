import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_INTENTS, type GuideVisitorPersona } from "../../data/spiderGuide";
import {
  advanceContext,
  executeGuideActions,
  loadGuideContext,
  matchIntent,
  noopAnalytics,
  resetGuideContext,
  setFocusMode,
  suggestQuestions,
} from "../../lib/spiderGuide";
import type { GuideIntent, GuideSessionContext } from "../../lib/spiderGuide/types";
import type { GuideSuggestion } from "../../lib/spiderGuide/suggestQuestions";
import SpiderGuideAvatar from "./SpiderGuideAvatar";
import SpiderGuidePanel from "./SpiderGuidePanel";
import type { SpiderGuideLogEntry } from "./SpiderGuideResults";

const SCAN_DELAY_MS = 350;
const DEBOUNCE_MS = 150;
const RESET_PHRASES = new Set(["reset", "reset guide", "start over", "clear topic", "clear context"]);

let entryId = 0;
const nextEntryId = () => entryId++;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SpiderGuide() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [context, setContext] = useState<GuideSessionContext>(() => loadGuideContext());
  const [entries, setEntries] = useState<SpiderGuideLogEntry[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<GuideVisitorPersona>("recruiter");

  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scanTimer = useRef<number | null>(null);
  const debounceTimer = useRef<number | null>(null);

  const intentById = useMemo(() => new Map(ALL_INTENTS.map((intent) => [intent.id, intent] as const)), []);
  const suggestions = useMemo(() => suggestQuestions(debouncedValue, ALL_INTENTS), [debouncedValue]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [entries]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeGuide();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    debounceTimer.current = window.setTimeout(() => setDebouncedValue(inputValue), DEBOUNCE_MS);
    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
  }, [inputValue]);

  useEffect(() => {
    return () => {
      if (scanTimer.current) window.clearTimeout(scanTimer.current);
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
  }, []);

  function openGuide() {
    setOpen(true);
    if (!seen) setSeen(true);
    noopAnalytics({ type: "guide_opened" });
    window.setTimeout(() => inputRef.current?.focus(), 50);
  }

  function closeGuide() {
    setOpen(false);
  }

  function revealIntent(intent: GuideIntent) {
    setContext((prev) => advanceContext(prev, intent));
    executeGuideActions(
      intent.actions,
      {
        onSwitchMode: (mode) => setContext((prev) => setFocusMode(prev, mode)),
        onTriggerEasterEgg: () => {
          // No intent currently wires this; reserved for future easter-egg hooks.
        },
      },
      noopAnalytics
    );
  }

  function pushEntry(query: string, result: SpiderGuideLogEntry["result"]) {
    const id = nextEntryId();
    setEntries((prev) => [...prev, { id, query, result, scanning: true }]);

    const reveal = () => {
      setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, scanning: false } : e)));
      if (result.status === "matched") revealIntent(result.intent);
    };

    if (prefersReducedMotion()) {
      reveal();
    } else {
      if (scanTimer.current) window.clearTimeout(scanTimer.current);
      scanTimer.current = window.setTimeout(reveal, SCAN_DELAY_MS);
    }
  }

  function runQuery(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setInputValue("");
    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);

    if (RESET_PHRASES.has(trimmed.toLowerCase())) {
      handleReset();
      return;
    }

    const result = matchIntent(trimmed, ALL_INTENTS, context);
    noopAnalytics({
      type: "question_submitted",
      intentId: result.status === "matched" ? result.intent.id : undefined,
      status: result.status,
    });
    pushEntry(trimmed, result);
  }

  function handleSelectIntent(intent: GuideIntent) {
    if (!open) openGuide();
    setInputValue("");
    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
    noopAnalytics({ type: "follow_up_selected", intentId: intent.id });
    pushEntry(intent.title, { status: "matched", intent, confidence: 1 });
  }

  function handleSelectSuggestion(suggestion: GuideSuggestion) {
    handleSelectIntent(suggestion.intent);
  }

  function handleInputChange(value: string) {
    setInputValue(value);
    setActiveSuggestionIndex(-1);
    setSuggestionsOpen(value.trim().length >= 2);
  }

  function handleReset() {
    setContext(resetGuideContext());
    setEntries([]);
    window.setTimeout(() => inputRef.current?.focus(), 30);
  }

  return (
    <>
      <SpiderGuideAvatar
        open={open}
        seen={seen}
        onToggleOpen={() => (open ? closeGuide() : openGuide())}
      />
      <SpiderGuidePanel
        open={open}
        onClose={closeGuide}
        entries={entries}
        intentById={intentById}
        onSelectIntent={handleSelectIntent}
        selectedPersona={selectedPersona}
        onSelectPersona={setSelectedPersona}
        onReset={handleReset}
        logRef={logRef}
        inputRef={inputRef}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onSubmitQuery={runQuery}
        suggestions={suggestions}
        suggestionsOpen={suggestionsOpen}
        activeSuggestionIndex={activeSuggestionIndex}
        onActiveSuggestionIndexChange={setActiveSuggestionIndex}
        onSelectSuggestion={handleSelectSuggestion}
        onCloseSuggestions={() => setSuggestionsOpen(false)}
      />
    </>
  );
}
