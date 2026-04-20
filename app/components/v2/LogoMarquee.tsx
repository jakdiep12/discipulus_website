"use client";

import React from "react";
import Image from "next/image";
import { investors } from "@/app/data/investors";
import { WordReveal } from "./useScrollEffects";

const LogoItem: React.FC<{ v: typeof investors[number]; keyPrefix: string }> = ({ v, keyPrefix }) => (
  <a
    key={`${keyPrefix}-${v.id}`}
    href={v.href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-center shrink-0 px-8 sm:px-10 md:px-12"
  >
    <Image
      src={v.src}
      alt={v.id}
      width={220}
      height={22}
      className={`h-[16px] sm:h-[20px] md:h-[22px] w-auto opacity-90 shrink-0 hover:opacity-100 transition-opacity duration-300 ease-8vc${
        v.dark ? " brightness-0 invert" : ""
      }`}
    />
  </a>
);

const LogoMarquee: React.FC = () => {
  // Three identical copies + a -33.333% translation guarantees the loop
  // reset is seamless at every viewport width — the visible slice is
  // always backed by another copy regardless of where we are in the cycle.
  const copies = ["a", "b", "c"] as const;

  return (
    <section className="relative isolate z-0 py-14 sm:py-16 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-navy via-[#0a1328] to-navy">
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
          className="font-sans text-[0.72rem] sm:text-[0.78rem] text-[#e8dcc8]/80 tracking-[0.2em] uppercase text-center mb-7 font-semibold"
        >
          Cohort companies funded by
        </WordReveal>

        {/* Edge fades — clip logo bleed against section boundary */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-navy to-transparent z-10" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-navy to-transparent z-10" />

        <div className="flex items-center animate-marquee will-change-transform w-max">
          {copies.map((k) =>
            investors.map((v) => <LogoItem key={`${k}-${v.id}`} keyPrefix={k} v={v} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
