"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "./useScrollEffects";

const bullets: React.ReactNode[] = [
  <>Get mentorship from mission-aligned unicorn founders in <span className="el-segundo">El&nbsp;Segundo</span></>,
  <>
    Clear plan to raise a funding round with help from{" "}
    <a
      href="https://www.hf0.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white underline underline-offset-2 decoration-white/30 hover:decoration-white/60 transition-colors"
    >
      HF0
    </a>{" "}
    and in-person access to 100+ top investors through the Demo Day for the American Interest
  </>,
  <>Become an <span className="el-segundo">El&nbsp;Segundo</span> insider and get to know the key players in the ecosystem</>,
];

const AfterProgram: React.FC = () => (
  <section className="relative py-20 sm:py-24 overflow-hidden">
    {/* Splotch — muted purple / deep blue atmospheric wash */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 atmospheric-drift"
      style={{
        background:
          "radial-gradient(920px 820px at 85% 15%, rgba(116,94,160,0.38), transparent 70%), radial-gradient(880px 780px at 10% 85%, rgba(60,100,170,0.36), transparent 70%), radial-gradient(680px 620px at 50% 55%, rgba(64,180,190,0.22), transparent 68%)",
      }}
    />
    <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-14 items-center">
        <Reveal>
          <div className="relative w-full max-w-[560px] mx-auto md:mx-0 aspect-[3/2] overflow-hidden media-glow">
            <Image
              src="/demo-day.jpeg"
              alt="Discipulus Cohort founders at Demo Day"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 90vw, 560px"
            />
          </div>
        </Reveal>
        <div className="text-center md:text-left">
          <Reveal>
            <p className="font-mono text-[0.75rem] text-white/60 tracking-[0.14em] uppercase mb-3">
              After the program
            </p>
            <h2 className="font-freight text-[1.75rem] sm:text-[2.1rem] font-normal text-white mb-8 underline-reveal">
              After You Leave The Program.
            </h2>
          </Reveal>
          <ul className="flex flex-col gap-5 max-w-3xl mx-auto md:mx-0 text-left">
            {bullets.map((text, i) => (
              <Reveal key={i} delay={i * 100} offset="sm">
                <li className="flex items-start gap-3 text-[0.9375rem] sm:text-[1rem] text-white/75 leading-[1.7] font-light">
                  <span className="text-white/40 mt-1.5 text-xs shrink-0">●</span>
                  <span>{text}</span>
                </li>
              </Reveal>
            ))}
            <Reveal delay={bullets.length * 100} offset="sm">
              <li className="flex items-center gap-3 text-[0.85rem] text-white/40 italic font-light pl-6">
                and more…
              </li>
            </Reveal>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default AfterProgram;
