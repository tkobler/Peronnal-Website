import type { Translations } from "../index";

export const experience: Translations["experience"] = {
  heading: "Experience",
};

export const experienceData: Translations["experienceData"] = {
  "example-company": {
    company: "Example Manufacturing Co.",
    location: "Lausanne, Switzerland",
    roles: [
      {
        title: "Engineering Intern",
        period: "Summer 2025",
        description: [
          "Worked on a production-line process improvement, cutting a recurring bottleneck identified during the first two weeks on site.",
          "Built a small internal dashboard to track quality metrics that were previously logged by hand.",
        ],
      },
    ],
  },
  "epfl-ta": {
    company: "EPFL",
    location: "Lausanne, Switzerland",
    roles: [
      {
        title: "Teaching Assistant",
        period: "2024 – 2025",
        description: [
          "Ran weekly lab sessions for undergraduate students, reviewing their work and answering questions on the course material.",
          "Helped students debug their own projects — a good way to see the same concepts land from a different angle.",
        ],
      },
    ],
  },
  "example-nonprofit": {
    company: "Example Community Workshop",
    location: "Lausanne, Switzerland",
    roles: [
      {
        title: "Volunteer Repair Technician",
        period: "2024 – Present",
        description: [
          "Diagnosed and repaired household electronics at a monthly community repair event, replacing this with your own service work.",
          "Kept a simple log of common failure modes to help other volunteers triage faster.",
        ],
      },
    ],
  },
  "example-student-association": {
    company: "Example Student Association",
    location: "Lausanne, Switzerland",
    roles: [
      {
        title: "Event Coordinator",
        period: "2023 – 2024",
        description: [
          "Organized a recurring student event, coordinating logistics and a small volunteer team — swap this for your own extracurricular involvement.",
          "Managed a modest budget and reported outcomes back to the association's board.",
        ],
      },
    ],
  },
};
