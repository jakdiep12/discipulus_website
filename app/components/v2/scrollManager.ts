"use client";

type StoryItem = {
  el: HTMLElement;
  totalWords: number;
  /** How many viewport-heights of runway to use for the reveal range. */
  runway: number;
};

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
        const finished = rect.bottom < 0 ? item.totalWords : 0;
        item.el.style.setProperty("--reveal-count", String(finished));
        return;
      }
      // StorySection handles mobile directly with a time-based reveal,
      // so nothing registers here on mobile.
      if (isMobile) return;
      // Start revealing when the top of the section reaches 85% of viewport,
      // finish by the time the section has scrolled (runway) viewports past.
      const start = vh * 0.85;
      const end = -vh * (item.runway - 0.85);
      const raw = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      // Front-load the reveal: 60% of the words in the first 40% of scroll,
      // so headlines land immediately and the last few words trail at the end.
      const eased = raw < 0.4 ? raw * 1.5 : 0.6 + (raw - 0.4) * (2 / 3);
      item.el.style.setProperty("--reveal-count", String(eased * item.totalWords));
    });
  };

  registerStory(el: HTMLElement, totalWords: number, runway = 1.3): () => void {
    this.ensureInit();
    el.style.setProperty("--reveal-count", "0");
    const item: StoryItem = { el, totalWords, runway };
    this.storyItems.add(item);
    this.schedule();
    return () => {
      this.storyItems.delete(item);
      el.style.removeProperty("--reveal-count");
    };
  }
}

export const scrollManager = new ScrollManager();
