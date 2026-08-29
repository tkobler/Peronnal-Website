import type { Translations } from "../index";

export const experience: Translations["experience"] = {
  heading: "Expérience",
};

export const experienceData: Translations["experienceData"] = {
  "example-company": {
    company: "Example Manufacturing Co.",
    location: "Lausanne, Suisse",
    roles: [
      {
        title: "Stagiaire Ingénieur",
        period: "Été 2025",
        description: [
          "Travaillé sur l'amélioration d'un processus de ligne de production, en résolvant un goulot d'étranglement récurrent identifié dès les deux premières semaines.",
          "Développé un petit tableau de bord interne pour suivre des indicateurs qualité auparavant relevés à la main.",
        ],
      },
    ],
  },
  "epfl-ta": {
    company: "EPFL",
    location: "Lausanne, Suisse",
    roles: [
      {
        title: "Assistant Étudiant",
        period: "2024 – 2025",
        description: [
          "Animé des sessions de labo hebdomadaires pour des étudiants de premier cycle, en corrigeant leurs travaux et en répondant à leurs questions sur le cours.",
          "Aidé les étudiants à déboguer leurs propres projets — une bonne manière de revoir les mêmes concepts sous un autre angle.",
        ],
      },
    ],
  },
};
