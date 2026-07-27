// Core type contracts for Spidey-Guide's deterministic knowledge engine.
// Nothing in this module talks to a network or an LLM — every answer is
// pre-written, every match is a scored comparison against local data.

export type GuideCategory =
  | "overview"
  | "career"
  | "experience"
  | "projects"
  | "backend"
  | "ai-ml"
  | "system-design"
  | "skills"
  | "education"
  | "personality"
  | "goals"
  | "relocation"
  | "recruiter"
  | "contact"
  | "website";

export type GuideSectionId =
  | "about"
  | "projects"
  | "skills"
  | "recent-activity"
  | "certificates"
  | "contact"
  | "articles";

export type GuideExternalLinkId =
  | "resume"
  | "github"
  | "linkedin"
  | "x"
  | "medium"
  | "nummoria-live"
  | "nummoria-code"
  | "jobpilot-code"
  | "hft-code"
  | "inzva";

export type GuideProjectId = "nummoria" | "jobpilot" | "hft-btc";
export type GuideExperienceId = "halkbank" | "eyehub" | "compro";
export type GuideSkillCategory = "languages-tools" | "frameworks" | "ai-ml";
export type GuideFocusMode =
  | "backend"
  | "ai-ml"
  | "builder"
  | "explorer"
  | "recruiter";

// Every action is a closed, typed shape — the matcher can never hand the
// executor an arbitrary string to navigate to or a URL to open.
export type GuideAction =
  | { type: "navigate"; target: GuideSectionId }
  | { type: "highlight"; target: string; durationMs?: number }
  | { type: "open-project"; projectId: GuideProjectId }
  | { type: "open-experience"; experienceId: GuideExperienceId }
  | { type: "filter-skills"; category: GuideSkillCategory }
  | { type: "switch-mode"; mode: GuideFocusMode }
  | { type: "open-resume" }
  | { type: "open-contact" }
  | { type: "open-link"; linkId: GuideExternalLinkId }
  | { type: "trigger-easter-egg"; id: "ultra-mode" | "terminal-mode" };

export type GuideIntent = {
  id: string;
  category: GuideCategory;
  /** Loose topic key used for context continuity, e.g. "nummoria", "reprobot". */
  topic?: string;
  title: string;

  /** Natural-language question variations that should resolve to this intent. */
  patterns: string[];
  /** Bag-of-words signal used for overlap scoring, independent of exact patterns. */
  keywords: string[];
  /** All of these must be present (directly, via synonym, or via close-typo match). */
  requiredKeywords?: string[];
  /** Presence of any of these strongly penalizes this intent (disambiguation). */
  excludedKeywords?: string[];

  answer: string;
  /** Used for compact contexts (e.g. suggestion previews) when set. */
  shortAnswer?: string;

  actions?: GuideAction[];
  followUpIntentIds?: string[];

  /** Tiebreaker weight; higher surfaces first among close scores. */
  priority?: number;
  recruiterRelevant?: boolean;
};

export type IntentMatchResult =
  | { status: "matched"; intent: GuideIntent; confidence: number }
  | { status: "ambiguous"; candidates: GuideIntent[]; confidence: number }
  | { status: "unsupported"; suggestions: GuideIntent[] };

export type GuideSessionContext = {
  currentTopic?: string;
  currentCategory?: GuideCategory;
  previousIntentId?: string;
  recentIntentIds: string[];
  focusMode?: GuideFocusMode;
};

export type GuideAnalyticsEvent =
  | { type: "guide_opened" }
  | {
      type: "question_submitted";
      intentId?: string;
      status: "matched" | "ambiguous" | "unsupported";
    }
  | { type: "follow_up_selected"; intentId: string }
  | { type: "guide_action_executed"; actionType: GuideAction["type"] };

export type GuideAnalyticsHandler = (event: GuideAnalyticsEvent) => void;

export type MatchDiagnostic = {
  query: string;
  matchedIntent: string | null;
  score: number;
  matchedKeywords: string[];
  contextBoost: boolean;
};
