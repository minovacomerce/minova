import { ArrowUpRight, Boxes, Truck, Handshake } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";

const TILES = [
  {
    icon: Boxes,
    keyPrefix: "sourcing",
    href: { pathname: "/services" as AppPathname, hash: "sourcing" },
  },
  {
    icon: Truck,
    keyPrefix: "distribution",
    href: { pathname: "/services" as AppPathname, hash: "distribution" },
  },
  {
    icon: Handshake,
    keyPrefix: "brokerage",
    href: { pathname: "/services" as AppPathname, hash: "brokerage" },
  },
];

export default function WhatWeDo() {
  const t = useTranslations("what_we_do");
  return (
    <section
      id="what-we-do"
      className="relative bg-[var(--off-white)] py-16 text-[var(--navy)] md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-2 lg:items-end">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-[var(--navy)]/60">
                <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                {t("eyebrow")}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="headline-lg mt-1 text-[var(--navy)] md:mt-2">
                {t("headline_1")}
                <br />
                <span className="text-[var(--navy)]/55">
                  {t("headline_2")}
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.15}>
              <p className="text-base leading-[1.65] text-[var(--navy)]/70 md:text-lg">
                {t("body")}
              </p>
            </Reveal>
          </div>
        </div>

        <RevealStagger
          stagger={0.1}
          className="mt-6 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3 md:gap-8"
        >
          {TILES.map((tile) => {
            const Icon = tile.icon;
            return (
              <RevealItem key={tile.keyPrefix} className="group h-full">
                <Link
                  href={tile.href}
                  className="card-hover-light relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-light)] bg-white p-8 md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--navy)]/[0.05] text-[var(--navy)] transition-colors duration-500 ease-out group-hover:bg-[var(--accent)]/15">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-[var(--navy)]/30 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--navy)]" />
                  </div>

                  <p className="eyebrow mt-12 text-[var(--slate-500)]">
                    {t(`tiles.${tile.keyPrefix}_kicker` as never)}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-[var(--navy)] md:text-[1.7rem]">
                    {t(`tiles.${tile.keyPrefix}_title` as never)}
                  </h3>
                  <p className="mt-5 text-sm leading-[1.65] text-[var(--slate-500)]">
                    {t(`tiles.${tile.keyPrefix}_body` as never)}
                  </p>

                  <div className="mt-12 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--navy)]">
                    {t("read_more")}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
