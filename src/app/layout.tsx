import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "TS Medical Aesthetics — Concept Homepage",
  description:
    "Physician-led medical aesthetics in Mississauga. Concept homepage by Uptisement — device proof, pathways, Google reviews, consult CTA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        <p className="concept-banner">
          Concept — TS Medical Aesthetics / Trend Sassy · Uptisement · not live
        </p>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
