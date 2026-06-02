"use client";

import React from "react";
import { tweets } from "@/app/data/tweets";
import { Reveal, WordReveal } from "./useScrollEffects";

type TweetCardProps = {
  url: string;
};

const TweetCard: React.FC<TweetCardProps> = ({ url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex h-full min-h-[220px] flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] px-6 py-6 text-left transition-colors hover:border-white/25 hover:bg-white/[0.05]"
  >
    <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/45">
      Update
    </span>
    <span className="font-freight text-[1.45rem] leading-tight text-white">
      View this update from the Discipulus timeline.
    </span>
    <span className="text-[0.85rem] font-medium text-[#f7e3b5]/75 transition-colors group-hover:text-[#f7e3b5]">
      Open on X →
    </span>
  </a>
);

const RecentTweets: React.FC = () => (
  <section className="relative py-16 sm:py-20 bg-navy overflow-hidden">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(940px 820px at 15% 15%, rgba(60,110,200,0.36), transparent 68%), radial-gradient(900px 800px at 85% 85%, rgba(140,90,200,0.34), transparent 68%), radial-gradient(680px 620px at 55% 50%, rgba(48,160,200,0.22), transparent 70%)",
      }}
    />
    <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
      <WordReveal
        as="p"
        speed={35}
        className="font-mono text-[0.75rem] text-white/60 tracking-[0.16em] uppercase mb-3 font-semibold"
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 auto-rows-[460px] max-w-6xl mx-auto text-left"
      >
        {tweets.map((tweet, index) => (
          <Reveal key={tweet.id} delay={index * 80} offset="sm">
            <TweetCard url={tweet.url} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default RecentTweets;
