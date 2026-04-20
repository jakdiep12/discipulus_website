"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CohortHead: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      id="explore"
      className="flex flex-col items-center justify-between pt-12 p-4 pb-12 bg-[url('/FoundingFathers.png')] bg-cover bg-[#1a121e] bg-center relative min-h-[90vh]"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Reduced opacity of overlay from 0.5 to 0.3 for better background visibility */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-30" />
      {/* Radial gradient overlay with different styles for mobile/desktop */}
      <div 
        className="absolute bottom-0 w-full h-full"
        style={{
          background: isMobile
            ? 'radial-gradient(circle at bottom center, black 0%, transparent 50%, transparent 100%)'
            : 'radial-gradient(ellipse 100% 110% at bottom center, black 0%, transparent 50%, transparent 100%)'
        }}
      />
      <div className="relative flex flex-col items-center z-10">
        <div className="h-[50vh] sm:h-[300px] md:h-[350px] xl:h-[300px] 2xl:h-[300px] mt-0 md:-mt-2" />
      </div>
      <div className="flex flex-col items-center mx-6 sm:mx-4 z-10 mb-0 lg:mb-4">
        <h1 className="font-freight text-[2.5rem] md:text-5xl lg:text-5xl 2xl:text-6xl font-bold text-center sm:px-8 mb-3">
          Discipulus Cohort
        </h1>
        <div className="flex flex-col pt-1 md:pt-2 font-regular text-[0.95rem] sm:text-md 2xl:text-lg max-w-[400px] md:max-w-[550px] text-center text-[#eee] sm:px-4 leading-[1.55]">
          Two week residency in <span className="el-segundo">El&nbsp;Segundo</span> with 10 other early-stage, value-aligned founders building hard tech and software for the national interest.
        </div>
        <div className="flex flex-col items-center justify-center pt-6 sm:pt-4">
          <Link href='https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q'>
            <div className="hover:cursor-pointer flex items-center text-black bg-white px-6 py-3 sm:px-4 sm:py-2 rounded-[75px] font-semibold text-[0.95rem] sm:text-md min-h-[48px] sm:min-h-0 transition-all duration-300 hover:bg-opacity-80 hover:scale-105">
              Apply now
            </div>
          </Link>
          <div className="text-white text-[0.9375rem] sm:text-sm mt-3 sm:mt-2 font-sans">
            Fall 2026
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CohortHead;
