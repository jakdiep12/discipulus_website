"use client";

import React from "react";
import { Reveal, WordReveal } from "./useScrollEffects";

const TopoSVG = () => (
  <svg
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] opacity-[0.03] pointer-events-none"
    viewBox="0 0 1200 600"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <g stroke="white" strokeWidth=".5" fill="none" opacity=".5">
      <ellipse cx="600" cy="300" rx="480" ry="240" />
      <ellipse cx="600" cy="300" rx="400" ry="200" />
      <ellipse cx="600" cy="300" rx="320" ry="160" />
      <ellipse cx="600" cy="300" rx="240" ry="120" />
      <ellipse cx="600" cy="300" rx="160" ry="80" />
      <ellipse cx="600" cy="300" rx="80" ry="40" />
      <ellipse cx="585" cy="292" rx="440" ry="220" transform="rotate(2.5 600 300)" />
      <ellipse cx="615" cy="308" rx="360" ry="180" transform="rotate(-1.8 600 300)" />
      <ellipse cx="592" cy="296" rx="280" ry="140" transform="rotate(3.5 600 300)" />
    </g>
  </svg>
);

const companies = [
  { name: "Anduril Industries", desc: "Defense technology", href: "https://www.anduril.com/" },
  { name: "Shinkei Systems", desc: "Robotic fish processing", href: "https://www.shinkei.systems/" },
  { name: "Impulse Space", desc: "In-space transportation", href: "https://www.impulsespace.com/" },
  { name: "Valar Atomics", desc: "Nuclear energy", href: "https://www.valaratomics.com/" },
  { name: "Epirus", desc: "Directed energy systems", href: "https://www.epirusinc.com/" },
  { name: "Rainmaker Technology Corp", desc: "Weather modification technology", href: "https://www.rainmaker.com/" },
];

const ElSegundo: React.FC = () => (
  <section className="py-16 lg:py-20 relative overflow-hidden">
    <TopoSVG />
    <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start relative z-10">
      <div>
        <p className="font-mono text-[0.72rem] text-white/60 tracking-[0.14em] uppercase mb-5">
          Why <span className="el-segundo">El&nbsp;Segundo</span>
        </p>
        <h2 className="font-freight text-[1.7rem] sm:text-[1.9rem] font-normal leading-tight text-white mb-4 underline-reveal">
          The new center of gravity for American hard tech.
        </h2>
        <WordReveal className="text-[0.9375rem] sm:text-[1rem] text-white/65 leading-[1.65] mt-3" speed={30}>El Segundo is home to a growing cluster of defense, aerospace, and deep tech companies. The Cohort plugs founders directly into this physical ecosystem — the actual people and buildings where the work is happening.</WordReveal>
      </div>
      <div>
        <p className="font-mono text-[0.6rem] text-white/30 tracking-[0.12em] uppercase mb-3">
          Featured Companies
        </p>
        <div className="border border-white/5">
        {companies.map((c, i) => (
          <Reveal key={c.name} delay={i * 60}>
            <a
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-5 py-3 sm:py-4 hover:bg-navy-2 hover:pl-5 sm:hover:pl-7 transition-all duration-300 ease-8vc group ${
                i < companies.length - 1 ? "border-b border-white/5" : ""
              }`}
            >
              <span className="font-sans text-[0.82rem] sm:text-[0.88rem] font-semibold text-white group-hover:text-white transition-colors duration-300">
                {c.name}
              </span>
              <span className="text-[0.7rem] text-white/20 group-hover:text-white/50 font-light transition-colors duration-300">
                {c.desc}
              </span>
            </a>
          </Reveal>
        ))}
        </div>
      </div>
    </div>
  </section>
);

export default ElSegundo;
