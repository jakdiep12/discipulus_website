"use client";

type ParallaxItem = {
  el: HTMLElement;
  speed: number;
  maxOffset?: number;
};

type StoryItem = {
  el: HTMLElement;
  totalWords: number;
  /** How many viewport-heights of runway to use for the reveal range. */
  runway: number;
};

class ScrollManager {
  private parallaxItems = new Set<ParallaxItem>();
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

    this.parallaxItems.forEach((item) => {
      const rect = item.el.getBoundingClientRect();
      // Skip elements far from the viewport
      if (rect.bottom < -vh || rect.top > vh * 2) return;
      if (isMobile) {
        // Mobile browsers resize the viewport as the address bar hides/shows,
        // which makes parallax offsets jump — keep content still instead.
        item.el.style.transform = "translate3d(0, 0, 0)";
        return;
      }
      const delta = vh / 2 - rect.top - rect.height / 2;
      let offset = delta * (1 - item.speed);
      if (item.maxOffset !== undefined) {
        const cap = item.maxOffset;
        offset = Math.max(-cap, Math.min(cap, offset));
      }
      item.el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });

    this.storyItems.forEach((item) => {
      const rect = item.el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) {
        // Fully off screen — snap to end state so it stays readable when back-scrolling.
        const finished = rect.bottom < 0 ? item.totalWords : 0;
        item.el.style.setProperty("--reveal-count", String(finished));
        return;
      }
      if (isMobile) {
        // Mobile: reveal all words as soon as section enters the viewport.
        // The scroll-paced reveal is frustrating with flick-scrolling and
        // short viewports, so we just fade everything in quickly.
        const start = vh * 0.9;
        const end = vh * 0.5;
        const raw = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
        item.el.style.setProperty("--reveal-count", String(raw * item.totalWords));
        return;
      }
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

  registerParallax(el: HTMLElement, speed: number, maxOffset?: number): () => void {
    this.ensureInit();
    const item: ParallaxItem = { el, speed, maxOffset };
    this.parallaxItems.add(item);
    this.schedule();
    return () => {
      this.parallaxItems.delete(item);
      el.style.transform = "";
    };
  }

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
