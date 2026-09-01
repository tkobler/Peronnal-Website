import type { Translations } from "../index";

export const projects: Translations["projects"] = {
  heading: "Projets",
  subtitle: "Projets sélectionnés en ingénierie et recherche",
  contextLabel: "Contexte (Le Pourquoi)",
  solutionLabel: "Solution (Le Quoi)",
  implementationLabel: "Réalisation (Le Comment)",
  roleLabel: "Rôle",
  durationLabel: "Durée",
  technologiesLabel: "Technologies",
  moreDetails: "Plus de détails",
  back: "Retour",
  wantMore: "Envie d'en voir plus ?",
  wantMoreSub: "Parcourez l'ensemble de mes travaux d'ingénierie, de recherche et de création.",
  fullPortfolio: "Portfolio complet",
  byDomain: "Par domaine",
  listView: "Liste",
  backToDomains: "Retour aux domaines",
  exploreDomain: "Explorer",
  keyResultsLabel: "Résultats clés",
  scopeLabel: "Périmètre",
  methodologyLabel: "Méthodologie",
  challengesLabel: "Défis & Décisions",
  publicationLabel: "Publication",
  filterAll: "Tout",
  domains: {
    "Microelectronics & Photonics": { name: "Microélectronique & Photonique", desc: "Conception CI, Photonique Silicium & Systèmes RF" },
    "Product Engineering & IoT": { name: "Ingénierie Produit & IoT", desc: "Systèmes Embarqués & Objets Connectés" },
    "Robotics & AI": { name: "Robotique & IA", desc: "Agents Autonomes & Contrôle Neuronal" },
    "Industrial Design & Mechanical": { name: "Design Industriel & Mécanique", desc: "Mécanismes de Précision & Design Produit" },
  },
};

export const projectsContent: Translations["projectsContent"] = {
  "solar-boat-control-logic": {
    title: "Logique de contrôle globale pour un bateau à hydrogène à foils",
    tagline: "Architecture FSM sécuritaire et temps réel pour un bateau à foils propulsé à l'hydrogène",
    descriptor: "Ingénierie Produit & IoT · Académique",
    detail: {
      description: {
        why: "Chaque sous-système (HV, hydrogène, refroidissement, tableau de bord, contrôle des foils) avait été développé et validé isolément au fil des semestres précédents, mais le bateau ne disposait d'aucune couche de contrôle unifiée pour les réunir dans un système sécuritaire prêt pour les essais sur l'eau.",
        what: "Une machine à états finis hiérarchique et sécuritaire qui pilote chaque sous-système du Lobst'air, un bateau à foils à hydrogène de trois passagers, depuis une architecture de contrôle temps réel unique exécutée sur l'ordinateur de bord.",
        how: "Architecture modulaire MATLAB Simulink/Stateflow — approche axée sur la sécurité et blocs par sous-système reliés par CAN — compilée en C++ et déployée sur une cible Speedgoat, développée en trois phases inspirées d'Agile : architecture, intégration, puis validation sur l'eau.",
      },
      role: "Ingénieur Architecture Logicielle Globale et Coordination",
      duration: "Printemps 2026",
      scope: "Projet de semestre · Swiss Solar Boat · Printemps 2026",
    },
  },
  "cochlear-implant-insertion-mechanism": {
    title: "Mécanisme d'insertion pour implant cochléaire",
    tagline: "Un mécanisme d'insertion à mesure de force et une plateforme d'entraînement étanche pour la chirurgie d'implant cochléaire",
    descriptor: "Ingénierie Produit & IoT · Professionnel",
    detail: {
      description: {
        why: "L'insertion d'un implant cochléaire se fait au toucher, sans mesure objective de la force appliquée à la fragile scala tympani — le prototype du laboratoire pour étudier ce phénomène avait besoin d'une refonte plus simple et plus fiable.",
        what: "Un mécanisme d'insertion instrumenté et redessiné pour les électrodes d'implant cochléaire, associé à une plateforme d'entraînement in vitro qui étanchéifie un modèle imprimé en 3D de la scala tympani pour simuler l'écoulement réel des fluides de l'oreille interne.",
        how: "Itération de la table de mesure de force à travers des prototypes imprimés en SLA, caractérisation de la linéarité et de la dérive du capteur de charge, développement d'un firmware ESP32 pour une insertion pilotée par pédale avec enregistrement en temps réel, puis validation sur des modèles de cochlée et de crâne imprimés en 3D.",
      },
      role: "Ingénieur R&D",
      duration: "Printemps 2025",
      keyResults: [
        "Caractérisation du capteur de force sur-mesure à un facteur de correction d'environ 1.04, avec une dérive thermique mesurée d'environ 4 mN/°C, toutes deux corrigeables dans le firmware",
        "Validation du mécanisme d'insertion redessiné sur des modèles de cochlée et de crâne imprimés en 3D, avec enregistrement de la force et de la température en temps réel sur des cycles complets d'insertion et d'extraction",
        "Simplification et refonte du mécanisme compliant imprimé en SLA et de l'électronique (PCB sur-mesure + firmware ESP32), remplaçant un prototype antérieur selon les critères de stérilisabilité, de fiabilité et de compacité du projet",
      ],
      scope: "Professionnel · ARTORG Center, Inselspital · Printemps 2025",
    },
  },
};
