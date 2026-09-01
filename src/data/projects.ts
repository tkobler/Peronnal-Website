export type ProjectDomain =
  | "Microelectronics & Photonics"
  | "Product Engineering & IoT"
  | "Robotics & AI"
  | "Industrial Design & Mechanical";

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  descriptor: string;
  featured: boolean;
  domain: ProjectDomain;
  course?: string;
  heroImage: string;
  detail: {
    description: {
      what: string;
      how: string;
      why: string;
    };
    methodology?: string;
    challenges?: string[];
    publication?: string;
    images?: { src: string; alt: string; caption?: string; section?: string }[];
    role: string;
    duration: string;
    technologies: string[];
    keyResults?: string[];
    scope?: string;
  };
}

// This file ships with four example projects, one per domain, so the layout
// and canvas features have something to render. Replace them with your own —
// see SETUP.md §2.1. Nothing else in the codebase depends on these specific ids.

const projects: Project[] = [
  {
    id: "solar-boat-control-logic",
    number: "01",
    title: "Global Control Logic for a Foiling Hydrogen Boat",
    tagline: "Safety-first FSM architecture for a hydrogen-powered foiling boat",
    descriptor: "Product Engineering & IoT · Academic",
    domain: "Product Engineering & IoT",
    featured: true,
    heroImage: "/images/placeholders/wide.svg",
    detail: {
      description: {
        why: "Individual subsystems (HV, hydrogen, cooling, dashboard, foil control) had each been developed and validated in isolation across prior semesters, but the boat had no unifying control layer to bring them into one safety-first system ready for on-water testing.",
        what: "A hierarchical, safety-first finite state machine that governs every subsystem of the Lobst'air, a three-passenger hydrogen-powered foiling boat, from a single real-time control architecture running on the boat's onboard computer.",
        how: "Built a modular MATLAB Simulink/Stateflow architecture — Safety first approach and per-subsystem CAN-connected blocks — compiled to C++ and deployed on a Speedgoat target, developed through three Agile-inspired phases: architecture, integration, then on-water validation.",
      },
      role: "Overall Software Architecture Engineer and Coordinator",
      duration: "Spring 2026",
      technologies: ["MATLAB Simulink", "Stateflow", "Speedgoat / Simulink Real-Time", "CAN Bus (DBC)", "XCP Protocol"],
      scope: "Semester project · Swiss Solar Boat · Spring 2026",
    },
  },
  {
    id: "cochlear-implant-insertion-mechanism",
    number: "02",
    title: "Cochlear Implant Insertion Mechanism",
    tagline: "A force-sensing insertion mechanism and fluid-sealed training platform for cochlear implant surgery",
    descriptor: "Product Engineering & IoT · Professional",
    domain: "Product Engineering & IoT",
    featured: true,
    heroImage: "/images/projects/cochlear-implant-insertion-mechanism/hero.jpeg",
    detail: {
      description: {
        why: "Cochlear implant insertion is done by feel, with no objective measurement of the force applied to the fragile scala tympani — the lab's prototype for studying this needed a simpler, more reliable redesign.",
        what: "A redesigned, force-instrumented insertion mechanism for cochlear implant electrodes, paired with an in-vitro training platform that seals a 3D-printed scala tympani model to simulate real inner-ear fluid flow.",
        how: "Iterated the force-sensing table through SLA-printed prototypes, characterized the load cell's linearity and drift, wrote ESP32 firmware for foot-pedal-controlled insertion with real-time logging, and validated on 3D-printed cochlea and skull models.",
      },
      role: "R&D Engineer",
      duration: "Spring 2025",
      technologies: ["Embedded C", "Custom PCB Design", "SPI Force Sensing", "SLA 3D Printing", "CAD (Fusion 360)"],
      keyResults: [
        "Characterized the custom load-cell force sensor to a correction factor of ~1.04 with a measured ~4 mN/°C thermal drift, both correctable in firmware",
        "Validated the redesigned insertion mechanism on 3D-printed cochlea and skull models, logging real-time force and temperature through full insertion and extraction cycles",
        "Simplified and redesigned the SLA-printed compliant mechanism and electronics (custom PCB + ESP32 firmware), replacing an earlier prototype per the project's sterilizability, reliability, and compactness criteria",
      ],
      scope: "Professional · ARTORG Center, Inselspital · Spring 2025",
    },
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
