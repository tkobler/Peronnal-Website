import { flightStats } from "@/data/flightLog";

export default function CockpitDashboard() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {/* 1. TOTAL HOURS (Altimeter Style) */}
      <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition-colors">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase text-gray-400">Total Time</span>
          <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">{flightStats.totalHours}</span>
          <span className="text-sm font-medium text-gray-500">h</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">PIC: {flightStats.picHours}h</div>
      </div>

      {/* 2. LANDINGS (Counter Style) */}
      <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition-colors">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase text-gray-400">Landings</span>
          <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">{flightStats.landings}</span>
        </div>
        <div className="mt-2 text-xs text-gray-400">Takeoffs match (hopefully)</div>
      </div>

      {/* 3. AIRCRAFT (List Style) */}
      <div className="col-span-2 group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition-colors">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase text-gray-400">Type Rating / Flown</span>
          <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20M2 12l5-5m-5 5l5 5"/></svg>
        </div>
        <div className="flex flex-wrap gap-2">
            {flightStats.aircraftTypes.map((ac) => (
                <span key={ac} className="rounded-md bg-gray-100 px-3 py-1 font-mono text-sm font-semibold text-gray-700">
                    {ac}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
}