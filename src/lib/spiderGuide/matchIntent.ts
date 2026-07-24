import { normalizeQuery, tokenize, expandQueryTokens } from "./normalizeQuery";
import type {
  GuideIntent,
  GuideSessionContext,
  IntentMatchResult,
  MatchDiagnostic,
} from "./types";

// Deterministic, hand-tunable weights — no ML, no embeddings. Every point
// added below is traceable to a concrete signal (exact match, keyword
// overlap, typed-in context, etc.), which is what keeps this maintainable.
const SCORE = {
  EXACT_PATTERN: 60,
  PHRASE_SIMILARITY_MAX: 30,
  KEYWORD_MATCH: 7,
  KEYWORD_MATCH_CAP: 35,
  REQUIRED_KEYWORD_BONUS: 12,
  EXCLUDED_KEYWORD_PENALTY: 40,
  CATEGORY_CONTEXT_BOOST: 8,
  TOPIC_CONTEXT_BOOST: 14,
  FOLLOW_UP_CONTEXT_BOOST: 20,
  PRIORITY_WEIGHT: 2,
} as const;

// Score ceiling used only to normalize into a 0-1 confidence band; not a
// hard cap on raw score.
const MAX_EXPECTED_SCORE = 110;

export const CONFIDENCE = {
  HIGH: 0.6,
  MEDIUM: 0.35,
} as const;

const HIGH_CONFIDENCE_GAP = 0.1;

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let curr = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

/**
 * Typo tolerance for keywords. Longer words get a looser edit-distance
 * budget so a single transposition ("backedn" -> "backend") still counts as
 * close — short words stay strict to avoid matching unrelated terms.
 */
function isCloseMatch(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false;
  if (Math.abs(a.length - b.length) > 2) return false;
  const budget = Math.min(a.length, b.length) >= 7 ? 2 : 1;
  return levenshtein(a, b) <= budget;
}

function diceCoefficient(tokensA: string[], tokensB: string[]): number {
  if (tokensA.length === 0 || tokensB.length === 0) return 0;
  const setB = new Set(tokensB);
  let overlap = 0;
  for (const t of tokensA) if (setB.has(t)) overlap++;
  return (2 * overlap) / (tokensA.length + tokensB.length);
}

function keywordIsPresent(keyword: string, normalizedQuery: string, expandedTokens: Set<string>): boolean {
  if (expandedTokens.has(keyword)) return true;
  if (normalizedQuery.includes(keyword)) return true;
  for (const token of expandedTokens) {
    if (isCloseMatch(token, keyword)) return true;
  }
  return false;
}

type ScoreResult = { score: number; matchedKeywords: string[]; contextBoost: boolean };

function scoreIntent(
  intent: GuideIntent,
  normalizedQuery: string,
  tokens: string[],
  expandedTokens: Set<string>,
  context: GuideSessionContext,
  intentById: Map<string, GuideIntent>
): ScoreResult | null {
  let score = 0;
  let contextBoost = false;

  const normalizedPatterns = intent.patterns.map((p) => normalizeQuery(p));
  if (normalizedPatterns.includes(normalizedQuery)) {
    score += SCORE.EXACT_PATTERN;
  }

  let bestPhraseSim = 0;
  for (const pattern of normalizedPatterns) {
    const sim = diceCoefficient(tokens, tokenize(pattern));
    if (sim > bestPhraseSim) bestPhraseSim = sim;
  }
  score += bestPhraseSim * SCORE.PHRASE_SIMILARITY_MAX;

  if (intent.requiredKeywords && intent.requiredKeywords.length > 0) {
    const allPresent = intent.requiredKeywords.every((kw) =>
      keywordIsPresent(kw, normalizedQuery, expandedTokens)
    );
    if (!allPresent) return null;
    score += SCORE.REQUIRED_KEYWORD_BONUS;
  }

  const matchedKeywords: string[] = [];
  for (const kw of intent.keywords) {
    if (keywordIsPresent(kw, normalizedQuery, expandedTokens)) matchedKeywords.push(kw);
  }
  score += Math.min(matchedKeywords.length * SCORE.KEYWORD_MATCH, SCORE.KEYWORD_MATCH_CAP);

  if (intent.excludedKeywords) {
    const hasExcluded = intent.excludedKeywords.some((kw) =>
      keywordIsPresent(kw, normalizedQuery, expandedTokens)
    );
    if (hasExcluded) score -= SCORE.EXCLUDED_KEYWORD_PENALTY;
  }

  if (context.currentCategory && context.currentCategory === intent.category) {
    score += SCORE.CATEGORY_CONTEXT_BOOST;
    contextBoost = true;
  }
  if (context.currentTopic && intent.topic && context.currentTopic === intent.topic) {
    score += SCORE.TOPIC_CONTEXT_BOOST;
    contextBoost = true;
  }
  const previousIntent = context.previousIntentId ? intentById.get(context.previousIntentId) : undefined;
  if (previousIntent?.followUpIntentIds?.includes(intent.id)) {
    score += SCORE.FOLLOW_UP_CONTEXT_BOOST;
    contextBoost = true;
  }

  score += (intent.priority ?? 0) * SCORE.PRIORITY_WEIGHT;

  return { score, matchedKeywords, contextBoost };
}

