"use client";

import reviews from "@/content/reviews.json";
import { Reveal } from "@/components/Reveal";

export function GoogleReviews() {
  return (
    <section id="reviews" className="border-y border-[var(--line)] bg-[var(--surface)]">
      <div className="section-pad">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pink-deep)]">
                Google reviews
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
                <span className="stars">{reviews.rating}★</span> from real guests
              </h2>
              <p className="mt-3 text-[var(--muted)]">
                {reviews.count.toLocaleString()} {reviews.countLabel} on Google Business Profile
              </p>
            </div>
            <a
              href={reviews.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              Read on Google
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.reviews.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={(i % 3) * 0.06}>
              <blockquote className="flex h-full flex-col border border-[var(--line)] bg-[var(--bg)] p-5">
                <div className="stars text-sm" aria-label={`${r.stars} stars`}>
                  {"★".repeat(r.stars)}
                  {"☆".repeat(Math.max(0, 5 - r.stars))}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ink)]">&ldquo;{r.text}&rdquo;</p>
                <footer className="mt-4 text-xs font-semibold uppercase tracking-wider text-[var(--faint)]">
                  {r.name} · Google
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
