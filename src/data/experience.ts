export type ExperienceCategory = "engineering" | "music" | "service";

export interface Role {
  title: string;
  period: string;
  type: "Full-time" | "Part-time" | "Freelance" | "Internship" | "Academic" | "Volunteering";
  description: string[];
}

export interface ExperienceNode {
  id: string;
  company: string;
  location: string;
  category: ExperienceCategory;
  logo?: string;
  roles: Role[];
}

export const experiences: ExperienceNode[] = [
  {
    id: "swiss-solar-boat",
    company: "Swiss Solar Boat",
    location: "Lausanne, Switzerland",
    category: "engineering",
    logo: "/images/logos/swiss-solar-boat.png",
    roles: [
      {
        title: "Lead Software Engineer, Low Voltage",
        period: "Sept. 2026 – Present",
        type: "Part-time",
        description: [
          "Leads the low-voltage software team for the next competition season.",
        ],
      },
      {
        title: "Co-Pilot, Energy & Safety Systems",
        period: "May – July 2026",
        type: "Part-time",
        description: [
          "Co-piloted energy and safety systems in real time during on-water tests and the Monaco Energy Boat Challenge.",
          "Helped Swiss Solar Boat win first place at the 2026 Monaco Energy Boat Challenge.",
        ],
      },
      {
        title: "Low Voltage Engineer",
        period: "Sept. 2025 – May 2026",
        type: "Part-time",
        description: [
          "Built and tested the boat's low-voltage electronics on a bench, then integrated it on board with new CAN wiring.",
          "Wrote the control logic coordinating all sensors and subsystems.",
        ],
      },
    ],
  },
  {
    id: "artorg",
    company: "ARTORG Center for Biomedical Engineering Research",
    location: "Bern, Switzerland",
    category: "engineering",
    logo: "/images/logos/artorg.png",
    roles: [
      {
        title: "R&D Assistant – Surgical Robotics",
        period: "March – May 2025",
        type: "Full-time",
        description: [
          "Developed and optimized a cochlear implant insertion tool at the Hearing Research Lab (Insel Gruppe / University of Bern), combining mechanical design, electronics, and high-precision SLA 3D printing.",
          "Ran laboratory experiments and iterative testing cycles to refine the tool's performance in a clinical research setting.",
        ],
      },
    ],
  },
  {
    id: "sterilux",
    company: "SteriLux",
    location: "Renens, Switzerland",
    category: "engineering",
    logo: "/images/logos/sterilux.png",
    roles: [
      {
        title: "Printed Circuit Board Design Engineer",
        period: "Sept. 2024",
        type: "Part-time",
        description: [
          "Reviewed the motherboard of the SteriLux Steribas sterilization unit.",
          "Integrated a new pressure sensor and optimized the circuit layout.",
        ],
      },
      {
        title: "Team Manager, Production Agent",
        period: "Jan. 2023 – June 2024",
        type: "Part-time",
        description: [
          "Managed production of the SteriLux sterilization machine for veterinary surgical tools, implementing the process with a team.",
          "Updated machine work instructions to keep pace with production changes.",
        ],
      },
      {
        title: "R&D Intern",
        period: "Summer 2022",
        type: "Internship",
        description: [
          "Worked on the Steribase ozone measurement system used to sterilize veterinary surgical tools.",
          "Got a first look at corporate R&D and improved my Python skills along the way.",
        ],
      },
    ],
  },
  {
    id: "epfl-spacecraft-team",
    company: "EPFL Spacecraft Team",
    location: "Renens, Switzerland",
    category: "engineering",
    logo: "/images/logos/epfl-spacecraft-team.png",
    roles: [
      {
        title: "PCB Assembly Technician",
        period: "Jan. 2024",
        type: "Internship",
        description: [
          'Assembled the "Twocan" on-board computer for the CHESS mission satellite.',
        ],
      },
      {
        title: "PCB & Parachute Design Engineer",
        period: "Sept. 2022 – Dec. 2023",
        type: "Part-time",
        description: [
          "Participated in a team of 4 to the CanSat programme, designing, testing, and launching a can-sized satellite to roughly 500 m that measured temperature, humidity, air quality, pressure, and acceleration during a descent braked by an in-house Rogallo parachute.",
        ],
      },
    ],
  },
  {
    id: "rentimmo",
    company: "Rentimmo Group",
    location: "Vaud, Switzerland",
    category: "service",
    logo: "/images/logos/rentimmo.png",
    roles: [
      {
        title: "Project Manager",
        period: "July 2019 – Dec. 2021",
        type: "Part-time",
        description: [
          "Designed and laid out commercial and industrial premises, and implemented logistics systems and processes.",
          "Maintained inventories across multiple sites and managed a team.",
        ],
      },
    ],
  },
];
