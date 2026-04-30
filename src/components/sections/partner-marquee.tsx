import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

const PARTNERS = [
  "ATLAS / TRADING",
  "MERIDIAN GROUP",
  "NORDSTAR",
  "KAIWA INDUSTRIES",
  "VELLUM CO.",
  "PORTSIDE",
  "HELIA SOURCING",
  "EVERMORE",
  "AURUM LOGISTICS",
  "QUARTZ HOLDINGS",
  "NORTHWIND",
  "SAVERNE",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-16 px-8">
      {PARTNERS.map((p) => (
        <div
          key={p}
          className="font-display text-2xl font-medium tracking-[0.18em] text-[var(--navy)]/35 md:text-3xl"
        >
          {p}
          <span className="ml-16 inline-block h-1.5 w-1.5 -translate-y-1 rounded-full bg-[var(--navy)]/20" />
        </div>
      ))}
    </div>
  );
}

export default function PartnerMarquee() {
  const t = useTranslations("partner_marquee");
  return (
    <section className="relative overflow-hidden bg-[var(--off-white)] py-16 md:py-28">
      <div className="mx-auto mb-10 max-w-[1440px] px-5 md:mb-16 md:px-10">
        <Reveal>
          <p className="eyebrow text-[var(--slate-500)]">
            <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
            {t("eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-[var(--navy)] md:text-5xl">
            {t("headline")}
          </h2>
        </Reveal>
      </div>
      <div
        className="relative flex w-full overflow-hidden text-[var(--navy)]"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="animate-marquee flex shrink-0">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
