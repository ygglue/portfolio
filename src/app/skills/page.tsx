import type { Metadata } from "next";
import SkillsSection from "@/components/SkillsSection";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "SKILLS // SYSTEM_INDEX",
  description:
    "Technical skills and competencies — languages, frameworks, tools, and creative software.",
  openGraph: {
    title: "SKILLS // SYSTEM_INDEX",
    description: "Technical skills and competencies.",
  },
};

export default function SkillsPage() {
  return (
    <PageShell>
      <SkillsSection />
    </PageShell>
  );
}
