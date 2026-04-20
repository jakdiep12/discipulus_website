"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal, useParallax } from "../v2/useScrollEffects";

const images = [
  "/cohort/cohort17.jpeg",
  "/cohort/cohort18.jpeg",
  "/cohort/cohort19.jpeg",
  "/cohort/cohort20.jpeg",
  "/cohort/cohort21.jpeg",
  "/cohort/cohort0.png",
  "/cohort/cohort1.jpeg",
  "/cohort/cohort2.jpeg",
  "/cohort/cohort3.jpeg",
  "/cohort/cohort4.jpeg",
  "/cohort/cohort5.jpeg",
  "/cohort/cohort6.jpeg",
  "/cohort/cohort7.jpeg",
  "/cohort/cohort8.jpeg",
  "/cohort/cohort9.jpeg",
  "/cohort/cohort10.jpeg",
  "/cohort/cohort11.jpeg",
  "/cohort/cohort12.jpeg",
  "/cohort/cohort13.jpeg",
  "/cohort/cohort14.jpeg",
  "/cohort/cohort15.jpeg",
  "/cohort/cohort16.jpeg",
];

const PhotoSet: React.FC<{ onSelect: (src: string) => void }> = ({ onSelect }) => (
  <div className="flex gap-1 shrink-0">
    {images.map((src, i) => (
      <button
        key={i}
        onClick={() => onSelect(src)}
        className="h-[160px] sm:h-[200px] md:h-[260px] lg:h-[320px] shrink-0 relative w-[160px] sm:w-[200px] md:w-[260px] lg:w-[320px] overflow-hidden group cursor-zoom-in"
      >
        <Image
          src={src}
          alt={`Cohort photo ${i + 1}`}
          fill
          sizes="320px"
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-8vc"
        />
      </button>
    ))}
  </div>
);

export function CohortCarousel() {
  const [selected, setSelected] = useState<string | null>(null);
  const parallaxRef = useParallax<HTMLDivElement>(0.3, 60);

  return (
    <section className="py-4 overflow-hidden">
      <Reveal>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-16 md:w-24 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />
          <div ref={parallaxRef} className="will-change-transform">
            <div className="flex gap-1 animate-photo-scroll" style={{ width: "max-content" }}>
              <PhotoSet onSelect={setSelected} />
              <PhotoSet onSelect={setSelected} />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center cursor-zoom-out"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-8 right-4 sm:top-6 sm:right-6 text-white/60 hover:text-white text-3xl transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative w-[90vw] h-[90vh] max-w-[1200px]">
            <Image
              src={selected}
              alt="Cohort photo zoomed"
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
