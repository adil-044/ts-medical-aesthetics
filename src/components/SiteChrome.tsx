"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE, asset } from "@/lib/site";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3" aria-label={SITE.name}>
            <Image
              src={asset("/media/logo-updated.png")}
              alt=""
              width={44}
              height={56}
              className="h-11 w-auto"
              priority
            />
            <span className="hidden font-display text-lg tracking-wide text-[var(--ink)] sm:block">
              {SITE.name}
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex" aria-label="Primary">
            <a href="#proof" className="hover:text-[var(--ink)]">
              Devices
            </a>
            <a href="#results" className="hover:text-[var(--ink)]">
              Results
            </a>
            <a href="#pathways" className="hover:text-[var(--ink)]">
              Pathways
            </a>
            <a href="#consult" className="hover:text-[var(--ink)]">
              Consult
            </a>
          </nav>
          <a href={SITE.book} target="_blank" rel="noopener noreferrer" className="btn-primary !px-4 !py-2.5 text-xs">
            Book consult
          </a>
        </div>
      </header>
      <main id="top">{children}</main>
      <footer className="border-t border-[var(--line)] bg-[var(--surface)] px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl">{SITE.name}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {SITE.short} · {SITE.address}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              <a href={SITE.phoneHref}>{SITE.phone}</a> ·{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <p className="text-xs text-[var(--faint)]">
            Concept by{" "}
            <Link href="https://uptisement.com" className="text-[var(--rose)]" target="_blank" rel="noreferrer">
              Uptisement
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
