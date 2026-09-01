import React from "react";
import NavbarV2 from "./NavbarV2";
import HeroVideo from "./HeroVideo";
import { Reveal, WordReveal } from "./useScrollEffects";

const Hero: React.FC = () => {
  return (
    <>
      {/* Video with the navbar overlaid on top */}
      <HeroVideo>
        <div className="absolute inset-x-0 top-0 z-30">
          <NavbarV2 transparent />
        </div>
      </HeroVideo>

      {/* Hero text — below the video, on solid navy */}
      <div className="px-6 sm:px-10 lg:px-16 pt-14 pb-16 sm:pb-20 relative z-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <WordReveal
            as="p"
            speed={30}
            className="font-mono text-[0.75rem] sm:text-[0.72rem] text-white/60 tracking-[0.14em] uppercase mb-3"
          >
            {"10-Day Founder Residency \u00B7 El Segundo, CA"}
          </WordReveal>

          <WordReveal
            as="h1"
            speed={55}
            delay={200}
            className="font-freight text-[clamp(2rem,5.5vw,4.6rem)] font-normal leading-[1.15] sm:leading-[1.1] text-white max-w-[900px] mx-auto mb-7 sm:mb-5 tracking-tight"
          >
            {"Cultivating a visionary vanguard of founders solving America\u2019s hardest problems in El Segundo."}
          </WordReveal>

          <Reveal delay={900}>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center">
              <a
                href="https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-white text-navy px-7 py-4 sm:py-3.5 text-[0.875rem] sm:text-[0.8rem] font-semibold tracking-widest uppercase text-center w-full sm:w-auto min-h-[52px] sm:min-h-[44px] flex items-center justify-center hover:scale-[1.02] sm:hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 ease-8vc"
              >
                <span className="relative z-10">Apply now</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#e8dcc8]/60 to-transparent group-hover:translate-x-full transition-transform [transition-duration:900ms] ease-8vc-out" />
              </a>
              <a
                href="/cohort"
                className="text-white/70 sm:text-white/60 px-7 py-4 sm:py-3.5 text-[0.875rem] sm:text-[0.8rem] tracking-wider border border-white/15 sm:border-white/10 text-center w-full sm:w-auto min-h-[52px] sm:min-h-[44px] flex items-center justify-center hover:text-white hover:border-white/30 hover:bg-white/[0.03] transition-all duration-300 ease-8vc"
              >
                Learn More About the Cohort
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default Hero;
