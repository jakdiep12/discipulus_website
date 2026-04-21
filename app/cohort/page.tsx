import NavbarV2 from "../components/v2/NavbarV2";
import FounderOutcomes from "../components/v2/FounderOutcomes";
import Speakers from "../components/v2/Speakers";
import AfterProgram from "../components/v2/AfterProgram";
import Schedule from "../components/v2/Schedule";
import TeamSection from "../components/v2/TeamSection";
import FAQ from "../components/v2/FAQ";
import { CohortCarousel } from "../components/cohort/CohortCarousel";
import FooterV2 from "../components/v2/FooterV2";
import { Reveal } from "../components/v2/useScrollEffects";
import { CohortHero } from "./CohortHero";
import { CohortVideo } from "./CohortVideo";

export { default as metadata } from "./metadata";

export default function CohortPage() {
  return (
    <div className="flex flex-col bg-navy text-white/80 font-sans min-h-screen max-w-full overflow-hidden antialiased">
      <NavbarV2 />
      <CohortHero />
      <section className="relative py-14 sm:py-20 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 atmospheric-drift"
          style={{
            background:
              "radial-gradient(960px 860px at 82% 18%, rgba(60,100,170,0.48), transparent 68%), radial-gradient(880px 780px at 8% 88%, rgba(140,90,200,0.44), transparent 68%), radial-gradient(760px 680px at 55% 50%, rgba(64,180,190,0.30), transparent 70%), radial-gradient(640px 560px at 95% 70%, rgba(100,70,200,0.36), transparent 68%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 atmospheric-drift-alt"
          style={{
            background:
              "radial-gradient(580px 520px at 20% 30%, rgba(40,160,220,0.32), transparent 68%), radial-gradient(620px 540px at 70% 85%, rgba(170,110,220,0.28), transparent 68%), radial-gradient(480px 440px at 50% 50%, rgba(80,140,220,0.22), transparent 70%)",
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <Reveal>
            <p className="font-mono text-[0.75rem] text-white/60 tracking-[0.14em] uppercase mb-3">
              Fall 2026 Cohort · <span className="el-segundo">El&nbsp;Segundo</span>, CA
            </p>
            <h1 className="font-freight text-[clamp(1.75rem,5vw,4rem)] font-normal leading-[1.1] text-white max-w-[700px] mx-auto mb-5">
              Discipulus Cohort
            </h1>
            <p className="text-[0.9375rem] sm:text-[1rem] text-white/65 max-w-[640px] mx-auto leading-[1.65]">
              Two week residency in <span className="el-segundo">El&nbsp;Segundo</span> with 10 other early-stage, value-aligned founders building hard tech and software for the national interest.
            </p>
          </Reveal>
        </div>
      </section>
      <CohortVideo />
      <FounderOutcomes />
      <Speakers />
      <AfterProgram />
      <Schedule />
      <TeamSection />
      <FAQ />
      <CohortCarousel />
      <FooterV2 />
    </div>
  );
}
