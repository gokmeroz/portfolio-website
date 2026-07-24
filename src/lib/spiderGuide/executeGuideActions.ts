import type { GuideAction, GuideAnalyticsHandler, GuideExternalLinkId } from "./types";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// The only URLs Spider-Guide is ever allowed to open — every one of these
// already exists elsewhere in the site (Nav, Contact, Works, RecentActivity).
// Intent data can only reference these by id, never by raw URL.
const ALLOWLISTED_LINKS: Record<GuideExternalLinkId, string> = {
  resume: "/resume/Goktug-Mert-Ozdogan-Resume.pdf",
  github: "https://github.com/gokmeroz",
  linkedin: "https://linkedin.com/in/goktugmertozdogan",
  x: "https://x.com/gokmeroz_dev",
  medium: "https://medium.com/@goekmeroz",
  "nummoria-live": "https://www.nummoria.com",
  "nummoria-code": "https://github.com/gokmeroz/nummoria",
  "jobpilot-code": "https://github.com/gokmeroz/jobpilot-autopilot-for-job-applications",
  "hft-code": "https://github.com/fazlialtunn/hft-bitcoin-capstone",
  inzva: "https://inzva.com/ai-projects",
};

const PROJECT_ELEMENT_IDS: Record<string, string> = {
  nummoria: "project-nummoria",
  jobpilot: "project-jobpilot",
  "hft-btc": "project-hft-btc",
};

const EXPERIENCE_ELEMENT_IDS: Record<string, string> = {
  halkbank: "exp-halkbank",
  eyehub: "exp-eyehub",
  compro: "exp-compro",
};

const SKILLS_GROUP_ELEMENT_IDS: Record<string, string> = {
  "languages-tools": "skills-languages-tools",
  frameworks: "skills-frameworks",
  "ai-ml": "skills-ai-ml",
};

export type GuideActionHandlers = {
  onSwitchMode?: (mode: Extract<GuideAction, { type: "switch-mode" }>["mode"]) => void;
  onTriggerEasterEgg?: (id: Extract<GuideAction, { type: "trigger-easter-egg" }>["id"]) => void;
};

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  // A focused element inside Spider-Guide's fixed-position panel (the query
  // input, most often) blocks programmatic window scrolling in Chrome until
  // it loses focus — blur first so navigate/highlight actions actually move
  // the page. The visitor can click back into the input immediately after.
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
  // `behavior: "smooth"` here is unreliable — its animation can silently
  // never complete depending on browser/tab rendering state, leaving the
  // page stuck without ever reaching the target. An instant jump always
  // lands correctly, which matters more than the animation for a guide
  // action a visitor is actively waiting on.
  el.scrollIntoView({ behavior: "auto", block: "start" });
}

const HIGHLIGHT_CLASS = "guide-highlight";

function highlightElement(id: string, durationMs = 1800): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove(HIGHLIGHT_CLASS);
  window.requestAnimationFrame(() => {
    el.classList.add(HIGHLIGHT_CLASS);
    window.setTimeout(() => el.classList.remove(HIGHLIGHT_CLASS), durationMs);
  });
}

function openAllowlistedLink(id: GuideExternalLinkId): void {
  const url = ALLOWLISTED_LINKS[id];
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Runs the actions attached to a matched intent. Scroll/highlight requests
 * are collected rather than executed immediately — an intent with more than
 * one scroll-worthy action (e.g. `open-project` alongside a `navigate`)
 * would otherwise fire two competing `scrollIntoView` calls in the same
 * tick, which can leave the page scroll stuck rather than landing on
 * either target. Only the last-requested scroll/highlight target wins.
 */
export function executeGuideActions(
  actions: GuideAction[] | undefined,
  handlers: GuideActionHandlers = {},
  onExecuted?: GuideAnalyticsHandler
): void {
  if (!actions) return;

  let scrollTarget: string | undefined;
  let highlightTarget: string | undefined;
  let highlightDelayMs = 0;

  for (const action of actions) {
    switch (action.type) {
      case "navigate":
        scrollTarget = action.target;
        break;
      case "highlight":
        scrollTarget = action.target;
        highlightTarget = action.target;
        highlightDelayMs = 0;
        break;
      case "open-project":
        scrollTarget = "projects";
        highlightTarget = PROJECT_ELEMENT_IDS[action.projectId];
        highlightDelayMs = 350;
        break;
      case "open-experience":
        scrollTarget = "about";
        highlightTarget = EXPERIENCE_ELEMENT_IDS[action.experienceId];
        highlightDelayMs = 350;
        break;
      case "filter-skills":
        scrollTarget = "skills";
        highlightTarget = SKILLS_GROUP_ELEMENT_IDS[action.category];
        highlightDelayMs = 350;
        break;
      case "switch-mode":
        handlers.onSwitchMode?.(action.mode);
        break;
      case "open-resume":
        openAllowlistedLink("resume");
        break;
      case "open-contact":
        scrollTarget = "contact";
        break;
      case "open-link":
        openAllowlistedLink(action.linkId);
        break;
      case "trigger-easter-egg":
        handlers.onTriggerEasterEgg?.(action.id);
        break;
    }
    onExecuted?.({ type: "guide_action_executed", actionType: action.type });
  }

  if (scrollTarget) scrollToSection(scrollTarget);
  if (highlightTarget) {
    const delay = prefersReducedMotion() ? 0 : highlightDelayMs;
    const targetId = highlightTarget;
    window.setTimeout(() => highlightElement(targetId), delay);
  }
}
