"use client";

import React from "react";
import { Reveal, WordReveal } from "./useScrollEffects";

const deals = [
  { value: "10 days", desc: "Intensive in-person residency with housing in El Segundo" },
  { value: "30+", desc: "Speakers, mentors, and operators across defense and hard tech" },
  { value: "100+", desc: "Investors at the Demo Day for the American Interest" },
  { value: "$175k", desc: "Investment per company" },
];

const DealGrid: React.FC = () => (
  <section className="relative py-5 bg-[#0c1424]">
    <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy/60 pointer-events-none" />
    <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
      <Reveal>
        <p className="font-mono text-[0.72rem] text-white/60 tracking-[0.14em] uppercase mb-2">
          The Cohort at a glance
        </p>
      </Reveal>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
        {deals.map((d, i) => (
          <div key={d.value} className="bg-navy-2 p-4 sm:p-5 hover:bg-navy-3 transition-all duration-300 ease-8vc group hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]">
            <Reveal delay={i * 80}>
              <div className="font-sans text-[1.45rem] text-white font-semibold tracking-tight mb-1 group-hover:text-white transition-colors duration-300">
                {d.value}
              </div>
              <WordReveal className="text-[0.875rem] text-white/65 leading-[1.6]" as="div" speed={35}>{d.desc}</WordReveal>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DealGrid;
