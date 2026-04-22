import type { Translations } from "../index";

export const projectDetailsContent: Translations["projectDetailsContent"] = {
  durandal: {
    metrics: [
      { label: "Latence", value: "<10ms bout en bout" },
      { label: "Marché cible", value: "400k+ escrimeurs européens" },
      { label: "Statut", value: "Alpha Fonctionnel (Fleuret)" },
    ],
    challenges: [
      "Distinguer les touches métalliques valides du bruit dû à la sueur et au contact corporel.",
      "Assurer la fiabilité sans fil dans des environnements de compétition à forte interférence.",
    ],
  },
  "hylab-modulators": {
    metrics: [
      { label: "Rendement TFLT", value: "95% (vs 75% pour TFLN)" },
      { label: "Perte RF", value: "17-75% plus faible en TFLT" },
      { label: "Plage de fréquence", value: "100-300 GHz" },
    ],
  },
  "guardian-angel": {
    metrics: [
      { label: "Opportunité marché", value: "93 Mrd$ Soins mondiaux" },
      { label: "Logique radar", value: "Détection de chute en périphérie" },
    ],
    marketData: "Répond au « déficit de conformité » des pendentifs portables souvent oubliés par les personnes âgées.",
  },
};
