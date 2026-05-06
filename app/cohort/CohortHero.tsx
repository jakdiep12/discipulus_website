"use client";

import React from "react";
import Image from "next/image";
import NavbarV2 from "../components/v2/NavbarV2";

// Single path — swap this to change the cohort page hero image.
const HERO_IMAGE_SRC = "/palmer-cohort-group.jpeg";
const HERO_IMAGE_ALT = "Palmer Luckey with Discipulus Cohort founders";

export const CohortHero: React.FC = () => {
  return (
    <div className="relative w-full aspect-[3/2] sm:aspect-auto sm:h-[65vh] md:h-[80vh] lg:h-[90vh] overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE_SRC}
          alt={HERO_IMAGE_ALT}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      {/* Bottom fade — blends into navy below (matches landing Hero) */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-navy to-transparent pointer-events-none" />

      {/* Navbar sits on top of the photo */}
      <div className="absolute inset-x-0 top-0 z-30">
        <NavbarV2 transparent />
      </div>
    </div>
  );
};
