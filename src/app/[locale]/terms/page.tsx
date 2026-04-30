import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, useTranslations } from "next-intl";
import LegalShell from "@/components/sections/legal-shell";
import { LEGAL, SITE } from "@/lib/site";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safe = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale: safe, namespace: "terms_page" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: `/${safe}/${safe === "de" ? "agb" : "terms"}`,
      languages: {
        en: "/en/terms",
        de: "/de/agb",
        "x-default": "/en/terms",
      },
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations("terms_page");

  return (
    <LegalShell
      kicker={t("kicker")}
      title={t("title")}
      updated={t("updated")}
      current="/terms"
    >
      <h2>{t("h_operator")}</h2>
      <p>
        {t("p_operator", {
          company: LEGAL.companyName,
          address: LEGAL.addressLine,
          owner: LEGAL.owner,
          cr: LEGAL.commercialRegisterNumber,
          office: LEGAL.commercialRegisterOffice,
          vat: LEGAL.vat,
        })}
      </p>

      <h2>{t("h_scope")}</h2>
      <p>{t("p_scope")}</p>

      <h2>{t("h_info")}</h2>
      <p>{t("p_info")}</p>

      <h2>{t("h_ip")}</h2>
      <p>{t("p_ip", { company: LEGAL.companyName })}</p>

      <h2>{t("h_use")}</h2>
      <p>{t("p_use_intro")}</p>
      <ul>
        <li>{t("li_use_1")}</li>
        <li>{t("li_use_2")}</li>
        <li>{t("li_use_3")}</li>
        <li>{t("li_use_4")}</li>
      </ul>

      <h2>{t("h_links")}</h2>
      <p>{t("p_links")}</p>

      <h2>{t("h_liability")}</h2>
      <p>{t("p_liability", { company: LEGAL.companyName })}</p>

      <h2>{t("h_privacy")}</h2>
      <p>
        {t("p_privacy", { privacyLink: t("privacy_link_label") })}
      </p>

      <h2>{t("h_law")}</h2>
      <p>{t("p_law")}</p>

      <h2>{t("h_contact")}</h2>
      <p>
        {t("p_contact", {
          emailLink: SITE.email,
          company: LEGAL.companyName,
          address: LEGAL.addressLine,
        })}
      </p>
    </LegalShell>
  );
}
