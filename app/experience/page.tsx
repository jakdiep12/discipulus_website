import type { Metadata } from "next";
import NavbarV2 from "../components/v2/NavbarV2";
import PhotoStrip from "../components/v2/PhotoStrip";
import Schedule from "../components/v2/Schedule";
import HowItWorks from "../components/v2/HowItWorks";
import ElSegundo from "../components/v2/ElSegundo";
import FAQ from "../components/v2/FAQ";
import CTASection from "../components/v2/CTASection";
import FooterV2 from "../components/v2/FooterV2";

export const metadata: Metadata = {
  title: "Experience — Discipulus Ventures",
  description: "10 days of intensive founder training in El Segundo. Daily sessions with unicorn founders, investor office hours, and a Demo Day in front of 100+ investors.",
};

export default function ExperiencePage() {
  return (
    <div className="flex flex-col bg-navy text-white/80 font-sans min-h-screen antialiased">
      <NavbarV2 />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-16 lg:pt-20">
        <p className="font-mono text-[0.67rem] text-white/40 tracking-[0.14em] uppercase mb-4">
          The Cohort Experience
        </p>
        <h1 className="font-freight text-[clamp(2.2rem,4.5vw,3.6rem)] font-normal leading-[1.1] text-white max-w-[700px] mb-6">
          10 days that change the trajectory of your company.
        </h1>
        <p className="text-[0.95rem] text-white/60 max-w-[520px] leading-relaxed font-light mb-12">
          An intensive in-person residency in El Segundo — daily sessions with unicorn founders, investor office hours, peer accountability, and a Demo Day in front of 100+ investors.
        </p>
      </div>
      <PhotoStrip />
      <Schedule />
      <HowItWorks />
      <ElSegundo />
      <FAQ />
      <CTASection />
      <FooterV2 />
    </div>
  );
}
