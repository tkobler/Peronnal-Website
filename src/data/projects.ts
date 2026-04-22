export type ProjectDomain =
  | "Microelectronics & Photonics"
  | "Product Engineering & IoT"
  | "Robotics & AI"
  | "Industrial Design & Mechanical";

export interface Schematic {
  paths: [number, number, number, number][];
  pads: [number, number][];
  /** Animation mode: "reveal" = expanding wave reveal, "pulse" = traveling ECG-like signal pulse. */
  mode?: "reveal" | "pulse";
  /** Filled regions — arrays of [x, y] vertices (% of viewport) forming closed polygons. */
  regions?: [number, number][][];
  /** Image-based bitmap mask. Binary string of 0/1 chars, row-major.
   *  Position and size in viewport %. Dark pixels = visible dots during reveal. */
  bitmap?: {
    data: string;       // "001110..." binary string, length = cols * rows
    cols: number;       // bitmap width in cells
    rows: number;       // bitmap height in cells
    x: number;          // left edge in viewport %
    y: number;          // top edge in viewport %
    w: number;          // width in viewport %
    h: number;          // height in viewport %
  };
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  descriptor: string;
  featured: boolean;
  domain: ProjectDomain; // Added this field
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
  };
}

// Example of assigning domains to your existing projects:
// Durandal -> "Product Engineering & IoT"
// HYLAB -> "Microelectronics & Photonics"
// Drone -> "Robotics & AI"
// Uveya -> "Industrial Design & Mechanical"

