// ─── Skills ───
// Organized by category. Each variant selects relevant categories.

#let skills = (
  programming: (
    label: (en: "Programming", fr: "Programmation"),
    items: "C/C++, Python, MATLAB, Verilog-A, JavaScript/TypeScript, Node.js, React",
  ),
  eda-tools: (
    label: (en: "EDA & Simulation", fr: "EDA & Simulation"),
    items: "Cadence Virtuoso, Spectre RF, KiCad, GNU Radio, COMSOL",
  ),
  cad: (
    label: (en: "CAD & Manufacturing", fr: "CAO & Fabrication"),
    items: "CATIA V5, Fusion 360, KLayout, SolidWorks, AnyLogic",
  ),
  photonics-tools: (
    label: (en: "Photonics & Charact.", fr: "Photonique & Caract."),
    items: "Anritsu OSA, SEM, AFM, E-beam Lithography, Cryo-Etching, Optical Bench",
  ),
  embedded: (
    label: (en: "Embedded Systems", fr: "Systèmes Embarqués"),
    items: "ESP32, FreeRTOS, Arduino, Crazyflie, mmWave Radar, PCB Design",
  ),
  data-ai: (
    label: (en: "Data & AI", fr: "Données & IA"),
    items: "NumPy, SciPy, OpenCV, CVXPY, MuJoCo, Webots, Evolutionary Algorithms",
  ),
  manufacturing: (
    label: (en: "Production & QC", fr: "Production & QC"),
    items: "ERP (Odoo), Production Scheduling, QC Testing, ISO 9001 (in progress), Workshop Layout Optimization, Test Bench Design",
  ),
  software: (
    label: (en: "Software & DevOps", fr: "Logiciel & DevOps"),
    items: "MS Suite, Git, Linux, Firebase, REST API, Docker, LaTeX, Typst",
  ),
  precision-metrology: (
    label: (en: "Precision & Metrology", fr: "Précision & Métrologie"),
    items: "SEM, Profilometer, Optical Microscope, Capacitive Sensing (10 nm), Airtightness Testing, Flexible Mechanisms, E-beam Lithography, Cryo-Etching",
  ),
)

// ─── Skill sets per variant ───
#let skill-sets = (
  generic: ("programming", "cad", "embedded", "manufacturing", "software"),
  product: ("manufacturing", "programming", "software", "data-ai", "embedded", "cad"),
  photonics: ("photonics-tools", "eda-tools", "programming", "cad", "data-ai", "software"),
  rf: ("eda-tools", "photonics-tools", "programming", "embedded", "data-ai", "software"),
  production: ("manufacturing", "cad", "programming", "embedded", "data-ai", "software"),
  aeronautics: ("embedded", "cad", "programming", "eda-tools", "data-ai", "software"),
  academic: ("programming", "eda-tools", "photonics-tools", "embedded", "cad", "data-ai", "software"),
  precision: ("precision-metrology", "cad", "manufacturing", "programming", "embedded", "software"),
)

// ─── Languages ───

#let languages = (
  (
    name: (en: "French", fr: "Français"),
    level: (en: "Native", fr: "Langue maternelle"),
  ),
  (
    name: (en: "English", fr: "Anglais"),
    level: (en: "Fluent (C1)", fr: "Courant (C1)"),
  ),
  (
    name: (en: "Spanish", fr: "Espagnol"),
    level: (en: "Intermediate (B2)", fr: "Intermédiaire (B2)"),
  ),
)

// ─── Profile Summaries ───

