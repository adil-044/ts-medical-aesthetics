"use client";

import { useState } from "react";
import Image from "next/image";
import { asset, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

const paths = [
  {
    id: "skin",
    label: "Skin & laser",
    title: "Skin clarity & laser pathways",
    body: "HydraFacial, peels, Microneedling, Morpheus8, Aerolase, Fotona — grouped so guests land on the right next step.",
    bullets: ["Acne & texture → Aerolase / peels", "Lifting & firmness → Fotona 4D", "Resurfacing → Microneedling / Morpheus8"],
    image: "/media/peel.jpg",
  },
  {
    id: "inject",
    label: "Injectables",
    title: "Injectables, guided simply",
    body: "Neuromodulators, dermal fillers, Radiesse, mesotherapy — framed by goal instead of product jargon alone.",
    bullets: ["Refresh & soften → Botox / Dysport", "Volume & contour → fillers", "Regenerative → PRP/PRF"],
    image: "/media/lip-filler.jpg",
  },
  {
    id: "hair",
    label: "Hair",
    title: "Hair restoration pathway",
    body: "DP4 microneedling with exosomes — a dedicated path for guests who came for hair, not a buried menu item.",
    bullets: ["Thinning & density concerns", "Exosome-supported protocols", "Clear consult for assessment"],
    image: "/media/dp4-hair.jpg",
  },
  {
    id: "body",
    label: "Wellness",
    title: "Wellness & body support",
    body: "Vitamin injections and complementary care — kept secondary so the clinical aesthetic offer stays the hero.",
    bullets: ["Wellness shots & vitamins", "Supportive recovery care", "Ask the team what’s appropriate"],
    image: "/media/clinic-1.jpg",
  },
] as const;

export function Pathways() {
  const [active, setActive] = useState<(typeof paths)[number]["id"]>("skin");
  const current = paths.find((p) => p.id === active) ?? paths[0];

  return (
    <section id="pathways" className="section-pad">
      <p className="kicker">Treatment pathways</p>
      <h2 className="mt-3 max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.05]">
        Start with what you came for
      </h2>
      <p className="mt-4 max-w-[42ch] text-[var(--muted)]">
        One path. Less overwhelm than a full service dump.
      </p>

      <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Treatment pathways">
        {paths.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={active === p.id}
            onClick={() => setActive(p.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              active === p.id
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2" role="tabpanel">
        <div className="relative min-h-[22rem] overflow-hidden border border-[var(--line)]">
          <Image
            key={current.image}
            src={asset(current.image)}
            alt={current.title}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 560px"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-display text-3xl sm:text-4xl">{current.title}</h3>
          <p className="mt-4 text-[var(--muted)] leading-relaxed">{current.body}</p>
          <ul className="mt-6 space-y-2 text-sm text-[var(--ink)]">
            {current.bullets.map((b) => (
              <li key={b} className="border-b border-[var(--line)] pb-2">
                {b}
              </li>
            ))}
          </ul>
          <a href={SITE.book} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-fit">
            Talk to the clinic
          </a>
        </div>
      </div>
    </section>
  );
}
