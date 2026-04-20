import NavbarV2 from "../components/v2/NavbarV2";
import FounderOutcomes from "../components/v2/FounderOutcomes";
import Speakers from "../components/v2/Speakers";
import AfterProgram from "../components/v2/AfterProgram";
import Schedule from "../components/v2/Schedule";
import TeamSection from "../components/v2/TeamSection";
import FAQ from "../components/v2/FAQ";
import { CohortCarousel } from "../components/cohort/CohortCarousel";
import CTASection from "../components/v2/CTASection";
import FooterV2 from "../components/v2/FooterV2";
import { Reveal } from "../components/v2/useScrollEffects";
import { CohortHero } from "./CohortHero";

export { default as metadata } from "./metadata";

export default function CohortPage() {
  return (
    <div className="flex flex-col bg-navy text-white/80 font-sans min-h-screen max-w-full overflow-hidden antialiased">
      <NavbarV2 />
      <CohortHero />
      <section className="py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <p className="font-mono text-[0.75rem] text-white/60 tracking-[0.14em] uppercase mb-3">
              Fall 2026 Cohort · <span className="el-segundo">El&nbsp;Segundo</span>, CA
            </p>
            <h1 className="font-freight text-[clamp(1.75rem,5vw,4rem)] font-normal leading-[1.1] text-white max-w-[700px] mb-5">
              Discipulus Cohort
            </h1>
            <p className="text-[0.9375rem] sm:text-[1rem] text-white/65 max-w-[520px] leading-[1.65]">
              Two week residency in <span className="el-segundo">El&nbsp;Segundo</span> with 10 other early-stage, value-aligned founders building hard tech and software for the national interest.
            </p>
          </Reveal>
        </div>
      </section>
      <FounderOutcomes />
      <Speakers />
      <AfterProgram />
      <Schedule />
      <TeamSection />
      <FAQ />
      <CohortCarousel />
      <CTASection />
      <FooterV2 />
    </div>
  );
}
