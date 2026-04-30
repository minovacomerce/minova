import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const PAGES: { pathname: keyof typeof routing.pathnames; priority: number }[] = [
  { pathname: "/", priority: 1 },
  { pathname: "/about", priority: 0.8 },
  { pathname: "/services", priority: 0.8 },
  { pathname: "/industries", priority: 0.8 },
  { pathname: "/network", priority: 0.8 },
  { pathname: "/contact", priority: 0.8 },
];

const LEGAL_PAGES: { pathname: keyof typeof routing.pathnames }[] = [
  { pathname: "/imprint" },
  { pathname: "/privacy" },
  { pathname: "/terms" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const items: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    const alternates: Record<string, string> = {};
    for (const locale of routing.locales) {
      alternates[locale] = `${SITE.url}${getPathname({ href: page.pathname, locale })}`;
    }
    for (const locale of routing.locales) {
      items.push({
        url: alternates[locale],
        lastModified: now,
        changeFrequency: "monthly",
        priority: page.priority,
        alternates: { languages: alternates },
      });
    }
  }

  for (const page of LEGAL_PAGES) {
    const alternates: Record<string, string> = {};
    for (const locale of routing.locales) {
      alternates[locale] = `${SITE.url}${getPathname({ href: page.pathname, locale })}`;
    }
    for (const locale of routing.locales) {
      items.push({
        url: alternates[locale],
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: { languages: alternates },
      });
    }
  }

  return items;
}
