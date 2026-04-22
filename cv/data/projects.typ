// ─── Selected Projects ───
// Tags control which CV variant includes each project.

#let projects = (

    // ── 3. Ground Segment ──
  // Verified: matches project spec. No results yet (ongoing Spring 2026).
  (
    id: "ground-segment",
    title: (en: "UHF Ground Segment", fr: "Segment Sol UHF"),
    role: (en: "RF Systems Engineer", fr: "Ingénieur Systèmes RF"),
    org: "EPFL Spacecraft Team · Semester Project (ongoing Spring 2026)",
    period: (en: "Spring 2026", fr: "Printemps 2026"),
    tags: ("generic", "rf", "aeronautics", "academic"),
    description-en: (
      "Designing and building a complete UHF Tx/Rx ground station for EPFL Spacecraft Team's CubeSat: RF chain (PA, LNA, antenna, switches), GNU Radio modulation pipeline, and REST API mission control interface.",
      "Completed BOM, electrical schematics and cad model for electrical cabinet design",
      "Inital station API integration: Ground segment now operational for automated satellite Rx pass acquisition (Tx in progress).",
    ),
    description-fr: (
      "Conception et construction d'une station sol UHF Tx/Rx complète pour le CubeSat de l'EPFL Spacecraft Team : chaîne RF (PA, LNA, antenne, commutateurs), pipeline de modulation GNU Radio, et interface de contrôle de mission REST API.",
      "BOM, schémas électriques et modèle CAO pour la conception de l'armoire électrique complétés.",
      "Intégration initiale de l'API station : segment sol opérationnel pour l'acquisition automatisée de passes satellite en Rx (Tx en cours).",
    ),
    technologies: ("GNU Radio", "Python", "UHF", "SDR", "RF Hardware", "REST API"),
  ),

  // ── 5. Guardian Angel ──
  // Fixed: period Fall 2025 (not Spring 2025), clarified targets are requirements not validated results
  (
    id: "guardian-angel",
    title: (en: "The Guardian Angel", fr: "L'Ange Gardien"),
    role: (en: "Product Engineer & Team Leader", fr: "Ingénieur Produit & Gestion d'Equipe"),
    org: "EPFL · MICRO-406 (5-person team)",
    period: (en: "Fall 2025", fr: "Automne 2025"),
    tags: ("generic", "production", "rf", "precision"),
    description-en: (
      "Designed a privacy-preserving fall detection system for elderly care: mmWave radar for contactless fall detection, PPG/temperature sensors for vitals, React dashboard for caregivers.",
      "Architected a dual-database Firebase backend (RTDB for real-time streaming, Firestore for historical queries) with role-based access and patient consent protocol.",
      "Prototype at 42 CHF per sensor unit; system targets ≥95% fall detection with ≤5% false positive rate.",
    ),
    description-fr: (
      "Conçu un système de détection de chutes préservant la vie privée pour personnes âgées : radar mmWave pour détection sans contact, capteurs PPG/température pour signes vitaux, tableau de bord React pour les aidants.",
      "Architecturé un backend Firebase double base de données (RTDB pour le streaming temps réel, Firestore pour les requêtes historiques) avec contrôle d'accès par rôle et protocole de consentement patient.",
      "Prototype à 42 CHF par unité capteur ; objectif de ≥95% de détection de chutes avec ≤5% de faux positifs.",
    ),
    technologies: ("mmWave Radar", "ESP32", "FreeRTOS", "Firebase", "Fusion 360", "React"),
  ),
  // ── 1. HyLab Modulators ──
  // Fixed: role "Semester Project" (per report), added TFLT yield comparison
  (
    id: "hylab-modulators",
    title: (en: "Sub-THz Wireless Modulators", fr: "Modulateurs Sans-Fil Sub-THz"),
    role: (en: "Semester Project", fr: "Projet de Semestre"),
    org: "EPFL HyLab",
    period: (en: "Fall 2025", fr: "Automne 2025"),
    tags: ("generic", "photonics", "rf", "academic"),
    description-en: (
      "Characterized 40 antenna-coupled TFLN/TFLT materials modulators across a 4×5 geometric matrix (0.5–2.0 mm length, 3–7 µm gap) for 6G applications.",
      "Built an automated Python measurement bench with Smart Peak Detection algorithm extracting sidebands to −70 dB noise floor; reduced measurement time by 80%.",
      "Co-first-author publication in preparation.",
    ),
    description-fr: (
      "Caractérisé 40 modulateurs TFLN/TFLT couplés par antenne sur une matrice géométrique 4×5 (0.5–2.0 mm longueur, 3–7 µm gap) pour applications 6G.",
      "Développé un banc de mesure Python automatisé avec algorithme Smart Peak Detection à −70 dB de plancher de bruit ; réduit le temps de mesure de 80%.",
      "Publication en co-premier auteur en préparation.",
    ),
    technologies: ("Python", "Anritsu MS9740A", "VDI RF Multipliers", "Keysight N7776C", "TFLN", "TFLT"),
  ),

  // ── 2. SDR Receiver ──
  // Fixed: added OIP3, S11, noted 2-person team
  (
    id: "sdr-receiver",
    title: (en: "915 MHz SDR Receiver", fr: "Récepteur SDR 915 MHz"),
    role: (en: "RF IC Designer", fr: "Concepteur de CI RF"),
    org: "EPFL · EE-426 (2-person team)",
    period: (en: "Fall 2025", fr: "Automne 2025"),
    tags: ("rf", "academic"),
    description-en: (
      "Designed a complete RX chain: Inductively Degenerated Cascode LNA (45.87 dB gain, 1.21 dB NF, 1.8 mW, S11=−10.5 dB), passive mixer, and Σ−Δ modulator.",
      "Implemented in 65 nm CMOS with cross-coupled OTA integrator, 1-bit Verilog-A quantizer/DAC, I/Q dual-path architecture at 300 MHz sampling.",
      "Achieved OOK and QPSK demodulation with OIP3=+21.3 dBm linearity across the 26 MHz ISM band.",
    ),
    description-fr: (
      "Conçu une chaîne RX complète : LNA Cascode à Dégénérescence Inductive (45.87 dB gain, 1.21 dB NF, 1.8 mW, S11=−10.5 dB), mélangeur passif, modulateur Σ−Δ.",
      "Implémenté en CMOS 65 nm avec intégrateur OTA croisé, quantificateur/DAC Verilog-A 1-bit, architecture I/Q double voie à 300 MHz d'échantillonnage.",
      "Réalisé la démodulation OOK et QPSK avec OIP3=+21.3 dBm de linéarité sur la bande ISM de 26 MHz.",
    ),
    technologies: ("65 nm CMOS", "Cadence Virtuoso", "Spectre RF", "Verilog-A", "Python"),
  ),

  // ── 4. Durandal ──
  // Note: MICRO-301 report is the foil reverse-engineering analysis;
  // the startup/wireless system is a separate entrepreneurial project built on top of that course.
  (
    id: "durandal",
    title: (en: "Durandal — Wireless Fencing Referee System", fr: "Durandal — Système d'Arbitrage d'Escrime Sans Fil"),
    role: (en: "Product Engineer & Team Leader", fr: "Ingénieur Produit & Chef d'Équipe"),
    org: "Entrepreneurial Project",
    period: "2024 – 2025",
    tags: ("generic", "production", "precision"),
    description-en: (
      "Pitched and secured initial funding for a wireless, wearable fencing referee system; began field testing with Vaudoise Arena before team dispersed.",
      "Engineered full product: custom PCB (ESP32-C3, KiCad), FreeRTOS firmware with DSP-based hit detection (FFT/FIR, <10 ms latency, FIE-compliant 500 g threshold), and ESP-NOW wireless protocol.",
      "Managed end-to-end product scope: user requirements, hardware design, embedded software, and live-environment validation.",
    ),
    description-fr: (
      "Présenté le projet et obtenu un financement initial pour un système d'arbitrage d'escrime sans fil portatif ; début des tests terrain avec la Vaudoise Arena avant dispersion de l'équipe.",
      "Conçu le produit complet : PCB custom (ESP32-C3, KiCad), firmware FreeRTOS avec détection de touches DSP (FFT/FIR, latence <10 ms, seuil FIE 500 g conforme), et protocole sans fil ESP-NOW.",
      "Géré le périmètre produit de bout en bout : cahier des charges utilisateur, conception hardware, logiciel embarqué et validation en environnement réel.",
    ),
    technologies: ("ESP-NOW", "ESP32-C3", "FreeRTOS", "KiCad", "Node.js", "WebSocket"),
  ),

  // ── 6. Photonic Chip ──
  // Fixed: Q-factor ~20,500 (Lorentzian fit, more rigorous than manual ~22,400)
  // Period: keeping Spring 2024 (BA6 course, graded 07.2024 per courses.ts)
  (
    id: "photonic-chip",
    title: (en: "Integrated Photonic Chip", fr: "Puce Photonique Intégrée"),
    role: (en: "Fabrication Engineer", fr: "Ingénieur Fabrication"),
    org: "EPFL · MICRO-373 (3-person team)",
    period: (en: "Spring 2024", fr: "Printemps 2024"),
    tags: ("photonics", "academic", "precision"),
    description-en: (
      "Fabricated an SOI chip with strip/slot waveguides, MZIs, and ring resonators at 1550 nm telecom wavelength.",
      "Achieved ring resonator Q-factors up to ~20,500 (Lorentzian fit) with near-critical coupling and thermo-optic MZI modulation.",
      "Executed full cleanroom cycle at EPFL CMi: E-beam lithography (Raith EBPG5000, 5 nm resolution), cryogenic silicon dry etching (228 nm depth), metal deposition for heaters.",
    ),
    description-fr: (
      "Fabriqué une puce SOI avec guides d'onde strip/slot, MZI et résonateurs en anneau à 1550 nm.",
      "Obtenu des facteurs de qualité Q jusqu'à ~20 500 (ajustement lorentzien) avec couplage quasi-critique et modulation thermo-optique MZI.",
      "Exécuté le cycle complet en salle blanche EPFL CMi : lithographie e-beam (Raith EBPG5000, résolution 5 nm), gravure sèche cryogénique du silicium (228 nm de profondeur), dépôt métallique pour résistances chauffantes.",
    ),
    technologies: ("SEM", "AFM", "KLayout", "Raith EBPG5000", "Cryo-Etching"),
  ),

  // ── 7. Aerial Robotics ──
  // Fixed: removed C from tech (not in reports), added team size, clarified two-run strategy
  (
    id: "aerial-robotics",
    title: (en: "Aerial Robotics Drone", fr: "Drone de Robotique Aérienne"),
    role: (en: "Robotics Engineer", fr: "Ingénieur Robotique"),
    org: "EPFL · MICRO-502 (5-person team)",
    period: (en: "Spring 2025", fr: "Printemps 2025"),
    tags: ("aeronautics", "academic"),
    description-en: (
      "Developed an autonomous flight stack on Crazyflie 2.X: state estimation, visual gate detection (Canny + contour analysis), and trajectory planning.",
      "Achieved 13.87 s best lap time (8.7× faster than baseline) using a two-run strategy: safe reconnaissance lap then performance laps.",
      "Implemented a minimum-jerk trajectory planner with Lighthouse positioning system and leading/trailing waypoints.",
    ),
    description-fr: (
      "Développé une architecture de vol autonome sur Crazyflie 2.X : estimation d'état, détection visuelle de portes (Canny + analyse de contours) et planification de trajectoire.",
      "Obtenu un meilleur temps au tour de 13.87 s (8.7× plus rapide que la baseline) avec une stratégie à deux passages : reconnaissance sécurisée puis tours de performance.",
      "Implémenté un planificateur de trajectoire minimum-jerk avec système de positionnement Lighthouse et waypoints d'approche/sortie.",
    ),
    technologies: ("Python", "CVXPY", "Crazyflie", "OpenCV", "Webots"),
  ),

  // ── 8. Manufacturing Optimization ──
  // No report found — kept as-is (professional experience, not academic report)
  (
    id: "manufacturing-optimization",
    title: (en: "Manufacturing Optimization – Stérilux", fr: "Optimisation de Production – Stérilux"),
    role: (en: "Operations Consultant", fr: "Consultant en Opérations"),
    org: "Stérilux",
    period: "2024 – 2025",
    tags: ("production", "precision"),
    description-en: (
      "Reorganized the assembly workshop into a sequential station-by-station layout; designed and built custom QC test bench furniture and airtightness/ozone calibration test stations.",
      "Diagnosed production bottlenecks causing 1–5 supply stalls per month and restructured into smaller synchronized batches, nearly eliminating production interruptions.",
    ),
    description-fr: (
      "Réorganisé l'atelier d'assemblage en flux séquentiel poste-par-poste ; conçu et réalisé le mobilier du banc de test QC et les stations de test d'étanchéité et de calibration ozone.",
      "Diagnostiqué les goulots d'étranglement causant 1 à 5 arrêts d'approvisionnement par mois et restructuré en lots synchronisés, éliminant quasi totalement les interruptions de production.",
    ),
    technologies: ("Odoo ERP", "Process Optimization", "QC Testing", "Workshop Layout", "Batch Scheduling"),
  ),

  // ── 9. Rough Terrain Locomotion ──
  // Fixed: added dual-objective detail (velocity vs energy), MLP neural controller
  (
    id: "rough-terrain",
    title: (en: "Rough Terrain Locomotion", fr: "Locomotion en Terrain Accidenté"),
    role: (en: "Course Researcher", fr: "Chercheur (projet de cours)"),
    org: "EPFL · MICRO-515 (2-person team)",
    period: (en: "Spring 2025", fr: "Printemps 2025"),
    tags: ("academic",),
    description-en: (
      "Implemented co-evolution of quadruped morphology (limb lengths) and MLP neural controller using NSGA-II multi-objective optimization (forward velocity vs. energy consumption).",
      "Evolved 30 individuals over 100 generations in MuJoCo (Ant-v5); flat terrain favored longer forelimbs with symmetric trots, rough terrain produced crouched rear-weighted gaits for uphill thrust.",
    ),
    description-fr: (
      "Implémenté la co-évolution de la morphologie quadrupède (longueurs de membres) et d'un contrôleur neuronal MLP via optimisation multi-objectif NSGA-II (vitesse vs. consommation d'énergie).",
      "Fait évoluer 30 individus sur 100 générations dans MuJoCo (Ant-v5) ; le terrain plat favorise des pattes avant longues avec des trots symétriques, le terrain accidenté produit des démarches accroupies pour la poussée en montée.",
    ),
    technologies: ("MuJoCo", "NSGA-II", "Python", "OpenAI Gymnasium"),
  ),

  // ── 10. Dynabal Force Sensor ──
  // Fixed: added max measurable force (686 mN, 13× design spec)
  (
    id: "dynabal",
    title: (en: "Dynabal Force Sensor", fr: "Capteur de Force Dynabal"),
    role: (en: "Mechanical Engineer", fr: "Ingénieur Mécanique"),
    org: "EPFL · MICRO-201 (5-person team)",
    period: (en: "Spring 2023", fr: "Printemps 2023"),
    tags: ("production", "academic", "precision"),
    description-en: (
      "Designed a 1-DOF force sensor achieving 1.7 nN resolution, 403 million dynamic range, adjustable stiffness 0.17–808 N/m, and max measurable force of 686 mN (13× design spec).",
      "Implemented a Watt linkage with motor-driven stiffness compensation, wire EDM fabrication (0.05 mm precision), and Micro-Epsilon capacitive sensing (10 nm displacement resolution).",
    ),
    description-fr: (
      "Conçu un capteur de force 1-DOF atteignant 1.7 nN de résolution, plage dynamique de 403 millions, raideur ajustable 0.17–808 N/m et force mesurable max de 686 mN (13× le cahier des charges).",
      "Implémenté un mécanisme de Watt avec compensation de raideur motorisée, fabrication par électroérosion à fil (précision 0.05 mm) et détection capacitive Micro-Epsilon (résolution de déplacement 10 nm).",
    ),
    technologies: ("Fusion 360", "MATLAB", "GeoGebra"),
  ),

  // ── 11. E-Puck Robot Danseur (NEW) ──
  (
    id: "robot-danseur",
    title: (en: "Music-Reactive Dancing Robot", fr: "Robot Danseur Réactif à la Musique"),
    role: (en: "Embedded Developer", fr: "Développeur Embarqué"),
    org: "EPFL · MICRO-315 (2-person team)",
    period: (en: "Fall 2025", fr: "Automne 2025"),
    tags: ("academic",),
    description-en: (
      "Programmed an e-puck2 robot in C to recognize piano notes in real-time via 1024-point FFT (16 kHz sampling, 15.6 Hz resolution) and translate them into directional commands.",
      "Implemented automatic BPM detection, adaptive audio thresholding, and IR-based obstacle avoidance with dynamic speed scaling.",
      "Built a multi-threaded ChibiOS architecture with priority-based scheduling and semaphore synchronization for concurrent audio, motor, and sensor tasks.",
    ),
    description-fr: (
      "Programmé un robot e-puck2 en C pour reconnaître des notes de piano en temps réel via FFT 1024 points (échantillonnage 16 kHz, résolution 15.6 Hz) et les traduire en commandes directionnelles.",
      "Implémenté la détection automatique de BPM, un seuillage audio adaptatif et un évitement d'obstacles par IR avec mise à l'échelle dynamique de la vitesse.",
      "Construit une architecture multi-thread ChibiOS avec ordonnancement par priorité et synchronisation par sémaphore pour les tâches audio, moteur et capteur concurrentes.",
    ),
    technologies: ("C", "ARM Cortex-M4", "ChibiOS RTOS", "FFT (CMSIS-DSP)", "e-puck2", "IR Sensors"),
  ),
)
