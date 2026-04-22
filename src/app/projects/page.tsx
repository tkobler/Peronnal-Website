import type { Metadata } from "next";
import ProjectsPage from "@/components/projects/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected engineering and academic projects in photonics, embedded systems, robotics, and product design.",
};

export default function Projects() {
  return <ProjectsPage />;
}
