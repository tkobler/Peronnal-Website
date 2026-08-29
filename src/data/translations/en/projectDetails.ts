import type { Translations } from "../index";

export const projectDetailsContent: Translations["projectDetailsContent"] = {
  "signal-relay": {
    metrics: [
      { label: "Battery Life", value: "Multi-week on single charge" },
      { label: "Deployment", value: "6-node mesh, outdoor" },
    ],
    challenges: [
      "Balancing radio duty-cycle against end-to-end latency.",
      "Enclosure sealing for outdoor exposure without blocking the antenna.",
    ],
  },
  "ring-resonator": {
    metrics: [
      { label: "Process", value: "SOI, full cleanroom cycle" },
      { label: "Characterization", value: "SEM + optical bench" },
    ],
  },
  "terrain-rover": {
    metrics: [
      { label: "Success Rate", value: "90%+ on test course" },
      { label: "Replanning Rate", value: "10 Hz" },
    ],
  },
};
