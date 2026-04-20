"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal, WordReveal } from "./useScrollEffects";

const FooterV2: React.FC = () => (
  <footer className="px-6 sm:px-6 lg:px-12 py-6 sm:py-3 flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-3 border-t border-white/[0.05]">
    <Reveal offset="sm">
      <Image
        src="/Discipulus - Logo.png"
        alt="Discipulus Ventures"
        width={160}
        height={20}
        className="h-[22px] sm:h-[20px] w-auto opacity-40 sm:opacity-35 hover:opacity-70 transition-opacity duration-500 ease-8vc"
      />
    </Reveal>
    <Reveal delay={100} offset="sm">
      <div className="flex gap-6 sm:gap-5 flex-wrap justify-center items-center">
        <Link href="/#about" className="text-white/40 sm:text-white/25 text-[0.9375rem] sm:text-[0.74rem] tracking-wide hover:text-white transition-colors duration-200 ease-8vc">
          About
        </Link>
        <Link href="/cohort" className="text-white/40 sm:text-white/25 text-[0.9375rem] sm:text-[0.74rem] tracking-wide hover:text-white transition-colors duration-200 ease-8vc">
          Cohort
        </Link>
        <Link href="/team" className="text-white/40 sm:text-white/25 text-[0.9375rem] sm:text-[0.74rem] tracking-wide hover:text-white transition-colors duration-200 ease-8vc">
          Team
        </Link>
        <Link href="/cookies" className="text-white/40 sm:text-white/25 text-[0.9375rem] sm:text-[0.74rem] tracking-wide hover:text-white transition-colors duration-200 ease-8vc">
          Cookies
        </Link>
        <span className="hidden sm:inline text-white/10">|</span>
        <div className="flex gap-4 sm:gap-3 items-center">
          <a href="https://x.com/discipulusvent" target="_blank" rel="noopener noreferrer" className="opacity-25 hover:opacity-100 hover:scale-125 transition-all duration-300 ease-8vc">
            <Image src="/social/x.png" alt="Discipulus Ventures on X" width={16} height={16} className="w-[16px] h-[16px] invert" />
          </a>
          <a href="https://www.linkedin.com/company/discipulus-ventures" target="_blank" rel="noopener noreferrer" className="opacity-25 hover:opacity-100 hover:scale-125 transition-all duration-300 ease-8vc">
            <Image src="/social/linkedin.png" alt="Discipulus Ventures on LinkedIn" width={16} height={16} className="w-[16px] h-[16px] invert" />
          </a>
          <a href="http://discipulusventures.substack.com/" target="_blank" rel="noopener noreferrer" className="opacity-25 hover:opacity-100 hover:scale-125 transition-all duration-300 ease-8vc">
            <Image src="/social/substack.png" alt="Discipulus Ventures on Substack" width={16} height={16} className="w-[16px] h-[16px] invert" />
          </a>
        </div>
      </div>
    </Reveal>
    <Reveal delay={200} offset="sm">
      <div className="font-mono text-[0.64rem] text-white/25 tracking-wider text-center sm:text-right leading-relaxed">
        <WordReveal as="span" speed={30} className="block">
          © 2026 Discipulus Ventures
        </WordReveal>
        <WordReveal as="span" speed={30} delay={150} className="block">
          All Rights Reserved.
        </WordReveal>
        <Link href="/cookies" className="hover:text-white/60 transition-colors duration-200">Cookie Policy</Link>
      </div>
    </Reveal>
  </footer>
);

export default FooterV2;
