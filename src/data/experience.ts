// Work experience shown in the Experience section. Shared with the hero's
// comic cover, whose "open the issue" pages list the same roles.
export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    id: "exp-halkbank",
    title: "Full-Stack Software Engineering Intern",
    company: "Halkbank — One of Turkey's Largest State-Owned Banks",
    location: "Istanbul, Turkey",
    date: "Apr 2025 - Jul 2025",
    bullets: [
      "Contributed to a Personnel Absence System serving 10,000+ employees, implementing attendance-tracking logic in C#/.NET Core across 75+ relational tables (holidays, medical leave, approval workflows).",
      "Built a full-stack Angular + ASP.NET Core solution for real-time reporting and high-volume data processing across 800+ branch-level operations nationwide.",
      "Delivered features end-to-end in an enterprise Agile/Scrum environment, participating in sprint planning, code reviews, and production deployments.",
    ],
  },
  {
    id: "exp-eyehub",
    title: "Backend Engineer",
    company: "Eyehub — TUBITAK Government Research Project 122E085",
    location: "Istanbul, Turkey",
    date: "Nov 2023 - Jun 2024",
    bullets: [
      "Served as backend engineer for a government-funded (TUBITAK) dyslexia-detection mobile app, designing and deploying scalable backend infrastructure on AWS (EC2, Lambda) for concurrent research data ingestion.",
      "Modeled complex medical datasets in MongoDB (NoSQL), enforcing strict data-integrity standards for academic analysis and IRB compliance.",
      "Built secure, high-performance RESTful APIs in Node.js powering mobile client sync, authentication, and real-time data submission.",
      "Collaborated directly with university researchers under Prof. Gunet Eroglu, translating clinical requirements into production-grade backend systems on tight academic milestones.",
    ],
  },
  {
    id: "exp-compro",
    title: "Software Engineering Intern",
    company: "ComPro — IBM Platinum Partner",
    location: "Istanbul, Turkey",
    date: "Aug 2023 - Sep 2023",
    bullets: [
      "Contributed to enterprise cloud migration projects at Turkey's leading IBM Platinum Partner, gaining production-level experience with Docker containerization, CI/CD pipelines, and Linux system administration.",
      "Built proof-of-concept Docker environments for legacy backend modernization, enabling faster iteration cycles for internal dev teams and client demos.",
      "Conducted technical evaluation of IBM Cloud vs. AWS for containerized workloads, analyzing cost/performance trade-offs across compute, storage, and orchestration to inform client migration strategy.",
    ],
  },
];
