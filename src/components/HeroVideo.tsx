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

  useEffect(() => {
    const sec = section.current;
    const vid = video.current;
    const copyEl = copy.current;
    if (!sec || !vid || !copyEl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        copyEl.querySelectorAll("[data-hero]"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 },
      );

      if (reduce) {
        vid.play().catch(() => undefined);
        return;
      }

      const setFromScroll = (progress: number) => {
        if (!vid.duration || Number.isNaN(vid.duration)) return;
        vid.currentTime = progress * Math.max(0, vid.duration - 0.05);
      };

      const onMeta = () => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          onUpdate: (self) => setFromScroll(self.progress),
        });
        gsap.to(copyEl, {
          opacity: 0.15,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "+=180%",
            scrub: true,
          },
        });
      };

      if (vid.readyState >= 1) onMeta();
      else vid.addEventListener("loadedmetadata", onMeta, { once: true });
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="hero" className="relative h-[100svh] overflow-hidden bg-[var(--charcoal)]">
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
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-6 sm:pb-20"
      >
        <p data-hero className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--pink)]">
          Mississauga · Physician-directed
        </p>
        <h1 data-hero className="mt-3 max-w-[12ch] font-display text-[clamp(2.8rem,9vw,5.4rem)] leading-[0.95] text-white">
          {SITE.name}
        </h1>
        <p data-hero className="mt-5 max-w-[34ch] text-base leading-relaxed text-white/70 sm:text-lg">
          Stop guessing from Instagram. Scroll the treatment. Pick a pathway. Book the consult.
        </p>
        <div data-hero className="mt-8 flex flex-wrap gap-3">
          <a href="#consult" className="btn-primary">
            Book a consult <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#results" className="btn-ghost border-white/30 text-white hover:border-white hover:text-white">
            Real results
          </a>
        </div>
        <p data-hero className="mt-8 text-[11px] uppercase tracking-[0.18em] text-white/45">
          Scroll to scrub the film
        </p>
      </div>
    </section>
  );
}
