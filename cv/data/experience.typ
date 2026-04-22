// ─── Professional Experience ───
// Tags control which CV variants include each entry.

#let experiences = (
  (
    company: "Stérilux",
    location: "Renens, Switzerland",
    tags: ("generic", "production", "precision"),
    roles: (
      (
        title: (en: "Manufacturing Manager", fr: "Responsable de Production"),
        period: (en: "Feb 2026 – Present", fr: "Fév 2026 – Présent"),
        type: (en: "Part-time", fr: "Temps partiel"),
        description-en: (
          "Managing production of ozone sterilization devices (~300 parts, 4 subassemblies per unit): increased throughput by 60% since arrival. Balancing make-to-stock and make-to-order production, scheduling, and lot disposition.",
          "Built a QR-based traceability platform tracking each subunit end-to-end (operator, date, test results, stock levels), consolidating scattered records into a single system while maintaining production rate.",
          "Training and supporting production operators; documenting competencies and coordinating repair/rework activities per quality requirements.",
          "Participating in Odoo ERP restructuration (~500 references across raw materials, intermediates, and finished goods) to link purchase orders, manufacturing orders, and inventory.",
          "Contributing to ISO 9001/13485 re-compliance: conducted internal gap audit, mapping production processes to draft WI",
        ),
        description-fr: (
          "Gestion de la production de dispositifs de stérilisation à l'ozone (~300 pièces, 4 sous-ensembles par unité) : augmentation du débit de 60% depuis l'arrivée. Équilibre entre fabrication sur stock et fabrication à la demande, ordonnancement et décisions de libération de lots.",
          "Développé une plateforme de traçabilité par QR code suivant chaque sous-unité de bout en bout (opérateur, date, résultats de tests, niveaux de stock), consolidant des données dispersées en un système unique tout en maintenant le rythme de production.",
          "Formation et encadrement des opérateurs de production ; documentation des compétences et coordination des activités de réparation/reprise selon les exigences qualité.",
          "Participation à la restructuration de l'ERP Odoo (~500 références entre matières premières, intermédiaires et produits finis) pour relier commandes d'achat, ordres de fabrication et inventaire.",
          "Contribution à la remise en conformité ISO 9001/13485 : audit interne de diagnostic, cartographie des processus et WI.",
        ),
      ),
      (
        title: (en: "Operations Consultant", fr: "Consultant en Opérations"),
        period: "2025",
        type: (en: "Part-time", fr: "Temps partiel"),
        description-en: (
          "Reorganized the assembly workshop into a sequential station-by-station layout; designed and built custom QC test bench furniture and set up airtightness/ozone calibration test stations.",
          "Diagnosed production bottlenecks: irregular batch sizing and poor stock management causing 1–5 supply stalls per month and restructured into smaller synchronized batches, nearly eliminating production interruptions.",
        ),
        description-fr: (
          "Réorganisé l'atelier d'assemblage en flux séquentiel poste-par-poste ; conçu et réalisé le mobilier du banc de test QC et mis en place les stations de test d'étanchéité et de calibration ozone.",
          "Diagnostiqué les goulots d'étranglement : lots irréguliers et mauvaise gestion de stock causant 1 à 5 arrêts d'approvisionnement par mois et restructuré en lots synchronisés, éliminant quasi totalement les interruptions de production.",
        ),
      ),
      (
        title: (en: "Production Technician", fr: "Technicien de Production"),
        period: "2024",
        type: (en: "Part-time", fr: "Temps partiel"),
        description-en: (
          "Assembled and quality-controlled ozone sterilization devices on the production line; learned full product architecture.",
        ),
        description-fr: (
          "Assemblé et contrôlé la qualité de dispositifs de stérilisation à l'ozone sur la ligne de production ; acquis une connaissance pratique de l'architecture complète des produits.",
        ),
      ),
    ),
  ),
  (
    company: "Laboratory of Intelligent Systems (LIS), EPFL",
    location: "Lausanne, Switzerland",
    tags: ("generic", "aeronautics", "academic", "photonics", "rf", "precision"),
    roles: (
      (
        title: (en: "Drone Maker – Research Internship", fr: "Fabricant de Drones – Stage de Recherche"),
        period: (en: "Summer 2025", fr: "Été 2025"),
        type: (en: "Internship", fr: "Stage"),
        description-en: (
          "Built and calibrated 5+ high-end micro-drones (NVIDIA MCU, carbon chassis) for swarm robotics research; contributed to both hardware assembly and MPC controller tuning with camera feed integration.",
        ),
        description-fr: (
          "Construit et calibré 5+ micro-drones haut de gamme (MCU NVIDIA, châssis carbone) pour la recherche en robotique d'essaim ; contribution à l'assemblage matériel et au réglage du contrôleur MPC avec intégration du flux caméra.",
        ),
      ),
    ),
  ),
  (
    company: "Forum EPFL",
    location: "Lausanne, Switzerland",
    tags: ("generic", "production", "precision"),
    roles: (
      (
        title: (en: "Logistics Manager", fr: "Responsable Logistique"),
        period: "2024",
        type: (en: "Student Organization", fr: "Association étudiante"),
        description-en: (
          "Co-led logistics for Europe's largest student-organized career fair (365+ exhibitors, 23,000 visitors, 5 days): venue layout across 3 floors with 5 configurations, supplier coordination, furniture, signage, and transport.",
          "Co-Managed a team of 4 direct reports plus up to 20 volunteer staff and 15 professional contractors at peak; year-long commitment (~10 h/week).",
        ),
        description-fr: (
          "Co-piloté la logistique du plus grand salon de recrutement étudiant d'Europe (365+ exposants, 23 000 visiteurs, 5 jours) : agencement du site sur 3 étages avec 5 configurations, coordination fournisseurs, mobilier, signalétique et transport.",
          "Co-géré une équipe de 4 collaborateurs directs plus jusqu'à 20 bénévoles et 15 prestataires professionnels en pic ; engagement sur un an (~10 h/semaine).",
        ),
      ),
    ),
  ),
  (
    company: "EPFL",
    location: "Lausanne, Switzerland",
    tags: ("generic", "academic", "photonics", "rf", "precision"),
    roles: (
      (
        title: (en: "Teaching Assistant – Electronics", fr: "Assistant Étudiant – Électronique"),
        period: "2023 – 2025",
        type: (en: "Academic", fr: "Académique"),
        description-en: (
          "Mentored 100+ students through circuit design, hands-on electronics lab and transistor/AOP fundamentals.",
        ),
        description-fr: (
          "Encadré 100+ étudiants en conception de circuits, travaux pratiques d'électronique et fondamentaux transistors/AOP.",
        ),
      ),
    ),
  ),
  (
    company: "Uveya",
    location: "Renens, Switzerland",
    tags: ("aeronautics", "production", "precision"),
    roles: (
      (
        title: (en: "Freelance Mechanical Designer", fr: "Concepteur Mécanique Freelance"),
        period: (en: "Summer 2021", fr: "Été 2021"),
        type: (en: "Freelance", fr: "Freelance"),
        description-en: (
          "Designed the exterior casing for an autonomous UV-C disinfection robot (V3.2) for airplane cockpits.",
          "Used CATIA V5 for complex surface modeling and airflow optimization.",
        ),
        description-fr: (
          "Conçu le boîtier extérieur d'un robot de désinfection UV-C autonome (V3.2) pour cockpits d'avion.",
          "Utilisé CATIA V5 pour la modélisation de surfaces complexes et l'optimisation des flux d'air.",
        ),
      ),
    ),
  ),
)

