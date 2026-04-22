import type { Metadata } from "next";
import ExperienceClient from "./ExperienceClient";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience, teaching, volunteering, and extracurricular activities — from manufacturing management to firefighting.",
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
