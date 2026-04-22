"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, WordReveal } from "./useScrollEffects";

const ParticlesSVG = () => (
  <svg
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] opacity-[0.05] pointer-events-none"
    viewBox="0 0 1200 400"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden
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

const FooterV2: React.FC = () => (
  <footer className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-2 to-navy pointer-events-none" />
    {/* Splotch — atmospheric wash for the close */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 atmospheric-drift"
      style={{
        background:
          "radial-gradient(960px 820px at 20% 20%, rgba(60,100,170,0.40), transparent 68%), radial-gradient(900px 800px at 85% 85%, rgba(140,90,200,0.38), transparent 68%), radial-gradient(720px 640px at 50% 55%, rgba(48,160,200,0.24), transparent 70%)",
      }}
    />
    <ParticlesSVG />

    {/* CTA — Build the Future with Discipulus. */}
    <section className="relative py-20 sm:py-24 text-center">
      <WordReveal
        as="h2"
        speed={55}
        className="font-freight text-[clamp(1.9rem,3.4vw,2.6rem)] font-normal leading-tight text-white mb-8 px-6 sm:px-0 tracking-tight"
      >
        Build the Future with Discipulus.
      </WordReveal>
      <Reveal delay={500}>
        <div className="flex flex-col sm:flex-row gap-3.5 items-center justify-center relative z-10">
          <a
            href="https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white text-navy px-7 py-4 sm:py-3 text-[0.875rem] sm:text-[0.8rem] font-semibold tracking-widest uppercase min-h-[52px] sm:min-h-0 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 ease-8vc inline-flex items-center justify-center"
          >
            <span className="relative z-10">Join us</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#e8dcc8]/60 to-transparent group-hover:translate-x-full transition-transform [transition-duration:900ms] ease-8vc-out" />
          </a>
          <a
            href="mailto:jakob.diepenbrock@discipulusventures.com"
            className="text-white/70 sm:text-white/60 px-7 py-4 sm:py-3 text-[0.875rem] sm:text-[0.8rem] tracking-wider border border-white/15 sm:border-white/10 min-h-[52px] sm:min-h-0 hover:text-white hover:border-white/30 hover:bg-white/[0.03] transition-all duration-300 ease-8vc inline-flex items-center justify-center"
          >
            Contact us
          </a>
        </div>
      </Reveal>
    </section>

    {/* Brand — logo, socials, copyright */}
    <section className="relative px-6 sm:px-10 lg:px-16 pb-10 sm:pb-12 pt-6 border-t border-white/[0.05]">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6 sm:gap-7">
        <Reveal offset="sm">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            aria-label="Scroll to top"
            className="block cursor-pointer opacity-80 hover:opacity-100 transition-opacity duration-300 ease-8vc"
          >
            <Image
              src="/Discipulus - Logo.png"
              alt="Discipulus Ventures"
              width={660}
              height={84}
              className="h-[78px] sm:h-[84px] w-auto"
              priority={false}
            />
          </button>
        </Reveal>

        <Reveal delay={100} offset="sm">
          <div className="flex items-center gap-6 sm:gap-7">
            <a
              href="https://x.com/discipulusvent"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discipulus Ventures on X"
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 ease-8vc"
            >
              <Image src="/social/x.png" alt="" width={32} height={32} className="w-[30px] h-[30px] brightness-0 invert" />
            </a>
            <a
              href="https://www.linkedin.com/company/discipulus-ventures"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discipulus Ventures on LinkedIn"
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 ease-8vc"
            >
              <Image src="/social/linkedin.png" alt="" width={32} height={32} className="w-[30px] h-[30px] brightness-0 invert" />
            </a>
            <a
              href="http://discipulusventures.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discipulus Ventures on Substack"
              className="opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 ease-8vc"
            >
              <Image src="/social/substack.png" alt="" width={32} height={32} className="w-[30px] h-[30px] brightness-0 invert" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={200} offset="sm">
          <div className="font-mono text-[0.7rem] text-white/40 tracking-wider text-center leading-relaxed">
            <span className="block">© 2026 Discipulus Ventures</span>
            <span className="block">All Rights Reserved.</span>
            <Link href="/cookies" className="inline-block mt-2 hover:text-white/70 transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </footer>
);

export default FooterV2;
