"use client";

import React from "react";
import { Reveal, WordReveal } from "./useScrollEffects";

const ParticlesSVG = () => (
  <svg
    className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none"
    viewBox="0 0 1200 400"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="white">
      <circle cx="80" cy="60" r="1.1"><animate attributeName="cy" values="60;54;66;60" dur="8s" repeatCount="indefinite" /></circle>
      <circle cx="200" cy="120" r=".7"><animate attributeName="cy" values="120;114;126;120" dur="6s" repeatCount="indefinite" /></circle>
      <circle cx="340" cy="80" r=".9"><animate attributeName="cy" values="80;73;87;80" dur="7s" repeatCount="indefinite" /></circle>
      <circle cx="480" cy="200" r="1.2"><animate attributeName="cy" values="200;193;207;200" dur="9s" repeatCount="indefinite" /></circle>
      <circle cx="600" cy="100" r=".6"><animate attributeName="cy" values="100;94;106;100" dur="5s" repeatCount="indefinite" /></circle>
      <circle cx="720" cy="300" r="1"><animate attributeName="cy" values="300;294;306;300" dur="7.5s" repeatCount="indefinite" /></circle>
      <circle cx="850" cy="150" r=".8"><animate attributeName="cy" values="150;143;157;150" dur="6.5s" repeatCount="indefinite" /></circle>
      <circle cx="960" cy="250" r="1.1"><animate attributeName="cy" values="250;243;257;250" dur="8.5s" repeatCount="indefinite" /></circle>
      <circle cx="1100" cy="90" r=".5"><animate attributeName="cy" values="90;84;96;90" dur="5.5s" repeatCount="indefinite" /></circle>
      <circle cx="150" cy="320" r=".9"><animate attributeName="cy" values="320;314;326;320" dur="7s" repeatCount="indefinite" /></circle>
      <circle cx="400" cy="340" r=".7"><animate attributeName="cy" values="340;334;346;340" dur="6s" repeatCount="indefinite" /></circle>
      <circle cx="550" cy="280" r="1.1"><animate attributeName="cy" values="280;273;287;280" dur="8s" repeatCount="indefinite" /></circle>
    </g>
  </svg>
);

const CTASection: React.FC = () => (
  <section className="py-4 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-2 to-navy pointer-events-none" />
    <ParticlesSVG />
    <WordReveal
      as="h2"
      speed={55}
      className="font-freight text-[clamp(1.7rem,3.4vw,2.6rem)] font-normal leading-tight text-white mb-3 relative z-10 tracking-tight"
    >
      Build the Future with Discipulus.
    </WordReveal>
    <div className="mb-4 relative z-10" />
    <Reveal delay={500}>
      <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-center relative z-10">
      <a
        href="https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative overflow-hidden bg-white text-navy px-5 sm:px-7 py-3 text-[0.72rem] sm:text-[0.8rem] font-semibold tracking-widest uppercase hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 ease-8vc inline-block"
      >
        <span className="relative z-10">Join us</span>
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#e8dcc8]/60 to-transparent group-hover:translate-x-full transition-transform [transition-duration:900ms] ease-8vc-out" />
      </a>
      <a
        href="mailto:jakob.diepenbrock@discipulusventures.com"
        className="text-white/60 px-7 py-3 text-[0.8rem] tracking-wider border border-white/10 hover:text-white hover:border-white/30 hover:bg-white/[0.03] transition-all duration-300 ease-8vc inline-block"
      >
        Contact us
      </a>
      </div>
    </Reveal>
  </section>
);

export default CTASection;
