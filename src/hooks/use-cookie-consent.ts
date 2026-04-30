"use client";

import { useEffect, useState } from "react";

export type CookieConsent = "all" | "essential" | null;

const KEY = "minova_cookie_consent";

export function useCookieConsent() {
  const [consent, setConsentState] = useState<CookieConsent>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(KEY);
      if (stored === "all" || stored === "essential") {
        setConsentState(stored);
      }
    } catch {
      // localStorage unavailable (e.g. private mode) — treat as no consent
    }
    setHydrated(true);
  }, []);

  function setConsent(next: Exclude<CookieConsent, null>) {
    setConsentState(next);
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      // ignore
    }
  }

  return { consent, hydrated, setConsent };
}
