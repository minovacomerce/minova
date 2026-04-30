import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";

type Tone = "light" | "dark";

interface CTAProps {
  kicker?: string;
  headline?: string;
  body?: string;
  tone?: Tone;
}

export default function CTA({ kicker, headline, body, tone = "light" }: CTAProps) {
  const t = useTranslations("cta");
  const k = kicker ?? t("default_kicker");
  const h = headline ?? t("default_headline");
  const b = body ?? t("default_body");
  const primaryLabel = t("primary");
  const phoneLabel = t("phone_label");
  const locationLabel = t("location");

  if (tone === "light")
    return (
      <CTALight
        kicker={k}
        headline={h}
        body={b}
        primaryLabel={primaryLabel}
        phoneLabel={phoneLabel}
        locationLabel={locationLabel}
      />
    );
  return (
    <CTADark
      kicker={k}
      headline={h}
      body={b}
      primaryLabel={primaryLabel}
      phoneLabel={phoneLabel}
    />
  );
}

interface VariantProps {
  kicker: string;
  headline: string;
  body: string;
  primaryLabel: string;
  phoneLabel: string;
}

function CTALight({
  kicker,
  headline,
  body,
  primaryLabel,
  phoneLabel,
  locationLabel,
}: VariantProps & { locationLabel: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-[1200px] divider-hairline-light"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(232,184,109,0.04),transparent_65%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow text-[var(--accent)]">
              <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
              {kicker}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--navy)] md:mt-6 md:text-6xl lg:text-7xl">
              {headline}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl text-base leading-[1.65] text-[var(--navy)]/60 md:mt-6 md:text-lg">
              {body}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                arrow
                className="!bg-[var(--navy)] !text-white hover:!bg-[var(--navy-700)]"
              >
                {primaryLabel}
              </Button>
              <Button
                href={`tel:${SITE.phoneTel}`}
                variant="ghost"
                size="lg"
                className="!border !border-[var(--navy)] !text-[var(--navy)] hover:!bg-[var(--navy)]/5"
              >
                {phoneLabel}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 inline-flex flex-col items-center gap-2">
              <span className="block h-6 w-px bg-[var(--navy)]/25" />
              <span className="eyebrow text-[var(--navy)]/55">
                {locationLabel}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CTADark({
  kicker,
  headline,
  body,
  primaryLabel,
  phoneLabel,
}: VariantProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--navy)] py-16 md:py-28">
      <div
        aria-hidden
        className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-30"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-1/3 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(232,184,109,0.10),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow text-[var(--slate-300)]">
              <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
              {kicker}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-white md:mt-6 md:text-6xl lg:text-7xl">
              {headline}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 max-w-2xl text-base leading-[1.65] text-[var(--slate-300)] md:mt-6 md:text-lg">
              {body}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10">
              <Button href="/contact" variant="primary" size="lg" arrow>
                {primaryLabel}
              </Button>
              <Button
                href={`tel:${SITE.phoneTel}`}
                variant="secondary"
                size="lg"
              >
                {phoneLabel}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
