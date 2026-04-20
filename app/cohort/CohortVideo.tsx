"use client";

import React from "react";

export const CohortVideo: React.FC = () => (
  <section className="py-10 sm:py-14">
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[760px] md:w-[68%]">
        <div className="relative aspect-video overflow-hidden border border-white/[0.06] media-glow">
          <video
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
      </div>
    </div>
  </section>
);
