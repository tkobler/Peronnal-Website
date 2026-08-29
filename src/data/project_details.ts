export interface ProjectTechnicalDetail {
  id: string;
  metrics?: { label: string; value: string }[];
  challenges?: string[];
  outcomes?: string[];
  marketData?: string;
}

export const projectTechnicalDetails: ProjectTechnicalDetail[] = [
  {
    id: "signal-relay",
    metrics: [
      { label: "Battery Life", value: "Multi-week on single charge" },
      { label: "Deployment", value: "6-node mesh, outdoor" },
    ],
    challenges: [
      "Balancing radio duty-cycle against end-to-end latency.",
      "Enclosure sealing for outdoor exposure without blocking the antenna.",
    ],
  },
  {
    id: "ring-resonator",
    metrics: [
      { label: "Process", value: "SOI, full cleanroom cycle" },
      { label: "Characterization", value: "SEM + optical bench" },
    ],
  },
  {
    id: "terrain-rover",
    metrics: [
      { label: "Success Rate", value: "90%+ on test course" },
      { label: "Replanning Rate", value: "10 Hz" },
    ],
  },
];

export function getTechnicalDetailById(id: string) {
  return projectTechnicalDetails.find(detail => detail.id === id);
}
