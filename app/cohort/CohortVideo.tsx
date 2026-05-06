"use client";

import React, { useEffect, useRef } from "react";

export const CohortVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative bg-navy py-10 sm:py-14">
      <div className="relative w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full h-auto block"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/videos/2026_Spring_poster.jpg"
          >
            <source src="/videos/2026_Spring_web.mp4" type="video/mp4" />
          </video>
          {/* Soft gradient blends — fade all four edges into navy so the
              video doesn't sit as a hard rectangle. */}
          <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-b from-navy to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-navy to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-navy to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
