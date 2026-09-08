export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}

export const SITE = {
  name: "TS Medical Aesthetics",
  short: "Trend Sassy",
  tagline: "Physician-directed medical aesthetics · Mississauga",
  phone: "(647) 532-2600",
  phoneHref: "tel:+16475322600",
  email: "info@trendsassy.ca",
  address: "1100 Burnhamthorpe Road West, Unit 8 · Mississauga",
  book: "https://www.trendsassy.ca/contact",
  ig: "https://www.instagram.com/trendsassymedspa/",
};
