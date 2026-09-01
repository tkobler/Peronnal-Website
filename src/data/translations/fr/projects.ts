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
  "first-lego-league": {
    title: "FIRST LEGO League",
    tagline: "Un robot autonome Lego Mindstorms et un projet d'habitation à régulation thermique automatique, réalisés avec une équipe de dix pour la FIRST LEGO League Suisse.",
    descriptor: "Robotique & IA · Académique",
    detail: {
      description: {
        why: "La FIRST LEGO League associe un tournoi de robot-game à un projet d'innovation mené en parallèle — notre équipe de dix personnes s'est donné pour objectif de construire un robot Lego Mindstorms capable d'accomplir l'ensemble du plateau de missions, tout en traitant le thème de durabilité de l'année via un projet d'habitation à régulation thermique automatique.",
        what: "Un robot autonome LEGO Mindstorms EV3 accomplissant une série de missions chronométrées (faire tomber des cibles, pousser des objets, etc.) sur un plateau de compétition d'environ 2m×3m, accompagné d'un concept d'habitation conçu et présenté, capable de réguler automatiquement sa température intérieure.",
        how: "Construction et itération du robot EV3 avec des mécanismes interchangeables pour chaque mission, programmation de routines autonomes pour naviguer et les exécuter dans le temps imparti, et en parallèle recherche et présentation du projet de durabilité devant un jury — la saison s'est conclue par la 1ère place au régional de Lausanne et la 7e place à la finale nationale suisse.",
      },
      challenges: [
        "Concevoir un robot capable d'accomplir de manière fiable plusieurs missions chronométrées (faire tomber des objets, pousser un drapeau) sur un plateau d'environ 2m×3m dans le temps imparti, à l'aide de mécanismes interchangeables plutôt que d'un seul outil polyvalent.",
        "Concilier le travail d'ingénierie du robot-game avec un projet de durabilité mené en parallèle sur toute l'année : la conception d'une habitation qui régule automatiquement sa propre température intérieure.",
      ],
      images: [
        { src: "/images/projects/first-lego-league/01-robot-build.jpg", alt: "Robot LEGO Mindstorms EV3 avec pince et bras releveur interchangeables, à côté d'un modèle de mission", caption: "Le robot EV3 de l'équipe en cours de construction, avec ses accessoires pour accomplir chaque mission", section: "how" },
        { src: "/images/projects/first-lego-league/02-trophies.jpg", alt: "Trois trophées régionaux FIRST LEGO League : Meilleur Robot, Champion FLL et Vainqueur Robot-Game, saison 2019/2020", caption: "Meilleur Robot, Champion régional et Vainqueur Robot-Game — régional de Lausanne, 2019/2020", section: "what" },
      ],
      role: "Membre de l'équipe",
      duration: "2019 – 2020",
      keyResults: [
        "Remporté la 1ère place au concours régional FLL (Lausanne, Suisse), avec les prix Meilleur Robot, Champion FLL et Vainqueur Robot-Game",
        "Terminé 7e à la finale nationale FLL Suisse après une saison complète de développement du robot et du projet d'innovation",
      ],
      scope: "Projet d'équipe (10 membres) · FIRST LEGO League Suisse · 2019–2020",
    },
  },
  "le-duplo": {
    title: "Le Duplo",
    tagline: "Un variomètre de poche pour le parapente, dans une brique Duplo imprimée en 3D.",
    descriptor: "Ingénierie Produit & IoT · Personnel",
    detail: {
      description: {
        why: "Un pilote de parapente doit savoir s'il monte ou descend sans regarder un écran en plein vol — Tim a construit son propre variomètre, en partant du firmware d'un collègue et en concevant lui-même la partie matérielle.",
        what: "Un variomètre de poche pour le parapente, dans un boîtier imprimé en 3D en forme de brique Duplo géante, qui mesure la vitesse de montée ou de descente via un capteur de pression barométrique et un accéléromètre, et la restitue par un bip distinct via huit LEDs et un haut-parleur.",
        how: "Conception de son premier PCB sur-mesure, articulé autour d'un capteur de pression barométrique MS5611, d'un accéléromètre et d'un Arduino Nano, adaptation du firmware variomètre d'un collègue pour piloter le son et les LEDs, puis impression 3D et câblage à la main du boîtier en forme de Duplo avec batterie LiPo et haut-parleur.",
      },
      images: [
        { src: "/images/projects/le-duplo/01-pcb-board.jpeg", alt: "PCB sur-mesure à côté du boîtier imprimé en 3D en forme de Duplo", caption: "Le PCB du variomètre Duplo, construit autour d'un capteur de pression MS5611, d'un buzzer et de LEDs d'état", section: "how" },
        { src: "/images/projects/le-duplo/02-open-case.jpeg", alt: "Boîtier Duplo ouvert montrant le PCB, le haut-parleur et la batterie LiPo à l'intérieur", caption: "L'intérieur assemblé : PCB, haut-parleur et batterie LiPo logés dans le boîtier en forme de Duplo", section: "how" },
        { src: "/images/projects/le-duplo/03-pcb-back.jpeg", alt: "Dos du PCB, sérigraphié « Le Duplo by TK », à côté du boîtier imprimé en 3D", caption: "Le tout premier PCB sur-mesure de Tim, sérigraphié à son propre nom", section: "why" },
      ],
      role: "Ingénieur Hardware & Conception PCB",
      duration: "Printemps 2021",
      scope: "Projet personnel · Printemps 2021",
    },
  },
  "mpc-rocket-landing-controller": {
    title: "Contrôleur MPC pour l'atterrissage d'une fusée",
    tagline: "Un contrôleur prédictif (MPC) qui fait atterrir verticalement un prototype de fusée à poussée vectorielle, à la SpaceX.",
    descriptor: "Robotique & IA · Académique",
    detail: {
      description: {
        why: "Les exercices précédents du cours avaient appris à identifier et programmer un contrôleur MPC — ce projet en était la suite directe, demandant à des équipes de trois de concevoir toute la chaîne de contrôle MPC nécessaire pour faire atterrir un petit prototype de fusée à poussée vectorielle (des hélices remplaçant le moteur-fusée) à la manière du booster Falcon de SpaceX.",
        what: "Un ensemble complet de contrôleurs MPC — nominal, sans décalage statique (offset-free), tube robuste et non linéaire — pilotant un modèle de fusée à 12 états depuis une descente initiale jusqu'à un atterrissage vertical stationnaire sur une plateforme « chopsticks » simulée, développé et validé pour le cours ME-425 Model Predictive Control de l'EPFL avec Noé Syfrig et Marwane Mroueh.",
        how: "Linéarisation et découplage de la dynamique non linéaire de la fusée en quatre sous-systèmes indépendants (x, y, z, roulis), conception de contrôleurs MPC à ensemble terminal LQR contraints pour la stabilisation et le suivi de vitesse/position, ajout d'un observateur de perturbation pour un suivi sans décalage à mesure que le carburant réduit la masse, puis construction d'un contrôleur tube-MPC robuste pour la phase finale d'atterrissage et d'un MPC non linéaire basé sur CasADi pour comparaison — le tout vérifié en boucle fermée par simulation sur le modèle non linéaire.",
      },
      role: "Étudiant",
      duration: "Automne 2025",
      scope: "Projet d'équipe (3 membres, avec Noé Syfrig et Marwane Mroueh) · Cours EPFL ME-425 Model Predictive Control · Automne 2025",
    },
  },
  "dynabal-nanoforce-sensor": {
    title: "DYNABAL - Dynamomètre équilibré",
    tagline: "Un capteur de force en guidage flexible conçu pour résoudre des forces sous la dizaine de nanonewtons, via un mécanisme compliant équilibré et à rigidité compensée.",
    descriptor: "Design Industriel & Mécanique · Académique",
    detail: {
      description: {
        why: "Le cours de Conception de Mécanismes II de l'EPFL demandait à des équipes de cinq de construire un capteur de force miniaturisé, tout en guidages flexibles, capable de résoudre 500 nN sans être perturbé par l'accélération — Tim et quatre coéquipiers ont construit DYNABAL pour largement dépasser cet objectif.",
        what: "Un capteur de force compliant dont le corps d'épreuve en guidage flexible est préchargé par une table à cinq lames parallèles pour ramener sa rigidité vers zéro, mesuré par voie capacitive, et équilibré mécaniquement — statiquement, en force et en moment — contre la gravité et l'accélération.",
        how: "Modélisation analytique de la rigidité et de l'énergie du corps d'épreuve à travers des pivots à lames croisées et deux étages pilotés par vis (réglage de rigidité, réglage du zéro), puis vérification de l'équilibrage statique/force/moment par dimensionnement de quatre masses de contrepoids.",
      },
      images: [
        { src: "/images/projects/dynabal-nanoforce-sensor/01-kinematic-architecture.png", alt: "Schéma cinématique annoté du mécanisme DYNABAL, montrant les masses M1 à M4, la sonde P et l'actionneur de réglage du zéro Z", caption: "Architecture cinématique : quatre masses équilibrées (M1–M4) rendent le mécanisme insensible à la gravité et aux accélérations", section: "how" },
        { src: "/images/projects/dynabal-nanoforce-sensor/02-construction-drawing.png", alt: "Dessin de construction détaillé du sous-ensemble du capteur DYNABAL avec repères de pièces numérotés", caption: "Dessin de construction du sous-ensemble de précharge et anti-rotation", section: "how" },
      ],
      role: "Étudiant",
      duration: "Printemps 2023",
      keyResults: [
        "Résolution de force calculée de 9.45 nN (50 fois plus fine que l'objectif de 500 nN), avec une force max de 2.58 N et une gamme dynamique virtuelle de 272×10⁶.",
        "Équilibrage complet SFM (statique, force, moment) vérifié sur les quatre masses mobiles, et système de précharge dimensionné pour délivrer 217 N à partir d'un moteur de 78 mNm — 5 fois le couple réellement nécessaire.",
      ],
      scope: "Projet d'équipe (5 membres, avec Léo Bosch, Sven Profichet, Vincent Bouzereau, Clémence Rey) · Cours EPFL Conception de Mécanismes II (MICRO-201) · Printemps 2023",
    },
  },
};
