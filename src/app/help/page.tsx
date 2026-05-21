import type { Metadata } from "next";
import HelpSection from "@/components/HelpSection";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "HELP // SYSTEM_INDEX",
  description:
    "Terminal command reference — available commands and navigation for this portfolio.",
  openGraph: {
    title: "HELP // SYSTEM_INDEX",
    description: "Terminal command reference.",
  },
};

export default function HelpPage() {
  return (
    <PageShell>
      <HelpSection />
    </PageShell>
  );
}
