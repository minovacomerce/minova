export const SITE = {
  name: "Minova Commerce",
  shortName: "Minova",
  url: "https://minovacommerce.com",
  tagline: "Trade, distributed.",
  description:
    "Minova Commerce is a global trading and distribution partner connecting manufacturers, suppliers, and customers across consumer, lifestyle, and industrial markets.",
  phone: "+41 76 425 04 53",
  phoneTel: "+41764250453",
  email: "info@minova-commerce.ch",
  /**
   * Public-facing location label. Only "Switzerland" — never the street, town
   * or canton. Full address belongs on /imprint, /privacy, /terms only.
   */
  location: "Switzerland",
  linkedin: "https://www.linkedin.com/company/minova-commerce",
  ogImage: "/brand/minova-icon-navy-256.png",
} as const;

/**
 * Official company data — used only on /imprint, /privacy, /terms.
 * Do NOT render any of these fields on public marketing pages.
 */
export const LEGAL = {
  companyName: "Minova Commerce Midzan",
  owner: "Dino Midzan",
  legalForm: "Sole Proprietorship under Swiss law",
  street: "Kallernhagstrasse 2",
  postalCode: "4665",
  city: "Oftringen",
  country: "Switzerland",
  addressLine: "Kallernhagstrasse 2, 4665 Oftringen, Switzerland",
  commercialRegisterNumber: "CH-400.1.613.285-4",
  commercialRegisterOffice: "Handelsregisteramt Aargau",
  vat: "CHE-285.452.802",
  registeredSince: "22 October 2025",
  jurisdiction: "Aargau, Switzerland",
  governingLaw: "Swiss law",
  businessPurpose:
    "Trade, distribution and brokerage of goods and products of all kinds.",
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/network", label: "Network" },
  { href: "/contact", label: "Contact" },
] as const;

export const LEGAL_NAV = [
  { href: "/imprint", label: "Imprint" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
