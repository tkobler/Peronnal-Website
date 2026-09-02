import type { Translations } from "../index";

export const experience: Translations["experience"] = {
  heading: "Expérience",
};

export const experienceData: Translations["experienceData"] = {
  "swiss-solar-boat": {
    company: "Swiss Solar Boat",
    location: "Bussigny, Suisse",
    roles: [
      {
        title: "Ingénieur Basse Tension",
        period: "Sept. 2025 – Aujourd'hui",
        description: [
          "Swiss Solar Boat développe un bateau à foils trois places, alimenté par panneaux solaires et pile à combustible hydrogène.",
          "Membre de l'équipe basse tension, en charge des capteurs, actionneurs, unité de contrôle et câblage.",
        ],
      },
    ],
  },
  artorg: {
    company: "ARTORG Center for Biomedical Engineering Research",
    location: "Berne, Suisse",
    roles: [
      {
        title: "Assistant R&D – Robotique Chirurgicale",
        period: "Mars – mai 2025",
        description: [
          "Développé et optimisé un outil d'insertion d'implant cochléaire au sein du Hearing Research Lab (Insel Gruppe / Université de Berne), combinant conception mécanique, électronique et impression 3D SLA haute précision.",
          "Mené des expériences en laboratoire et des cycles de tests itératifs pour affiner les performances de l'outil en environnement de recherche clinique.",
        ],
      },
    ],
  },
  sterilux: {
    company: "SteriLux",
    location: "Renens, Vaud, Suisse",
    roles: [
      {
        title: "Ingénieur Conception de Circuits Imprimés",
        period: "Sept. 2024",
        description: [
          "Révisé la carte mère de l'unité de stérilisation Steribas de SteriLux.",
          "Intégré un nouveau capteur de pression et optimisé la disposition du circuit.",
        ],
      },
      {
        title: "Responsable d'Équipe, Agent de Production",
        period: "Janv. 2023 – juin 2024",
        description: [
          "Géré la production de la machine de stérilisation SteriLux pour instruments chirurgicaux vétérinaires, en mettant en œuvre le processus avec une équipe.",
          "Mis à jour les instructions de travail de la machine au fil des évolutions de production.",
        ],
      },
      {
        title: "Stage R&D",
        period: "Été 2022",
        description: [
          "Travaillé sur le système de mesure d'ozone Steribase, utilisé pour stériliser des instruments chirurgicaux vétérinaires.",
          "Découvert le fonctionnement de la R&D en entreprise et progressé en Python.",
        ],
      },
    ],
  },
  "epfl-spacecraft-team": {
    company: "EPFL Spacecraft Team",
    location: "Renens, Vaud, Suisse",
    roles: [
      {
        title: "Chef de Projet",
        period: "Sept. 2022 – janv. 2024",
        description: [
          'Assemblé l\'ordinateur de bord "Twocan" pour le satellite de la mission CHESS.',
          "Dirigé une équipe de 4 personnes dans le cadre du programme CanSat, en concevant, testant et lançant un satellite de la taille d'une canette à environ 600 m, mesurant température, humidité, qualité de l'air, pression et accélérations durant une descente freinée par un parachute Rogallo conçu en interne.",
        ],
      },
    ],
  },
  rentimmo: {
    company: "Rentimmo Group",
    location: "Suisse",
    roles: [
      {
        title: "Chef de Projet",
        period: "Juil. 2019 – déc. 2021",
        description: [
          "Conçu et aménagé des locaux commerciaux et industriels, et mis en place des systèmes et processus logistiques.",
          "Géré les inventaires sur plusieurs sites ainsi qu'une équipe.",
        ],
      },
    ],
  },
};
