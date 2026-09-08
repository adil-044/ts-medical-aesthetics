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
    blurb: "Laser precision for acne and skin clarity — named technology, not a vague “glow facial.”",
    image: "/media/aerolase.jpg",
  },
  {
    title: "Fotona & advanced laser",
    blurb: "Non-surgical lifting and resurfacing with physician-directed protocols.",
    image: "/media/aerolase-dp4.jpg",
  },
  {
    title: "DP4 microneedling",
    blurb: "Hair and skin pathways with exosome-supported protocols.",
    image: "/media/dp4-hair.jpg",
  },
  {
    title: "Injectables & PRP/PRF",
    blurb: "Neuromodulators, fillers, regenerative care — mapped by goal.",
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
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, tr.scrollWidth - window.innerWidth);
      const tween = gsap.to(tr, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section id="proof" ref={section} className="relative overflow-hidden bg-[var(--surface)]">
      <div className="px-4 pt-20 sm:px-6 sm:pt-28">
        <p className="kicker">Device &amp; treatment proof</p>
        <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.05]">
          See the technology behind your treatment
        </h2>
        <p className="mt-4 max-w-[42ch] text-[var(--muted)]">
          Scroll sideways through the stack your clinic actually runs — Aerolase, Fotona, DP4, injectables.
        </p>
      </div>

      <div ref={track} className="mt-12 flex w-max gap-5 px-4 pb-24 sm:gap-8 sm:px-6">
        {devices.map((d) => (
          <article
            key={d.title}
            className="relative h-[68vh] w-[min(82vw,28rem)] shrink-0 overflow-hidden border border-[var(--line)]"
          >
            <Image src={asset(d.image)} alt={d.title} fill className="object-cover" sizes="450px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="font-display text-3xl sm:text-4xl">{d.title}</h3>
              <p className="mt-3 max-w-[32ch] text-sm leading-relaxed text-[var(--muted)]">{d.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
