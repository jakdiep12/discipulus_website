"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Reveal } from "./useScrollEffects";

interface Speaker {
  name: string;
  title: string;
  // Company/fund name rendered as a wordmark at the top of each card.
  company: string;
  topic: string;
  img?: string;
  url: string;
  // Optional path to a firm/company logo image; when present, replaces the
  // wordmark text on the card front.
  logo?: string;
}

const speakers: Speaker[] = [
  { name: "Palmer Luckey", title: "Founder, Anduril Industries", company: "Anduril", topic: "", img: "/palmer-robot.jpeg", url: "https://www.anduril.com/", logo: "/logos/anduril.png" },
  { name: "Augustus Doricko", title: "Founder of Rainmaker", company: "Rainmaker", topic: "", img: "/speakers/augustus-doricko-bw.jpg", url: "https://www.rainmaker.com/", logo: "/logos/rainmaker.png" },
  { name: "Tom Mueller", title: "Founder of Impulse Space", company: "Impulse Space", topic: "", img: "/speakers/tom-mueller-bw.png", url: "https://www.impulsespace.com/", logo: "/logos/impulse-space.png" },
  { name: "Isaiah Taylor", title: "Founder of Valar Atomics", company: "Valar Atomics", topic: "", img: "/speakers/isaiah-taylor.jpg", url: "https://www.valaratomics.com/", logo: "/logos/valar-atomics.png" },
  { name: "Katherine Boyle", title: "General Partner at a16z", company: "a16z", topic: "", img: "/speakers/katherine-boyle-bw.jpg", url: "https://a16z.com/", logo: "/logos/a16z.png" },
  { name: "Dan Piemont", title: "Founder of Long Wall", company: "Long Wall", topic: "", img: "/speakers/danpiemont.jpeg", url: "https://www.longwall.com/", logo: "/logos/longwall.png" },
  { name: "Shaun Maguire", title: "Partner at Sequoia Capital", company: "Sequoia Capital", topic: "", img: "/speakers/shaun maguire.png", url: "https://www.sequoiacap.com/", logo: "/logos/sequoia.png" },
  { name: "Saif Khawaja", title: "Founder of Shinkei Systems", company: "Shinkei", topic: "", img: "/speakers/saif.png", url: "https://www.shinkei.tech/", logo: "/logos/shinkei.png" },
  { name: "Kevin Hartz", title: "Co-founder of A*", company: "A*", topic: "", img: "/speakers/kevinhartz.jpg", url: "https://www.a-star.co/", logo: "/logos/astar.svg" },
  { name: "Delian Asparouhov", title: "Co-founder of Varda Space Industries", company: "Varda Space", topic: "", img: "/speakers/delian-asparouhov.webp", url: "https://www.varda.com/", logo: "/logos/varda.svg" },
  { name: "Chris Power", title: "Founder of Hadrian", company: "Hadrian", topic: "", img: "/speakers/chris-power-bw.jpg", url: "https://www.hadrian.co/", logo: "/logos/hadrian.png" },
  { name: "Nathan Mintz", title: "Co-founder of CX2", company: "CX2", topic: "", img: "/speakers/nathan-mintz.webp", url: "https://www.cx2.com/", logo: "/logos/cx2.png" },
  { name: "Josh Steinman", title: "Founder of Galvanick", company: "Galvanick", topic: "", img: "/speakers/joshua-steinman.jpg", url: "https://www.galvanick.com/", logo: "/logos/galvanick.png" },
  { name: "Scott Nolan", title: "Founder of General Matter", company: "General Matter", topic: "", img: "/speakers/scott-nolan.png", url: "https://generalmatter.com/", logo: "/logos/general-matter.svg" },
  { name: "Michael Gibson", title: "General Partner at 1517 Fund", company: "1517 Fund", topic: "", img: "/speakers/michael-gibson-bw.jpeg", url: "https://www.1517fund.com/", logo: "/logos/1517.svg" },
  { name: "Bryon Hargis", title: "Founder of Castelion", company: "Castelion", topic: "", img: "/speakers/bryon-hargis.webp", url: "https://castelion.com/", logo: "/logos/castelion.png" },
  { name: "Josh Manchester", title: "Founder of Champion Hill", company: "Champion Hill", topic: "", img: "/speakers/josh-manchester-bw.jpg", url: "https://championhill.vc/", logo: "/logos/champion-hill.png" },
];

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  const [flipped, setFlipped] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <div
      className="shimmer aspect-square cursor-pointer [perspective:800px] w-full text-left"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ease-8vc-out [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front — full-bleed photo (or styled placeholder when photo missing) */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-[#1a2339] to-[#0a1120] border border-white/10">
          {speaker.img ? (
            <Image
              src={speaker.img}
              alt={speaker.name}
              fill
              className="object-cover grayscale"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <span className="font-freight text-white/85 text-[1.35rem] sm:text-[1.5rem] leading-tight tracking-tight text-center">
                {speaker.name}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-5 sm:top-7 left-5 sm:left-7 right-5 sm:right-7 flex items-center">
            {speaker.logo && !logoFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={speaker.logo}
                alt={speaker.company}
                className="w-[140px] sm:w-[170px] h-[32px] sm:h-[40px] object-contain object-left drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="font-sans text-[0.82rem] sm:text-[0.95rem] font-bold text-white uppercase tracking-[0.14em] drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                {speaker.company}
              </span>
            )}
          </div>
        </div>

        {/* Back — info card with link */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-navy-3 flex flex-col items-center justify-center p-6 text-center border border-white/10">
          <div className="font-sans text-[1rem] sm:text-[0.95rem] font-semibold tracking-tight text-white mb-1">
            {speaker.name}
          </div>
          <a
            href={speaker.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.875rem] text-white/55 mb-4 font-medium underline underline-offset-2 decoration-white/20 hover:text-white/80 hover:decoration-white/50 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {speaker.title}
          </a>
          <div className="text-[0.875rem] text-white/45 leading-relaxed italic font-light max-w-[200px]">
            {speaker.topic}
          </div>
        </div>
      </div>
    </div>
  );
};

const Speakers: React.FC = () => (
  <section id="speakers" className="relative py-20 sm:py-24">
    <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-2 to-navy pointer-events-none" />
    {/* Splotch — muted purple atmospheric wash */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 atmospheric-drift"
      style={{
        background:
          "radial-gradient(1020px 860px at 80% 20%, rgba(140,90,200,0.40), transparent 68%), radial-gradient(900px 800px at 15% 90%, rgba(40,150,190,0.36), transparent 68%), radial-gradient(720px 640px at 50% 55%, rgba(70,110,200,0.24), transparent 70%)",
      }}
    />
    <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
      <Reveal>
        <p className="font-mono text-[0.75rem] text-white/60 tracking-[0.14em] uppercase mb-3">
          Selected Past Speakers
        </p>
        <h2 className="font-freight text-[1.75rem] sm:text-[2.1rem] font-normal text-white mb-8 underline-reveal">
          Selected Past Speakers.
        </h2>
      </Reveal>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {speakers.map((s, i) => (
          <div
            key={s.name}
            className="w-[calc(50%-0.375rem)] md:w-[calc(25%-0.75rem)]"
          >
            <Reveal delay={(i % 8) * 80} offset="sm">
              <SpeakerCard speaker={s} />
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Speakers;
