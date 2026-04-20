"use client";

import { investors } from "../../data/investors";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const logoClass = "w-auto hover:cursor-pointer duration-500 hover:opacity-75";

const InvestorLogoSet = () => (
  <>
    {investors.map((v) => (
      <a
        key={v.id}
        href={v.href}
        className="flex items-center justify-center shrink-0"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={v.src}
          alt={v.id}
          width={150}
          height={45}
          className={`${logoClass} max-h-[35px] max-w-[90px] sm:max-h-[40px] sm:max-w-[120px]`}
        />
      </a>
    ))}
  </>
);

const Investors = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center space-y-4 text-center border-y-[0.5px] border-white border-opacity-25 py-8 bg-hh-gray overflow-hidden w-screen max-w-none ml-[calc(50%-50vw)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="font-medium text-md md:text-xl 2xl:text-2xl text-[#ccc]"
      >
        COHORT COMPANIES FUNDED BY
      </motion.div>
      {/* Infinite scrolling marquee — two copies for seamless loop */}
      <div className="w-full mt-6 overflow-hidden">
        <div
          className={`flex flex-nowrap gap-6 md:gap-8 items-center ${isInView ? "animate-investor-scroll" : ""}`}
          style={{ width: "max-content" }}
        >
          <div className="flex flex-nowrap gap-6 md:gap-8 items-center shrink-0">
            <InvestorLogoSet />
          </div>
          <div className="flex flex-nowrap gap-6 md:gap-8 items-center shrink-0" aria-hidden="true">
            <InvestorLogoSet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investors;
