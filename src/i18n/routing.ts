import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "always",
  // Always redirect "/" to /en — ignore Accept-Language and prior NEXT_LOCALE
  // cookies. Users opt into German via the language switcher; direct /de/*
  // links stay accessible.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/about": {
      en: "/about",
      de: "/ueber-uns",
    },
    "/services": {
      en: "/services",
      de: "/leistungen",
    },
    "/industries": {
      en: "/industries",
      de: "/branchen",
    },
    "/network": {
      en: "/network",
      de: "/netzwerk",
    },
    "/contact": {
      en: "/contact",
      de: "/kontakt",
    },
    "/privacy": {
      en: "/privacy",
      de: "/datenschutz",
    },
    "/terms": {
      en: "/terms",
      de: "/agb",
    },
    "/imprint": {
      en: "/imprint",
      de: "/impressum",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
