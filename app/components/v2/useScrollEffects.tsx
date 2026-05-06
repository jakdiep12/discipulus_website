"use client";

import React, { useRef, useEffect, useState } from "react";

/**
 * Fade-up + slide on scroll into view
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip animation for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/**
 * Wrapper component: reveals children with fade-up + slide on scroll
 */
export const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "none";
  offset?: "sm" | "md";
}> = ({ children, className = "", delay = 0, direction = "up", offset = "md" }) => {
  const { ref, visible } = useReveal();

  const offsetY = offset === "sm" ? "translate-y-5" : "translate-y-8";
  const offsetX = offset === "sm" ? "translate-x-5" : "translate-x-8";

  const hidden = {
    up: `opacity-0 ${offsetY}`,
    left: `opacity-0 ${offsetX}`,
    right: `opacity-0 -${offsetX}`,
    scale: "opacity-0 scale-[0.97]",
    none: "opacity-0",
  }[direction];

  // Add 'revealed' class to decorative children that hook into it.
  useEffect(() => {
    if (visible && ref.current) {
      const els = ref.current.querySelectorAll('.underline-reveal, .keyword-highlight');
      els.forEach(el => el.classList.add('revealed'));
    }
  }, [visible, ref]);

  return (
    <div
      ref={ref}
      className={`transition-all [transition-duration:600ms] ease-8vc-out ${
        visible
          ? "opacity-100 translate-y-0 translate-x-0 scale-100"
          : hidden
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * Word-by-word text reveal — like AI generating text at reading pace
 * Splits text into words, each fades in sequentially on scroll
 */
export const WordReveal: React.FC<{
  children: string;
  className?: string;
  speed?: number;
  delay?: number;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "div" | "span" | "blockquote";
}> = ({ children, className = "", speed = 40, delay = 0, as = "p" }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const words = children.split(" ");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  const rendered: React.ReactNode[] = [];
  let i = 0;
  while (i < words.length) {
    const w = words[i];
    const next = words[i + 1];
    const delayMs = visible ? `${delay + i * speed}ms` : "0ms";
    const commonStyle = {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(4px)",
      transitionDelay: delayMs,
    } as const;
    const isElSegundo =
      /^El$/.test(w) && next && /^Segundo[.,!?:;]?$/.test(next);
    if (isElSegundo) {
      rendered.push(
        <span
          key={i}
          className="el-segundo inline-block transition-all duration-300 ease-8vc-out"
          style={commonStyle}
        >
          {w}&nbsp;{next}{i + 2 < words.length ? "\u00A0" : ""}
        </span>
      );
      i += 2;
      continue;
    }
    rendered.push(
      <span
        key={i}
        className="inline-block transition-all duration-300 ease-8vc-out"
        style={commonStyle}
      >
        {w}{i < words.length - 1 ? "\u00A0" : ""}
      </span>
    );
    i += 1;
  }
  return (
    <Tag ref={ref} className={className}>
      {rendered}
    </Tag>
  );
};

export const StaggerReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}> = ({ children, className = "", stagger = 80 }) => {
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, i) => (
        <div
          key={i}
          className={`transition-all duration-700 ease-8vc-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: `${i * stagger}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
