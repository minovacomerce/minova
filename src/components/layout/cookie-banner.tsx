"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCookieConsent } from "@/hooks/use-cookie-consent";

export default function CookieBanner() {
  const t = useTranslations("cookie_banner");
  const { consent, hydrated, setConsent } = useCookieConsent();
  const visible = hydrated && consent === null;

  useEffect(() => {
    if (!visible) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setConsent("essential");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, setConsent]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label={t("headline")}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[90] border-t border-[var(--navy)]/10 bg-white shadow-[0_-12px_40px_-12px_rgba(1,17,37,0.18)]"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8">
            <div className="max-w-2xl">
              <p className="font-display text-base font-semibold tracking-tight text-[var(--navy)] md:text-lg">
                {t("headline")}
              </p>
              <p className="mt-2 text-sm leading-[1.6] text-[var(--navy)]/65">
                {t.rich("body", {
                  privacyLink: (chunks) => (
                    <Link
                      href="/privacy"
                      className="font-medium text-[var(--navy)] underline underline-offset-4 hover:text-[var(--accent)]"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setConsent("essential")}
                className="inline-flex items-center justify-center rounded-full border border-[var(--navy)]/25 px-5 py-2.5 text-sm font-medium text-[var(--navy)] transition-colors hover:border-[var(--navy)] hover:bg-[var(--navy)]/[0.04]"
              >
                {t("essential")}
              </button>
              <button
                type="button"
                onClick={() => setConsent("all")}
                className="inline-flex items-center justify-center rounded-full bg-[var(--navy)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--navy-700)]"
              >
                {t("accept_all")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
