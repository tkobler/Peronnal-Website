import type { Translations } from "../index";

export const projectDetailsContent: Translations["projectDetailsContent"] = {
  "signal-relay": {
    metrics: [
      { label: "Autonomie", value: "Plusieurs semaines sur une charge" },
      { label: "Déploiement", value: "Maillage de 6 nœuds, extérieur" },
    ],
    challenges: [
      "Équilibrer le cycle de service radio avec la latence de bout en bout.",
      "Étanchéité du boîtier pour un usage extérieur sans bloquer l'antenne.",
    ],
  },
  "micro-force-sensor": {
    metrics: [
      { label: "Résolution", value: "Sub-millinewton" },
      { label: "Étalonnage", value: "À 2% près de la pleine échelle" },
    ],
  },
  "terrain-rover": {
    metrics: [
      { label: "Taux de réussite", value: "90%+ sur le parcours test" },
      { label: "Fréquence de replanification", value: "10 Hz" },
    ],
  },
};
