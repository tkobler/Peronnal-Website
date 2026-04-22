import { redirect } from "next/navigation";
import { getAllProjects } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ id: p.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getAllProjects().find((p) => p.id === id);
  if (!project) {
    redirect("/projects");
  }
  return <ProjectDetailClient project={project} />;
}
