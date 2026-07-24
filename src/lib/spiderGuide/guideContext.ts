import type { GuideFocusMode, GuideIntent, GuideSessionContext } from "./types";

const STORAGE_KEY = "spider-guide-context";
const MAX_RECENT = 6;

export function createEmptyContext(): GuideSessionContext {
  return { recentIntentIds: [] };
}

export function loadGuideContext(): GuideSessionContext {
  if (typeof window === "undefined") return createEmptyContext();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyContext();
    const parsed = JSON.parse(raw) as Partial<GuideSessionContext>;
    return { ...createEmptyContext(), ...parsed, recentIntentIds: parsed.recentIntentIds ?? [] };
  } catch {
    return createEmptyContext();
  }
}

export function saveGuideContext(context: GuideSessionContext): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
  } catch {
    // Private browsing / storage quota — context just won't persist across reloads.
  }
}

export function advanceContext(context: GuideSessionContext, intent: GuideIntent): GuideSessionContext {
  const recentIntentIds = [
    intent.id,
    ...context.recentIntentIds.filter((id) => id !== intent.id),
  ].slice(0, MAX_RECENT);

  const next: GuideSessionContext = {
    ...context,
    currentTopic: intent.topic ?? context.currentTopic,
    currentCategory: intent.category,
    previousIntentId: intent.id,
    recentIntentIds,
  };
  saveGuideContext(next);
  return next;
}

export function setFocusMode(context: GuideSessionContext, mode: GuideFocusMode): GuideSessionContext {
  const next: GuideSessionContext = { ...context, focusMode: mode };
  saveGuideContext(next);
  return next;
}

export function resetGuideContext(): GuideSessionContext {
  const fresh = createEmptyContext();
  saveGuideContext(fresh);
  return fresh;
}
