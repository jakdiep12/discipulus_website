"use client";

import React from "react";
import Image from "next/image";
import { useParallax } from "../components/v2/useScrollEffects";

export const CohortHero: React.FC = () => {
  const ref = useParallax<HTMLDivElement>(0.3, 80);
  return (
    <div className="relative w-full aspect-[2/1] lg:aspect-[2.8/1] overflow-hidden">
      <div ref={ref} className="absolute inset-x-0 -top-[20%] h-[140%] will-change-transform">
        <Image
          src="/FoundingFathers.png"
          alt="Discipulus Cohort founders in front of the American flag"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-navy to-transparent pointer-events-none" />
    </div>
  );
};
