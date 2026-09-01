export interface ProjectTechnicalDetail {
  id: string;
  metrics?: { label: string; value: string }[];
  challenges?: string[];
  outcomes?: string[];
  marketData?: string;
}

export const projectTechnicalDetails: ProjectTechnicalDetail[] = [
  // {
  //   id: "signal-relay",
  //   metrics: [
  //     { label: "Battery Life", value: "Multi-week on single charge" },
  //     { label: "Deployment", value: "6-node mesh, outdoor" },
  //   ],
  //   challenges: [
  //     "Balancing radio duty-cycle against end-to-end latency.",
  //     "Enclosure sealing for outdoor exposure without blocking the antenna.",
  //   ],
  // },
];

export function getTechnicalDetailById(id: string) {
  return projectTechnicalDetails.find(detail => detail.id === id);
}
