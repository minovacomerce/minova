"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LANGUAGE_NAMES: Record<Locale, { code: string; name: string }> = {
  en: { code: "EN", name: "English" },
  de: { code: "DE", name: "Deutsch" },
};

interface SwitchProps {
  variant?: "header" | "mobile";
  /** Optional callback fired after a successful locale change. */
  onSwitch?: () => void;
}

export default function LanguageSwitcher({
  variant = "header",
  onSwitch,
}: SwitchProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (next: Locale) => {
    if (next === locale) {
      onSwitch?.();
      return;
    }
    startTransition(() => {
      // pathname here is locale-agnostic — next-intl resolves it to the
      // localized URL of the target locale via the routing pathnames map.
      router.replace(pathname as never, { locale: next });
      onSwitch?.();
    });
  };

  if (variant === "mobile") {
    return <MobileSwitch active={locale} onSwitch={handleSwitch} />;
  }

  return (
    <DesktopDropdown
      active={locale}
      onSwitch={handleSwitch}
      isPending={isPending}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                              Desktop dropdown                              */
/* -------------------------------------------------------------------------- */

function DesktopDropdown({
  active,
  onSwitch,
  isPending,
}: {
  active: Locale;
  onSwitch: (next: Locale) => void;
  isPending: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on click outside.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const root = containerRef.current;
      if (!root) return;
      if (!root.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Close on ESC; basic arrow-key navigation between menu items.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = menuRef.current?.querySelectorAll<HTMLButtonElement>(
          '[role="menuitem"]'
        );
        if (!items || items.length === 0) return;
        const list = Array.from(items);
        const current = list.indexOf(document.activeElement as HTMLButtonElement);
        const delta = e.key === "ArrowDown" ? 1 : -1;
        const nextIndex =
          current === -1
            ? e.key === "ArrowDown"
              ? 0
              : list.length - 1
            : (current + delta + list.length) % list.length;
        list[nextIndex]?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Switch language"
        disabled={isPending}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium tracking-wider text-[var(--navy)] transition-colors",
          "hover:bg-[var(--navy)]/[0.05]",
          open && "bg-[var(--navy)]/[0.05]"
        )}
      >
        <Globe
          className="h-3.5 w-3.5 text-[var(--navy)]/70"
          strokeWidth={1.8}
          aria-hidden
        />
        <span className="uppercase">{LANGUAGE_NAMES[active].code}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-[var(--navy)]/50 transition-transform duration-200",
            open && "rotate-180"
          )}
          strokeWidth={2.2}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="menu"
            aria-label="Languages"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 mt-2 min-w-[160px] rounded-xl border border-[var(--navy)]/[0.08] bg-white p-1 shadow-lg"
          >
            {routing.locales.map((l) => {
              const isActive = l === active;
              return (
                <button
                  key={l}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    onSwitch(l);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    isActive
                      ? "bg-[var(--navy)]/[0.05] text-[var(--navy)]"
                      : "text-[var(--navy)]/70 hover:bg-[var(--navy)]/[0.05] hover:text-[var(--navy)]"
                  )}
                >
                  <span className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold uppercase tracking-wider">
                      {LANGUAGE_NAMES[l].code}
                    </span>
                    <span className="text-xs text-[var(--navy)]/55">
                      {LANGUAGE_NAMES[l].name}
                    </span>
                  </span>
                  {isActive && (
                    <Check
                      className="h-3.5 w-3.5 text-[var(--accent)]"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Mobile pills                                */
/* -------------------------------------------------------------------------- */

function MobileSwitch({
  active,
  onSwitch,
}: {
  active: Locale;
  onSwitch: (next: Locale) => void;
}) {
  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
        Language
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {routing.locales.map((l) => {
          const isActive = l === active;
          return (
            <button
              key={l}
              type="button"
              onClick={() => onSwitch(l)}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors",
                isActive
                  ? "bg-white text-[var(--navy)]"
                  : "border border-white/20 text-white/70 hover:border-white/60 hover:text-white"
              )}
            >
              <span>{LANGUAGE_NAMES[l].code}</span>
              <span className="text-xs font-normal capitalize tracking-normal opacity-70">
                {LANGUAGE_NAMES[l].name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
