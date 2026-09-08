"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** One-time mobile-safe ScrollTrigger setup (iOS pin + scrub). */
export function ScrollSetup({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    ScrollTrigger.config({ ignoreMobileResize: true });

    if (!reduce && touch) {
      // Keeps pin/scrub stable on iOS Safari address-bar resize + touch scroll
      ScrollTrigger.normalizeScroll(true);
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", refresh);
    window.addEventListener("load", refresh);
    // fonts / images settling
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("orientationchange", refresh);
      window.removeEventListener("load", refresh);
      ScrollTrigger.normalizeScroll(false);
    };
  }, []);

  return <>{children}</>;
}
