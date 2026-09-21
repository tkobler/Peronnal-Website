export type ExperienceCategory = "engineering" | "service" | "education" | "volunteering";

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

// Four example entries, one per category, to demonstrate the timeline format
// and exercise the /experience page's category filter. Replace with your own
// history — see SETUP.md §2.1. The `category` field controls filtering.

export const experiences: ExperienceNode[] = [
  {
    id: "example-company",
    company: "Example Manufacturing Co.",
    location: "Lausanne, Switzerland",
    category: "engineering",
    logo: "/images/placeholders/logo.svg",
    roles: [
      {
        title: "Engineering Intern",
        period: "Summer 2025",
        type: "Internship",
        description: [
          "Worked on a production-line process improvement, cutting a recurring bottleneck identified during the first two weeks on site.",
          "Built a small internal dashboard to track quality metrics that were previously logged by hand.",
        ],
      },
    ],
  },
  {
    id: "epfl-ta",
    company: "EPFL",
    location: "Lausanne, Switzerland",
    category: "education",
    logo: "/images/placeholders/logo.svg",
    roles: [
      {
        title: "Teaching Assistant",
        period: "2024 – 2025",
        type: "Academic",
        description: [
          "Ran weekly lab sessions for undergraduate students, reviewing their work and answering questions on the course material.",
          "Helped students debug their own projects — a good way to see the same concepts land from a different angle.",
        ],
      },
    ],
  },
  {
    id: "example-nonprofit",
    company: "Example Community Workshop",
    location: "Lausanne, Switzerland",
    category: "service",
    logo: "/images/placeholders/logo.svg",
    roles: [
      {
        title: "Volunteer Repair Technician",
        period: "2024 – Present",
        type: "Volunteering",
        description: [
          "Diagnosed and repaired household electronics at a monthly community repair event, replacing this with your own service work.",
          "Kept a simple log of common failure modes to help other volunteers triage faster.",
        ],
      },
    ],
  },
  {
    id: "example-student-association",
    company: "Example Student Association",
    location: "Lausanne, Switzerland",
    category: "volunteering",
    logo: "/images/placeholders/logo.svg",
    roles: [
      {
        title: "Event Coordinator",
        period: "2023 – 2024",
        type: "Volunteering",
        description: [
          "Organized a recurring student event, coordinating logistics and a small volunteer team — swap this for your own extracurricular involvement.",
          "Managed a modest budget and reported outcomes back to the association's board.",
        ],
      },
    ],
  },
];
