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
  "signal-relay": {
    title: "Low-Power Mesh Signal Relay",
    tagline: "Battery-powered relay for field sensor networks",
    descriptor: "Product Engineering & IoT · Academic",
    detail: {
      description: {
        why: "Field sensor deployments often sit outside Wi-Fi and cellular range, and running mains power to every node isn't practical.",
        what: "A battery-powered relay node that forwards sensor readings over a low-power mesh, extending network range without a fixed power source.",
        how: "Built around a low-power microcontroller with a duty-cycled radio stack, sleeping between transmission windows to stretch battery life across a multi-month deployment.",
      },
      role: "Embedded Systems Engineer",
      duration: "Spring 2025",
      keyResults: [
        "Multi-week battery life on a single charge under a realistic duty cycle",
        "Reliable multi-hop delivery across a test deployment of 6 nodes",
        "Custom PCB and enclosure designed for outdoor use",
      ],
      scope: "Course project · MICRO-315 · Spring 2025",
    },
  },
  "ring-resonator": {
    title: "Integrated Ring Resonator",
    tagline: "Silicon photonics filter design and characterization",
    descriptor: "Microelectronics & Photonics · Academic",
    detail: {
      description: {
        why: "Ring resonators are a building block for on-chip optical filtering, and hands-on fabrication is the best way to understand where theory and cleanroom reality diverge.",
        what: "Designed and fabricated a silicon-on-insulator ring resonator, then characterized its spectral response against the design target.",
        how: "Executed the full cleanroom cycle — lithography, etching, and metrology — and extracted the resonator's Q-factor from measured transmission spectra.",
      },
      role: "Fabrication Engineer",
      duration: "Spring 2025",
      keyResults: [
        "Fabricated ring resonator with measured Q-factor matching simulation within design tolerance",
        "Full cleanroom process: lithography, etching, metal deposition",
        "SEM and optical bench metrology for spectral characterization",
      ],
      scope: "Lab project · MICRO-373 · Spring 2025",
    },
  },
  "terrain-rover": {
    title: "Autonomous Terrain Rover",
    tagline: "Vision-based navigation on uneven ground",
    descriptor: "Robotics & AI · Academic",
    detail: {
      description: {
        why: "Most student robotics platforms assume flat, predictable terrain — this project explored what breaks when that assumption doesn't hold.",
        what: "A small ground rover that plans a path across uneven terrain using onboard vision, replanning when it detects an obstacle.",
        how: "Combined a vision-based obstacle detector with a local trajectory planner, tuned through iterative testing on a mixed-terrain test course.",
      },
      role: "Robotics Engineer",
      duration: "Spring 2025",
      keyResults: [
        "Completed test course with a 90%+ success rate across repeated runs",
        "Real-time obstacle detection and replanning at 10 Hz",
        "Team of 3, iterated through 4 hardware revisions",
      ],
      scope: "Team of 3 · MICRO-502 · Spring 2025",
    },
  },
  "modular-toolkit": {
    title: "Modular Hand-Tool System",
    tagline: "Interchangeable, 3D-printed tool heads",
    descriptor: "Industrial Design & Mechanical · Academic",
    detail: {
      description: {
        why: "A single-purpose tool means buying and storing a separate handle for every task — a shared, swappable interface removes that redundancy.",
        what: "A hand-tool handle with a quick-release interface, paired with a small set of interchangeable, 3D-printed tool heads.",
        how: "Modeled the assembly and tolerances in CAD, then iterated the release mechanism through several printed prototypes to get a snug, tool-free fit.",
      },
      role: "Mechanical Designer",
      duration: "Spring 2023",
      keyResults: [
        "Quick-release interface swaps tool heads in under 2 seconds, no tools required",
        "Three interchangeable heads designed and printed for the final demo",
        "Iterated through 5 prototype revisions to converge on fit tolerance",
      ],
      scope: "Course project · MICRO-201 · Spring 2023",
    },
  },
  "cochlear-implant-insertion-mechanism": {
    title: "Cochlear Implant Insertion Mechanism",
    tagline: "A force-sensing insertion mechanism and fluid-sealed training platform for cochlear implant surgery",
    descriptor: "Product Engineering & IoT · Professional",
    detail: {
      description: {
        why: "Cochlear implant electrode insertion is done almost entirely by feel — surgeons have no objective measurement of the force applied to the fragile scala tympani during the procedure, and the lab's existing prototype for studying this needed a simpler, sterilizable, and more reliable redesign before it could support real testing.",
        what: "A redesigned, force-instrumented insertion mechanism for cochlear implant electrodes — with a custom PCB, ESP32 firmware, and foot-pedal control — paired with an in-vitro training platform that seals a 3D-printed scala tympani model with a cast silicone joint to realistically simulate inner-ear fluid flow during implantation.",
        how: "Iterated the mechanism's compliant force-sensing table through SLA-printed prototypes, characterized the SPI-based load cell's linearity and thermal drift, wrote ESP32 firmware to drive the insertion motor from a foot pedal while logging force and temperature to a Python-based plotter, and validated the full system on 3D-printed cochlea and skull models with real-time force capture.",
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
