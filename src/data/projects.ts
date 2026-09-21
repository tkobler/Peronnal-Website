import type { ProjectDocument } from "@/data/translations";

export type ProjectDomain =
  | "Embedded Systems & Electronics"
  | "Robotics & Autonomous Control"
  | "Biomedical & Precision Instrumentation"
  | "Mechanism Design & Fabrication";

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
    // Downloadable files. Drop the PDF in public/documents/<project id>/ and add
    // an entry here; override the label per locale in translations/{en,fr}/projects.ts.
    documents?: ProjectDocument[];
    role: string;
    duration: string;
    technologies: string[];
    keyResults?: string[];
    scope?: string;
    link?: string;
    sourceLink?: string;
  };
}

// This file ships with four example projects, one per domain, so the layout
// has something to render. Replace them with your own — see SETUP.md §2.1.
// `link`, `sourceLink`, and `documents` are all optional — each example below
// uses a different one of the three so you can see how each renders; nothing
// else in the codebase depends on these specific ids.

const projects: Project[] = [
  {
    id: "signal-relay",
    number: "01",
    title: "Low-Power Mesh Signal Relay",
    tagline: "Battery-powered relay for field sensor networks",
    descriptor: "Embedded Systems & Electronics · Academic",
    domain: "Embedded Systems & Electronics",
    featured: true,
    course: "MICRO-315",
    heroImage: "/images/placeholders/wide.svg",
    detail: {
      description: {
        why: "Field sensor deployments often sit outside Wi-Fi and cellular range, and running mains power to every node isn't practical.",
        what: "A battery-powered relay node that forwards sensor readings over a low-power mesh, extending network range without a fixed power source.",
        how: "Built around a low-power microcontroller with a duty-cycled radio stack, sleeping between transmission windows to stretch battery life across a multi-month deployment.",
      },
      documents: [
        { href: "/documents/signal-relay/project-report.pdf", label: "Project report", filename: "signal-relay-project-report.pdf" },
      ],
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
    id: "micro-force-sensor",
    number: "02",
    title: "Flexure-Based Micro-Force Sensor",
    tagline: "Compliant sensor for sub-newton force measurement",
    descriptor: "Biomedical & Precision Instrumentation · Academic",
    domain: "Biomedical & Precision Instrumentation",
    featured: true,
    heroImage: "/images/placeholders/wide.svg",
    detail: {
      description: {
        why: "Measuring forces below a newton with an off-the-shelf load cell means fighting its noise floor and cross-axis sensitivity — a purpose-built flexure sensor trades general-purpose range for precision in the band that actually matters.",
        what: "A compliant flexure-based sensor that converts small applied forces into a measurable deflection, read out optically for sub-millinewton resolution.",
        how: "Designed the flexure geometry in CAD to balance stiffness against range, machined it from a single block to avoid assembly compliance, and calibrated the optical readout against a reference load cell.",
      },
      role: "Instrumentation Engineer",
      duration: "Fall 2024",
      technologies: ["CAD", "Flexure Design", "Optical Sensing", "Calibration & Metrology"],
      keyResults: [
        "Sub-millinewton force resolution across the sensor's working range",
        "Single-piece flexure design eliminates assembly-induced compliance",
        "Calibrated against a reference load cell to within 2% of full scale",
      ],
      scope: "Course project · Fall 2024",
      link: "https://example.com",
    },
  },
  {
    id: "terrain-rover",
    number: "03",
    title: "Autonomous Terrain Rover",
    tagline: "Vision-based navigation on uneven ground",
    descriptor: "Robotics & Autonomous Control · Academic",
    domain: "Robotics & Autonomous Control",
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
      sourceLink: "https://github.com/your-username/terrain-rover",
    },
  },
  {
    id: "modular-toolkit",
    number: "04",
    title: "Modular Hand-Tool System",
    tagline: "Interchangeable, 3D-printed tool heads",
    descriptor: "Mechanism Design & Fabrication · Academic",
    domain: "Mechanism Design & Fabrication",
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
