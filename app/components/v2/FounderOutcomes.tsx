"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Reveal } from "./useScrollEffects";

function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover)");
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return canHover;
}
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
    testimonial:
      "It's safe to say that the Discipulus Cohort was a game changing experience. The opportunity to learn from established entrepreneurs, dedicate time to creating my initial pitch deck and presenting it to world class investors was an incredible opportunity that every defense tech founder needs.",
  },
  {
    name: "Ted Feldmann",
    company: "Durin",
    url: "https://www.durin.com/",
    headshot: "/founders/ted.jpeg",
    logo: "/companies/durin.png",
    desc: "Autonomous drilling for mineral discovery.",
    testimonial:
      "What an incredible experience with Discipulus last week. Alongside 9 other focused, aligned, and moral young people I propelled myself and my startup with an intensity lacking most everywhere else. Excited for what is next for Discipulus!",
  },
  {
    name: "Denver Rayburn",
    company: "Framework",
    url: "https://framework.co/",
    headshot: "/founders/denver.png",
    logo: "/companies/framework.png",
    desc: "Building the future of apparel manufacturing.",
    testimonial:
      "DV packed more value into a week than others could in a quarter. The intensity, a hallmark of El Segundo, was exceptional, propelling our company forward. The DV team quarterbacked our fundraising efforts, orchestrating back-to-back meetings with world-class operators and investors. If you're looking to generate significant momentum in your company's early stages, this is the definitive program.",
  },
  {
    name: "Johnny Ni",
    company: "Vanguard Defense",
    url: "https://www.vanguarddefense.us/",
    headshot: "/founders/johnny.jpeg",
    logo: "/companies/vanguard.png",
    desc: "Accelerating electronic defense capabilities.",
    testimonial:
      "Discipulus Cohort was the launchpad Vanguard needed to transform our vision into reality. Since joining, we've raised a pre-seed round, initiated a CRADA partnership, and are in talks with some large customers for our product integration. The guidance, network, and momentum we gained through Discipulus have been instrumental in driving both our tech and partnerships forward.",
  },
  {
    name: "Elliot Forcier-Poirier",
    company: "Watoga",
    url: "https://www.watoga.tech/",
    headshot: "/founders/elliot.png",
    logo: "/companies/watoga.png",
    desc: "AI Co-pilot for mining.",
    testimonial:
      "Everyone in our cohort was mission aligned from day one and it created a profound bond between everyone in the batch. DV condensed several months of value in just a week. It set the stage immensely well for our pre-seed round and the team was there throughout the process to help us succeed. Discipulus will be ground-zero for many generational companies and will definitely be a significant factor in restoring western prosperity.",
  },
  {
    name: "Constantin Whitmire",
    company: "1AU Technologies",
    url: "https://www.1autechnologies.com/",
    headshot: "/founders/constantin.jpg",
    logo: "/companies/1aulogo.png",
    desc: "Next-generation photonic systems.",
    testimonial:
      "Jakob is a patriot, whose intense dynamism throughout the program was infectious. Beyond the Cohort, DVs mix of industry acumen and extensive network has allowed us to grow quickly without compromising our core mission. Can't wait to see what's next for El Segundo!",
  },
  {
    name: "Fed Chávez-Torres",
    company: "Tex",
    url: "https://tex.pro/",
    headshot: "/founders/fed.png",
    logo: "/companies/tex.png",
    desc: "Intelligence for equipment procurement & sales.",
    testimonial:
      "From day one, Discipulus brought together founders who were deeply mission-aligned and serious about building enduring American companies. That alignment created trust, speed, and an uncommon sense of purpose. It's rare to find a program that pushes this hard while staying true to first principles.",
  },
];

const FounderCard: React.FC<{ founder: typeof founders[number] }> = ({ founder }) => {
  const [flipped, setFlipped] = useState(false);
  const canHover = useCanHover();

  return (
    <div
      className="relative aspect-square cursor-pointer [perspective:1000px] w-full text-left"
      role="button"
      tabIndex={0}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped(!flipped);
        }
      }}
      onMouseEnter={canHover ? () => setFlipped(true) : undefined}
      onMouseLeave={canHover ? () => setFlipped(false) : undefined}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ease-8vc-out [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front — photo + company logo + founder name */}
        <div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden border border-white/10">
          <Image
            src={founder.headshot}
            alt={founder.name}
            fill
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />
          <div className="absolute top-5 sm:top-7 left-5 sm:left-7 right-5 sm:right-7 flex items-center">
            <Image
              src={founder.logo}
              alt={`${founder.company} logo`}
              width={180}
              height={42}
              className="w-[160px] sm:w-[180px] h-[34px] sm:h-[42px] object-contain object-left drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
            <div className="font-freight text-[1.4rem] sm:text-[1.6rem] font-normal tracking-tight text-white leading-tight">
              {founder.name}
            </div>
          </div>
        </div>

        {/* Back — testimonial fills the card */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-navy-3 border border-white/10 flex flex-col p-4 sm:p-6 lg:p-7 overflow-hidden">
          <blockquote className="relative flex-1 flex items-center justify-center min-h-0">
            <span
              aria-hidden
              className="absolute -top-1 left-0 font-freight text-white/10 text-[2.25rem] sm:text-[3.5rem] leading-none select-none"
            >
              “
            </span>
            <p className="relative font-freight italic text-white text-[0.82rem] sm:text-[1.05rem] lg:text-[1.15rem] leading-[1.55] sm:leading-[1.65] tracking-tight text-center px-2 sm:px-3 max-h-full overflow-y-auto">
              {founder.testimonial}
            </p>
          </blockquote>
          <div className="mt-2 pt-2 sm:mt-3 sm:pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-[0.62rem] sm:text-[0.72rem]">
            <span className="font-mono text-white/65 tracking-[0.12em] uppercase truncate">
              {founder.name} · {founder.company}
            </span>
            <a
              href={founder.url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 font-mono text-white/55 tracking-[0.12em] uppercase hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Visit →
            </a>
          </div>
        </div>
      </div>
    </div>
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
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <Reveal>
          <p className="font-mono text-[0.75rem] text-white/60 tracking-[0.14em] uppercase mb-3">
            Cohort
          </p>
          <h2 className="font-freight text-[1.75rem] sm:text-[2.1rem] font-normal leading-tight text-white underline-reveal mb-8 sm:mb-10">
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
