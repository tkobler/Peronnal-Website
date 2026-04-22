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
    id: "sterilux",
    company: "Stérilux",
    location: "Ecublens, Switzerland",
    category: "engineering",
    logo: "/images/logos/sterilux.png",
    roles: [
      {
        title: "Manufacturing Manager",
        period: "Feb 2026 – Present",
        type: "Part-time",
        description: [
          "Own the full production pipeline for medical-grade UV-C sterilizers: workshop scheduling, supplier relations, inventory, and quality sign-off before shipment.",
          "Second promotion in two years\u2014went from assembling devices on the bench to running the operation that ships them internationally."
        ]
      },
      {
        title: "Operations Consultant",
        period: "2025",
        type: "Part-time",
        description: [
          "Restructured the assembly workflow and introduced tracking tools that cut production lead time, while the company scaled to new international markets.",
          "Translated engineering constraints into production decisions\u2014worked directly with the R&D team to make design changes that simplified assembly without compromising device performance."
        ]
      },
      {
        title: "Production Technician",
        period: "2024",
        type: "Part-time",
        description: [
          "Assembled and tested medical UV-C devices hands-on, learning every step of the build from soldering to final QC.",
          "Spotted two recurring bottlenecks on the assembly line and proposed fixes that were adopted in the following year's workflow redesign."
        ]
      }
    ]
  },
  {
    id: "lis-epfl",
    company: "Laboratory of Intelligent Systems (LIS), EPFL",
    location: "Lausanne, Switzerland",
    category: "engineering",
    logo: "/images/logos/LIS.png",
    roles: [
      {
        title: "Drone Maker",
        period: "Summer 2025",
        type: "Internship",
        description: [
          "Built and calibrated 20+ micro-drones from components for the lab's swarm robotics research\u2014soldering, flashing firmware, tuning PID loops.",
          "Kept 95% of the fleet flight-ready by diagnosing crashed units, replacing motors, and reflashing flight controllers between experiment runs."
        ]
      }
    ]
  },
  {
    id: "epfl-ta",
    company: "EPFL",
    location: "Lausanne, Switzerland",
    category: "engineering",
    logo: "/images/logos/EPFL.png",
    roles: [
      {
        title: "Teaching Assistant - Electronics",
        period: "2023 – 2025",
        type: "Academic",
        description: [
          "Ran weekly lab sessions for 100+ students across circuit design, signal processing, and embedded systems\u2014debugging their boards, reviewing their schematics, grading their reports.",
          "Helped students go from breadboard prototypes to working PCBs, covering layout rules, component selection, and hands-on soldering technique."
        ]
      }
    ]
  },
  {
    id: "forum-epfl",
    company: "Forum EPFL",
    location: "Lausanne, Switzerland",
    category: "engineering",
    logo: "/images/logos/EPFL.png",
    roles: [
      {
        title: "Logistics Manager",
        period: "Oct 2024",
        type: "Part-time",
        description: [
          "Co-managed all physical logistics for Europe's largest student-run career fair: 188 companies, 133 startups, 23,500 visitors across multiple days at the SwissTech Convention Center.",
          "Coordinated supplier deliveries, floor plans, furniture placement, and led teams of movers\u2014working directly with the venue's professional event manager, logistics manager, and head electrician to solve booth conflicts and last-minute gaps in real time."
        ]
      }
    ]
  },
  {
    id: "sdis",
    company: "SDIS (Fire & Rescue Service)",
    location: "Vaud, Switzerland",
    category: "service",
    logo: "/images/logos/SDIS.png",
    roles: [
      {
        title: "Volunteer Firefighter",
        period: "2023 – 2026",
        type: "Volunteering",
        description: [
          "Responded to fire, flood, and road accident calls as part of a cantonal intervention team\u2014on-call nights and weekends for three years alongside full-time studies at EPFL.",
          "Trained in structural firefighting, first aid, and hazmat protocols; certified through SDIS Vaud's cantonal qualification program."
        ]
      }
    ]
  },
  {
    id: "music-teaching",
    company: "Private Instruction",
    location: "Switzerland",
    category: "music",
    roles: [
      {
        title: "Trumpet Teacher",
        period: "2022 – Present",
        type: "Freelance",
        description: [
          "Teaching trumpet to students from beginners to conservatory-track teenagers, adapting technique and repertoire to each level.",
          "Drawing on 10 years of conservatory training and stage experience\u2014including the Philharmonie de Paris and the Op\u00e9ra d'Avignon\u2014to teach not just notes but performance under pressure."
        ]
      }
    ]
  },
  {
    id: "uveya",
    company: "Uveya",
    location: "Renens, Switzerland",
    category: "engineering",
    roles: [
      {
        title: "Freelance Mechanical Designer",
        period: "Summer 2021",
        type: "Freelance",
        description: [
          "Designed the injection-molded casing for an autonomous UV-C disinfection robot built for airplane cockpits\u2014my first professional engineering job, at 19.",
          "Modeled the full exterior in CATIA V5: snap-fits, internal ribs for structural rigidity, and airflow channels for thermal management of the UV-LED array."
        ]
      }
    ]
  }
];