// ─── Sidequest / Interests (used in interests section) ───

#let sidequests = (
  (
    title: (en: "Volunteer Firefighter", fr: "Sapeur-Pompier Volontaire"),
    org: "SDIS Vaud",
    period: (en: "2023 – 2026", fr: "2023 – 2026"),
    description: (
      en: "Certified Porteur (breathing apparatus carrier); trained in live-fire intervention in simulated residential structures. Active emergency response with SDIS Chamberonne.",
      fr: "Certifié Porteur (porteur d'appareil respiratoire) ; formé à l'intervention feu réel en bâtiments résidentiels simulés. Intervention d'urgence active avec le SDIS Chamberonne.",
    ),
  ),
  (
    title: (en: "Trumpet Teacher", fr: "Professeur de Trompette"),
    org: (en: "Private Instruction", fr: "Cours Particuliers"),
    period: (en: "2022 – Present", fr: "2022 – Présent"),
    description: (
      en: "Taught trumpet to students across age groups, adapting pedagogy to individual learning profiles.",
      fr: "Enseigné la trompette à des élèves de tous âges, en adaptant la pédagogie aux profils d'apprentissage individuels.",
    ),
  ),
  (
    title: (en: "Licensed Pilot – PPL(A)", fr: "Pilote Privé – PPL(A)"),
    org: none,
    period: none,
    description: (
      en: "Private Pilot License, self-funded. Single-engine piston aircraft.",
      fr: "Licence de pilote privé, autofinancée. Avion monomoteur à pistons.",
    ),
  ),
)
