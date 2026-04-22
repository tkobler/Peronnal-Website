// ─── Education ───

#let education = (
  (
    institution: "EPFL – École Polytechnique Fédérale de Lausanne",
    degree: (
      en: "MSc in Microengineering",
      fr: "MSc en Microtechnique",
    ),
    specialization: (
      en: "Specialization: Photonics & Semiconductors",
      fr: "Spécialisation : Photonique & Semi-conducteurs",
    ),
    period: "2024 – 2026",
    location: "Lausanne, Switzerland",
    gpa: "5.43 / 6.0",
    credits: "90 / 120",
    status: (en: "(in progress)", fr: "(en cours)"),
    highlights-en: (
      "Analog IC Design: 6.0/6 · RF Circuits Design Techniques: 6.0/6",
      "Products Design & Systems Engineering: 5.75/6 · Evolutionary Robotics: 5.75/6",
    ),
    highlights-fr: (
      "Analog IC Design: 6.0/6 · RF Circuits Design Techniques: 6.0/6",
      "Products Design & Systems Engineering: 5.75/6 · Evolutionary Robotics: 5.75/6",
    ),
  ),
  (
    institution: "EPFL – École Polytechnique Fédérale de Lausanne",
    degree: (
      en: "BSc in Microengineering",
      fr: "BSc en Microtechnique",
    ),
    specialization: none,
    period: "2020 – 2024",
    location: "Lausanne, Switzerland",
    gpa: "4.69 / 6.0",
    credits: "180 / 180",
    status: none,
    highlights-en: (
      "Advanced Microfabrication Practicals: 6.0/6 · Mechanism Design II: 5.5/6",
      "Semiconductor Devices: 5.5/6 · Materials Processing I: 5.5/6",
    ),
    highlights-fr: (
      "Travaux Pratiques de Microfabrication Avancée : 6.0/6 · Conception de Mécanismes II : 5.5/6",
      "Semi-conducteurs : 5.5/6 · Procédés de Matériaux I : 5.5/6",
    ),
  ),
)

// ─── Relevant Coursework (for academic CV) ───

#let coursework = (
  photonics: (
    label: (en: "Photonics & Semiconductors", fr: "Photonique & Semi-conducteurs"),
    courses: (
      "Nanophotonics", "Computational Optical Imaging", "Optical Engineering",
      "Physics of Semiconductor Devices", "Nanotechnology", "Quantum & Nanocomputing",
      "Advanced Microfabrication Practicals", "Microfabrication Technologies",
      "Physical Models for Micro & Nanosystems",
    ),
  ),
  rf: (
    label: (en: "RF & Analog Electronics", fr: "RF & Électronique Analogique"),
    courses: (
      "RF Circuits Design Techniques (6.0/6)", "Analog IC Design (6.0/6)",
      "Advanced Analog IC Design", "Electronic Circuits & Systems",
      "Electronics I & II", "Signals & Systems I & II",
    ),
  ),
  robotics: (
    label: (en: "Robotics & AI", fr: "Robotique & IA"),
    courses: (
      "Aerial Robotics", "Evolutionary Robotics", "Machine Learning I",
      "Control Systems & Discrete-Time Control",
      "Embedded Systems & Robotics", "Microcontrollers",
    ),
  ),
  manufacturing: (
    label: (en: "Manufacturing & Design", fr: "Fabrication & Conception"),
    courses: (
      "Manufacturing Technologies", "Manufacturing Systems & Supply Chain Dynamics",
      "Introduction to Additive Manufacturing", "Mechanism Design I & II",
      "Sensors",
    ),
  ),
)
