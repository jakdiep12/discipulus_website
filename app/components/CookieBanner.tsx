"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

/**
 * A notice, not a consent gate. This site loads no analytics or advertising
 * scripts, so there is no non-essential resource for an Accept /
 * Decline choice to switch on or off — offering one would be theatre. If a
 * third-party script is ever added, this needs to become a real gate that keeps
 * that script from loading until the visitor opts in.
 */
const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage blocked (private mode, hardened settings) — stay quiet.
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "acknowledged");
    } catch {
      // Nothing to persist to; hiding it for this page view is the best we can do.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p className="text-sm text-white/70 text-center sm:text-left">
        We use local storage for essential site preferences and don&apos;t run analytics or
        advertising scripts. See our{" "}
        <Link href="/cookies" className="underline hover:text-white transition-colors">
          Cookie Policy
        </Link>{" "}
        for details.
      </p>
      <button
        onClick={dismiss}
        className="flex-shrink-0 hover:cursor-pointer duration-500 hover:opacity-90 flex justify-center items-center text-navy bg-white px-4 py-2 rounded-[75px] font-semibold text-sm"
      >
        Got it
      </button>
    </div>
  );
};

export default CookieBanner;
