"use client";

import Image from "next/image";
import { useState } from "react";
import { visitedAirports, Airport } from "@/data/flightLog";

export default function FlightMap() {
  const [activePin, setActivePin] = useState<Airport | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-slate-900 shadow-2xl">
      {/* 1. MAP BACKGROUND 
        Replace '/images/map_alps.jpg' with a map of your flight zone.
        Style note: A dark, desaturated map looks best.
      */}
      <div className="relative aspect-[16/9] w-full bg-slate-800">
        <Image
            src="/images/flight/map2.png"
            alt="Flight Region Map"
            fill
            sizes="100vw"
            className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
        />

        {/* 2. PINS */}
        {visitedAirports.map((airport) => (
          <button
            key={airport.id}
            onClick={() => setActivePin(airport)}
            className="absolute group -translate-x-1/2 -translate-y-1/2 transform p-3"
            style={{ left: `${airport.coords.x}%`, top: `${airport.coords.y}%` }}
            aria-label={`View details for ${airport.code}`}
          >
            {/* Pulsing Radar Effect */}
            <span className="absolute inset-3 inline-flex animate-ping rounded-full bg-blue-400 opacity-75 duration-1000" />

            {/* Pin Dot */}
            <div className={`relative h-3 w-3 rounded-full ring-2 transition-all ${
                activePin?.id === airport.id ? "bg-blue-500 ring-white scale-125" : "bg-white ring-blue-500 hover:scale-110"
            }`} />

            {/* Hover Label (ICAO Code) */}
            <span className="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              {airport.code}
            </span>
          </button>
        ))}
      </div>

      {/* 3. NAVIGATION CARD (Overlay) */}
      {activePin && (
        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:w-80">
          <div className="animate-in fade-in slide-in-from-bottom-4 overflow-hidden rounded-xl border border-white/10 bg-black/80 text-white backdrop-blur-md">
            
            {/* Header: ICAO + Name */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-baseline gap-2">
                <h3 className="font-mono text-xl font-bold text-blue-400">{activePin.code}</h3>
                <span className="text-sm font-medium text-gray-300">{activePin.name}</span>
              </div>
              <button
                onClick={() => setActivePin(null)}
                className="text-gray-400 hover:text-white"
                aria-label="Close airport details"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Body: Flight Strip Style Data */}
            <div className="p-4">
               <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase text-gray-500">Last Visit</p>
                    <p className="font-mono text-sm">{activePin.dateVisited}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase text-gray-500">Aircraft</p>
                    <p className="font-mono text-sm">{activePin.aircraft}</p>
                  </div>
               </div>
               <p className="text-sm italic text-gray-300 leading-relaxed">
                 &ldquo;{activePin.description}&rdquo;
               </p>
            </div>

            {/* Footer decoration */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}