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
  "micro-force-sensor": {
    metrics: [
      { label: "Resolution", value: "Sub-millinewton" },
      { label: "Calibration", value: "Within 2% of full scale" },
    ],
  },
  "terrain-rover": {
    metrics: [
      { label: "Success Rate", value: "90%+ on test course" },
      { label: "Replanning Rate", value: "10 Hz" },
    ],
  },
};
