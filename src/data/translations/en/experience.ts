import type { Translations } from "../index";

export const experience: Translations["experience"] = {
  heading: "Activities",
};

export const experienceData: Translations["experienceData"] = {
  sterilux: {
    company: "Stérilux",
    location: "Renens, Switzerland",
    roles: [
      {
        title: "Manufacturing Manager",
        period: "Feb 2026 – Present",
        description: [
          "Own the full production pipeline for medical-grade ozone sterilization devices: workshop scheduling, supplier relations, inventory, and quality sign-off before shipment.",
          "Second promotion in two years\u2014went from assembling devices on the bench to running the operation that ships them internationally.",
        ],
      },
      {
        title: "Operations Consultant",
        period: "2025",
        description: [
          "Restructured the assembly workflow and introduced tracking tools that cut production lead time, while the company scaled to new international markets.",
          "Translated engineering constraints into production decisions\u2014worked directly with the R&D team to make design changes that simplified assembly without compromising device performance.",
        ],
      },
      {
        title: "Production Technician",
        period: "2024",
        description: [
          "Assembled and tested ozone sterilization devices hands-on, learning every step of the build from soldering to final QC.",
          "Spotted two recurring bottlenecks on the assembly line and proposed fixes that were adopted in the following year's workflow redesign.",
        ],
      },
    ],
  },
  "lis-epfl": {
    company: "Laboratory of Intelligent Systems (LIS), EPFL",
    location: "Lausanne, Switzerland",
    roles: [
      {
        title: "Drone Maker",
        period: "Summer 2025",
        description: [
          "Built and calibrated 5+ high-end micro-drones (NVIDIA MCU, carbon chassis) from kits for the lab's swarm robotics research — soldering, flashing firmware, tuning PID loops.",
          "Contributed to both hardware and software: drone assembly and repairs alongside MPC controller tuning and camera feed integration for swarm coordination.",
        ],
      },
    ],
  },
  "epfl-ta": {
    company: "EPFL",
    location: "Lausanne, Switzerland",
    roles: [
      {
        title: "Teaching Assistant - Electronics",
        period: "2023 – 2025",
        description: [
          "Ran weekly lab sessions for 100+ students across circuit design, signal processing, and embedded systems\u2014debugging their boards, reviewing their schematics, grading their reports.",
          "Helped students go from breadboard prototypes to working PCBs, covering layout rules, component selection, and hands-on soldering technique.",
        ],
      },
    ],
  },
  "forum-epfl": {
    company: "Forum EPFL",
    location: "Lausanne, Switzerland",
    roles: [
      {
        title: "Logistics Manager",
        period: "Oct 2024",
        description: [
          "Co-managed all physical logistics for Europe's largest student-run career fair: 365+ exhibitors, 23,000 visitors, 5 days at the SwissTech Convention Center.",
          "Coordinated supplier deliveries, floor plans, furniture placement, and led teams of movers\u2014working directly with the venue's professional event manager, logistics manager, and head electrician to solve booth conflicts and last-minute gaps in real time.",
        ],
      },
    ],
  },
  sdis: {
    company: "SDIS (Fire & Rescue Service)",
    location: "Vaud, Switzerland",
    roles: [
      {
        title: "Volunteer Firefighter",
        period: "2023 – 2026",
        description: [
          "Responded to fire, flood, and road accident calls as part of a cantonal intervention team\u2014on-call nights and weekends for three years alongside full-time studies at EPFL.",
          "Trained in structural firefighting, first aid, and hazmat protocols; certified through SDIS Vaud's cantonal qualification program.",
        ],
      },
    ],
  },
  "music-teaching": {
    company: "Private Instruction",
    location: "Switzerland",
    roles: [
      {
        title: "Trumpet Teacher",
        period: "2022 – Present",
        description: [
          "Teaching trumpet to students from beginners to conservatory-track teenagers, adapting technique and repertoire to each level.",
          "Drawing on 10 years of conservatory training and stage experience\u2014including the Philharmonie de Paris and the Opéra d'Avignon\u2014to teach not just notes but performance under pressure.",
        ],
      },
    ],
  },
  uveya: {
    company: "Uveya",
    location: "Renens, Switzerland",
    roles: [
      {
        title: "Freelance Mechanical Designer",
        period: "Summer 2021",
        description: [
          "Designed the injection-molded casing for an autonomous UV-C disinfection robot built for airplane cockpits\u2014my first professional engineering job, at 19.",
          "Modeled the full exterior in CATIA V5: snap-fits, internal ribs for structural rigidity, and airflow channels for thermal management of the UV-LED array.",
        ],
      },
    ],
  },
};
