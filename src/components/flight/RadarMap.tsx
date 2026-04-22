"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { visitedAirports, Airport } from "@/data/flightLog";
import { useLanguage } from "@/context/LanguageContext";

export default function RadarMap() {
  const [activePin, setActivePin] = useState<Airport | null>(null);
  const { t } = useLanguage();
  
  // Refs for direct DOM manipulation (high performance, no re-renders)
  const radarRef = useRef<HTMLDivElement>(null);
  const airportRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const animationRef = useRef<number>(0);

  // --- CONFIGURATION ---
  const ROTATION_SPEED = 90; // Degrees per second (90 = 4s full rotation)
  const BEAM_WIDTH = 60;     // Degrees the "tail" lasts behind the sweep line

  useEffect(() => {
    let currentAngle = 0;
    let lastTime = performance.now();

    // 1. PRE-CALCULATE ANGLES FOR ALL AIRPORTS
    // This avoids doing trigonometry 60 times a second per dot.
    const airportAngles = visitedAirports.map(airport => {
      // Coordinates are in %, center is 50,50
      // In CSS Grid: X goes Right, Y goes Down.
      const dx = airport.coords.x - 50;
      const dy = airport.coords.y - 50;

      // atan2(y, x) gives angle from Positive X Axis (3 o'clock)
      // Range: -PI to +PI
      const angleRad = Math.atan2(dy, dx);
      const angleDeg = angleRad * (180 / Math.PI);

      // Convert to "Clockwise from Top (12 o'clock)" to match CSS rotation
      // Standard: 0=Right, 90=Down, 180=Left, -90=Up
      // Target:   0=Up,    90=Right, 180=Down, 270=Left
      let adjustedAngle = angleDeg + 90;
      if (adjustedAngle < 0) adjustedAngle += 360;

      return { id: airport.id, angle: adjustedAngle };
    });

    const loop = (time: number) => {
      const deltaTime = (time - lastTime) / 1000; // Seconds
      lastTime = time;

      // 2. UPDATE RADAR ROTATION
      currentAngle = (currentAngle + ROTATION_SPEED * deltaTime) % 360;
      
      if (radarRef.current) {
        // Rotate the visual radar beam
        radarRef.current.style.transform = `rotate(${currentAngle}deg)`;
      }

      // 3. CHECK HITS & UPDATE OPACITY
      airportAngles.forEach(({ id, angle }) => {
        const dot = airportRefs.current.get(id);
        if (!dot) return;

        // Calculate angular distance: How far is the radar 'ahead' of the dot?
        // We want positive values if Radar just passed the Dot.
        const diff = (currentAngle - angle + 360) % 360;

        // "diff" is how many degrees the radar has moved PAST the dot.
        // If diff is 0, radar is exactly ON the dot.
        // If diff is 10, radar passed it 10 degrees ago.
        
        if (diff < BEAM_WIDTH) {
          // Inside the beam!
          // Opacity is 1.0 when diff=0, fading to 0.1 as diff approaches BEAM_WIDTH
          // We use a power curve (Math.pow) to make it "pop" bright then fade slow
          const intensity = 1 - (diff / BEAM_WIDTH);
          const opacity = 0.2 + (0.8 * Math.pow(intensity, 3)); // Base 0.2 visibility
          
          dot.style.opacity = opacity.toString();
          dot.style.transform = `scale(${1 + intensity * 0.5})`; // Slight pop
          dot.style.boxShadow = `0 0 ${intensity * 15}px cyan`;
        } else {
          // Outside the beam - dim state
          // We don't set this to 0 immediately to allow for a smooth CSS transition fallback
          // if we wanted, but setting it explicitly is more robust here.
          dot.style.opacity = "0.2";
          dot.style.transform = "scale(1)";
          dot.style.boxShadow = "none";
        }
      });

      animationRef.current = requestAnimationFrame(loop);
    };

    // Initialise dots immediately so there's no dark delay before first sweep
    airportAngles.forEach(({ id, angle }) => {
      const dot = airportRefs.current.get(id);
      if (!dot) return;
      const diff = (0 - angle + 360) % 360; // currentAngle starts at 0
      if (diff < BEAM_WIDTH) {
        const intensity = 1 - diff / BEAM_WIDTH;
        dot.style.opacity = (0.2 + 0.8 * Math.pow(intensity, 3)).toString();
        dot.style.transform = `scale(${1 + intensity * 0.5})`;
        dot.style.boxShadow = `0 0 ${intensity * 15}px cyan`;
      }
    });

    animationRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.6)] group">
      
      {/* 1. MAP IMAGE */}
      <Image
        src="/images/flight/map2.png"
        alt="Navigation radar display showing flight region"
        fill
        sizes="100vw"
        className="object-cover opacity-80 contrast-110 saturate-50 transition-all duration-700 group-hover:opacity-60"
      />

      {/* 2. GRID OVERLAY */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:80px_80px] opacity-30" />

      {/* 3. RADAR SWEEP (Controlled by JS Ref) */}
      {/* We removed the 'animate-spin' class because we drive rotation manually now */}
      <div 
        ref={radarRef}
        className="pointer-events-none absolute inset-[-50%] z-10 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(6,182,212,0.4)_360deg)] will-change-transform" 
      />

      {/* 4. WAYPOINTS (Driven by JS Refs) */}
      {visitedAirports.map((airport) => (
        <button
          key={airport.id}
          onClick={() => setActivePin(airport)}
          aria-label={`${airport.code} — ${airport.name}`}
          className="group/pin absolute z-20 -translate-x-1/2 -translate-y-1/2 transform p-3 focus:outline-none"
          style={{ left: `${airport.coords.x}%`, top: `${airport.coords.y}%` }}
        >
          {/* The Phosphor Dot */}
          <div 
             // We assign a ref to each dot so the loop can find it by ID
             ref={(el) => {
                if (el) airportRefs.current.set(airport.id, el);
                else airportRefs.current.delete(airport.id);
             }}
             // Base styles (opacity driven by JS)
             className="h-3 w-3 rounded-sm bg-cyan-400 opacity-20 will-change-transform"
          />
          
          {/* Label — always visible on hover (no click required) */}
          <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/80 px-1.5 py-0.5 font-mono text-[11px] font-bold text-cyan-400 opacity-0 transition-opacity group-hover/pin:opacity-100">
            {airport.code} — {airport.name}
          </span>
        </button>
      ))}

      {/* 5. DATA BLOCK OVERLAY */}
      {activePin && (
        <div className="absolute bottom-4 right-4 z-30 w-72 animate-in fade-in slide-in-from-bottom-2 duration-300 overflow-hidden rounded border border-cyan-500/30 bg-black/90 p-4 text-cyan-400 backdrop-blur-md">
           <div className="flex justify-between border-b border-cyan-500/30 pb-2">
              <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse bg-green-500 rounded-full"></div>
                  <h3 className="font-bold text-white tracking-widest">{activePin.code}</h3>
              </div>
              <button onClick={() => setActivePin(null)} className="text-slate-500 hover:text-white transition-colors" aria-label="Close airport details">✕</button>
           </div>
           <div className="mt-3 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between"><span className="text-slate-500">{t.flight.radarName}</span> <span className="text-white text-right font-semibold">{activePin.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">{t.flight.radarLastVisit}</span> <span className="text-amber-400">{activePin.dateVisited}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">{t.flight.radarAircraft}</span> <span className="text-slate-200">{activePin.aircraft}</span></div>
           </div>
           <p className="mt-4 border-l-2 border-cyan-500/50 pl-2 text-xs italic text-slate-400">
            &ldquo;{t.flightLog.airports[activePin.id] ?? activePin.description}&rdquo;
           </p>
        </div>
      )}
    </div>
  );
}