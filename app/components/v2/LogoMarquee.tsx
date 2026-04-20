"use client";

import React from "react";
import Image from "next/image";
import { investors } from "@/app/data/investors";
import { WordReveal, useParallax } from "./useScrollEffects";

const LogoItem: React.FC<{ v: typeof investors[number] }> = ({ v }) => (
  <a
    href={v.href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-center shrink-0 px-8 sm:px-12 md:px-16"
  >
    <Image
      src={v.src}
      alt={v.id}
      width={220}
      height={40}
      className="h-[30px] sm:h-[40px] md:h-[52px] w-auto opacity-90 brightness-0 invert shrink-0 group-hover:opacity-60 hover:!opacity-100 hover:scale-110 transition-all duration-300 ease-8vc"
    />
  </a>
);

const LogoMarquee: React.FC = () => {
  const stripRef = useParallax<HTMLDivElement>(0.6, 50);
  return (
    <section className="relative py-10 sm:py-14 overflow-hidden group border-y border-white/[0.08] bg-gradient-to-b from-navy via-[#0a1328] to-navy">
      {/* Ambient glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 0%, rgba(232,220,200,0.10), transparent 70%), radial-gradient(50% 40% at 80% 100%, rgba(120,170,255,0.09), transparent 70%)",
        }}
      />

      <div className="relative">
        <WordReveal
          as="p"
          speed={35}
          className="font-mono text-[0.9rem] sm:text-[1rem] text-white/80 tracking-[0.2em] uppercase text-center mb-6 font-semibold"
        >
          Cohort companies funded by
        </WordReveal>

        {/* Edge fades */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-navy to-transparent z-10" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-navy to-transparent z-10" />

        <div ref={stripRef} className="will-change-transform">
          <div
            className="flex items-center animate-investor-scroll group-hover:[animation-play-state:paused]"
            style={{ width: "max-content" }}
          >
            {investors.map((v) => <LogoItem key={`a-${v.id}`} v={v} />)}
            {investors.map((v) => <LogoItem key={`b-${v.id}`} v={v} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
