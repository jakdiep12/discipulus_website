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
    <section className="relative overflow-hidden">
      <div className="relative w-full h-[28vh] sm:h-[32vh] lg:h-[36vh] overflow-hidden">
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
        <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-navy via-navy/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-navy via-navy/60 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
