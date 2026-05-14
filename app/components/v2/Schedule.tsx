"use client";

import React from "react";
import Image from "next/image";
import { Reveal, WordReveal } from "./useScrollEffects";

type ScheduleItem = {
  time: string;
  desc: string;
};

const scheduleItems: ScheduleItem[] = [
  {
    time: "06:00",
    desc: "Founder workout",
  },
  {
    time: "08:15",
    desc: "One hour session from guest speaker",
  },
  {
    time: "09:15",
    desc: "Unicorn founder office hours",
  },
  {
    time: "15:00",
    desc: "Investor office hours",
  },
  {
    time: "19:00",
    desc: "Dinner with special guest speaker",
  },
];

const Schedule: React.FC = () => (
  <section id="experience" className="relative py-20 sm:py-24 bg-navy overflow-hidden">
    {/* Splotch — dark teal atmospheric wash */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(960px 820px at 15% 20%, rgba(40,150,190,0.40), transparent 68%), radial-gradient(920px 800px at 85% 85%, rgba(110,70,180,0.38), transparent 68%), radial-gradient(720px 640px at 55% 50%, rgba(60,110,200,0.24), transparent 70%)",
      }}
    />
    <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 lg:items-start">
        <div className="flex flex-col">
          <Reveal>
            <p className="font-mono text-[0.75rem] text-white/60 tracking-[0.14em] uppercase mb-3">
              Example day
            </p>
            <h2 className="font-freight text-[1.7rem] sm:text-[1.9rem] font-normal leading-tight text-white mb-5 underline-reveal">
              What a day looks like inside the Cohort.
            </h2>
            <WordReveal className="text-[0.9375rem] sm:text-[1rem] text-white/65 leading-[1.65]" speed={40}>{"The most productive 10 days of your company's life."}</WordReveal>
          </Reveal>
          <div className="mt-6 sm:mt-8 border-t border-white/5">
            {scheduleItems.map((item, i) => (
              <Reveal key={item.time} delay={i * 80}>
                <div
                  className="grid grid-cols-[64px_1fr] sm:grid-cols-[88px_1fr] border-b border-white/5 hover:bg-navy-2 transition-all duration-300 ease-8vc hover:pl-2 group"
                >
                  <div className="font-mono text-[0.78rem] sm:text-[0.75rem] text-white/60 group-hover:text-white/85 px-3 sm:px-4 py-4 sm:py-3 tracking-wide transition-colors duration-300">
                    {item.time}
                  </div>
                  <div className="text-[0.9375rem] text-white/80 group-hover:text-white px-3 sm:px-4 py-4 sm:py-3 transition-colors duration-300">
                    {item.desc}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="relative w-full max-w-[560px] mx-auto lg:mx-0 aspect-[3/2] overflow-hidden media-glow">
            <Image
              src="/cohort-workshop-session.png"
              alt="Cohort founders gathered for a workshop session in El Segundo"
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 90vw, 560px"
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Schedule;
