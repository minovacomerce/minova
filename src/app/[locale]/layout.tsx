import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { codecPro, inter } from "../fonts";
import "../globals.css";
import { SITE } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";
import SmoothScroll from "@/components/providers/smooth-scroll";
import CustomCursor from "@/components/ui/custom-cursor";
import CookieBanner from "@/components/layout/cookie-banner";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const t = await getTranslations({ locale: safeLocale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: t("default_title"),
      template: t("title_template"),
    },
    description: t("default_description"),
    applicationName: SITE.name,
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    publisher: SITE.name,
    alternates: {
      canonical: `/${safeLocale}`,
      languages: {
        en: "/en",
        de: "/de",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      title: t("default_title"),
      description: t("default_description"),
      url: `${SITE.url}/${safeLocale}`,
      images: [
        {
          url: SITE.ogImage,
          width: 256,
          height: 256,
          alt: t("ogImage_alt"),
        },
      ],
      locale: safeLocale === "de" ? "de_CH" : "en_US",
      alternateLocale: safeLocale === "de" ? ["en_US"] : ["de_CH"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("default_title"),
      description: t("default_description"),
      images: [SITE.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: [
        { url: "/brand/favicon-32.png", sizes: "32x32" },
        { url: "/brand/favicon-16.png", sizes: "16x16" },
      ],
      apple: "/brand/apple-touch-icon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#011125",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);

  return (
    <html
      lang={typedLocale}
      className={cn(
        codecPro.variable,
        inter.variable,
        "h-full scroll-smooth antialiased"
      )}
    >
      <body className="bg-[var(--navy)] text-white selection:bg-[var(--accent)] selection:text-[var(--navy)]">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--navy)]"
          >
            {typedLocale === "de" ? "Zum Inhalt springen" : "Skip to content"}
          </a>
          <SmoothScroll>
            <Header />
            <main id="main" className="page-transition">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
          <CustomCursor />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
