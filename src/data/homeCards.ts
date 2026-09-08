/**
 * Home page card data.
 * Each card is a highlight section on the landing page linking to a top-level page.
 */

export interface HomeCard {
  id: string;
  number: string;
  title: string;
  tagline: string;
  descriptor: string;
  linkTo: string;
  image: string;
  layout: "boxed" | "full-screen";
}

const homeCards: HomeCard[] = [
  {
    id: "academic-research",
    number: "01",
    title: "Global Control Logic for a Foiling Hydrogen Boat",
    tagline: "",
    descriptor: "Designed the real-time safety architecture that unified every subsystem of a hydrogen-powered foiling boat",
    linkTo: "/projects#solar-boat-control-logic",
    image: "/images/projects/solar-boat-control-logic/home-hero.jpg",
    layout: "boxed",
  },
  {
    id: "job-experience",
    number: "02",
    title: "Work Experience",
    tagline: "",
    descriptor: "Developed and optimized a cochlear implant insertion tool as an R&D assistant in surgical robotics",
    linkTo: "/experience",
    image: "/images/projects/cochlear-implant-insertion-mechanism/hero.jpeg",
    layout: "full-screen",
  },
  {
    id: "hobby",
    number: "03",
    title: "Beyond Engineering",
    tagline: "",
    descriptor: "Where curiosity takes me off the clock",
    // Points at /about while the Hobby page is parked (src/app/_hobby).
    // Original target: "/hobby"
    linkTo: "/about",
    image: "/images/hobby/lalana.jpg",
    layout: "boxed",
  },
];

export function getHomeCards(): HomeCard[] {
  return homeCards;
}
