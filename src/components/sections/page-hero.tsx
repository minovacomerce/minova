"use client";

import { motion } from "framer-motion";
import { SplitWords } from "@/components/ui/reveal";

export default function PageHero({
  kicker,
  title,
  body,
  meta,
}: {
  kicker: string;
  title: string;
  body?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--navy)] pt-28 pb-16 md:pt-32 md:pb-20">
      <div
        aria-hidden
        className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-50"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/3 left-1/3 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,184,109,0.12),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[50vh] w-[50vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(26,46,71,0.7),transparent_55%)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow text-[var(--slate-300)]"
        >
          <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
          {kicker}
        </motion.p>
        <h1 className="headline-lg mt-4 max-w-[16ch] text-white md:mt-6">
          <SplitWords text={title} />
        </h1>
        {body ? (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 max-w-2xl text-base leading-[1.65] text-[var(--slate-300)] md:mt-6 md:text-lg"
          >
            {body}
          </motion.p>
        ) : null}

        {meta && meta.length > 0 ? (
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6 md:mt-14 md:grid-cols-4 md:gap-x-10"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow text-[var(--slate-300)]">{m.label}</dt>
                <dd className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {m.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        ) : null}
      </div>
    </section>
  );
}
