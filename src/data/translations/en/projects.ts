import type { Translations } from "../index";

export const projects: Translations["projects"] = {
  heading: "Projects",
  subtitle: "Selected engineering and academic projects",
  contextLabel: "Context (The Why)",
  solutionLabel: "Solution (The What)",
  implementationLabel: "Implementation (The How)",
  roleLabel: "Role",
  durationLabel: "Duration",
  technologiesLabel: "Technologies",
  moreDetails: "More Details",
  back: "Back",
  wantMore: "Want to see more?",
  wantMoreSub: "Browse the complete collection of engineering, research, and creative work.",
  fullPortfolio: "Full Portfolio",
  byDomain: "By Domain",
  listView: "List View",
  backToDomains: "Back to Domains",
  exploreDomain: "Explore Domain",
  keyResultsLabel: "Key Results",
  scopeLabel: "Scope",
  methodologyLabel: "Methodology",
  challengesLabel: "Challenges & Decisions",
  publicationLabel: "Publication",
  filterAll: "All",
  domains: {
    "Microelectronics & Photonics": { name: "Microelectronics & Photonics", desc: "IC Design, Silicon Photonics & RF Systems" },
    "Product Engineering & IoT": { name: "Product Engineering & IoT", desc: "Embedded Systems & Connected Devices" },
    "Robotics & AI": { name: "Robotics & AI", desc: "Autonomous Agents & Neural Control" },
    "Industrial Design & Mechanical": { name: "Industrial Design & Mechanical", desc: "Precision Mechanisms & Product Design" },
  },
};

