"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const devices = [
  {
    title: "Aerolase",
    blurb: "Laser for acne and clarity — named device, not a vague glow facial.",
    image: "/media/aerolase.jpg",
  },
  {
    title: "Fotona 4D",
    blurb: "Non-surgical lift protocols with physician-led framing.",
    image: "/media/aerolase-dp4.jpg",
  },
  {
    title: "DP4 + exosomes",
    blurb: "Hair and skin microneedling with regenerative support.",
    image: "/media/dp4-hair.jpg",
  },
  {
    title: "Injectables",
    blurb: "Botox, fillers, PRP/PRF — mapped by goal.",
    image: "/media/botox.jpg",
  },
];

export function DeviceRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Desktop only pin — phones use native horizontal scroll
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, tr.scrollWidth - window.innerWidth + 48);
      gsap.to(tr, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section id="proof" ref={section} className="relative overflow-hidden bg-[var(--surface)]">
      <div className="px-4 pt-16 sm:px-6 sm:pt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pink-deep)]">
          Device proof
        </p>
        <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
          The stack your clinic actually runs
        </h2>
        <p className="mt-3 max-w-[40ch] text-[var(--muted)] md:hidden">
          Swipe the rail →
        </p>
      </div>

      <div className="mt-10 overflow-x-auto pb-16 [-webkit-overflow-scrolling:touch] snap-x snap-mandatory scroll-px-4 md:overflow-visible md:pb-24 md:snap-none">
      <div ref={track} className="flex w-max gap-4 px-4 sm:gap-6 sm:px-6">
        {devices.map((d) => (
          <article
            key={d.title}
            className="relative h-[58vh] w-[78vw] max-w-[26rem] shrink-0 snap-center overflow-hidden sm:h-[68vh] sm:w-[min(82vw,28rem)] md:snap-align-none"
          >
            <Image src={asset(d.image)} alt={d.title} fill className="object-cover" sizes="420px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-[var(--charcoal)]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <h3 className="font-display text-3xl tracking-tight">{d.title}</h3>
              <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-white/75">{d.blurb}</p>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
