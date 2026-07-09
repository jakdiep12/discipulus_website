"use client";

import React from "react";
import Image from "next/image";
import NavbarV2 from "../components/v2/NavbarV2";

// Single path — swap this to change the cohort page hero image.
const HERO_IMAGE_SRC = "/palmer-cohort-group.jpeg";
const HERO_IMAGE_ALT = "Palmer Luckey with Discipulus Cohort founders";

export const CohortHero: React.FC = () => {
  return (
    <div className="relative w-full bg-navy">
      <NavbarV2 />

      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-10 pb-14 sm:pb-16">
        <div className="relative w-full aspect-[1920/1278] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <Image
            src={HERO_IMAGE_SRC}
            alt={HERO_IMAGE_ALT}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
};
