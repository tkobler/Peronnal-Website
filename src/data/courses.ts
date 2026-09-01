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
  professor: string;
  courseUrl?: string;
  professorLinks: ProfessorLink[];
  projectId?: string;
}

// Real EPFL course codes/names, paired with the four example projects above.
// Swap the projectId links (or the courses themselves) once you've replaced
// projects.ts with your own work.
export const highlightCourses: HighlightCourse[] = [
  {
    code: "MICRO-502", name: "Aerial Robotics", professor: "Prof. D. Floreano",
    courseUrl: "https://edu.epfl.ch/coursebook/en/aerial-robotics-MICRO-502",
    professorLinks: [{ name: "Dario Floreano", url: "https://people.epfl.ch/dario.floreano" }],
    projectId: "terrain-rover",
  },
  {
    code: "MICRO-373", name: "Advanced Microfabrication Practicals", professor: "Prof. I.-C. Benea-Chelmus",
    courseUrl: "https://edu.epfl.ch/coursebook/en/advanced-microfabrication-practicals-MICRO-373",
    professorLinks: [{ name: "Ileana-Cristina Benea-Chelmus", url: "https://people.epfl.ch/cristina.benea" }],
    projectId: "ring-resonator",
  },
  {
    code: "MICRO-315", name: "Embedded Systems & Robotics", professor: "Prof. F. Mondada",
    courseUrl: "https://edu.epfl.ch/coursebook/en/embedded-systems-and-robotics-MICRO-315",
    professorLinks: [{ name: "Francesco Mondada", url: "https://people.epfl.ch/francesco.mondada" }],
    projectId: "signal-relay",
  },
  {
    code: "MICRO-201", name: "Mechanism Design II", professor: "Prof. S. Henein",
    courseUrl: "https://edu.epfl.ch/coursebook/en/mechanism-design-ii-MICRO-201",
    professorLinks: [{ name: "Simon Henein", url: "https://people.epfl.ch/simon.henein" }],
    projectId: "dynabal-nanoforce-sensor",
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
          { code: "MICRO-315", name: "Embedded Systems & Robotics", grade: 4.5, credits: 6, session: "07.2024", domain: "Robotics & Autonomous Control", projectId: "signal-relay" },
          { code: "MICRO-373", name: "Advanced Microfabrication Practicals", grade: 5.5, credits: 3, session: "07.2024", domain: "Embedded Systems & Electronics", projectId: "ring-resonator" },
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
          { code: "MICRO-502", name: "Aerial Robotics", grade: 5, credits: 5, session: "07.2025", domain: "Robotics & Autonomous Control", projectId: "terrain-rover" },
          { code: "MICRO-455", name: "Machine Learning I", grade: 4.5, credits: 4, session: "02.2025", domain: "Robotics & Autonomous Control" },
          { code: "MGT-434", name: "Technology Ventures I", credits: 3, session: "02.2026", domain: "Embedded Systems & Electronics", projectId: "motion-focus" },
          { code: "ME-425", name: "Model Predictive Control", grade: 5.25, credits: 6, session: "02.2026", domain: "Robotics & Autonomous Control", projectId: "mpc-rocket-landing-controller" },
          { code: "MICRO-452", name: "Basics of Mobile Robotics", credits: 4, session: "02.2026", domain: "Robotics & Autonomous Control", projectId: "thymio-autonomous-navigation" },
        ],
      },
    ],
  },
];
