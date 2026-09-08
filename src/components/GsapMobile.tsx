"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** iOS/touch: normalize scroll so pin + scrub stay reliable */
export function GsapMobile() {
  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (touch) {
      ScrollTrigger.normalizeScroll(true);
      ScrollTrigger.config({ ignoreMobileResize: true });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", refresh);
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener("orientationchange", refresh);
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      if (touch) ScrollTrigger.normalizeScroll(false);
    };
  }, []);

  return null;
}
