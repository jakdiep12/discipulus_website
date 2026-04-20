"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { investors } from "@/app/data/investors";
import { WordReveal } from "./useScrollEffects";

const LogoItem: React.FC<{ v: typeof investors[number] }> = ({ v }) => (
  <a
    href={v.href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-center shrink-0 px-8 sm:px-10 md:px-12"
  >
    <Image
      src={v.src}
      alt={v.id}
      width={220}
      height={22}
      className={`h-[16px] sm:h-[20px] md:h-[22px] w-auto opacity-90 shrink-0 hover:opacity-100 transition-opacity duration-300 ease-8vc${
        v.dark ? " brightness-0 invert" : ""
      }`}
    />
  </a>
);

/**
 * Infinite marquee — measures the first copy's pixel width (via
 * ResizeObserver so it updates once the images actually lay out) and
 * animates the track by that exact distance. Three copies guarantee
 * the viewport always has content to the right of the translation.
 */
const LogoMarquee: React.FC = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;

    let animation: Animation | null = null;
    let lastWidth = 0;

    const apply = () => {
      const width = strip.getBoundingClientRect().width;
      if (width < 10) return; // not laid out yet — wait for the next observation
      if (Math.abs(width - lastWidth) < 1 && animation?.playState === "running") return;
      lastWidth = width;
      animation?.cancel();
      // ~60 pixels per second → calm, readable pace.
      const duration = (width / 60) * 1000;
      animation = track.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: `translate3d(${-width}px, 0, 0)` },
        ],
        { duration, iterations: Infinity, easing: "linear" }
      );
    };

    // Initial attempt — may run before images load (width = 0) and retry
    // on the next ResizeObserver callback.
    apply();

    const ro = new ResizeObserver(() => apply());
    ro.observe(strip);
    window.addEventListener("resize", apply);

    return () => {
      animation?.cancel();
      ro.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  return (
    <section className="relative isolate z-0 py-14 sm:py-16 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-navy via-[#0a1328] to-navy">
      {/* Ambient glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 0%, rgba(232,220,200,0.10), transparent 70%), radial-gradient(50% 40% at 80% 100%, rgba(120,170,255,0.09), transparent 70%)",
        }}
      />

      <div className="relative">
        <WordReveal
          as="p"
          speed={35}
          className="font-sans text-[0.72rem] sm:text-[0.78rem] text-[#e8dcc8]/80 tracking-[0.2em] uppercase text-center mb-7 font-semibold"
        >
          Cohort companies funded by
        </WordReveal>

        {/* Edge fades — clip logo bleed against section boundary */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-navy to-transparent z-10" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-navy to-transparent z-10" />

        <div
          ref={trackRef}
          className="flex items-center w-max will-change-transform"
        >
          <div ref={stripRef} className="flex items-center shrink-0">
            {investors.map((v) => <LogoItem key={`a-${v.id}`} v={v} />)}
          </div>
          <div className="flex items-center shrink-0" aria-hidden="true">
            {investors.map((v) => <LogoItem key={`b-${v.id}`} v={v} />)}
          </div>
          <div className="flex items-center shrink-0" aria-hidden="true">
            {investors.map((v) => <LogoItem key={`c-${v.id}`} v={v} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
