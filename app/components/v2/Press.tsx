"use client";

import React from "react";
import Image from "next/image";
import { Reveal, WordReveal } from "./useScrollEffects";

const articles: Array<{
  outlet: string;
  logo: string;
  title: string;
  date: string;
  preview: React.ReactNode;
  url: string;
}> = [
  {
    outlet: "Forbes",
    logo: "/news/forbes.png",
    title: "Silicon Valley's 'Gundo' Bros Are Building A Y Combinator For Military Tech",
    date: "February 10, 2025",
    preview: (
      <>Inside the <span className="el-segundo">El&nbsp;Segundo</span> Cohort building the next generation of defense tech founders.</>
    ),
    url: "https://www.forbes.com/sites/davidjeans/2025/02/10/silicon-valley-gundo-bros-ycombinator/",
  },
  {
    outlet: "TechCrunch",
    logo: "/news/techcrunch.png",
    title: "Discipulus Ventures mentors young founders to revive a Norman Rockwell vision of America",
    date: "March 26, 2024",
    preview: "A new Cohort model for value-aligned founders building for the Western interest.",
    url: "https://techcrunch.com/2024/03/26/discipluus-ventures-mentors-founders-norman-rockwell-america/",
  },
  {
    outlet: "LA Business Journal",
    logo: "/news/labj.png",
    title: "Military Culture in Tech?",
    date: "June 23, 2025",
    preview: (
      <>How <span className="el-segundo">El&nbsp;Segundo</span> is becoming the center of gravity for American hard tech.</>
    ),
    url: "https://labusinessjournal.com/featured/military-culture-in-tech/",
  },
  {
    outlet: "Deseret News",
    logo: "/news/deseret.png",
    title: "'Software is dead.' See what's next in El Segundo",
    date: "April 21, 2026",
    preview: (
      <>How Jakob Diepenbrock&rsquo;s Discipulus Ventures is leading a hard-tech renaissance in <span className="el-segundo">El&nbsp;Segundo</span>.</>
    ),
    url: "https://www.deseret.com/u-s-world/2026/04/21/el-segundo-hard-tech-hub-jakob-diepenbrock/?utm_source=twitter&utm_medium=dn-social&utm_campaign=twitter&utm_content=deseretnews",
  },
  {
    outlet: "Axios",
    logo: "/news/axios.png",
    title: "Exclusive: Discipulus Ventures closes $30M hard-tech fund",
    date: "June 29, 2026",
    preview: "A $30 million Fund II targeting startups in defense tech, energy, mining, manufacturing, and other critical industries.",
    url: "https://www.axios.com/pro/climate-deals/2026/06/29/discipulus-ventures-jakob-diepenbrock-fund-ii",
  },
  {
    outlet: "iConnections",
    logo: "/news/iconnections.png",
    title: "10 Founders. 1 House. 1 Chef. This Is How Hard Tech Gets Built",
    date: "March 5, 2026",
    preview: (
      <>Jakob Diepenbrock on the cohort model behind Discipulus Ventures&rsquo; 4x first fund &mdash; ten founders living together in <span className="el-segundo">El&nbsp;Segundo</span>.</>
    ),
    url: "https://iconnections.io/insights/video/10-founders-1-house-1-chef-this-is-how-hard-tech-gets-built-global-alts-miami-2026/",
  },
];

const Press: React.FC = () => (
  <section className="relative py-16 sm:py-20 bg-navy overflow-hidden">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(960px 840px at 85% 15%, rgba(140,90,200,0.36), transparent 68%), radial-gradient(900px 800px at 10% 85%, rgba(60,100,170,0.34), transparent 68%), radial-gradient(700px 620px at 50% 55%, rgba(48,160,200,0.22), transparent 70%)",
      }}
    />
    <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
      <WordReveal
        as="p"
        speed={35}
        className="font-mono text-[0.78rem] sm:text-[0.75rem] text-white/60 tracking-[0.16em] uppercase mb-5 font-semibold text-center"
      >
        In the press
      </WordReveal>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08]">
        {articles.map((a, i) => (
          <a
            key={a.outlet}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer block bg-navy-2 border-l-2 border-l-transparent p-6 lg:p-7 hover:bg-navy-3 hover:border-l-white/30 transition-all duration-300 ease-8vc group"
          >
            <Reveal delay={i * 120}>
              <div className="h-[36px] mb-3 flex items-center">
                <Image
                  src={a.logo}
                  alt=""
                  width={180}
                  height={36}
                  sizes="180px"
                  className="h-[30px] sm:h-[34px] w-auto object-contain brightness-0 invert opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </Reveal>
            <WordReveal
              as="div"
              speed={28}
              delay={i * 120 + 120}
              className="font-sans text-[0.95rem] text-white leading-snug font-semibold mb-1.5 group-hover:underline underline-offset-2 decoration-white/30 transition-all duration-300"
            >
              {a.title}
            </WordReveal>
            <Reveal delay={i * 120 + 200}>
              {/* Preview snippet — appears on hover */}
              <div className="text-[0.875rem] text-white/70 leading-[1.6] mb-2 max-h-0 overflow-hidden group-hover:max-h-[80px] group-active:max-h-[80px] transition-all duration-500 ease-8vc-out">
                {a.preview}
              </div>
              <div className="text-[0.75rem] text-white/65 group-hover:text-white/85 tracking-wide transition-colors duration-300">
                {a.date} →
              </div>
            </Reveal>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Press;
