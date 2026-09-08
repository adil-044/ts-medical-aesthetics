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
    setPos(0.15);

    const fromEvent = (e: PointerEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX : e.clientX;
      if (clientX == null) return;
      const rect = el.getBoundingClientRect();
      setPos((clientX - rect.left) / rect.width);
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      el.setPointerCapture(e.pointerId);
      fromEvent(e);
      e.preventDefault();
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      fromEvent(e);
      e.preventDefault();
    };
    const up = () => {
      dragging = false;
    };

    // Touch fallbacks — some WebViews are flaky with pointer capture
    const touchStart = (e: TouchEvent) => {
      dragging = true;
      fromEvent(e);
    };
    const touchMove = (e: TouchEvent) => {
      if (!dragging) return;
      fromEvent(e);
      e.preventDefault();
    };
    const touchEnd = () => {
      dragging = false;
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("touchstart", touchStart, { passive: true });
    el.addEventListener("touchmove", touchMove, { passive: false });
    el.addEventListener("touchend", touchEnd);

    let st: ScrollTrigger | undefined;
    if (!reduce) {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 20%",
        scrub: 0.45,
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
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("touchstart", touchStart);
      el.removeEventListener("touchmove", touchMove);
      el.removeEventListener("touchend", touchEnd);
      st?.kill();
    };
  }, []);

  return (
    <div>
      <p className="mb-3 text-sm text-[var(--muted)]">{label}</p>
      <div
        ref={root}
        className="relative aspect-[16/10] select-none overflow-hidden bg-[var(--surface)] touch-none"
        style={{ touchAction: "none" }}
        role="img"
        aria-label={`${label}: ${beforeLabel} to ${afterLabel}`}
      >
        <Image
          src={asset(before)}
          alt={beforeLabel}
          fill
          className="pointer-events-none object-cover"
          sizes="(max-width:768px) 100vw, 640px"
          draggable={false}
        />
        <div ref={clip} className="absolute inset-0 pointer-events-none" style={{ clipPath: "inset(0 0 0 15%)" }}>
          <Image
            src={asset(after)}
            alt={afterLabel}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 640px"
            draggable={false}
          />
        </div>
        <div ref={handle} className="absolute inset-y-0 z-10 w-px bg-white pointer-events-none" style={{ left: "15%" }}>
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-[var(--charcoal)] text-[10px] font-bold text-white shadow-lg">
            ◀▶
          </div>
        </div>
        <span className="pointer-events-none absolute left-3 top-3 bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          {afterLabel}
        </span>
      </div>
      <p className="mt-2 text-xs text-[var(--faint)] sm:hidden">Drag the handle · or just scroll</p>
    </div>
  );
}
