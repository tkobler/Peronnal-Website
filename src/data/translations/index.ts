export type Locale = "en" | "fr";

// --- Shared sub-types ---

export interface ExperienceRoleTranslation {
  title: string;
  period: string;
  description: string[];
}

export interface ExperienceEntryTranslation {
  company: string;
  location: string;
  roles: ExperienceRoleTranslation[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  section?: "why" | "what" | "how" | "methodology" | "challenges" | "results";
}

export interface ProjectContentTranslation {
  title: string;
  tagline: string;
  descriptor: string;
  detail: {
    description: { why: string; what: string; how: string };
    methodology?: string;
    challenges?: string[];
    publication?: string;
    images?: ProjectImage[];
    role: string;
    duration: string;
    keyResults?: string[];
    scope?: string;
  };
}

export interface ProjectDetailTranslation {
  metrics?: { label: string; value: string }[];
  challenges?: string[];
  outcomes?: string[];
  marketData?: string;
}

// --- Main Translations interface ---

export interface Translations {
  nav: {
    home: string;
    close: string;
    projects: string;
    experience: string;
    hobby: string;
    about: string;
    getInTouch: string;
  };
  hero: {
    greeting: string;
    phrases: string[];
    contact: string;
    tagline: string;
  };
  homeCards: Record<string, { title: string; descriptor: string }>;
  explore: string;
  projects: {
    heading: string;
    subtitle: string;
    contextLabel: string;
    solutionLabel: string;
    implementationLabel: string;
    roleLabel: string;
    durationLabel: string;
    technologiesLabel: string;
    moreDetails: string;
    back: string;
    wantMore: string;
    wantMoreSub: string;
    fullPortfolio: string;
    byDomain: string;
    listView: string;
    backToDomains: string;
    exploreDomain: string;
    keyResultsLabel: string;
    scopeLabel: string;
    methodologyLabel: string;
    challengesLabel: string;
    publicationLabel: string;
    filterAll: string;
    domains: Record<string, { name: string; desc: string }>;
  };
  projectsContent: Record<string, ProjectContentTranslation>;
  projectDetailsContent: Record<string, ProjectDetailTranslation>;
  experience: {
    heading: string;
  };
  experienceData: Record<string, ExperienceEntryTranslation>;
  hobby: {
    heading: string;
    intro: string;
    highlights: string[];
  };
  contact: {
    heading: string;
    subtitle: string;
    basedIn: string;
    cvTitle: string;
    cvSubtitle: string;
    downloadEn: string;
    downloadFr: string;
    statusLabel: string;
    statusValue: string;
    currentTime: string;
    githubValue: string;
    copied: string;
  };
  footer: {
    contact: string;
    engineeredIn: string;
  };
  about: {
    heading: string;
    bioTitle: string;
    bio: string[];
    educationTitle: string;
    degree: string;
    section: string;
    bachelorLabel: string;
    masterLabel: string;
    gpaLabel: string;
    creditsLabel: string;
    creditsProgress: string;
    passed: string;
    inProgress: string;
    highlightsTitle: string;
    viewProject: string;
    musicTitle: string;
    musicBio: string;
    musicHighlights: string[];
  };
  placeholder: {
    comingSoon: string;
  };
}

// --- Barrel imports ---

import { en } from "./en";
import { fr } from "./fr";

const translations: Record<Locale, Translations> = { en, fr };

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}
