"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface NavbarV2Props {
  transparent?: boolean;
}

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/cohort", label: "Cohort" },
  { href: "/team", label: "Team" },
];

const NavbarV2: React.FC<NavbarV2Props> = ({ transparent = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const menuOverlay = (
    <div
      className={`fixed inset-0 z-[9999] md:hidden transition-opacity duration-300 ease-8vc ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!menuOpen}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/95 backdrop-blur-md"
        onClick={() => setMenuOpen(false)}
      />

      {/* Sliding panel from the right */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-[420px] bg-gradient-to-b from-navy via-navy-2 to-navy border-l border-white/10 flex flex-col transition-transform [transition-duration:450ms] ease-8vc-out shadow-[-20px_0_60px_rgba(0,0,0,0.5)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/5">
          <Image
            src="/Discipulus - Logo.png"
            alt="Discipulus Ventures"
            width={480}
            height={78}
            className="h-[28px] w-auto"
          />
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 -mr-2 text-white/80 hover:text-white transition-colors duration-300 ease-8vc min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col flex-1 px-6 py-8 gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-sans text-[1.25rem] font-medium tracking-tight transition-all duration-500 ease-8vc-out py-4 min-h-[56px] border-b border-white/5 flex items-center justify-between group ${
                menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              } ${pathname === link.href ? "text-white" : "text-white/75 hover:text-white"}`}
              style={{ transitionDelay: menuOpen ? `${120 + i * 70}ms` : "0ms" }}
            >
              <span>{link.label}</span>
              <span className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 ease-8vc">→</span>
            </Link>
          ))}

          <a
            href="https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className={`block w-full mt-8 bg-white text-navy px-6 py-5 text-[0.9rem] font-bold tracking-widest uppercase text-center min-h-[56px] transition-all duration-500 ease-8vc-out hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: menuOpen ? `${120 + navLinks.length * 70}ms` : "0ms" }}
          >
            Apply Now
          </a>

          <p
            className={`mt-auto font-mono text-[0.72rem] text-white/30 tracking-[0.16em] uppercase transition-opacity duration-500 ${
              menuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "500ms" : "0ms" }}
          >
            10-Day Founder Residency · <span className="el-segundo">El&nbsp;Segundo</span>, CA
          </p>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <nav className={`flex justify-between items-center px-5 sm:px-6 lg:px-12 py-4 sm:py-4 min-h-[64px] sm:min-h-0 z-50 ${
        transparent ? "bg-gradient-to-b from-black/50 via-black/25 to-transparent pb-10" : "sticky top-0 bg-navy/95 backdrop-blur-xl border-b border-white/5"
      }`}>
        <Link href="/" className="flex items-center">
          <Image
            src="/Discipulus - Logo.png"
            alt="Discipulus Ventures"
            width={480}
            height={78}
            className="h-[28px] sm:h-[40px] md:h-[56px] lg:h-[78px] w-auto"
            priority
          />
        </Link>
        <div className="flex gap-4 lg:gap-7 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.82rem] font-medium tracking-wide transition-all duration-300 ease-8vc hidden md:block ${
                pathname === link.href
                  ? "text-white border-b border-white/50 pb-0.5"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://web.miniextensions.com/Zliw55HfhOWXZnca7Q9Q"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white text-navy px-5 py-2 text-[0.76rem] font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 ease-8vc hidden md:inline-block"
          >
            <span className="relative z-10">Apply Now</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#e8dcc8]/60 to-transparent group-hover:translate-x-full transition-transform [transition-duration:900ms] ease-8vc-out" />
          </a>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col justify-center items-center gap-[6px] p-3 -mr-3 min-w-[48px] min-h-[48px]"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="block w-7 h-[2px] bg-white/90" />
            <span className="block w-7 h-[2px] bg-white/90" />
            <span className="block w-7 h-[2px] bg-white/90" />
          </button>
        </div>
      </nav>

      {mounted ? createPortal(menuOverlay, document.body) : null}
    </>
  );
};

export default NavbarV2;
