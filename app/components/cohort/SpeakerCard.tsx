"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface SpeakerCardProps {
  name: string;
  title: string;
  imageUrl: string;
  imagePosition?: string;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ name, title, imageUrl, imagePosition }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isHovered ? "opacity-40" : "opacity-30"
        }`}
      />

      {/* Speaker Name */}
      <div className="absolute top-4 left-0 right-0 text-center px-4">
        <h3 className="text-xs md:text-lg lg:text-lg font-bold text-white">
          {name}
        </h3>
      </div>

      {/* Speaker Title */}
      <div className="absolute bottom-2 md:bottom-4 left-0 right-0 text-center px-4">
        <p className={`text-xs md:text-xs lg:text-xs text-white transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          {title}
        </p>
      </div>
    </motion.div>
  );
};

// Rest of the file remains the same...

const speakers = [
  // Row 1
  {
    name: "Augustus Doricko",
    title: "Founder of Rainmaker",
    imageUrl: "/speakers/augustus-doricko-bw.jpg"
  },
  {
    name: "Tom Mueller",
    title: "Founder of Impulse Space",
    imageUrl: "/speakers/tom-mueller-bw.png"
  },
  {
    name: "Isaiah Taylor",
    title: "Founder of Valar Atomics",
    imageUrl: "/speakers/isaiah-taylor.jpg"
  },
  {
    name: "Katherine Boyle",
    title: "General Partner at a16z",
    imageUrl: "/speakers/katherine-boyle-bw.jpg"
  },
  // Row 2 (was 4th row)
  {
    name: "Dan Piemont",
    title: "Founder of Long Wall",
    imageUrl: "/speakers/danpiemont.jpeg",
    imagePosition: "center top",
  },
  {
    name: "Shaun Maguire",
    title: "Partner at Sequoia Capital",
    imageUrl: "/speakers/shaun maguire.png",
  },
  {
    name: "Saif Khawaja",
    title: "Founder of Shinkei Systems",
    imageUrl: "/speakers/saif.png",
  },
  {
    name: "Kevin Hartz",
    title: "General Partner at A*",
    imageUrl: "/speakers/kevinhartz.jpg",
  },
  // Row 3 (was 2nd row)
  {
    name: "Delian Asparouhov",
    title: "Founder of Varda Space",
    imageUrl: "/speakers/delian-asparouhov.webp"
  },
  {
    name: "Chris Power",
    title: "Founder of Hadrian",
    imageUrl: "/speakers/chris-power-bw.jpg"
  },
  {
    name: "Nathan Mintz",
    title: "Founder of CX2",
    imageUrl: "/speakers/nathan-mintz.webp"
  },
  {
    name: "Josh Steinman",
    title: "Founder of Galvanick",
    imageUrl: "/speakers/joshua-steinman.jpg"
  },
  // Row 4 (was 3rd row)
  {
    name: "Scott Nolan",
    title: "Founder of General Matter",
    imageUrl: "/speakers/scott-nolan.png"
  },
  {
    name: "Michael Gibson",
    title: "General Partner at 1517 Fund",
    imageUrl: "/speakers/michael-gibson-bw.jpeg"
  },
  {
    name: "Bryon Hargis",
    title: "Founder of Castelion",
    imageUrl: "/speakers/bryon-hargis.webp"
  },
  {
    name: "Josh Manchester",
    title: "General Partner at Champion Hill Ventures",
    imageUrl: "/speakers/josh-manchester-bw.jpg"
  },
];

const SpeakerGrid: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 768px is the 'md' breakpoint in Tailwind
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const initialDisplayCount = isMobile ? 4 : 8;

  return (
    <div className='flex flex-col items-center justify-center mt-4 md:mt-12'>
      <h1 className='font-freight text-3xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-center w-[400px] md:w-[600px] lg:w-[700px] xl:w-[750px] 2xl:w-[800px] sm:px-8 mb-4 mt-4 md:mt-0'>
        Selected Past Speakers.
      </h1>
      <div className='flex justify-center w-full px-16 lg:px-8 mt-4'>
        <div className="relative w-full max-w-md md:max-w-lg lg:max-w-4xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 lg:gap-4"
            animate={{ height: isExpanded ? "auto" : "auto" }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: isExpanded ? '4rem' : '0' }}
          >
            {speakers.slice(0, isExpanded ? speakers.length : initialDisplayCount).map((speaker, index) => (
              <SpeakerCard
                key={index}
                name={speaker.name}
                title={speaker.title}
                imageUrl={speaker.imageUrl}
                imagePosition={speaker.imagePosition}
              />
            ))}
          </motion.div>

          {/* Gradient Overlay */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0E0A0E] from-0% via-[#0E0A0E] via-30% to-transparent"
            animate={{ 
              height: isExpanded ? "0px" : "200px",
              opacity: isExpanded ? 0 : 1 
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Expand/Collapse Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 z-10
                     flex items-center justify-center gap-2 px-4 py-2 
                     text-white hover:text-gray-300 transition-colors"
            animate={{ 
              bottom: isExpanded ? "0px" : "20px",
            }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <IoIosArrowUp size={24} />
              </>
            ) : (
              <>
                <span>Show More</span>
                <IoIosArrowDown size={24} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SpeakerGrid;