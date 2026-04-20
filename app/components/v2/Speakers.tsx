"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Reveal } from "./useScrollEffects";

interface Speaker {
  name: string;
  title: string;
  topic: string;
  img?: string;
  url: string;
  // Optional path to a firm/company logo to render in the card corner.
  // If the asset is missing the <img> will hide itself via onError.
  logo?: string;
  logoAlt?: string;
}

const speakers: Speaker[] = [
  { name: "Palmer Luckey", title: "Founder, Anduril Industries", topic: "", img: "/palmer-robot.jpeg", url: "https://www.anduril.com/", logo: "/logos/anduril.png", logoAlt: "Anduril Industries" },
  { name: "Augustus Doricko", title: "Founder of Rainmaker", topic: "", img: "/speakers/augustus-doricko-bw.jpg", url: "https://www.rainmaker.com/", logo: "/logos/rainmaker.png", logoAlt: "Rainmaker" },
  { name: "Tom Mueller", title: "Founder of Impulse Space", topic: "", img: "/speakers/tom-mueller-bw.png", url: "https://www.impulsespace.com/", logo: "/logos/impulse-space.png", logoAlt: "Impulse Space" },
  { name: "Isaiah Taylor", title: "Founder of Valar Atomics", topic: "", img: "/speakers/isaiah-taylor.jpg", url: "https://www.valaratomics.com/", logo: "/logos/valar-atomics.png", logoAlt: "Valar Atomics" },
  { name: "Katherine Boyle", title: "General Partner at a16z", topic: "", img: "/speakers/katherine-boyle-bw.jpg", url: "https://a16z.com/", logo: "/logos/a16z.png", logoAlt: "a16z" },
  { name: "Dan Piemont", title: "Founder of Long Wall", topic: "", img: "/speakers/danpiemont.jpeg", url: "https://www.longwall.co/", logo: "/logos/longwall.png", logoAlt: "Long Wall" },
  { name: "Shaun Maguire", title: "Partner at Sequoia Capital", topic: "", img: "/speakers/shaun maguire.png", url: "https://www.sequoiacap.com/", logo: "/logos/sequoia.png", logoAlt: "Sequoia Capital" },
  { name: "Saif Khawaja", title: "Founder of Shinkei Systems", topic: "", img: "/speakers/saif.png", url: "https://www.shinkei.systems/", logo: "/logos/shinkei.png", logoAlt: "Shinkei Systems" },
  { name: "Kevin Hartz", title: "General Partner at A*", topic: "", img: "/speakers/kevinhartz.jpg", url: "https://www.a-star.co/", logo: "/logos/astar.png", logoAlt: "A*" },
  { name: "Delian Asparouhov", title: "Founder of Varda Space", topic: "", img: "/speakers/delian-asparouhov.webp", url: "https://foundersfund.com/" },
  { name: "Chris Power", title: "Founder of Hadrian", topic: "", img: "/speakers/chris-power-bw.jpg", url: "https://www.hadrian.co/" },
  { name: "Nathan Mintz", title: "Founder of CX2", topic: "", img: "/speakers/nathan-mintz.webp", url: "https://www.epirusinc.com/" },
  { name: "Josh Steinman", title: "Founder of Galvanick", topic: "", img: "/speakers/joshua-steinman.jpg", url: "https://www.galvanick.com/" },
  { name: "Scott Nolan", title: "Founder of General Matter", topic: "", img: "/speakers/scott-nolan.png", url: "https://generalmatter.com/" },
  { name: "Michael Gibson", title: "General Partner at 1517 Fund", topic: "", img: "/speakers/michael-gibson-bw.jpeg", url: "https://www.1517fund.com/" },
  { name: "Bryon Hargis", title: "Founder of Castelion", topic: "", img: "/speakers/bryon-hargis.webp", url: "https://castelion.com/" },
  { name: "Josh Manchester", title: "General Partner at Champion Hill Ventures", topic: "", img: "/speakers/josh-manchester-bw.jpg", url: "https://www.championhillventures.com/" },
];

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  const [flipped, setFlipped] = useState(false);

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
          {speaker.logo && (
            <div className="absolute top-3 left-3 right-3 flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={speaker.logo}
                alt={speaker.logoAlt ?? ""}
                className="max-w-[70%] h-[18px] sm:h-[20px] w-auto object-contain object-left opacity-90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          )}
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
          "radial-gradient(600px 500px at 80% 20%, rgba(116,94,160,0.13), transparent 70%), radial-gradient(520px 460px at 15% 90%, rgba(40,110,140,0.11), transparent 70%)",
      }}
    />
    <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
      <Reveal>
        <p className="font-mono text-[0.75rem] text-white/60 tracking-[0.14em] uppercase mb-3">
          Selected Past Speakers
        </p>
        <h2 className="font-freight text-[1.75rem] sm:text-[2.1rem] font-normal text-white mb-8 underline-reveal">
          Selected Past Speakers.
        </h2>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3 md:gap-4">
        {speakers.map((s, i) => (
          <Reveal key={s.name} delay={(i % 8) * 80} offset="sm">
            <SpeakerCard speaker={s} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Speakers;
