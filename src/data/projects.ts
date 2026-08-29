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
    id: "signal-relay",
    number: "01",
    title: "Low-Power Mesh Signal Relay",
    tagline: "Battery-powered relay for field sensor networks",
    descriptor: "Product Engineering & IoT · Academic",
    domain: "Product Engineering & IoT",
    featured: true,
    course: "MICRO-315",
    heroImage: "/images/placeholders/wide.svg",
    detail: {
      description: {
        why: "Field sensor deployments often sit outside Wi-Fi and cellular range, and running mains power to every node isn't practical.",
        what: "A battery-powered relay node that forwards sensor readings over a low-power mesh, extending network range without a fixed power source.",
        how: "Built around a low-power microcontroller with a duty-cycled radio stack, sleeping between transmission windows to stretch battery life across a multi-month deployment.",
      },
      role: "Embedded Systems Engineer",
      duration: "Spring 2025",
      technologies: ["Embedded C", "Low-Power RF", "FreeRTOS", "PCB Design"],
      keyResults: [
        "Multi-week battery life on a single charge under a realistic duty cycle",
        "Reliable multi-hop delivery across a test deployment of 6 nodes",
        "Custom PCB and enclosure designed for outdoor use",
      ],
      scope: "Course project · MICRO-315 · Spring 2025",
    },
  },
  {
    id: "ring-resonator",
    number: "02",
    title: "Integrated Ring Resonator",
    tagline: "Silicon photonics filter design and characterization",
    descriptor: "Microelectronics & Photonics · Academic",
    domain: "Microelectronics & Photonics",
    featured: true,
    course: "MICRO-373",
    heroImage: "/images/placeholders/wide.svg",
    detail: {
      description: {
        why: "Ring resonators are a building block for on-chip optical filtering, and hands-on fabrication is the best way to understand where theory and cleanroom reality diverge.",
        what: "Designed and fabricated a silicon-on-insulator ring resonator, then characterized its spectral response against the design target.",
        how: "Executed the full cleanroom cycle — lithography, etching, and metrology — and extracted the resonator's Q-factor from measured transmission spectra.",
      },
      role: "Fabrication Engineer",
      duration: "Spring 2025",
      technologies: ["Cleanroom Fabrication", "SEM", "Optical Characterization", "KLayout"],
      keyResults: [
        "Fabricated ring resonator with measured Q-factor matching simulation within design tolerance",
        "Full cleanroom process: lithography, etching, metal deposition",
        "SEM and optical bench metrology for spectral characterization",
      ],
      scope: "Lab project · MICRO-373 · Spring 2025",
    },
  },
  {
    id: "terrain-rover",
    number: "03",
    title: "Autonomous Terrain Rover",
    tagline: "Vision-based navigation on uneven ground",
    descriptor: "Robotics & AI · Academic",
    domain: "Robotics & AI",
    featured: true,
    course: "MICRO-502",
    heroImage: "/images/placeholders/wide.svg",
    detail: {
      description: {
        why: "Most student robotics platforms assume flat, predictable terrain — this project explored what breaks when that assumption doesn't hold.",
        what: "A small ground rover that plans a path across uneven terrain using onboard vision, replanning when it detects an obstacle.",
        how: "Combined a vision-based obstacle detector with a local trajectory planner, tuned through iterative testing on a mixed-terrain test course.",
      },
      role: "Robotics Engineer",
      duration: "Spring 2025",
      technologies: ["Python", "OpenCV", "Path Planning", "ROS"],
      keyResults: [
        "Completed test course with a 90%+ success rate across repeated runs",
        "Real-time obstacle detection and replanning at 10 Hz",
        "Team of 3, iterated through 4 hardware revisions",
      ],
      scope: "Team of 3 · MICRO-502 · Spring 2025",
    },
  },
  {
    id: "modular-toolkit",
    number: "04",
    title: "Modular Hand-Tool System",
    tagline: "Interchangeable, 3D-printed tool heads",
    descriptor: "Industrial Design & Mechanical · Academic",
    domain: "Industrial Design & Mechanical",
    featured: true,
    course: "MICRO-201",
    heroImage: "/images/placeholders/wide.svg",
    detail: {
      description: {
        why: "A single-purpose tool means buying and storing a separate handle for every task — a shared, swappable interface removes that redundancy.",
        what: "A hand-tool handle with a quick-release interface, paired with a small set of interchangeable, 3D-printed tool heads.",
        how: "Modeled the assembly and tolerances in CAD, then iterated the release mechanism through several printed prototypes to get a snug, tool-free fit.",
      },
      role: "Mechanical Designer",
      duration: "Spring 2023",
      technologies: ["CAD", "3D Printing", "Tolerance Analysis"],
      keyResults: [
        "Quick-release interface swaps tool heads in under 2 seconds, no tools required",
        "Three interchangeable heads designed and printed for the final demo",
        "Iterated through 5 prototype revisions to converge on fit tolerance",
      ],
      scope: "Course project · MICRO-201 · Spring 2023",
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
