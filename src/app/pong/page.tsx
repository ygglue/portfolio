import type { Metadata } from "next";
import PongGame from "@/components/PongGame";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "PONG // SYSTEM_INDEX",
  description: "Retro Pong hidden inside the terminal.",
  robots: { index: false, follow: false },
};

export default function PongPage() {
  return (
    <PageShell>
      <PongGame />
    </PageShell>
  );
}
