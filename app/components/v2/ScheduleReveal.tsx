"use client";

import React, { useId, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface ScheduleRevealProps {
  label: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

const ScheduleReveal: React.FC<ScheduleRevealProps> = ({
  label,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
}) => {
  const [open, setOpen] = useState(false);
  const panelId = useId();

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
          className={`h-3.5 w-3.5 shrink-0 text-white/50 transition-transform duration-200 ease-8vc-out group-hover:text-white/80 motion-reduce:transition-none ${
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
          <div
            className={`relative w-full max-w-[600px] mt-3 overflow-hidden media-glow transition-opacity duration-200 ease-8vc-out motion-reduce:transition-none ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="w-full h-auto"
              sizes="(max-width: 1024px) 90vw, 600px"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleReveal;
