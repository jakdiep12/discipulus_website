"use client";

import React, { useRef, useEffect, useState } from "react";
import NavbarV2 from "./NavbarV2";
import { Reveal, WordReveal } from "./useScrollEffects";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      {/* Video with navbar overlaid on top */}
      <div className="relative w-full aspect-video sm:aspect-auto sm:h-[65vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/2026_Spring_poster.jpg"
          >
            <source src="/videos/2026_Spring_web.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Bottom fade — blends into navy below */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-navy to-transparent pointer-events-none" />

        {/* Navbar sits on top of the video */}
        <div className="absolute inset-x-0 top-0 z-30">
          <NavbarV2 transparent />
        </div>

        {/* Mute/Unmute button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 bg-black/50 backdrop-blur-md text-white/80 hover:text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg flex items-center gap-2 text-[0.7rem] sm:text-[0.8rem] font-medium transition-all duration-200 ease-8vc hover:bg-black/70 min-h-[44px]"
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.707a1 1 0 011.414.07zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.5 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.5l3.883-3.707a1 1 0 011.414.07zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          )}
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>

      {/* Hero text — below the video, on solid navy */}
      <div className="px-6 sm:px-10 lg:px-16 pt-14 pb-16 sm:pb-20 relative z-10">
        <div className="max-w-[1200px] mx-auto text-center">
          <WordReveal
            as="p"
            speed={30}
            className="font-mono text-[0.75rem] sm:text-[0.72rem] text-white/60 tracking-[0.14em] uppercase mb-3"
          >
            {"10-Day Founder Residency \u00B7 El Segundo, CA"}
          </WordReveal>

          <WordReveal
            as="h1"
            speed={55}
            delay={200}
            className="font-freight text-[clamp(2rem,5.5vw,4.6rem)] font-normal leading-[1.15] sm:leading-[1.1] text-white max-w-[900px] mx-auto mb-7 sm:mb-5 tracking-tight"
          >
            {"Cultivating a visionary vanguard of founders solving the West\u2019s hardest problems in El Segundo."}
          </WordReveal>

          <Reveal delay={900}>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center">
              <a
                href="https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-white text-navy px-7 py-4 sm:py-3.5 text-[0.875rem] sm:text-[0.8rem] font-semibold tracking-widest uppercase text-center w-full sm:w-auto min-h-[52px] sm:min-h-[44px] flex items-center justify-center hover:scale-[1.02] sm:hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 ease-8vc"
              >
                <span className="relative z-10">Apply now</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#e8dcc8]/60 to-transparent group-hover:translate-x-full transition-transform [transition-duration:900ms] ease-8vc-out" />
              </a>
              <a
                href="/cohort"
                className="text-white/70 sm:text-white/60 px-7 py-4 sm:py-3.5 text-[0.875rem] sm:text-[0.8rem] tracking-wider border border-white/15 sm:border-white/10 text-center w-full sm:w-auto min-h-[52px] sm:min-h-[44px] flex items-center justify-center hover:text-white hover:border-white/30 hover:bg-white/[0.03] transition-all duration-300 ease-8vc"
              >
                Learn more
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default Hero;
