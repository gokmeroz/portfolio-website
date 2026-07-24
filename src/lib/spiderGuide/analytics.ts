import type { GuideAnalyticsHandler } from "./types";

// The repository has no analytics provider wired up today. This is a no-op
// so the guide's event hooks (guide_opened, question_submitted, etc.) have
// somewhere to go without pulling in a tracking dependency — swap the body
// for a real call if/when analytics is added. Never logs raw visitor text.
export const noopAnalytics: GuideAnalyticsHandler = () => {};
