import type { Metadata } from "next";
import {
  ShoppingBag,
  Sparkles,
  Cog,
  Cpu,
  Heart,
  Sofa,
  Coffee,
  Gem,
  Hammer,
  Leaf,
  Tag,
  Bike,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, useTranslations } from "next-intl";
import PageHero from "@/components/sections/page-hero";
import CTA from "@/components/sections/cta";
import {
  Reveal,
  RevealStagger,
  RevealItem,
  SplitWords,
} from "@/components/ui/reveal";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: safe, namespace: "industries_page" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `/${safe}/${safe === "de" ? "branchen" : "industries"}`,
      languages: {
        en: "/en/industries",
        de: "/de/branchen",
        "x-default": "/en/industries",
      },
    },
  };
}

const PRIMARY = [
  { id: "consumer", icon: ShoppingBag },
  { id: "lifestyle", icon: Sparkles },
  { id: "industrial", icon: Cog },
  { id: "electronics", icon: Cpu },
  { id: "health", icon: Heart },
  { id: "home", icon: Sofa },
] as const;

const SECONDARY = [
  { key: "food_beverage", icon: Coffee },
  { key: "premium", icon: Gem },
  { key: "tools", icon: Hammer },
  { key: "sustainable", icon: Leaf },
  { key: "private_label", icon: Tag },
  { key: "sports", icon: Bike },
] as const;

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <IndustriesContent />;
}

function IndustriesContent() {
  const t = useTranslations("industries_page");
  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        body={t("body")}
        meta={[
          { label: t("meta_categories"), value: "12+" },
          { label: t("meta_lanes"), value: t("meta_lanes_value") },
          {
            label: t("meta_lead_time"),
            value: t("meta_lead_time_value"),
          },
          { label: t("meta_qc"), value: t("meta_qc_value") },
        ]}
      />

      <section className="bg-[var(--off-white)] py-16 text-[var(--navy)] md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <Reveal>
                <p className="eyebrow text-[var(--navy)]/60">
                  <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                  {t("core_eyebrow")}
                </p>
              </Reveal>
              <h2 className="headline-md mt-4 text-[var(--navy)] md:mt-6">
                <SplitWords text={t("core_headline")} />
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:flex lg:items-end">
              <Reveal delay={0.1}>
                <p className="text-base leading-[1.65] text-[var(--navy)]/65 md:text-lg">
                  {t("core_body")}
                </p>
              </Reveal>
            </div>
          </div>

          <RevealStagger
            stagger={0.06}
            className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            {PRIMARY.map((c) => {
              const Icon = c.icon;
              const examples = t.raw(`primary.${c.id}_examples`) as string[];
              return (
                <RevealItem key={c.id}>
                  <article
                    id={c.id}
                    className="card-hover-light group flex h-full flex-col rounded-2xl border border-[var(--border-light)] bg-white p-8 md:p-10"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--navy)]/[0.05] text-[var(--navy)] transition-colors duration-500 group-hover:bg-[var(--accent)]/15">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight text-[var(--navy)]">
                      {t(`primary.${c.id}_title` as never)}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.65] text-[var(--navy)]/65">
                      {t(`primary.${c.id}_body` as never)}
                    </p>
                    <ul className="mt-8 flex flex-wrap gap-2 border-t border-[var(--border-light)] pt-5">
                      {examples.map((ex) => (
                        <li
                          key={ex}
                          className="rounded-full border border-[var(--border-light)] bg-[var(--off-white)] px-3 py-1 text-xs text-[var(--navy)]/70"
                        >
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </article>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      <section className="bg-[var(--warm-gray)] py-16 text-[var(--navy)] md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex items-end justify-between gap-10">
            <div>
              <Reveal>
                <p className="eyebrow text-[var(--navy)]/60">
                  <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                  {t("adjacent_eyebrow")}
                </p>
              </Reveal>
              <h2 className="headline-md mt-4 text-[var(--navy)] md:mt-6">
                <SplitWords text={t("adjacent_headline")} />
              </h2>
            </div>
          </div>

          <RevealStagger
            stagger={0.05}
            className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 lg:grid-cols-6"
          >
            {SECONDARY.map((s) => {
              const Icon = s.icon;
              return (
                <RevealItem key={s.key}>
                  <div className="card-hover-light group flex h-full flex-col items-start justify-between gap-10 rounded-2xl border border-[var(--border-light)] bg-white p-6 md:p-8">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--navy)]/[0.05] transition-colors duration-500 group-hover:bg-[var(--accent)]/15">
                      <Icon
                        className="h-5 w-5 text-[var(--navy)]"
                        strokeWidth={1.5}
                      />
                    </span>
                    <p className="font-display text-base font-semibold tracking-tight text-[var(--navy)]">
                      {t(`adjacent.${s.key}` as never)}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      <CTA
        tone="dark"
        kicker={t("cta_kicker")}
        headline={t("cta_headline")}
        body={t("cta_body")}
      />
    </>
  );
}
