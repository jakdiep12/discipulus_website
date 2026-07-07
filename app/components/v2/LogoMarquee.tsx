"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { investors } from "@/app/data/investors";
import { WordReveal } from "./useScrollEffects";

const LogoItem: React.FC<{ v: typeof investors[number] }> = ({ v }) => (
  <a
    href={v.href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center shrink-0 px-8 sm:px-10 md:px-12"
  >
    <Image
      src={v.src}
      alt={v.id}
      width={220}
      height={22}
      sizes="220px"
      className={`h-[18px] sm:h-[20px] md:h-[22px] w-auto opacity-90 shrink-0 hover:opacity-100 transition-opacity duration-300 ease-8vc${
        v.dark ? " brightness-0 invert" : ""
      }`}
      style={v.scale ? { transform: `scale(${v.scale})` } : undefined}
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
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const apply = () => {
      const width = strip.getBoundingClientRect().width;
      if (width < 10) return; // not laid out yet — wait for the next observation
      if (Math.abs(width - lastWidth) < 1 && animation?.playState === "running") return;

      // Carry over how far through the current loop we already were, so
      // a mid-flight restart (e.g. a late-loading image nudging the
      // strip's width) continues the roll instead of snapping back to
      // frame 0 — that snap is what read as the animation "starting over".
      let progress = 0;
      if (animation && lastWidth > 0) {
        const elapsed = Number(animation.currentTime ?? 0);
        const oldDuration = (lastWidth / 60) * 1000;
        progress = oldDuration > 0 ? (elapsed % oldDuration) / oldDuration : 0;
      }

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
      animation.currentTime = progress * duration;
    };

    // Debounce: logos load in one at a time, each shifting the strip's
    // width and firing the observer. Without this, every incremental
    // image load restarts the animation from position 0, which reads as
    // a visible stutter/reset instead of one smooth loop.
    const scheduleApply = () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(apply, 200);
    };

    scheduleApply();

    const ro = new ResizeObserver(() => scheduleApply());
    ro.observe(strip);
    window.addEventListener("resize", scheduleApply);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      animation?.cancel();
      ro.disconnect();
      window.removeEventListener("resize", scheduleApply);
    };
  }, []);

  return (
    <section className="relative isolate z-0 py-14 sm:py-16 overflow-hidden bg-gradient-to-b from-navy via-[#0a1328] to-navy">
      {/* Ambient glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(85% 60% at 20% 0%, rgba(232,220,200,0.22), transparent 68%), radial-gradient(75% 60% at 80% 100%, rgba(120,170,255,0.24), transparent 68%), radial-gradient(55% 50% at 50% 50%, rgba(140,100,200,0.16), transparent 70%)",
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
