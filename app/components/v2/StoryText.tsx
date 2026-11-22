"use client";

import React, { CSSProperties, useEffect, useMemo, useRef } from "react";
import { scrollManager } from "./scrollManager";

type Bit = string | React.ReactElement;

type BuiltWord = {
  node: React.ReactNode;
  counts: boolean;
  key: string;
};

function buildWords(bits: Bit[]): { words: BuiltWord[]; count: number } {
  const words: BuiltWord[] = [];
  let count = 0;
  bits.forEach((bit, bIdx) => {
    if (typeof bit === "string") {
      const parts = bit.split(/(\s+)/);
      parts.forEach((part, pIdx) => {
        if (part === "") return;
        const key = `b${bIdx}p${pIdx}`;
        if (/^\s+$/.test(part)) {
          words.push({ node: part, counts: false, key });
        } else {
          const i = count++;
          words.push({
            node: (
              <span className="story-word" style={{ "--i": i } as CSSProperties}>
                {part}
              </span>
            ),
            counts: true,
            key,
          });
        }
      });
    } else {
      // Bold-phrase token — entire element reveals as one unit.
      const i = count++;
      const key = `b${bIdx}el`;
      const existingClass = (bit.props as { className?: string })?.className || "";
      const existingStyle = (bit.props as { style?: CSSProperties })?.style || {};
      words.push({
        node: React.cloneElement(bit, {
          className: `${existingClass} story-word`.trim(),
          style: { ...existingStyle, "--i": i } as CSSProperties,
        } as Partial<unknown>),
        counts: true,
        key,
      });
    }
  });
  return { words, count };
}

interface StorySectionProps {
  children: React.ReactNode;
  /** Total word count across all StoryText children inside this section. */
  totalWords: number;
  className?: string;
  id?: string;
}

/**
 * Container for a generative story-scroll section. Measures each word's
 * position, then lets scrollManager drive --p as the section scrolls.
 */
export const StorySection: React.FC<StorySectionProps> = ({
  children,
  totalWords,
  className = "",
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Stamp every word with --y: its own vertical depth through the section
  // (0 = top, 1 = bottom). CSS reveals a word when the section's --p passes
  // its --y, so the reveal follows the text's real position rather than its
  // word index -- indexes run ahead wherever text is sparse, like headlines.
  // Re-measured on resize and after webfonts swap, since both reflow the text.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const measure = () => {
      const words = el.querySelectorAll<HTMLElement>(".story-word");
      if (!words.length) return;
      const top = el.getBoundingClientRect().top;
      const height = el.offsetHeight || 1;
      // Read every rect first, then write, so we don't thrash layout.
      const depths = Array.from(words, (w) => {
        const r = w.getBoundingClientRect();
        return (r.top + r.height / 2 - top) / height;
      });
      words.forEach((w, i) => w.style.setProperty("--y", depths[i].toFixed(4)));
    };

    measure();

    let timer: ReturnType<typeof setTimeout> | null = null;
    const remeasure = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(measure, 150);
    };
    const ro = new ResizeObserver(remeasure);
    ro.observe(el);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => {
      ro.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      el.style.setProperty("--p", "1");
      return;
    }

    // Scroll-paced reveal on every screen size: words appear as they cross
    // the reveal line, so the text moves with the finger instead of trailing
    // behind on a timer.
    return scrollManager.registerStory(el, totalWords);
  }, [totalWords]);

  return (
    <div
      ref={ref}
      id={id}
      className={`story-section ${className}`}
      style={{ "--p": "0" } as CSSProperties}
    >
      {children}
    </div>
  );
};

interface StoryTextProps {
  /** Array of text fragments or React elements (elements reveal as one unit). */
  bits: Bit[];
  /** Word index offset — pass cumulative count from preceding StoryText blocks. */
  offset: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Renders text split into word-spans for scroll-driven reveal.
 * Each word carries its global index via --i and, once measured, its vertical
 * depth via --y; CSS fades it in as the section's --p passes --y.
 */
export const StoryText: React.FC<StoryTextProps> = ({
  bits,
  offset,
  className = "",
  as = "p",
}) => {
  const built = useMemo(() => {
    const { words } = buildWords(bits);
    // Reindex with offset
    let localIdx = 0;
    const withOffset = words.map((w) => {
      if (!w.counts) return w;
      const absoluteIdx = offset + localIdx;
      localIdx++;
      if (React.isValidElement(w.node)) {
        const el = w.node as React.ReactElement<{ style?: CSSProperties }>;
        const currentStyle = el.props.style || {};
        return {
          ...w,
          node: React.cloneElement(el, {
            style: { ...currentStyle, "--i": absoluteIdx } as CSSProperties,
          }),
        };
      }
      return w;
    });
    return withOffset;
  }, [bits, offset]);

  const Tag = as as React.ElementType;
  return (
    <Tag className={className}>
      {built.map((w) => (
        <React.Fragment key={w.key}>{w.node}</React.Fragment>
      ))}
    </Tag>
  );
};

/** Count words in a set of bits (for pre-computing offsets). */
export function countWords(bits: Bit[]): number {
  return buildWords(bits).count;
}
