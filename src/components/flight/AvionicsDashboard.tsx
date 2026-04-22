"use client";

import { useState, useEffect, useRef } from "react";
import { flightStats } from "@/data/flightLog";
import { useLanguage } from "@/context/LanguageContext";

/** Normalise any angle into 0-359.999 */
function normAngle(a: number) {
  return ((a % 360) + 360) % 360;
}

/** Shortest signed angular difference (-180 … +180) */
function angleDiff(a: number, b: number) {
  let d = normAngle(a - b);
  if (d > 180) d -= 360;
  return d;
}

export default function AvionicsDashboard() {
  const { t } = useLanguage();

  /* ====== VOR STATE ====== */
  const compassRef = useRef<HTMLDivElement>(null);
  const mouseAngleRef = useRef(0);          // instant bearing-to-mouse
  const obsRef = useRef(0);                 // smoothed OBS course
  const [obs, setObs] = useState(0);        // for rendering
  const [cdi, setCdi] = useState(0);        // -1 … +1  (full-scale ±10°)
  const [toFrom, setToFrom] = useState<"TO" | "FROM">("TO");
  const rafRef = useRef<number>(0);

  /* Mouse + Touch → instant bearing */
  useEffect(() => {
    const updateBearing = (clientX: number, clientY: number) => {
      if (!compassRef.current) return;
      const rect = compassRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      if (deg < 0) deg += 360;
      mouseAngleRef.current = deg;
    };
    const handleMouseMove = (e: MouseEvent) => updateBearing(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateBearing(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  /* Animation loop: OBS lerps toward mouseAngle, derive CDI + TO/FROM */
  useEffect(() => {
    let lastTime = performance.now();
    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const target = mouseAngleRef.current;
      let current = obsRef.current;

      // Lerp via shortest-path angular interpolation
      const diff = angleDiff(target, current);
      const speed = 4.0; // higher = snappier follow
      current = normAngle(current + diff * Math.min(1, speed * dt));
      obsRef.current = current;

      // CDI: angular deviation capped at ±10° → normalised to -1…+1
      const dev = angleDiff(target, current);
      const cdiVal = Math.max(-1, Math.min(1, dev / 10));

      // TO / FROM: mouse in the forward semicircle of the selected course?
      const absDiff = Math.abs(angleDiff(target, current));
      const tf: "TO" | "FROM" = absDiff <= 90 ? "TO" : "FROM";

      setObs(Math.round(current));
      setCdi(cdiVal);
      setToFrom(tf);

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

      {/* GAUGE 1: TOTAL TIME */}
      <div className="relative flex h-48 sm:h-64 flex-col justify-between overflow-hidden rounded-lg border-2 border-slate-700 bg-black p-1 shadow-inner">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "linear-gradient(transparent 50%, rgba(6,182,212,0.1) 50%)", backgroundSize: "100% 4px" }} />
        <div className="z-10 text-center">
            <span className="block text-xs font-bold text-cyan-500">{t.flight.totalHours}</span>
        </div>
        <div className="relative flex flex-1 items-center justify-center">
            <div className="absolute left-0 h-1 w-4 bg-white"></div>
            <div className="absolute right-0 h-1 w-4 bg-white"></div>
            <span className="font-mono text-6xl font-bold text-white tabular-nums tracking-tighter">
                {flightStats.totalHours}
            </span>
        </div>
        <div className="z-10 flex justify-between border-t border-slate-800 bg-slate-900 px-2 py-1">
            <span className="text-xs text-slate-400">PIC</span>
            <span className="text-xs font-bold text-cyan-400">{flightStats.picHours}</span>
        </div>
      </div>

      {/* GAUGE 2: INTERACTIVE VOR */}
      <div
        ref={compassRef}
        className="relative flex h-48 sm:h-64 flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-slate-700 bg-black p-1 shadow-inner cursor-crosshair touch-none"
      >
        {/* Top labels */}
        <div className="absolute top-2 z-10 flex w-full justify-between px-3 pointer-events-none">
          <span className="text-xs font-bold text-cyan-500">VOR</span>
          <span className="text-xs font-bold text-fuchsia-400">OBS {obs.toString().padStart(3, "0")}°</span>
        </div>

        {/* Rotating compass rose */}
        <div
          className="relative flex h-32 w-32 sm:h-44 sm:w-44 items-center justify-center rounded-full border border-slate-700 bg-[#151515] will-change-transform compass-rose"
          style={{ transform: `rotate(${-obs}deg)` }}
        >
          {/* Ticks & cardinal labels */}
          <div className="absolute inset-0 h-full w-full">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <div
                key={deg}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `rotate(${deg}deg) translateY(var(--compass-tick-offset, -80px))` }}
              >
                <div className="flex flex-col items-center">
                  <span className={`mb-1 block bg-slate-500 ${deg % 90 === 0 ? "h-3 w-0.5" : "h-2 w-px"}`}></span>
                  {deg % 90 === 0 && (
                    <span className="font-mono text-[11px] font-bold text-white">
                      {deg === 0 ? "N" : deg === 90 ? "E" : deg === 180 ? "S" : "W"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Course pointer arrow (rotates with card) */}
          <div className="absolute top-[8px] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>
            <div className="h-[22px] w-[2px] bg-white"></div>
          </div>
          <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="h-[22px] w-[2px] bg-white"></div>
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
          </div>

          {/* CDI dots (5 dots on each side of center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-[7px]">
            {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((dot) => (
              dot === 0 ? null : (
                <div key={dot} className="h-1.5 w-1.5 rounded-full bg-white/30" />
              )
            ))}
          </div>
        </div>

        {/* STATIC OVERLAYS (do not rotate) */}

        {/* Course select triangle at top */}
        <div className="absolute top-[25px] z-20">
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-amber-500"></div>
        </div>

        {/* CDI needle (deflects laterally) */}
        <div
          className="absolute z-20 pointer-events-none transition-transform duration-100 ease-out"
          style={{ transform: `translateX(${cdi * 38}px)` }}
        >
          <div className="h-16 w-[2px] bg-white shadow-[0_0_4px_rgba(255,255,255,0.5)]"></div>
        </div>

        {/* TO / FROM flag */}
        <div className="absolute bottom-8 z-20 pointer-events-none">
          <div className={`flex items-center justify-center rounded px-2 py-0.5 border text-[11px] font-mono font-bold tracking-wider ${
            toFrom === "TO"
              ? "border-green-500/50 bg-green-950/80 text-green-400"
              : "border-red-500/50 bg-red-950/80 text-red-400"
          }`}>
            {toFrom}
          </div>
        </div>

        {/* Digital OBS readout */}
        <div className="absolute bottom-2 right-2 rounded bg-slate-900 px-1.5 py-0.5 border border-slate-700 pointer-events-none">
          <span className="font-mono text-[11px] font-bold text-white tabular-nums">
            {obs.toString().padStart(3, "0")}°
          </span>
        </div>
      </div>

      {/* GAUGE 3: LANDINGS */}
      <div className="relative flex h-48 sm:h-64 flex-col justify-between overflow-hidden rounded-lg border-2 border-slate-700 bg-black p-1 shadow-inner">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "linear-gradient(transparent 50%, rgba(255,0,255,0.15) 50%)", backgroundSize: "100% 40px" }} />
        <div className="z-10 text-center">
            <span className="block text-xs font-bold text-fuchsia-400">{t.flight.cyclesLdg}</span>
        </div>
        <div className="relative flex flex-1 items-center justify-center">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M0 12 L10 7 V17 L0 12 Z" fill="#d946ef" />
                 </svg>
            </div>
            <div className="absolute top-8 text-4xl font-bold text-slate-800 blur-[1px] select-none">{flightStats.landings + 1}</div>
            <div className="absolute bottom-8 text-4xl font-bold text-slate-800 blur-[1px] select-none">{flightStats.landings - 1}</div>
            <span className="font-mono text-6xl font-bold text-white tabular-nums tracking-tighter z-10">
                {flightStats.landings}
            </span>
        </div>
        <div className="z-10 flex justify-between border-t border-slate-800 bg-slate-900 px-2 py-1">
            <span className="text-xs text-slate-400">VS</span>
            <span className="text-xs font-bold text-white">+0 FPM</span>
        </div>
      </div>

    </div>
  );
}
