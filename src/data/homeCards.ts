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
    title: "Flexure-Based Micro-Force Sensor",
    tagline: "",
    descriptor: "Compliant sensor for sub-newton force measurement",
    linkTo: "/projects#micro-force-sensor",
    image: "/images/placeholders/wide.svg",
    layout: "boxed",
  },
  {
    id: "job-experience",
    number: "02",
    title: "Work Experience",
    tagline: "",
    descriptor: "From internships to hands-on production and research roles",
    linkTo: "/experience",
    image: "/images/placeholders/wide.svg",
    layout: "full-screen",
  },
  {
    id: "hobby",
    number: "03",
    title: "Beyond Engineering",
    tagline: "",
    descriptor: "A portfolio can hold more than projects — this page shows how",
    linkTo: "/hobby",
    image: "/images/placeholders/wide.svg",
    layout: "boxed",
  },
];

export function getHomeCards(): HomeCard[] {
  return homeCards;
}