const projects: Project[] = [
  // --- FEATURED PROJECTS ---
  {
    id: "durandal",
    number: "01",
    title: "Durandal Fencing System",
    tagline: "Wireless wearable fencing referee",
    descriptor: "Product Engineering & IoT \u00b7 Entrepreneurial",
    domain: "Product Engineering & IoT",
    featured: true,
    course: "MICRO-301",
    heroImage: "/images/projects/durandal.jpeg",
    detail: {
      description: {
        why: "Traditional fencing gear is expensive and immobile. Durandal democratizes the sport by allowing practice anywhere without reels or cables.",
        what: "A hip-worn wireless device that detects valid touches via electrical signal analysis (DSP), identifying the 500g minimum force threshold required by FIE regulations, and communicates with a master hub/web dashboard.",
        how: "Engineered a low-latency (<10ms) hub-and-spoke architecture over ESP-NOW. Developed signal processing algorithms (FFT/FIR) to distinguish valid hits."
      },
      role: "Product Engineer & Team Leader",
      duration: "2024 - 2025",
      technologies: ["ESP-NOW", "ESP32-C3", "FreeRTOS", "KiCad", "Node.js", "WebSocket"],
      keyResults: [
        "<10ms end-to-end wireless latency via ESP-NOW protocol",
        "500g FIE-compliant force threshold detection using FFT/FIR signal processing",
        "Successful hit/miss classification on foil targets at competition-representative speeds",
      ],
      scope: "Entrepreneurial project · 2024–2025",
    }
  },
  {
    id: "hylab-modulators",
    number: "02",
    title: "Sub-THz Wireless Modulators",
    tagline: "Comparative study of TFLN vs TFLT",
    descriptor: "Microelectronics & Photonics \u00b7 Research",
    domain: "Microelectronics & Photonics",
    featured: true,
    heroImage: "/images/projects/hylab.jpg",
    detail: {
      description: {
        why: "Sub-THz spectrum (100-300GHz) is critical for 6G, but efficient signal transduction is a bottleneck, challenging the assumption that lithium niobate is the sole viable platform.",
        what: "Characterized 40 antenna-coupled modulators across a 4x5 geometric matrix. TFLN achieves peak beta=0.177 rad at 100 GHz, outperforming TFLT in 87% of geometric configurations tested; at 300 GHz, the TFLN-TFLT performance gap deviates from low-frequency scaling trends, with TFLN advantage reaching 6.6 dB.",
        how: "Automated the characterization bench using Python with a custom adaptive peak detection algorithm extracting sidebands to -70 dB noise floor. 80% measurement time reduction via Python automation."
      },
      role: "Research Assistant",
      duration: "Fall 2025",
      technologies: ["Anritsu OSA", "Python", "TFLN", "TFLT", "VDI RF Multipliers"],
      keyResults: [
        "TFLN peak modulation index β=0.177 rad at 100 GHz, outperforming TFLT in 87% of comparisons",
        "At 300 GHz, TFLN advantage grows to 6.6 dB — performance gap deviates from low-frequency scaling trends",
        "TFLT fabrication yield 95% vs 75% for TFLN; RF losses 17–75% lower",
        "80% measurement time reduction via custom Python automation suite",
      ],
      scope: "Semester project · HYLAB, Prof. I.-C. Benea-Chelmus · Fall 2025",
    }
  },
  {
    id: "guardian-angel",
    number: "03",
    title: "The Guardian Angel",
    tagline: "Privacy-preserving fall detection",
    descriptor: "Product Engineering & IoT \u00b7 Academic",
    domain: "Product Engineering & IoT",
    featured: true,
    course: "MICRO-406",
    heroImage: "/images/projects/guardian-angel.png",
    detail: {
      description: {
        why: "Elderly users often forget wearables. This 'set and forget' system respects privacy (no cameras) while providing health trends to caregivers.",
        what: "A 3-part ecosystem with screen-free LED feedback: 'The Eye' (C1001 mmWave radar for fall detection), 'The Hand' (MLX90614 temperature + MAX30102 PPG for HR/SpO2), and 'The Bridge' (web dashboard). Target: >=95% fall detection accuracy with <=5% false positive rate.",
        how: "Hybrid database architecture (RTDB for real-time vitals, Firestore for historical data), RBAC with patient consent handshake, and serverless Firebase backend."
      },
      role: "Systems Engineer",
      duration: "Fall 2025",
      technologies: ["mmWave Radar", "ESP32", "Firebase", "FreeRTOS", "Fusion 360", "React"],
      keyResults: [
        "3-part ecosystem: ceiling radar (fall detection), tabletop vital sensor (HR/SpO2), web dashboard",
        "System designed for ≥95% fall detection accuracy with ≤5% false positive rate; validation pending",
        "Privacy-first RBAC with patient consent handshake — no cameras",
        "Hybrid database: RTDB for real-time vitals, Firestore for historical data",
      ],
      scope: "Team of 5 · 3 months · 10 ECTS · Prof. Y. Bellouard & Prof. E. Charbon",
    }
  },
  

  {
    id: "ground-segment",
    number: "04",
    title: "UHF Ground Segment",
    tagline: "Automated CubeSat Tx/Rx ground station",
    descriptor: "Microelectronics & Photonics \u00b7 Academic",
    domain: "Microelectronics & Photonics",
    featured: true,
    course: "MICRO-499",
    heroImage: "/images/projects/ground-segment.jpg",
    detail: {
      description: {
        why: "The EPFL Spacecraft Team needed to upgrade its experimental UHF downlink into a fully operational, automated ground station capable of two-way communication with CubeSats in LEO.",
        what: "Designing a Tx/Rx ground segment integrating RF hardware (PA, LNA, switches), GNU Radio transmission pipelines, and API-driven mission control software for automated closed-loop communication.",
        how: "Evaluating antenna configurations and RF chain trade-offs, developing GNU Radio scripts for modulation and telecommand framing, and integrating the uplink chain into the ground segment software via REST API endpoints."
      },
      role: "RF Systems Engineer",
      duration: "Spring 2026",
      technologies: ["GNU Radio", "Python", "UHF", "SDR", "RF Hardware", "REST API"],
      keyResults: [
        "Target: automated Tx/Rx pipeline for CubeSat communication in LEO",
        "Developing GNU Radio scripts for modulation and telecommand framing",
        "Integrating REST API endpoints for mission control integration",
      ],
      scope: "Semester project · MICRO-499, EPFL Spacecraft Team · Spring 2026",
    }
  },
    {
    id: "manufacturing-optimization",
    number: "05",
    title: "Manufacturing Optimization",
    tagline: "Workshop restructuration for medical devices",
    descriptor: "Supply Chain & Operations \u00b7 Professional",
    domain: "Industrial Design & Mechanical",
    featured: true,
    heroImage: "/images/home/sterilux4.png",
    detail: {
      description: {
        why: "A growing medical-device startup needed to scale production capacity while maintaining strict quality standards and reducing lead times.",
        what: "Complete operational restructuring: workshop reorganization into sequential assembly stations, batch size optimization, and ERP-based inventory tracking to eliminate supply stalls.",
        how: "Reorganized the workshop into a station-by-station layout matching the assembly process, designed custom QC test bench furniture, diagnosed bottlenecks causing 1–5 supply stalls per month, and restructured into smaller synchronized batches.",
      },
      role: "Operations Consultant",
      duration: "2024 – 2025",
      technologies: ["Odoo ERP", "Process Optimization", "QC Testing", "Workshop Layout", "Batch Scheduling"],
      keyResults: [
        "Sequential station-by-station workshop layout matching assembly process",
        "Supply stalls reduced from 1–5 per month to near zero through batch restructuring",
        "Custom QC test bench furniture and airtightness/ozone calibration stations built",
      ],
      scope: "Professional · Stérilux · 2024–2025",
    },
  },
    {
    id: "sdr-receiver",
    number: "06",
    title: "915MHz SDR Receiver",
    tagline: "Continuous-Time Sigma-Delta design",
    descriptor: "Microelectronics & Photonics \u00b7 Academic",
    domain: "Microelectronics & Photonics",
    featured: true,
    course: "EE-426",
    heroImage: "/images/projects/RF.jpeg",
    detail: {
      description: {
        why: "Designed to implement a modern Software-Defined-Radio digitizing signals close to the antenna using a 1-bit ADC approach.",
        what: "A complete RX chain including an Inductively Degenerated Cascode LNA (45.9 dB gain, 1.2 dB NF at schematic level), passive mixer, and Sigma-Delta modulator loop. OOK and QPSK demodulation demonstrated in simulation.",
        how: "Implemented in 65nm CMOS using Cadence Virtuoso with cross-coupled OTA integrator, 1-bit Verilog-A quantizer/DAC, and I/Q dual-path architecture with 300 MHz sampling. Validated via PSS and Noise simulations."
      },
      role: "RF IC Designer",
      duration: "Fall 2025",
      technologies: ["65nm CMOS", "Cadence Virtuoso", "Spectre RF", "Verilog-A"],
      keyResults: [
        "LNA: 45.9 dB gain, 1.2 dB NF, 1.8 mW power (schematic-level, pre-layout)",
        "OOK and QPSK demodulation demonstrated in simulation via I/Q dual-path architecture",
        "1-bit CT-ΣΔ modulator with 300 MHz sampling frequency",
        "Simulation suite: AC, DC, Transient, S-parameter, PSS, Noise simulations",
      ],
      scope: "Course project · EE-426, Prof. C. Enz · Fall 2025",
    }
  },
  {
    id: "aerial-robotics",
    number: "07",
    title: "Aerial Robotics Drone",
    tagline: "Autonomous flight stack & racing",
    descriptor: "Robotics & AI \u00b7 Academic",
    domain: "Robotics & AI",
    featured: true,
    course: "MICRO-502",
    heroImage: "/images/projects/drone.jpg",
    detail: {
      description: {
        why: "Bridging the 'sim-to-real gap' by deploying vision and control algorithms on a physical quadcopter with limited compute constraints.",
        what: "A modular flight stack handling state estimation, visual gate detection, trajectory planning, and control. Achieved 13.87s best lap time (8.7x faster than baseline).",
        how: "Minimum-jerk trajectory planner with leading/trailing waypoints, Lighthouse positioning system, and a two-run strategy (safe reconnaissance then performance laps). Ported to Crazyflie 2.X hardware."
      },
      role: "Robotics Engineer",
      duration: "Spring 2025",
      technologies: ["CVXPY", "Crazyflie", "OpenCV", "Python", "Webots"],
      keyResults: [
        "Best lap time: 13.87s (8.7× faster than baseline simple planner)",
        "Minimum-jerk trajectory planner with leading/trailing waypoints for robustness",
        "Two-run strategy: safe reconnaissance lap, then performance laps",
        "Computer vision gate detection via Canny edge + contour analysis",
      ],
      scope: "Team of 5 · MICRO-502, Prof. D. Floreano · Spring 2025",
    }
  },
  {
    id: "photonic-chip",
    number: "08",
    title: "Integrated Photonic Chip",
    tagline: "SOI waveguide & resonator fabrication",
    descriptor: "Microelectronics & Photonics \u00b7 Academic",
    domain: "Microelectronics & Photonics",
    featured: true,
    course: "MICRO-373",
    heroImage: "/images/projects/photonic_chip.jpg",
    detail: {
      description: {
        why: "Exploration of the practical limitations of micro-fabrication (lithography/etching) compared to theoretical designs.",
        what: "Fabricated a chip with strip/slot waveguides, MZIs, and Ring Resonators using silicon-on-insulator technology. Ring resonator Q-factors up to ~20,500 (Lorentzian fit) with thermo-optic MZI modulation at 1550 nm telecom wavelength.",
        how: "Executed full cleanroom cycle: E-beam lithography, Cryogenic Silicon Dry Etching, and Metal Deposition for heaters. SEM/AFM metrology and Lorentzian curve fitting for Q-factor extraction."
      },
      role: "Fabrication Engineer",
      duration: "Spring 2024",
      technologies: ["AFM", "Raith EBPG5000", "KLayout", "SEM", "Cryo-Etching"],
      keyResults: [
        "Ring resonator Q-factors up to ~20,500 (Lorentzian fit) with near-critical coupling",
        "Thermo-optic MZI modulation demonstrated at 1550 nm telecom wavelength",
        "Full cleanroom cycle: E-beam lithography, cryo-etching, metal deposition",
        "SEM/AFM metrology with Lorentzian curve fitting for Q-factor extraction",
      ],
      scope: "Lab project · MICRO-373, Prof. I.-C. Benea-Chelmus · Spring 2024",
    }
  },

  // --- NON-FEATURED PROJECTS (FULL PORTFOLIO) ---
  // {
  //   id: "strong-arm", 
  //   number: "07",
  //   title: "Strong-Arm Comparator",
  //   tagline: "High-speed latched comparator for ADCs",
  //   descriptor: "Microelectronics & Photonics \u00b7 Academic",
  //   domain: "Microelectronics & Photonics",
  //   featured: true,
  //   heroImage: "/images/projects/comparator.jpg",
  //   detail: {
  //     description: {
  //       why: "Precision comparators are critical components for high-performance ADCs, requiring a strict balance between switching speed and thermal noise.",
  //       what: "A dynamic Strong-Arm latch comparator designed at the transistor level to achieve sub-nanosecond delay with minimal power consumption.",
  //       how: "Utilized Cadence Virtuoso to size transistors for optimal speed/noise trade-offs. Performed Monte Carlo and Corner analysis to ensure robust operation."
  //     },
  //     role: "Analog IC Designer",
  //     duration: "Spring 2025",
  //     technologies: ["Cadence Virtuoso", "Monte Carlo", "Spectre"]
  //   }
  // },
  {
    id: "rough-terrain",
    number: "09",
    title: "Rough Terrain Locomotion",
    tagline: "Co-evolution of robot morphology and control",
    descriptor: "Robotics & AI \u00b7 Academic",
    domain: "Robotics & AI",
    featured: true,
    course: "MICRO-515",
    heroImage: "/images/projects/ant.png",
    detail: {
      description: {
        why: "Investigated how terrain topology influences the optimal body shape of a robot, exploring the deep coupling between 'body' and 'brain'.",
        what: "An evolutionary simulation co-optimizing limb lengths and neural network weights of a quadruped. On flat terrain, robots evolve longer forelimbs; on rough terrain, they develop crouched rear-weighted 'grappling hook' gaits.",
        how: "30 individuals evolved over 100 generations using NSGA-II; genotype encodes both MLP weights and limb segment lengths. Simulated physics in MuJoCo (Ant-v5) to analyze Pareto fronts."
      },
      role: "Course Researcher",
      duration: "Spring 2025",
      technologies: ["MuJoCo", "NSGA-II", "Python", "Evolutionary Algorithms"],
      keyResults: [
        "Flat terrain: robots evolve longer forelimbs for efficient propulsion",
        "Rough terrain: crouched rear-weighted 'grappling hook' gaits emerge",
        "30 individuals evolved over 100 generations with NSGA-II",
        "Genotype encodes both MLP neural network weights and limb segment lengths",
      ],
      scope: "Course project · MICRO-515, Prof. D. Floreano · Spring 2025",
    }
  },
  {
    id: "dynabal",
    number: "10",
    title: "Dynabal Force Sensor",
    tagline: "High-precision dynamometric balance",
    descriptor: "Industrial Design & Mechanical \u00b7 Academic",
    featured: true,
    course: "MICRO-201",
    heroImage: "/images/projects/dynabal.jpg",
    domain: "Industrial Design & Mechanical",
    detail: {
      description: {
        why: "To replace traditional friction-based joints with frictionless flexible elements, enabling higher precision and linearity in instrumentation.",
        what: "A 1-DOF force sensor with a theoretical force resolution of 1.7 nN, a virtual dynamic range of 403 million, and adjustable stiffness from 0.17 to 808 N/m.",
        how: "Watt mechanism for rectilinear motion, motor-driven stiffness compensation near bistable regime, wire EDM fabrication (0.05 mm precision), and capacitive sensor (10 nm resolution). Modeled using Euler-Bernoulli beam theory and validated in MATLAB."
      },
      role: "Mechanical Engineer",
      duration: "Spring 2023",
      technologies: ["Fusion 360", "MATLAB", "Flexible Mechanisms"],
      keyResults: [
        "1.7 nN theoretical force resolution with virtual dynamic range of 403 million",
        "Adjustable stiffness from 0.17 to 808 N/m via motor-driven compensation",
        "Watt mechanism for rectilinear motion, wire EDM fabrication (0.05 mm precision)",
        "Micro-Epsilon capacitive position sensor with 10 nm resolution",
      ],
      scope: "Course project · MICRO-201 · Spring 2023",
    }
  },
  {
    id: "carrot-peeler",
    number: "11",
    title: "Automatic Carrot Peeler",
    tagline: "Capstone mechanical construction",
    descriptor: "Industrial Design & Mechanical \u00b7 Academic",
    domain: "Industrial Design & Mechanical",
    featured: true,
    course: "ME-106/107",
    heroImage: "/images/projects/epluche-carottes.png",
    detail: {
      description: {
        why: "First-year capstone project focused on mastering mechanical construction, complex dimensioning, and technical manufacturing drawings.",
        what: "A hand-cranked mechanical device featuring a lever mechanism that synchronizes carrot rotation with blade translation.",
        how: "Modeled all components and assemblies in CATIA V5. Performed static analysis on lever linkages and shafts to ensure structural integrity under load."
      },
      role: "Mechanical Designer",
      duration: "Spring 2022",
      technologies: ["CATIA V5", "Static Analysis", "DFM"],
      keyResults: [
        "Lever mechanism with spring-loaded blades adapting to 20–45 mm carrot diameters",
        "Kinematic analysis with jamming risk assessment and efficiency calculations",
        "All parts designed for 3-axis CNC machining",
      ],
      scope: "Team of 4 · ME-106/107 · Spring 2022",
    }
  },
  {
    id: "uveya",
    number: "12",
    title: "Uveya UV Sanitizer",
    tagline: "Handheld UV-C sanitizer for aircraft",
    descriptor: "Industrial Design & Mechanical \u00b7 Freelance",
    featured: true,
    domain: "Industrial Design & Mechanical",
    heroImage: "/images/projects/uv_sanitizer_view2.png",
    detail: {
      description: {
        why: "The airline industry required rapid, chemical-free sanitization for tight cockpit spaces during the COVID-19 pandemic.",
        what: "A handheld UV-C sanitizer housing a UV-LED array with a quick-release battery system designed for rapid swaps between cabin sections.",
        how: "Co-designed a quick-release battery holder in CATIA V5 with ergonomic grip geometry and snap-fit assembly for tool-free maintenance."
      },
      role: "Freelance Designer",
      duration: "Fall 2021",
      technologies: ["CATIA V5", "3D Printing", "Prototyping"],
      keyResults: [
        "3D-printable prototype casing enabling rapid iteration on fit and ergonomics.",
      ],
      scope: "Freelance · Uveya · Fall 2021",
    }
  },
  {
    id: "foosball",
    number: "13",
    title: "Automated Foosball Scorer",
    tagline: "Laser-barrier goal detection system",
    descriptor: "Embedded Systems \u00b7 Personal",
    featured: true,
    domain: "Product Engineering & IoT",
    heroImage: "/images/projects/babyfoot.jpeg",
    detail: {
      description: {
        why: "To eliminate manual scorekeeping disputes and automatically enforce complex French Federation rules like 'Gamelles' or 'Pissettes'. Built as a father-son project during the COVID-19 lockdowns.",
        what: "An add-on kit for foosball tables that detects goals via break-beam lasers and displays real-time scores on multiplexed LED displays.",
        how: "Implemented a complex finite state machine in C++ for the game rules. Used 74HC595 shift registers to control 16+ LEDs with limited GPIO pins."
      },
      role: "Embedded Developer",
      duration: "Spring 2020",
      technologies: ["Arduino C++", "Laser Sensors", "Shift Registers", "Fritzing"],
      keyResults: [
        "Finite state machine enforcing French Federation rules (Gamelles, Pissettes)",
        "Break-beam laser goal detection with multiplexed LED score display",
        "74HC595 shift registers controlling 16+ LEDs with limited GPIO pins",
      ],
      scope: "Personal project · Spring 2020",
    }
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