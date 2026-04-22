export interface SectionDef {
  id: string;
  label: string;
  keys: string[]; // top-level Translations keys this section covers
}

export const SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero", keys: ["hero"] },
  { id: "nav", label: "Navigation", keys: ["nav"] },
  { id: "homeCards", label: "Home Cards", keys: ["homeCards", "explore"] },
  {
    id: "projects",
    label: "Projects",
    keys: ["projects", "projectsContent", "projectDetailsContent"],
  },
  { id: "experience", label: "Experience", keys: ["experience", "experienceData"] },
  { id: "flight", label: "Flight", keys: ["flight", "flightLog"] },
  { id: "contact", label: "Contact", keys: ["contact"] },
  { id: "about", label: "About", keys: ["about"] },
  { id: "footer", label: "Footer", keys: ["footer"] },
  { id: "placeholder", label: "Placeholder", keys: ["placeholder"] },
];
