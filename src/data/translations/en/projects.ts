import type { Translations } from "../index";

export const projects: Translations["projects"] = {
  heading: "Projects",
  subtitle: "Selected engineering and academic projects",
  contextLabel: "Context (The Why)",
  solutionLabel: "Solution (The What)",
  implementationLabel: "Implementation (The How)",
  roleLabel: "Role",
  durationLabel: "Duration",
  technologiesLabel: "Technologies",
  moreDetails: "More Details",
  back: "Back",
  wantMore: "Want to see more?",
  wantMoreSub: "Browse the complete collection of engineering, research, and creative work.",
  fullPortfolio: "Full Portfolio",
  byDomain: "By Domain",
  listView: "List View",
  backToDomains: "Back to Domains",
  exploreDomain: "Explore Domain",
  keyResultsLabel: "Key Results",
  scopeLabel: "Scope",
  methodologyLabel: "Methodology",
  challengesLabel: "Challenges & Decisions",
  publicationLabel: "Publication",
  filterAll: "All",
  domains: {
    "Microelectronics & Photonics": { name: "Microelectronics & Photonics", desc: "IC Design, Silicon Photonics & RF Systems" },
    "Product Engineering & IoT": { name: "Product Engineering & IoT", desc: "Embedded Systems & Connected Devices" },
    "Robotics & AI": { name: "Robotics & AI", desc: "Autonomous Agents & Neural Control" },
    "Industrial Design & Mechanical": { name: "Industrial Design & Mechanical", desc: "Precision Mechanisms & Product Design" },
  },
};

export const projectsContent: Translations["projectsContent"] = {
  "solar-boat-control-logic": {
    title: "Global Control Logic for a Foiling Hydrogen Boat",
    tagline: "Safety-first FSM architecture for a hydrogen-powered foiling boat",
    descriptor: "Product Engineering & IoT · Academic",
    detail: {
      description: {
        why: "Individual subsystems (HV, hydrogen, cooling, dashboard, foil control) had each been developed and validated in isolation across prior semesters, but the boat had no unifying control layer to bring them into one safety-first system ready for on-water testing.",
        what: "A hierarchical, safety-first finite state machine that governs every subsystem of the Lobst'air, a three-passenger hydrogen-powered foiling boat, from a single real-time control architecture running on the boat's onboard computer.",
        how: "Built a modular MATLAB Simulink/Stateflow architecture — Safety first approach and per-subsystem CAN-connected blocks — compiled to C++ and deployed on a Speedgoat target, developed through three Agile-inspired phases: architecture, integration, then on-water validation.",
      },
      role: "Overall Software Architecture Engineer and Coordinator",
      duration: "Spring 2026",
      scope: "Semester project · Swiss Solar Boat · Spring 2026",
    },
  },
  "cochlear-implant-insertion-mechanism": {
    title: "Cochlear Implant Insertion Mechanism",
    tagline: "A force-sensing insertion mechanism and fluid-sealed training platform for cochlear implant surgery",
    descriptor: "Product Engineering & IoT · Professional",
    detail: {
      description: {
        why: "Cochlear implant insertion is done by feel, with no objective measurement of the force applied to the fragile scala tympani — the lab's prototype for studying this needed a simpler, more reliable redesign.",
        what: "A redesigned, force-instrumented insertion mechanism for cochlear implant electrodes, paired with an in-vitro training platform that seals a 3D-printed scala tympani model to simulate real inner-ear fluid flow.",
        how: "Iterated the force-sensing table through SLA-printed prototypes, characterized the load cell's linearity and drift, wrote ESP32 firmware for foot-pedal-controlled insertion with real-time logging, and validated on 3D-printed cochlea and skull models.",
      },
      role: "R&D Engineer",
      duration: "Spring 2025",
      keyResults: [
        "Characterized the custom load-cell force sensor to a correction factor of ~1.04 with a measured ~4 mN/°C thermal drift, both correctable in firmware",
        "Validated the redesigned insertion mechanism on 3D-printed cochlea and skull models, logging real-time force and temperature through full insertion and extraction cycles",
        "Simplified and redesigned the SLA-printed compliant mechanism and electronics (custom PCB + ESP32 firmware), replacing an earlier prototype per the project's sterilizability, reliability, and compactness criteria",
      ],
      scope: "Professional · ARTORG Center, Inselspital · Spring 2025",
    },
  },
};
