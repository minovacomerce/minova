"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { SITE } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";

const NAV_KEYS = [
  { href: "/" as AppPathname, key: "home" },
  { href: "/about" as AppPathname, key: "about" },
  { href: "/services" as AppPathname, key: "services" },
  { href: "/industries" as AppPathname, key: "industries" },
  { href: "/network" as AppPathname, key: "network" },
  { href: "/contact" as AppPathname, key: "contact" },
] as const;

const SERVICES = [
  { slug: "sourcing", key: "sourcing" },
  { slug: "distribution", key: "distribution" },
  { slug: "brokerage", key: "brokerage" },
  { slug: "intermediation", key: "intermediation" },
  { slug: "quality", key: "quality" },
  { slug: "logistics", key: "logistics" },
] as const;

const INDUSTRIES = [
  { slug: "consumer", key: "consumer" },
  { slug: "lifestyle", key: "lifestyle" },
  { slug: "industrial", key: "industrial" },
  { slug: "electronics", key: "electronics" },
  { slug: "health", key: "health" },
  { slug: "home", key: "home" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative border-t border-white/10 bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 pb-10 md:px-10 md:pt-28 md:pb-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo variant="white" />
            <p className="mt-8 max-w-md font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              {t("headline")}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--slate-300)]">
              {t("blurb")}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
              className="mt-10 max-w-md"
            >
              <label
                htmlFor="newsletter"
                className="eyebrow block text-[var(--slate-300)]"
              >
                {t("newsletter_label")}
              </label>
              <div className="mt-3 flex items-center gap-3 border-b border-white/30 pb-3 transition-colors focus-within:border-white">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletter_placeholder")}
                  className="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label={t("newsletter_subscribe")}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-[var(--navy)]"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {sent && (
                <p className="mt-3 text-xs text-[var(--accent)]">
                  {t("newsletter_thanks")}
                </p>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 lg:col-span-7 lg:grid-cols-3">
            <div>
              <h4 className="eyebrow text-[var(--slate-300)]">{t("company")}</h4>
              <ul className="mt-5 space-y-3">
                {NAV_KEYS.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="text-sm text-white/85 transition-colors hover:text-white"
                    >
                      {tNav(n.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="eyebrow text-[var(--slate-300)]">{t("services_h")}</h4>
              <ul className="mt-5 space-y-3">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={{ pathname: "/services", hash: s.slug }}
                      className="text-sm text-white/85 transition-colors hover:text-white"
                    >
                      {t(`services_links.${s.key}` as never)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="eyebrow text-[var(--slate-300)]">{t("industries_h")}</h4>
              <ul className="mt-5 space-y-3">
                {INDUSTRIES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={{ pathname: "/industries", hash: s.slug }}
                      className="text-sm text-white/85 transition-colors hover:text-white"
                    >
                      {t(`industries_links.${s.key}` as never)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <h4 className="eyebrow text-[var(--slate-300)]">{t("get_in_touch")}</h4>
            <div className="mt-5 space-y-2">
              <Link
                href="/contact"
                className="block font-display text-2xl font-semibold tracking-tight hover:text-[var(--accent)]"
              >
                {t("start_a_conversation")}
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="block text-sm text-white/85 hover:text-white"
              >
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phoneTel}`}
                aria-label={t("phone")}
                className="block text-sm text-white/85 hover:text-white"
              >
                {t("phone")}
              </a>
              <p className="text-sm text-[var(--slate-300)]">{SITE.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:col-span-7 lg:justify-end">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm transition-colors hover:border-white hover:bg-white hover:text-[var(--navy)]"
            >
              {t("linkedin")}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[var(--slate-300)] md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {t("rights")}
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link
                href="/imprint"
                className="transition-colors hover:text-white"
              >
                {t("imprint")}
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                {t("terms")}
              </Link>
            </li>
          </ul>

          <p className="inline-flex items-center gap-1.5">
            <span>{t("website_by")}</span>
            <a
              href="https://twyne.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              twyne.ch
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
