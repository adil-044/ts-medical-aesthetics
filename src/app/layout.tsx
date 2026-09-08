import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "TS Medical Aesthetics — Concept Homepage",
  description:
    "Premium homepage concept for TS Medical Aesthetics / Trend Sassy · Mississauga. Device proof, treatment pathways, consult CTA. Prepared by Uptisement.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        <p className="concept-banner">
          Concept homepage — TS Medical Aesthetics / Trend Sassy · prepared by Uptisement · not live
        </p>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
