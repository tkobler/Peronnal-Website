"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/data/projects";

function ProjectDetailInner() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/projects");
  }, [router]);

  return null;
}

export default function ProjectDetailClient({}: { project: Project }) {
  return (
    <Suspense fallback={<div className="section-dark min-h-screen" />}>
      <ProjectDetailInner />
    </Suspense>
  );
}
