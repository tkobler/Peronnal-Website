export type ProjectDomain =
  | "Embedded Systems & Electronics"
  | "Robotics & Autonomous Control"
  | "Biomedical & Precision Instrumentation"
  | "Mechanism Design & Fabrication";

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  descriptor: string;
  featured: boolean;
  domain: ProjectDomain;
  course?: string;
  heroImage: string;
  detail: {
    description: {
      what: string;
      how: string;
      why: string;
    };
    methodology?: string;
    challenges?: string[];
    publication?: string;
    images?: { src: string; alt: string; caption?: string; section?: string }[];
    role: string;
    duration: string;
    technologies: string[];
    keyResults?: string[];
    scope?: string;
    link?: string;
    sourceLink?: string;
  };
}

// This file ships with four example projects, one per domain, so the layout
// and canvas features have something to render. Replace them with your own —
// see SETUP.md §2.1. Nothing else in the codebase depends on these specific ids.

const projects: Project[] = [
  {
    id: "solar-boat-control-logic",
    number: "01",
    title: "Swiss Solar Boat - World Champion at MEBC 2026",
    tagline: "Safety-first Global Control Logic for a hydrogen-powered foiling boat",
    descriptor: "Robotics & Autonomous Control · Academic",
    domain: "Robotics & Autonomous Control",
    featured: true,
    heroImage: "/images/projects/solar-boat-control-logic/hero.jpg",
    detail: {
      description: {
        why: "SSB's new hydrogen-powered foiling boat, the Lobst'air, needed one global control logic to unify all its subsystems into a safety-first system ready for on-water testing and for winning the 2026 Monaco Energy Boat Challenge.",
        what: "A hierarchical, safety-first finite state machine that governs every subsystem of the Lobst'air, running in real time on the boat's onboard computer.",
        how: "Built a modular MATLAB Simulink/Stateflow architecture, compiled to C++ and deployed on a Speedgoat target computer.",
      },
      role: "Overall Software Architecture Engineer and Coordinator",
      duration: "Spring 2026",
      technologies: ["MATLAB Simulink", "Stateflow", "Speedgoat / Simulink Real-Time", "CAN Bus (DBC)", "XCP Protocol", "C++", "High and Low voltage system debugging"],
      scope: "Semester project · Swiss Solar Boat · Spring 2026",
      link: "https://swisssolarboat.ch",
      sourceLink: "https://actu.epfl.ch/news/swiss-solar-boat-wins-the-monaco-energy-boat-chall/",
    },
  },
  {
    id: "cochlear-implant-insertion-mechanism",
    number: "02",
    title: "Cochlear Implant Insertion Mechanism",
    tagline: "Force-sensing insertion mechanism for cochlear implant surgery",
    descriptor: "Biomedical & Precision Instrumentation · Professional",
    domain: "Biomedical & Precision Instrumentation",
    featured: true,
    heroImage: "/images/projects/cochlear-implant-insertion-mechanism/hero.jpeg",
    detail: {
      description: {
        why: "Cochlear implant insertion is done by feel, with no objective measurement of the force applied to the fragile scala tympani. The lab's prototype for studying this needed a simpler, more reliable redesign.",
        what: "A redesigned, force-instrumented insertion mechanism for cochlear implant electrodes, SLA 3D-printed and flexure-guided.",
        how: "Iterated SLA-printed prototypes of the force-sensing parallel-blade table, characterized the load cell, then wrote ESP32 firmware for foot-pedal-controlled insertion and validated it on 3D-printed cochlea and skull models.",
      },
      role: "R&D Engineer",
      duration: "Spring 2025",
      technologies: ["Embedded C", "Custom PCB Design", "SPI Force Sensing", "SLA 3D Printing", "CAD (Fusion 360)", "Flexure Guide Blades"],
      keyResults: [
        "Characterized the custom load-cell force sensor to a correction factor of ~1.04 with a measured ~4 mN/°C thermal drift, both correctable in firmware",
        "Validated the redesigned insertion mechanism on 3D-printed cochlea and skull models, logging real-time force and temperature through full insertion and extraction cycles",
        "Simplified and redesigned the SLA-printed compliant mechanism and electronics (custom PCB + ESP32 firmware), replacing an earlier prototype per the project's sterilizability, reliability, and compactness criteria",
      ],
      scope: "Professional · ARTORG Center, Inselspital · Spring 2025",
      link: "https://www.artorg.unibe.ch/research/hrl/index_eng.html",
    },
  },
  {
    id: "motion-focus",
    number: "03",
    title: "Motion Focus",
    tagline: "Plug-and-play actuator for rapid prototyping",
    descriptor: "Embedded Systems & Electronics · Personal",
    domain: "Embedded Systems & Electronics",
    featured: true,
    course: "MGT-434",
    heroImage: "/images/projects/motion-focus/hero.jpeg",
    detail: {
      description: {
        why: "Off-the-shelf brushless motors need a separate driver, encoder, and firmware wired up before they can even spin. Motion Focus puts all of that electronics directly on the motor.",
        what: "A four-layer PCB that mounts on a BLDC motor and turns it into a self-contained, commandable actuator. Closed-loop torque, velocity, and position control at 24V over USB-C, Bluetooth, or WiFi via an onboard ESP32.",
        how: "Iterated through three PCB revisions and a FOC firmware adapted from SimpleFOC to reach a stable V3, then explored its startup potential in EPFL's Technology Ventures I course before starting its transition to open source.",
      },
      methodology: "Iterated the PCB across three KiCad revisions, validating each against the FOC firmware on the bench; startup viability was tested separately through EPFL user interviews and a beachhead-market analysis.",
      challenges: [
        "Fitting driver, encoder, current sensing, and a buck converter onto a four-layer board small enough to mount on the motor, without degrading the FOC current-sense signal.",
        "Balancing three hardware iterations against the startup track's demands for a clear market and business model as the team grew from two to five.",
      ],
      images: [
        { src: "/images/projects/motion-focus/01-motor-mount.jpeg", alt: "Motor and 3D-printed test mount, back view", caption: "Custom 3D-printed test stand for bench validation", section: "how" },
        { src: "/images/projects/motion-focus/02-two-units-side.jpeg", alt: "Two Motion Focus units side by side", caption: "Two assembled Motion Focus actuators", section: "what" },
        { src: "/images/projects/motion-focus/03-two-units-wired.jpeg", alt: "Two Motion Focus V3 boards wired together for testing", caption: "V3 boards under bench test, wired for synchronized control", section: "how" },
      ],
      role: "Product Manager & Engineer",
      duration: "2024 – 2026",
      technologies: ["ESP32", "FOC (Field-Oriented Control)", "4-Layer PCB Design", "BLDC Motor Control", "Bluetooth / WiFi", "C++", "Torque, Speed and Position Control"],
      scope: "Personal project (with Alec Horth) → startup exploration, EPFL Technology Ventures I (MGT-434) · 2024–2026",
      link: "https://github.com/MotionFocus",
    },
  },
  {
    id: "mpc-rocket-landing-controller",
    number: "04",
    title: "MPC Rocket Landing Controller",
    tagline: "Model Predictive Control that lands a thrust-vectored rocket vertically.",
    descriptor: "Robotics & Autonomous Control · Academic",
    domain: "Robotics & Autonomous Control",
    featured: true,
    course: "ME-425",
    heroImage: "/images/projects/mpc-rocket-landing-controller/hero.png",
    detail: {
      description: {
        why: "The course's earlier exercises taught the basics of MPC — this project extended that into landing a thrust-vectored rocket prototype vertically.",
        what: "A complete set of MPC controllers (nominal, offset-free, robust tube, and nonlinear) that fly a 12-state rocket model to a stationary vertical landing in simulation.",
        how: "Linearized and decoupled the rocket dynamics into four subsystems, designed constrained LQR-MPC controllers for tracking, then added a disturbance observer, a robust tube-MPC, and a nonlinear MPC for comparison.",
      },
      role: "Student",
      duration: "Fall 2025",
      technologies: ["Python", "CasADi / IPOPT (Nonlinear MPC)", "Robust Tube-MPC", "Infinite-Horizon LQR", "Convex Optimization (QP)", "Polyhedral Invariant Sets (mpt4py)"],
      scope: "Team project (3 members, with Noé Syfrig and Marwane Mroueh) · EPFL ME-425 Model Predictive Control · Fall 2025",
    },
  },
  {
    id: "cansat-epfl-spacecraft-team",
    number: "05",
    title: "CanSat - EPFL Spacecraft Team",
    tagline: "A can-sized satellite recovered by a self-built Rogallo parachute, launched twice from a student rocket.",
    descriptor: "Embedded Systems & Electronics · Academic",
    domain: "Embedded Systems & Electronics",
    featured: true,
    heroImage: "/images/projects/cansat-epfl-spacecraft-team/hero.jpeg",
    detail: {
      description: {
        why: "Students need to put theory into practice. CanSat was our chance to learn embedded electronics and project management hands-on.",
        what: "Building El Tonio, a soda-can-sized satellite that had to survive a rocket launch to ~500 m and return environmental measures, over a full academic year.",
        how: "Made a custom PCB built around a Raspberry Pi Zero, engineered a ground station for real-time data transmission, cut and sewed the Rogallo parachute in-house, validated it with drone drop tests, then flew it on two rocket launches.",
      },
      challenges: [
        "Fitting redundant environmental sensors, an IMU, GPS, a camera, LoRa telemetry, and battery management onto a single PCB within a 70 mm-diameter, 300–350 g CanSat.",
        "Designing and hand-sewing a Rogallo parachute that opened reliably and flew the CanSat in a controlled circle to maximize time aloft, validated first through ground throws and then drone drop tests before trusting it to a live rocket launch.",
      ],
      role: "PCB & Parachute Design Engineer",
      duration: "2022 – 2023",
      technologies: ["Custom PCB Design", "3D Printing", "C++", "Python", "Raspberry Pi", "LoRa Telemetry", "GPS Tracking", "Camera", "Rogallo Parachute Design & Fabrication", "Li-Ion Battery Power System"],
      keyResults: [
        "Flew two rocket-launched test campaigns; the second CanSat completed a stable, 90+ second controlled circular glide under the self-built Rogallo parachute after deployment at ~500 m.",
        "Delivered a custom PCB integrating dual redundant environmental sensors (BME688 + BME280), a BNO055 IMU, GPS, and 868 MHz LoRa telemetry to a ground station, all within the programme's 300–350 g mass budget.",
        "Designed a butterfly-opening 3D-printed and polystyrene structure that kept every component accessible while surviving up to 20 g of launch acceleration.",
      ],
      scope: "Team project (4 members, with Noé Syfrig, Alec Horth, Alessandro Schlatter) · EPFL Spacecraft Team CanSat programme · 2022–2023",
      link: "https://www.instagram.com/p/CsB0CzwMTFt/",
    },
  },
  {
    id: "twocan-pcb-assembly-epfl-spacecraft-team",
    number: "06",
    title: "Twocan PCB Assembly - EPFL Spacecraft Team",
    tagline: "Three-day precision integration marathon to send a flight computer to space.",
    descriptor: "Embedded Systems & Electronics · Academic",
    domain: "Embedded Systems & Electronics",
    featured: true,
    heroImage: "/images/projects/twocan-pcb-assembly-epfl-spacecraft-team/hero.jpeg",
    detail: {
      description: {
        why: "EPFL Spacecraft Team had just designed a new onboard flight computer, and it needed to be assembled.",
        what: "A hand-assembled Twocan flight computer PCB, verified functional and later flown to space.",
        how: "Ran the complete SMT assembly process by hand over three continuous days with three teammates rotating in shifts to keep concentration and precision high throughout.",
      },
      images: [
        { src: "/images/projects/twocan-pcb-assembly-epfl-spacecraft-team/01-pcb-fixture.jpg", alt: "Twocan onboard computer PCB mounted in a test fixture during integration", caption: "The assembled Twocan flight computer board", section: "what" },
      ],
      role: "PCB Assembly Technician",
      duration: "Spring 2024",
      technologies: ["SMT PCB Assembly", "Pick-and-Place", "Reflow Soldering", "Laser Component Alignment", "Microscope Inspection"],
      scope: "Team project (3 members) · EPFL Spacecraft Team · Spring 2024",
      link: "https://www.epflspacecraftteam.ch",
    },
  },
  {
    id: "la-raclonette",
    number: "07",
    title: "La Raclonette",
    tagline: "Turning a campfire into a raclette station.",
    descriptor: "Mechanism Design & Fabrication · Personal",
    domain: "Mechanism Design & Fabrication",
    featured: true,
    heroImage: "/images/projects/la-raclonette/hero.jpeg",
    detail: {
      description: {
        why: "Grilling sausages over a wood fire got repetitive. We wanted to melt raclette straight over the embers instead.",
        what: "A small raclette pan on a screw-in handle that clips onto a stick, sold as a self-produced student micro-business.",
        how: "Hand-built each pan and clamp from TIG-welded sheet steel in a home garage, then sold more than 50 units through a self-built website and Instagram shop.",
      },
      role: "Co-Founder",
      duration: "2022 – 2024",
      technologies: ["TIG Welding", "Metal Fabrication", "Small-Batch Manufacturing", "E-Commerce"],
      keyResults: ["Sold more than 50 units through a self-run e-commerce site and Instagram shop"],
      scope: "Personal project (with Léonard) · student micro-business · 2022–2024",
      link: "https://www.laraclonette.ch",
    },
  },
  {
    id: "thymio-autonomous-navigation",
    number: "08",
    title: "Autonomous Navigation for a Thymio Robot",
    tagline: "A camera-guided planner, Kalman filter, and reactive obstacle avoidance for a Thymio robot.",
    descriptor: "Robotics & Autonomous Control · Academic",
    domain: "Robotics & Autonomous Control",
    featured: true,
    course: "MICRO-452",
    heroImage: "/images/projects/thymio-autonomous-navigation/hero.png",
    detail: {
      description: {
        why: "EPFL's Basics of Mobile Robotics course tasked teams with building a complete autonomous navigation stack for the Thymio robot.",
        what: "An autonomous navigation system letting a Thymio robot reach any goal on a marked arena, combining a visibility-graph planner, an Extended Kalman Filter, and reactive obstacle avoidance.",
        how: "Built in Python with ArUco localization, a Dijkstra planner, and a 5-state EKF fusing camera pose with wheel odometry, tuning its noise from calibration runs.",
      },
      role: "Student",
      duration: "Fall 2025",
      technologies: ["Python", "Extended Kalman Filter (EKF)", "Visibility-Graph Path Planning (Dijkstra)"],
      scope: "Team project (4 members, with Jules Villaret, Amir Lahlou, Ana Schwabedal) · MICRO-452 Basics of Mobile Robotics, EPFL · Fall 2025",
    },
  },
  {
    id: "dynabal-nanoforce-sensor",
    number: "09",
    title: "DYNABAL - Balanced Dynamometer",
    tagline: "A flexure-guided force sensor built to resolve sub-10-nanonewton forces.",
    descriptor: "Biomedical & Precision Instrumentation · Academic",
    domain: "Biomedical & Precision Instrumentation",
    featured: true,
    course: "MICRO-201",
    heroImage: "/images/projects/dynabal-nanoforce-sensor/hero.png",
    detail: {
      description: {
        why: "EPFL's Mechanism Design II course tasked teams with building a miniaturized, flexure-only force sensor able to resolve forces down to 500 nN while staying insensitive to acceleration.",
        what: "A compliant force sensor whose flexure-guided proof body is preloaded by a five-blade parallel-spring stage to tune its stiffness toward zero, read out capacitively, and balanced against gravity and acceleration.",
        how: "Modeled the proof body's stiffness and energy analytically across crossed-blade pivots and two lead-screw-driven stages.",
      },
      images: [
        { src: "/images/projects/dynabal-nanoforce-sensor/01-kinematic-architecture.png", alt: "Labeled kinematic diagram of the DYNABAL mechanism, showing masses M1–M4, the probe P, and the zero-adjustment actuator Z", caption: "Kinematic architecture: four balanced masses (M1–M4) keep the mechanism insensitive to gravity and acceleration", section: "how" },
        { src: "/images/projects/dynabal-nanoforce-sensor/02-construction-drawing.png", alt: "Detailed construction drawing of the DYNABAL sensor sub-assembly with numbered part callouts", caption: "Construction drawing of the preload and anti-rotation sub-assembly", section: "how" },
      ],
      role: "Student",
      duration: "Spring 2023",
      technologies: ["Compliant Mechanism Design", "Flexure Pivots", "Static/Force/Moment(SFM) Balancing", "CAD & Technical Drawing"],
      keyResults: [
        "Reached a computed force resolution of 9.45 nN (50× finer than the 500 nN brief) with a max force of 2.58 N and a 272×10⁶ virtual dynamic range.",
        "Verified full SFM balance (static, force, moment) across all four moving masses, and sized the preload drive to deliver 217 N from a 78 mNm motor — 5× the torque actually needed.",
      ],
      scope: "Team project (5 members, with Léo Bosch, Sven Profichet, Vincent Bouzereau, Clémence Rey) · EPFL Mechanism Design II (MICRO-201) · Spring 2023",
    },
  },
  {
    id: "l-epluche-carotte",
    number: "10",
    title: "L'Épluche-Carotte",
    tagline: "A hand-cranked mechanism that peels a carrot's full length in one motion.",
    descriptor: "Mechanism Design & Fabrication · Academic",
    domain: "Mechanism Design & Fabrication",
    featured: true,
    course: "ME-102",
    heroImage: "/images/projects/l-epluche-carotte/hero.png",
    detail: {
      description: {
        why: "EPFL's Construction Mécanique II course tasked teams with designing a fully hand-powered carrot peeler ready for production.",
        what: "A hand-cranked carrot peeler where a rail-mounted blade carriage strips the carrot on the return stroke, while a partial gear indexes its rotation on the forward stroke.",
        how: "Scored four mechanism concepts (ring-drive, Geneva, pendulum, and the chosen crank-rocker) against a weighted matrix, then modeled the kinematics and produced full 2D/3D technical drawings for machining.",
      },
      challenges: [
        "Separating the carrot's rotation from the blade's translation to avoid a helical peeling motion, after early concepts (a rotating ring, a pen-click/Geneva mechanism) proved too bulky or unsafe.",
        "Housing the partial-gear indexing drive out of reach of the user while keeping the whole mechanism foldable and compact enough for a kitchen counter.",
      ],
      role: "Student",
      duration: "Spring 2022",
      technologies: ["CAD & Technical Drawing (CATIA)", "ISO 2768-mk Tolerancing"],
      keyResults: [
        "Reached 95.5% mechanical efficiency on the translation phase and 92% on the rotation phase, both above the 90% target",
        "Kept total mass to 5.25 kg against an 8 kg budget, and required under 30 W of hand-crank effort over 5 seconds",
        "Folded down to about half its deployed height and 15 cm shorter for storage",
        "Graded 5.75/6",
      ],
      scope: "Team project (4 members, with Vincent Bouzereau, Rim El Qabli, Ranjeet Sapkota) · EPFL Construction Mécanique II (ME-102/107) · Spring 2022",
    },
  },
  {
    id: "le-duplo",
    number: "11",
    title: "Le Duplo",
    tagline: "A pocket paragliding variometer, packaged inside a 3D-printed Duplo brick.",
    descriptor: "Embedded Systems & Electronics · Personal",
    domain: "Embedded Systems & Electronics",
    featured: true,
    heroImage: "/images/projects/le-duplo/hero.jpeg",
    detail: {
      description: {
        why: "Paragliding pilots need to hear whether they're climbing or sinking without looking at a screen mid-flight.",
        what: "A pocket-sized paragliding variometer packaged in a 3D-printed case shaped like an oversized Duplo brick, sensing climb or sink rate through a barometric pressure sensor.",
        how: "Designed a custom PCB with a pressure sensor, an accelerometer, and an Arduino Nano and adapted a friend's variometer firmware to the new hardware.",
      },
      images: [
        { src: "/images/projects/le-duplo/01-pcb-board.jpeg", alt: "Custom PCB next to the 3D-printed Duplo-shaped enclosure", caption: "The Duplo variometer's PCB, built around an MS5611 pressure sensor, buzzer, and status LEDs", section: "how" },
        { src: "/images/projects/le-duplo/02-open-case.jpeg", alt: "Open Duplo-shaped enclosure showing the PCB, speaker, and LiPo battery fitted inside", caption: "The assembled internals: PCB, speaker, and LiPo battery packed into the Duplo-shaped case", section: "how" },
        { src: "/images/projects/le-duplo/03-pcb-back.jpeg", alt: "Back of the PCB, silkscreened 'Le Duplo by TK' next to the 3D-printed enclosure", caption: "Tim's first custom PCB design, silkscreened with its own name", section: "why" },
      ],
      role: "Maker",
      duration: "Spring 2021",
      technologies: ["Custom PCB Design", "C++", "3D printing", "LiPo Battery Power System"],
      scope: "Personal project · Spring 2021",
    },
  },
  {
    id: "timit-connected-door-lock",
    number: "12",
    title: "TimiT - Connected Door Lock",
    tagline: "A WiFi-controlled door lock, built from scratch as a Swiss high-school engineering thesis.",
    descriptor: "Embedded Systems & Electronics · Academic",
    domain: "Embedded Systems & Electronics",
    featured: true,
    heroImage: "/images/projects/timit-connected-door-lock/hero.jpg",
    detail: {
      description: {
        why: "I wanted a WiFi-controlled door lock for my bedroom and needed a high-school engineering thesis.",
        what: "A WiFi-connected door lock: a high-torque DC motor and 3D-printed housing clamp onto the existing latch, controlled from a smartphone app.",
        how: "Measured the latch's real torque need, drove a geared DC motor through H-bridge, wrote the ESP8266 firmware, and designed and 3D-printed the clamp-on housing over nine months.",
      },
      challenges: [
        "The first H-bridge chip (SN754410) could only supply 1 A and sagged the motor's 5 V supply to 3 V under load — swapped to a DRV8871 driver rated to 3.6 A to get full torque.",
        "Motor switching created voltage spikes that risked resetting the microcontroller — diagnosed the noise on an oscilloscope and added an LC filter to clean the supply.",
        "3D-printed housing parts warped off the print bed on the first attempt — recalibrated the printer to get flat, accurately fitting parts.",
      ],
      images: [
        { src: "/images/projects/timit-connected-door-lock/01-electronics-assembly.jpg", alt: "Open 3D-printed housing showing the DC gear motor, DRV8871 driver, and limit switches wired inside", caption: "The lock's electronics, wired inside the printed housing", section: "how" },
      ],
      role: "Maker and Student",
      duration: "2020 – 2021",
      technologies: ["Blynk App (WiFi Control)", "H-Bridge Motor Driver", "Arduino C++", "Custom PCB & Soldering", "Fusion 360", "3D printing"],
      keyResults: ["Delivered a working WiFi-to-latch lock system within a self-imposed ~100 CHF prototyping budget (50 CHF target for the finished unit)"],
      scope: "Personal project (Travail de Maturité) · Gymnase de Morges · 2020–2021",
    },
  },
  {
    id: "first-lego-league",
    number: "13",
    title: "FIRST LEGO League",
    tagline: "LEGO Mindstorms student competition",
    descriptor: "Robotics & Autonomous Control · Academic",
    domain: "Robotics & Autonomous Control",
    featured: true,
    heroImage: "/images/projects/first-lego-league/hero.jpg",
    detail: {
      description: {
        why: "FIRST LEGO League pairs a robot-game tournament with a parallel innovation project to teach teens the engineering process.",
        what: "An autonomous LEGO Mindstorms EV3 robot that completed a series of timed missions.",
        how: "Built and iterated the EV3 robot with swappable mechanical attachments for each mission and programmed autonomous routines to navigate and execute them within the round's time limit.",
      },
      challenges: [
        "Designing a robot that could reliably complete multiple timed missions (object drops, flag pushes) on a ~2m×3m field within the round's time limit, using swappable attachments rather than one all-purpose tool.",
        "Balancing the robot-game engineering work with a parallel year-long sustainability project: designing a habitat that automatically regulates its own internal temperature.",
      ],
      images: [
        { src: "/images/projects/first-lego-league/01-robot-build.jpg", alt: "LEGO Mindstorms EV3 robot with swappable gripper and lift attachments next to a mission model", caption: "The team's EV3 robot mid-build, with attachments for scoring individual missions", section: "how" },
        { src: "/images/projects/first-lego-league/02-trophies.jpg", alt: "Three FIRST LEGO League regional trophies: Best Robot, Champion FLL, and Robot Game Winner, season 2019/2020", caption: "Best Robot, Regional Champion, and Robot Game Winner — Lausanne regional, 2019/2020", section: "what" },
      ],
      role: "Team Member",
      duration: "2019 – 2020",
      technologies: ["LEGO Mindstorms EV3", "Autonomous Mission Navigation", "Mechanical Attachment Design", "Team Collaboration & Project Management"],
      keyResults: [
        "Won 1st place at the FLL regional competition (Lausanne, Switzerland), earning Best Robot, Regional Champion, and Robot Game Winner awards",
        "Placed 7th at the FLL Switzerland national finals after a full season of robot and innovation-project development",
      ],
      scope: "Team project (10 members) · FIRST LEGO League Switzerland · 2019–2020",
      link: "https://www.firstlegoleague.org",
    },
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
