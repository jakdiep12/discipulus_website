"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { Reveal } from "../v2/useScrollEffects";

// Next 15 default deviceSizes (no override in next.config.js). The lightbox
// renders <Image fill sizes="90vw">, so the URL Next requests at runtime is
// `/_next/image?url=…&w=<deviceSize>&q=75` where <deviceSize> is the smallest
// in this list that's ≥ 0.9 × innerWidth × devicePixelRatio. We mirror that
// so the prefetch link matches the lightbox's request exactly.
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const pickDeviceSize = (target: number) => {
  for (const s of DEVICE_SIZES) if (s >= target) return s;
  return DEVICE_SIZES[DEVICE_SIZES.length - 1];
};

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

const PhotoSet: React.FC<{
  onSelect: (src: string) => void;
  onPrefetch: (src: string) => void;
}> = ({ onSelect, onPrefetch }) => (
  <div className="flex gap-1 shrink-0">
    {images.map((src, i) => (
      <button
        key={i}
        onClick={() => onSelect(src)}
        onMouseEnter={() => onPrefetch(src)}
        onFocus={() => onPrefetch(src)}
        onTouchStart={() => onPrefetch(src)}
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
  const prefetched = useRef<Set<string>>(new Set());

  const prefetch = useCallback((src: string) => {
    if (typeof window === "undefined") return;
    if (prefetched.current.has(src)) return;
    prefetched.current.add(src);
    const dpr = window.devicePixelRatio || 1;
    const target = Math.ceil(window.innerWidth * 0.9 * dpr);
    const w = pickDeviceSize(target);
    // new Image().src triggers a browser fetch into the HTTP cache. When the
    // lightbox mounts <Image fill sizes="90vw">, Next requests the same URL
    // and the browser serves it from cache — click feels instant.
    const img = new window.Image();
    img.src = `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;
  }, []);

  return (
    <section className="py-4 overflow-hidden">
      <Reveal>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-16 md:w-24 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />
          <div>
            <div className="flex gap-1 animate-photo-scroll" style={{ width: "max-content" }}>
              <PhotoSet onSelect={setSelected} onPrefetch={prefetch} />
              <PhotoSet onSelect={setSelected} onPrefetch={prefetch} />
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
