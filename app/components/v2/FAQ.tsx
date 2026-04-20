"use client";

import React, { useState } from "react";
import { Reveal, WordReveal } from "./useScrollEffects";

const faqs = [
  {
    q: "Who is the Cohort for?",
    a: "We welcome founders in the early stages of building or seriously exploring building hard tech and software for the national interest. We seek individuals driven by a unique set of values that motivates them to solve the West's hardest problems and attracts them to the culture of El Segundo. We've worked with student founders, full-time founders, and those balancing full-time jobs, so we don't exclude any particular persona.",
  },
  {
    q: "What's the timeline and commitment?",
    a: "The in-person part of the program runs for two fully paid weeks in El Segundo, CA, with attendance required for the entire duration. Other programming will be provided both before and after the Cohort. Founders will also be invited to yearly retreats with other founders.",
  },
  {
    q: "Do I need to quit my job or drop out of school to participate?",
    a: "No, you just need to take two weeks off for the program. However, we look for founders who are interested in pursuing their ventures full-time or already doing so.",
  },
  {
    q: "Is having a team a requirement to apply?",
    a: "No, it isn't.",
  },
  {
    q: "Should every team member complete an application?",
    a: "No, only one team member needs to complete the application.",
  },
  {
    q: "Is having an incorporated company necessary to apply?",
    a: "No, it isn't.",
  },
  {
    q: "Do you accept applicants from outside the U.S.?",
    a: "Yes, we welcome international applicants. However, please note that the in-person program requires travel to El Segundo, CA for two weeks.",
  },
];

const FAQItem: React.FC<{ faq: typeof faqs[number]; index: number }> = ({ faq, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 60}>
      <div className="border-b border-white/5 last:border-b-0">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-start gap-4 py-5 sm:py-6 min-h-[44px] text-left group"
          aria-expanded={open}
          aria-label={faq.q}
        >
          <span className="font-sans text-[0.95rem] sm:text-[1rem] font-medium text-white group-hover:text-white/90 transition-colors duration-300 pr-4">
            {faq.q}
          </span>
          <span
            className={`shrink-0 mt-1 w-5 h-5 flex items-center justify-center text-white/40 group-hover:text-white/70 transition-all duration-300 ease-8vc ${
              open ? "rotate-45" : "rotate-0"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="7" y1="0" x2="7" y2="14" />
              <line x1="0" y1="7" x2="14" y2="7" />
            </svg>
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-8vc-out ${
            open ? "max-h-[500px] opacity-100 pb-5 sm:pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <WordReveal
            className="text-[0.9375rem] sm:text-[1rem] text-white/55 leading-[1.65] max-w-[640px] pr-4 sm:pr-8"
            speed={20}
          >
            {faq.a}
          </WordReveal>
        </div>
      </div>
    </Reveal>
  );
};

const FAQ: React.FC = () => (
  <section className="relative py-20 sm:py-24 overflow-hidden">
    {/* Splotch — deep blue atmospheric wash */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(50% 45% at 25% 30%, rgba(60,100,170,0.05), transparent 70%), radial-gradient(50% 40% at 85% 85%, rgba(90,60,140,0.045), transparent 72%)",
      }}
    />
    <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
      <Reveal>
        <p className="font-mono text-[0.75rem] text-white/60 tracking-[0.14em] uppercase mb-3">
          Common questions
        </p>
        <h2 className="font-freight text-[2.1rem] font-normal text-white mb-8 underline-reveal">
          Frequently asked questions.
        </h2>
      </Reveal>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
