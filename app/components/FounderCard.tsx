import { Founder } from "@/app/data/founders";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FounderCardProps {
  founder: Founder;
  onHover: (testimonial: string | undefined) => void;
  defaultHovered?: boolean;
}

const FounderCard: React.FC<FounderCardProps> = ({ founder, onHover, defaultHovered = false }) => {
  const [isHovered, setIsHovered] = useState(defaultHovered);

  // Set hover state based on defaultHovered prop (for mobile)
  useEffect(() => {
    setIsHovered(defaultHovered);
    if (defaultHovered && founder.testimonial) {
      onHover(founder.testimonial);
    }
  }, [defaultHovered, founder.testimonial, onHover]);

  const handleMouseEnter = () => {
    if (!defaultHovered) { // Only allow manual hover if not default hovered
    setIsHovered(true);
    onHover(founder.testimonial);
    }
  };

  const handleMouseLeave = () => {
    if (!defaultHovered) { // Only allow manual hover if not default hovered
    setIsHovered(false);
    onHover(undefined);
    }
  };

  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer h-full w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={founder.imageUrl}
          alt={founder.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isHovered ? "opacity-40" : "opacity-30"
        }`}
      />

      {/* Founder Name */}
      <div className="absolute top-4 left-0 right-0 text-center px-4">
        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
          {founder.name}
        </h3>
      </div>

      {/* Company Logo/Text and Description Container */}
      <div className="absolute bottom-0 left-6 right-6 flex flex-col items-center">
        <div
          className={`h-12 w-full relative transition-transform duration-300 flex items-center justify-center ${
            isHovered ? "-translate-y-3" : "translate-y-0"
          }`}
        >
          {founder.companyLogo ? (
            <div className={founder.companyLogoPadding ? `p-5 ${founder.companyLogoMarginBottom === 'less' ? 'mb-2' : 'mb-4'}` : undefined}>
              <Image
                src={founder.companyLogo}
                alt={`${founder.name}'s company logo`}
                width={128}
                height={48}
                className={`object-contain ${{
                  xsmall: 'max-h-6',
                  small: 'max-h-8',
                  large: 'max-h-16',
                  default: 'max-h-12',
                }[founder.companyLogoSize || 'default']}`}
              />
            </div>
          ) : (
            <div className={`text-white text-2xl ${founder.companyLogoFont || 'font-bold'}`}>
              {founder.companyLogoEmoji} <b>{founder.companyLogoText}</b>
            </div>
          )}
        </div>

        <div
          className={`transition-all duration-300 ${
            isHovered ? "opacity-100 -translate-y-4" : "opacity-0 translate-y-8 h-0"
          }`}
        >
          <p className="text-white text-center text-sm md:text-xs">
            {founder.companyDescription}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full w-full">
      {founder.companyLink ? (
        <Link href={founder.companyLink} target="_blank" className="block h-full w-full">
      {CardContent}
    </Link>
  ) : (
    CardContent
      )}
    </div>
  );
};

export default FounderCard;