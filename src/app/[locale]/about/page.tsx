import type { Metadata } from "next";
import { Compass, Scale, Lock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import PageHero from "@/components/sections/page-hero";
import CTA from "@/components/sections/cta";
import {
  Reveal,
  RevealStagger,
  RevealItem,
  SplitWords,
} from "@/components/ui/reveal";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: safe, namespace: "about_page" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `/${safe}/${safe === "de" ? "ueber-uns" : "about"}`,
      languages: {
        en: "/en/about",
        de: "/de/ueber-uns",
        "x-default": "/en/about",
      },
    },
  };
}

const VALUES = [
  { icon: Lock, key: "trust" },
  { icon: Scale, key: "flexibility" },
  { icon: Compass, key: "reliability" },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about_page");
  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        body={t("body")}
        meta={[
          { label: t("meta_headquarters"), value: t("headquarters_value") },
          { label: t("meta_partners"), value: "150+" },
          { label: t("meta_countries"), value: "40+" },
          { label: t("meta_industries"), value: "12+" },
        ]}
      />

      <section className="bg-[var(--off-white)] py-16 text-[var(--navy)] md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4">
              <Reveal>
                <p className="eyebrow text-[var(--navy)]/60">
                  <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                  {t("manifesto_eyebrow")}
                </p>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <Reveal>
                <p className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-[var(--navy)] md:text-5xl">
                  {t("manifesto_text")}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-2xl text-base leading-[1.65] text-[var(--navy)]/65 md:mt-8 md:text-lg">
                  {t("manifesto_body")}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 md:mt-20">
            <Reveal>
              <p className="eyebrow text-[var(--navy)]/60">
                <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                {t("values_eyebrow")}
              </p>
            </Reveal>
            <h2 className="headline-md mt-4 max-w-3xl text-[var(--navy)] md:mt-6">
              <SplitWords text={t("values_headline")} />
            </h2>

            <RevealStagger
              stagger={0.1}
              className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:gap-8"
            >
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <RevealItem key={v.key}>
                    <div className="card-hover-light group flex h-full flex-col rounded-2xl border border-[var(--border-light)] bg-white p-8 md:p-10">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--navy)]/[0.05] text-[var(--navy)] transition-colors duration-500 group-hover:bg-[var(--accent)]/15">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <h3 className="mt-12 font-display text-2xl font-semibold tracking-tight text-[var(--navy)]">
                        {t(`values.${v.key}_title` as never)}
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-[1.65] text-[var(--navy)]/65">
                        {t(`values.${v.key}_body` as never)}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealStagger>
          </div>
        </div>
      </section>

      <CTA
        kicker={t("cta_kicker")}
        headline={t("cta_headline")}
        body={t("cta_body")}
      />
    </>
  );
}
