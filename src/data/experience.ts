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

// Two example entries to demonstrate the timeline format. Replace with your
// own history — see SETUP.md §2.1. The `category` field controls filtering
// on the /experience page.

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
    category: "engineering",
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
];
