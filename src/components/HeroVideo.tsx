"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { SITE, asset } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export function HeroVideo() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const targetTime = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const sec = section.current;
    const vid = video.current;
    const copyEl = copy.current;
    if (!sec || !vid || !copyEl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    // iOS needs these before seeking works reliably
    vid.muted = true;
    vid.playsInline = true;
    vid.setAttribute("playsinline", "true");
    vid.setAttribute("webkit-playsinline", "true");
    vid.preload = "auto";

    const tick = () => {
      if (!vid.duration || Number.isNaN(vid.duration)) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      const diff = targetTime.current - vid.currentTime;
      if (Math.abs(diff) > 0.04) {
        // Soft seek — hard currentTime spam breaks on mobile Safari
        try {
          vid.currentTime = targetTime.current;
        } catch {
          /* ignore transient seek errors */
        }
      }
      raf.current = requestAnimationFrame(tick);
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        copyEl.querySelectorAll("[data-hero]"),
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", delay: 0.05 },
      );

      if (reduce) {
        vid.play().catch(() => undefined);
        return;
      }

      const arm = () => {
        const end = isTouch ? "+=220%" : "+=180%";

        ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end,
          pin: true,
          pinSpacing: true,
          scrub: isTouch ? 0.8 : 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!vid.duration || Number.isNaN(vid.duration)) return;
            targetTime.current = self.progress * Math.max(0, vid.duration - 0.08);
          },
        });

        gsap.to(copyEl, {
          opacity: 0.12,
          y: isTouch ? -24 : -40,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end,
            scrub: true,
          },
        });

        raf.current = requestAnimationFrame(tick);
        ScrollTrigger.refresh();
      };

      const unlock = () => {
        // Warm decoder on first touch/scroll so seeks work
        vid.play().then(() => {
          vid.pause();
        }).catch(() => undefined);
      };
      window.addEventListener("touchstart", unlock, { once: true, passive: true });
      window.addEventListener("scroll", unlock, { once: true, passive: true });

      if (vid.readyState >= 1) arm();
      else vid.addEventListener("loadedmetadata", arm, { once: true });

      // Fallback if metadata stalls on mobile CDN
      const fallback = window.setTimeout(() => {
        if (!ScrollTrigger.getAll().some((st) => st.trigger === sec)) arm();
      }, 1200);

      return () => {
        window.clearTimeout(fallback);
        window.removeEventListener("touchstart", unlock);
        window.removeEventListener("scroll", unlock);
      };
    }, sec);

    return () => {
      cancelAnimationFrame(raf.current);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={section}
      id="hero"
      className="relative h-[100svh] min-h-[100svh] overflow-hidden bg-[var(--charcoal)]"
    >
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
        src={asset("/media/hero/facial.mp4")}
        muted
        playsInline
        preload="auto"
        poster={asset("/media/clinic-interior.jpg")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-[var(--charcoal)]/35 to-[var(--charcoal)]/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--charcoal)]/70 via-transparent to-transparent" />

      <div
        ref={copy}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-24 pt-28 sm:px-6 sm:pb-20"
      >
        <p data-hero className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--pink)]">
          Mississauga · Physician-directed
        </p>
        <h1 data-hero className="mt-3 max-w-[12ch] font-display text-[clamp(2.6rem,10vw,5.4rem)] leading-[0.95] text-white">
          {SITE.name}
        </h1>
        <p data-hero className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-white/70 sm:text-lg">
          Stop guessing from Instagram. Scroll the treatment. Pick a pathway. Book the consult.
        </p>
        <div data-hero className="mt-7 hidden flex-wrap gap-3 sm:flex">
          <a href="#consult" className="btn-primary">
            Book a consult <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#results" className="btn-ghost border-white/30 text-white hover:border-white hover:text-white">
            Real results
          </a>
        </div>
        <p data-hero className="mt-6 text-[11px] uppercase tracking-[0.18em] text-white/45">
          Scroll to scrub the film
        </p>
      </div>
    </section>
  );
}
