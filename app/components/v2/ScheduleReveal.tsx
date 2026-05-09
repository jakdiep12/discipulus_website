"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface ScheduleRevealProps {
  label: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

// Mirror of CohortCarousel's prefetch math — Next 15 default deviceSizes,
// pick the smallest >= 0.9 * innerWidth * DPR. Used to warm the larger
// optimized variant the lightbox will request, since the inline panel
// image fetches a smaller variant on desktop.
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const pickDeviceSize = (target: number) => {
  for (const s of DEVICE_SIZES) if (s >= target) return s;
  return DEVICE_SIZES[DEVICE_SIZES.length - 1];
};

const ScheduleReveal: React.FC<ScheduleRevealProps> = ({
  label,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
}) => {
  const [open, setOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const panelId = useId();
  const prefetched = useRef(false);

  // When the panel opens, warm the lightbox-size variant of this image so
  // clicking-to-zoom is instant. Inline panel renders at <=600px (sizes attr),
  // lightbox renders at 90vw — different optimized URLs on desktop.
  useEffect(() => {
    if (!open || prefetched.current) return;
    if (typeof window === "undefined") return;
    prefetched.current = true;
    const dpr = window.devicePixelRatio || 1;
    const target = Math.ceil(window.innerWidth * 0.9 * dpr);
    const w = pickDeviceSize(target);
    const img = new window.Image();
    img.src = `/_next/image?url=${encodeURIComponent(imageSrc)}&w=${w}&q=75`;
  }, [open, imageSrc]);

  // Esc closes the lightbox while it's open.
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-1.5 cursor-pointer text-left underline decoration-dotted decoration-white/40 underline-offset-[3px] hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy transition-colors duration-200 ease-8vc-out"
      >
        <span>{label}</span>
        <ChevronDown
          aria-hidden
          className={`h-3.5 w-3.5 shrink-0 text-[#f7e3b5]/60 transition-transform duration-200 ease-8vc-out group-hover:text-[#f7e3b5]/90 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {/* grid-rows 0fr → 1fr animates content height without a hardcoded
          max-height; child needs min-h-0 + overflow-hidden to clip during the
          transition. */}
      <div
        id={panelId}
        aria-hidden={!open}
        className="grid transition-[grid-template-rows] duration-[250ms] ease-8vc-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`View ${label} photo full size`}
            tabIndex={open ? 0 : -1}
            className={`group/img relative w-full max-w-[600px] mx-auto mt-3 overflow-hidden media-glow cursor-zoom-in transition-opacity duration-200 ease-8vc-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* eager: the panel is rendered with the section, so we want the
                browser to fetch as the page parses rather than wait until the
                user clicks (Next/Image's lazy default never trips here because
                the image lives in a 0-height grid row). */}
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              loading="eager"
              className="w-full h-auto transition-transform duration-500 ease-8vc group-hover/img:scale-[1.02]"
              sizes="(max-width: 1024px) 90vw, 600px"
            />
          </button>
        </div>
      </div>

      {/* Lightbox — same scale/treatment as the cohort carousel zoom view. */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={imageAlt}
          className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute top-8 right-4 sm:top-6 sm:right-6 text-[#f7e3b5]/70 hover:text-[#f7e3b5] text-3xl transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            &times;
          </button>
          <div
            className="relative w-[90vw] h-[90vh] max-w-[1200px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleReveal;
