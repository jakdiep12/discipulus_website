"use client";

// TODO (Jakob feedback): curate "cool tweets" to embed here — waiting on
// the list of tweet URLs before implementing the embed refresh.
import React, { useEffect, useRef } from "react";
import { tweets } from "@/app/data/tweets";
import { Reveal, WordReveal } from "./useScrollEffects";

declare global {
  interface Window {
    twttr?: { widgets: { load: (el?: HTMLElement) => void } };
  }
}

const RecentTweets: React.FC = () => {
  const tweetRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    tweetRefs.current.forEach((ref, index) => {
      const tweet = tweets[index];
      if (!ref || !tweet) return;
      ref.innerHTML = "";
      const blockquote = document.createElement("blockquote");
      blockquote.setAttribute("class", "twitter-tweet");
      blockquote.setAttribute("data-theme", "dark");
      blockquote.setAttribute("data-dnt", "true");
      blockquote.setAttribute("data-conversation", "none");
      const link = document.createElement("a");
      link.setAttribute("href", tweet.url);
      blockquote.appendChild(link);
      ref.appendChild(blockquote);
    });

    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      "script[src='https://platform.twitter.com/widgets.js']"
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <section className="relative py-16 sm:py-20 bg-navy">
      <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
        <WordReveal
          as="p"
          speed={35}
          className="font-mono text-[0.75rem] text-white/40 tracking-[0.16em] uppercase mb-3 font-semibold"
        >
          Signal
        </WordReveal>
        <WordReveal
          as="h2"
          speed={55}
          delay={120}
          className="font-freight text-[2.1rem] font-normal text-white mb-7 tracking-tight"
        >
          From the timeline.
        </WordReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {tweets.map((tweet, index) => (
            <Reveal key={tweet.id} delay={index * 100} offset="sm">
              <div
                ref={(el) => {
                  tweetRefs.current[index] = el;
                }}
                className="w-full [&_.twitter-tweet]:!mx-0 [&_.twitter-tweet]:!my-0"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentTweets;
