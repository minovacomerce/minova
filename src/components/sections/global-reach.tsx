import { useTranslations } from "next-intl";
import NetworkGlobe from "@/components/sections/network-globe";
import { Reveal } from "@/components/ui/reveal";

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

export default function GlobalReach() {
  const t = useTranslations("global_reach");

  return (
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
        <div className="grid grid-cols-12 gap-6 lg:items-end">
          <div className="col-span-12 lg:col-span-5">
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
              <br />
              {t("headline_3")}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.15}>
              <p className="text-base leading-[1.65] text-[var(--slate-300)] md:text-lg">
                {t("body")}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-6 md:mt-10">
          <NetworkGlobe height="compact" />
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
                  {t(`hubs.${h.key}` as never)}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
