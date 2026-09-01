"use client";

import React, { useEffect, useState, useRef } from "react";

interface PortalIntroProps {
  children: React.ReactNode;
}

const EASE = "cubic-bezier(.19,1,.22,1)";

const PortalIntro: React.FC<PortalIntroProps> = ({ children }) => {
  const [phase, setPhase] = useState<"check" | "animating" | "done">("check");
  const logoRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      sessionStorage.getItem("discipulus-portal-seen") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setPhase("done");
    } else {
      setPhase("animating");
    }
  }, []);

  useEffect(() => {
    if (phase !== "animating") return;

    const logo = logoRef.current;
    const overlay = overlayRef.current;
    if (!logo || !overlay) return;

    let started = false;
    let cancel: (() => void) | undefined;

    // The image `load` event and the safety timer race each other; whichever
    // fires first owns the animation, so the loser must not start a second
    // requestAnimationFrame loop that would then never be cancelled.
    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      // Total ~2.6s: 700ms fade-in + 1200ms hold/scale + 700ms fade-out
      const FADE_IN = 700;
      const HOLD = 1200;
      const FADE_OUT = 700;
      const TOTAL = FADE_IN + HOLD + FADE_OUT;

      let id: number;

      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(elapsed / TOTAL, 1);

        // Eased progress for scale (cubic ease-out to approximate the bezier)
        const eased = 1 - Math.pow(1 - t, 3);
        const scale = 0.85 + eased * 0.3; // 0.85 → 1.15

        // Logo opacity
        let logoAlpha = 1;
        if (elapsed < FADE_IN) {
          logoAlpha = elapsed / FADE_IN;
        } else if (elapsed > FADE_IN + HOLD) {
          logoAlpha = 1 - (elapsed - FADE_IN - HOLD) / FADE_OUT;
        }

        // Overlay stays solid until fade-out phase
        let overlayAlpha = 1;
        if (elapsed > FADE_IN + HOLD) {
          overlayAlpha = 1 - (elapsed - FADE_IN - HOLD) / FADE_OUT;
        }

        logo.style.opacity = String(Math.max(logoAlpha, 0));
        logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
        overlay.style.opacity = String(Math.max(overlayAlpha, 0));

        if (t < 1) {
          id = requestAnimationFrame(tick);
        } else {
          sessionStorage.setItem("discipulus-portal-seen", "1");
          setPhase("done");
        }
      };

      id = requestAnimationFrame(tick);
      cancel = () => cancelAnimationFrame(id);
    };

    // Start once the logo image is ready, with a timer so a slow or failed
    // image load does not leave the overlay up forever.
    const onLoad = () => run();
    if (logo.complete && logo.naturalWidth > 0) {
      run();
    } else {
      logo.addEventListener("load", onLoad);
    }
    const safety = setTimeout(run, 400);

    return () => {
      logo.removeEventListener("load", onLoad);
      clearTimeout(safety);
      cancel?.();
    };
  }, [phase]);

  if (phase === "done") return <>{children}</>;

  // `children` renders in every phase, including the pre-mount "check" pass, so
  // the page has real server-rendered HTML underneath. Returning null here
  // instead would leave the whole document empty until hydration.

  return (
    <>
      {children}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-navy"
        style={{ zIndex: 99999, transition: `opacity 0.7s ${EASE}` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src="/Discipulus - Logo Small.png"
          alt=""
          className="absolute top-1/2 left-1/2 w-[108px] h-auto pointer-events-none"
          style={{
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.85)",
          }}
          aria-hidden="true"
        />
      </div>
    </>
  );
};

export default PortalIntro;
