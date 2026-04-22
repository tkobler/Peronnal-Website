import type { Translations } from "../index";

export const projectDetailsContent: Translations["projectDetailsContent"] = {
  durandal: {
    metrics: [
      { label: "Latency", value: "<10ms end-to-end" },
      { label: "Target Market", value: "400k+ European fencers" },
      { label: "Status", value: "Alpha Functional (Foil)" },
    ],
    challenges: [
      "Distinguishing valid metallic touches from sweat/body contact noise.",
      "Ensuring wireless reliability in high-interference competition environments.",
    ],
  },
  "hylab-modulators": {
    metrics: [
      { label: "TFLT Yield", value: "95% (vs 75% for TFLN)" },
      { label: "RF Loss", value: "17-75% lower in TFLT" },
      { label: "Frequency Range", value: "100-300 GHz" },
    ],
  },
  "guardian-angel": {
    metrics: [
      { label: "Market Opportunity", value: "$93B Global Care" },
      { label: "Radar Logic", value: "Edge-processed Fall Detection" },
    ],
    marketData: "Addresses the 'compliance gap' of wearable pendants which are often forgotten by the elderly.",
  },
};
