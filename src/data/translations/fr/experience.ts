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
  "example-nonprofit": {
    company: "Example Community Workshop",
    location: "Lausanne, Suisse",
    roles: [
      {
        title: "Technicien Réparateur Bénévole",
        period: "2024 – Présent",
        description: [
          "Diagnostiqué et réparé des appareils électroniques lors d'un atelier de réparation communautaire mensuel — remplacez par votre propre engagement associatif.",
          "Tenu un journal simple des pannes courantes pour aider les autres bénévoles à trier plus rapidement.",
        ],
      },
    ],
  },
  "example-student-association": {
    company: "Example Student Association",
    location: "Lausanne, Suisse",
    roles: [
      {
        title: "Coordinateur d'Événements",
        period: "2023 – 2024",
        description: [
          "Organisé un événement étudiant récurrent, coordonnant la logistique et une petite équipe de bénévoles — remplacez par votre propre activité extrascolaire.",
          "Géré un budget modeste et rendu compte des résultats au comité de l'association.",
        ],
      },
    ],
  },
};
