import { normalizeQuery } from "./normalizeQuery";
import type { GuideIntent } from "./types";

export type GuideSuggestion = {
  intent: GuideIntent;
  /** The best-matching pattern text, shown to the visitor. */
  label: string;
  /** Index into `label` where the typed text starts, or -1 if not a direct substring. */
  matchIndex: number;
  matchLength: number;
};

const MIN_QUERY_LENGTH = 2;

/**
 * Autocomplete suggestions as the visitor types. Exact prefix matches rank
 * above substring matches, which rank above loose keyword/category matches —
 * all deterministic, no fuzzy-ML scoring involved.
 */
export function suggestQuestions(rawQuery: string, intents: GuideIntent[], limit = 5): GuideSuggestion[] {
  const normalizedQuery = normalizeQuery(rawQuery);
  if (normalizedQuery.length < MIN_QUERY_LENGTH) return [];

  type Ranked = GuideSuggestion & { rank: number };
  const byIntent = new Map<string, Ranked>();

  const consider = (intent: GuideIntent, label: string, rank: number, matchIndex: number, matchLength: number) => {
    const existing = byIntent.get(intent.id);
    if (existing && existing.rank <= rank) return;
    byIntent.set(intent.id, { intent, label, rank, matchIndex, matchLength });
  };

  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      const normalizedPattern = normalizeQuery(pattern);
      if (normalizedPattern.startsWith(normalizedQuery)) {
        consider(intent, pattern, 3, 0, rawQuery.trim().length);
        continue;
      }
      const idx = normalizedPattern.indexOf(normalizedQuery);
      if (idx >= 0) {
        consider(intent, pattern, 2, idx, rawQuery.trim().length);
      }
    }

    if (!byIntent.has(intent.id)) {
      const queryTokens = normalizedQuery.split(" ").filter(Boolean);
      const keywordHit = intent.keywords.some((kw) =>
        queryTokens.some((t) => kw.startsWith(t) || t.startsWith(kw))
      );
      const categoryHit = intent.category.replace("-", " ").includes(normalizedQuery);
      if (keywordHit || categoryHit) {
        consider(intent, intent.patterns[0] ?? intent.title, 1, -1, 0);
      }
    }
  }

  return [...byIntent.values()]
    .sort((a, b) => {
      if (b.rank !== a.rank) return b.rank - a.rank;
      if (b.intent.priority !== a.intent.priority) return (b.intent.priority ?? 0) - (a.intent.priority ?? 0);
      return a.label.length - b.label.length;
    })
    .slice(0, limit)
    .map(({ intent, label, matchIndex, matchLength }) => ({ intent, label, matchIndex, matchLength }));
}
