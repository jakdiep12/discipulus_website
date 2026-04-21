"use client";

import React from "react";
import Image from "next/image";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Reveal } from "./useScrollEffects";

interface Member {
  name: string;
  role: string;
  img: string;
  linkedin: string;
  twitter?: string;
}

const principals: Member[] = [
  {
    name: "Jakob Diepenbrock",
    role: "General Partner",
    img: "/team/jakob.png",
    linkedin: "https://www.linkedin.com/in/jakobdiepenbrock/",
    twitter: "https://x.com/jakobdiepen",
  },
  {
    name: "Augustus Doricko",
    role: "Venture Partner",
    img: "/team/augustus.png",
    linkedin: "https://www.linkedin.com/in/augustus-doricko-660b20145/",
    twitter: "https://x.com/ADoricko",
  },
];

const advisors: Member[] = [
  {
    name: "Josh Manchester",
    role: "Senior Advisor",
    img: "/team/josh.png",
    linkedin: "https://www.linkedin.com/in/josh-manchester-a717071/",
  },
  {
    name: "Kevin Hartz",
    role: "Senior Advisor",
    img: "/team/kevin.png",
    linkedin: "https://www.linkedin.com/in/hartz/",
    twitter: "https://x.com/kevinhartz",
  },
  {
    name: "Ben Kohlmann",
    role: "Senior Advisor",
    img: "/team/ben.png",
    linkedin: "https://www.linkedin.com/in/benjaminkohlmann/",
    twitter: "https://x.com/benkohlmann",
  },
  {
    name: "Josh Steinman",
    role: "Senior Advisor",
    img: "/team/joshua.png",
    linkedin: "https://www.linkedin.com/in/jmsteinman/",
    twitter: "https://x.com/joshuasteinman",
  },
  {
    name: "Isaiah Taylor",
    role: "Senior Advisor",
    img: "/team/isaiah.png",
    linkedin: "https://www.linkedin.com/in/isaiahptaylor/",
    twitter: "https://x.com/isaiah_p_taylor",
  },
];

interface TeamCardProps {
  member: Member;
  size?: "lg" | "sm";
}

const TeamCard: React.FC<TeamCardProps> = ({ member, size = "lg" }) => {
  const nameSize =
    size === "lg"
      ? "text-[1rem] sm:text-base md:text-lg"
      : "text-[0.95rem] sm:text-[0.85rem] md:text-[0.95rem]";
  const roleSize =
    size === "lg"
      ? "text-[0.82rem] sm:text-[0.78rem] md:text-[0.85rem]"
      : "text-[0.72rem] sm:text-[0.72rem] md:text-[0.78rem]";
  const padding = size === "lg" ? "p-4 md:p-5" : "p-3 md:p-3.5";
  const iconSize = size === "lg" ? 18 : 14;

  return (
    <div className="relative group w-full">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-navy-2 border border-white/5 group-hover:border-white/15 transition-all duration-300 ease-8vc">
        <Image
          src={member.img}
          alt={member.name}
          fill
          className="object-cover transition-all duration-500 ease-8vc group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, 320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className={`absolute bottom-0 left-0 right-0 ${padding} text-white`}>
          <h3 className={`font-sans font-semibold ${nameSize} leading-tight mb-0.5 tracking-tight`}>
            {member.name}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className={`${roleSize} text-white/70 font-light leading-snug`}>
              {member.role}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                <FaLinkedin size={iconSize} />
              </a>
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on X`}
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  <FaXTwitter size={iconSize} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamSection: React.FC = () => (
  <section id="team" className="relative py-20 sm:py-24 overflow-hidden">
    {/* Splotch — dark teal atmospheric wash */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 atmospheric-drift-alt"
      style={{
        background:
          "radial-gradient(960px 820px at 10% 20%, rgba(40,150,190,0.40), transparent 68%), radial-gradient(900px 800px at 90% 80%, rgba(110,70,180,0.38), transparent 68%), radial-gradient(720px 640px at 55% 55%, rgba(60,110,200,0.24), transparent 70%)",
      }}
    />
    <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
      <Reveal>
        <h2 className="font-freight text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-center text-white mb-10 sm:mb-14">
          Our Team.
        </h2>
      </Reveal>

      {/* Principals */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-14 sm:mb-16">
        {principals.map((p, i) => (
          <Reveal key={p.name} delay={i * 120}>
            <div className="w-full max-w-[20rem] sm:w-80">
              <TeamCard member={p} size="lg" />
            </div>
          </Reveal>
        ))}
      </div>

      {/* Advisors */}
      <Reveal>
        <h3 className="font-freight text-[1.65rem] sm:text-2xl md:text-3xl font-semibold text-center text-white/80 mb-6 sm:mb-8">
          Advisors
        </h3>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-5 max-w-3xl md:max-w-none mx-auto">
        {advisors.map((a, i) => (
          <Reveal key={a.name} delay={i * 80}>
            <TeamCard member={a} size="sm" />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
