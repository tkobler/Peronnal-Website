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

export const bachelorGpa = 4.69;
export const bachelorCredits = 180;
export const masterGpa = 5.43;
export const masterCreditsObtained = 68;
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

export const highlightCourses: HighlightCourse[] = [
  {
    code: "MICRO-502", name: "Aerial Robotics", professor: "Prof. D. Floreano",
    courseUrl: "https://edu.epfl.ch/coursebook/en/aerial-robotics-MICRO-502",
    professorLinks: [{ name: "Dario Floreano", url: "https://people.epfl.ch/dario.floreano" }],
    projectId: "aerial-robotics",
  },
  {
    code: "MICRO-515", name: "Evolutionary Robotics", professor: "Prof. D. Floreano",
    courseUrl: "https://edu.epfl.ch/coursebook/en/evolutionary-robotics-MICRO-515",
    professorLinks: [{ name: "Dario Floreano", url: "https://people.epfl.ch/dario.floreano" }],
    projectId: "rough-terrain",
  },
  {
    code: "MICRO-516", name: "Nanophotonics", professor: "Prof. K. Moselund",
    courseUrl: "https://edu.epfl.ch/coursebook/en/nanophotonics-MICRO-516",
    professorLinks: [{ name: "Kirsten Moselund", url: "https://people.epfl.ch/kirsten.moselund" }],
  },
  {
    code: "MICRO-421", name: "Computational Optical Imaging", professor: "Prof. D. Psaltis",
    courseUrl: "https://edu.epfl.ch/coursebook/en/computational-optical-imaging-MICRO-421",
    professorLinks: [{ name: "Demetri Psaltis", url: "https://people.epfl.ch/demetri.psaltis" }],
  },
  {
    code: "MICRO-435", name: "Quantum & Nanocomputing", professor: "Prof. E. Charbon & Prof. M. Graziano",
    courseUrl: "https://edu.epfl.ch/coursebook/en/quantum-and-nanocomputing-MICRO-435",
    professorLinks: [
      { name: "Edoardo Charbon", url: "https://people.epfl.ch/edoardo.charbon" },
      { name: "Mariagrazia Graziano", url: "https://people.epfl.ch/mariagrazia.graziano" },
    ],
  },
  {
    code: "MICRO-530", name: "Nanotechnology", professor: "Prof. J. Brugger",
    courseUrl: "https://edu.epfl.ch/coursebook/en/nanotechnology-MICRO-530",
    professorLinks: [{ name: "Juergen Brugger", url: "https://people.epfl.ch/juergen.brugger" }],
  },
  {
    code: "EE-320", name: "Analog IC Design", professor: "Prof. M. Shoaran",
    courseUrl: "https://edu.epfl.ch/coursebook/en/analog-ic-design-EE-320",
    professorLinks: [{ name: "Mahsa Shoaran", url: "https://people.epfl.ch/mahsa.shoaran" }],
  },
  {
    code: "EE-523", name: "Advanced Analog IC Design", professor: "Prof. M. Shoaran",
    courseUrl: "https://edu.epfl.ch/coursebook/en/advanced-analog-integrated-circuit-design-EE-523",
    professorLinks: [{ name: "Mahsa Shoaran", url: "https://people.epfl.ch/mahsa.shoaran" }],
  },
  {
    code: "EE-426", name: "RF Circuits Design Techniques", professor: "Prof. D. Ruffieux",
    courseUrl: "https://edu.epfl.ch/coursebook/en/radio-frequency-circuits-design-techniques-EE-426",
    professorLinks: [{ name: "David Ruffieux", url: "https://people.epfl.ch/david.ruffieux" }],
    projectId: "sdr-receiver",
  },
  {
    code: "HYLAB", name: "Semester Project — Sub-THz Photonics", professor: "Prof. I.-C. Benea-Chelmus",
    courseUrl: "https://www.epfl.ch/labs/hylab/student-projects/",
    professorLinks: [{ name: "Ileana-Cristina Benea-Chelmus", url: "https://people.epfl.ch/cristina.benea" }],
    projectId: "hylab-modulators",
  },
  {
    code: "MICRO-499", name: "Semester Project — Spacecraft Team", professor: "Prof. J.-P. Kneib",
    courseUrl: "https://edu.epfl.ch/coursebook/en/microengineering-project-ii-MICRO-499",
    professorLinks: [{ name: "Jean-Paul Kneib", url: "https://people.epfl.ch/jean-paul.kneib" }],
    projectId: "ground-segment",
  },
  {
    code: "MICRO-406", name: "Products Design & Systems Engineering", professor: "Prof. Y. Bellouard & Prof. E. Charbon",
    courseUrl: "https://edu.epfl.ch/coursebook/en/products-design-systems-engineering-MICRO-406",
    professorLinks: [
      { name: "Yves Bellouard", url: "https://people.epfl.ch/yves.bellouard" },
      { name: "Edoardo Charbon", url: "https://people.epfl.ch/edoardo.charbon" },
    ],
    projectId: "guardian-angel",
  },
];

