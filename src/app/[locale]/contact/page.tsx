import type { Metadata } from "next";
import { Phone, Globe, MapPin } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, useTranslations } from "next-intl";
import PageHero from "@/components/sections/page-hero";
import ContactForm from "@/components/sections/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: safe, namespace: "contact_page" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `/${safe}/${safe === "de" ? "kontakt" : "contact"}`,
      languages: {
        en: "/en/contact",
        de: "/de/kontakt",
        "x-default": "/en/contact",
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPageContent />;
}

function ContactPageContent() {
  const t = useTranslations("contact_page");
  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        body={t("body")}
        meta={[
          { label: t("meta_phone"), value: SITE.phone },
          { label: t("meta_location"), value: SITE.location },
          { label: t("meta_hours"), value: t("meta_hours_value") },
          { label: t("meta_response"), value: t("meta_response_value") },
        ]}
      />
      <ContactForm />

      <section className="border-t border-white/10 bg-[var(--navy)] py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
              <a
                href={`tel:${SITE.phoneTel}`}
                className="group flex items-center gap-4 bg-[var(--navy)] p-6 transition-colors hover:bg-[var(--navy-900)] md:p-8"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-[var(--accent)]/20 group-hover:text-[var(--accent)]">
                  <Phone className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-[var(--slate-300)]">
                    {t("direct_phone")}
                  </p>
                  <p className="mt-1 font-display text-lg text-white">
                    {SITE.phone}
                  </p>
                </div>
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-4 bg-[var(--navy)] p-6 transition-colors hover:bg-[var(--navy-900)] md:p-8"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-[var(--accent)]/20 group-hover:text-[var(--accent)]">
                  <Globe className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-[var(--slate-300)]">
                    {t("direct_linkedin")}
                  </p>
                  <p className="mt-1 font-display text-lg text-white">
                    {t("direct_linkedin_value")}
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-4 bg-[var(--navy)] p-6 md:p-8">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                  <MapPin className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-[var(--slate-300)]">
                    {t("direct_location")}
                  </p>
                  <p className="mt-1 font-display text-lg text-white">
                    {SITE.location}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
