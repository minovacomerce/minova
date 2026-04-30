"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SplitWords } from "@/components/ui/reveal";
import { HeroVideoBackground } from "@/components/ui/hero-video-background";

export default function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[var(--navy)] pt-24 pb-12 md:pt-32 md:pb-24"
    >
      <HeroVideoBackground />

      <motion.div
        aria-hidden
        style={{ y: reduce ? undefined : yBg }}
        className="pointer-events-none absolute inset-0 -z-[5] opacity-35"
      >
        <div className="absolute inset-0 animate-mesh">
          <div className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,184,109,0.22),transparent_60%)] blur-3xl" />
          <div className="absolute -bottom-1/4 -right-1/4 h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(26,46,71,0.85),transparent_55%)] blur-3xl" />
        </div>
        <div className="bg-grid bg-grid-fade absolute inset-0" />
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-x-0 top-24 mx-auto hidden max-w-[1440px] items-center justify-between px-5 text-[11px] tracking-[0.18em] text-white/45 md:flex md:px-10"
      >
        <span>{t("label_left")}</span>
        <span>{t("label_right")}</span>
      </motion.div>

      <motion.div
        style={{ y: reduce ? undefined : yFg, opacity: reduce ? undefined : opacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-10"
      >
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="eyebrow text-[var(--slate-300)]"
            >
              <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
              <span className="md:hidden">{t("eyebrow_short")}</span>
              <span className="hidden md:inline">{t("eyebrow_long")}</span>
            </motion.p>

            <h1
              className="headline-xl mt-4 text-white md:mt-6"
              style={{ textShadow: "0 4px 32px rgba(1, 17, 37, 0.55)" }}
            >
              <span className="block">
                <SplitWords text={t("headline_1")} />
              </span>
              <span className="block text-[var(--slate-300)]">
                <SplitWords text={t("headline_2")} delay={0.2} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mt-5 max-w-xl text-base leading-snug text-[var(--slate-300)] md:mt-8 md:text-lg md:leading-relaxed"
            >
              {t("body")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="mt-7 flex flex-wrap items-center gap-3 md:mt-10"
            >
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                arrow
                className="!px-6 !py-3 !text-sm md:!px-8 md:!py-4 md:!text-base"
              >
                {t("cta_primary")}
              </Button>
              <Button
                href="/services"
                variant="secondary"
                size="lg"
                className="!px-6 !py-3 !text-sm md:!px-8 md:!py-4 md:!text-base"
              >
                {t("cta_secondary")}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 z-10 mx-auto hidden max-w-[1440px] items-end justify-between px-5 md:flex md:px-10"
      >
        <div className="flex items-center gap-3 text-[11px] tracking-[0.18em] text-white/55">
          <span className="relative inline-block h-8 w-px overflow-hidden bg-white/15">
            <span className="animate-scroll-indicator absolute inset-0 bg-white" />
          </span>
          {t("scroll")}
        </div>

        <div className="flex items-center gap-10 text-right">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-white/55">
              {t("stats_partners")}
            </p>
            <p className="font-display text-2xl font-semibold tracking-tight">150+</p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.18em] text-white/55">
              {t("stats_countries")}
            </p>
            <p className="font-display text-2xl font-semibold tracking-tight">40+</p>
          </div>
          <div className="hidden lg:block">
            <p className="text-[11px] tracking-[0.18em] text-white/55">
              {t("stats_industries")}
            </p>
            <p className="font-display text-2xl font-semibold tracking-tight">12+</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

