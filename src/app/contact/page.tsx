import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "CONTACT // SYSTEM_INDEX",
  description:
    "Contact information and links for Eliyahu Lagumbay (ygglue).",
  openGraph: {
    title: "CONTACT // SYSTEM_INDEX",
    description: "Contact information for Eliyahu Lagumbay.",
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactSection />
    </PageShell>
  );
}
