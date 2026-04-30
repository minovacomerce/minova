import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/reveal";

const STEP_KEYS = ["discover", "source", "negotiate", "deliver"] as const;

export default function HowWeWork() {
  const t = useTranslations("how_we_work");

  return (
    <section className="relative bg-white py-16 text-[var(--navy)] md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-6 lg:items-end">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-[var(--navy)]/60">
                <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                {t("eyebrow")}
              </p>
            </Reveal>
            <h2 className="headline-lg mt-4 text-[var(--navy)] md:mt-6">
              {t("headline_1")}
              <br />
              <span className="text-[var(--navy)]/55">{t("headline_2")}</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.1}>
              <p className="text-base leading-[1.65] text-[var(--navy)]/70 md:text-lg">
                {t("body")}
              </p>
            </Reveal>
          </div>
        </div>

        <RevealStagger
          stagger={0.1}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:mt-14 lg:grid-cols-4"
        >
          {STEP_KEYS.map((stepKey, i) => (
            <RevealItem
              key={stepKey}
              className={cn(
                "group relative lg:px-8",
                i === 0 && "lg:pl-0",
                i > 0 && "lg:border-l lg:border-[var(--border-light)]"
              )}
            >
              <p className="font-display text-5xl font-light leading-none tracking-[-0.02em] text-[var(--accent)] transition-transform duration-300 group-hover:scale-105 md:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-[var(--navy)]">
                {t(`steps.${stepKey}_title` as never)}
              </h3>
              <p className="mt-3 text-base leading-[1.65] text-[var(--navy)]/70">
                {t(`steps.${stepKey}_body` as never)}
              </p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
