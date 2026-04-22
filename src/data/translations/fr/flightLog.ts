import type { Translations } from "../index";

export const flight: Translations["flight"] = {
  systemNormal: "SYSTÈME NORMAL",
  heading: "CARNET DE VOL",
  pilot: "PILOTE : CLÉMENT",
  licence: "LICENCE : PPL(A)",
  vfrOnly: "VFR UNIQUEMENT",
  navDisplay: "AFFICHAGE NAV // RÉGIONAL",
  noGpsSignal: "PAS DE SIGNAL GPS",
  flightStats: "STATISTIQUES DE VOL // PFD",
  recentSorties: "SORTIES RÉCENTES",
  tableDate: "Date",
  tableRoute: "Route",
  tableAircraft: "Aéronef",
  tableBlockTime: "Temps bloc",
  tableRemarks: "Remarques",
  radarName: "NOM",
  radarLastVisit: "DERNIÈRE VISITE",
  radarAircraft: "AÉRONEF",
  totalHours: "HEURES TOTALES",
  cyclesLdg: "CYCLES / ATT",
  recentFlights: [
    { remarks: "Formation montagne" },
    { remarks: "Entraînement Touch & Go" },
    { remarks: "Navigation campagne" },
  ],
};

export const flightLog: Translations["flightLog"] = {
  stats: {
    totalHours: "Heures totales",
    landings: "Atterrissages",
    picHours: "Heures CdB",
    aircraftTypes: "Types d'aéronefs",
    lastFlight: "Dernier vol",
  },
  airports: {
    lsgg: "Trafic international. Transit en espace aérien contrôlé.",
    lfmu: "Approche côtière le long de la Méditerranée.",
    lirj: "Traversée de l'île d'Elbe. Vues maritimes magnifiques.",
    lfli: "Base d'attache.",
    lflp: "Approche lacustre magnifique entourée de montagnes.",
    lflb: "Opérations en vallée alpine près du Lac du Bourget.",
    lfka: "Porte d'entrée vers les hautes Alpes.",
    lfly: "Approche urbaine près du centre-ville.",
    lfms: "Porte d'entrée vers les montagnes des Cévennes.",
    lftw: "Navigation près des sites historiques romains.",
    lfmv: "Approche venteuse défiant le Mistral.",
    lfma: "Vol panoramique au-dessus des paysages de Provence.",
    lfmq: "Approche célèbre à côté du circuit de F1.",
    lftf: "Opérations sur aérodrome civil/militaire.",
  },
};