export const curriculum: AcademicYear[] = [
  {
    id: "ba2",
    label: "BA4–BA5",
    blocks: [
      {
        label: "Block 1",
        courses: [
          { code: "MATH-203", name: "Analysis III", grade: 4.25, credits: 4, session: "02.2023" },
          { code: "MATH-212", name: "Numerical Analysis & Optimization", grade: 5, credits: 6, session: "07.2023" },
          { code: "MATH-207", name: "Analysis IV", grade: 5.25, credits: 4, session: "07.2023" },
          { code: "EE-209", name: "Statistics for Data Science", grade: 4.25, credits: 3, session: "07.2023" },
          { code: "PHYS-201", name: "General Physics: Electromagnetism", grade: 3.75, credits: 6, session: "02.2023" },
        ],
      },
      {
        label: "Block 2",
        courses: [
          { code: "MICRO-200", name: "Mechanism Design I", grade: 4.25, credits: 6, session: "02.2023", domain: "Industrial Design & Mechanical" },
          { code: "MICRO-201", name: "Mechanism Design II", grade: 5.5, credits: 6, session: "07.2023", domain: "Industrial Design & Mechanical", projectId: "dynabal" },
          { code: "EE-202", name: "Electronics I", grade: 4.75, credits: 4, session: "02.2023", domain: "Microelectronics & Photonics" },
          { code: "EE-203", name: "Electronics II", grade: 5.25, credits: 4, session: "07.2023", domain: "Microelectronics & Photonics" },
          { code: "MICRO-210", name: "Microcontrollers", grade: 5.25, credits: 3, session: "07.2023", domain: "Product Engineering & IoT" },
          { code: "MSE-214", name: "Materials Processing I", grade: 5.5, credits: 3, session: "02.2023" },
          { code: "MSE-215", name: "Materials Processing II", grade: 4.75, credits: 3, session: "07.2023" },
          { code: "EE-110", name: "Logic Systems", grade: 5, credits: 3, session: "02.2023", domain: "Microelectronics & Photonics" },
        ],
      },
      {
        label: "Transverse (SHS)",
        courses: [
          { code: "HUM-274", name: "Musical Theory & Creativity", grade: 5.75, credits: 2, session: "07.2023" },
          { code: "HUM-378", name: "Creativity & Participatory Design", grade: 5.25, credits: 2, session: "02.2024" },
          { code: "MGT-302", name: "Data Driven Business Analytics", grade: 5.75, credits: 2, session: "07.2024" },
          { code: "MGT-200", name: "Economic Thinking", grade: 5.25, credits: 2, session: "02.2023" },
        ],
      },
    ],
  },
  {
    id: "ba3",
    label: "BA6–BA7",
    blocks: [
      {
        label: "Block 3",
        courses: [
          { code: "MICRO-313/314", name: "Actuators & Electromagnetic Systems I, II", grade: 4.25, credits: 7, session: "07.2024" },
          { code: "ME-326", name: "Control Systems & Discrete-Time Control", grade: 5.25, credits: 6, session: "02.2024", domain: "Robotics & AI" },
          { code: "MICRO-310", name: "Signals & Systems I", grade: 4.5, credits: 4, session: "02.2024", domain: "Microelectronics & Photonics" },
          { code: "MICRO-311", name: "Signals & Systems II", grade: 3.5, credits: 4, session: "07.2024", domain: "Microelectronics & Photonics" },
        ],
      },
      {
        label: "Block 4",
        courses: [
          { code: "EE-336", name: "Electronic Circuits & Systems", grade: 5, credits: 3, session: "02.2024", domain: "Microelectronics & Photonics" },
          { code: "MICRO-321", name: "Optical Engineering", grade: 4.5, credits: 6, session: "02.2024", domain: "Microelectronics & Photonics" },
          { code: "MICRO-315", name: "Embedded Systems & Robotics", grade: 4.5, credits: 6, session: "07.2024", domain: "Robotics & AI" },
        ],
      },
      {
        label: "Block 5",
        courses: [
          { code: "MICRO-330", name: "Sensors", grade: 4.5, credits: 5, session: "07.2024", domain: "Microelectronics & Photonics" },
          { code: "MICRO-301", name: "Manufacturing Technologies", grade: 4.75, credits: 4, session: "07.2024", domain: "Industrial Design & Mechanical", projectId: "durandal" },
          { code: "MICRO-332", name: "Microfabrication Practicals", grade: 5.25, credits: 2, session: "02.2024", domain: "Microelectronics & Photonics" },
          { code: "MICRO-331", name: "Microfabrication Technologies", grade: 5.25, credits: 4, session: "02.2024", domain: "Microelectronics & Photonics" },
        ],
      },
      {
        label: "Options",
        courses: [
          { code: "MICRO-373", name: "Advanced Microfabrication Practicals", grade: 6, credits: 3, session: "07.2024", domain: "Microelectronics & Photonics", projectId: "photonic-chip" },
          { code: "MICRO-312", name: "Physics of Semiconductor Devices", grade: 5.5, credits: 3, session: "02.2024", domain: "Microelectronics & Photonics" },
        ],
      },
    ],
  },
  {
    id: "ma1",
    label: "MA1–MA2",
    blocks: [
      {
        label: "Block 1",
        courses: [
          { code: "MICRO-455", name: "Machine Learning I", grade: 4.25, credits: 4, session: "02.2025", domain: "Robotics & AI" },
          { code: "MICRO-406", name: "Products Design & Systems Engineering", grade: 5.75, credits: 10, session: "02.2026", domain: "Product Engineering & IoT", projectId: "guardian-angel" },
          { code: "MICRO-498", name: "Microengineering Project I", grade: 5.75, credits: 10, session: "02.2026" },
        ],
      },
      {
        label: "Bases",
        courses: [
          { code: "MICRO-421", name: "Computational Optical Imaging", credits: 4, session: "02.2026", domain: "Microelectronics & Photonics" },
          { code: "ME-413", name: "Introduction to Additive Manufacturing", grade: 4.75, credits: 3, session: "02.2025", domain: "Industrial Design & Mechanical" },
          { code: "MICRO-448", name: "Manufacturing Systems & Supply Chain Dynamics", grade: 4.75, credits: 3, session: "07.2025" },
          { code: "MICRO-530", name: "Nanotechnology", grade: 4.25, credits: 3, session: "07.2025", domain: "Microelectronics & Photonics" },
          { code: "EE-536", name: "Physical Models for Micro & Nanosystems", credits: 3, session: "02.2026", domain: "Microelectronics & Photonics" },
        ],
      },
      {
        label: "Options",
        courses: [
          { code: "EE-523", name: "Advanced Analog IC Design", grade: 4, credits: 3, session: "07.2025", domain: "Microelectronics & Photonics" },
          { code: "MICRO-502", name: "Aerial Robotics", grade: 5, credits: 5, session: "07.2025", domain: "Robotics & AI", projectId: "aerial-robotics" },
          { code: "EE-320", name: "Analog IC Design", grade: 6, credits: 3, session: "02.2026", domain: "Microelectronics & Photonics" },
          { code: "MICRO-515", name: "Evolutionary Robotics", grade: 5.75, credits: 3, session: "07.2025", domain: "Robotics & AI", projectId: "rough-terrain" },
          { code: "MICRO-516", name: "Nanophotonics", grade: 5.25, credits: 3, session: "07.2025", domain: "Microelectronics & Photonics" },
          { code: "MICRO-435", name: "Quantum & Nanocomputing", grade: 4.75, credits: 6, session: "02.2026", domain: "Microelectronics & Photonics" },
          { code: "EE-426", name: "RF Circuits Design Techniques", grade: 6, credits: 4, session: "02.2026", domain: "Microelectronics & Photonics", projectId: "sdr-receiver" },
          { code: "HUM-403", name: "Experimental Cognitive Psychology I", grade: 5, credits: 3, session: "02.2025" },
          { code: "HUM-457", name: "Experimental Cognitive Psychology II", grade: 5.25, credits: 3, session: "07.2025" },
          { code: "MICRO-499", name: "Microengineering Project II", credits: 10, session: "07.2026", domain: "Microelectronics & Photonics", projectId: "ground-segment" },
          { code: "MGT-455", name: "Practical Business Law", credits: 4, session: "07.2026" },
        ],
      },
    ],
  },
];
