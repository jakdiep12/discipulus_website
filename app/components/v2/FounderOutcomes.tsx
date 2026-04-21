"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "./useScrollEffects";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const founders = [
  {
    name: "Peter Goldsborough",
    company: "Rune",
    url: "https://www.runetech.co/",
    headshot: "/founders/peter.jpg",
    logo: "/companies/rune.png",
    desc: "AI-enabled predictive logistics for the military.",
  },
  {
    name: "Ted Feldmann",
    company: "Durin",
    url: "https://www.durin.com/",
    headshot: "/founders/ted.jpeg",
    logo: "/companies/durin.png",
    desc: "Autonomous drilling for mineral discovery.",
  },
  {
    name: "Denver Rayburn",
    company: "Framework",
    url: "https://framework.co/",
    headshot: "/founders/denver.png",
    logo: "/companies/framework.png",
    desc: "Building the future of apparel manufacturing.",
  },
  {
    name: "Johnny Ni",
    company: "Vanguard Defense",
    url: "https://www.vanguarddefense.us/",
    headshot: "/founders/johnny.jpeg",
    logo: "/companies/vanguard.png",
    desc: "Accelerating electronic defense capabilities.",
  },
  {
    name: "Elliot Forcier-Poirier",
    company: "Watoga",
    url: "https://www.watoga.tech/",
    headshot: "/founders/elliot.png",
    logo: "/companies/watoga.png",
    desc: "AI Co-pilot for mining.",
  },
  {
    name: "Constantin Whitmire",
    company: "1AU Technologies",
    url: "https://www.1autechnologies.com/",
    headshot: "/founders/constantin.jpg",
    logo: "/companies/1aulogo.png",
    desc: "Next-generation photonic systems.",
  },
  {
    name: "Fed Chávez-Torres",
    company: "Tex",
    url: "https://tex.pro/",
    headshot: "/founders/fed.png",
    logo: "/companies/tex.png",
    desc: "Intelligence for equipment procurement & sales.",
  },
];

const FounderCard: React.FC<{ founder: typeof founders[number] }> = ({ founder }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={founder.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-square block overflow-hidden group cursor-pointer border border-white/10 border-l-2 border-l-transparent hover:border-l-white/40 transition-all duration-300 ease-8vc"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={founder.headshot}
        alt={founder.name}
        fill
        className={`object-cover grayscale transition-all duration-500 ease-8vc ${
          hovered ? "scale-[1.02]" : ""
        }`}
      />
      {/* Color-shift tint on hover — warm cream glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ease-8vc ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(232,220,200,0.18) 0%, rgba(116,94,160,0.12) 60%, rgba(6,12,26,0.55) 100%)",
        }}
      />
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ease-8vc ${
          hovered ? "opacity-0" : "opacity-100"
        } bg-gradient-to-t from-black/60 via-black/10 to-transparent`}
      />

      {/* Company logo — default state, top of card, in color */}
      <div
        className={`absolute top-5 sm:top-7 left-5 sm:left-7 right-5 sm:right-7 flex items-center transition-opacity duration-300 ease-8vc ${
          hovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={founder.logo}
          alt={`${founder.company} logo`}
          width={180}
          height={42}
          className="w-[160px] sm:w-[180px] h-[34px] sm:h-[42px] object-contain object-left drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]"
        />
      </div>

      {/* Bottom content — founder name (always) + company + desc (hover only) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
        <div className="font-freight text-[1.4rem] sm:text-[1.6rem] font-normal tracking-tight text-white leading-tight">
          {founder.name}
        </div>
        <div
          className={`overflow-hidden transition-all duration-400 ease-8vc-out ${
            hovered ? "max-h-[140px] opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="font-sans text-[1rem] text-white font-semibold tracking-tight mb-1.5">
            {founder.company}
          </div>
          <p className="font-sans text-[1.05rem] text-white/90 leading-relaxed">
            {founder.desc}
          </p>
        </div>
      </div>
    </a>
  );
};

const FounderOutcomes: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="outcomes" className="relative py-20 sm:py-24 text-white bg-navy overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 atmospheric-drift"
        style={{
          background:
            "radial-gradient(920px 820px at 82% 18%, rgba(60,100,170,0.42), transparent 68%), radial-gradient(860px 760px at 10% 88%, rgba(140,90,200,0.38), transparent 68%), radial-gradient(720px 640px at 50% 55%, rgba(64,180,190,0.28), transparent 70%)",
        }}
      />
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
        <Reveal>
          <p className="font-mono text-[0.75rem] text-white/60 tracking-[0.14em] uppercase mb-3">
            Cohort
          </p>
          <h2 className="font-freight text-[1.75rem] sm:text-[2.1rem] font-normal leading-tight max-w-[520px] text-white underline-reveal mb-8 sm:mb-10">
            Featured Cohort Founders.
          </h2>
        </Reveal>
        <div className="w-full max-w-5xl mx-auto px-2 sm:px-10 md:px-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              containScroll: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="items-stretch ml-0">
              {founders.map((founder, index) => (
                <CarouselItem
                  key={founder.name}
                  className="min-w-0 pl-0"
                  style={{
                    flexBasis: isMobile ? "90%" : "calc(50% - 1rem)",
                    marginRight: "2rem",
                  }}
                >
                  <FounderCard founder={founder} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="md:-left-14 -left-2 bg-white text-navy hover:!bg-navy hover:!text-white hidden sm:flex" />
            <CarouselNext className="md:-right-14 -right-2 bg-white text-navy hover:!bg-navy hover:!text-white hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FounderOutcomes;
