import type { Metadata } from "next";
import ProjectsSection from "@/components/ProjectsSection";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "PROJECTS // SYSTEM_INDEX",
  description:
    "Projects built by ygglue — full-stack apps, tooling, and experimental systems.",
  openGraph: {
    title: "PROJECTS // SYSTEM_INDEX",
    description: "Projects built by ygglue.",
  },
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <ProjectsSection />
    </PageShell>
  );
}
