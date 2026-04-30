import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, useTranslations } from "next-intl";
import PageHero from "@/components/sections/page-hero";
import CTA from "@/components/sections/cta";
import NetworkGlobe from "@/components/sections/network-globe";
import {
  Reveal,
  RevealStagger,
  RevealItem,
  SplitWords,
} from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: safe, namespace: "network_page" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `/${safe}/${safe === "de" ? "netzwerk" : "network"}`,
      languages: {
        en: "/en/network",
        de: "/de/netzwerk",
        "x-default": "/en/network",
      },
    },
  };
}

type HubKey = { key: string; isHQ?: boolean };

const HUB_KEYS: readonly HubKey[] = [
  { key: "switzerland", isHQ: true },
  { key: "north_america" },
  { key: "south_america" },
  { key: "west_africa" },
  { key: "middle_east" },
  { key: "south_asia" },
  { key: "east_asia" },
  { key: "oceania" },
];

const REGIONS = [
  { key: "europe", partners: 62 },
  { key: "asia", partners: 48 },
  { key: "mena", partners: 18 },
  { key: "americas", partners: 16 },
  { key: "africa", partners: 6 },
] as const;

const STANDARDS = [
  { key: "vetted" },
  { key: "scored" },
  { key: "audited" },
] as const;

export default async function NetworkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NetworkContent />;
}

function NetworkContent() {
  const t = useTranslations("network_page");
  const tGlobe = useTranslations("global_reach");
  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        body={t("body")}
        meta={[
          { label: t("meta_partners"), value: "150+" },
          { label: t("meta_countries"), value: "40+" },
          { label: t("meta_industries"), value: "12+" },
          { label: t("meta_lanes"), value: t("meta_lanes_value") },
        ]}
      />

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[var(--navy)] via-[#06182E] to-[var(--navy)] py-16 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-[var(--slate-300)]">
                  <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                  {t("map_eyebrow")}
                </p>
              </Reveal>
              <h2 className="headline-md mt-4 text-white md:mt-6">
                <SplitWords text={t("map_headline_1")} />
                <br />
                <span className="text-[var(--slate-300)]">
                  <SplitWords text={t("map_headline_2")} delay={0.15} />
                </span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:flex lg:items-end">
              <Reveal delay={0.1}>
                <p className="text-base leading-[1.65] text-[var(--slate-300)] md:text-lg">
                  {t("map_body")}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-8 md:mt-14">
            <NetworkGlobe />
          </div>

          <Reveal>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm md:mt-8 md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-6 md:gap-y-3">
              {HUB_KEYS.map((h) => (
                <li
                  key={h.key}
                  className="inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <span
                    className={
                      "inline-block h-2 w-2 rounded-full " +
                      (h.isHQ
                        ? "bg-[var(--accent)]"
                        : "border border-white/50 bg-transparent")
                    }
                  />
                  <span
                    className={
                      h.isHQ
                        ? "font-medium text-white"
                        : "text-[var(--slate-300)]"
                    }
                  >
                    {tGlobe(`hubs.${h.key}` as never)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--off-white)] py-16 text-[var(--navy)] md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-[var(--navy)]/60">
              <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
              {t("regional_eyebrow")}
            </p>
          </Reveal>
          <h2 className="headline-md mt-4 max-w-3xl text-[var(--navy)] md:mt-6">
            <SplitWords text={t("regional_headline")} />
          </h2>

          <RevealStagger
            stagger={0.06}
            className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 md:gap-4 lg:grid-cols-5"
          >
            {REGIONS.map((r) => (
              <RevealItem key={r.key}>
                <div className="card-hover-light flex h-full flex-col rounded-2xl border border-[var(--border-light)] bg-white p-6 md:p-8">
                  <p className="font-display text-xl font-semibold tracking-tight text-[var(--navy)]">
                    {t(`regions.${r.key}_name` as never)}
                  </p>
                  <p className="mt-3 text-xs leading-[1.5] text-[var(--navy)]/55">
                    {t(`regions.${r.key}_note` as never)}
                  </p>
                  <p className="mt-auto pt-10 font-display text-4xl font-light tracking-tight text-[var(--navy)] md:text-5xl">
                    <CountUp to={r.partners} />
                  </p>
                  <p className="mt-1 text-[11px] tracking-[0.2em] text-[var(--navy)]/50">
                    {t("partners_label")}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[var(--navy-900)] py-16 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-[var(--slate-300)]">
              <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
              {t("standards_eyebrow")}
            </p>
          </Reveal>
          <h2 className="headline-md mt-4 max-w-3xl text-white md:mt-6">
            <SplitWords text={t("standards_headline")} />
          </h2>

          <RevealStagger
            stagger={0.08}
            className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:gap-8"
          >
            {STANDARDS.map((s, i) => (
              <RevealItem key={s.key}>
                <div className="card-hover-dark group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-10">
                  <span className="font-display text-4xl font-light tracking-tight text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight text-white">
                    {t(`standards.${s.key}_title` as never)}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.65] text-[var(--slate-300)]">
                    {t(`standards.${s.key}_body` as never)}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
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
