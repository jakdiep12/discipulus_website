import type { Metadata } from "next";
import NavbarV2 from "../components/v2/NavbarV2";
import TeamSection from "../components/v2/TeamSection";
import FooterV2 from "../components/v2/FooterV2";

export const metadata: Metadata = {
  title: "Team — Discipulus Ventures",
  description: "Meet the team behind Discipulus Ventures. Jakob Diepenbrock (General Partner) and Augustus Doricko (Venture Partner).",
};

export default function TeamPage() {
  return (
    <div className="flex flex-col bg-navy text-white/80 font-sans min-h-screen antialiased">
      <NavbarV2 />
      <TeamSection />
      <FooterV2 />
    </div>
  );
}