#let profiles = (
  generic: (
    en: "Microengineering Master student at EPFL. I joined Stérilux as a production technician two years ago and now run their manufacturing. In parallel, I characterize sub-THz modulators at HyLab, design the UHF ground segment for the EPFL Spacecraft Team's CubeSat, and took Durandal, a wireless fencing referee system, through to its first field tests. Outside of that: volunteer firefighter, private pilot (PPL-A), and trumpet teacher.",
    fr: "Étudiant en Master de Microtechnique à l'EPFL. Entré chez Stérilux comme technicien de production il y a deux ans, j'en pilote aujourd'hui la fabrication. En parallèle, je caractérise des modulateurs sub-THz au HyLab, conçois le segment sol UHF du CubeSat de l'EPFL Spacecraft Team, et j'ai mené jusqu'aux premiers tests Durandal, un système d'arbitrage d'escrime sans fil. En dehors : pompier volontaire, pilote privé (PPL-A) et professeur de trompette.",
  ),
  photonics: (
    en: "Microengineering Master student at EPFL (GPA: 5.43/6) specializing in Photonics and Semiconductors. Research experience in sub-THz electro-optic modulator characterization (TFLN/TFLT, HyLab) and hands-on photonic chip fabrication (SOI ring resonators, Q~20,500). Coursework in nanophotonics, computational optical imaging, and cleanroom processes. Seeking an internship or master thesis in photonics R&D, integrated photonics design, or optical systems engineering.",
    fr: "Étudiant en Master de Microtechnique à l'EPFL (moyenne : 5.43/6), spécialisé en Photonique et Semi-conducteurs. Expérience de recherche en caractérisation de modulateurs électro-optiques sub-THz (TFLN/TFLT, HyLab) et fabrication de puces photoniques intégrées (résonateurs en anneau SOI, Q~20 500). Formation en nanophotonique, imagerie optique computationnelle et procédés salle blanche. À la recherche d'un stage ou d'un projet de master thesis en R&D photonique, conception de circuits photoniques intégrés ou ingénierie de systèmes optiques.",
  ),
  rf: (
    en: "Microengineering Master student at EPFL (GPA: 5.43/6) with 6.0/6 in both RF Circuits Design and Analog IC Design. Designed a 915 MHz SDR receiver in 65 nm CMOS (LNA, mixer, Σ−Δ modulator). Experience with CubeSat ground segment RF systems (UHF Tx/Rx, GNU Radio) and sub-THz modulator characterization. Worked with Cadence Virtuoso, Spectre RF, and Python-based test automation. Seeking an internship or master thesis in RF/analog IC design.",
    fr: "Étudiant en Master de Microtechnique à l'EPFL (moyenne : 5.43/6) avec 6.0/6 en Conception de Circuits RF et en Conception de CI Analogiques. Conception d'un récepteur SDR 915 MHz en CMOS 65 nm (LNA, mélangeur, modulateur Σ−Δ). Expérience en systèmes RF de segment sol CubeSat (UHF Tx/Rx, GNU Radio) et caractérisation de modulateurs sub-THz. Pratique de Cadence Virtuoso, Spectre RF et automatisation de tests Python. À la recherche d'un stage ou d'un projet de master thesis en conception de CI RF/analogiques.",
  ),
  production: (
    en: "Microengineering Master student at EPFL (GPA: 5.43/6) with hands-on operational experience at Stérilux, progressing from production technician to Manufacturing Manager in a 13-person medical-device company. Reorganized workshop layout, restructured batch production to eliminate incomplete assemblies, and rebuilt ERP (Odoo) for production-inventory integration. Background in embedded systems, sensor integration, and product design. ISO 9001 awareness (ongoing). Seeking an internship or master thesis in production engineering or operations.",
    fr: "Étudiant en Master de Microtechnique à l'EPFL (moyenne : 5.43/6) avec expérience opérationnelle chez Stérilux, de technicien de production à Responsable de Production dans une entreprise de dispositifs médicaux de 13 personnes. Réorganisation de l'atelier, restructuration de la production par lots pour éliminer les assemblages incomplets, et reconstruction de l'ERP (Odoo) pour l'intégration production-inventaire. Compétences en systèmes embarqués, intégration de capteurs et conception de produits. Connaissance ISO 9001 (en cours). À la recherche d'un stage ou d'un projet de master thesis en ingénierie de production ou opérations.",
  ),
  aeronautics: (
    en: "Microengineering Master student at EPFL (GPA: 5.43/6) and licensed pilot (PPL-A). Built autonomous drone flight stacks (13.87 s lap time, 8.7× faster than baseline), designed a CubeSat UHF ground segment, and created UV-C robot casing for aircraft cockpits. Fabricated swarm drones at EPFL's Laboratory of Intelligent Systems. Background in embedded systems and RF design. Seeking an internship or master thesis in aerospace or avionics engineering.",
    fr: "Étudiant en Master de Microtechnique à l'EPFL (moyenne : 5.43/6) et pilote privé (PPL-A). Développement d'architectures de vol autonome pour drones (13.87 s au tour, 8.7× plus rapide que la baseline), conception de segment sol UHF pour CubeSat, et création de boîtier de robot UV-C pour cockpits d'avion. Fabrication de drones en essaim au Laboratoire de Systèmes Intelligents de l'EPFL. Compétences en systèmes embarqués et conception RF. À la recherche d'un stage ou d'un projet de master thesis en ingénierie aérospatiale ou avionique.",
  ),
  precision: (
    en: "Microengineering Master student at EPFL (GPA: 5.43/6) with 6.0/6 in Advanced Microfabrication Practicals and hands-on cleanroom experience (E-beam lithography, cryo-etching, SEM metrology). Designed a nanoNewton-resolution force sensor using flexible mechanisms, wire EDM, and capacitive sensing. Production background at a medical-device company: 300-part manual assembly, QC test bench design, and high-voltage UV lamp integration. Seeking an internship in precision manufacturing, micromechanics, or quality engineering.",
    fr: "Étudiant en Master de Microtechnique à l'EPFL (moyenne : 5.43/6) avec 6.0/6 en Travaux Pratiques de Microfabrication Avancée et expérience pratique en salle blanche (lithographie e-beam, gravure cryogénique, métrologie SEM). Conception d'un capteur de force à résolution nanoNewton utilisant des mécanismes flexibles, l'électroérosion à fil et la détection capacitive. Expérience de production dans une entreprise de dispositifs médicaux : assemblage manuel de 300 pièces, conception de bancs de test QC et intégration de lampes UV haute tension. À la recherche d'un stage en fabrication de précision, micromécanique ou ingénierie qualité.",
  ),
  academic: (
    en: "Second-year Microengineering Master student at EPFL (GPA: 5.43/6) specializing in Photonics and Semiconductors. Research experience in sub-THz electro-optic modulator characterization (100–300 GHz, HyLab). Course projects in RF IC design (65 nm CMOS Σ−Δ SDR receiver) and integrated photonic chip fabrication. Seeking a master thesis or research internship in photonics, RF/analog IC design, or their intersection. Teaching experience in electronics (100+ students). Member of EPFL Spacecraft Team.",
    fr: "Étudiant en deuxième année de Master en Microtechnique à l'EPFL (moyenne : 5.43/6), spécialisé en Photonique et Semi-conducteurs. Expérience de recherche en caractérisation de modulateurs électro-optiques sub-THz (100–300 GHz, HyLab). Projets de cours en conception de CI RF (récepteur SDR Σ−Δ en CMOS 65 nm) et fabrication de puces photoniques intégrées. À la recherche d'un projet de master thesis ou d'un stage de recherche en photonique, conception de CI RF/analogiques, ou leur intersection. Expérience d'enseignement en électronique (100+ étudiants). Membre de l'EPFL Spacecraft Team.",
  ),
  product: (
    en: "EPFL Microengineering Master student bridging hands-on hardware engineering and operations data work. Manufacturing Manager at a 13-person medical-device company (Stérilux): grew from production technician in under two years, increased throughput by 60%, and now leading the ERP restructuration of ~500 references and the ISO 9001/13485 re-compliance effort. Comfortable across R&D, production, and customer-facing tooling, from sub-THz photonics characterization to React dashboards and REST-API ground stations.",
    fr: "Étudiant en Master de Microtechnique à l'EPFL, faisant le lien entre l'ingénierie matérielle de terrain et le travail sur données opérationnelles. Responsable de Production dans une entreprise de dispositifs médicaux de 13 personnes (Stérilux) : passé de technicien en moins de deux ans, augmentation du débit de 60 %, et conduite de la restructuration ERP d'environ 500 références ainsi que de la remise en conformité ISO 9001/13485. À l'aise en R&D, production et outils orientés client, de la caractérisation photonique sub-THz aux tableaux de bord React et stations sol REST API.",
  ),
)
