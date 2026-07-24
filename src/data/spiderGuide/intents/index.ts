import type { GuideIntent } from "../../../lib/spiderGuide/types";
import { overviewIntents } from "./overview";
import { careerIntents } from "./career";
import { experienceIntents } from "./experience";
import { projectsIntents } from "./projects";
import { backendIntents } from "./backend";
import { aiMlIntents } from "./aiMl";
import { systemDesignIntents } from "./systemDesign";
import { skillsIntents } from "./skills";
import { educationIntents } from "./education";
import { personalityIntents } from "./personality";
import { goalsIntents } from "./goals";
import { relocationIntents } from "./relocation";
import { recruiterIntents } from "./recruiter";
import { contactIntents } from "./contact";
import { websiteIntents } from "./website";

export const ALL_INTENTS: GuideIntent[] = [
  ...overviewIntents,
  ...careerIntents,
  ...experienceIntents,
  ...projectsIntents,
  ...backendIntents,
  ...aiMlIntents,
  ...systemDesignIntents,
  ...skillsIntents,
  ...educationIntents,
  ...personalityIntents,
  ...goalsIntents,
  ...relocationIntents,
  ...recruiterIntents,
  ...contactIntents,
  ...websiteIntents,
];
