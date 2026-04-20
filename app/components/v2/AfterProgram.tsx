"use client";

import React from "react";
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
          "radial-gradient(540px 480px at 85% 15%, rgba(116,94,160,0.13), transparent 72%), radial-gradient(520px 460px at 10% 85%, rgba(60,100,170,0.12), transparent 72%)",
      }}
    />
    <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
      <Reveal>
        <p className="font-mono text-[0.75rem] text-white/60 tracking-[0.14em] uppercase mb-3">
          After the program
        </p>
        <h2 className="font-freight text-[1.75rem] sm:text-[2.1rem] font-normal text-white mb-8 underline-reveal">
          After You Leave The Program.
        </h2>
      </Reveal>
      <ul className="flex flex-col gap-5 max-w-3xl">
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
  </section>
);

export default AfterProgram;
