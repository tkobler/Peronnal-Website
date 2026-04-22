import type { Translations } from "../index";

export const flightLog: Translations["flightLog"] = {
  stats: {
    totalHours: "Total Hours",
    landings: "Landings",
    picHours: "PIC Hours",
    aircraftTypes: "Aircraft Types",
    lastFlight: "Last Flight",
  },
  airports: {
    lsgg: "International traffic. Controlled airspace transit.",
    lfmu: "Coastal approach along the Mediterranean.",
    lirj: "Elba Island crossing. Stunning sea views.",
    lfli: "Home base.",
    lflp: "Stunning lake approach surrounded by mountains.",
    lflb: "Alpine valley operations near Lac du Bourget.",
    lfka: "Gateway to the high Alps.",
    lfly: "Urban approach near the city center.",
    lfms: "Gateway to the Cévennes mountains.",
    lftw: "Navigating near the Roman historical sites.",
    lfmv: "Windy approach challenging the Mistral.",
    lfma: "Scenic flight over Provence landscapes.",
    lfmq: "Famous approach next to the F1 Grand Prix track.",
    lftf: "Joint civil/military aerodrome operations.",
  },
};

export const flight: Translations["flight"] = {
  systemNormal: "SYSTEM NORMAL",
  heading: "FLIGHT LOG",
  pilot: "PILOT: CLÉMENT",
  licence: "LICENCE: PPL(A)",
  vfrOnly: "VFR ONLY",
  navDisplay: "NAV DISPLAY // REGIONAL",
  noGpsSignal: "NO GPS SIGNAL",
  flightStats: "FLIGHT STATISTICS // PFD",
  recentSorties: "RECENT SORTIES",
  tableDate: "Date",
  tableRoute: "Route",
  tableAircraft: "Aircraft",
  tableBlockTime: "Block Time",
  tableRemarks: "Remarks",
  radarName: "NAME",
  radarLastVisit: "LAST VISIT",
  radarAircraft: "AIRCRAFT",
  totalHours: "TOTAL HOURS",
  cyclesLdg: "CYCLES / LDG",
  recentFlights: [
    { remarks: "Mountain rating training" },
    { remarks: "Touch & Go practice" },
    { remarks: "Cross country nav" },
  ],
};
