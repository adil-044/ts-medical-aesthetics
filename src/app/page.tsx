"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BeforeAfter } from "@/components/BeforeAfter";
import { DeviceRail } from "@/components/DeviceRail";
import { GoogleReviews } from "@/components/GoogleReviews";
import { HeroVideo } from "@/components/HeroVideo";
import { Pathways } from "@/components/Pathways";
import { Reveal } from "@/components/Reveal";
import { SITE, asset } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <HeroVideo />

      <DeviceRail />

      <section id="results" className="section-pad">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pink-deep)]">
            From @trendsassymedspa
          </p>
          <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
            Same face. Same angle. Scroll the change.
          </h2>
          <p className="mt-4 max-w-[42ch] text-[var(--muted)]">
            Real Instagram before/after from their chair — lips with lips, skin with skin. Drag or scroll.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <BeforeAfter
              before="/media/results/lips-before.jpg"
              after="/media/results/lips-after.jpg"
              label="Lip filler · natural volume"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <BeforeAfter
              before="/media/results/acne-scar-before.jpg"
              after="/media/results/acne-scar-after.jpg"
              label="Acne scarring · texture refinement"
            />
          </Reveal>
          <Reveal>
            <BeforeAfter
              before="/media/results/aerolase-before.jpg"
              after="/media/results/aerolase-after.jpg"
              label="Aerolase · multi-session clarity"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <BeforeAfter
              before="/media/results/one-session-before.jpg"
              after="/media/results/one-session-after.jpg"
              label="One-session visible change"
            />
          </Reveal>
        </div>
      </section>

      <Pathways />

      <GoogleReviews />

      <section id="consult" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={asset("/media/clinic-interior.jpg")}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--charcoal)]/78" />
        </div>
        <div className="relative section-pad text-white">
          <Reveal>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pink)]">
              Consult
            </p>
            <h2 className="mt-3 max-w-[14ch] font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05]">
              Ready for a physician-led consult?
            </h2>
            <p className="mt-5 max-w-[40ch] text-white/70">
              Tell the team skin, injectables, hair, or laser — then book the right conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.book} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book an appointment <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={SITE.phoneHref} className="btn-ghost border-white/35 text-white hover:border-white hover:text-white">
                Call {SITE.phone}
              </a>
            </div>
            <p className="mt-6 text-sm text-white/50">
              {SITE.address} · <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
