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
  learnMoreLabel: "Learn more →",
  sourceLabel: "Source",
  filterAll: "All",
  domains: {
    "Embedded Systems & Electronics": { name: "Embedded Systems & Electronics", desc: "Custom PCBs, Firmware & Connected Hardware" },
    "Robotics & Autonomous Control": { name: "Robotics & Autonomous Control", desc: "Control Architectures, Navigation & Autonomy" },
    "Biomedical & Precision Instrumentation": { name: "Biomedical & Precision Instrumentation", desc: "Force Sensing & Flexure-Based Measurement" },
    "Mechanism Design & Fabrication": { name: "Mechanism Design & Fabrication", desc: "Mechanism Design, CAD & Hands-On Fabrication" },
  },
};

export const projectsContent: Translations["projectsContent"] = {
  "signal-relay": {
    title: "Low-Power Mesh Signal Relay",
    tagline: "Battery-powered relay for field sensor networks",
    descriptor: "Embedded Systems & Electronics · Academic",
    detail: {
      description: {
        why: "Field sensor deployments often sit outside Wi-Fi and cellular range, and running mains power to every node isn't practical.",
        what: "A battery-powered relay node that forwards sensor readings over a low-power mesh, extending network range without a fixed power source.",
        how: "Built around a low-power microcontroller with a duty-cycled radio stack, sleeping between transmission windows to stretch battery life across a multi-month deployment.",
      },
      documents: [
        { href: "/documents/signal-relay/project-report.pdf", label: "Project report" },
      ],
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
  "micro-force-sensor": {
    title: "Flexure-Based Micro-Force Sensor",
    tagline: "Compliant sensor for sub-newton force measurement",
    descriptor: "Biomedical & Precision Instrumentation · Academic",
    detail: {
      description: {
        why: "Measuring forces below a newton with an off-the-shelf load cell means fighting its noise floor and cross-axis sensitivity — a purpose-built flexure sensor trades general-purpose range for precision in the band that actually matters.",
        what: "A compliant flexure-based sensor that converts small applied forces into a measurable deflection, read out optically for sub-millinewton resolution.",
        how: "Designed the flexure geometry in CAD to balance stiffness against range, machined it from a single block to avoid assembly compliance, and calibrated the optical readout against a reference load cell.",
      },
      role: "Instrumentation Engineer",
      duration: "Fall 2024",
      keyResults: [
        "Sub-millinewton force resolution across the sensor's working range",
        "Single-piece flexure design eliminates assembly-induced compliance",
        "Calibrated against a reference load cell to within 2% of full scale",
      ],
      scope: "Course project · Fall 2024",
    },
  },
  "terrain-rover": {
    title: "Autonomous Terrain Rover",
    tagline: "Vision-based navigation on uneven ground",
    descriptor: "Robotics & Autonomous Control · Academic",
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
    descriptor: "Mechanism Design & Fabrication · Academic",
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
};