function dedupeById(list: GuideIntent[]): GuideIntent[] {
  const seen = new Set<string>();
  const out: GuideIntent[] = [];
  for (const intent of list) {
    if (!seen.has(intent.id)) {
      seen.add(intent.id);
      out.push(intent);
    }
  }
  return out;
}

function fallbackSuggestions(intents: GuideIntent[]): GuideIntent[] {
  return intents
    .filter((i) => i.category === "overview" || i.category === "projects" || i.category === "contact")
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    .slice(0, 3);
}

type ScoredIntent = { intent: GuideIntent; result: ScoreResult };

function scoreAllIntents(
  rawQuery: string,
  intents: GuideIntent[],
  context: GuideSessionContext
): { normalizedQuery: string; scored: ScoredIntent[] } {
  const normalizedQuery = normalizeQuery(rawQuery);
  const tokens = tokenize(normalizedQuery);
  const expandedTokens = expandQueryTokens(normalizedQuery, tokens);
  const intentById = new Map(intents.map((i) => [i.id, i] as const));

  const scored: ScoredIntent[] = [];
  for (const intent of intents) {
    const result = scoreIntent(intent, normalizedQuery, tokens, expandedTokens, context, intentById);
    if (result && result.score > 0) scored.push({ intent, result });
  }
  scored.sort((a, b) => b.result.score - a.result.score);
  return { normalizedQuery, scored };
}

export function matchIntent(
  rawQuery: string,
  intents: GuideIntent[],
  context: GuideSessionContext
): IntentMatchResult {
  if (!rawQuery.trim()) {
    return { status: "unsupported", suggestions: fallbackSuggestions(intents) };
  }

  const { scored } = scoreAllIntents(rawQuery, intents, context);

  if (scored.length === 0) {
    return { status: "unsupported", suggestions: fallbackSuggestions(intents) };
  }

  const top = scored[0];
  const second = scored[1];
  const confidence = Math.min(top.result.score / MAX_EXPECTED_SCORE, 1);
  const gap = second ? (top.result.score - second.result.score) / MAX_EXPECTED_SCORE : 1;

  if (confidence >= CONFIDENCE.HIGH && gap >= HIGH_CONFIDENCE_GAP) {
    return { status: "matched", intent: top.intent, confidence };
  }

  if (confidence >= CONFIDENCE.MEDIUM) {
    const candidates = dedupeById(scored.slice(0, 3).map((s) => s.intent));
    return { status: "ambiguous", candidates, confidence };
  }

  const closest = dedupeById(scored.slice(0, 3).map((s) => s.intent));
  return {
    status: "unsupported",
    suggestions: closest.length > 0 ? closest : fallbackSuggestions(intents),
  };
}

/**
 * Development-only diagnostics: full scoring breakdown for a query. Never
 * imported by production UI — see SpiderGuideDevPanel, which is itself
 * gated behind import.meta.env.DEV.
 */
export function getMatchDiagnostics(
  rawQuery: string,
  intents: GuideIntent[],
  context: GuideSessionContext
): MatchDiagnostic {
  const { normalizedQuery, scored } = scoreAllIntents(rawQuery, intents, context);
  const top = scored[0];
  return {
    query: normalizedQuery,
    matchedIntent: top?.intent.id ?? null,
    score: top ? Math.min(top.result.score / MAX_EXPECTED_SCORE, 1) : 0,
    matchedKeywords: top?.result.matchedKeywords ?? [],
    contextBoost: top?.result.contextBoost ?? false,
  };
}
