import type { GuideCategory } from "../../lib/spiderGuide/types";

export const CATEGORY_LABELS: Record<GuideCategory, string> = {
  overview: "Overview",
  career: "Mindset & Career",
  experience: "Experience",
  projects: "Projects",
  backend: "Backend",
  "ai-ml": "AI / ML",
  "system-design": "System Design",
  skills: "Skills",
  education: "Education",
  personality: "Personality",
  goals: "Goals",
  relocation: "Relocation & Visa",
  recruiter: "For Recruiters",
  contact: "Contact",
  website: "About This Guide",
};

export const CATEGORY_ORDER: GuideCategory[] = [
  "overview",
  "recruiter",
  "projects",
  "backend",
  "ai-ml",
  "system-design",
  "experience",
  "skills",
  "education",
  "career",
  "goals",
  "relocation",
  "personality",
  "contact",
  "website",
];
