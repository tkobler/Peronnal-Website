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
    title: "Sub-THz electro-optic modulation",
    tagline: "",
    descriptor: "Characterization of TFLN and TFLT photonic chips at Sub-THz frequencies",
    linkTo: "/projects#hylab-modulators",
    image: "/images/home/photonic.jpg",
    layout: "boxed",
  },
  {
    id: "job-experience",
    number: "02",
    title: "Manufacturing Optimization",
    tagline: "",
    descriptor: "Supply Chain, Operations & Organizational Efficiency of a medical company",
    linkTo: "/projects#manufacturing-optimization",
    image: "/images/home/sterilux4.png",
    layout: "full-screen",
  },
  {
    id: "engineering-project",
    number: "03",
    title: "Guardian Angel",
    tagline: "",
    descriptor: "Lead a team of 5 people in developing an IoT health monitoring system in 3 months",
    linkTo: "/projects#guardian-angel",
    image: "/images/home/master-full.png",
    layout: "full-screen",
  },
  {
    id: "best-flight",
    number: "04",
    title: "Above the clouds",
    tagline: "",
    descriptor: "Private Pilot License since 2021 \u00b7 90+ flight hours on single-engine aircraft \u00b7 Alps, France, Italy, Switzerland",
    linkTo: "/flight",
    image: "/images/home/dr400.jpg",
    layout: "boxed",
  },
  {
    id: "music-concert",
    number: "05",
    title: "Passion for Music",
    tagline: "",
    descriptor: "12 years playing the Trumpet as a soloist and orchestra member \u00b7 Now teaching and transmitting my passion to others",
    linkTo: "/about",
    image: "/images/home/concert_monstre.jpg",
    layout: "boxed",
  },
];

export function getHomeCards(): HomeCard[] {
  return homeCards;
}
