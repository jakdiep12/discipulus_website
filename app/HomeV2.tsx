"use client";

import PortalIntro from "./components/v2/PortalIntro";
import Hero from "./components/v2/Hero";
import LogoMarquee from "./components/v2/LogoMarquee";
import ManifestoV2 from "./components/v2/ManifestoV2";
import Press from "./components/v2/Press";
import RecentTweets from "./components/v2/RecentTweets";
import FooterV2 from "./components/v2/FooterV2";

const HomeV2: React.FC = () => {
  return (
    <PortalIntro>
    <div className="flex flex-col bg-navy text-white/80 font-sans min-h-screen max-w-full overflow-hidden antialiased">
      <main>
        {/* 1. Hero — video, tagline, Apply now / Learn more */}
        <Hero />
        {/* 2. Logo marquee (once) */}
        <LogoMarquee />
        {/* 3. Manifesto — conviction sections */}
        <ManifestoV2 />
        {/* 4. Recent updates / Press */}
        <Press />
        <RecentTweets />
      </main>
      <FooterV2 />
    </div>
    </PortalIntro>
  );
};

export default HomeV2;
