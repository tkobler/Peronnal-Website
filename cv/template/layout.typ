// ─── Page Layout & Header ───

#import "../data/personal.typ": personal
#import "components.typ": loc

// ─── Shared typographic scale ───
// Name: 15pt · Section: 10pt · Entry title: 9pt · Body: 8.5pt · Small: 8pt · Tiny: 7.5pt

// ─── Industry CV layout (1–2 pages, Swiss conventions) ───
#let industry-layout(
  lang: "en",
  accent: rgb("#1B3A5C"),
  show-photo: true,
  body,
) = {
  set document(
    author: personal.name,
    title: "CV – " + personal.name,
  )
  set page(
    paper: "a4",
    margin: (top: 1.4cm, bottom: 1.2cm, left: 1.8cm, right: 1.8cm),
    footer: context {
      let page-num = counter(page).get().first()
      let total = counter(page).final().first()
      if total > 1 {
        align(right, text(7.5pt, fill: luma(120))[
          #page-num / #total
        ])
      }
    },
  )
  set text(font: "Helvetica Neue", size: 9pt, lang: lang)
  set par(justify: true, leading: 0.65em)
  show link: it => underline(stroke: 0.3pt + luma(160), offset: 1.5pt, it)

  // ─── Header ───
  grid(
    columns: if show-photo { (1fr, auto) } else { (1fr,) },
    column-gutter: 12pt,
    align: (left, right),
    [
      #text(15pt, weight: "bold", fill: accent, personal.name) \
      #text(9pt, style: "italic", fill: luma(60), loc(personal.title, lang))
      #v(3pt)
      #text(8pt, fill: luma(40))[
        #link("mailto:" + personal.email)[#personal.email] #h(4pt) #text(fill: luma(160))[|] #h(4pt) #personal.phone #h(4pt) #text(fill: luma(160))[|] #h(4pt) #personal.city \
        #link(personal.linkedin-url)[#personal.linkedin] #h(4pt) #text(fill: luma(160))[|] #h(4pt) #link("https://" + personal.github)[#personal.github] #h(4pt) #text(fill: luma(160))[|] #h(4pt) #link("https://" + personal.website)[#personal.website]
      ]
    ],
    ..if show-photo {
      ([
        #image(personal.photo, width: 2.5cm)
      ],)
    } else { () },
  )

  v(5pt)
  line(length: 100%, stroke: 0.8pt + accent)

  body
}

// ─── Academic CV layout (2–4 pages, international conventions) ───
#let academic-layout(
  lang: "en",
  accent: rgb("#1B3A5C"),
  show-photo: false,
  body,
) = {
  set document(
    author: personal.name,
    title: "CV – " + personal.name,
  )
  set page(
    paper: "a4",
    margin: (top: 2.2cm, bottom: 2.2cm, left: 2.2cm, right: 2.2cm),
    header: context {
      let page-num = counter(page).get().first()
      if page-num > 1 {
        text(7.5pt, fill: luma(160))[
          #personal.name #h(1fr) p. #page-num
        ]
        v(-2pt)
        line(length: 100%, stroke: 0.3pt + luma(200))
      }
    },
  )
  set text(font: "Helvetica Neue", size: 9.5pt, lang: lang)
  set par(justify: true, leading: 0.55em)
  show link: it => underline(stroke: 0.3pt + luma(160), offset: 1.5pt, it)

  // ─── Header (centred, academic style) ───
  align(center)[
    #text(15pt, weight: "bold", personal.name) \
    #text(9.5pt, style: "italic", fill: luma(60), loc(personal.title, lang))
    #v(3pt)
    #text(8.5pt, fill: luma(40))[
      #link("mailto:" + personal.email)[#personal.email] #h(4pt) #text(fill: luma(160))[|] #h(4pt) #personal.phone #h(4pt) #text(fill: luma(160))[|] #h(4pt) #personal.city \
      #link(personal.linkedin-url)[#personal.linkedin] #h(4pt) #text(fill: luma(160))[|] #h(4pt) #link("https://" + personal.github)[#personal.github] #h(4pt) #text(fill: luma(160))[|] #h(4pt) #link("https://" + personal.website)[#personal.website]
    ]
  ]

  v(2pt)
  line(length: 100%, stroke: 0.5pt + accent)

  body
}
