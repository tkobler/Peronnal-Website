import type { ProjectDomain } from "./projects";

export interface Course {
  code: string;
  name: string;
  grade?: number;
  credits: number;
  session: string;
  domain?: ProjectDomain;
  projectId?: string;
}

export interface AcademicYear {
  id: string;
  label: string;
  blocks: {
    label: string;
    courses: Course[];
  }[];
}

// Example figures — replace with your own transcript. See SETUP.md §2.1.
export const bachelorGpa = 5.0;
export const bachelorCredits = 180;
export const masterGpa = 5.2;
export const masterCreditsObtained = 60;
export const masterCreditsTotal = 120;

export interface ProfessorLink {
  name: string;
  url: string;
}

export interface HighlightCourse {
  code: string;
  name: string;
  courseUrl?: string;
  professorLinks: ProfessorLink[];
  projectId?: string;
}

// Master-level coursework at EPFL. Course pages link to the official EPFL
// coursebook; professors link to their people.epfl.ch profile. Courses with a
// matching entry in projects.ts carry a projectId so the card links to it.
export const highlightCourses: HighlightCourse[] = [
  {
    code: "ME-425", name: "Model Predictive Control",
    courseUrl: "https://edu.epfl.ch/coursebook/en/model-predictive-control-ME-425",
    professorLinks: [{ name: "Colin Neil Jones", url: "https://people.epfl.ch/colin.jones" }],
    projectId: "mpc-rocket-landing-controller",
  },
  {
    code: "ME-422", name: "Multivariable Control",
    courseUrl: "https://edu.epfl.ch/coursebook/en/multivariable-control-ME-422",
    professorLinks: [{ name: "Giancarlo Ferrari Trecate", url: "https://people.epfl.ch/giancarlo.ferraritrecate" }],
  },
  {
    code: "MICRO-553", name: "Haptic Human Robot Interfaces",
    courseUrl: "https://edu.epfl.ch/coursebook/en/haptic-human-robot-interfaces-MICRO-553",
    professorLinks: [
      { name: "Solaiman Shokur", url: "https://people.epfl.ch/solaiman.shokur" },
      { name: "Mohamed Bouri", url: "https://people.epfl.ch/mohamed.bouri" },
    ],
  },
  {
    code: "MICRO-582", name: "Semester Project - Swiss Solar Boat",
    courseUrl: "https://edu.epfl.ch/coursebook/en/interdisciplinary-project-MICRO-582",
    professorLinks: [],
    projectId: "solar-boat-control-logic",
  },
  {
    // Taught in French — only the French coursebook page exists for this one.
    code: "MICRO-510", name: "Commande embarquée de moteurs",
    courseUrl: "https://edu.epfl.ch/coursebook/fr/commande-embarquee-de-moteurs-MICRO-510",
    professorLinks: [
      { name: "Yves Perriard", url: "https://people.epfl.ch/yves.perriard" },
      { name: "André Hodder", url: "https://people.epfl.ch/andre.hodder" },
      { name: "Christian Köchli", url: "https://people.epfl.ch/christian.koechli" },
    ],
  },
  {
    code: "MICRO-507", name: "Legged Robots",
    courseUrl: "https://edu.epfl.ch/coursebook/en/legged-robots-MICRO-507",
    professorLinks: [{ name: "Auke Ijspeert", url: "https://people.epfl.ch/auke.ijspeert" }],
  },
  {
    code: "ME-410", name: "Mechanical Product Design and Development",
    courseUrl: "https://edu.epfl.ch/coursebook/en/mechanical-product-design-and-development-ME-410",
    professorLinks: [{ name: "Jamie Paik", url: "https://people.epfl.ch/jamie.paik" }],
  },
  {
    code: "MICRO-455", name: "Machine Learning I",
    courseUrl: "https://edu.epfl.ch/coursebook/en/machine-learning-i-MICRO-455",
    professorLinks: [{ name: "Aude Billard", url: "https://people.epfl.ch/aude.billard" }],
  },
  {
    code: "MGT-434", name: "Technology Ventures I",
    courseUrl: "https://edu.epfl.ch/coursebook/en/technology-ventures-i-MGT-434",
    professorLinks: [{ name: "Davide Bavato", url: "https://people.epfl.ch/davide.bavato" }],
    projectId: "motion-focus",
  },
  {
    code: "MGT-436", name: "Technology Ventures II",
    courseUrl: "https://edu.epfl.ch/coursebook/en/technology-ventures-ii-MGT-436",
    professorLinks: [{ name: "Davide Bavato", url: "https://people.epfl.ch/davide.bavato" }],
  },
  {
    code: "MICRO-452", name: "Basics of Mobile Robotics",
    courseUrl: "https://edu.epfl.ch/coursebook/en/basics-of-mobile-robotics-MICRO-452",
    professorLinks: [{ name: "Francesco Mondada", url: "https://people.epfl.ch/francesco.mondada" }],
    projectId: "thymio-autonomous-navigation",
  },
  {
    code: "MICRO-450", name: "Basics of Robotics for Manipulation",
    courseUrl: "https://edu.epfl.ch/coursebook/en/basics-of-robotics-for-manipulation-MICRO-450",
    professorLinks: [{ name: "Mohamed Bouri", url: "https://people.epfl.ch/mohamed.bouri" }],
  },
  {
    code: "MGT-427", name: "Project Management and Risk Analysis",
    courseUrl: "https://edu.epfl.ch/coursebook/en/project-management-and-risk-analysis-MGT-427",
    professorLinks: [{ name: "Philippe Wieser", url: "https://people.epfl.ch/philippe.wieser" }],
  },
];

