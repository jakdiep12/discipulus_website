"use client";

import React from "react";

export const CohortVideo: React.FC = () => (
  <section className="relative py-10 sm:py-14 overflow-hidden">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 atmospheric-drift"
      style={{
        background:
          "radial-gradient(480px 420px at 15% 25%, rgba(70,130,190,0.14), transparent 72%), radial-gradient(440px 400px at 85% 70%, rgba(128,96,180,0.13), transparent 72%), radial-gradient(360px 340px at 50% 110%, rgba(64,180,190,0.11), transparent 70%)",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 atmospheric-drift-alt"
      style={{
        background:
          "radial-gradient(280px 260px at 80% 15%, rgba(48,120,180,0.11), transparent 72%), radial-gradient(320px 280px at 25% 90%, rgba(160,120,210,0.09), transparent 72%)",
      }}
    />
    <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[520px] md:w-[46%]">
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
