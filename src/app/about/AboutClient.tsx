"use client";

import Image from "next/image";
import Link from "next/link";
import SectionDivider from "@/components/layout/SectionDivider";
import { useLanguage } from "@/context/LanguageContext";
import { bachelorGpa, bachelorCredits, masterGpa, masterCreditsObtained, masterCreditsTotal, highlightCourses } from "@/data/courses";

export default function About() {
  const { t } = useLanguage();

  return (
    <main className="relative">
      {/* 1. HERO */}
      <section
        className="section-dark relative grid h-[50vh] place-items-center overflow-hidden"
        data-section-theme="dark"
      >
        <h1
          className="text-[length:var(--text-hero)] font-bold leading-[0.9] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.about.heading}
        </h1>
      </section>

      <SectionDivider theme="light" seed={101} />

      {/* 2. BIO */}
      <section
        className="section-light relative py-20 lg:py-28"
        style={{ padding: "var(--space-xl) var(--container-padding)" }}
        data-section-theme="light"
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-16 items-start">
            {/* Profile photo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative h-52 w-52 lg:h-60 lg:w-60 overflow-hidden rounded-full border-4 border-white shadow-xl">
                <Image
                  src="/images/placeholders/square.svg"
                  alt="Your profile photo"
                  fill
                  className="object-cover"
                  sizes="240px"
                  priority
                />
              </div>
            </div>

            {/* Bio text */}
            <div>
              <h2
                className="text-[length:var(--text-2xl)] font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.about.bioTitle}
              </h2>
              <div className="mt-6 space-y-5">
                {t.about.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[length:var(--text-base)] leading-relaxed opacity-85"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider theme="dark" seed={102} />

      {/* 3. EDUCATION */}
      <section
        className="section-dark relative py-20 lg:py-28"
        style={{ padding: "var(--space-xl) var(--container-padding)" }}
        data-section-theme="dark"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-[length:var(--text-3xl)] font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.about.educationTitle}
          </h2>

          {/* Degree header */}
          <div className="mt-10 mb-8">
            <p className="text-xl font-bold sm:text-2xl" style={{ fontFamily: "var(--font-display)" }}>{t.about.degree}</p>
            <p className="mt-1 font-mono text-sm uppercase tracking-wider opacity-50">{t.about.section}</p>
          </div>

          {/* GPA cards */}
          <div className="mb-10 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 sm:p-5">
              <p className="font-mono text-xs uppercase tracking-widest opacity-50">{t.about.bachelorLabel}</p>
              <p className="mt-2 text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{bachelorGpa}<span className="text-base opacity-50">/6</span></p>
              <p className="mt-1 font-mono text-xs opacity-50">{t.about.gpaLabel} · {bachelorCredits} {t.about.creditsLabel} · {t.about.passed}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4 sm:p-5">
              <p className="font-mono text-xs uppercase tracking-widest opacity-50">{t.about.masterLabel}</p>
              <p className="mt-2 text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>{masterGpa}<span className="text-base opacity-50">/6</span></p>
              <p className="mt-1 font-mono text-xs opacity-50">{t.about.gpaLabel} · {masterCreditsObtained}/{masterCreditsTotal} {t.about.creditsLabel} · {t.about.inProgress}</p>
            </div>
          </div>

          {/* Highlighted courses */}
          <h3 className="tag-text mb-4 uppercase tracking-widest opacity-50">{t.about.highlightsTitle}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {highlightCourses.map((course) => (
              <div
                key={course.code}
                className="group rounded-lg border border-white/[0.06] bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
              >
                <p className="font-mono text-xs opacity-50">{course.code}</p>
                <p className="mt-1 font-medium opacity-85" style={{ fontFamily: "var(--font-body)", fontSize: "0.925rem" }}>
                  {course.courseUrl ? (
                    <a href={course.courseUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-blue-400 hover:decoration-blue-400">
                      {course.name}
                    </a>
                  ) : course.name}
                </p>
                <p className="mt-1 text-xs italic opacity-50">
                  {course.professorLinks.map((prof, i) => (
                    <span key={prof.url}>
                      {i > 0 && " & "}
                      <a href={prof.url} target="_blank" rel="noopener noreferrer" className="underline decoration-white/15 underline-offset-2 transition-colors hover:text-blue-400 hover:decoration-blue-400">
                        {prof.name}
                      </a>
                    </span>
                  ))}
                </p>
                {course.projectId && (
                  <Link
                    href={`/projects/${course.projectId}`}
                    className="mt-2 inline-block rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-white/50 transition-colors hover:bg-white/10 hover:text-white/85"
                  >
                    {t.about.viewProject} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider theme="light" seed={103} />

      {/* 4. MUSIC */}
      <section
        className="section-light relative py-20 lg:py-28"
        style={{ padding: "var(--space-xl) var(--container-padding)" }}
        data-section-theme="light"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-[length:var(--text-3xl)] font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.about.musicTitle}
          </h2>

          <p
            className="mt-6 max-w-2xl text-[length:var(--text-base)] leading-relaxed opacity-85"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.about.musicBio}
          </p>

          <div className="mt-10 space-y-6">
            {t.about.musicHighlights.map((highlight, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-l-2 border-black/10 pl-5"
              >
                <p className="text-[length:var(--text-base)] leading-relaxed opacity-85">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
