"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useHashScroll } from "@/hooks/useHashScroll";
import { highlightCourses } from "@/data/courses";

export default function About() {
  const { t } = useLanguage();

  useHashScroll();

  return (
    <main className="relative">
      {/* 1. HERO */}
      <section
        className="section-dark relative grid h-[50vh] place-items-center overflow-hidden"
        data-section-theme="dark"
      >
        <h1
          className="relative z-10 text-[length:var(--text-hero)] font-bold leading-[0.9] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.about.heading}
        </h1>
      </section>

      {/* 2. BIO */}
      <section
        className="section-light relative py-20 lg:py-28"
        style={{ padding: "var(--space-xl) var(--container-padding)" }}
        data-section-theme="light"
      >
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-16 items-start">
            {/* Profile photo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative h-52 w-52 lg:h-60 lg:w-60 overflow-hidden rounded-full border-4 border-white shadow-xl">
                <Image
                  src="/images/portrait.jpg"
                  alt="Tim Kobler"
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

      {/* 3. EDUCATION */}
      <section
        className="section-dark relative py-20 lg:py-28"
        style={{ padding: "var(--space-xl) var(--container-padding)" }}
        data-section-theme="dark"
      >
        <div className="relative z-10 mx-auto max-w-5xl">
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
                  {course.professorLinks.length > 0
                    ? course.professorLinks.map((prof, i) => (
                        <span key={prof.url}>
                          {i > 0 && " · "}
                          <a href={prof.url} target="_blank" rel="noopener noreferrer" className="underline decoration-white/15 underline-offset-2 transition-colors hover:text-blue-400 hover:decoration-blue-400">
                            {prof.name}
                          </a>
                        </span>
                      ))
                    : t.about.variousProfessors}
                </p>
                {course.projectId && (
                  <Link
                    href={`/projects#${course.projectId}`}
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

      {/* 4. BEYOND ENGINEERING — full-bleed Weisshorn backdrop */}
      <section
        id="beyond"
        className="section-dark relative flex min-h-screen w-full flex-col overflow-hidden"
        data-section-theme="dark"
      >
        <Image
          src="/images/hobby/weisshorn.jpg"
          alt="The Weisshorn's snow ridge under a deep blue sky"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Scrim: deepens the sky behind the white type and grounds the
            bottom of the frame, without flattening the summit itself. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/60"
        />

        <div
          className="relative z-10 flex min-h-screen flex-col justify-between gap-16 py-16 lg:py-20"
          style={{ paddingLeft: "var(--container-padding)", paddingRight: "var(--container-padding)" }}
        >
          {/* Upper left — the title, sitting in the blue */}
          <div>
            {/* max-w in em, not px: it keeps the break at roughly one word per
                line whatever the clamped font size, in both EN and FR. */}
            <h2
              className="max-w-[6em] text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.about.beyondTitle}
            </h2>
          </div>

          {/* Lower left — the prose gets its own frosted panel, because the
              snow underneath is far too bright to carry white text on its own. */}
          <div className="max-w-2xl rounded-2xl border border-white/15 bg-black/40 p-6 backdrop-blur-md sm:p-8">
            <div className="space-y-5">
              {t.about.beyondBio.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[length:var(--text-base)] leading-relaxed text-white/90"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {t.about.beyondActivities.map((activity) => (
                <li
                  key={activity}
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/85"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
}
