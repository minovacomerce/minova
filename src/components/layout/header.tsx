"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./language-switcher";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV: { href: AppPathname; key: "home" | "about" | "services" | "industries" | "network" | "contact" }[] = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/industries", key: "industries" },
  { href: "/network", key: "network" },
  { href: "/contact", key: "contact" },
];

const MEGA_HREFS = ["/services", "/industries"] as const;

export default function Header() {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tMega = useTranslations("header_mega");
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<(typeof MEGA_HREFS)[number] | null>(null);

  useEffect(() => {
    setOpen(false);
    setMega(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        open
          ? "border-transparent bg-transparent"
          : "border-b border-[var(--navy)]/[0.08] bg-white"
      )}
      onMouseLeave={() => setMega(null)}
    >
      {/* Bar sits ABOVE the mobile overlay (which is z-40) so the close
         button is clickable while the menu is open. */}
      <div className="relative z-[60] mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
        <Logo variant={open ? "white" : "navy"} />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label={tNav("primary_aria")}
        >
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href);
            const isMega = (MEGA_HREFS as readonly string[]).includes(item.href);
            return (
              <div
                key={item.href}
                onMouseEnter={() =>
                  setMega(isMega ? (item.href as (typeof MEGA_HREFS)[number]) : null)
                }
                className="relative"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative inline-flex items-center px-4 py-2 text-sm font-medium tracking-tight text-[var(--navy)] transition-colors",
                    active
                      ? "after:absolute after:bottom-1 after:left-4 after:right-4 after:h-px after:bg-[var(--navy)]"
                      : "hover:text-[var(--navy-700)]"
                  )}
                >
                  {tNav(item.key)}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher variant="header" />
          <Button href="/contact" variant="primary" size="sm" arrow>
            {tNav("start_a_project")}
          </Button>
        </div>

        <button
          aria-label={open ? tNav("close_menu") : tNav("open_menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
            open
              ? "text-white hover:bg-white/10"
              : "text-[var(--navy)] hover:bg-[var(--navy)]/[0.05]"
          )}
        >
          {open ? <X className="h-6 w-6" strokeWidth={2.2} /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            key={mega}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full hidden border-t border-[var(--navy)]/[0.08] bg-white lg:block"
          >
            <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 px-10 py-12">
              <div className="col-span-4">
                <p className="eyebrow text-[var(--slate-500)]">
                  {tMega(`${mega === "/services" ? "services" : "industries"}.kicker` as never)}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[var(--navy)]">
                  {tMega(`${mega === "/services" ? "services" : "industries"}.title` as never)}
                </h3>
                <p className="mt-3 text-sm text-[var(--slate-500)]">
                  {tMega(`${mega === "/services" ? "services" : "industries"}.blurb` as never)}
                </p>
                <Link
                  href={mega}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--navy)] hover:text-[var(--navy-700)]"
                >
                  {tMega(`${mega === "/services" ? "services" : "industries"}.see_overview` as never)}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <ul className="col-span-8 grid grid-cols-2 gap-x-8 gap-y-5">
                {(mega === "/services"
                  ? [
                      "sourcing",
                      "distribution",
                      "brokerage",
                      "intermediation",
                      "quality",
                      "logistics",
                    ]
                  : [
                      "consumer",
                      "lifestyle",
                      "industrial",
                      "electronics",
                      "health",
                      "home",
                    ]
                ).map((slug, i) => {
                  const groupKey = mega === "/services" ? "services" : "industries";
                  return (
                    <motion.li
                      key={slug}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.4 }}
                    >
                      <Link
                        href={{ pathname: mega, hash: slug }}
                        className="group block rounded-lg p-3 -m-3 transition-colors hover:bg-black/[0.03]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base font-medium text-[var(--navy)]">
                            {tMega(`${groupKey}.links.${slug}_label` as never)}
                          </span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-[var(--slate-500)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <p className="mt-1 text-sm text-[var(--slate-500)]">
                          {tMega(`${groupKey}.links.${slug}_desc` as never)}
                        </p>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 bg-[var(--navy)] lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pt-24 pb-10">
              <ul className="flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 * i,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-white/10 py-5 font-display text-3xl font-semibold tracking-tight text-white"
                    >
                      {tNav(item.key)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.06 * NAV.length,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-auto pt-8"
              >
                <Button href="/contact" variant="primary" size="lg" arrow>
                  {tNav("start_a_project")}
                </Button>
                <div className="mt-6 space-y-1 text-sm text-[var(--slate-300)]">
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <p>{SITE.location}</p>
                </div>
                <LanguageSwitcher variant="mobile" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
