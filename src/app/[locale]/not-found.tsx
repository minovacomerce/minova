import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const t = useTranslations("not_found");
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-[var(--navy)] py-24 text-white">
      <div
        aria-hidden
        className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-40"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/3 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(232,184,109,0.10),transparent_60%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl px-5 text-center md:px-10">
        <Reveal>
          <p className="eyebrow text-[var(--accent)]">{t("kicker")}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
            {t("headline")}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-[1.65] text-[var(--slate-300)] md:text-lg">
            {t("body")}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="primary" size="lg" arrow>
              {t("primary_cta")}
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              {t("secondary_cta")}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
