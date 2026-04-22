// ─── Reusable CV Components ───
//
// Typographic scale (industry):
//   Name 15pt · Section 10pt · Entry title 9pt · Body 8.5pt · Small 8pt · Tiny 7.5pt

// Helper: get localized value
#let loc(value, lang) = {
  if type(value) == dictionary {
    value.at(lang, default: value.at("en", default: ""))
  } else {
    value
  }
}

// ─── Bullet item with hanging indent ───
#let bullet(body) = {
  block(above: 5pt, below: 5pt, inset: (left: 10pt))[
    #set par(hanging-indent: 10pt)
    #text(8.5pt)[#text(weight: "bold", fill: luma(60))[·]#h(4pt)#body]
  ]
}

// ─── Section heading ───
// Space ABOVE heading (separation from previous section): controlled by `above` in block.
// Space BELOW the rule (gap before content): 4pt.
// The 40pt phantom keeps heading + first content together across page breaks.
#let section(title, accent: rgb("#1B3A5C")) = {
  block(above: 16pt, below: 0pt, width: 100%, breakable: false)[
    #text(10pt, weight: "bold", fill: accent, tracking: 0.5pt, upper(title))
    #v(-2pt)
    #line(length: 100%, stroke: 0.5pt + accent)
    #v(40pt)
  ]
  v(-36pt) // reclaim phantom, leaving 4pt gap after line
}

// ─── Profile summary ───
#let profile-block(summary, lang, accent: rgb("#1B3A5C")) = {
  import "../data/translations.typ": t
  section(loc(t.profile, lang), accent: accent)
  block(inset: (left: 4pt, right: 4pt))[
    #text(8.5pt, fill: luma(40), loc(summary, lang))
  ]
}

// ─── Education entry ───
#let edu-entry(entry, lang) = {
  grid(
    columns: (1fr, auto),
    align: (left, right),
    [
      #text(9pt, weight: "bold", entry.institution) \
      #text(8.5pt, style: "italic")[
        #loc(entry.degree, lang)
        #if entry.specialization != none [ — #loc(entry.specialization, lang)]
        #if entry.status != none [ #loc(entry.status, lang)]
      ]
    ],
    [
      #text(8.5pt, weight: "medium", entry.period) \
      #text(8pt, style: "italic", fill: luma(80), entry.location)
    ],
  )
  let highlights = if lang == "fr" { entry.highlights-fr } else { entry.highlights-en }
  text(8pt, fill: luma(60))[
    GPA: *#entry.gpa*
    #if entry.credits != none [ · #entry.credits credits]
    #for h in highlights [ · #h]
  ]
  v(8pt)
}

// ─── Experience entry ───
#let exp-entry(entry, lang) = {
  block(above: 7pt, below: 3pt)[
    #text(9pt, weight: "bold", fill: luma(20), entry.company)
    #h(6pt)
    #text(8pt, style: "italic", fill: luma(100), entry.location)
  ]

  for (i, role) in entry.roles.enumerate() {
    grid(
      columns: (1fr, auto),
      align: (left, right),
      text(8.5pt, weight: "medium", loc(role.title, lang)),
      text(8pt, weight: "bold", fill: luma(60))[
        #loc(role.period, lang) · #text(style: "italic", weight: "regular", loc(role.type, lang))
      ],
    )
    let descs = if lang == "fr" { role.description-fr } else { role.description-en }
    for d in descs {
      bullet(d)
    }
    v(3pt)
  }
  v(5pt)
}

// ─── Project entry (kept together) ───
#let project-entry(entry, lang) = {
  block(breakable: false)[
    #grid(
      columns: (1fr, auto),
      align: (left, right),
      [
        #text(9pt, weight: "bold", loc(entry.title, lang))
        #text(8pt, fill: luma(80))[ · #loc(entry.role, lang)]
      ],
      text(8pt, weight: "bold", fill: luma(60), loc(entry.period, lang)),
    )
    #v(1pt)
    #text(8pt, style: "italic", fill: luma(80), entry.org)

    #let descs = if lang == "fr" { entry.description-fr } else { entry.description-en }
    #for d in descs {
      bullet(d)
    }

    #block(above: 4pt, below: 0pt, inset: (left: 10pt))[
      #text(7.5pt, fill: luma(70), tracking: 0.3pt, weight: "medium")[
        #entry.technologies.join("  ·  ")
      ]
    ]
  ]
  v(10pt)
}

// ─── Skills section ───
#let skills-section(skill-keys, lang, accent: rgb("#1B3A5C")) = {
  import "../data/translations.typ": t
  import "../data/skills.typ": skills

  section(loc(t.skills, lang), accent: accent)

  block(breakable: false)[
    #set par(leading: 0.5em)
    #for key in skill-keys {
      let skill = skills.at(key)
      grid(
        columns: (90pt, 1fr),
        row-gutter: 2pt,
        text(8pt, weight: "bold", fill: luma(40), loc(skill.label, lang)),
        text(8pt, skill.items),
      )
    }
  ]
}

// ─── Languages + References combined (industry CVs) ───
// Uses a lightweight heading (no anti-orphan phantom) so it doesn't get
// pushed to a new page when it's the last element.
#let languages-references-section(lang, accent: rgb("#1B3A5C")) = {
  import "../data/translations.typ": t
  import "../data/skills.typ": languages

  v(5pt)
  text(10pt, weight: "bold", fill: accent, tracking: 0.5pt, upper(loc(t.languages-heading, lang)))
  v(-2pt)
  line(length: 100%, stroke: 0.5pt + accent)
  v(3pt)

  let items = languages.map(l => [
    #text(8.5pt, weight: "bold", loc(l.name, lang)): #text(8.5pt, loc(l.level, lang))
  ])
  items.join(h(8pt))
}

// ─── Languages section (standalone, academic CV) ───
#let languages-section(lang, accent: rgb("#1B3A5C")) = {
  import "../data/translations.typ": t
  import "../data/skills.typ": languages

  section(loc(t.languages-heading, lang), accent: accent)

  let items = languages.map(l => [
    #text(8.5pt, weight: "bold", loc(l.name, lang)): #text(8.5pt, loc(l.level, lang))
  ])
  items.join(h(8pt))
}

// ─── Interests section ───
#let interests-section(lang, accent: rgb("#1B3A5C")) = {
  import "../data/translations.typ": t
  import "../data/experience.typ": sidequests

  section(loc(t.interests, lang), accent: accent)

  for sq in sidequests {
    block(above: 4pt, below: 6pt)[
      #text(8pt)[
        #text(weight: "bold", loc(sq.title, lang))
        #if sq.org != none [ · #loc(sq.org, lang)]
        #if sq.period != none [ (#loc(sq.period, lang))]
        — #text(fill: luma(60), loc(sq.description, lang))
      ]
    ]
  }
}

// ─── Coursework section (academic CV) ───
#let coursework-section(categories, lang, accent: rgb("#1B3A5C")) = {
  import "../data/translations.typ": t
  import "../data/education.typ": coursework

  section(loc(t.coursework, lang), accent: accent)

  for cat-key in categories {
    let cat = coursework.at(cat-key)
    text(8.5pt, weight: "bold", loc(cat.label, lang))
    text(8.5pt)[: #cat.courses.join(", ")]
    v(1pt)
  }
}

// ─── References (standalone, academic CV) ───
#let references-section(lang, accent: rgb("#1B3A5C")) = {
  import "../data/translations.typ": t
  section(loc(t.references, lang), accent: accent)
  text(8.5pt, style: "italic", fill: luma(80), loc(t.references-note, lang))
}
