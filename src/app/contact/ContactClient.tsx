"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const [copied, setCopied] = useState("");
  const [now, setNow] = useState(new Date());
  const { t } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  // --- Data: Contact Channels (inside component to access translations) ---
  const contacts = [
    {
      label: "Email",
      value: "you@example.com",
      href: "mailto:you@example.com",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "group-hover:text-blue-600",
      bg: "group-hover:bg-blue-50"
    },
    {
      label: "LinkedIn",
      value: "Your Name",
      href: "https://www.linkedin.com/in/your-name/",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      color: "group-hover:text-[#0077b5]",
      bg: "group-hover:bg-[#0077b5]/10"
    },
    {
      label: "GitHub",
      value: t.contact.githubValue,
      href: "https://github.com/your-username",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.597 1.028 2.688 0 3.848-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
      color: "group-hover:text-gray-900",
      bg: "group-hover:bg-gray-100"
    },
  ];

  return (
    <main
      className="min-h-screen bg-gray-50 pt-24 pb-20"
      data-section-theme="light"
    >
      {/* HEADER */}
      <section className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="font-display font-bold tracking-tight text-gray-900" style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)" }}>
          {t.contact.heading}
        </h1>
        <p className="mt-4 text-gray-600" style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}>
          {t.contact.subtitle}
          <br /> <span className="font-semibold text-gray-800">{t.contact.basedIn}</span>
        </p>
      </section>

      {/* CONTACT GRID */}
      <section className="mx-auto mt-16 max-w-4xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:shadow-sm"
            >
              {/* Icon Bubble */}
              <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 transition-colors ${c.bg} ${c.color}`}>
                {c.icon}
              </div>

              {/* Text */}
              <div className="text-center">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-gray-500">
                  {c.label}
                </h3>
                <p className="mt-1 font-medium text-gray-900">
                  {c.value}
                </p>
              </div>

              {/* Copy Button (appears on hover) */}
              {c.label === "Email" && (
                <button
                  onClick={(e) => handleCopy(e, "you@example.com")}
                  className="absolute right-3 top-3 rounded-full p-2 text-gray-300 opacity-100 sm:opacity-0 transition-opacity hover:bg-gray-100 hover:text-gray-600 sm:group-hover:opacity-100"
                  title="Copy to clipboard"
                  aria-label={`Copy ${c.value} to clipboard`}
                >
                  {copied === "you@example.com" ? (
                    <span className="text-xs font-bold text-green-600" role="status" aria-live="polite">{t.contact.copied}</span>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* RESUME & MAP AREA */}
      <section className="mx-auto mt-12 max-w-4xl px-6">
        <div className="flex flex-col gap-6 md:flex-row">

            {/* Resume Download Card */}
            <div className="flex-1 rounded-2xl border border-gray-200 bg-gray-900 p-8 text-white shadow-lg">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-display text-xl font-bold">{t.contact.cvTitle}</h3>
                        <p className="mt-2 text-sm text-gray-400">{t.contact.cvSubtitle}</p>
                    </div>
                    <div className="rounded-lg bg-white/10 p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>
                <div className="mt-8 flex gap-4">
                  {/* English Resume */}
                  <a
                    href="/cv-en.pdf"
                    download="Your_Name_CV_EN.pdf"
                    aria-label="Download CV in English (PDF)"
                    className="inline-block rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
                  >
                      {t.contact.downloadEn}
                  </a>

                  {/* French Resume */}
                  <a
                    href="/cv-fr.pdf"
                    download="Your_Name_CV_FR.pdf"
                    aria-label="Télécharger le CV en français (PDF)"
                    className="inline-block rounded-full border border-white/30 px-6 py-2 text-sm font-bold text-white transition-transform hover:bg-white/10 hover:scale-105 active:scale-95"
                  >
                      {t.contact.downloadFr}
                  </a>
              </div>
            </div>

            {/* Timezone / Status */}
            <div className="flex flex-1 flex-col justify-center rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-500">{t.contact.statusLabel}</span>
                </div>
                <p className="mt-2 font-display font-bold text-gray-900">{t.contact.statusValue}</p>

                <div className="mt-6 border-t border-gray-100 pt-4">
                    <p className="font-mono text-xs text-gray-500 uppercase">{t.contact.currentTime}</p>
                    <p className="text-2xl font-mono text-gray-800">
                        {now.toLocaleTimeString('fr-CH', {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Zurich'})}
                    </p>
                </div>
            </div>
        </div>
      </section>

    </main>
  );
}
