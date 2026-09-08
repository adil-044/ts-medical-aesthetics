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

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, tr.scrollWidth - window.innerWidth + 24);

      gsap.to(tr, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${Math.max(getScroll() * 1.05, window.innerHeight)}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Helps iOS keep pin attached while chrome shows/hides
          pinType: "fixed",
        },
      });

      // Recalc after images paint
      const imgs = tr.querySelectorAll("img");
      let left = imgs.length;
      const done = () => {
        left -= 1;
        if (left <= 0) ScrollTrigger.refresh();
      };
      imgs.forEach((img) => {
        if ((img as HTMLImageElement).complete) done();
        else {
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        }
      });
      window.setTimeout(() => ScrollTrigger.refresh(), 500);
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section id="proof" ref={section} className="relative overflow-hidden bg-[var(--surface)]">
      <div className="px-4 pt-14 sm:px-6 sm:pt-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pink-deep)]">
          Device proof
        </p>
        <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(1.85rem,5vw,3.4rem)] leading-[1.05]">
          The stack your clinic actually runs
        </h2>
        <p className="mt-3 text-sm text-[var(--muted)] sm:hidden">Scroll down — rail moves sideways</p>
      </div>

      <div className="mt-8 overflow-hidden pb-16 sm:mt-10 sm:pb-24">
        <div ref={track} className="flex w-max gap-3 px-4 sm:gap-6 sm:px-6 will-change-transform">
          {devices.map((d) => (
            <article
              key={d.title}
              className="relative h-[52vh] w-[82vw] max-w-[26rem] shrink-0 overflow-hidden sm:h-[68vh] sm:w-[min(82vw,28rem)]"
            >
              <Image src={asset(d.image)} alt={d.title} fill className="object-cover" sizes="420px" priority={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-[var(--charcoal)]/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{d.title}</h3>
                <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-white/75">{d.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
