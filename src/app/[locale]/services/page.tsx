import type { Metadata } from "next";
import {
  Boxes,
  Truck,
  Handshake,
  Network,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { hasLocale } from "next-intl";
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
  const t = await getTranslations({ locale: safe, namespace: "services_page" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `/${safe}/${safe === "de" ? "leistungen" : "services"}`,
      languages: {
        en: "/en/services",
        de: "/de/leistungen",
        "x-default": "/en/services",
      },
    },
  };
}

const PILLARS = [
  { id: "sourcing", icon: Boxes, n: "01" },
  { id: "distribution", icon: Truck, n: "02" },
  { id: "brokerage", icon: Handshake, n: "03" },
  { id: "intermediation", icon: Network, n: "04" },
  { id: "quality", icon: ShieldCheck, n: "05" },
  { id: "logistics", icon: Compass, n: "06" },
] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations("services_page");
  return (
    <>
      <PageHero
        kicker={t("kicker")}
        title={t("title")}
        body={t("body")}
        meta={[
          { label: t("meta_pillars"), value: "6" },
          { label: t("meta_industries"), value: "12+" },
          { label: t("meta_countries"), value: "40+" },
          { label: t("meta_response"), value: t("meta_response_value") },
        ]}
      />

      <section className="relative bg-[var(--off-white)] py-16 text-[var(--navy)] md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-[var(--navy)]/60">
                  <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                  {t("intro_eyebrow")}
                </p>
              </Reveal>
              <h2 className="headline-md mt-4 text-[var(--navy)] md:mt-6">
                <SplitWords text={t("intro_headline_1")} />
                <br />
                <span className="text-[var(--navy)]/55">
                  <SplitWords text={t("intro_headline_2")} delay={0.15} />
                </span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:flex lg:items-end">
              <Reveal delay={0.1}>
                <p className="text-base leading-[1.65] text-[var(--navy)]/65 md:text-lg">
                  {t("intro_body")}
                </p>
              </Reveal>
            </div>
          </div>

          <RevealStagger
            stagger={0.06}
            className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 md:gap-8"
          >
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <RevealItem key={p.id}>
                  <article
                    id={p.id}
                    className="card-hover-light group flex h-full flex-col rounded-2xl border border-[var(--border-light)] bg-white p-8 md:p-10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--navy)]/[0.05] text-[var(--navy)] transition-colors duration-500 group-hover:bg-[var(--accent)]/15">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <span className="font-display text-sm tracking-tight text-[var(--navy)]/40">
                        {p.n}
                      </span>
                    </div>
                    <h3 className="mt-10 font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--navy)] md:text-4xl">
                      {t(`pillars.${p.id}_title` as never)}
                    </h3>
                    <p className="mt-5 max-w-md text-sm leading-[1.65] text-[var(--navy)]/65 md:text-base">
                      {t(`pillars.${p.id}_body` as never)}
                    </p>
                    <ul className="mt-8 space-y-3 border-t border-[var(--border-light)] pt-6">
                      {[1, 2, 3, 4].map((idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-[var(--navy)]/80"
                        >
                          <span className="mt-1.5 inline-block h-1 w-3 shrink-0 rounded-full bg-[var(--accent)]" />
                          {t(`pillars.${p.id}_p${idx}` as never)}
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

      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[var(--navy)] via-[#06182E] to-[var(--navy)] py-16 md:py-28">
        <div
          aria-hidden
          className="bg-dots-dark pointer-events-none absolute inset-0 -z-10 opacity-40"
          style={{
            maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
          }}
        />
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-5">
              <Reveal>
                <p className="eyebrow text-[var(--slate-300)]">
                  <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                  {t("usp_eyebrow")}
                </p>
              </Reveal>
              <h2 className="headline-md mt-4 text-white md:mt-6">
                <SplitWords text={t("usp_headline_1")} />
                <br />
                <span className="text-[var(--slate-300)]">
                  <SplitWords text={t("usp_headline_2")} delay={0.15} />
                </span>
              </h2>
            </div>
            <div className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:col-span-7 lg:grid-cols-2">
              {(["response", "qc", "lanes", "contact"] as const).map((k) => (
                <div key={k} className="border-t border-white/10 pt-6">
                  <p className="font-display text-5xl font-light tracking-tight text-white md:text-6xl">
                    {t(`usp_stats.${k}_value` as never)}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--slate-300)]">
                    {t(`usp_stats.${k}_label` as never)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA
        tone="light"
        kicker={t("cta_kicker")}
        headline={t("cta_headline")}
        body={t("cta_body")}
      />
    </>
  );
}
