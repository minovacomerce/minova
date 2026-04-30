"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";

const SUBJECT_KEYS = ["sourcing", "distribution", "brokerage", "general"] as const;
const VOLUME_KEYS = [
  "below_10k",
  "10k_100k",
  "100k_1m",
  "above_1m",
  "undefined",
] as const;

const RATE_LIMIT_MS = 30_000;

export default function ContactForm() {
  const t = useTranslations("contact_page");
  const [subject, setSubject] = useState<(typeof SUBJECT_KEYS)[number]>(
    SUBJECT_KEYS[0]
  );
  const [volume, setVolume] = useState<(typeof VOLUME_KEYS)[number]>(
    VOLUME_KEYS[0]
  );
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Client-side rate-limit (30s between submits per session).
    const last = Number(sessionStorage.getItem("contact_last") || "0");
    if (Date.now() - last < RATE_LIMIT_MS) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      subject,
      volume,
      message: String(fd.get("message") || ""),
      // Honeypot — must be empty
      website: String(fd.get("website") || ""),
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Bad response");
      sessionStorage.setItem("contact_last", String(Date.now()));
      setSent(true);
    } catch {
      setError(t("form_error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-[var(--off-white)] py-16 text-[var(--navy)] md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-[var(--navy)]/60">
                <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
                {t("form_eyebrow")}
              </p>
            </Reveal>
            <h2 className="headline-md mt-4 text-[var(--navy)] md:mt-6">
              {t("form_headline")}
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.65] text-[var(--navy)]/65">
              {t("form_body")}
            </p>

            <dl className="mt-10 space-y-5 border-t border-[var(--border-light)] pt-6 text-sm md:mt-12">
              <div>
                <dt className="eyebrow text-[var(--navy)]/55">{t("side_phone")}</dt>
                <dd className="mt-2 font-display text-xl text-[var(--navy)]">
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="hover:text-[var(--accent)]"
                  >
                    {SITE.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[var(--navy)]/55">{t("side_email")}</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-[var(--navy)] hover:text-[var(--accent)]"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-[var(--navy)]/55">
                  {t("side_location")}
                </dt>
                <dd className="mt-2 text-[var(--navy)]/80">{SITE.location}</dd>
              </div>
              <div>
                <dt className="eyebrow text-[var(--navy)]/55">{t("side_hours")}</dt>
                <dd className="mt-2 text-[var(--navy)]/80">
                  {t("side_hours_value")}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <form
                onSubmit={onSubmit}
                className="shadow-card-lg relative overflow-hidden rounded-2xl border border-[var(--border-light)] bg-white p-8 md:p-12"
              >
                {/* Honeypot — visually hidden, must remain empty */}
                <div
                  className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <AnimatePresence>
                  {sent ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-start gap-6 py-12"
                    >
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)]">
                        <Check className="h-6 w-6" strokeWidth={2.5} />
                      </span>
                      <h3 className="font-display text-3xl font-semibold tracking-tight text-[var(--navy)]">
                        {t("form_success_title")}
                      </h3>
                      <p className="max-w-md text-[var(--navy)]/65">
                        {t("form_success_body")}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={false}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <Field label={t("field_name")} id="name" required />
                      <Field
                        label={t("field_company")}
                        id="company"
                        required
                        autoComplete="organization"
                      />
                      <Field
                        label={t("field_email")}
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                      />
                      <Field
                        label={t("field_phone")}
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                      />

                      <div className="md:col-span-2">
                        <span className="eyebrow text-[var(--navy)]/55">
                          {t("field_subject")}
                        </span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {SUBJECT_KEYS.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSubject(s)}
                              className={
                                "rounded-full border px-4 py-2 text-sm transition-colors " +
                                (subject === s
                                  ? "border-[var(--navy)] bg-[var(--navy)] text-white"
                                  : "border-[var(--border-light-strong)] text-[var(--navy)]/75 hover:border-[var(--navy)]/40 hover:text-[var(--navy)]")
                              }
                            >
                              {t(`subjects.${s}` as never)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <span className="eyebrow text-[var(--navy)]/55">
                          {t("field_volume")}
                        </span>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {VOLUME_KEYS.map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setVolume(v)}
                              className={
                                "rounded-full border px-4 py-2 text-sm transition-colors " +
                                (volume === v
                                  ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--navy)]"
                                  : "border-[var(--border-light-strong)] text-[var(--navy)]/75 hover:border-[var(--navy)]/40 hover:text-[var(--navy)]")
                              }
                            >
                              {t(`volumes.${v}` as never)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label
                          htmlFor="message"
                          className="eyebrow text-[var(--navy)]/55"
                        >
                          {t("field_message")}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          maxLength={5000}
                          placeholder={t("field_message_placeholder")}
                          className="mt-3 w-full resize-none rounded-lg border border-[var(--border-light-strong)] bg-white p-4 text-base text-[var(--navy)] placeholder:text-[var(--navy)]/35 focus:border-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/10"
                        />
                      </div>

                      <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
                        <p className="max-w-sm text-xs text-[var(--navy)]/55">
                          {t("form_legal")}
                        </p>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="group inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[var(--navy-700)] disabled:opacity-60"
                        >
                          {t("form_submit")}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>

                      {error && (
                        <p className="md:col-span-2 text-sm text-red-600">
                          {error}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-[var(--navy)]/55">
        {label}
        {required ? <span className="ml-1 text-[var(--accent)]">*</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={300}
        className="mt-3 w-full rounded-lg border border-[var(--border-light-strong)] bg-white px-4 py-3 text-base text-[var(--navy)] placeholder:text-[var(--navy)]/35 focus:border-[var(--navy)] focus:outline-none focus:ring-2 focus:ring-[var(--navy)]/10"
      />
    </div>
  );
}
