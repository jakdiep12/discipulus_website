"use client";

import React from "react";
import Image from "next/image";
import { Reveal, WordReveal } from "./useScrollEffects";
import ScheduleReveal from "./ScheduleReveal";

type ScheduleItem = {
  time: string;
  desc: string;
  reveal?: {
    imageSrc: string;
    imageAlt: string;
    imageWidth: number;
    imageHeight: number;
  };
};

const scheduleItems: ScheduleItem[] = [
  {
    time: "06:00",
    desc: "Founder workout",
    reveal: {
      imageSrc: "/schedule-reveals/founder-workout.jpeg",
      imageAlt:
        "Cohort founders lifting dumbbells at a Coast Fitness gym beneath posters reading 'Build More Muscle' and 'Practice Like A Champion'",
      imageWidth: 1600,
      imageHeight: 1200,
    },
  },
  {
    time: "08:15",
    desc: "One hour session from guest speaker",
    reveal: {
      imageSrc: "/schedule-reveals/guest-speaker-session.jpeg",
      imageAlt:
        "The cohort seated at folding tables with laptops listening to two guest speakers in front of a large American flag",
      imageWidth: 1600,
      imageHeight: 900,
    },
  },
  {
    time: "09:15",
    desc: "Unicorn founder office hours",
    reveal: {
      imageSrc: "/schedule-reveals/unicorn-founder-office-hours.jpeg",
      imageAlt:
        "Nathan Mintz in a blue work shirt, arms crossed, talking with a cohort founder beside a red US General toolbox in a workshop",
      imageWidth: 899,
      imageHeight: 1600,
    },
  },
  {
    time: "15:00",
    desc: "Investor office hours",
    reveal: {
      imageSrc: "/schedule-reveals/investor-office-hours.jpeg",
      imageAlt:
        "Five cohort founders huddled in front of a whiteboard diagramming 'The VC Architecture' — LPs, GPs, partners — with an American flag on the wall",
      imageWidth: 1600,
      imageHeight: 900,
    },
  },
  {
    time: "19:00",
    desc: "Dinner with special guest speaker",
    reveal: {
      imageSrc: "/schedule-reveals/dinner-guest-speaker.jpeg",
      imageAlt:
        "Cohort founders eating In-N-Out together in a workshop space with an American flag and aerospace hardware in the background",
      imageWidth: 1200,
      imageHeight: 1600,
    },
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
                  <div className="font-mono text-[0.78rem] sm:text-[0.75rem] text-white/40 group-hover:text-white/70 px-3 sm:px-4 py-4 sm:py-3 tracking-wide transition-colors duration-300">
                    {item.time}
                  </div>
                  <div className="text-[0.9375rem] text-white/80 group-hover:text-white px-3 sm:px-4 py-4 sm:py-3 transition-colors duration-300">
                    {item.reveal ? (
                      <ScheduleReveal label={item.desc} {...item.reveal} />
                    ) : (
                      item.desc
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="relative w-full max-w-[560px] mx-auto lg:mx-0 aspect-[3/4] overflow-hidden media-glow">
            <Image
              src="/gym.jpeg"
              alt="Founder workout — bench press with spotter"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 90vw, 560px"
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Schedule;
