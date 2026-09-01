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
  "signal-relay": {
    title: "Relais de signal maillé basse consommation",
    tagline: "Relais alimenté par batterie pour réseaux de capteurs de terrain",
    descriptor: "Ingénierie Produit & IoT · Académique",
    detail: {
      description: {
        why: "Les déploiements de capteurs de terrain sont souvent hors de portée Wi-Fi et cellulaire, et tirer une alimentation secteur jusqu'à chaque nœud n'est pas réaliste.",
        what: "Un nœud relais alimenté par batterie qui retransmet les relevés de capteurs sur un maillage basse consommation, étendant la portée du réseau sans source d'alimentation fixe.",
        how: "Conçu autour d'un microcontrôleur basse consommation avec une pile radio à cycle de service, en veille entre les fenêtres de transmission pour prolonger l'autonomie sur un déploiement de plusieurs mois.",
      },
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
  "ring-resonator": {
    title: "Résonateur en anneau intégré",
    tagline: "Conception et caractérisation d'un filtre en photonique silicium",
    descriptor: "Microélectronique & Photonique · Académique",
    detail: {
      description: {
        why: "Les résonateurs en anneau sont un élément de base du filtrage optique sur puce, et la fabrication pratique est le meilleur moyen de comprendre où la théorie et la réalité de la salle blanche divergent.",
        what: "Conception et fabrication d'un résonateur en anneau silicium-sur-isolant, puis caractérisation de sa réponse spectrale par rapport à l'objectif de conception.",
        how: "Exécution du cycle complet de salle blanche — lithographie, gravure et métrologie — puis extraction du facteur de qualité du résonateur à partir des spectres de transmission mesurés.",
      },
      role: "Ingénieur Fabrication",
      duration: "Printemps 2025",
      keyResults: [
        "Résonateur en anneau fabriqué avec un facteur de qualité mesuré conforme à la simulation",
        "Processus de salle blanche complet : lithographie, gravure, dépôt métallique",
        "Métrologie SEM et banc optique pour la caractérisation spectrale",
      ],
      scope: "Projet de laboratoire · MICRO-373 · Printemps 2025",
    },
  },
  "terrain-rover": {
    title: "Rover tout-terrain autonome",
    tagline: "Navigation par vision sur terrain accidenté",
    descriptor: "Robotique & IA · Académique",
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
    descriptor: "Design Industriel & Mécanique · Académique",
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
