import type { Metadata } from "next";
import NavbarV2 from "../components/v2/NavbarV2";
import Speakers from "../components/v2/Speakers";
import FooterV2 from "../components/v2/FooterV2";

export const metadata: Metadata = {
  title: "Speakers — Discipulus Ventures",
  description: "Past speakers and mentors including Katherine Boyle (a16z), Shaun Maguire (Sequoia), Tom Mueller (Impulse Space), and more.",
};

export default function SpeakersPage() {
  return (
    <div className="flex flex-col bg-navy text-white/80 font-sans min-h-screen antialiased">
      <NavbarV2 />
      <main>
        <Speakers />
      </main>
      <FooterV2 />
    </div>
  );
}
