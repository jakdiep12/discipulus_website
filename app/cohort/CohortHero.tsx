"use client";

import React from "react";
import Image from "next/image";

// Single path — swap this to change the cohort page hero image.
const HERO_IMAGE_SRC = "/palmer-cohort-group.jpeg";
const HERO_IMAGE_ALT = "Palmer Luckey with Discipulus Cohort founders";

export const CohortHero: React.FC = () => {
  return (
    <div className="relative w-full bg-navy">
      <div className="relative w-full aspect-[3/2] sm:aspect-[16/9] lg:aspect-[2/1] max-h-[80vh]">
        <Image
          src={HERO_IMAGE_SRC}
          alt={HERO_IMAGE_ALT}
          fill
          className="object-contain object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-navy to-transparent pointer-events-none" />
    </div>
  );
};
