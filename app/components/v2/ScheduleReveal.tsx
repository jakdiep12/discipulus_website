"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { useFocusTrap } from "@/lib/useFocusTrap";

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
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const prefetched = useRef(false);
  const lightboxRef = useFocusTrap<HTMLDivElement>(lightboxOpen);

  // Portal target only exists post-mount; gate on this so SSR doesn't crash.
  useEffect(() => {
    setMounted(true);
  }, []);

  // When the panel opens, warm the lightbox-size variant of this image so
  // clicking-to-zoom is instant. Inline panel renders at <=600px (sizes attr),
  // lightbox renders at 100vw — different optimized URLs on desktop.
  useEffect(() => {
    if (!open || prefetched.current) return;
    if (typeof window === "undefined") return;
    prefetched.current = true;
    const dpr = window.devicePixelRatio || 1;
    const target = Math.ceil(window.innerWidth * dpr);
    const w = pickDeviceSize(target);
    const img = new window.Image();
    img.src = `/_next/image?url=${encodeURIComponent(imageSrc)}&w=${w}&q=75`;
  }, [open, imageSrc]);

  // Closing the lightbox also collapses the inline panel — the user already
  // dismissed the deepest view, no point leaving the dropdown half-open
  // behind it.
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setOpen(false);
  }, []);

  // Esc closes the lightbox while it's open.
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox]);

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
      {/* inert (vs aria-hidden) blocks tab focus and pointer interaction
          on the entire panel subtree while collapsed — addresses the
          aria-hidden-with-focusable-descendant 4.1.2 audit flag. */}
      <div
        id={panelId}
        inert={!open ? true : undefined}
        className="grid transition-[grid-template-rows] duration-[250ms] ease-8vc-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`View ${label} photo full size`}
            className={`group/img block relative w-full max-w-[600px] mx-auto mt-3 overflow-hidden media-glow cursor-zoom-in transition-opacity duration-200 ease-8vc-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
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

      {/* Lightbox — portaled to <body> so it escapes any transformed ancestor
          (the schedule item lives inside a <Reveal> with translate/scale,
          which would otherwise become the containing block for position:fixed
          and shrink the lightbox to the cell's bounds). */}
      {lightboxOpen && mounted &&
        createPortal(
          <div
            ref={lightboxRef}
            role="dialog"
            aria-modal="true"
            aria-label={imageAlt}
            tabIndex={-1}
            className="fixed inset-0 z-[99999] bg-black/95 cursor-zoom-out focus:outline-none"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-[#f7e3b5] hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7e3b5]/70 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden />
            </button>
            <div
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ScheduleReveal;
