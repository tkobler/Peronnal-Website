// ─── Generic CV – English ───
#import "../template/layout.typ": industry-layout
#import "../template/components.typ": *
#import "../data/translations.typ": t
#import "../data/education.typ": education
#import "../data/experience.typ": experiences
#import "../data/projects.typ": projects
#import "../data/skills.typ": skill-sets, profiles

#let lang = "en"
#let variant = "generic"
#let accent = rgb("#1B3A5C")

#show: industry-layout.with(lang: lang, accent: accent, show-photo: true)

// Profile
#profile-block(profiles.at(variant), lang, accent: accent)

// Experience
#section(loc(t.experience, lang), accent: accent)
#for entry in experiences {
  if variant in entry.tags {
    exp-entry(entry, lang)
  }
}

// Education
#section(loc(t.education, lang), accent: accent)
#for entry in education {
  edu-entry(entry, lang)
}

// ─── Page 2: Projects, Skills, Interests ───
#pagebreak()

// Selected Projects
#section(loc(t.projects, lang), accent: accent)
#for entry in projects {
  if variant in entry.tags {
    project-entry(entry, lang)
  }
}

// Skills
#skills-section(skill-sets.at(variant), lang, accent: accent)

// Languages
#interests-section(lang, accent: accent)

// Languages & References
#languages-references-section(lang, accent: accent)
