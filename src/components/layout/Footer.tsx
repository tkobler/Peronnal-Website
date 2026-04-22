"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer
      className="section-dark w-full border-t border-white/10 py-12 text-sm"
      style={{ paddingBottom: "max(3rem, env(safe-area-inset-bottom, 0px))" }}
      data-section-theme="dark"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">

        {/* Left: Copyright & Name */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-bold text-white">Clément CHALUT</span>
          <span className="font-mono text-xs text-white/40">
            © {currentYear} ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center: Quick Links / Socials */}
        <div className="flex gap-6 font-mono text-xs font-bold uppercase tracking-wider">
          <a href="https://www.linkedin.com/in/cl%C3%A9ment-chalut-27853320b/" target="_blank" rel="noopener noreferrer" className="text-white/60 underline decoration-white/20 underline-offset-4 hover:decoration-white hover:text-white transition-colors duration-200">
            LinkedIn
          </a>
          <a href="https://github.com/ccka" target="_blank" rel="noopener noreferrer" className="text-white/60 underline decoration-white/20 underline-offset-4 hover:decoration-white hover:text-white transition-colors duration-200">
            GitHub
          </a>
          <a href="mailto:clement.chalut@epfl.ch" className="text-white/60 underline decoration-white/20 underline-offset-4 hover:decoration-white hover:text-white transition-colors duration-200">
            {t.footer.contact}
          </a>
        </div>

        {/* Right: Technical tag */}
        <div className="hidden md:block">
          <span className="rounded bg-white/5 px-2 py-1 font-mono text-[11px] text-white/40 border border-white/10">
            {t.footer.engineeredIn}
          </span>
        </div>
      </div>
    </footer>
  );
}
