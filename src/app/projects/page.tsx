"use client";

import ProjectsSection from "@/components/ProjectsSection";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-full p-6 md:p-12">
      <div className="max-w-4xl">
        <ProjectsSection />
      </div>
    </div>
  );
}
