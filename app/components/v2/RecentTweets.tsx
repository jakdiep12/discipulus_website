"use client";

import React from "react";
import { Tweet } from "react-tweet";
import { tweets } from "@/app/data/tweets";
import { Reveal, WordReveal } from "./useScrollEffects";

const RecentTweets: React.FC = () => (
  <section className="relative py-16 sm:py-20 bg-navy overflow-hidden">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 atmospheric-drift"
      style={{
        background:
          "radial-gradient(940px 820px at 15% 15%, rgba(60,110,200,0.36), transparent 68%), radial-gradient(900px 800px at 85% 85%, rgba(140,90,200,0.34), transparent 68%), radial-gradient(680px 620px at 55% 50%, rgba(48,160,200,0.22), transparent 70%)",
      }}
    />
    <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
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
        className="font-freight text-[1.75rem] sm:text-[2.1rem] font-normal text-white mb-7 tracking-tight"
      >
        From the timeline.
      </WordReveal>
      <div
        data-theme="dark"
        className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto"
      >
        {tweets.map((tweet, index) => (
          <div
            key={tweet.id}
            className="w-full md:w-[calc(50%-1rem)]"
          >
            <Reveal delay={index * 100} offset="sm">
              <div className="[&_article]:!m-0 [&_.react-tweet-theme]:!m-0">
                <Tweet id={tweet.id} />
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default RecentTweets;
