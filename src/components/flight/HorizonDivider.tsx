export default function HorizonDivider() {
  return (
    <div className="relative h-24 w-full overflow-hidden bg-slate-900">
      {/* The Line */}
      <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-white/50" />
      
      {/* Pitch Ladder Lines (Decoration) */}
      <div className="absolute left-1/2 top-1/2 h-full w-64 -translate-x-1/2 -translate-y-1/2">
         <div className="flex h-full flex-col justify-between py-2 opacity-30">
             <div className="mx-auto h-px w-32 bg-white"></div>
             <div className="mx-auto h-px w-20 bg-white"></div>
             <div className="mx-auto h-px w-10 bg-white"></div> {/* Center */}
             <div className="mx-auto h-px w-20 bg-white"></div>
             <div className="mx-auto h-px w-32 bg-white"></div>
         </div>
      </div>
    </div>
  );
}