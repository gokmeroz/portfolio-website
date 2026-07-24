import { SYNONYMS } from "../../data/spiderGuide/synonyms";

// Technical terms that would otherwise be mangled by punctuation stripping
// (c#, .net, node.js, ai/ml) are swapped for placeholder tokens first, then
// restored after punctuation is removed.
const PLACEHOLDER_MAP: [RegExp, string][] = [
  [/c#/gi, "__csharp__"],
  [/\.net\b/gi, "__dotnet__"],
  [/node\.js/gi, "__nodejs__"],
  [/ai\/ml/gi, "__aiml__"],
  [/asp\.net/gi, "__aspnet__"],
];

const RESTORE_MAP: [string, string][] = [
  ["__csharp__", "c#"],
  ["__dotnet__", ".net"],
  ["__nodejs__", "node.js"],
  ["__aiml__", "ai/ml"],
  ["__aspnet__", "asp.net"],
];

const TURKISH_CHAR_MAP: [string, string][] = [
  ["ç", "c"],
  ["ğ", "g"],
  ["ı", "i"],
  ["ö", "o"],
  ["ş", "s"],
  ["ü", "u"],
];

// Light abbreviation/typo normalization — not exhaustive, just the patterns
// visitors actually type.
const ABBREVIATIONS: [string, string][] = [
  ["back end", "backend"],
  ["back-end", "backend"],
  ["front end", "frontend"],
  ["front-end", "frontend"],
  ["server side", "backend"],
  ["server-side", "backend"],
  ["client side", "frontend"],
  ["client-side", "frontend"],
  ["yrs", "years"],
  ["exp", "experience"],
  ["info", "information"],
  ["recruiting", "recruiter"],
  ["whats", "what is"],
  ["hes", "he is"],
  ["dont", "do not"],
  ["doesnt", "does not"],
  ["isnt", "is not"],
];

export function normalizeQuery(raw: string): string {
  let text = raw.toLowerCase().trim();

  for (const [pattern, token] of PLACEHOLDER_MAP) {
    text = text.replace(pattern, token);
  }

  text = text.replace(/[’‘`]/g, "'").replace(/[–—]/g, "-");

  // Strip punctuation except apostrophes, hyphens, and the placeholder underscores.
  text = text.replace(/[^a-z0-9'_\s-]/g, " ");
  text = text.replace(/\s+/g, " ").trim();

  for (const [token, restored] of RESTORE_MAP) {
    text = text.split(token).join(restored);
  }

  for (const [tr, ascii] of TURKISH_CHAR_MAP) {
    text = text.split(tr).join(ascii);
  }

  for (const [phrase, replacement] of ABBREVIATIONS) {
    text = text.replace(new RegExp(`\\b${phrase}\\b`, "g"), replacement);
  }

  return text.replace(/\s+/g, " ").trim();
}

export function tokenize(normalized: string): string[] {
  return normalized.split(" ").filter(Boolean);
}

/**
 * Expands a query's tokens with canonical synonym keys whenever the query
 * contains that key or one of its alternate phrasings. Lets an intent whose
 * keywords say "strongest" still match "most impressive project".
 */
export function expandQueryTokens(normalizedQuery: string, tokens: string[]): Set<string> {
  const expanded = new Set(tokens);
  for (const [canonical, phrases] of Object.entries(SYNONYMS)) {
    const matches =
      tokens.includes(canonical) || phrases.some((phrase) => normalizedQuery.includes(phrase));
    if (matches) {
      expanded.add(canonical);
      for (const phrase of phrases) {
        for (const word of phrase.split(" ")) expanded.add(word);
      }
    }
  }
  return expanded;
}
