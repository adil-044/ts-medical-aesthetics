"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { BeforeAfter } from "@/components/BeforeAfter";
import { DeviceRail } from "@/components/DeviceRail";
import { Pathways } from "@/components/Pathways";
import { Reveal } from "@/components/Reveal";
import { SITE, asset } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas").then((m) => m.HeroCanvas), {
  ssr: false,
});

export default function HomePage() {
  const heroCopy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroCopy.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const parts = el.querySelectorAll("[data-hero]");
      gsap.fromTo(
        parts,
        { y: 48, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.25,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        },
      );

      gsap.to(".hero-photo", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section id="hero" className="relative min-h-[100svh] overflow-hidden">
        <div className="hero-photo absolute inset-0">
          <Image
            src={asset("/media/hero.jpg")}
            alt="TS Medical Aesthetics treatment"
            fill
            priority
            className="object-cover object-[center_28%]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/75 to-[var(--bg)]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-[var(--bg)]/50" />
        <div className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen">
          <HeroCanvas />
        </div>

        <div ref={heroCopy} className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-20">
          <p data-hero className="kicker">
            Mississauga · Physician-directed
          </p>
          <h1 data-hero className="mt-3 font-display text-[clamp(3rem,10vw,5.6rem)] leading-[0.94]">
            {SITE.name}
          </h1>
          <p data-hero className="mt-5 max-w-[36ch] text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Stop guessing from Instagram. See the devices, pick your pathway, book a physician-led consult.
          </p>
          <div data-hero className="mt-8 flex flex-wrap gap-3">
            <a href="#consult" className="btn-primary">
              Book a consult <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#pathways" className="btn-ghost">
              Find your pathway
            </a>
          </div>
        </div>
      </section>

      <div className="rose-line" />

      <DeviceRail />

      <section id="results" className="section-pad">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="kicker">Scroll-scrub results</p>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.05]">
              Drag — or just scroll
            </h2>
            <p className="mt-4 max-w-[40ch] text-[var(--muted)] leading-relaxed">
              Before/after controlled by scroll position. Guests feel the change before they book. Drag works too.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <BeforeAfter
              before="/media/botox.jpg"
              after="/media/lip-filler.jpg"
              label="Injectable contour · clinic photography"
              beforeLabel="Soft refresh"
              afterLabel="Contour"
            />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <BeforeAfter
              before="/media/peel.jpg"
              after="/media/aerolase.jpg"
              label="Skin & laser · clinic photography"
              beforeLabel="Peel pathway"
              afterLabel="Aerolase"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <BeforeAfter
              before="/media/clinic-2.jpg"
              after="/media/dp4-hair.jpg"
              label="Hair restoration · DP4 + exosomes"
              beforeLabel="Consult"
              afterLabel="Protocol"
            />
          </Reveal>
        </div>
      </section>

      <div className="rose-line" />

      <Pathways />

      <section id="consult" className="relative overflow-hidden border-t border-[var(--line)]">
        <div className="absolute inset-0">
          <Image src={asset("/media/clinic-1.jpg")} alt="" fill className="object-cover opacity-35" sizes="100vw" />
          <div className="absolute inset-0 bg-[var(--bg)]/80" />
        </div>
        <div className="relative section-pad">
          <Reveal>
            <p className="kicker">Clear consult CTA</p>
            <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.05]">
              Ready for a physician-led consult?
            </h2>
            <p className="mt-5 max-w-[42ch] text-[var(--muted)] leading-relaxed">
              Tell the team your goal — skin, injectables, hair, or laser — and book the right conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.book} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book an appointment <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={SITE.phoneHref} className="btn-ghost">
                Call {SITE.phone}
              </a>
            </div>
            <p className="mt-6 text-sm text-[var(--faint)]">
              {SITE.address} · <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
