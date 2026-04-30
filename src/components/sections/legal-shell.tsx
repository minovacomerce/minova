import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/reveal";

const ITEMS = [
  { href: "/imprint" as const, key: "imprint" as const },
  { href: "/privacy" as const, key: "privacy" as const },
  { href: "/terms" as const, key: "terms" as const },
];

export default function LegalShell({
  kicker,
  title,
  updated,
  children,
  current,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: ReactNode;
  current: "/imprint" | "/privacy" | "/terms";
}) {
  const t = useTranslations("legal");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--navy)] pt-28 pb-16 text-white md:pt-32 md:pb-20">
        <div
          aria-hidden
          className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-50"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-1/3 left-1/3 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(232,184,109,0.10),transparent_60%)] blur-3xl" />
        </div>

        <div className="mx-auto max-w-[1100px] px-5 md:px-10">
          <Reveal>
            <p className="eyebrow text-[var(--slate-300)]">
              <span className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-[var(--accent)]" />
              {kicker}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="headline-lg mt-4 text-white md:mt-6">{title}</h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-sm text-[var(--slate-300)]">
              {t("last_updated")} · {updated}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-[var(--off-white)] py-16 text-[var(--navy)] md:py-28">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-5 md:px-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-[var(--navy)]/55">{t("sidebar_label")}</p>
              <ul className="mt-4 space-y-1">
                {ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={
                        "block rounded-md px-3 py-2 text-sm transition-colors -ml-3 " +
                        (item.href === current
                          ? "bg-[var(--navy)]/[0.06] font-medium text-[var(--navy)]"
                          : "text-[var(--navy)]/65 hover:text-[var(--navy)]")
                      }
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="prose-legal lg:col-span-9">
            <Reveal>{children}</Reveal>
          </article>
        </div>
      </section>
    </>
  );
}