export const curriculum: AcademicYear[] = [
  {
    id: "ba3",
    label: "BA6–BA7",
    blocks: [
      {
        label: "Block 1",
        courses: [
          { code: "MICRO-201", name: "Mechanism Design II", grade: 5.5, credits: 6, session: "07.2023", domain: "Biomedical & Precision Instrumentation", projectId: "dynabal-nanoforce-sensor" },
          { code: "EE-202", name: "Electronics I", grade: 4.75, credits: 4, session: "02.2023", domain: "Embedded Systems & Electronics" },
          { code: "MICRO-210", name: "Microcontrollers", grade: 5.25, credits: 3, session: "07.2023", domain: "Embedded Systems & Electronics" },
        ],
      },
      {
        label: "Block 2",
        courses: [
          { code: "MICRO-315", name: "Embedded Systems & Robotics", grade: 4.5, credits: 6, session: "07.2024", domain: "Robotics & Autonomous Control" },
          { code: "MICRO-373", name: "Advanced Microfabrication Practicals", grade: 5.5, credits: 3, session: "07.2024", domain: "Embedded Systems & Electronics" },
        ],
      },
    ],
  },
  {
    id: "ma1",
    label: "MA1–MA2",
    blocks: [
      {
        label: "Options",
        courses: [
          { code: "MICRO-502", name: "Aerial Robotics", grade: 5, credits: 5, session: "07.2025", domain: "Robotics & Autonomous Control" },
          { code: "MICRO-455", name: "Machine Learning I", grade: 4.5, credits: 4, session: "02.2025", domain: "Robotics & Autonomous Control" },
          { code: "MGT-434", name: "Technology Ventures I", credits: 3, session: "02.2026", domain: "Embedded Systems & Electronics", projectId: "motion-focus" },
          { code: "ME-425", name: "Model Predictive Control", grade: 5.25, credits: 6, session: "02.2026", domain: "Robotics & Autonomous Control", projectId: "mpc-rocket-landing-controller" },
          { code: "MICRO-452", name: "Basics of Mobile Robotics", credits: 4, session: "02.2026", domain: "Robotics & Autonomous Control", projectId: "thymio-autonomous-navigation" },
        ],
      },
    ],
  },
];
