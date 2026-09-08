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
  label?: string;
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
    let pos = 0.15;

    const setPos = (p: number) => {
      pos = Math.min(0.92, Math.max(0.08, p));
      const pct = `${pos * 100}%`;
      clipEl.style.clipPath = `inset(0 0 0 ${pct})`;
      handleEl.style.left = pct;
    };
    setPos(pos);

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
        start: "top 75%",
        end: "bottom 25%",
        scrub: 0.4,
        onUpdate: (self) => {
          if (dragging) return;
          setPos(0.12 + self.progress * 0.72);
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
    <div className="space-y-3">
      {label && <p className="text-sm text-[var(--muted)]">{label}</p>}
      <div
        ref={root}
        className="relative aspect-[4/5] touch-none select-none overflow-hidden border border-[var(--line)] bg-[var(--panel)] sm:aspect-[5/4]"
        role="img"
        aria-label={`${beforeLabel} and ${afterLabel} comparison`}
      >
        <Image src={asset(before)} alt={beforeLabel} fill className="object-cover" sizes="(max-width:768px) 100vw, 720px" />
        <div ref={clip} className="absolute inset-0" style={{ clipPath: "inset(0 0 0 15%)" }}>
          <Image src={asset(after)} alt={afterLabel} fill className="object-cover" sizes="(max-width:768px) 100vw, 720px" />
        </div>
        <div
          ref={handle}
          className="absolute inset-y-0 z-10 w-px bg-[var(--rose)]"
          style={{ left: "15%" }}
        >
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--rose)] bg-[var(--bg)] text-[10px] font-bold tracking-wide text-[var(--rose)]">
            ◀▶
          </div>
        </div>
        <span className="absolute left-3 top-3 bg-[var(--bg)]/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink)]">
          {beforeLabel}
        </span>
        <span className="absolute right-3 top-3 bg-[var(--bg)]/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink)]">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
