"use client";

import RadarMap from "@/components/flight/RadarMap";
import AvionicsDashboard from "@/components/flight/AvionicsDashboard";
import HorizonDivider from "@/components/flight/HorizonDivider";
import { recentFlights } from "@/data/flightLog";
import { useLanguage } from "@/context/LanguageContext";

export default function FlightClient() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen text-slate-200 font-mono selection:bg-cyan-500/30" style={{ background: "var(--dark-bg)" }}>

      {/* --- HEADER --- */}
      <section className="relative mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="flex flex-col gap-1 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
             <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
             <span className="text-xs font-bold tracking-[0.2em] text-cyan-500">{t.flight.systemNormal}</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-6xl">
            {t.flight.heading}
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>{t.flight.pilot}</span>
            <span>{"//"}</span>
            <span>{t.flight.licence}</span>
            <span>{"//"}</span>
            <span className="text-amber-500">{t.flight.vfrOnly}</span>
          </div>
        </div>
      </section>

      {/* --- 1. NAVIGATION DISPLAY (ND) --- */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-cyan-400">{t.flight.navDisplay}</h2>
            <span className="animate-pulse text-xs text-amber-500">{t.flight.noGpsSignal}</span>
        </div>
        <RadarMap />
      </section>

      {/* --- 2. HORIZON DIVIDER --- */}
      <HorizonDivider />

      {/* --- 3. PRIMARY FLIGHT DISPLAY (Stats) --- */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-6 text-sm font-bold text-cyan-400">{t.flight.flightStats}</h2>
        <AvionicsDashboard />
      </section>

      {/* --- 4. FLIGHT LOGBOOK --- */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 overflow-hidden">
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4 sm:p-6">
          <h2 className="mb-6 text-lg font-bold text-white">{t.flight.recentSorties}</h2>

          {/* Desktop: table layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="border-b border-slate-700 font-mono text-xs uppercase text-slate-400">
                <tr>
                  <th className="px-4 py-3">{t.flight.tableDate}</th>
                  <th className="px-4 py-3">{t.flight.tableRoute}</th>
                  <th className="px-4 py-3">{t.flight.tableAircraft}</th>
                  <th className="px-4 py-3 text-right">{t.flight.tableBlockTime}</th>
                  <th className="px-4 py-3">{t.flight.tableRemarks}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentFlights.map((flight, i) => (
                  <tr key={i} className="group transition-colors hover:bg-slate-800/50">
                    <td className="whitespace-nowrap px-4 py-4 font-mono text-cyan-400">{flight.date}</td>
                    <td className="whitespace-nowrap px-4 py-4 font-bold text-white">
                      {flight.from} <span className="mx-1 text-slate-600" aria-hidden="true">→</span> {flight.to}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">{flight.aircraft}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-right font-mono text-amber-400">{flight.duration}</td>
                    <td className="px-4 py-4 text-xs italic text-slate-400">{t.flight.recentFlights[i]?.remarks ?? flight.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: card layout */}
          <div className="sm:hidden space-y-3">
            {recentFlights.map((flight, i) => (
              <div key={i} className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                <h3 className="sr-only">{`Flight: ${flight.from} to ${flight.to}, ${flight.date}`}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-cyan-400">{flight.date}</span>
                  <span className="font-mono text-xs text-amber-400">{flight.duration}</span>
                </div>
                <div className="font-bold text-white text-sm">
                  {flight.from} <span className="mx-1 text-slate-600" aria-hidden="true">→</span> {flight.to}
                </div>
                <div className="mt-1 text-xs text-slate-400">{flight.aircraft}</div>
                {(t.flight.recentFlights[i]?.remarks ?? flight.remarks) && (
                  <p className="mt-2 text-xs italic text-slate-400 border-t border-slate-700 pt-2">
                    {t.flight.recentFlights[i]?.remarks ?? flight.remarks}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
