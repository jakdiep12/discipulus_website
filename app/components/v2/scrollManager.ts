"use client";

type StoryItem = {
  el: HTMLElement;
  totalWords: number;
};

/** Fraction of viewport height at which words flip from hidden to shown. */
const REVEAL_LINE = 0.62;

class ScrollManager {
  private storyItems = new Set<StoryItem>();
  private rafId: number | null = null;
  private initialized = false;
  private vh = 0;
  private isMobile = false;
  private resizeTimer: ReturnType<typeof setTimeout> | null = null;

  private ensureInit() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;
    this.measureViewport();
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("resize", this.onResize, { passive: true });
    this.schedule();
  }

  private measureViewport() {
    this.vh = window.innerHeight;
    this.isMobile = window.innerWidth < 768;
  }

  private onScroll = () => {
    this.schedule();
  };

  private onResize = () => {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.measureViewport();
      this.schedule();
    }, 150);
  };

  private schedule = () => {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(this.update);
  };

  private update = () => {
    this.rafId = null;
    const { vh, isMobile } = this;

    // Batch all reads before any writes so we never interleave
    // getBoundingClientRect() with style mutations (avoids forced layout
    // thrashing when multiple story sections are on screen at once).
    const reads = Array.from(this.storyItems, (item) => ({
      item,
      rect: item.el.getBoundingClientRect(),
    }));

    reads.forEach(({ item, rect }) => {
      if (rect.bottom < 0 || rect.top > vh) {
        // Fully off screen — snap to end state so it stays readable when back-scrolling.
        item.el.style.setProperty("--p", rect.bottom < 0 ? "1" : "0");
        return;
      }
      // StorySection handles mobile directly with a time-based reveal,
      // so nothing registers here on mobile.
      if (isMobile) return;
      // Reveal is tied to where the words actually sit on screen: everything
      // above the reveal line is shown, everything below is still hidden. A
      // word at relative depth p through the section reveals exactly as that
      // point crosses the line, so the pace always matches the scroll.
      //
      // Driving this off section-scroll progress over a fixed runway (the
      // previous approach) decoupled the two: the words' on-screen position
      // and their reveal moment drifted apart, which read as the top running
      // faster than the bottom.
      const line = vh * REVEAL_LINE;
      const raw = Math.max(0, Math.min(1, (line - rect.top) / Math.max(1, rect.height)));
      item.el.style.setProperty("--p", raw.toFixed(4));
    });
  };

  registerStory(el: HTMLElement, totalWords: number): () => void {
    this.ensureInit();
    el.style.setProperty("--p", "0");
    const item: StoryItem = { el, totalWords };
    this.storyItems.add(item);
    this.schedule();
    return () => {
      this.storyItems.delete(item);
      el.style.removeProperty("--p");
    };
  }
}

export const scrollManager = new ScrollManager();
