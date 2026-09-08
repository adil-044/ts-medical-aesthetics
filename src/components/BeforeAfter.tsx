"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { asset } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  before: string;
  after: string;
  label: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export function BeforeAfter({
  before,
  after,
  label,
  beforeLabel = "Before",
  afterLabel = "After",
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const clipEl = clip.current;
    const handleEl = handle.current;
    if (!el || !clipEl || !handleEl) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dragging = false;

    const setPos = (p: number) => {
      const pos = Math.min(0.92, Math.max(0.08, p));
      const pct = `${pos * 100}%`;
      clipEl.style.clipPath = `inset(0 0 0 ${pct})`;
      handleEl.style.left = pct;
    };
    setPos(0.12);

    const onPointer = (x: number) => {
      const rect = el.getBoundingClientRect();
      setPos((x - rect.left) / rect.width);
    };
    const down = (e: PointerEvent) => {
      dragging = true;
      el.setPointerCapture(e.pointerId);
      onPointer(e.clientX);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      onPointer(e.clientX);
    };
    const up = () => {
      dragging = false;
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);

    let st: ScrollTrigger | undefined;
    if (!reduce) {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        end: "bottom 25%",
        scrub: 0.35,
        onUpdate: (self) => {
          if (dragging) return;
          setPos(0.1 + self.progress * 0.75);
        },
      });
    }

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      st?.kill();
    };
  }, []);

  return (
    <div>
      <p className="mb-3 text-sm text-[var(--muted)]">{label}</p>
      <div
        ref={root}
        className="relative aspect-[16/10] touch-none select-none overflow-hidden bg-[var(--surface)]"
        role="img"
        aria-label={`${label}: ${beforeLabel} to ${afterLabel}`}
      >
        <Image src={asset(before)} alt={beforeLabel} fill className="object-cover" sizes="(max-width:768px) 100vw, 640px" />
        <div ref={clip} className="absolute inset-0" style={{ clipPath: "inset(0 0 0 12%)" }}>
          <Image src={asset(after)} alt={afterLabel} fill className="object-cover" sizes="(max-width:768px) 100vw, 640px" />
        </div>
        <div ref={handle} className="absolute inset-y-0 z-10 w-px bg-white" style={{ left: "12%" }}>
          <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-[var(--charcoal)] text-[10px] font-bold text-white">
            ◀▶
          </div>
        </div>
        <span className="absolute left-3 top-3 bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          {beforeLabel}
        </span>
        <span className="absolute right-3 top-3 bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
