import type { Metadata } from "next";
import Image from "next/image";
import NavbarV2 from "../components/v2/NavbarV2";
import FounderOutcomes from "../components/v2/FounderOutcomes";
import Press from "../components/v2/Press";
import LogoMarquee from "../components/v2/LogoMarquee";
import FooterV2 from "../components/v2/FooterV2";

export const metadata: Metadata = {
  title: "Cohort — Discipulus Ventures",
  description: "What happened to the founders who came through. Every company below was trained through a Discipulus Cohort.",
};

export default function CohortPage() {
  return (
    <div className="flex flex-col bg-navy text-white/80 font-sans min-h-screen antialiased">
      <NavbarV2 />
      {/* Cohort hero photo */}
      <div className="relative w-full aspect-[2/1] lg:aspect-[2.5/1] overflow-hidden">
        <Image
          src="/FoundingFathers.png"
          alt="Discipulus Cohort founders in front of the American flag"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <FounderOutcomes />
      <Press />
      <LogoMarquee />
      <FooterV2 />
    </div>
  );
}
