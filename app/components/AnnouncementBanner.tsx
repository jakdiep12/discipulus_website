import Link from "next/link";

const AnnouncementBanner: React.FC = () => {
  return (
    <Link href="https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q">
      <div className="w-full bg-white border-b border-navy/10 py-2 sm:py-1 px-4 z-50 relative hover:cursor-pointer hover:bg-white/90 transition-all duration-300 animate-fade-up">
        <div className="max-w-6xl mx-auto flex flex-row items-center justify-center gap-3 sm:gap-6 text-center">
          <div className="text-navy text-[0.78rem] sm:text-base text-center">
            APPLICATIONS LIVE: Apply to the Fall Cohort now!
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnnouncementBanner;
