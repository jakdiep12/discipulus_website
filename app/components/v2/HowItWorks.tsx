"use client";

import React from "react";
import { Reveal, WordReveal } from "./useScrollEffects";

const steps = [
  { num: "01", title: "Apply", desc: "We select ~10 founders per Cohort for technical depth, mission alignment, and intensity." },
  { num: "02", title: "Arrive", desc: "Move into the El Segundo house. Meet your Cohort — the people you'll build alongside for 10 days." },
  { num: "03", title: "Train", desc: "Daily sessions with unicorn founders and defense operators. Office hours. Peer pressure that compounds." },
  { num: "04", title: "Demo Day", desc: "Present to 100+ investors at the Demo Day for the American Interest. Walk out funded." },
  { num: "05", title: "For life", desc: "Ongoing mentorship, fundraising support, and lifetime access to the El Segundo network." },
];

const HowItWorks: React.FC = () => (
  <section id="how" className="py-5">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
      <Reveal>
        <p className="font-mono text-[0.72rem] text-white/60 tracking-[0.14em] uppercase mb-2">
          How it works
        </p>
        <h2 className="font-freight text-[2.1rem] font-normal text-white mb-3 underline-reveal">
          From day one to Demo Day and beyond.
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-white/5 border border-white/5">
        {steps.map((s, i) => (
          <div key={s.num} className="bg-navy p-4 lg:p-5 relative">
            <Reveal delay={i * 100}>
              <div className="font-mono text-[0.65rem] sm:text-[0.58rem] text-white/40 tracking-widest mb-3">
                {s.num}
              </div>
              <div className="font-sans text-[0.95rem] font-semibold tracking-tight text-white mb-2">
                {s.title}
              </div>
              <WordReveal className="text-[0.875rem] text-white/65 leading-[1.6]" as="div" speed={30}>{s.desc}</WordReveal>
            </Reveal>
            {i < steps.length - 1 && (
              <span className="hidden lg:block absolute -right-[7px] top-1/2 -translate-y-1/2 text-white/20 text-sm z-10">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
