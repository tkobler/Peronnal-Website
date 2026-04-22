// ─── Generic CV – Français ───
#import "../template/layout.typ": industry-layout
#import "../template/components.typ": *
#import "../data/translations.typ": t
#import "../data/education.typ": education
#import "../data/experience.typ": experiences
#import "../data/projects.typ": projects
#import "../data/skills.typ": skill-sets, profiles

#let lang = "fr"
#let variant = "generic"
#let accent = rgb("#1B3A5C")

#show: industry-layout.with(lang: lang, accent: accent, show-photo: true)

#profile-block(profiles.at(variant), lang, accent: accent)

#section(loc(t.experience, lang), accent: accent)
#for entry in experiences {
  if variant in entry.tags {
    exp-entry(entry, lang)
  }
}

#section(loc(t.education, lang), accent: accent)
#for entry in education {
  edu-entry(entry, lang)
}

// ─── Page 2: Projects, Skills, Interests ───
#pagebreak()

#section(loc(t.projects, lang), accent: accent)
#for entry in projects {
  if variant in entry.tags {
    project-entry(entry, lang)
  }
}

#skills-section(skill-sets.at(variant), lang, accent: accent)

#interests-section(lang, accent: accent)

#languages-references-section(lang, accent: accent)
