"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { investors } from "@/app/data/investors";
import { WordReveal } from "./useScrollEffects";

// Two size tiers only — written as full literal class strings (not built
// from a runtime template) so Tailwind's static scanner picks both up.
// A `transform: scale()` approach was tried first, but it shrinks the
// image visually while leaving its layout box (and the surrounding gap)
// full-size, which read as extra whitespace around the scaled logos.
// Setting the real height instead shrinks the box itself.
const FULL_SIZE = "h-[18px] sm:h-[20px] md:h-[22px]";
const TWO_THIRDS_SIZE = "h-[12px] sm:h-[13.33px] md:h-[14.67px]";

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
      loading="eager"
      className={`${v.scale ? TWO_THIRDS_SIZE : FULL_SIZE} w-auto opacity-90 shrink-0 hover:opacity-100 transition-opacity duration-300 ease-8vc${
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
    let resizeDebounce: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const runAnimation = (width: number) => {
      lastWidth = width;
      // ~60 pixels per second → calm, readable pace.
      const duration = (width / 60) * 1000;
      animation = track.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: `translate3d(${-width}px, 0, 0)` },
        ],
        { duration, iterations: Infinity, easing: "linear" }
      );
      return duration;
    };

    // Start only once every logo image has actually loaded (not on a
    // fixed debounce timer). Each image loading in shifts the strip's
    // pixel width, so starting before they're all in would immediately
    // require a restart — the "shows one new logo, then starts over"
    // glitch. Waiting for a real load-complete signal removes the guesswork.
    const start = () => {
      if (cancelled || animation) return;
      const width = strip.getBoundingClientRect().width;
      if (width < 10) return;
      runAnimation(width);
    };

    const imgs = Array.from(strip.querySelectorAll("img"));
    const pending = imgs.filter((img) => !img.complete);
    if (pending.length === 0) {
      start();
    } else {
      let remaining = pending.length;
      const onOneDone = () => {
        remaining -= 1;
        if (remaining <= 0) start();
      };
      pending.forEach((img) => {
        img.addEventListener("load", onOneDone, { once: true });
        img.addEventListener("error", onOneDone, { once: true });
      });
    }

    // After the initial start, only a genuine viewport resize should
    // change the loop width. Carry over playback progress so that
    // doesn't visibly reset the roll either.
    const handleResize = () => {
      if (!animation) return;
      const width = strip.getBoundingClientRect().width;
      if (width < 10 || Math.abs(width - lastWidth) < 1) return;
      const elapsed = Number(animation.currentTime ?? 0);
      const oldDuration = (lastWidth / 60) * 1000;
      const progress = oldDuration > 0 ? (elapsed % oldDuration) / oldDuration : 0;
      animation.cancel();
      const duration = runAnimation(width);
      animation!.currentTime = progress * duration;
    };

    const scheduleResize = () => {
      if (resizeDebounce) clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(handleResize, 150);
    };

    const ro = new ResizeObserver(() => scheduleResize());
    ro.observe(strip);
    window.addEventListener("resize", scheduleResize);

    return () => {
      cancelled = true;
      if (resizeDebounce) clearTimeout(resizeDebounce);
      animation?.cancel();
      ro.disconnect();
      window.removeEventListener("resize", scheduleResize);
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
