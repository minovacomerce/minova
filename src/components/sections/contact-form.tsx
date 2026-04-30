"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const SUBJECT_KEYS = [
  "sourcing",
  "distribution",
  "brokerage",
  "partnership",
  "other",
] as const;
const VOLUME_KEYS = [
  "below_10k",
  "10k_100k",
  "100k_1m",
  "above_1m",
  "undefined",
] as const;

const RATE_LIMIT_MS = 30_000;
const PHONE_RE = /^[\d\s+()-]{4,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "name" | "email" | "phone" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

type ApiResponse =
  | { success: true }
  | { success: false; error: string };

export default function ContactForm() {
  const t = useTranslations("contact_page");
  const locale = useLocale() as "en" | "de";
  const [subject, setSubject] = useState<(typeof SUBJECT_KEYS)[number]>(
    SUBJECT_KEYS[0]
  );
  const [volume, setVolume] = useState<(typeof VOLUME_KEYS)[number]>(
    VOLUME_KEYS[0]
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<"none" | "rate" | "send" | "generic">(
    "none"
  );
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function clearFieldError(field: FieldName) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validate(values: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): FieldErrors {
    const out: FieldErrors = {};
    if (values.name.trim().length < 2) {
      out.name = t("form_field_error_name");
    }
    if (!EMAIL_RE.test(values.email.trim())) {
      out.email = t("form_field_error_email");
    }
    if (values.phone.trim().length > 0 && !PHONE_RE.test(values.phone.trim())) {
      out.phone = t("form_field_error_phone");
    }
    if (values.message.trim().length < 5) {
      out.message = t("form_field_error_message");
    }
    return out;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("none");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
    };

    const fieldErrors = validate(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      // Focus the first invalid field for keyboard users.
      const firstInvalid = Object.keys(fieldErrors)[0] as FieldName;
      const el = form.elements.namedItem(firstInvalid);
      if (el instanceof HTMLElement) el.focus();
      return;
    }
    setErrors({});

    // Client-side cooldown — saves a server roundtrip on accidental double-clicks.
    const last = Number(sessionStorage.getItem("contact_last") || "0");
    if (Date.now() - last < RATE_LIMIT_MS) {
      setServerError("rate");
      return;
    }

    const payload = {
      name: values.name.trim(),
      company: values.company.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      subject,
      volume: t(`volumes.${volume}` as never) as string,
      message: values.message.trim(),
      locale,
      honeypot: String(fd.get("honeypot") || ""),
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => null)) as ApiResponse | null;

      if (!res.ok || !json?.success) {
        if (res.status === 429) {
          setServerError("rate");
        } else if (res.status === 500) {
          setServerError("send");
        } else if (
          res.status === 400 &&
          json &&
          !json.success &&
          json.error === "validation_failed"
        ) {
          // Server-side disagreed with client validation — surface the
          // generic banner. Field-specific server errors aren't surfaced
          // because the server intentionally returns a single token.
          setServerError("send");
        } else {
          setServerError("generic");
        }
        return;
      }

      sessionStorage.setItem("contact_last", String(Date.now()));
      form.reset();
      setSubject(SUBJECT_KEYS[0]);
      setVolume(VOLUME_KEYS[0]);
      setSent(true);
    } catch {
      setServerError("send");
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
                noValidate
                className="shadow-card-lg relative overflow-hidden rounded-2xl border border-[var(--border-light)] bg-white p-8 md:p-12"
              >
                {/* Honeypot — visually hidden, must remain empty */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="honeypot">Website</label>
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
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
                      <Field
                        label={t("field_name")}
                        id="name"
                        required
                        autoComplete="name"
                        error={errors.name}
                        onInput={() => clearFieldError("name")}
                      />
                      <Field
                        label={t("field_company")}
                        id="company"
                        autoComplete="organization"
                      />
                      <Field
                        label={t("field_email")}
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        error={errors.email}
                        onInput={() => clearFieldError("email")}
                      />
                      <Field
                        label={t("field_phone")}
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        error={errors.phone}
                        onInput={() => clearFieldError("phone")}
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
                          aria-invalid={errors.message ? "true" : undefined}
                          aria-describedby={
                            errors.message ? "message-error" : undefined
                          }
                          onInput={() => clearFieldError("message")}
                          placeholder={t("field_message_placeholder")}
                          className={cn(
                            "mt-3 w-full resize-none rounded-lg border bg-white p-4 text-base text-[var(--navy)] placeholder:text-[var(--navy)]/35 focus:outline-none focus:ring-2",
                            errors.message
                              ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                              : "border-[var(--border-light-strong)] focus:border-[var(--navy)] focus:ring-[var(--navy)]/10"
                          )}
                        />
                        {errors.message && (
                          <p
                            id="message-error"
                            className="mt-1.5 text-xs text-red-600"
                          >
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {serverError !== "none" && (
                        <ServerErrorBanner kind={serverError} />
                      )}

                      <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-2">
                        <p className="max-w-sm text-xs text-[var(--navy)]/55">
                          {t("form_legal")}
                        </p>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="group inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[var(--navy-700)] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              {t("form_submitting")}
                            </>
                          ) : (
                            <>
                              {t("form_submit")}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </button>
                      </div>
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

function ServerErrorBanner({
  kind,
}: {
  kind: "rate" | "send" | "generic";
}) {
  const t = useTranslations("contact_page");
  return (
    <div
      role="alert"
      className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {kind === "rate" && t("form_error_rate_limit")}
      {kind === "generic" && t("form_error")}
      {kind === "send" &&
        t.rich("form_error_send_failed", {
          link: (chunks) => (
            <a
              href={`mailto:${SITE.email}`}
              className="font-medium text-red-800 underline underline-offset-2 hover:text-red-900"
            >
              {chunks}
            </a>
          ),
        })}
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
  autoComplete,
  error,
  onInput,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  onInput?: () => void;
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
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onInput={onInput}
        className={cn(
          "mt-3 w-full rounded-lg border bg-white px-4 py-3 text-base text-[var(--navy)] placeholder:text-[var(--navy)]/35 focus:outline-none focus:ring-2",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
            : "border-[var(--border-light-strong)] focus:border-[var(--navy)] focus:ring-[var(--navy)]/10"
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