export const projectsContent: Translations["projectsContent"] = {
  "solar-boat-control-logic": {
    title: "Global Control Logic for a Foiling Hydrogen Boat",
    tagline: "Safety-first FSM architecture for a hydrogen-powered foiling boat",
    descriptor: "Product Engineering & IoT · Academic",
    detail: {
      description: {
        why: "Individual subsystems (HV, hydrogen, cooling, dashboard, foil control) had each been developed and validated in isolation across prior semesters, but the boat had no unifying control layer to bring them into one safety-first system ready for on-water testing.",
        what: "A hierarchical, safety-first finite state machine that governs every subsystem of the Lobst'air, a three-passenger hydrogen-powered foiling boat, from a single real-time control architecture running on the boat's onboard computer.",
        how: "Built a modular MATLAB Simulink/Stateflow architecture — Safety first approach and per-subsystem CAN-connected blocks — compiled to C++ and deployed on a Speedgoat target, developed through three Agile-inspired phases: architecture, integration, then on-water validation.",
      },
      role: "Overall Software Architecture Engineer and Coordinator",
      duration: "Spring 2026",
      scope: "Semester project · Swiss Solar Boat · Spring 2026",
    },
  },
  "cochlear-implant-insertion-mechanism": {
    title: "Cochlear Implant Insertion Mechanism",
    tagline: "A force-sensing insertion mechanism and fluid-sealed training platform for cochlear implant surgery",
    descriptor: "Product Engineering & IoT · Professional",
    detail: {
      description: {
        why: "Cochlear implant insertion is done by feel, with no objective measurement of the force applied to the fragile scala tympani — the lab's prototype for studying this needed a simpler, more reliable redesign.",
        what: "A redesigned, force-instrumented insertion mechanism for cochlear implant electrodes, paired with an in-vitro training platform that seals a 3D-printed scala tympani model to simulate real inner-ear fluid flow.",
        how: "Iterated the force-sensing table through SLA-printed prototypes, characterized the load cell's linearity and drift, wrote ESP32 firmware for foot-pedal-controlled insertion with real-time logging, and validated on 3D-printed cochlea and skull models.",
      },
      role: "R&D Engineer",
      duration: "Spring 2025",
      keyResults: [
        "Characterized the custom load-cell force sensor to a correction factor of ~1.04 with a measured ~4 mN/°C thermal drift, both correctable in firmware",
        "Validated the redesigned insertion mechanism on 3D-printed cochlea and skull models, logging real-time force and temperature through full insertion and extraction cycles",
        "Simplified and redesigned the SLA-printed compliant mechanism and electronics (custom PCB + ESP32 firmware), replacing an earlier prototype per the project's sterilizability, reliability, and compactness criteria",
      ],
      scope: "Professional · ARTORG Center, Inselspital · Spring 2025",
    },
  },
  "motion-focus": {
    title: "Motion Focus",
    tagline: "A drop-in PCB that gives any brushless motor onboard torque, position, and velocity control over USB-C, Bluetooth, or WiFi",
    descriptor: "Robotics & AI · Personal",
    detail: {
      description: {
        why: "Off-the-shelf brushless motors need a separate driver, encoder, and firmware wired up before they can even spin — friction that keeps BLDC motors out of everyday DIY and rapid-prototyping projects. Motion Focus, built with Alec Horth from day one, puts all of that electronics directly on the motor.",
        what: "A four-layer PCB that mounts on a BLDC motor and turns it into a self-contained, commandable actuator — closed-loop torque, velocity, and position control at 24V over USB-C, Bluetooth, or WiFi via an onboard ESP32.",
        how: "Iterated through three PCB revisions (ESP32, DRV8313 driver, AS5048A encoder, dual current sensing) and a FOC firmware adapted from SimpleFOC to reach a stable V3, then explored its startup potential in EPFL's Technology Ventures I course — market research and go-to-market with a team that grew from two to five — before starting its transition to open source.",
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
      role: "Product Engineer",
      duration: "2024 – 2026",
      scope: "Personal project (with Alec Horth) → startup exploration, EPFL Technology Ventures I (MGT-434) · 2024–2026",
    },
  },
  "la-raclonette": {
    title: "La Raclonette",
    tagline: "A screw-on pan that turns a campfire into a raclette station.",
    descriptor: "Industrial Design & Mechanical · Personal",
    detail: {
      description: {
        why: "Grilling sausages over a wood fire got repetitive — Tim and Léonard wanted to melt real raclette straight over the embers instead.",
        what: "A small non-stick raclette pan on a screw-in handle that clips onto a stick, sold as a self-produced student micro-business with a companion recipe booklet.",
        how: "Hand-built each pan and clamp from TIG-welded sheet steel in a home garage, then sold more than 50 units through a self-built website and Instagram shop.",
      },
      role: "Co-Founder",
      duration: "2022 – 2024",
      keyResults: ["Sold more than 50 units through a self-run e-commerce site and Instagram shop"],
      scope: "Personal project (with Léonard) · student micro-business · 2022–2024",
    },
  },
  "cansat-epfl-spacecraft-team": {
    title: "CanSat - EPFL Spacecraft Team",
    tagline: "A can-sized satellite recovered by a self-built Rogallo parachute, launched twice from a student rocket.",
    descriptor: "Product Engineering & IoT · Academic",
    detail: {
      description: {
        why: "EPFL Spacecraft Team's CanSat programme tasks student teams with building a soda-can-sized satellite that survives a rocket launch to ~500 m and returns usable science — El Tonio was built over a full academic year by a team of four (with Noé Syfrig, Alec Horth, and Alessandro Schlatter).",
        what: "A CanSat carrying redundant environmental sensors, an IMU, GPS, and a camera inside a butterfly-opening 3D-printed shell, recovered under a hand-built Rogallo parachute designed to glide it in a controlled circle and stretch its time aloft.",
        how: "Went from a preliminary design review through a custom PCB (dual BME688/BME280 sensors, BNO055 IMU, LoRa 868 MHz telemetry to a ground station) built around a Raspberry Pi Zero, cut and sewed the Rogallo parachute in-house, validated it with ground throws and drone drop tests, then flew it on two rocket launches — the second surviving a full descent with a 90-second-plus controlled circular glide from ~500 m.",
      },
      challenges: [
        "Fitting redundant environmental sensors, an IMU, GPS, a camera, LoRa telemetry, and battery management onto a single PCB within a 70 mm-diameter, 300–350 g CanSat.",
        "Designing and hand-sewing a Rogallo parachute that opened reliably and flew the CanSat in a controlled circle to maximize time aloft, validated first through ground throws and then drone drop tests before trusting it to a live rocket launch.",
      ],
      role: "PCB & Parachute Design Engineer",
      duration: "2022 – 2023",
      keyResults: [
        "Flew two rocket-launched test campaigns; the second CanSat completed a stable, 90+ second controlled circular glide under the self-built Rogallo parachute after deployment at ~500 m.",
        "Delivered a custom PCB integrating dual redundant environmental sensors (BME688 + BME280), a BNO055 IMU, GPS, and 868 MHz LoRa telemetry to a ground station, all within the programme's 300–350 g mass budget.",
        "Designed a butterfly-opening 3D-printed and polystyrene structure that kept every component accessible while surviving up to 20 g of launch acceleration.",
      ],
      scope: "Team project (4 members, with Noé Syfrig, Alec Horth, Alessandro Schlatter) · EPFL Spacecraft Team CanSat programme · 2022–2023",
    },
  },
  "toucan-pcb-assembly-epfl-spacecraft-team": {
    title: "Toucan PCB Assembly - EPFL Spacecraft Team",
    tagline: "A hand-assembled onboard flight computer, built in a three-day precision integration marathon and sent to space.",
    descriptor: "Microelectronics & Photonics · Academic",
    detail: {
      description: {
        why: "Toucan is EPFL Spacecraft Team's onboard flight computer, and getting a hand-populated board from bare PCB to space-ready demanded a level of soldering precision the team couldn't outsource — so three members, including Tim, committed three full days of dedicated bench time to assemble it themselves.",
        what: "A fully hand- and machine-assembled Toucan flight computer PCB — EPFL Spacecraft Team's onboard computer — populated with every chip and passive component and verified functional, the exact board later flown to space.",
        how: "Ran the complete SMT assembly process by hand over three continuous days — solder-paste application, pick-and-place component placement, laser-guided fine positioning, and reflow oven soldering — with three teammates rotating in shifts to keep concentration and precision high throughout.",
      },
      images: [
        { src: "/images/projects/toucan-pcb-assembly-epfl-spacecraft-team/01-pcb-fixture.jpg", alt: "Toucan onboard computer PCB mounted in a test fixture during integration", caption: "The assembled Toucan flight computer board", section: "what" },
      ],
      role: "PCB Assembly Technician",
      duration: "Spring 2024",
      scope: "Team project (3 members) · EPFL Spacecraft Team · Spring 2024",
    },
  },
  "first-lego-league": {
    title: "FIRST LEGO League",
    tagline: "An autonomous Lego Mindstorms robot and a self-regulating habitat design, built with a 10-person team for FIRST LEGO League Switzerland.",
    descriptor: "Robotics & AI · Academic",
    detail: {
      description: {
        why: "FIRST LEGO League pairs a robot-game tournament with a parallel innovation project — our team of ten set out to build a Lego Mindstorms robot that could reliably execute a full mission board, while also tackling that year's sustainability theme with a self-regulating habitat design.",
        what: "An autonomous LEGO Mindstorms EV3 robot that completed a series of timed missions (knocking down targets, pushing objects, and more) on a roughly 2m×3m competition field, alongside a designed and presented concept for a habitat that automatically regulates its own indoor temperature.",
        how: "Built and iterated the EV3 robot with swappable mechanical attachments for each mission, programmed autonomous routines to navigate and execute them within the round's time limit, and in parallel researched and pitched the sustainability project to a jury — the season culminated in 1st place at the Lausanne regional and 7th place at the Swiss national final.",
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
      keyResults: [
        "Won 1st place at the FLL regional competition (Lausanne, Switzerland), earning Best Robot, Regional Champion, and Robot Game Winner awards",
        "Placed 7th at the FLL Switzerland national finals after a full season of robot and innovation-project development",
      ],
      scope: "Team project (10 members) · FIRST LEGO League Switzerland · 2019–2020",
    },
  },
  "le-duplo": {
    title: "Le Duplo",
    tagline: "A pocket paragliding variometer, packaged inside a 3D-printed Duplo brick.",
    descriptor: "Product Engineering & IoT · Personal",
    detail: {
      description: {
        why: "Paragliding pilots need to hear whether they're climbing or sinking without looking at a screen mid-flight — Tim built his own variometer to fly with, starting from a colleague's firmware and designing the physical hardware himself.",
        what: "A pocket-sized paragliding variometer packaged in a 3D-printed case shaped like an oversized Duplo brick, sensing climb or sink rate through a barometric pressure sensor and accelerometer and reporting it as a distinct beep tone through eight LEDs and a speaker.",
        how: "Designed his first custom PCB around an MS5611 barometric pressure sensor, an accelerometer, and an Arduino Nano, adapted a colleague's variometer firmware to drive the audio and LED feedback, then 3D-printed and hand-wired the Duplo-shaped enclosure with a LiPo battery and speaker.",
      },
      images: [
        { src: "/images/projects/le-duplo/01-pcb-board.jpeg", alt: "Custom PCB next to the 3D-printed Duplo-shaped enclosure", caption: "The Duplo variometer's PCB, built around an MS5611 pressure sensor, buzzer, and status LEDs", section: "how" },
        { src: "/images/projects/le-duplo/02-open-case.jpeg", alt: "Open Duplo-shaped enclosure showing the PCB, speaker, and LiPo battery fitted inside", caption: "The assembled internals: PCB, speaker, and LiPo battery packed into the Duplo-shaped case", section: "how" },
        { src: "/images/projects/le-duplo/03-pcb-back.jpeg", alt: "Back of the PCB, silkscreened 'Le Duplo by TK' next to the 3D-printed enclosure", caption: "Tim's first custom PCB design, silkscreened with its own name", section: "why" },
      ],
      role: "Hardware & PCB Design Engineer",
      duration: "Spring 2021",
      scope: "Personal project · Spring 2021",
    },
  },
};
