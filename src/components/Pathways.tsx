"use client";

import { useState } from "react";
import Image from "next/image";
import { asset, SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

const paths = [
  {
    id: "skin",
    label: "Skin & laser",
    title: "Skin clarity pathways",
    body: "HydraFacial, peels, Microneedling, Morpheus8, Aerolase, Fotona — grouped so you land on the next step, not a wall of links.",
    bullets: ["Acne & texture → Aerolase / peels", "Lift & firmness → Fotona 4D", "Resurfacing → Microneedling / Morpheus8"],
    image: "/media/peel.jpg",
  },
  {
    id: "inject",
    label: "Injectables",
    title: "Injectables, by goal",
    body: "Neuromodulators, fillers, Radiesse, mesotherapy — soften, restore, contour. Less jargon, clearer choice.",
    bullets: ["Refresh → Botox / Dysport", "Volume → fillers", "Regenerative → PRP/PRF"],
    image: "/media/results/lips-after.jpg",
  },
  {
    id: "hair",
    label: "Hair",
    title: "Hair restoration",
    body: "DP4 microneedling with exosomes — its own path, not buried under facials.",
    bullets: ["Thinning & density", "Exosome-supported protocols", "Consult for assessment"],
    image: "/media/dp4-hair.jpg",
  },
  {
    id: "body",
    label: "Wellness",
    title: "Wellness support",
    body: "Vitamin injections and complementary care — secondary so clinical aesthetics stay the hero.",
    bullets: ["Wellness shots", "Recovery support", "Ask what’s appropriate"],
    image: "/media/clinic-interior.jpg",
  },
] as const;

export function Pathways() {
  const [active, setActive] = useState<(typeof paths)[number]["id"]>("skin");
  const current = paths.find((p) => p.id === active) ?? paths[0];

  return (
    <section id="pathways" className="section-pad">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pink-deep)]">
        Pathways
      </p>
      <h2 className="mt-3 max-w-[14ch] font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
        Start with what you came for
      </h2>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Treatment pathways">
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
                ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)]",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2" role="tabpanel">
        <div className="relative min-h-[20rem] overflow-hidden bg-[var(--surface)]">
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
          <h3 className="font-display text-3xl tracking-tight sm:text-4xl">{current.title}</h3>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">{current.body}</p>
          <ul className="mt-6 space-y-2 text-sm">
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
