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
  "motion-focus": {
    title: "Motion Focus",
    tagline: "Un PCB embarqué qui donne à tout moteur brushless un contrôle de couple, position et vitesse via USB-C, Bluetooth ou WiFi",
    descriptor: "Robotique & IA · Personnel",
    detail: {
      description: {
        why: "Un moteur brushless du commerce nécessite un driver, un encodeur et un firmware de contrôle séparés avant même de pouvoir tourner — un frein qui écarte les moteurs BLDC des projets DIY et du prototypage rapide. Motion Focus, développé avec Alec Horth depuis le début, embarque toute cette électronique directement sur le moteur.",
        what: "Un PCB quatre couches qui se monte sur un moteur BLDC et le transforme en actionneur autonome et pilotable : contrôle en boucle fermée du couple, de la vitesse et de la position à 24V via USB-C, Bluetooth ou WiFi grâce à un ESP32 embarqué.",
        how: "Trois révisions successives du PCB (ESP32, driver DRV8313, encodeur AS5048A, double mesure de courant) et un firmware FOC repris de SimpleFOC jusqu'à une version 3 stable, puis exploration du potentiel startup du projet dans le cours Technology Ventures I de l'EPFL — étude de marché et plan de lancement, avec une équipe passée de deux à cinq personnes — avant d'entamer sa transition vers l'open source.",
      },
      methodology: "Itération du PCB sur trois révisions KiCad, validées à chaque étape sur banc avec le firmware FOC ; la viabilité startup a été testée séparément via des entretiens utilisateurs à l'EPFL et une analyse du marché de niche.",
      challenges: [
        "Faire tenir le driver, l'encodeur, la mesure de courant et un convertisseur buck sur un PCB quatre couches assez compact pour être monté sur le moteur, sans dégrader le signal de mesure de courant du FOC.",
        "Concilier trois itérations matérielles avec les exigences du parcours startup — marché clair, modèle économique — alors que l'équipe passait de deux à cinq personnes.",
      ],
      images: [
        { src: "/images/projects/motion-focus/01-motor-mount.jpeg", alt: "Moteur et support de test imprimé en 3D, vue arrière", caption: "Support de test imprimé en 3D pour la validation sur banc", section: "how" },
        { src: "/images/projects/motion-focus/02-two-units-side.jpeg", alt: "Deux unités Motion Focus côte à côte", caption: "Deux actionneurs Motion Focus assemblés", section: "what" },
        { src: "/images/projects/motion-focus/03-two-units-wired.jpeg", alt: "Deux PCB Motion Focus V3 câblés ensemble pour les tests", caption: "PCB V3 en test sur banc, câblés pour un contrôle synchronisé", section: "how" },
      ],
      role: "Ingénieur Produit",
      duration: "2024 – 2026",
      scope: "Projet personnel (avec Alec Horth) → exploration startup, cours EPFL Technology Ventures I (MGT-434) · 2024–2026",
    },
  },
  "la-raclonette": {
    title: "La Raclonette",
    tagline: "Une poêle vissable qui transforme un feu de camp en station à raclette.",
    descriptor: "Design Industriel & Mécanique · Personnel",
    detail: {
      description: {
        why: "Griller des saucisses sur un feu de bois devenait répétitif — Tim et Léonard ont voulu faire fondre une vraie raclette directement sur les braises.",
        what: "Une petite poêle à raclette antiadhésive montée sur un manche à visser sur un bâton, vendue comme micro-entreprise étudiante autoproduite, avec un livret de recettes compagnon.",
        how: "Fabrication artisanale de chaque poêle et de son mécanisme de serrage en tôle soudée au TIG, dans un garage transformé en atelier, puis vente de plus de 50 exemplaires via un site web et une boutique Instagram autoproduits.",
      },
      role: "Co-Fondateur",
      duration: "2022 – 2024",
      keyResults: ["Plus de 50 exemplaires vendus via un site e-commerce et une boutique Instagram autoproduits"],
      scope: "Projet personnel (avec Léonard) · micro-entreprise étudiante · 2022–2024",
    },
  },
  "cansat-epfl-spacecraft-team": {
    title: "CanSat - EPFL Spacecraft Team",
    tagline: "Un satellite miniature récupéré par un parachute Rogallo fait maison, lancé deux fois depuis une fusée étudiante.",
    descriptor: "Ingénierie Produit & IoT · Académique",
    detail: {
      description: {
        why: "Le programme CanSat de l'EPFL Spacecraft Team demande à des équipes étudiantes de construire un mini-satellite de la taille d'une canette capable de survivre au lancement par fusée jusqu'à environ 500 m et d'en rapporter des données exploitables — El Tonio a été construit sur toute une année académique par une équipe de quatre (avec Noé Syfrig, Alec Horth et Alessandro Schlatter).",
        what: "Un CanSat embarquant des capteurs environnementaux redondants, une centrale inertielle, un GPS et une caméra dans une coque imprimée en 3D à ouverture « papillon », récupéré sous un parachute Rogallo fait maison conçu pour le faire planer en cercle et prolonger son temps de vol.",
        how: "De la revue de conception préliminaire à un PCB sur-mesure (double capteurs BME688/BME280, IMU BNO055, télémétrie LoRa 868 MHz vers une station au sol) construit autour d'un Raspberry Pi Zero, découpe et couture du parachute Rogallo en interne, validation par des lâchers au sol puis des tests de largage au drone, puis deux lancements en fusée — le second concluant par un vol plané circulaire contrôlé de plus de 90 secondes.",
      },
      challenges: [
        "Faire tenir des capteurs environnementaux redondants, une IMU, un GPS, une caméra, une télémétrie LoRa et la gestion de batterie sur un seul PCB, dans un CanSat de 70 mm de diamètre pour 300 à 350 g.",
        "Concevoir et coudre un parachute Rogallo s'ouvrant de manière fiable et faisant planer le CanSat en cercle pour maximiser son temps de vol, validé d'abord par des lâchers au sol puis des tests de largage au drone avant de lui faire confiance lors d'un vrai lancement en fusée.",
      ],
      role: "Ingénieur PCB & Conception du parachute",
      duration: "2022 – 2023",
      keyResults: [
        "Deux campagnes de lancement en fusée ; le second CanSat a réalisé un vol plané circulaire contrôlé de plus de 90 secondes sous le parachute Rogallo fait maison après largage à environ 500 m.",
        "PCB sur-mesure intégrant des capteurs environnementaux redondants (BME688 + BME280), une IMU BNO055, un GPS et une télémétrie LoRa 868 MHz vers une station au sol, le tout dans le budget masse de 300–350 g imposé par le programme.",
        "Structure imprimée en 3D et en polystyrène à ouverture papillon, gardant chaque composant accessible tout en résistant à une accélération de lancement jusqu'à 20 g.",
      ],
      scope: "Projet d'équipe (4 membres, avec Noé Syfrig, Alec Horth, Alessandro Schlatter) · Programme CanSat de l'EPFL Spacecraft Team · 2022–2023",
    },
  },
  "toucan-pcb-assembly-epfl-spacecraft-team": {
    title: "Assemblage du PCB Toucan - EPFL Spacecraft Team",
    tagline: "Un ordinateur de bord assemblé à la main lors d'un marathon d'intégration de précision de trois jours, envoyé dans l'espace.",
    descriptor: "Microélectronique & Photonique · Académique",
    detail: {
      description: {
        why: "Toucan est l'ordinateur de bord de l'EPFL Spacecraft Team, et faire passer une carte peuplée à la main de PCB nu à un état prêt pour l'espace demandait une précision de soudure que l'équipe ne pouvait pas sous-traiter — trois membres, dont Tim, ont donc consacré trois jours complets à l'assembler eux-mêmes.",
        what: "Un PCB Toucan entièrement assemblé à la main et à la machine — l'ordinateur de bord de l'EPFL Spacecraft Team — peuplé de chaque puce et composant passif et vérifié fonctionnel, la carte exacte ensuite envoyée dans l'espace.",
        how: "Processus complet d'assemblage SMT réalisé à la main sur trois jours continus — application de pâte à souder, placement des composants au pick-and-place, positionnement fin guidé au laser et soudure au four à refusion — avec trois coéquipiers se relayant pour garder concentration et précision tout au long du travail.",
      },
      images: [
        { src: "/images/projects/toucan-pcb-assembly-epfl-spacecraft-team/01-pcb-fixture.jpg", alt: "Carte de l'ordinateur de bord Toucan montée dans un support de test pendant l'intégration", caption: "La carte de l'ordinateur de bord Toucan assemblée", section: "what" },
      ],
      role: "Technicien d'assemblage PCB",
      duration: "Printemps 2024",
      scope: "Projet d'équipe (3 membres) · EPFL Spacecraft Team · Printemps 2024",
    },
  },
};
