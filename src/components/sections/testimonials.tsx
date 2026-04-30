"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

const QUOTE_KEYS = ["quote_1", "quote_2", "quote_3"] as const;

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % QUOTE_KEYS.length);
  const prev = () => setI((v) => (v - 1 + QUOTE_KEYS.length) % QUOTE_KEYS.length);
  const cur = QUOTE_KEYS[i];

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[var(--navy)] via-[#0A1B33] to-[var(--navy-800)] py-16 md:py-28">
      <div
        aria-hidden
        className="bg-dots-dark pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(232,184,109,0.10), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow text-[var(--slate-300)]">
              <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
              {t("eyebrow")}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-3xl md:mt-14">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-md md:p-14">
              <Quote
                className="absolute right-8 top-8 h-12 w-12 text-[var(--accent)]/35 md:right-12 md:top-12 md:h-16 md:w-16"
                strokeWidth={1}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-display text-xl font-medium leading-[1.4] tracking-tight text-white md:text-2xl">
                    &ldquo;{t(cur)}&rdquo;
                  </p>

                  <div className="mt-10 flex items-end justify-between gap-4 border-t border-white/10 pt-6">
                    <div>
                      <p className="font-display text-base font-semibold text-white">
                        {t(`${cur}_name` as never)}
                      </p>
                      <p className="mt-0.5 text-sm text-[var(--slate-300)]">
                        {t(`${cur}_role` as never)}
                      </p>
                    </div>
                    <p className="font-display text-sm text-[var(--slate-300)]">
                      {String(i + 1).padStart(2, "0")} —{" "}
                      {String(QUOTE_KEYS.length).padStart(2, "0")}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                aria-label={t("previous")}
                onClick={prev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:bg-white hover:text-[var(--navy)]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="mx-2 flex items-center gap-2">
                {QUOTE_KEYS.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={t("go_to", { n: idx + 1 })}
                    onClick={() => setI(idx)}
                    className={
                      "h-1.5 rounded-full transition-all duration-300 " +
                      (idx === i
                        ? "w-8 bg-[var(--accent)]"
                        : "w-1.5 bg-white/30 hover:bg-white/60")
                    }
                  />
                ))}
              </div>
              <button
                aria-label={t("next")}
                onClick={next}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:bg-white hover:text-[var(--navy)]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
