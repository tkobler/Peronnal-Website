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
  learnMoreLabel: "En savoir plus →",
  sourceLabel: "Source",
  filterAll: "Tout",
  domains: {
    "Embedded Systems & Electronics": { name: "Systèmes Embarqués & Électronique", desc: "PCB sur-mesure, Firmware & Matériel Connecté" },
    "Robotics & Autonomous Control": { name: "Robotique & Contrôle Autonome", desc: "Architectures de Contrôle, Navigation & Autonomie" },
    "Biomedical & Precision Instrumentation": { name: "Biomédical & Instrumentation de Précision", desc: "Capteurs de Force & Mesure par Flexion" },
    "Mechanism Design & Fabrication": { name: "Conception de Mécanismes & Fabrication", desc: "Conception de Mécanismes, CAO & Fabrication" },
  },
};

export const projectsContent: Translations["projectsContent"] = {
  "signal-relay": {
    title: "Relais de signal maillé basse consommation",
    tagline: "Relais alimenté par batterie pour réseaux de capteurs de terrain",
    descriptor: "Systèmes Embarqués & Électronique · Académique",
    detail: {
      description: {
        why: "Les déploiements de capteurs de terrain sont souvent hors de portée Wi-Fi et cellulaire, et tirer une alimentation secteur jusqu'à chaque nœud n'est pas réaliste.",
        what: "Un nœud relais alimenté par batterie qui retransmet les relevés de capteurs sur un maillage basse consommation, étendant la portée du réseau sans source d'alimentation fixe.",
        how: "Conçu autour d'un microcontrôleur basse consommation avec une pile radio à cycle de service, en veille entre les fenêtres de transmission pour prolonger l'autonomie sur un déploiement de plusieurs mois.",
      },
      documents: [
        { href: "/documents/signal-relay/project-report.pdf", label: "Rapport de projet" },
      ],
      role: "Ingénieur Systèmes Embarqués",
      duration: "Printemps 2025",
      keyResults: [
        "Autonomie de plusieurs semaines sur une seule charge dans des conditions réalistes",
        "Livraison multi-saut fiable sur un déploiement test de 6 nœuds",
        "PCB et boîtier sur-mesure conçus pour un usage extérieur",
      ],
      scope: "Projet de cours · MICRO-315 · Printemps 2025",
    },
  },
  "micro-force-sensor": {
    title: "Capteur de micro-force à flexion",
    tagline: "Capteur souple pour la mesure de forces sub-newton",
    descriptor: "Biomédical & Instrumentation de Précision · Académique",
    detail: {
      description: {
        why: "Mesurer des forces inférieures au newton avec un capteur de force standard, c'est se heurter à son bruit de fond et à sa sensibilité aux axes croisés — un capteur à flexion sur-mesure sacrifie la plage de mesure générale au profit de la précision là où elle compte vraiment.",
        what: "Un capteur souple à flexion qui convertit de petites forces appliquées en une déflexion mesurable, lue optiquement pour une résolution sub-millinewton.",
        how: "Conception de la géométrie de flexion en CAO pour équilibrer rigidité et plage de mesure, usinage en une seule pièce pour éviter toute compliance d'assemblage, puis étalonnage de la lecture optique par rapport à un capteur de force de référence.",
      },
      role: "Ingénieur Instrumentation",
      duration: "Automne 2024",
      keyResults: [
        "Résolution sub-millinewton sur toute la plage de mesure du capteur",
        "Conception monobloc éliminant toute compliance d'assemblage",
        "Étalonné par rapport à un capteur de force de référence à 2% près de la pleine échelle",
      ],
      scope: "Projet de cours · Automne 2024",
    },
  },
  "terrain-rover": {
    title: "Rover tout-terrain autonome",
    tagline: "Navigation par vision sur terrain accidenté",
    descriptor: "Robotique & Contrôle Autonome · Académique",
    detail: {
      description: {
        why: "La plupart des plateformes de robotique étudiantes supposent un terrain plat et prévisible — ce projet explore ce qui se passe quand cette hypothèse ne tient plus.",
        what: "Un petit rover terrestre qui planifie une trajectoire sur terrain accidenté grâce à la vision embarquée, en replanifiant dès qu'il détecte un obstacle.",
        how: "Combinaison d'un détecteur d'obstacles par vision et d'un planificateur de trajectoire local, réglés par des tests itératifs sur un parcours à terrain mixte.",
      },
      role: "Ingénieur Robotique",
      duration: "Printemps 2025",
      keyResults: [
        "Parcours test complété avec un taux de réussite de 90%+ sur des essais répétés",
        "Détection d'obstacles et replanification en temps réel à 10 Hz",
        "Équipe de 3, quatre révisions matérielles",
      ],
      scope: "Équipe de 3 · MICRO-502 · Printemps 2025",
    },
  },
  "modular-toolkit": {
    title: "Système d'outils à main modulaire",
    tagline: "Têtes d'outils interchangeables, imprimées en 3D",
    descriptor: "Conception de Mécanismes & Fabrication · Académique",
    detail: {
      description: {
        why: "Un outil à usage unique implique d'acheter et de stocker un manche séparé pour chaque tâche — une interface partagée et interchangeable supprime cette redondance.",
        what: "Un manche d'outil à interface de déverrouillage rapide, associé à un petit ensemble de têtes d'outils interchangeables imprimées en 3D.",
        how: "Modélisation de l'assemblage et des tolérances en CAO, puis itération du mécanisme de déverrouillage à travers plusieurs prototypes imprimés pour obtenir un ajustement précis sans outil.",
      },
      role: "Concepteur Mécanique",
      duration: "Printemps 2023",
      keyResults: [
        "Interface de déverrouillage rapide changeant de tête en moins de 2 secondes, sans outil",
        "Trois têtes interchangeables conçues et imprimées pour la démonstration finale",
        "Cinq révisions de prototype pour converger vers la tolérance d'ajustement",
      ],
      scope: "Projet de cours · MICRO-201 · Printemps 2023",
    },
  },
};
