import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "PORTFOLIO // SYSTEM_INDEX",
  description:
    "Eliyahu Lagumbay — software engineer building high-performance systems, developer tooling, and AI-native workflows.",
  openGraph: {
    title: "PORTFOLIO // SYSTEM_INDEX",
    description: "Eliyahu Lagumbay — software engineer.",
  },
};

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
    </PageShell>
  );
}
