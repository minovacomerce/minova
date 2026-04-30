import {
  ShoppingBag,
  Sparkles,
  Cog,
  Cpu,
  Heart,
  Sofa,
  ArrowUpRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/reveal";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";

const INDUSTRIES = [
  { icon: ShoppingBag, key: "consumer" },
  { icon: Sparkles, key: "lifestyle" },
  { icon: Cog, key: "industrial" },
  { icon: Cpu, key: "electronics" },
  { icon: Heart, key: "health" },
  { icon: Sofa, key: "home" },
] as const;

export default function IndustriesGrid() {
  const t = useTranslations("industries_section");

  return (
    <section
      id="industries"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[var(--navy)] via-[#06182E] to-[var(--navy)] py-16 md:py-28"
    >
      <div
        aria-hidden
        className="bg-dots-dark pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 80%)",
        }}
      />

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-[var(--slate-300)]">
                <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                {t("eyebrow")}
              </p>
            </Reveal>
            <h2 className="headline-lg mt-4 text-white md:mt-6">
              {t("headline_1")}
              <br />
              <span className="text-[var(--slate-300)]">{t("headline_2")}</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:flex lg:items-end">
            <Reveal delay={0.15}>
              <p className="text-base leading-[1.65] text-[var(--slate-300)] md:text-lg">
                {t("body")}
              </p>
            </Reveal>
          </div>
        </div>

        <RevealStagger
          stagger={0.06}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-14 md:gap-8 lg:grid-cols-3"
        >
          {INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <RevealItem key={ind.key}>
                <Link
                  href={{
                    pathname: "/industries" as AppPathname,
                    hash: ind.key,
                  }}
                  className="card-hover-dark group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-colors duration-500 group-hover:bg-[var(--accent)]/20">
                      <Icon
                        className="h-5 w-5 text-white transition-colors group-hover:text-[var(--accent)]"
                        strokeWidth={1.4}
                      />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>
                  <h3 className="mt-12 font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {t(`cards.${ind.key}_title` as never)}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.65] text-[var(--slate-300)]">
                    {t(`cards.${ind.key}_body` as never)}
                  </p>
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
