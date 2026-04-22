export interface Airport {
  id: string;
  code: string; // ICAO (e.g., LFLI)
  name: string;
  coords: { x: number; y: number }; // Percentage position on your map image (0-100)
  description: string;
  dateVisited: string;
  aircraft: string; // e.g., "DR400", "C172"
  image?: string; // Optional thumbnail
}

export interface FlightStats {
  totalHours: number;
  landings: number;
  picHours: number; // Pilot In Command
  aircraftTypes: string[];
  lastFlight: string;
}

// Stats Board Data
export const flightStats: FlightStats = {
  totalHours: 92.5,
  landings: 148,
  picHours: 45,
  aircraftTypes: ["Robin DR400", "CTLS", "C172", "PA-28"],
  lastFlight: "2024-08-15"
};


// data/flightLog.ts

export const visitedAirports: Airport[] = [
  // --- ANCHOR POINTS (Calculated from your pixels) ---
  {
    id: "lsgg",
    code: "LSGG",
    name: "Geneva",
    coords: { x: 40.9, y: 15.3 }, // (785 / 1920, 165 / 1080)
    description: "International traffic. Controlled airspace transit.",
    dateVisited: "Oct 2023",
    aircraft: "C172"
  },
  {
    id: "lfmu",
    code: "LFMU",
    name: "Béziers",
    coords: { x: 14.0, y: 85.2 }, // (268, 920)
    description: "Coastal approach along the Mediterranean.",
    dateVisited: "Apr 2024",
    aircraft: "PA-28"
  },
  {
    id: "lirj",
    code: "LIRJ",
    name: "Marina di Campo",
    coords: { x: 79.9, y: 97.8 }, // (1534, 1056)
    description: "Elba Island crossing. Stunning sea views.",
    dateVisited: "Summer 2023",
    aircraft: "C172"
  },

  // --- SWITZERLAND & ALPS (Recalibrated relative to Geneva) ---
  {
    id: "lfli",
    code: "LFLI",
    name: "Annemasse",
    coords: { x: 42.5, y: 17.0 },
    description: "Home base.",
    dateVisited: "Routine",
    aircraft: "DR400"
  },
  {
    id: "lflp",
    code: "LFLP",
    name: "Annecy",
    coords: { x: 41.1, y: 23.6 }, // South of Geneva
    description: "Stunning lake approach surrounded by mountains.",
    dateVisited: "Aug 2024",
    aircraft: "DR400"
  },
  {
    id: "lflb",
    code: "LFLB",
    name: "Chambéry",
    coords: { x: 38.6, y: 30.2 }, // South of Annecy
    description: "Alpine valley operations near Lac du Bourget.",
    dateVisited: "Aug 2023",
    aircraft: "DR400"
  },
  {
    id: "lfka",
    code: "LFKA",
    name: "Albertville",
    coords: { x: 40.0, y: 32.0 }, // East of Chambéry
    description: "Gateway to the high Alps.",
    dateVisited: "Winter 2024",
    aircraft: "C172"
  },
  {
    id: "lfly",
    code: "LFLY",
    name: "Lyon Bron",
    coords: { x: 26.5, y: 38.0 }, // West of the Alps
    description: "Urban approach near the city center.",
    dateVisited: "Sep 2024",
    aircraft: "DR400"
  },

  // --- SOUTH OF FRANCE (Recalibrated relative to Beziers) ---
  {
    id: "lfms",
    code: "LFMS",
    name: "Alès",
    coords: { x: 21.0, y: 72.0 }, // North of Nimes
    description: "Gateway to the Cévennes mountains.",
    dateVisited: "June 2024",
    aircraft: "DR400"
  },
  {
    id: "lftw",
    code: "LFTW",
    name: "Nîmes Garons",
    coords: { x: 24.5, y: 78.0 }, // East of Beziers
    description: "Navigating near the Roman historical sites.",
    dateVisited: "July 2024",
    aircraft: "PA-28"
  },
  {
    id: "lfmv",
    code: "LFMV",
    name: "Avignon",
    coords: { x: 37.3, y: 73.2 }, // North-East of Nimes
    description: "Windy approach challenging the Mistral.",
    dateVisited: "July 2024",
    aircraft: "PA-28"
  },
  {
    id: "lfma",
    code: "LFMA",
    name: "Aix-en-Provence",
    coords: { x: 35.5, y: 81.0 }, // East towards Marseille
    description: "Scenic flight over Provence landscapes.",
    dateVisited: "May 2024",
    aircraft: "DR400"
  },
  {
    id: "lfmq",
    code: "LFMQ",
    name: "Le Castellet",
    coords: { x: 39.0, y: 87.0 }, // South-East, near coast
    description: "Famous approach next to the F1 Grand Prix track.",
    dateVisited: "May 2024",
    aircraft: "DR400"
  },
  {
    id: "lftf",
    code: "LFTF",
    name: "Cuers",
    coords: { x: 41.5, y: 86.0 }, // East of Castellet
    description: "Joint civil/military aerodrome operations.",
    dateVisited: "May 2024",
    aircraft: "DR400"
  }
];
export const recentFlights = [
  { date: "2025-08-15", from: "LFLI", to: "LFLY", aircraft: "DR400", duration: "1:45", remarks: "Mountain training" },
  { date: "2025-07-20", from: "LFLI", to: "LFLI", aircraft: "DR400", duration: "0:55", remarks: "Touch & Go practice" },
  { date: "2025-06-05", from: "LFLI", to: "LSGG", aircraft: "DR400", duration: "1:20", remarks: "Cross country nav" },
];