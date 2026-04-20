"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const AnnouncementBanner: React.FC = () => {
  return (
    <Link href="https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full bg-navy border-b border-white/5 py-1 px-4 z-50 relative hover:cursor-pointer hover:bg-navy-2 transition-all duration-300"
      >
        <div className="max-w-6xl mx-auto flex flex-row items-center justify-center gap-3 sm:gap-6 text-center">
          <div className="text-white text-[0.65rem] sm:text-base text-center">
            APPLICATIONS LIVE: Apply to the Fall Cohort now!
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default AnnouncementBanner;
