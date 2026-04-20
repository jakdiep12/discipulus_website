"use client";

import React, { useEffect, useRef, useState } from "react";
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
 * Infinite marquee — measures a single copy of the logo strip in pixels
 * and animates the track by exactly that distance so the seam lands on
 * identical content frame-for-frame. Uses the Web Animations API so the
 * animation driver can't round the percentage off or fall out of phase
 * when the viewport is wider than one strip.
 */
const LogoMarquee: React.FC = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;

    let animation: Animation | null = null;
    let raf = 0;

    const start = () => {
      const width = strip.getBoundingClientRect().width;
      if (width < 10) {
        // Images haven't laid out yet — try again next frame.
        raf = requestAnimationFrame(start);
        return;
      }
      animation?.cancel();
      // ~60 pixels per second gives a calm, readable pace.
      const duration = (width / 60) * 1000;
      animation = track.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: `translate3d(${-width}px, 0, 0)` },
        ],
        {
          duration,
          iterations: Infinity,
          easing: "linear",
        }
      );
      setReady(true);
    };

    // Wait for images to load so the strip width is final.
    const imgs = Array.from(strip.querySelectorAll("img"));
    let pending = imgs.filter((img) => !img.complete).length;
    if (pending === 0) {
      start();
    } else {
      const done = () => {
        pending -= 1;
        if (pending <= 0) start();
      };
      imgs.forEach((img) => {
        if (img.complete) return;
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });
    }

    const onResize = () => start();
    window.addEventListener("resize", onResize);

    return () => {
      animation?.cancel();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Render the strip twice — one measured, one a seamless continuation.
  // Web Animations drives the track by the measured strip's pixel width,
  // so the restart lands exactly on the duplicate. No gap, no jump.
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
          style={{ opacity: ready ? 1 : 0, transition: "opacity 300ms ease" }}
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
