import type { Translations } from "../index";

export const projects: Translations["projects"] = {
  heading: "Projets",
  subtitle: "Projets en ingénierie et recherche",
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
    "Embedded Systems & Electronics": { name: "Systèmes Embarqués & Électronique", desc: "PCB sur Mesure, Firmware & Objets Connectés" },
    "Robotics & Autonomous Control": { name: "Robotique & Contrôle Autonome", desc: "Architectures de Contrôle, Navigation & Autonomie" },
    "Biomedical & Precision Instrumentation": { name: "Biomédical & Instrumentation de Précision", desc: "Mesure de Force & Instrumentation à Flexions" },
    "Mechanism Design & Fabrication": { name: "Conception de Mécanismes & Fabrication", desc: "Conception de Mécanismes, CAO & Fabrication Artisanale" },
  },
};

export const projectsContent: Translations["projectsContent"] = {
  "solar-boat-control-logic": {
    title: "Swiss Solar Boat - Champion du monde au MEBC 2026",
    tagline: "Logique de contrôle globale pour un bateau à foils propulsé à l'hydrogène",
    descriptor: "Robotique & Contrôle Autonome · Académique",
    detail: {
      description: {
        why: "Le nouveau bateau à foils à hydrogène du SSB, le Lobst'air, avait besoin d'une logique de contrôle globale pour unifier tous ses sous-systèmes pour les essais sur l'eau et pour remporter le Monaco Energy Boat Challenge 2026.",
        what: "Une machine à états finis hiérarchique et basé sur la sécurité qui pilote chaque sous-système du Lobst'air, exécutée en temps réel sur l'ordinateur de bord du bateau.",
        how: "Architecture modulaire MATLAB Simulink/Stateflow, compilée en C++ et déployée sur un ordinateur cible Speedgoat.",
      },
      role: "Ingénieur Architecture Logicielle Globale et Coordination",
      duration: "Printemps 2026",
      scope: "Projet de semestre · Swiss Solar Boat · Printemps 2026",
    },
  },
  "cochlear-implant-insertion-mechanism": {
    title: "Mécanisme d'insertion pour implant cochléaire",
    tagline: "Mécanisme d'insertion d'implant cochléaire",
    descriptor: "Biomédical & Instrumentation de Précision · Professionnel",
    detail: {
      description: {
        why: "L'insertion d'un implant cochléaire se fait à la main, sans mesure objective de la force appliquée à la fragile scala tympani. Le laboratoire avait besion d'une version plus simple et fiable de son prototype.",
        what: "Un mécanisme d'insertion instrumenté et redessiné pour les électrodes d'implant cochléaire, imprimé en SLA et guidé par lames flexibles.",
        how: "Itération de prototypes imprimés en SLA de la table de mesure de force à lames parallèles, caractérisation du capteur de charge, développement d'un firmware ESP32 pour une insertion pilotée par pédale, puis validation sur des modèles de cochlée et de crâne imprimés en 3D.",
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
    tagline: "Actionneur prêt à l'emploi pour le prototypage rapide",
    descriptor: "Systèmes Embarqués & Électronique · Personnel",
    detail: {
      description: {
        why: "Un moteur brushless du commerce nécessite un driver, un encodeur et un firmware de contrôle séparés avant même de pouvoir fonctionner. Motion Focus embarque toute cette électronique directement sur le moteur.",
        what: "Un PCB quatre couches qui se monte sur un moteur BLDC et le transforme en actionneur intelligent. Contrôle en boucle fermée du couple, de la vitesse et de la position à 24V via USB-C, Bluetooth ou WiFi grâce à un ESP32 embarqué.",
        how: "Trois révisions successives du PCB et un firmware FOC repris de SimpleFOC jusqu'à une version 3 stable, puis exploration du potentiel startup du projet dans le cours Technology Ventures I de l'EPFL, avant d'entamer sa transition vers l'open source.",
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
      role: "Chef de Produit & Ingénieur",
      duration: "2024 – 2026",
      scope: "Projet personnel (avec Alec Horth) → exploration startup, cours EPFL Technology Ventures I (MGT-434) · 2024–2026",
    },
  },
  "la-raclonette": {
    title: "La Raclonette",
    tagline: "Transformer un feu de camp en station à raclette.",
    descriptor: "Conception de Mécanismes & Fabrication · Personnel",
    detail: {
      description: {
        why: "Griller des saucisses sur un feu de bois devenait répétitif. Nous voulions faire fondre une raclette directement sur les braises.",
        what: "Une petite poêle à raclette montée sur un manche à visser sur un bâton, vendue comme micro-entreprise étudiante autoproduite.",
        how: "Fabrication artisanale de chaque poêle et de son mécanisme de serrage en tôle soudée au TIG, puis vente de plus de 50 exemplaires via un site web et une boutique Instagram autoproduits.",
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
    descriptor: "Systèmes Embarqués & Électronique · Académique",
    detail: {
      description: {
        why: "CanSat était notre occasion d'apprendre l'électronique embarquée et la gestion de projet de manière pratique.",
        what: "El Tonio, un satellite de la taille d'une canette qui devait survivre à un lancement en fusée jusqu'à environ 500 m et rapporter des mesures environnementales, sur toute une année académique.",
        how: "Conception d'un PCB sur-mesure, développement d'une station au sol pour la transmission de données en temps réel, conception du parachute Rogallo, validation par largage au drone, puis deux lancements en fusée.",
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
  "twocan-pcb-assembly-epfl-spacecraft-team": {
    title: "Assemblage du PCB Twocan - EPFL Spacecraft Team",
    tagline: "Marathon d'intégration de précision de trois jours pour envoyer un ordinateur de bord dans l'espace.",
    descriptor: "Systèmes Embarqués & Électronique · Académique",
    detail: {
      description: {
        why: "L'EPFL Spacecraft Team venait de concevoir un nouvel ordinateur de bord, qui devait encore être assemblé.",
        what: "Un PCB Twocan assemblé à la main, vérifié fonctionnel puis envoyé dans l'espace.",
        how: "Processus complet d'assemblage SMT réalisé à la main sur trois jours continus, avec trois coéquipiers se relayant pour garder concentration et précision tout au long du travail.",
      },
      images: [
        { src: "/images/projects/twocan-pcb-assembly-epfl-spacecraft-team/01-pcb-fixture.jpg", alt: "Carte de l'ordinateur de bord Twocan montée dans un support de test pendant l'intégration", caption: "La carte de l'ordinateur de bord Twocan assemblée", section: "what" },
      ],
      role: "Technicien d'assemblage PCB",
      duration: "Printemps 2024",
      scope: "Projet d'équipe (3 membres) · EPFL Spacecraft Team · Printemps 2024",
    },
  },
  "first-lego-league": {
    title: "FIRST LEGO League",
    tagline: "Compétition étudiante LEGO Mindstorms",
    descriptor: "Robotique & Contrôle Autonome · Académique",
    detail: {
      description: {
        why: "La FIRST LEGO League associe un tournoi de robot à un projet d'innovation parallèle pour enseigner aux adolescents la démarche d'ingénierie.",
        what: "Un robot LEGO Mindstorms EV3 autonome ayant accompli une série de missions chronométrées.",
        how: "Construction et itération du robot EV3 avec des mécanismes interchangeables pour chaque mission, et programmation de routines autonomes pour naviguer et les exécuter dans le temps imparti.",
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
    descriptor: "Systèmes Embarqués & Électronique · Personnel",
    detail: {
      description: {
        why: "Un pilote de parapente doit savoir s'il monte ou descend sans regarder un écran en plein vol.",
        what: "Un variomètre de poche pour le parapente, dans un boîtier imprimé en 3D en forme de brique Duplo géante, mesurant la vitesse de montée ou de descente via un capteur de pression barométrique.",
        how: "Conception d'un PCB sur-mesure avec un capteur de pression, un accéléromètre et un Arduino Nano, et adaptation du firmware variomètre d'un ami au nouveau matériel.",
      },
      images: [
        { src: "/images/projects/le-duplo/01-pcb-board.jpeg", alt: "PCB sur-mesure à côté du boîtier imprimé en 3D en forme de Duplo", caption: "Le PCB du variomètre Duplo, construit autour d'un capteur de pression MS5611, d'un buzzer et de LEDs d'état", section: "how" },
        { src: "/images/projects/le-duplo/02-open-case.jpeg", alt: "Boîtier Duplo ouvert montrant le PCB, le haut-parleur et la batterie LiPo à l'intérieur", caption: "L'intérieur assemblé : PCB, haut-parleur et batterie LiPo logés dans le boîtier en forme de Duplo", section: "how" },
        { src: "/images/projects/le-duplo/03-pcb-back.jpeg", alt: "Dos du PCB, sérigraphié « Le Duplo by TK », à côté du boîtier imprimé en 3D", caption: "Le tout premier PCB sur-mesure de Tim, sérigraphié à son propre nom", section: "why" },
      ],
      role: "Maker",
      duration: "Printemps 2021",
      scope: "Projet personnel · Printemps 2021",
    },
  },
  "mpc-rocket-landing-controller": {
    title: "Contrôleur MPC pour l'atterrissage d'une fusée",
    tagline: "Un contrôleur prédictif (MPC) qui fait atterrir verticalement une fusée à poussée vectorielle.",
    descriptor: "Robotique & Contrôle Autonome · Académique",
    detail: {
      description: {
        why: "SpaceX a transformé le rêve de l’atterrissage vertical en réalité. Ce cours nous a permis de comprendre comment ça fonctionne.",
        what: "Un ensemble complet de contrôleurs MPC (nominal, sans décalage statique, tube robuste et non linéaire) pilotant un modèle de fusée à 12 états jusqu'à un atterrissage vertical stationnaire en simulation.",
        how: "Linéarisation et découplage de la dynamique de la fusée en quatre sous-systèmes, conception de contrôleurs LQR-MPC contraints pour le suivi, puis ajout d'un observateur de perturbation, d'un tube-MPC robuste et d'un MPC non linéaire pour comparaison.",
      },
      role: "Étudiant",
      duration: "Automne 2025",
      scope: "Projet d'équipe (3 membres, avec Noé Syfrig et Marwane Mroueh) · Cours EPFL ME-425 Model Predictive Control · Automne 2025",
    },
  },
  "dynabal-nanoforce-sensor": {
    title: "DYNABAL - Dynamomètre équilibré",
    tagline: "Un capteur de force en guidage flexible conçu pour mesurer des forces sous la dizaine de nanonewtons.",
    descriptor: "Biomédical & Instrumentation de Précision · Académique",
    detail: {
      description: {
        why: "Le cours de Conception de Mécanismes II de l'EPFL demande de construire un capteur de force miniaturisé, tout en guidages flexibles, capable de résoudre 500 nN sans être perturbé par l'accélération.",
        what: "Un capteur de force compliant dont le corps d'épreuve en guidage flexible est préchargé par une table à cinq lames parallèles pour ramener sa rigidité vers zéro, mesuré par voie capacitive, et équilibré contre la gravité et l'accélération.",
        how: "Modélisation analytique de la rigidité et de l'énergie du corps d'épreuve à travers des pivots à lames croisées et deux étages pilotés par vis.",
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
  "thymio-autonomous-navigation": {
    title: "Navigation Autonome pour un Robot Thymio",
    tagline: "Planificateur guidé par caméra, Filtre de Kalman et un évitement d'obstacles réactif.",
    descriptor: "Robotique & Contrôle Autonome · Académique",
    detail: {
      description: {
        why: "Le cours Basics of Mobile Robotics de l'EPFL demande de développer un système de navigation autonome complet pour le robot Thymio.",
        what: "Un système de navigation autonome permettant à un robot Thymio de rejoindre n'importe quel objectif sur une arène balisée, combinant un planificateur par graphe de visibilité, un filtre de Kalman étendu, et un évitement d'obstacles réactif.",
        how: "Développé en Python avec localisation ArUco, un planificateur Dijkstra, et un filtre de Kalman étendu à 5 états fusionnant pose caméra et odométrie, avec réglage du bruit à partir de mesures empiriques.",
      },
      role: "Étudiant",
      duration: "Automne 2025",
      scope: "Projet d'équipe (4 membres, avec Jules Villaret, Amir Lahlou, Ana Schwabedal) · MICRO-452 Basics of Mobile Robotics, EPFL · Automne 2025",
    },
  },
  "l-epluche-carotte": {
    title: "L'Épluche-Carotte",
    tagline: "Un mécanisme à manivelle qui épluche une carotte sur toute sa longueur en un seul geste.",
    descriptor: "Conception de Mécanismes & Fabrication · Académique",
    detail: {
      description: {
        why: "Le cours de Construction Mécanique II de l'EPFL demandait de concevoir un épluche-carotte entièrement manuel prêt pour la production.",
        what: "Un épluche-carotte à manivelle où un chariot de lames monté sur rail épluche la carotte au retour, tandis qu'une roue partiellement dentée fait tourner la carotte à l'aller.",
        how: "Comparaison de quatre concepts de mécanisme (anneau rotatif, croix de Malte, pendule, et le bielle-manivelle retenu) via une matrice pondérée, puis modélisation de la cinématique et réalisation des dessins techniques 2D/3D complets pour l'usinage.",
      },
      challenges: [
        "Séparer la rotation de la carotte de la translation des lames pour éviter un mouvement d'épluchage hélicoïdal, après que les premiers concepts (anneau rotatif, mécanisme stylo-bille/croix de Malte) se soient révélés trop volumineux ou dangereux.",
        "Loger l'entraînement à roue partiellement dentée hors d'atteinte de l'utilisateur, tout en gardant un mécanisme pliable et assez compact pour un plan de travail de cuisine.",
      ],
      role: "Étudiant",
      duration: "Printemps 2022",
      keyResults: [
        "Rendement mécanique de 95,5% en phase de translation et 92% en phase de rotation, tous deux au-dessus de l'objectif de 90%",
        "Masse totale limitée à 5,25 kg pour un budget de 8 kg, avec un effort de manivelle inférieur à 30 W sur 5 secondes",
        "Rangement réduit à environ la moitié de la hauteur déployée et 15 cm de moins en longueur",
        "Note obtenue : 5,75/6",
      ],
      scope: "Projet d'équipe (4 membres, avec Vincent Bouzereau, Rim El Qabli, Ranjeet Sapkota) · Construction Mécanique II EPFL (ME-102/107) · Printemps 2022",
    },
  },
  "timit-connected-door-lock": {
    title: "TimiT - Serrure Connectée",
    tagline: "Une serrure de porte pilotée en wifi, conçue de A à Z pour un travail de maturité gymnasiale.",
    descriptor: "Systèmes Embarqués & Électronique · Académique",
    detail: {
      description: {
        why: "Je voulais une serrure de porte pilotée en wifi pour ma chambre, et j'avais besoin d'un thème de travail de maturité.",
        what: "Une serrure de porte connectée en wifi : un moteur à fort couple et un boîtier imprimé en 3D se fixent sur le verrou existant, contrôlés depuis une application smartphone.",
        how: "Mesure du couple réellement nécessaire au verrou, entraînement d'un moteur CC à engrenage via un pont H, écriture du firmware ESP8266, puis conception et impression 3D du boîtier clipsable, le tout sur neuf mois.",
      },
      challenges: [
        "Le premier pont H (SN754410) ne délivrait qu'1 A et faisait chuter l'alimentation 5 V du moteur à 3 V en charge — remplacé par un driver DRV8871 supportant 3,6 A pour retrouver le couple complet.",
        "La commutation du moteur créait des pics de tension risquant de réinitialiser le microcontrôleur — bruit diagnostiqué à l'oscilloscope, puis filtre LC ajouté pour assainir l'alimentation.",
        "Les pièces imprimées en 3D du boîtier se sont déformées (warping) sur le plateau au premier essai — imprimante recalibrée pour obtenir des pièces plates et bien ajustées.",
      ],
      images: [
        { src: "/images/projects/timit-connected-door-lock/01-electronics-assembly.jpg", alt: "Boîtier imprimé en 3D ouvert montrant le moteur CC, le driver DRV8871 et les fins de course câblés à l'intérieur", caption: "L'électronique de la serrure, câblée à l'intérieur du boîtier imprimé", section: "how" },
      ],
      role: "Maker et Étudiant",
      duration: "2020 – 2021",
      keyResults: ["Système serrure connectée fonctionnel, de l'application au verrou, livré dans un budget de prototypage auto-imposé d'environ 100 CHF (objectif de 50 CHF pour l'unité finale)"],
      scope: "Projet personnel (Travail de Maturité) · Gymnase de Morges · 2020–2021",
    },
  },
};
