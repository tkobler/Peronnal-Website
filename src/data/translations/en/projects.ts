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
  learnMoreLabel: "Learn more →",
  filterAll: "All",
  domains: {
    "Embedded Systems & Electronics": { name: "Embedded Systems & Electronics", desc: "Custom PCBs, Firmware & Connected Hardware" },
    "Robotics & Autonomous Control": { name: "Robotics & Autonomous Control", desc: "Control Architectures, Navigation & Autonomy" },
    "Biomedical & Precision Instrumentation": { name: "Biomedical & Precision Instrumentation", desc: "Force Sensing & Flexure-Based Measurement" },
    "Mechanism Design & Fabrication": { name: "Mechanism Design & Fabrication", desc: "Mechanism Design, CAD & Hands-On Fabrication" },
  },
};

export const projectsContent: Translations["projectsContent"] = {
  "solar-boat-control-logic": {
    title: "Swiss Solar Boat - Software Logic",
    tagline: "Safety-first Global Control Logic for a hydrogen-powered foiling boat",
    descriptor: "Robotics & Autonomous Control · Academic",
    detail: {
      description: {
        why: "SSB's new hydrogen-powered foiling boat, the Lobst'air, needed one global control logic to unify all its subsystems into a safety-first system ready for on-water testing.",
        what: "A hierarchical, safety-first finite state machine that governs every subsystem of the Lobst'air, running in real time on the boat's onboard computer.",
        how: "Built a modular MATLAB Simulink/Stateflow architecture, compiled to C++ and deployed on a Speedgoat target computer.",
      },
      role: "Overall Software Architecture Engineer and Coordinator",
      duration: "Spring 2026",
      scope: "Semester project · Swiss Solar Boat · Spring 2026",
    },
  },
  "cochlear-implant-insertion-mechanism": {
    title: "Cochlear Implant Insertion Mechanism",
    tagline: "Force-sensing insertion mechanism for cochlear implant surgery",
    descriptor: "Biomedical & Precision Instrumentation · Professional",
    detail: {
      description: {
        why: "Cochlear implant insertion is done by feel, with no objective measurement of the force applied to the fragile scala tympani — the lab's prototype for studying this needed a simpler, more reliable redesign.",
        what: "A redesigned, force-instrumented insertion mechanism for cochlear implant electrodes, SLA 3D-printed and flexure-guided.",
        how: "Iterated SLA-printed prototypes of the force-sensing parallel-blade table, characterized the load cell, then wrote ESP32 firmware for foot-pedal-controlled insertion and validated it on 3D-printed cochlea and skull models.",
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
    tagline: "Plug-and-play actuator for rapid prototyping",
    descriptor: "Embedded Systems & Electronics · Personal",
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
      role: "Product Engineer",
      duration: "2024 – 2026",
      scope: "Personal project (with Alec Horth) → startup exploration, EPFL Technology Ventures I (MGT-434) · 2024–2026",
    },
  },
  "la-raclonette": {
    title: "La Raclonette",
    tagline: "Turning a campfire into a raclette station.",
    descriptor: "Mechanism Design & Fabrication · Personal",
    detail: {
      description: {
        why: "Grilling sausages over a wood fire got repetitive — we wanted to melt real raclette straight over the embers instead.",
        what: "A small raclette pan on a screw-in handle that clips onto a stick, sold as a self-produced student micro-business.",
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
    descriptor: "Embedded Systems & Electronics · Academic",
    detail: {
      description: {
        why: "Students need to put theory into practice — CanSat was our chance to learn embedded electronics and project management hands-on.",
        what: "Building El Tonio, a soda-can-sized satellite that had to survive a rocket launch to ~500 m and return usable science, over a full academic year.",
        how: "Went from a preliminary design review through a custom PCB (dual BME688/BME280 sensors, BNO055 IMU, LoRa telemetry to a ground station) built around a Raspberry Pi Zero, cut and sewed the Rogallo parachute in-house, validated it with ground throws and drone drop tests, then flew it on two rocket launches.",
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
    descriptor: "Embedded Systems & Electronics · Academic",
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
    descriptor: "Robotics & Autonomous Control · Academic",
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
    descriptor: "Embedded Systems & Electronics · Personal",
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
  "mpc-rocket-landing-controller": {
    title: "MPC Rocket Landing Controller",
    tagline: "Model Predictive Control that lands a thrust-vectored rocket prototype vertically, SpaceX-style.",
    descriptor: "Robotics & Autonomous Control · Academic",
    detail: {
      description: {
        why: "The course's earlier exercises taught how to identify and implement an MPC controller — this project was the direct continuation, tasking three-person teams with designing the full MPC stack needed to land a small thrust-vectored rocket prototype (propellers standing in for a combustion engine) the way SpaceX lands the Falcon booster.",
        what: "A complete set of MPC controllers — nominal, offset-free, robust tube, and nonlinear — that fly a 12-state rocket model from an initial descent down to a stationary vertical landing on a simulated \"chopsticks\" platform, built and validated for the EPFL ME-425 Model Predictive Control course with Noé Syfrig and Marwane Mroueh.",
        how: "Linearized and decoupled the nonlinear rocket dynamics into four independent subsystems (x, y, z, roll), designed constrained LQR-terminal MPC controllers for stabilization and velocity/position tracking, added a disturbance observer for offset-free tracking as fuel burns off mass, then built a robust tube-MPC controller for the final landing approach and a CasADi-based nonlinear MPC to compare against it — all verified in closed-loop simulation on the nonlinear model.",
      },
      role: "Student",
      duration: "Fall 2025",
      scope: "Team project (3 members, with Noé Syfrig and Marwane Mroueh) · EPFL ME-425 Model Predictive Control · Fall 2025",
    },
  },
  "dynabal-nanoforce-sensor": {
    title: "DYNABAL - Balanced Dynamometer",
    tagline: "A flexure-guided force sensor built to resolve sub-10-nanonewton forces through a balanced, stiffness-compensated compliant mechanism.",
    descriptor: "Biomedical & Precision Instrumentation · Academic",
    detail: {
      description: {
        why: "EPFL's Mechanism Design II course tasked five-person teams with building a miniaturized, flexure-only force sensor able to resolve forces down to 500 nN while staying insensitive to acceleration — Tim and four teammates built DYNABAL to clear that bar with room to spare.",
        what: "A compliant force sensor whose flexure-guided proof body is preloaded by a five-blade parallel-spring stage to tune its own stiffness toward zero, read out capacitively, and mechanically balanced — statically, in force, and in moment — against gravity and acceleration.",
        how: "Modeled the proof body's stiffness and energy analytically across crossed-blade pivots and two lead-screw-driven stages (stiffness tuning, zero adjustment), then verified static/force/moment balance by hand-sizing four counterweight masses.",
      },
      images: [
        { src: "/images/projects/dynabal-nanoforce-sensor/01-kinematic-architecture.png", alt: "Labeled kinematic diagram of the DYNABAL mechanism, showing masses M1–M4, the probe P, and the zero-adjustment actuator Z", caption: "Kinematic architecture: four balanced masses (M1–M4) keep the mechanism insensitive to gravity and acceleration", section: "how" },
        { src: "/images/projects/dynabal-nanoforce-sensor/02-construction-drawing.png", alt: "Detailed construction drawing of the DYNABAL sensor sub-assembly with numbered part callouts", caption: "Construction drawing of the preload and anti-rotation sub-assembly", section: "how" },
      ],
      role: "Student",
      duration: "Spring 2023",
      keyResults: [
        "Reached a computed force resolution of 9.45 nN (50× finer than the 500 nN brief) with a max force of 2.58 N and a 272×10⁶ virtual dynamic range.",
        "Verified full SFM balance (static, force, moment) across all four moving masses, and sized the preload drive to deliver 217 N from a 78 mNm motor — 5× the torque actually needed.",
      ],
      scope: "Team project (5 members, with Léo Bosch, Sven Profichet, Vincent Bouzereau, Clémence Rey) · EPFL Mechanism Design II (MICRO-201) · Spring 2023",
    },
  },
  "thymio-autonomous-navigation": {
    title: "Autonomous Navigation for a Thymio Robot",
    tagline: "A camera-guided planner, Kalman filter, and reactive obstacle avoidance for a Thymio robot.",
    descriptor: "Robotics & Autonomous Control · Academic",
    detail: {
      description: {
        why: "For EPFL's Basics of Mobile Robotics, a team of four (with Jules Villaret, Amir Lahlou, and Ana Schwabedal) built a complete autonomous navigation stack for the Thymio robot, taught by Prof. Francesco Mondada in fall 2025.",
        what: "An autonomous navigation system letting a Thymio robot reach any goal on a marked arena, combining a camera-based visibility-graph planner, an Extended Kalman Filter for pose estimation, and reactive local obstacle avoidance.",
        how: "Built in Python with OpenCV/ArUco localization, a Dijkstra visibility-graph planner, and a 5-state EKF fusing camera pose with wheel odometry — Tim's part was the filtering module, tuning the EKF's noise from calibration runs and handling fallback to odometry when the camera lost the robot.",
      },
      role: "Filtering & State Estimation Engineer",
      duration: "Fall 2025",
      scope: "Team project (4 members, with Jules Villaret, Amir Lahlou, Ana Schwabedal) · MICRO-452 Basics of Mobile Robotics, EPFL · Fall 2025",
    },
  },
  "l-epluche-carotte": {
    title: "L'Épluche-Carotte",
    tagline: "A hand-cranked mechanism that peels a carrot's full length in one motion, engineered from a blank cahier des charges.",
    descriptor: "Mechanism Design & Fabrication · Academic",
    detail: {
      description: {
        why: "EPFL's Construction Mécanique II project (Microtechnique BA2) tasked four-person teams with designing, from a fixed cahier des charges, a fully hand-powered carrot peeler ready for production — Tim's first mechanical construction project at EPFL, built with Vincent Bouzereau, Rim El Qabli, and Ranjeet Sapkota.",
        what: "A hand-cranked carrot peeler where a rail-mounted blade carriage strips the carrot on the return stroke of a crank-rocker mechanism, while a partial gear indexes the carrot's rotation on the forward stroke so five crank turns cover its full length and circumference.",
        how: "Scored four mechanism concepts (ring-drive, pen-click/Geneva, pendulum, and the chosen crank-rocker \"locomotive\") against a weighted criteria matrix, then modeled the kinematics, power/efficiency and gear-mesh calculations, and produced full 2D/3D technical drawings with ISO 2768-mk tolerancing for 3-axis-machined stainless steel, aluminum, and glass-fiber-nylon parts.",
      },
      challenges: [
        "Separating the carrot's rotation from the blade's translation to avoid a helical peeling motion, after early concepts (a rotating ring, a pen-click/Geneva mechanism) proved too bulky or unsafe.",
        "Housing the partial-gear indexing drive out of reach of the user while keeping the whole mechanism foldable and compact enough for a kitchen counter.",
      ],
      role: "Student",
      duration: "Spring 2022",
      keyResults: [
        "Reached 95.5% mechanical efficiency on the translation phase and 92% on the rotation phase, both above the 90% target",
        "Kept total mass to 5.25 kg against an 8 kg budget, and required under 30 W of hand-crank effort over 5 seconds",
        "Folded down to about half its deployed height and 15 cm shorter for storage",
        "Graded 5.75/6",
      ],
      scope: "Team project (4 members, with Vincent Bouzereau, Rim El Qabli, Ranjeet Sapkota) · EPFL Construction Mécanique II (ME-102/107) · Spring 2022",
    },
  },
  "timit-connected-door-lock": {
    title: "TimiT Connected Door Lock",
    tagline: "A WiFi-controlled door lock, built from scratch as a Swiss high-school engineering thesis.",
    descriptor: "Embedded Systems & Electronics · Academic",
    detail: {
      description: {
        why: "The door to Tim's bedroom had no key, and any fix had to leave the glass door itself untouched — his Travail de Maturité (Swiss high-school thesis project) set out to lock and unlock it wirelessly instead, his first real engineering project.",
        what: "A WiFi-connected door lock: a high-torque DC motor and 3D-printed housing clamp onto the existing latch, driven by an ESP8266 microcontroller and controlled from a smartphone app, with limit switches reporting whether the door is locked or open.",
        how: "Measured the latch's real torque need, drove a geared DC motor through a DRV8871 H-bridge with a voltage-spike filter, wrote the ESP8266 firmware (WiFi, motor control, Blynk app, limit-switch logic) in the Arduino IDE, and designed and 3D-printed the clamp-on housing in Fusion 360 over nine months.",
      },
      challenges: [
        "The first H-bridge chip (SN754410) could only supply 1 A and sagged the motor's 5 V supply to 3 V under load — swapped to a DRV8871 driver rated to 3.6 A to get full torque.",
        "Motor switching created voltage spikes that risked resetting the microcontroller — diagnosed the noise on an oscilloscope and added an LC filter to clean the supply.",
        "3D-printed housing parts warped off the print bed on the first attempt — recalibrated the printer to get flat, accurately fitting parts.",
      ],
      images: [
        { src: "/images/projects/timit-connected-door-lock/01-electronics-assembly.jpg", alt: "Open 3D-printed housing showing the DC gear motor, DRV8871 driver, and limit switches wired inside", caption: "The lock's electronics, wired inside the printed housing", section: "how" },
      ],
      role: "Solo Design & Firmware Engineer",
      duration: "2020 – 2021",
      keyResults: ["Delivered a working WiFi-to-latch lock system within a self-imposed ~100 CHF prototyping budget (50 CHF target for the finished unit)"],
      scope: "Personal project (Travail de Maturité) · Gymnase de Morges · 2020–2021",
    },
  },
};
