// Single source of truth for the persona-portal system. All sections exist
// once in the component tree (see App.tsx) — a mode only changes render
// order, which section is emphasized, and a handful of CTA labels. No
// content is ever duplicated or persona-specific text hardcoded elsewhere.

export type SectionId =
  | "hero"
  | "about"
  | "skills"
  | "research"
  | "certificates"
  | "projects"
  | "services"
  | "contact"
  | "articles";

export const SECTION_IDS: SectionId[] = [
  "hero",
  "about",
  "skills",
  "research",
  "certificates",
  "projects",
  "services",
  "contact",
  "articles",
];

// Today's existing section order — used before a mode is chosen/applied,
// and as the safe fallback.
export const DEFAULT_ORDER: SectionId[] = [
  "hero",
  "about",
  "skills",
  "research",
  "certificates",
  "projects",
  "services",
  "contact",
  "articles",
];

export type PersonaMode = "recruiter" | "engineer" | "explorer";

export const PERSONA_MODES: PersonaMode[] = ["recruiter", "engineer", "explorer"];

export type BannerAction = {
  label: string;
  href: string;
  external?: boolean;
};

export type ModeConfig = {
  mode: PersonaMode;
  /** Portal card heading, e.g. "Recruiting Mert". */
  cardTitle: string;
  /** Portal card one-liner. */
  cardDescription: string;
  /** Short label used in the nav switcher pill, e.g. "recruiter". */
  label: string;
  /** One-line description shown in the persistent banner under the nav. */
  banner: string;
  order: SectionId[];
  /** Section that gets highlighted styling. */
  primary: SectionId;
  ctas: {
    /** Nav résumé-link label override. */
    resume: string;
    /** Contact section's primary button label override. */
    contact: string;
  };
  /** Real, separate action surfaced in the banner itself (not a relabeled
   * existing button) — e.g. a direct CV download or GitHub link. */
  bannerAction?: BannerAction;
  /** Recruiter-only signal shown in the banner. Not fabricated — reflects
   * the same "open to relocation" facts already stated in Hero. */
  availabilityBadge?: string;
  /** One-line framing hint shown near a section, e.g. softening a
   * technical section for a recruiter. Never rewrites section content. */
  sectionHints?: Partial<Record<SectionId, string>>;
};

export const MODES: Record<PersonaMode, ModeConfig> = {
  recruiter: {
    mode: "recruiter",
    cardTitle: "Recruiting Mert",
    cardDescription: "Experience, impact, résumé, availability, and contact.",
    label: "recruiter",
    banner:
      "Recruiter view — experience, skills, and shipped work are up first.",
    order: [
      "hero",
      "about",
      "skills",
      "projects",
      "certificates",
      "contact",
      "research",
      "services",
      "articles",
    ],
    primary: "about",
    ctas: {
      resume: "Download CV",
      contact: "Email Mert",
    },
    bannerAction: {
      label: "Download CV",
      href: "/resume/Goktug-Mert-Ozdogan-Resume.pdf",
      external: true,
    },
    availabilityBadge: "Available — open to relocation",
    sectionHints: {
      projects: "See the code (optional) — the impact is what matters here.",
    },
  },
  engineer: {
    mode: "engineer",
    cardTitle: "Inspecting the Engineer",
    cardDescription: "Technical decisions, GitHub repos, and write-ups.",
    label: "engineer",
    banner:
      "Engineer view — projects lead with why/how/what. There's a terminal easter egg too (press ~).",
    order: [
      "hero",
      "projects",
      "skills",
      "research",
      "articles",
      "about",
      "certificates",
      "contact",
      "services",
    ],
    primary: "projects",
    ctas: {
      resume: "git clone everything",
      contact: "Email the human behind the repos",
    },
    bannerAction: {
      label: "View GitHub",
      href: "https://github.com/gokmeroz",
      external: true,
    },
    sectionHints: {
      projects: "Why/how/what breakdowns, real repos, real stacks.",
      research: "Current multi-agent research work in progress.",
    },
  },
  explorer: {
    mode: "explorer",
    cardTitle: "Exploring the Person",
    cardDescription: "Interests, goals, personality, and interactive bits.",
    label: "explorer",
    banner: "Personal view — say hi to Spidey-Guide in the top-left corner.",
    order: [
      "hero",
      "research",
      "articles",
      "about",
      "skills",
      "projects",
      "services",
      "contact",
      "certificates",
    ],
    primary: "hero",
    ctas: {
      resume: "Okay fine, the serious stuff",
      contact: "Say hi",
    },
    sectionHints: {
      hero: "Interests, goals, and personality live here.",
    },
  },
};
